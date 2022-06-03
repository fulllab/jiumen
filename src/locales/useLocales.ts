import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { computed } from 'vue'
import { Locales } from './'
import { LocaleString } from '@/types'

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()

  const getLocale = computed(() => localeStore.getLocale)
  const getAntLocale = computed(() => Locales[localeStore.getLocale])
  const localeExtend = computed((localeString: LocaleString) => localeString[localeStore.getLocale] || '')

  return {
    getLocale,
    getAntLocale,
    localeExtend,
  }
}
