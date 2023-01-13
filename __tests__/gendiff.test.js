import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../gendiff.js';

// eslint-disable-next-line
 /* eslint-disable */const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

test('flat JSON. should handle: untouched, touched, deleted, added fields', () => {
  const firstPath = getFixturePath('./file1.json');
  const secondPath = getFixturePath('./file2.json');

  const expectedPath = getFixturePath('./expected.txt');

  const actualOutput = genDiff(firstPath, secondPath);
  const expectedOutput = fs.readFileSync(expectedPath).toString().trim();

  expect(actualOutput).toBe(expectedOutput);
});
