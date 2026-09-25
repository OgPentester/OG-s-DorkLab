/**
 * Ensures Tauri build prerequisites (Rust/cargo, Windows MSVC) after npm install.
 * Skip with: SKIP_PREREQ_SETUP=1
 */
import { spawnSync } from "child_process";
import { createWriteStream, existsSync, unlinkSync } from "fs";
import { homedir, platform, tmpdir } from "os";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import { get as httpsGet } from "https";

const SKIP = process.env.SKIP_PREREQ_SETUP === "1";
const MIN_NODE_MAJOR = 18;

function log(msg) {
  console.log(`[setup] ${msg}`);
}

function warn(msg) {
  console.warn(`[setup] ${msg}`);
}

function run(cmd, args, options = {}) {
  return spawnSync(cmd, args, {
    encoding: "utf8",
    shell: platform() === "win32",
    ...options,
  });
}

function cargoBinDir() {
  return join(homedir(), ".cargo", "bin");
}

function cargoExecutable() {
  const name = platform() === "win32" ? "cargo.exe" : "cargo";
  return join(cargoBinDir(), name);
}

function withCargoOnPath(env = process.env) {
  const bin = cargoBinDir();
  const sep = platform() === "win32" ? ";" : ":";
  const pathKey = platform() === "win32" ? "Path" : "PATH";
  const current = env[pathKey] ?? env.PATH ?? "";
  if (current.toLowerCase().includes(bin.toLowerCase())) {
    return { ...env };
  }
  return { ...env, [pathKey]: `${bin}${sep}${current}` };
}

function findCargo() {
  if (existsSync(cargoExecutable())) {
    return cargoExecutable();
  }
  const which = platform() === "win32" ? "where" : "which";
  const found = run(which, ["cargo"]);
  if (found.status === 0 && found.stdout?.trim()) {
    return found.stdout.trim().split(/\r?\n/)[0];
  }
  return null;
}

function cargoWorks(cargoPath) {
  const env = withCargoOnPath();
  const result = run(cargoPath, ["--version"], { env });
  return result.status === 0;
}

