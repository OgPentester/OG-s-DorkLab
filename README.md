# OG's DorkLab:

A desktop Google dork search tool built for OSINT and security research. Build advanced search queries visually and execute them across multiple search engines.

Built with Tauri 2 + React.

## Features

- **Visual Query Builder** — construct dork queries with operators like `site:`, `inurl:`, `intitle:`, `filetype:`, `intext:`, and more
- **100+ OSINT Templates** — pre-built dorks across 10 categories:
  - Exposed Files, Login Pages, Sensitive Directories, Error Messages, Network Devices, Document Discovery, Cloud & SaaS, Vulnerable Servers, Passwords & Credentials, Social & People
- **Multi-Engine Search** — search across Google, Bing, DuckDuckGo, Yandex, and Brave
- **Search All** — open your query in all 5 engines simultaneously
- **Target Domain** — set a domain and templates auto-prepend `site:`
- **Search History** — tracks recent queries for quick re-use
- **Dark Theme** — red and black UI

## Screenshot

_Coming soon_

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- **Rust + Windows C++ tools** — installed automatically on `npm install` (see below)
- Tauri CLI is included as an npm dev dependency (no global install)

On **Windows**, the setup script can also install **Visual Studio 2022 Build Tools** (C++ workload) via `winget` when the MSVC linker is missing. That step may require administrator approval and takes several minutes.

To skip automatic setup (e.g. CI with its own Rust/action): `SKIP_PREREQ_SETUP=1 npm install`

To skip only the Visual Studio / winget step: `SKIP_VS_BUILD_TOOLS=1 npm install`

Manual installs: [Rust](https://rustup.rs/), [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)

## Development

**Windows (Command Prompt)** — run each line below; do **not** paste lines that start with `#` (those are only comments in Mac/Linux docs).

```bat
git clone https://github.com/OgPentester/OG-s-DorkLab.git
cd OG-s-DorkLab
git pull
npm install
npm run setup
npm run tauri dev
```

If `git clone` says the folder already exists, you have an old copy — update it instead of cloning again:

```bat
cd OG-s-DorkLab
git pull
npm install
npm run setup
npm run tauri dev
```

**Mac / Linux**

```bash
git clone https://github.com/OgPentester/OG-s-DorkLab.git
cd OG-s-DorkLab
npm install
npm run setup
npm run tauri dev
```

After Rust installs for the first time, open a **new** terminal window, `cd` back into the project, then run `npm run tauri dev` again.

Re-run setup anytime: `npm run setup`

### Troubleshooting

| Problem | Fix |
|--------|-----|
| `'#' is not recognized...` (Windows) | You pasted a comment line. Run only the commands in the blocks above. |
| `cargo metadata` / `program not found` | Run `git pull`, then `npm run setup`. Our wrapper adds Rust to PATH for Tauri; you still need the latest repo with `scripts/`. |
| `npm install` finishes in under a second with no `[setup]` lines | Old checkout — run `git pull` and `npm run setup`. |
| `install-scripts blocked` (npm) | Run `npm run setup` manually; optional: `npm install-scripts approve esbuild` for Vite’s esbuild helper. |

## Build for Distribution

```bash
npm run tauri build
```

This produces installers in `src-tauri/target/release/bundle/`.

## Disclaimer

This tool is intended for authorized security testing, bug bounty programs, OSINT research, and educational purposes only. Always obtain proper authorization before performing reconnaissance on systems you do not own. The authors are not responsible for misuse of this tool.

## License

This project is licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
