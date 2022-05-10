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
import Butterfly from '@/components/Butterfly/Butterfly.vue'
import { useController } from '@/hooks/useButterfly'
import CardNode from '@/components/Butterfly/CardNode.vue'
import EndpointDot from '@/components/Butterfly/EndpointDot.vue'

const controller = useController()
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
