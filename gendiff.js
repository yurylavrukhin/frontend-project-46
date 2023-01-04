#!/usr/bin/env node
import { program } from 'commander';

program
  .version('0.0.0')
  .description(`Compares two configuration files and shows a difference.`)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
