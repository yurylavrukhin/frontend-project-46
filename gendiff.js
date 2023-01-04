#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';

const genDiff = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);

  const keys = new Set([...firstConfigKeys, ...secondConfigKeys].sort());

  let result = `{
    `;

  keys.forEach((key) => {
    const firstConfigValue = firstConfig[key];
    const secondConfigValue = secondConfig[key];

    if (
      firstConfigValue !== undefined &&
      firstConfigValue !== undefined &&
      firstConfigValue === secondConfigValue
    ) {
      result += `    ${key}: ${firstConfigValue}
    `;
    }

    if (secondConfigValue === undefined && firstConfigValue !== undefined) {
      result += `  - ${key}: ${firstConfigValue}
    `;
    }

    if (
      secondConfigValue !== undefined &&
      firstConfigValue !== undefined &&
      firstConfigValue !== secondConfigValue
    ) {
      result += `  - ${key}: ${firstConfigValue}
    `;
      result += `  + ${key}: ${secondConfigValue}
    `;
    }

    if (secondConfigValue !== undefined && firstConfigValue === undefined) {
      result += `  + ${key}: ${secondConfigValue}
    `;
    }
  });

  result += `}`;

  return result;
};

program
  .version('0.0.0')
  .description(`Compares two configuration files and shows a difference.`)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((firstPath, secondPath, { format }) => {
    const firstFile = fs.readFileSync(path.resolve(process.cwd(), firstPath));
    const secondFile = fs.readFileSync(path.resolve(process.cwd(), secondPath));

    const firstConfig = JSON.parse(firstFile.toString());
    const secondConfig = JSON.parse(secondFile.toString());

    const result = genDiff(firstConfig, secondConfig);

    console.log(result);
  });

program.parse(process.argv);

export default genDiff;
