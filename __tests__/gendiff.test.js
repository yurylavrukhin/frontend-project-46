import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../gendiff.js';

/* eslint-disable */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

test('yaml. should handle: untouched, touched, deleted, added fields', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.yml');

  const expectedPath = getFixturePath('./expected.txt');

  const actualOutput = genDiff(firstPath, secondPath);
  const expectedOutput = fs.readFileSync(expectedPath).toString().trim();

  expect(actualOutput).toBe(expectedOutput);
});

test('stylish. should handle: untouched, touched, deleted, added fields', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected.txt');

  const actualOutput = genDiff(firstPath, secondPath);
  const expectedOutput = fs.readFileSync(expectedPath).toString().trim();

  expect(actualOutput).toBe(expectedOutput);
});

test('plain. should handle: untouched, touched, deleted, added fields', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected-plain.txt');

  const actualOutput = genDiff(firstPath, secondPath, { format: 'plain' });
  const expectedOutput = fs.readFileSync(expectedPath).toString().trim();

  expect(actualOutput).toBe(expectedOutput);
});

test('json. should handle: untouched, touched, deleted, added fields', () => {
  const firstPath = getFixturePath('./file1.yml');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected-json.txt');

  const actualOutput = genDiff(firstPath, secondPath, { format: 'json' });
  const expectedOutput = fs.readFileSync(expectedPath).toString().trim();

  expect(actualOutput).toBe(expectedOutput);
});
