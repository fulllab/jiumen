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
      <a-descriptions-item label="Introduction">{{ nodeContent.node.introduction }}</a-descriptions-item>
    </a-descriptions>

    <p class="text-2xl mt-8 font-bold">Description</p>
    <a-divider />
    <a-empty v-if="!nodeContent.node.description" :description="null" />
    <MarkdownViewer :value="nodeContent.node.description" />

    <p class="text-2xl mt-8 font-bold">Resources</p>
    <a-divider />
    <a-empty v-if="nodeContent.node.resources.length == 0" :description="null" />
    <ul>
      <li v-for="resource in nodeContent.node.resources">
        <a :href="resource.uri" target="_blank">{{ resource.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { DocContent } from '@/types'
import { ProjectStatus } from '@/settings/graph'
import { useWokingDoc } from '@/hooks/useDocs'
import { MarkdownViewer } from './Markdown'

const props = defineProps({
  nodeId: { type: String, default: '' },
});

const nodeIdRef = ref()

interface nodeContentType {
  node: DocContent
}

const nodeContent = reactive<nodeContentType>({
  node: {
    resources: [],
    progress: 0,
    priority: 0,
    introduction: '',
    status: 0,
    description: '',
  }
});

const initDoc = (id: string) => {
  nodeIdRef.value = id
  nodeContent.node = useWokingDoc(id)
  console.log(nodeContent.node);

}

defineExpose({
  initDoc
})

onMounted(() => {
  initDoc(props.nodeId)
});

</script>
