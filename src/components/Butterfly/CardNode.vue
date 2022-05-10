<script setup lang="ts">
// import { ref } from 'vue'
import { NodeData } from '@/types'
import { vSimulateMouseEvents } from '@/directives/touchHandler'

const { id, top, left } = defineProps<{
  id: string
  top: number
  left: number
  nodeData: NodeData
}>()

const emit = defineEmits<{
  (event: 'delete'): void
  (event: 'update:node-data', data: NodeData): void
}>()

// const isColorPickerOpen = ref(false)
// const logPush = () => console.log('push')
</script>

<template>
  <a-card
    :id="id"
    class="card"
    title="Default size card"
    :color="nodeData.color"
    hoverable
  >
    <p>x: {{ top }} y: {{ left }}</p>
    <template #actions>
      <a-button variant="text" color="red" @click="emit('delete')">Delete</a-button>
    </template>
  </a-card>
</template>

<style scoped>
.card {
  position: absolute;
  width: 175px;
}
</style>
