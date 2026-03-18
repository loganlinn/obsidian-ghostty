# Obsidian Ghostty Terminal

Minimal Obsidian plugin scaffold for a Ghostty-powered terminal view.

## Development

Prerequisites: [mise](https://mise.jdx.dev/) — all other tools (zig, node, bun) are managed automatically.

```bash
git clone --recurse-submodules https://github.com/ComputelessComputer/obsidian-ghostty.git
cd obsidian-ghostty
mise install          # install toolchain (zig 0.14.1, node, bun)
mise run setup        # init submodules + install npm deps
mise run build:all    # full production build (JS + native + pty for Electron)
```

If you already cloned without `--recurse-submodules`:
```bash
mise run ghostty:init
```

See all available tasks with `mise tasks`.

### Individual build steps

```bash
mise run build                 # production JS bundle
mise run build:native:electron # native ghostty_vt for Obsidian's Electron
mise run build:pty:electron    # rebuild node-pty for Obsidian's Electron
mise run dev                   # JS watch mode
```

### Ghostty submodule

Ghostty sources live in `vendor/ghostty` as a git submodule pinned to a release tag.

```bash
mise run ghostty:version       # show pinned version
mise run ghostty:update        # update to latest tag
mise run ghostty:update v1.3.0 # pin to a specific version
```

After updating, commit the submodule pointer:
```bash
git add vendor/ghostty
git commit -m "vendor: bump ghostty to $(mise run ghostty:version)"
```

### Install into a vault

```bash
mise run vault:install /path/to/your/vault
```

### Notes

- `ZIG=/path/to/zig` overrides the mise-managed zig if needed
