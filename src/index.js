import path from 'path';
import getParser from './parsers.js';
import getDiffTree from './getDiffTree.js';
import getFormatter from './formatters/index.js';
import readFileSync from './util/readFileSync.js';

const genDiff = (firstPath, secondPath, format = 'stylish') => {
  const firstFile = readFileSync(firstPath);
  const secondFile = readFileSync(secondPath);

  const fileExtnameFirst = path.extname(firstPath);
  const fileExtnameSecond = path.extname(secondPath);

  const parseFirstFile = getParser(fileExtnameFirst);
  const parseSecondFile = getParser(fileExtnameSecond);

  const parsedDataFirst = parseFirstFile(firstFile.toString());
  const parsedDataSecond = parseSecondFile(secondFile.toString());

  return getFormatter(getDiffTree(parsedDataFirst, parsedDataSecond), format);
};

export default genDiff;
