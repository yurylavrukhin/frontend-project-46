import _ from 'lodash';

const getDiffTree = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'object', children: getDiffTree(value1, value2) };
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'untouched',
        value: value1,
      };
    }

    if (!_.has(object1, key)) {
      return { key, type: 'added', value: value2 };
    }

    if (!_.has(object2, key)) {
      return { key, type: 'deleted', value: value1 };
    }

    return {
      key,
      type: 'touched',
      value1,
      value2,
    };
  });
};

export default getDiffTree;
