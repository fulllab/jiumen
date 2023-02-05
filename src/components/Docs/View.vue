<template>
  <div class="max-w-screen-lg m-auto">
    <a-descriptions bordered size="size" :column="1">
      <a-descriptions-item label="Status">{{ ProjectStatus[nodeContent.node.status] }}</a-descriptions-item>
      <a-descriptions-item label="Progress">
        <a-progress :percent="nodeContent.node.progress" status="active" />
      </a-descriptions-item>
      <a-descriptions-item label="Priority">
        <a-rate :value="nodeContent.node.priority" disabled />
      </a-descriptions-item>
      <a-descriptions-item label="Introduction">{{ nodeContent.node.introduction[getLocale] }}</a-descriptions-item>
    </a-descriptions>

    <p class="text-2xl mt-8 font-bold">Description</p>
    <a-divider />
    <a-empty v-if="!nodeContent.node.description" :description="null" />
    <MarkdownViewer :value="nodeContent.node.description[getLocale]" class="vditor-reset" />

    <p class="text-2xl mt-8 font-bold">Resources</p>
    <a-divider />
    <a-empty v-if="nodeContent.node.resources.length == 0" :description="null" />
    <ul>
      <li class="list-circle list-inside" v-for="resource in nodeContent.node.resources">
        <a-button :href="resource.uri" type="link" target="_blank" size="large">{{ resource.title }}</a-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, inject } from 'vue'
import { DocContent } from '@/types'
import { ProjectStatus } from '@/settings/graph'
import { useCurrentDoc } from '@/hooks/useDocs'
import { MarkdownViewer } from './Markdown'
import { useLocale } from '@/locales/useLocales'
import { ceramicSymbol } from '@/hooks/useGraphContext'

const props = defineProps({
  nodeId: { type: String, default: '' },
  graphSteamId: { type: String, default: '' },
  docSteamId: { type: String, default: '' },
});

const { ceramic } = inject(ceramicSymbol) as any

const nodeIdRef = ref()

interface nodeContentType {
  node: DocContent
}

const { getLocale } = useLocale();

const nodeContent = reactive<nodeContentType>({
  node: {
    stream_id: '',
    id: '',
    resources: [],
    progress: 0,
    priority: 0,
    introduction: {},
    status: 0,
    description: {},
  }
});

const initDoc = async (graphId: string, id: string, docSteamId: string) => {
  nodeIdRef.value = id
  nodeContent.node = await useCurrentDoc(ceramic, graphId, id, docSteamId)
}

defineExpose({
  initDoc
})

onMounted(() => {
  initDoc(props.graphSteamId, props.nodeId, props.docSteamId)
});

</script>
