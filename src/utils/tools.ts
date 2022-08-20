import { isEmpty } from "./is";

export function checkedType<T = unknown>(val: T): val is T {
  if (isEmpty(val)) {
    return false
  }
  return val
}

/**
 * @description Find the key of an object by value
 * @param {object} target - Object to be searched for
 * @param {string} value - Value to be found
 * @returns {string} key  Returned key
 */
 export function findKeyByValue(target: { [key: string]: string }, value: string): string {
  const keys = Reflect.ownKeys(target) as Array<string>
  for (let i = 0; i < keys.length; i++) {
    if (target[keys[i]] === value) {
      return keys[i]
    }
  }
  return ''
}

export const mergeOption = (defaultOptions, options) => {
  Object.keys(defaultOptions).forEach(name => {
    if (defaultOptions[name] && typeof defaultOptions[name] == 'object') {
      const value = mergeOption(defaultOptions[name], options[name] || {})
      options[name] = value
    } else if (options[name] === undefined && defaultOptions[name] !== undefined) {
      options[name] = defaultOptions[name]
    }
  })
  return options
}
