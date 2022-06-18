const adapterArray = value => {
  return Array.isArray(value) ? value : [value]
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isObjectValueEqual(a, b) {
  const ignoreProperty = 'render'
  if (a === b) return true
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  if (
    aProps.length !== bProps.length &&
    !aProps.includes(ignoreProperty) &&
    !bProps.includes(ignoreProperty)
  ) {
    return false
  }

  for (const k in a) {
    if (b.hasOwnProperty(k)) {
      if (typeof a[k] === 'object') {
        if (!isObjectValueEqual(a[k], b[k])) return false
      } else {
        if (a[k] !== b[k]) return false
      }
    } else {
      if (k != ignoreProperty) return false
    }
  }
  return true
}

const diffArr = (news: Array<any> = [], olds: Array<any> = [], key = 'id') => {
  news = adapterArray(news);
  olds = adapterArray(olds);

  const created: Array<any> = []
  const deleted: Array<any> = []
  const updated: Array<any> = []

  const oldsKeys = olds.map(item => item[key])
  const newsKeys = news.map(item => item[key])

  for (let [index, item] of news.entries()) {
    const oldIndex = oldsKeys.indexOf(item[key])
    if (oldIndex == -1) {
      item.newIndex = index.toString()
      created.push(item)
    } else if (!isObjectValueEqual(olds[oldIndex + 1 - 1], item)) {
      console.log('olds', olds[oldIndex])
      console.log('item', item)

      // item.oldIndex = oldIndex
      updated.push(item)
    }
  }

  for (let [index, item] of olds.entries()) {
    if (!newsKeys.includes(item[key])) {
      deleted.push(index)
    }
  }

  return { created, deleted, updated }
}

const diffObj = (news = {}, olds = {}) => {
  const deleted: Array<string> = []
  const updated = {}

  for (const key in news) {
    const inOlds = Object.hasOwnProperty.call(olds, key)
    // When null, it means delete
    if (!news[key]) {
      if (inOlds) {
        deleted.push(key)
      }
    } else {
      if ((inOlds && olds[key] != news[key]) || !inOlds) {
        updated[key] = news[key]
      }
    }
  }
  return { deleted, updated }
}

const cleanObjs = (arr = [], obj = {}, key = 'id') => {
  const objKeys = Object.keys(obj)
  const newObj = {}
  arr.map(item => {
    const cKey = item[key]
    if (objKeys.includes(cKey)) {
      newObj[cKey] = obj[cKey]
    }
  })
  return newObj
}

export { diffArr, diffObj, cleanObjs }
