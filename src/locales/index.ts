/**
 * vue-i18n
 * see more : https://pikax.me/vue-composable/composable/i18n/i18n.html#parameters
 */

import { includes } from 'lodash'
import moment from 'moment'
import { findKeyByValue } from '@/utils/tools'
import { useI18n } from 'vue-composable'
import zhCN from '@/locales/messages/zhCN'
import en from '@/locales/messages/en'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { LocaleType } from '@/types/'

const __LOCALE__ = window.navigator.language.split('-').join('')
const localeStore = useLocaleStoreWithOut()

export const Locales: any = {}

export const TranslateTable: { [key: string]: LocaleType } = {
  en: 'en_US',
  zhCN: 'zh_CN',
}

export const LanguageNameList: { [key: string]: string } = {
  en: 'English',
  zhCN: '简体(中文)',
}

export const i18nInstance = useI18n({
  locale: 'en',
  messages: {
    zhCN,
    en,
  },
})

/**
 * @description Automatic loading of language templates required by antd-vue
 */
function loadAtdLocales() {
  const files = import.meta.globEager(
    '../../node_modules/ant-design-vue/es/locale-provider/*.js',
  )
  Object.keys(files).forEach(key => {
    const fileName = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    if (includes(TranslateTable, fileName)) {
      const localeKey = findKeyByValue(TranslateTable, fileName)
      if (localeKey) {
        Locales[localeKey] = files[key].default
      }
    }
  })
}

/**
 * @functin setLang - set the app's language
 * @param {string} lang - the language will be setted
 * @return {string} lang - langguage name
 */

function _set(lang: keyof typeof TranslateTable): keyof typeof TranslateTable {
  i18nInstance.locale.value = lang as any
  // Set the time for the current language
  moment.locale(TranslateTable[lang])
  // Axios.defaults.headers.common['Accept-Language'] = lang
  localeStore.setLocale(lang as LocaleType)
  return lang
}

/**
 * @functin Asyn loading of custom i18n templates
 * @param {string} lang - Language to be replaced
 * @return {string} lang - Only after returning the language to be changed
 */
export function setLang(lang: string, immediate = false): Promise<keyof typeof TranslateTable | 'same'> {
  if (lang === i18nInstance.locale.value && !immediate) {
    return Promise.resolve('same')
  }
  return Promise.resolve(_set(lang))
}

function initLocale() {
  const localeLs = localeStore.getLocaleLs
  const locale = localeStore.getLocale
  setLang(localeLs || __LOCALE__ , localeLs == locale)
}

loadAtdLocales()
initLocale()

