import fs from 'fs';
import path from 'path';

export default (pathToFile) => fs.readFileSync(path.resolve(process.cwd(), pathToFile));
