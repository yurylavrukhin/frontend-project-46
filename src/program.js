import { program } from 'commander';
import genDiff from './index.js';

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((firstPath, secondPath, options) => {
    const result = genDiff(firstPath, secondPath, options.format);

    console.log(result);
  });

export default () => program.parse(process.argv);
