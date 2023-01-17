import stylish from './stylish.js';
import plain from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      return `Error: Unknown type: ${format}`;
  }
};