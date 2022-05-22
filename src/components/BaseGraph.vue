<template>
  <div class="flex w-full h-full">
    <Stencil v-if="isReady" />
    <div id="containered" ref="containered" />
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import EdgeSelect from './Tools/EdgeSelect.vue'
import { createGraph } from '@/hooks/useGraph'
import "@antv/x6-vue-shape"
import Stencil from '@/components/Tools/Stencil.vue'
import './register'
import ColorPicker from './Tools/ColorPicker.vue'
import { MinusOutlined, BorderOutlined, FontColorsOutlined } from '@ant-design/icons-vue'

const containered = ref<HTMLElement | undefined>(undefined)

const isReady = ref(false)

onMounted(() => {
  const graph = createGraph(containered)

  // let node1 = graph.value?.addNode({
  //   shape: 'ellipse',
  //   width: 64,
  //   height: 64,
  //   x: 240,
  //   y: 40,
  // })

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
  margin-top 20px
}
</style>
