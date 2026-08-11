/**
 * Sync frontend/ → docs/ for GitHub Pages.
 *
 * docs/ is a full mirror of frontend/ (index.html + assets/). After editing
 * the frontend, run this to keep the deployed copy in sync:
 *
 *   npm run sync:docs
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "frontend");
const dest = path.join(root, "docs");

if (!fs.existsSync(src)) {
  console.error("Missing source folder: " + src);
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });

console.log("Synced frontend/ → docs/");
