import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getDiffTree from './getDiffTree.js';
import formatter from './formatters/stylish.js';

const genDiff = (firstPath, secondPath, options = { format: 'stylish' }) => {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), firstPath));
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), secondPath));

  const firstFileExt = path.extname(firstPath);
  const secondFileExt = path.extname(secondPath);

  const firstFileParser = getParser(firstFileExt);
  const secondFileParser = getParser(secondFileExt);

  const firstConfig = firstFileParser(firstFile.toString());
  const secondConfig = secondFileParser(secondFile.toString());

  return formatter(getDiffTree(firstConfig, secondConfig), options.format);
};

export default genDiff;
