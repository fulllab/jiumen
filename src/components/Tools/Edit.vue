<template>
  <a-dropdown-button>
    <div v-if="!atWork" @click="startWork">
      <FormOutlined /> Edit
    </div>
    <div v-if="!isReadOnly && atWork" @click="preview">
      <CoffeeOutlined /> Preview
    </div>
    <div v-if="isReadOnly && atWork" @click="exitPreview">
      <EyeInvisibleOutlined /> Exit Preview
    </div>
    <template #overlay>
      <a-menu @click="menuClick">
        <a-menu-item key="1">
          <UploadOutlined />
          Release
        </a-menu-item>
        <a-menu-item key="2" @click="exitEdit">
          <PoweroffOutlined />
          Exit Edit
        </a-menu-item>
        <a-menu-item danger key="2" @click="emptyDraft">
          <DeleteOutlined />
          Empty draft
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { FormOutlined, CoffeeOutlined, PoweroffOutlined, EyeInvisibleOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useAppState } from '@/store/modules/app'
import { useIsReadOnly } from '@/hooks/useApp'

const appState = useAppState()

const isReadOnly = useIsReadOnly()
const atWork = computed(() => appState.getAtWork)

const startWork = () => {
  appState.setIsReadOnly(false)
  appState.setAtWork(true)
}

const preview = () => {
  appState.setIsReadOnly(true)
}

const exitPreview = () => {
  appState.setIsReadOnly(false)
}

const exitEdit = () => {
  appState.setIsReadOnly(true)
  appState.setAtWork(false)
}

const menuClick: MenuProps['onClick'] = e => {
  console.log(e);
}

const emptyDraft = () => {

}

</script>
