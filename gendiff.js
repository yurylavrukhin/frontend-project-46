import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';

const genDiff = (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), firstPath));
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), secondPath));

  const firstFileExt = path.extname(firstPath);
  const secondFileExt = path.extname(secondPath);

  const firstFileParser = getParser(firstFileExt);
  const secondFileParser = getParser(secondFileExt);

  const firstConfig = firstFileParser(firstFile.toString());
  const secondConfig = secondFileParser(secondFile.toString());

  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);

  const uniqueKeys = [
    ...new Set([...firstConfigKeys, ...secondConfigKeys].sort()),
  ];

  const diff = uniqueKeys.reduce((acc, key) => {
    const firstConfigValue = firstConfig[key];
    const secondConfigValue = secondConfig[key];

    if (firstConfigValue !== undefined && secondConfigValue !== undefined) {
      if (firstConfigValue === secondConfigValue) {
        // untouched
        acc[`  ${key}`] = firstConfigValue;
        return acc;
      }

      // touched
      acc[`- ${key}`] = firstConfigValue;
      acc[`+ ${key}`] = secondConfigValue;
      return acc;
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

    return acc;
  }, {});

  const diffString = JSON.stringify(diff, null, 2);

  const unquotedDiffString = diffString.replace(/"([^"]+)":/g, '$1:');

  return unquotedDiffString;
};

export default genDiff;
