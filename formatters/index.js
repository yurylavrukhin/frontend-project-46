import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      return `Error: Unknown type: ${format}`;
  }
};
