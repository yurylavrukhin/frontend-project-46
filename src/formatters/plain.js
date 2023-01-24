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

export default (tree) => {
  const iter = (node, key) => {
    const result = node.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.type) {
        case 'nested':
          return iter(item.children, newKeys);
        case 'added':
          return `Property '${newKeys.join(
            '.',
          )}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'changed':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(
            item.value1,
          )} to ${stringify(item.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(
            `Unknown tree type: ${item.type}, this seems to be an issue with the package, please submit an issue -> https://github.com/yurylavrukhin/frontend-project-46/issues.`,
          );
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };

  return iter(tree, []);
};
