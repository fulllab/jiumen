<template>
  <div class="flex items-center w-full p-1 text-base text-center" :style="styleObject" @dblclick="edit">
    <Input class="text-center" v-if="isEditStatus" v-model:value="label.text[getLocale]" :placeholder="label.text[getLocale]" @blur="blur" />
    <p class="w-full" v-else>{{ label.text[getLocale] }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, reactive } from 'vue'
import { Input } from 'ant-design-vue'
import { NodeLabelPath } from '../../settings/graph'
import { useIsReadOnly } from '../../hooks/useApp'
import { useLocale } from '../../locales/useLocales'
import { LocaleString } from '../../types'

const getIsReadOnly = useIsReadOnly()

const { getLocale } = useLocale()

const node = inject('getNode', () => { })() as any

interface LabelType {
  text: LocaleString
}

const isEditStatus = ref(false)
const label = reactive<LabelType>(
  { text: {} }
);
const styleObject = ref({
  color: node.getAttrByPath('label/fill')
})

const blur = () => {
  node.setAttrByPath(NodeLabelPath, label.text)
  isEditStatus.value = false
}

const edit = () => {
  isEditStatus.value = !getIsReadOnly.value
}

onMounted(() => {
  label.text = node.getAttrByPath(NodeLabelPath) || {}

  node.on('changed', (data) => {
    const { options } = data
    if (options && options.propertyPath == 'attrs/label/fill') {
      styleObject.value = {
        color: options.propertyValue
      }
    }
  })
});
</script>
