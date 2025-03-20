'use strict'
import path from 'path';
const directory = './lib';
const moduleMap = {};
const files = fs.readdir(directory);

for (const file of files) {
  if (file.endsWith('.js')) {
    const modulePath = path.join(directory, file);
    try {
      const module = import(modulePath);
      moduleMap[file.slice(0, -3)] = module;
    } catch (error) {
      console.error(`Error importing ${file}:`, error);
    }
  }
}
export default moduleMap;

