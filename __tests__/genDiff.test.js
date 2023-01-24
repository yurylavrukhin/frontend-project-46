import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFileSync = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  {
    firstFilename: 'file1.json',
    secondFilename: 'file2.json',
    format: 'stylish',
    expectedFilename: 'expected-stylish.txt',
    extname: 'json',
  },
  {
    firstFilename: 'file1.json',
    secondFilename: 'file2.json',
    format: 'plain',
    expectedFilename: 'expected-plain.txt',
    extname: 'json',
  },
  {
    firstFilename: 'file1.json',
    secondFilename: 'file2.json',
    format: 'json',
    expectedFilename: 'expected-json.txt',
    extname: 'json',
  },
  {
    firstFilename: 'file1.yml',
    secondFilename: 'file2.yml',
    format: 'stylish',
    expectedFilename: 'expected-stylish.txt',
    extname: 'yml',
  },
  {
    firstFilename: 'file1.yml',
    secondFilename: 'file2.yml',
    format: 'plain',
    expectedFilename: 'expected-plain.txt',
    extname: 'yml',
  },
  {
    firstFilename: 'file1.yml',
    secondFilename: 'file2.yml',
    format: 'json',
    expectedFilename: 'expected-json.txt',
    extname: 'yml',
  },
])(
  'should generate diff for .$extname files in $format formatting',
  ({
    firstFilename,
    secondFilename,
    format,
    expectedFilename,
  }) => {
    const firstPath = getFixturePath(firstFilename);
    const secondPath = getFixturePath(secondFilename);

    const actualOutput = genDiff(firstPath, secondPath, format);
    const expectedOutput = readFileSync(expectedFilename);

    expect(actualOutput).toBe(expectedOutput);
  },
);

test.each([
  {
    firstFilename: 'file1.json',
    secondFilename: 'file2.json',
    expectedFilename: 'expected-stylish.txt',
    extname: 'json',
  },
  {
    firstFilename: 'file1.yml',
    secondFilename: 'file2.yml',
    expectedFilename: 'expected-stylish.txt',
    extname: 'yml',
  },
])(
  'should generate diff for .$extname files in stylish formatting when format is not specified',
  ({ firstFilename, secondFilename, expectedFilename }) => {
    const firstPath = getFixturePath(firstFilename);
    const secondPath = getFixturePath(secondFilename);

    const actualOutput = genDiff(firstPath, secondPath);
    const expectedPlainOutput = readFileSync(expectedFilename);

    expect(actualOutput).toBe(expectedPlainOutput);
  },
);
