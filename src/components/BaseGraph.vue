<template>
  <div class="flex w-full h-full">
    <Stencil v-if="isReady" @open-modal="openModal" />
    <div id="containered" ref="containered" />
    <div class="absolute right-5 top-2">
      <Edit />
    </div>
    <div class="space-x-2 color-picker-group">
      <EdgeSelect />
      <ColorPicker v-if="isReady" mode="body">
        <BorderOutlined />
      </ColorPicker>
      <ColorPicker v-if="isReady" mode="stroke">
        <MinusOutlined />
      </ColorPicker>
      <ColorPicker v-if="isReady" mode="label">
        <FontColorsOutlined />
      </ColorPicker>
    </div>
    <Doc ref="docRef" :node-id="nodeDataRef.nodeId" :label="nodeDataRef.label" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, } from 'vue'
import EdgeSelect from './Tools/EdgeSelect.vue'
import { createGraph } from '@/hooks/useGraph'
import "@antv/x6-vue-shape"
import Stencil from '@/components/Tools/Stencil.vue'
import './register'
import ColorPicker from './Tools/ColorPicker.vue'
import Doc from './Docs/Doc.vue'
import { MinusOutlined, BorderOutlined, FontColorsOutlined } from '@ant-design/icons-vue'
import Edit from './Tools/Edit.vue'

const containered = ref<HTMLElement | undefined>(undefined)
const isReady = ref(false)
const nodeDataRef = ref({
    nodeId: '',
    label: ''
  })
const docRef = ref();

const openModal = (n: {nodeId: string, label: string}) => {
  nodeDataRef.value = n
  docRef.value?.showModal()
}

onMounted(() => {
  const graph = createGraph(containered)
  graph.value?.centerContent()
  isReady.value = true
});

</script>

<style lang="stylus">
.x6-graph-scroller {
  overflow hidden !important
}

.gra {
  width 100%
  height 100%
}

.color-picker-group {
  position absolute
  margin-left 130px
  margin-top 0.5rem
}
</style>
