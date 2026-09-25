/**
 * Runs prerequisite setup, then Tauri CLI with ~/.cargo/bin on PATH (Windows-friendly).
 */
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { homedir, platform } from "os";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "..", "..");

function withCargoOnPath(env = process.env) {
  const bin = join(homedir(), ".cargo", "bin");
  const sep = platform() === "win32" ? ";" : ":";
  const pathKey = platform() === "win32" ? "Path" : "PATH";
  const current = env[pathKey] ?? env.PATH ?? "";
  if (current.toLowerCase().includes(bin.toLowerCase())) {
    return { ...env };
  }
  return { ...env, [pathKey]: `${bin}${sep}${current}` };
}

function tauriCommand(args) {
  const cliJs = join(root, "node_modules", "@tauri-apps", "cli", "tauri.js");
  if (existsSync(cliJs)) {
    return { cmd: process.execPath, args: [cliJs, ...args] };
  }
  const win = join(root, "node_modules", ".bin", "tauri.cmd");
  const unix = join(root, "node_modules", ".bin", "tauri");
  if (platform() === "win32" && existsSync(win)) {
    return { cmd: win, args };
  }
  if (existsSync(unix)) {
    return { cmd: unix, args };
  }
  console.error("Tauri CLI not found. Run npm install from the project folder first.");
  process.exit(1);
}

const setupScript = join(root, "scripts", "ensure-prerequisites.mjs");
if (!existsSync(setupScript)) {
  console.error(
    "[setup] scripts/ensure-prerequisites.mjs is missing. Update the repo: git pull",
  );
  process.exit(1);
}

const setup = spawnSync(process.execPath, [setupScript], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (setup.status !== 0) {
  process.exit(setup.status ?? 1);
}

const args = process.argv.slice(2);
const { cmd, args: tauriArgs } = tauriCommand(args);

const run = spawnSync(cmd, tauriArgs, {
  cwd: root,
  stdio: "inherit",
  env: withCargoOnPath(),
});

if (run.error) {
  console.error(run.error.message);
  process.exit(1);
}

process.exit(run.status ?? 1);
