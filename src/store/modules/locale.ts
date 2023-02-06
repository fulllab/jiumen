import type { LocaleType } from '../../types'
import { defineStore } from 'pinia'
import { store } from '../'
import { LOCALE_KEY } from '../../types/cacheEnum'
import { createStorage } from '../../utils/localStorage'

const ls = createStorage({})

interface LocaleState {
  locale: LocaleType
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    locale: 'en',
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale
    },
    getLocaleLs(): LocaleType | null {
      return ls.get(LOCALE_KEY) as LocaleType
    },
  },
  actions: {
    setLocale(language: LocaleType) {
      this.locale = language
      ls.set(LOCALE_KEY, language)
    },
  },
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
