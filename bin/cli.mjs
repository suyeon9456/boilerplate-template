import { mkdirSync, readdirSync, statSync, copyFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const projectName = process.argv[2] || "my-app";
const targetPath = join(process.cwd(), projectName);
const templatePath = join(__dirname, "../template");

function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const item of readdirSync(src)) {
    const srcItem = join(src, item);
    const destItem = join(dest, item);
    if (statSync(srcItem).isDirectory()) {
      copyRecursive(srcItem, destItem);
    } else {
      copyFileSync(srcItem, destItem);
    }
  }
}

console.log(`🚀 Creating project "${projectName}"`);
copyRecursive(templatePath, targetPath);
console.log(`✅ Done! Run:\n\n  cd ${projectName}\n  npm install`);
