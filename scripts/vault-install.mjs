import { cpSync, existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const usage = `Usage: bun run vault:install [-f|--force] [-l|--link] <path-to-vault>

Install the Ghostty terminal plugin into an Obsidian vault.

Options:
  -f, --force  Overwrite existing installation
  -l, --link   Symlink project directory instead of copying files
  -h, --help   Show this help message`;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    force: { type: "boolean", short: "f", default: false },
    link: { type: "boolean", short: "l", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (values.help) {
  console.log(usage);
  process.exit(0);
}

const vaultPath = positionals[0];
if (!vaultPath) {
  console.error(usage);
  process.exit(1);
}

const requiredFiles = ["main.js", "manifest.json", "styles.css", "native/ghostty_vt.node"];
const missing = requiredFiles.filter((f) => !existsSync(join(root, f)));
if (missing.length > 0) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  console.error("Run 'bun run build && bun run build:native:electron' first.");
  process.exit(1);
}

const dest = join(vaultPath, ".obsidian", "plugins", "ghostty-terminal");
const destExists = existsSync(dest) || lstatSync(dest, { throwIfNoEntry: false });

if (destExists && !values.force) {
  console.error(`${dest} already exists. Use -f/--force to overwrite.`);
  process.exit(1);
}

if (values.link) {
  if (destExists) rmSync(dest, { recursive: true });
  mkdirSync(dirname(dest), { recursive: true });
  symlinkSync(root, dest, "dir");
  console.log(`Symlinked ${dest} -> ${root}`);
} else {
  mkdirSync(join(dest, "native"), { recursive: true });

  for (const f of requiredFiles) {
    cpSync(join(root, f), join(dest, f));
  }

  console.log(`Installed to ${dest}`);
}
