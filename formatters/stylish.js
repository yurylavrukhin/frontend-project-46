const indent = (depth, spacesCount = 2) => '  '.repeat(spacesCount * depth);

const signIndent = (depth, spacesCount = 2) => '  '.repeat(spacesCount * depth).slice(2);

const SIGNS = {
  add: '+',
  substract: '-',
  empty: ' ',
};

const stringify = (value, treeDepth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const arrayValue = Object.entries(value);
  const lines = arrayValue.map(([key, val]) => `${indent(treeDepth + 1)}${key}: ${stringify(val, treeDepth + 1)}`);

  return ['{', ...lines, `${indent(treeDepth)}}`].join('\n');
};

export default (innerTree) => {
  const iter = (tree, depth) => tree.map((item) => {
    const typeDiff = item.type;

    const getValue = (value, sign) => `${signIndent(depth)}${sign} ${item.key}: ${stringify(value, depth)}\n`;

    switch (typeDiff) {
      case 'object':
        return `${indent(depth)}${item.key}: {\n${iter(
          item.children,
          depth + 1,
        ).join('')}${indent(depth)}}\n`;
      case 'added':
        return getValue(item.value, SIGNS.add);
      case 'deleted':
        return getValue(item.value, SIGNS.substract);
      case 'untouched':
        return getValue(item.value, SIGNS.empty);
      case 'touched':
        return `${getValue(item.value1, SIGNS.substract)}${getValue(
          item.value2,
          SIGNS.add,
        )}`;
      default:
        return `Error: Unknown type: ${item.type}`;
    }
  });

  return `{\n${iter(innerTree, 1).join('')}}`;
};
