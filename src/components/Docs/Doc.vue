<template>
  <a-drawer :title="label" placement="bottom" :visible="visible" @close="onClose" height="100%">
    <Form v-if="!isReadOnly" ref="contentRef" @save="onClose" :node-id="props.nodeId" :doc-steam-id="props.docSteamId"
      :graph-steam-id="props.graphSteamId"></Form>
    <View v-else ref="contentRef" :node-id="props.nodeId" :doc-steam-id="props.docSteamId"
      :graph-steam-id="props.graphSteamId" />
  </a-drawer>
</template>

<script lang="ts" setup>
import { onMounted, inject, ref, defineExpose, watch } from 'vue'
import { appSymbol } from '@/hooks/useGraphContext'
import Form from './Form.vue'
import View from './View.vue'
import { useContext } from '@/hooks/useGraphContext'

const props = defineProps({
  nodeId: { type: String, default: '' },
  label: { type: String, default: '' },
  graphSteamId: { type: String, default: '' },
  docSteamId: { type: String, default: '' },
});

const { graph } = useContext()
const { isReadOnly } = inject(appSymbol) as any
const visible = ref<boolean>(false);
const contentRef = ref();

const showModal = () => {
  visible.value = true
  graph.disableMouseWheel()
};

const onClose = () => {
  visible.value = false
  graph.enableMouseWheel()
};

defineExpose({
  showModal
})

watch(
  () => [props.nodeId, props.graphSteamId, props.docSteamId],
  (nodeId, graphSteamId, docSteamId) => {
    contentRef.value?.initDoc(nodeId, graphSteamId, docSteamId)
  })

onMounted(() => {
  contentRef.value?.initDoc(props.nodeId, props.graphSteamId, props.docSteamId)
});

</script>

<style lang="stylus">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
