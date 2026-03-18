# Obsidian Ghostty Terminal

Minimal Obsidian plugin scaffold for a Ghostty-powered terminal view.

## Development

Prerequisites: [mise](https://mise.jdx.dev/) — all other tools (zig, node, bun) are managed automatically.

```bash
mise install          # install toolchain (zig 0.14.1, node, bun)
mise run install      # install npm dependencies
mise run build:all    # full production build (JS + native + pty for Electron)
```

See all available tasks with `mise tasks`.

### Individual build steps

```bash
mise run build                 # production JS bundle
mise run build:native:electron # native ghostty_vt for Obsidian's Electron
mise run build:pty:electron    # rebuild node-pty for Obsidian's Electron
mise run dev                   # JS watch mode
```

### Install into a vault

```bash
mise run vault:install /path/to/your/vault
```

### Notes

- Ghostty sources are vendored under `vendor/ghostty`
- `ZIG=/path/to/zig` overrides the mise-managed zig if needed
