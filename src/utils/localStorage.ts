const { MODE } = import.meta.env

export interface CreateStorageParams {
  prefixKey?: string;
  storage?: Storage;
}

export const createStorage = ({
  prefixKey = '',
  storage = localStorage,
}) => {

  /**
   *Cache class
   *Construction parameters can be passed into sessionStorage, localStorage,
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
    }

    private getKey(key: string) {
      return `${MODE}_${this.prefixKey}${key}`.toUpperCase();
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
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    /**
     *Read cache
     * @param {string} key
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      return JSON.parse(val);
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
