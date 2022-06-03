import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { computed } from 'vue'
import { Locales } from './'

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()

  const getLocale = computed(() => localeStore.getLocale)
  const getAntLocale = computed(() => Locales[localeStore.getLocale])

  return {
    getLocale,
    getAntLocale,
  }
}
