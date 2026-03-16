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
- [Rust](https://rustup.rs/)
- [Tauri CLI](https://tauri.app/start/prerequisites/)

## Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ogs-dorklab.git
cd ogs-dorklab

# Install dependencies
npm install

# Run in development mode
npm run tauri dev
```

## Build for Distribution

```bash
npm run tauri build
```

This produces installers in `src-tauri/target/release/bundle/`.

## Disclaimer

This tool is intended for authorized security testing, bug bounty programs, OSINT research, and educational purposes only. Always obtain proper authorization before performing reconnaissance on systems you do not own. The authors are not responsible for misuse of this tool.

## License

This project is licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
