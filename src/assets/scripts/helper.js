export const sortObjectsArrayData = (arr, orderArray, sortingKey) => {
  const typeToObjects = arr.reduce((acc, obj) => {
    const SORTING_KEY = obj[sortingKey];
    if (!acc[SORTING_KEY]) {
      acc[SORTING_KEY] = [];
    }
    acc[SORTING_KEY].push(obj);
    return acc;
  }, {});

  return orderArray.reduce((acc, key) => {
    const objects = typeToObjects[key];
    if (objects) {
      objects.forEach((obj) => {
        acc.push(obj);
      });
    }
    return acc;
  }, []);
};

export const sortObjectsData = (object, orderArray, sortingKey) => {
  const colorToKeys = Object.keys(object).reduce((acc, key) => {
    const SORTING_KEY = object[key][sortingKey];
    if (!acc[SORTING_KEY]) {
      acc[SORTING_KEY] = [];
    }
    acc[SORTING_KEY].push(key);
    return acc;
  }, {});

  return orderArray.reduce((acc, color) => {
    const keys = colorToKeys[color];
    if (keys) {
      keys.forEach((key) => {
        acc[key] = object[key];
      });
    }
    return acc;
  }, {});
};

export const pluralSingularConverter = (count, pl, sg) => {
  if (count === 1 || count === -1) {
    return sg;
  }
  return pl;
};
