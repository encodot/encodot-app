const {
  readdir,
  rename
} = require('fs').promises;
const {
  join,
  resolve,
  sep
} = require('path');

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));

  return Array.prototype.concat(...files).map(p => {
    const rep = join(__dirname, dir) + sep;
    return p.replace(rep, '');
  });
}

async function main() {
  if (process.argv.length < 4) {
    throw new Error(`Invalid parameter:\r\n\r\n  this-script.js [relative path] [search string] [replace string]`);
  }

  let [ relativePath, searchStr, replaceStr ] = process.argv.slice(process.argv.length - 3);

  let files = (await getFiles(relativePath))
    .filter(f => f.search(searchStr) !== -1)
    .map(f => [ f, f.replace(searchStr, replaceStr) ]);

  for (let file of files) {
    const [ originalName, newName ] = file;

    console.log(`${originalName} -> ${newName}`);
    await rename(join(relativePath, originalName), join(relativePath, newName));
  }
}

main();
