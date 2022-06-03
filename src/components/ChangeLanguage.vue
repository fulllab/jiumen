<template>
  <a-dropdown :trigger="['click']" placement="topRight">
    <a-button ghost @click="e => e.preventDefault()">
      {{ i18n.languageName }}
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
import { setLang, i18nInstance, LanguageNameList } from '../locales/index'
import { message } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    DownOutlined
  },
  setup() {
    const { i18n } = i18nInstance
    const changeLanguage = e => {
      const lang = e
      setLang(lang).then(result => {
        if (result === lang) {
          message.success(`${i18n.value['Current Language:']} ${i18n.value.languageName}`)
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
