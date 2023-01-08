#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

const genDiff = (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), firstPath));
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), secondPath));

  const firstConfig = JSON.parse(firstFile.toString());
  const secondConfig = JSON.parse(secondFile.toString());

  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);

  const uniqueKeys = [...new Set([...firstConfigKeys, ...secondConfigKeys].sort())];

  const diff = uniqueKeys.reduce((acc, key) => {
    const firstConfigValue = firstConfig[key];
    const secondConfigValue = secondConfig[key];

    if (firstConfigValue !== undefined && secondConfigValue !== undefined) {
      if (firstConfigValue === secondConfigValue) {
        // untouched
        acc[`  ${key}`] = firstConfigValue;
        return acc;
      } else {
        // touched
        acc[`- ${key}`] = firstConfigValue;
        acc[`+ ${key}`] = secondConfigValue;
        return acc;
      }
    }

    // deleted
    if (secondConfigValue === undefined && firstConfigValue !== undefined) {
      acc[`- ${key}`] = firstConfigValue;
      return acc;
    }

    // added
    if (secondConfigValue !== undefined && firstConfigValue === undefined) {
      acc[`+ ${key}`] = secondConfigValue;
      return acc;
    }
  }, {});

  const diffString = JSON.stringify(diff, null, 2);

  const unquotedDiffString = diffString.replace(/"([^"]+)":/g, '$1:');

  return unquotedDiffString;
};

program
  .version('0.0.0')
  .description(`Compares two configuration files and shows a difference.`)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((firstPath, secondPath, { format }) => {
    const result = genDiff(firstPath, secondPath);

    console.log(result);
  });

program.parse(process.argv);

export default genDiff;
