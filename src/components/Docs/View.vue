<template>
  <div class="container lg-auto">
    <div>
      <div class="min-w-12">Status</div>
      <div>{{ ProjectStatus[nodeContent.node.status] }}</div>
    </div>
    <div>
      <div class="min-w-12">Progress</div>
      <a-progress :percent="nodeContent.node.progress" status="active" />
    </div>
    <div>
      <div class="min-w-12">Priority</div>
      <a-rate :value="nodeContent.node.priority" disabled />
    </div>
    <div>
      <div class="min-w-12">Introduction</div>
      <p>{{ nodeContent.node.introduction }}</p>
    </div>
    <MarkdownViewer :value="nodeContent.node.description" />
    <div>
      <div>resources</div>
    </div>
    <div>
      <a v-for="resource in nodeContent.node.resources" :href="resource.uri" target="_blank">{{resource.title}}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { DocContent, Resource } from '@/types'
import { ProjectStatus, docContentDefault } from '@/settings/graph'
import { useWokingDoc, useAdd, useCommit } from '@/hooks/useDocs'
import { MarkdownViewer } from './Markdown'

const props = defineProps({
  nodeId: { type: String, default: '' },
});

const nodeIdRef = ref()

interface nodeContentType {
  node: DocContent
}

const nodeContent = reactive<nodeContentType>({
  node: docContentDefault
});

const initDoc = (id: string) => {
  nodeIdRef.value = id
  nodeContent.node = useWokingDoc(id) || docContentDefault
}

defineExpose({
  initDoc
})

onMounted(() => {
  initDoc(props.nodeId)
});

</script>


<style lang="stylus">
.ant-form-item-label > label {
  min-width 120px
  font-weight: bold
  font-size: large
  color: rgb(96 96 96 / 85%)
}
</style>
