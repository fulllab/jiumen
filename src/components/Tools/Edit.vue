<template>
  <a-dropdown-button @click="changeStatu">
    <FormOutlined v-if="isReadOnly" />
    <SaveOutlined v-else />
    <template #overlay>
      <a-menu @click="menuClick">
        <a-menu-item key="1">
          <UploadOutlined />
          发布
        </a-menu-item>
        <a-menu-item key="2">
          <PoweroffOutlined />
          退出编辑
        </a-menu-item>
        <a-menu-item danger key="2">
          <DeleteOutlined />
          清除草稿
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormOutlined, SaveOutlined, PoweroffOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useAppState } from '@/store/modules/app'

const appState = useAppState()

const isReadOnly = ref(false)

const changeStatu = () => {
  isReadOnly.value = !isReadOnly.value
  appState.setDocStatu(isReadOnly.value)
}

const menuClick: MenuProps['onClick'] = e => {
  console.log(e);
}

</script>

<style scoped lang="stylus">
</style>
