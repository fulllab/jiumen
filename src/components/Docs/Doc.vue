<template>
  <a-drawer :title="label" placement="bottom" :visible="visible" @close="onClose" height="100%">
    <Form v-if="!isReadonly" ref="contentRef" :node-id="props.nodeId"></Form>
    <View v-else ref="contentRef" :node-id="props.nodeId" />
  </a-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineExpose, watch } from 'vue'
import { useIsReadOnly } from '@/hooks/useApp'
import Form from './Form.vue'
import View from './View.vue';

const props = defineProps({
  nodeId: { type: String, default: '' },
  label: { type: String, default: '' },
});

const isReadonly = useIsReadOnly()

const visible = ref<boolean>(false);

const contentRef = ref();

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: MouseEvent) => {
  visible.value = false;
};

const onClose = () => {
  visible.value = false;
};

defineExpose({
  showModal
})

watch(
  () => props.nodeId,
  (nodeId) => {
    contentRef.value?.initDoc(nodeId)
  })

onMounted(() => {
  contentRef.value?.initDoc(props.nodeId)
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