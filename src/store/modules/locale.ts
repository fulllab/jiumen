import type { LocaleType } from '@/types'
import { defineStore } from 'pinia'
import { store } from '@/store'

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
  },
  actions: {
    setLocale(language: LocaleType) {
      this.locale = language
      // ls
    },
  },
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
