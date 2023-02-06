<template>
  <a-dropdown :trigger="['click']" placement="topRight">
    <a-button ghost @click="e => e.preventDefault()">
      {{ $t('languageName') }}
      <DownOutlined />
    </a-button>
    <template v-slot:overlay>
      <a-menu class="">
        <a-menu-item v-for="(value, key) of LanguageNameList" :key="key" @click="changeLanguage(key)">
          <span>{{ LanguageNameList[key] }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import { setLang, LanguageNameList, i18n } from "../locales";

export default defineComponent({
  components: {
    DownOutlined
  },
  setup() {
    const { locale, t } = useI18n()
    const changeLanguage = e => {
      const lang = e
      locale.value = lang

      setLang(lang).then(result => {
        if (result === lang) {
          message.success(`${t('Current Language:')} ${t('languageName')}`)
        }
      })
    }
    return {
      LanguageNameList,
      changeLanguage,
      i18n
    }
  }
})
</script>
