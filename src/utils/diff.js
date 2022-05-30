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

  for (let [index, item] of news) {
    const oldIndex = oldsKeys.indexOf(item[key])
    if (oldIndex == -1) {
      item.newIndex = index
      created.push(item);
    } else if (olds[oldIndex] != item) {
      item.oldIndex = oldIndex
      updated.push(item);
    }
  }

  for (let [index, item] of olds) {
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
    if (Object.hasOwnProperty.call(olds, key)) {
      if (olds[key] != news[key]) {
        updated[key] = news[key];
      }
    } else {
      updated[key] = news[key];
    }
  }

  for (const key in olds) {
    if (!Object.hasOwnProperty.call(news, key)) {
      deleted.push(key)
    }
  }

  return { deleted, updated };
}

const deletedKeys = (arr = [], obj = {}, key = 'id') => {
  const deleted = [];

  const keys = arr.map(item => item[key]);

  for (const key in obj) {
    if (!keys.includes(key)) {
      deleted.push(key)
    }
  }

  return deleted;
}

export { diffArr, diffObj, deletedKeys };
