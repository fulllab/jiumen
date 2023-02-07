const { MODE } = import.meta.env

export interface CreateStorageParams {
  prefixKey?: string
  storage?: Storage
}

export const createStorage = ({ prefixKey = '', storage = localStorage }) => {
  /**
   *Cache class
   *Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${MODE}_${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     *
     *  Set cache
     * @param {string} key
     * @param {*} value
     * @expire Expiration time in seconds
     * @memberof Cache
     */
    set(key: string, value: any) {
      const stringData = JSON.stringify({
        value,
      })
      this.storage.setItem(this.getKey(key), stringData)
    }

    /**
     *Read cache
     * @param {string} key
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))
      if (!val) return def

      return JSON.parse(val).value
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear()
    }
  }
  return new WebStorage()
}

export const createKVStorage = ({ prefixKey = '', storage = localStorage }) => {
  const ls = createStorage({ prefixKey, storage })

  const setItem = (key: string, itemKey: string, value: any) => {
    const data = ls.get(key)
    if (!data) {
      ls.set(key, {
        [itemKey]: value,
      })
      return
    }
    data[itemKey] = value
    ls.set(key, data)
  }

  const getItem = (key: string, itemKey: string) => {
    const data = ls.get(key)
    return data ? data[itemKey] : null
  }

  const removeItem = (key: string, itemKey: string) => {
    const data = ls.get(key)
    if (data) {
      delete data[itemKey]
    }
    ls.set(key, data)
  }

  return {
    setItem,
    getItem,
    removeItem,
  }
}
