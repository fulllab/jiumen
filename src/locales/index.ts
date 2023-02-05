import { includes } from 'lodash'
import { findKeyByValue } from '@/utils/tools'
import zhCN from '@/locales/messages/zhCN'
import en from '@/locales/messages/en'
import moment from 'moment'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { LocaleType } from '@/types/'
import { createI18n, useI18n } from 'vue-i18n'

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

/**
 * @description Automatic loading of language templates required by antd-vue
 */
 export function loadAtdLocales() {
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

export const getLocale = () => {
  const localeLs = localeStore.getLocaleLs
  if (localeLs) {
    return localeLs
  }
  const locales = Object.keys(TranslateTable)
  if (locales.indexOf(__LOCALE__) > -1) {
    return __LOCALE__
  }
  return 'en'
}

function _set(lang: keyof typeof TranslateTable): keyof typeof TranslateTable {
  moment.locale(TranslateTable[lang])
  localeStore.setLocale(lang as LocaleType)
  return lang
}

/**
 * @functin Asyn loading of custom i18n templates
 * @param {string} lang - Language to be replaced
 * @return {string} lang - Only after returning the language to be changed
 */
 export function setLang(lang: string): Promise<keyof typeof TranslateTable | 'same'> {
  return Promise.resolve(_set(lang))
}

export const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  messages: {
    zhCN,
    en,
  },
})
