<template>
  <div class="flex w-full h-full">
    <Stencil v-if="isReady" />
    <div id="containered" ref="containered" />
    <div class="color-picker-group">
      <ColorPicker v-if="isReady" mode="body">
        <BorderOutlined />
      </ColorPicker>
      <ColorPicker v-if="isReady" mode="stroke">
        <MinusOutlined />
      </ColorPicker>
      <ColorPicker v-if="isReady" mode="text">
        <FontColorsOutlined />
      </ColorPicker>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue'
import { createGraph } from '@/hooks/useGraph'
import "@antv/x6-vue-shape"
import Count from "@/components/coms/Count.vue"
import Stencil from '@/components/Stencil.vue'
import './ts/register'
import ColorPicker from './Graph/Tools/ColorPicker.vue'
import { Graph } from '@antv/x6'
import { MinusOutlined, BorderOutlined, FontColorsOutlined } from '@ant-design/icons-vue'

const containered = ref<HTMLElement | undefined>(undefined) // 流程图挂载dom节点

const isReady = ref(false)

onMounted(() => {
  console.log('isReady 2', isReady);
  const graph = createGraph(containered)

  let node1 = graph.value?.addNode({
    shape: 'my-shape',
    width: 64,
    height: 64,
    x: 240,
    y: 40,
    component: {
      template: `<count :num="num" />`,
      data() {
        return {
          num: 'AB测试',
        }
      },
      components: {
        Count,
      },
    },
  })

  let node2 = graph.value?.addNode({
    id: "10",
    shape: 'my-shape',
    width: 99,
    height: 99,
    x: 40,
    y: 40,
    component: Count,
  })

  graph.value?.addEdge({
    shape: 'double-edge', // 指定使用何种图形，默认值为 'edge'
    source: node1,
    target: node2,
  })

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
