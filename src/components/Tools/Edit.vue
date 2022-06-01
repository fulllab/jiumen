<template>
  <a-dropdown-button>
    <div v-if="!atWork" @click="startWork">
      <FormOutlined /> Edit
    </div>
    <div v-if="!getIsReadOnly && atWork" @click="preview">
      <CoffeeOutlined /> Preview
    </div>
    <div v-if="getIsReadOnly && atWork" @click="exitPreview">
      <EyeInvisibleOutlined /> Exit Preview
    </div>
    <template #overlay>
      <a-menu @click="release">
        <a-menu-item key="1">
          <UploadOutlined />
          Release
        </a-menu-item>
        <a-menu-item key="2" @click="exitEdit" :disabled="!atWork">
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
import { useAppState } from '@/store/modules/app'
import { useRootState } from '@/hooks/useApp'
import { useRemoveLsGraph } from '@/hooks/useGraph'
import { useRemoveLsDocs } from '@/hooks/useDocs'
import { sendGraph } from '@/hooks/useApi'
import { useContext } from '@/hooks/GraphContext'

const appState = useAppState()
const { graph } = useContext()

const { getIsReadOnly } = useRootState()
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

const release = () => {
  sendGraph(graph)
}

const emptyDraft = () => {
  useRemoveLsDocs()
  useRemoveLsGraph()
  exitEdit()
}

</script>
