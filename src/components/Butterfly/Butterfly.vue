<script setup lang="ts">
import 'butterfly-dag/dist/index.css'
import { Canvas } from 'butterfly-dag'
import { computed, onMounted, ref, StyleValue } from 'vue'
import { CanvasConfig } from '@/types'
import { injectClasses } from '@/utils/butterfly'
import { Controller } from '@/hooks/useButterfly'
import { buildShortUUID } from '@/utils/uuid'
import { BorderOutlined } from '@ant-design/icons-vue'

export type ButterflyProps = {
  controller: Controller
  config?: CanvasConfig
  containerClass?: any
  containerStyle?: StyleValue
}

const { controller, config, containerClass, containerStyle } =
  defineProps<ButterflyProps>()

const data = controller._currentData

const endpoints = computed(() => data.value.nodes.flatMap(node => node.endpoints))

const canvasRef = ref<HTMLElement | null>(null)

const addNode = () => {
  const uuid = buildShortUUID()
  console.log(uuid)
  controller.addNode({
    id: uuid,
    top: 20,
    left: 20,
    endpoints: [
      {
        id: `node-${uuid}-endpoint-1`,
        orientation: [1, 0],
      },
      {
        id: `node-${uuid}-endpoint-2`,
        orientation: [-1, 0],
      },
    ],
    nodeData: {
      color: 'white',
    },
  })
}

onMounted(() => {
  const canvas = new Canvas({ root: canvasRef.value, ...config })
  controller._canvas.value = canvas
  canvas.draw(injectClasses(controller.initialData))
  //@ts-ignore
  canvas.on('events', event => {
    console.log(event.type)
    // setTimeOut,传过来的动作过多，需要一种防抖机制，不能每次都传
    // 那么最好的办法是直接放在一起！
    // update nodes state on node events
    if ((event.type as string).startsWith('node')) {
      data.value.nodes = [...canvas.getDataMap().nodes]
    }
  })
})
</script>

<template>
  <div ref="canvasRef" :class="containerClass" :style="containerStyle">
    <div class="absolute-container">
      <template v-for="node in data.nodes" :key="node.id">
        <slot name="node" v-bind="node"></slot>
      </template>
      <template v-for="endpoint in endpoints" :key="endpoint.id">
        <slot name="endpoint" v-bind="endpoint"></slot>
      </template>
    </div>
  </div>
  <div class="absolute top-4 left-4 z-60">
    <a-button type="primary" shape="circle" @click="addNode()"
      ><BorderOutlined
    /></a-button>
  </div>
</template>

<style scoped>
.absolute-container {
  height: 100%;
  width: 100%;
  position: absolute;
  display: block;
}

.canvas {
  height: 100%;
}
</style>
