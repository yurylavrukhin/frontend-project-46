import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../gendiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish format: should generate the diff', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected-stylish.txt');

  const actualOutput = genDiff(firstPath, secondPath);
  const expectedStylishOutput = fs.readFileSync(expectedPath).toString();

  expect(actualOutput).toBe(expectedStylishOutput);
});

test('plain format: should generate the diff', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected-plain.txt');

  const actualOutput = genDiff(firstPath, secondPath, 'plain');
  const expectedPlainOutput = fs.readFileSync(expectedPath).toString();

  expect(actualOutput).toBe(expectedPlainOutput);
});

test('json format: should generate the diff', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected-json.txt');

  const actualOutput = genDiff(firstPath, secondPath, 'json');
  const expectedJsonOutput = fs.readFileSync(expectedPath).toString();

  expect(actualOutput).toBe(expectedJsonOutput);
});
