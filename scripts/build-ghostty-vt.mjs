import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const zigDir = join(root, "native", "ghostty_vt", "zig");
const prefix = join(root, "native", "ghostty_vt", "zig-out");
const ghosttySrc = join(zigDir, "ghostty_src");

if (!existsSync(ghosttySrc)) {
  throw new Error(
    "ghostty sources not found. Expected symlink at native/ghostty_vt/zig/ghostty_src."
  );
}

const zig = process.env.ZIG || "zig";
const result = spawnSync(
  zig,
  ["build", "-Doptimize=ReleaseFast", "--prefix", prefix],
  { cwd: zigDir, stdio: "inherit" }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
