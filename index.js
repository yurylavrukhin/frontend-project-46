#!/usr/bin/env node
import { program } from 'commander';
import genDiff from './gendiff.js';

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((firstPath, secondPath, format) => {
    const result = genDiff(firstPath, secondPath, format.format);

    console.log(result);
  });

program.parse(process.argv);
