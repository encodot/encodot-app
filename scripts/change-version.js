console.log('--------------------------------');
console.log('Running script change-version.js');
console.log('--------------------------------');

try {

  const path = require('path');
  const fs = require('fs');
  const util = require('util');

  // promisify core API's
  const writeFile = util.promisify(fs.writeFile);

  console.log('\nreading package files...\n');

  const packageFiles = [
    {name: 'sk.montage-app.app', path: '../package.json', contentJSON: null},
    {name: 'sk.montage-app.app lockfile', path: '../package-lock.json', contentJSON: null}
  ];

  // load package files
  for (let i = 0; i < packageFiles.length; i++) {
    packageFiles[i].contentJSON = require(packageFiles[i].path);
    console.log(`${packageFiles[i].name} version: ${packageFiles[i].contentJSON.version}`);
  }

  // @see: https://github.com/SBoudrias/Inquirer.js
  const inquirer = require('inquirer');

  const questions = [{
    type: 'input',
    name: 'version',
    message: "Version Format: x.xx.xxx, -alpha.{n}, -beta.{n} or -next.{n} are allowed\nYour new version:",
    // Die Eingabe darf leer sein oder muss dem Format bspw 8.2.151 entsprechen
    validate: v => v == null
      || v.toString().length === 0
      || v.toString().match(/^\d{1,2}\.\d{1,2}\.\d{1,3}((-alpha|-beta|-next)\.\d{1,3})?$/) != null
  }];

  inquirer.prompt(questions).then(answers => {
    const newVersion = answers['version'];

    if (newVersion == null || newVersion.toString().length === 0) {
      console.log('\nNo version provided, skip change\n');
      return;
    }

    console.log('\nUpdating versions...\n');

    for (let i = 0; i < packageFiles.length; i++) {
      packageFiles[i].contentJSON.version = newVersion;
      writeFile(
        path.join(__dirname + '/' + packageFiles[i].path),
        JSON.stringify(packageFiles[i].contentJSON, null, 2).replace(/\n/gm, "\r\n") + "\r\n"
      )
      .then(() => console.log(`${packageFiles[i].name} successful updated`))
      .catch(() => console.log(`Error while updating ${packageFiles[i].name} version`));
    }
  });
} catch (error) {
  console.error(error.toString());
}
