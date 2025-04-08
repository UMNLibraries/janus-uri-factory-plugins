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
      // Dynamic importing is significantly different than static importing, especially
      // because import() returns a promise instead of evaluating the module.
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
      import(modulePath).then( moduleMap[moduleName] );
    } catch (error) {
      console.error(`Error importing ${file}:`, error);
    }
  }
}

export default moduleMap;
