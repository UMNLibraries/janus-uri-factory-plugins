import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const directory = path.join(__dirname, "lib");

const moduleMap = {};
const files = fs.readdirSync(directory);

for (const file of files) {
  if (file.endsWith(".js")) {
    const moduleName = path.basename(file, ".js"); // Remove .js extension
    const modulePath = pathToFileURL(path.join(directory, file)).href; // Convert to URL

    try {
      moduleMap[moduleName] = await import(modulePath); // ESM requires async import
    } catch (error) {
      console.error(`Error importing ${file}:`, error);
    }
  }
}

export default moduleMap;
