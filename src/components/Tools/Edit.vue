<template>
  <a-dropdown-button>
    <div v-if="!atWork" @click="startWork">
      <FormOutlined /> {{ $t('editor.edit') }}
    </div>
    <div v-if="!getIsReadOnly && atWork" @click="preview">
      <CoffeeOutlined /> {{ $t('editor.preview') }}
    </div>
    <div v-if="getIsReadOnly && atWork" @click="exitPreview">
      <EyeInvisibleOutlined />  {{ $t('editor.exitPreview') }}
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="release" :disabled="!atWork">
          <UploadOutlined />
           {{ $t('editor.release.name') }}
        </a-menu-item>
        <a-menu-item key="2" @click="exitEdit" :disabled="!atWork">
          <PoweroffOutlined />
           {{ $t('editor.exitEdit') }}
        </a-menu-item>
        <a-menu-item danger key="3" @click="emptyDraft">
          <DeleteOutlined />
          {{ $t('editor.emptyDraft.name') }}
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
import { Modal } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  Modal.confirm({
    title: t('editor.release.confirm'),
    onOk() {
      console.log('start send!');
      sendGraph(graph)
    },
    onCancel() { },
  });
}

const emptyDraft = () => {
  Modal.confirm({
    title: t('editor.emptyDraft.confirm'),
    okType: 'danger',
    onOk() {
      useRemoveLsDocs()
      useRemoveLsGraph()
      exitEdit()
    },
    onCancel() { },
  });
}

</script>
