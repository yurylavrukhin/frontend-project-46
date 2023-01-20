import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const FORMATTING_TYPES = {
  stylish: 'stylish',
  plain: 'plain',
  json: 'json',
};

export default (data, format) => {
  switch (format) {
    case FORMATTING_TYPES.stylish:
      return stylish(data);
    case FORMATTING_TYPES.plain:
      return plain(data);
    case FORMATTING_TYPES.json:
      return json(data);
    default:
      throw new Error(`Unknown formatting type: ${format}. Pick one of the available formatting types: ${Object.values(FORMATTING_TYPES).join(', ')}.`);
  }
};
