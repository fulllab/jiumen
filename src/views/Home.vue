<template>
  <div class="home-container page-container">
    <Butterfly
      :controller="controller"
      container-class="canvas"
      :config="{
        moveable: true,
        disLinkable: true,
        linkable: true,
        draggable: true,
        zoomable: false,
        moveable: true,
        theme: {
          edge: {
            arrow: true,
            shapeType: 'AdvancedBezier',
          },
        },
      }"
    >
      <template #node="{ id, top, left }">
        <card-node
          :id="id"
          v-model:node-data="controller.nodesData[id]"
          :top="top"
          :left="left"
          @delete="controller.removeNode(id)"
        />
      </template>
      <template #endpoint="{ id }">
        <endpoint-dot :id="id" />
      </template>
    </Butterfly>
  </div>
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'
import Butterfly from '@/components/Butterfly.vue'
import { NodeData } from '@/types'
import { useController } from '@/hooks/useButterfly'
import CardNode from '@/components/CardNode.vue'
import EndpointDot from '@/components/EndpointDot.vue'
import { ref } from 'vue'

console.log('what')

const controller = useController({
  nodes: [
    {
      id: '1',
      top: 100,
      left: 100,
      endpoints: [
        {
          id: 'endpoint-1',
          orientation: [1, 0],
        },
      ],
      nodeData: { color: 'white' },
    },
    {
      id: '2',
      top: 200,
      left: 400,
      endpoints: [
        {
          id: 'endpoint-2',
          orientation: [-1, 0],
        },
      ],
      nodeData: { color: 'white' },
    },
  ],
  edges: [],
})

const nextNodeId = ref(3)

const addNode = (id: string, color: NodeData['color']) =>
  controller.addNode({
    id,
    top: 20,
    left: 20,
    endpoints: [
      {
        id: `node-${id}-endpoint-1`,
        orientation: [1, 0],
      },
      {
        id: `node-${id}-endpoint-2`,
        orientation: [-1, 0],
      },
    ],
    nodeData: { color },
  })

// export default defineComponent({
//   name: 'Home'
// })
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>

<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 100%;
}

.box-inner {
  width: 100%;
  background-color: #cccccc;
  border-radius: 16px;
  overflow: hidden;
}

.box {
  padding: 2rem;
}
</style>

<style>
.butterflies-link,
.butterflies-arrow {
  stroke: hotpink;
  stroke-width: 3px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
