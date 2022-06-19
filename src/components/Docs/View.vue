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
import { onMounted, ref, reactive } from 'vue'
import { DocContent } from '@/types'
import { ProjectStatus } from '@/settings/graph'
import { useCurrentDoc } from '@/hooks/useDocs'
import { MarkdownViewer } from './Markdown'
import { useLocale } from '@/locales/useLocales'

const props = defineProps({
  nodeId: { type: String, default: '' },
});

const nodeIdRef = ref()

interface nodeContentType {
  node: DocContent
}

const { getLocale } = useLocale();

const nodeContent = reactive<nodeContentType>({
  node: {
    resources: [],
    progress: 0,
    priority: 0,
    introduction: {},
    status: 0,
    description: {},
  }
});

const initDoc = (id: string) => {
  nodeIdRef.value = id
  nodeContent.node = useCurrentDoc(id)
}

defineExpose({
  initDoc
})

onMounted(() => {
  initDoc(props.nodeId)
});

</script>
