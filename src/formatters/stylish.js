const INDENTATION = '  ';

const SIGNS = {
  add: '+',
  substract: '-',
  empty: ' ',
};

const indent = (depth, spacesCount = 2) => INDENTATION.repeat(spacesCount * depth);

const signIndent = (depth, spacesCount = 2) => INDENTATION.repeat(spacesCount * depth).slice(2);

const stringify = (value, treeDepth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(treeDepth + 1)}${key}: ${stringify(val, treeDepth + 1)}`,
  );

  return ['{', ...lines, `${indent(treeDepth)}}`].join('\n');
};

export default (tree) => {
  const iter = (innerTree, depth) => innerTree.map((item) => {
    const getValue = (value, sign) => `${signIndent(depth)}${sign} ${item.key}: ${stringify(value, depth)}\n`;

    switch (item.type) {
      case 'nested':
        return `${indent(depth)}${item.key}: {\n${iter(
          item.children,
          depth + 1,
        ).join('')}${indent(depth)}}\n`;
      case 'added':
        return getValue(item.value, SIGNS.add);
      case 'deleted':
        return getValue(item.value, SIGNS.substract);
      case 'changed':
        return (
          getValue(item.value1, SIGNS.substract)
          + getValue(item.value2, SIGNS.add)
        );
      case 'unchanged':
        return getValue(item.value, SIGNS.empty);
      default:
        throw new Error(
          `Unknown tree type: ${item.type}, this seems to be an issue with the package, please submit an issue -> https://github.com/yurylavrukhin/frontend-project-46/issues.`,
        );
    }
  });

  return `{\n${iter(tree, 1).join('')}}`;
};