async function downloadFile(url, dest) {
  await new Promise((resolve, reject) => {
    httpsGet(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Download failed (${response.statusCode}): ${url}`));
        return;
      }
      pipeline(response, createWriteStream(dest)).then(resolve).catch(reject);
    }).on("error", reject);
  });
}

async function installRustupUnix() {
  log("Rust not found — installing via rustup (stable toolchain)…");
  const script = run(
    "sh",
    ["-c", "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable"],
    { stdio: "inherit", env: withCargoOnPath() },
  );
  if (script.status !== 0) {
    throw new Error("rustup install failed. Install manually: https://rustup.rs/");
  }
}

async function installRustupWindows() {
  const dest = join(tmpdir(), "rustup-init.exe");
  log("Rust not found — downloading rustup-init…");
  await downloadFile(
    "https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe",
    dest,
  );
  log("Running rustup-init (default stable toolchain)…");
  const init = run(dest, ["-y", "--default-toolchain", "stable"], {
    stdio: "inherit",
    env: withCargoOnPath(),
  });
  try {
    unlinkSync(dest);
  } catch {
    /* ignore */
  }
  if (init.status !== 0) {
    throw new Error("rustup-init failed. Install manually: https://rustup.rs/");
  }
}

async function ensureRust() {
  let cargo = findCargo();
  if (cargo && cargoWorks(cargo)) {
    log(`Rust toolchain OK (${run(cargo, ["--version"]).stdout?.trim()})`);
    return;
  }

  if (platform() === "win32") {
    await installRustupWindows();
  } else if (platform() === "darwin" || platform() === "linux") {
    await installRustupUnix();
  } else {
    throw new Error(`Unsupported OS for automatic Rust install: ${platform()}. Install Rust from https://rustup.rs/`);
  }

  cargo = findCargo();
  if (!cargo || !cargoWorks(cargo)) {
    warn(
      "Rust was installed but cargo is not on PATH in this shell. " +
        "Open a new terminal, then run: npm run tauri dev",
    );
    return;
  }
  log(`Rust installed (${run(cargo, ["--version"]).stdout?.trim()})`);
}

function hasWindowsMsvcLinker() {
  const cl = run("where", ["cl"]);
  if (cl.status === 0) return true;
  const link = run("where", ["link"]);
  return link.status === 0;
}

function ensureWindowsMsvc() {
  if (platform() !== "win32") return;
  if (process.env.SKIP_VS_BUILD_TOOLS === "1") {
    log("Skipping MSVC check (SKIP_VS_BUILD_TOOLS=1)");
    return;
  }
  if (hasWindowsMsvcLinker()) {
    log("Windows C++ build tools (MSVC) detected");
    return;
  }

  const winget = run("where", ["winget"]);
  if (winget.status !== 0) {
    warn(
      "MSVC linker not found (required for Tauri on Windows). Install Build Tools:\n" +
        "  https://v2.tauri.app/start/prerequisites/\n" +
        "Or install: Visual Studio Build Tools → Desktop development with C++",
    );
    return;
  }

  log("MSVC not found — installing Visual Studio 2022 Build Tools (C++ workload) via winget…");
  log("This may take several minutes and can prompt for elevation.");
  const install = run(
    "winget",
    [
      "install",
      "--id",
      "Microsoft.VisualStudio.2022.BuildTools",
      "-e",
      "--accept-package-agreements",
      "--accept-source-agreements",
      "--override",
      "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended",
    ],
    { stdio: "inherit" },
  );
  if (install.status !== 0) {
    warn(
      "Automatic Build Tools install did not complete. Install manually:\n" +
        "  winget install Microsoft.VisualStudio.2022.BuildTools\n" +
        "  (select Desktop development with C++)",
    );
    return;
  }
  if (hasWindowsMsvcLinker()) {
    log("Windows C++ build tools installed");
  } else {
    warn("Build Tools may be installed but cl/link are not on PATH yet. Open a new terminal.");
  }
}

function ensureNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (major < MIN_NODE_MAJOR) {
    warn(`Node.js ${MIN_NODE_MAJOR}+ recommended (current: ${process.versions.node})`);
  }
}

async function verifyTauriWorkspace() {
  const cargo = findCargo();
  if (!cargo || !cargoWorks(cargo)) return;

  const root = join(process.cwd(), "src-tauri");
  if (!existsSync(join(root, "Cargo.toml"))) return;

  const meta = run(cargo, ["metadata", "--no-deps", "--format-version", "1"], {
    cwd: root,
    env: withCargoOnPath(),
  });
  if (meta.status !== 0) {
    warn("cargo metadata failed in src-tauri — check Rust install and run from project root.");
    if (meta.stderr) warn(meta.stderr.trim());
  } else {
    log("Tauri Rust workspace OK");
  }
}

function requireCargoOrExit() {
  const cargo = findCargo();
  if (cargo && cargoWorks(cargo)) {
    return;
  }
  throw new Error(
    "cargo is still not available. If Rust was just installed, close this window, open a new " +
      "Command Prompt, cd to the project folder, run npm run setup, then npm run tauri dev. " +
      "Or install Rust manually: https://rustup.rs/",
  );
}

export async function runPrerequisiteSetup() {
  if (SKIP) {
    log("Skipped (SKIP_PREREQ_SETUP=1)");
    return;
  }

  ensureNodeVersion();
  await ensureRust();
  ensureWindowsMsvc();
  requireCargoOrExit();
  await verifyTauriWorkspace();
}

async function main() {
  await runPrerequisiteSetup();
}

const isDirectRun =
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  main().catch((err) => {
    console.error(`[setup] ${err.message}`);
    process.exit(1);
  });
}
