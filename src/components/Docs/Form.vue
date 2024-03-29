<template>
  <a-form class="max-w-screen-lg m-auto" :model="formState" @finish="commit" @finishFailed="onFailed">
    <a-form-item label="Status">
      <a-radio-group v-model:value="formState.node.status">
        <a-radio v-for="(status, index) in ProjectStatus" :value="index">{{ status }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Progress" :rules="[{ type: 'number', min: 0, max: 99 }]">
      <a-slider class="max-w-md" v-model:value="formState.node.progress" />
    </a-form-item>
    <a-form-item label="Priority">
      <a-rate v-model:value="formState.node.priority" :disabled="false" />
    </a-form-item>
    <a-form-item label="Introduction">
      <a-textarea v-model:value="formState.node.introduction[getLocale]" />
    </a-form-item>
    <a-form-item label="Description">
      <MarkDown @update:value="saveMarkDown" :value="formState.node.description[getLocale]" />
    </a-form-item>
    <a-space v-for="(resource, index) in formState.node.resources" :key="resource.id"
      style="display: flex; margin-bottom: 8px" align="baseline">
      <a-form-item label="Title" :rules="{
        required: true,
        message: 'Missing Title',
      }">
        <a-input v-model:value="resource.title" placeholder="Description of resources" />
      </a-form-item>
      <a-form-item label="Uri" :name="['node', 'resources', index, 'uri']" :rules="{
        required: true,
        message: 'Missing Uri',
      }">
        <a-input v-model:value="resource.uri" placeholder="http" />
      </a-form-item>
      <MinusCircleOutlined @click="removeResource(resource)" />
    </a-space>
    <a-form-item class="mt-4">
      <a-button type="dashed" block @click="addResource">
        <PlusOutlined />
        Add resource
      </a-button>
    </a-form-item>
    <a-form-item class="mb-4 text-right b-button">
      <a-dropdown placement="top">
        <a-button shape="circle">
          <template #icon>
            <EllipsisOutlined />
          </template>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="recovery">
              <RollbackOutlined />
              Recovery
            </a-menu-item>
            <a-menu-item danger @click="delDoc">
              <DeleteOutlined />
              Delete
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button type="primary" html-type="submit">Save</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, inject } from 'vue'
import { ceramicSymbol } from '../../hooks/useGraphContext'
import { DocContent, Resource } from '../../types'
import { ProjectStatus } from '../../settings/graph'
import { MinusCircleOutlined, PlusOutlined, EllipsisOutlined, RollbackOutlined, DeleteOutlined, } from '@ant-design/icons-vue';
import { useCurrentDoc, useAdd, useCommit, useRecoveryDocs } from '../../hooks/useDocs'
import { MarkDown } from './Markdown'
import { useLocale } from '../../locales/useLocales'

const props = defineProps({
  nodeId: { type: String, default: '' },
  graphSteamId: { type: String, default: '' },
  docSteamId: { type: String, default: '' },
});

const { ceramic } = inject(ceramicSymbol) as any

const emit = defineEmits(['save'])

const nodeIdRef = ref()
const graphSteamIdRef = ref()
const docSteamIdRef = ref()

const { getLocale } = useLocale()

interface formStateType {
  node: DocContent
}

const formState = reactive<formStateType>({
  node: {
    stream_id: '',
    id: '',
    resources: [],
    progress: 0,
    priority: 0,
    introduction: {},
    status: 0,
    description: {}
  }
});

const initDoc = async (id: string, graphSteamId: string, docSteamId: string) => {
  nodeIdRef.value = id
  graphSteamIdRef.value = graphSteamId
  docSteamIdRef.value = docSteamId
  let currentDoc = {}
  // ceramic, docSteamId, id, docSteamId)
  currentDoc = await useCurrentDoc(ceramic, graphSteamId, id, docSteamId)
  currentDoc['stream_id'] = graphSteamId
  currentDoc['id'] = id

  formState.node = { ...formState.node, ...currentDoc }
}

const removeResource = (item: Resource) => {
  let index = formState.node.resources.indexOf(item);
  if (index !== -1) {
    // @ts-ignore
    formState.node.resources?.splice(index, 1);
  }
};

const addResource = () => {
  formState.node.resources
  formState.node.resources.push({
    title: '',
    uri: '',
    id: Date.now(),
  });
};

const saveMarkDown = (v) => {
  formState.node.description[getLocale.value] = v
  add()
}

const add = () => {
  useAdd(graphSteamIdRef.value, nodeIdRef.value, formState.node)
}

const commit = () => {
  useCommit(graphSteamIdRef.value, nodeIdRef.value, formState.node)
  emit('save')
}

const onFailed = (e) => {
  console.log('Fail', e);
}

const recovery = () => {
  useRecoveryDocs(nodeIdRef.value)
  initDoc(nodeIdRef.value, graphSteamIdRef.value, docSteamIdRef.value)
}

const delDoc = () => {
  useCommit(graphSteamIdRef.value, nodeIdRef.value, null)
  emit('save')
}

defineExpose({
  initDoc
})

onMounted(async () => {
  await initDoc(props.nodeId, props.graphSteamId, props.docSteamId)
});

</script>


<style lang="stylus">
.ant-form-item-label > label {
  min-width 120px
  font-weight: bold
  font-size: large
  color: rgb(96 96 96 / 85%)
}

.b-button .ant-form-item-control-input-content {
    flex: auto;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
