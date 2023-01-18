import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

export default (data) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.type) {
        case 'object':
          return iter(item.children, newKeys);
        case 'added':
          return `Property '${newKeys.join(
            '.',
          )}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'untouched':
          return null;
        case 'touched':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(
            item.value1,
          )} to ${stringify(item.value2)}`;
        default:
          return `Unknown type ${item.type}`;
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };
  return iter(data, []);
};
