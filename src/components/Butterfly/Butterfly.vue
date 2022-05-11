<script setup lang="ts">
import 'butterfly-dag/dist/index.css'
import { Canvas } from 'butterfly-dag'
import { computed, onMounted, ref, StyleValue } from 'vue'
import { CanvasConfig } from '@/types'
import { injectClasses } from '@/utils/butterfly'
import { Controller } from '@/hooks/useButterfly'
import { buildShortUUID } from '@/utils/uuid'
import { BorderOutlined, BlockOutlined } from '@ant-design/icons-vue'

export type ButterflyProps = {
  controller: Controller
  config?: CanvasConfig
  containerClass?: any
  containerStyle?: StyleValue
}

export type OperationType = 'node' | 'group' | null

const operationTypeRef = ref<OperationType>(null)

const { controller, config, containerClass, containerStyle } =
  defineProps<ButterflyProps>()

const data = controller._currentData

const endpoints = computed(() => data.value.nodes.flatMap(node => node.endpoints))

const canvasRef = ref<HTMLElement | null>(null)

const preAdd = (ot: OperationType) => {
  operationTypeRef.value = ot == operationTypeRef.value ? null : ot
}

const buttonType = (ot: OperationType) => {
  return operationTypeRef.value == ot ? 'primary' : 'default'
}

const add = (canvasX, canvasY) => {
  switch (operationTypeRef.value) {
    case 'node':
      addNode(canvasX, canvasY)
      operationTypeRef.value = null
      break;
    default:
      break;
  }
}

const addNode = (canvasX, canvasY) => {
  const uuid = buildShortUUID()
  controller.addNode({
    id: uuid,
    top: canvasY,
    left: canvasX,
    endpoints: [
      {
        id: `${uuid}-1`,
        orientation: [1, 0],
      },
      {
        id: `${uuid}-2`,
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
    console.log(event)
    switch (event.type) {
      case 'drag:start':
        if (!event.dragNode && event.position) {
          add(event.position.canvasX, event.position.canvasY)
        }
        break;
      default:
        break;
    }
    // update nodes state on node events
    // if ((event.type as string).startsWith('node')) {
    //   data.value.nodes = [...canvas.getDataMap().nodes]
    // }
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
      <template v-for="group in data.groups" :key="group.id">
        <slot name="group" v-bind="group"></slot>
      </template>
    </div>
  </div>
  <div class="absolute top-4 left-4 z-60">
    <a-button class="ml-32px" :type="buttonType('node')" shape="circle" @click="preAdd('node')" size="large">
      <BorderOutlined />
    </a-button>
    <a-button class="ml-32px" :type="buttonType('group')" shape="circle" @click="preAdd('group')" size="large">
      <BlockOutlined />
    </a-button>
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
