const adapterArray = (value) => {
  return Array.isArray(value) ? value : [value];
};

const diffArr = (news = [], olds = [], key = 'id') => {
  news = adapterArray(news);
  olds = adapterArray(olds);

  const created = [];
  const deleted = [];
  const updated = [];

  const oldsKeys = olds.map(item => item[key]);
  const newsKeys = news.map(item => item[key]);

  for (let [index, item] of news.entries()) {
    const oldIndex = oldsKeys.indexOf(item[key])
    if (oldIndex == -1) {
      item.newIndex = index
      created.push(item);
    } else if (olds[oldIndex] != item) {
      item.oldIndex = oldIndex
      updated.push(item);
    }
  }

  for (let [index, item] of olds.entries()) {
    if (!newsKeys.includes(item[key])) {
      deleted.push(index);
    }
  }

  return { created, deleted, updated };
};

const diffObj = (news = {}, olds = {}) => {
  const deleted = [];
  const updated = {};

  for (const key in news) {
    // When null, it means delete
    if (!news[key]) {
      deleted.push(key)
    } else {
      const inOlds = Object.hasOwnProperty.call(olds, key)
      if ((inOlds && olds[key] != news[key]) || !inOlds) {
        updated[key] = news[key];
      }
    }
  }
  return { deleted, updated };
}

const cleanObjs = (arr = [], obj = {}, key = 'id') => {
  const objKeys = Object.keys(obj)
  const newObj = {};
  arr.map(item => {
    const cKey = item[key]
    if (objKeys.includes(cKey)) {
      newObj[cKey] = obj[cKey]
    }
  });
  return newObj;
}

export { diffArr, diffObj, cleanObjs };
