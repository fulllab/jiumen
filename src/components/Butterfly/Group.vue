<script setup lang="ts">
import { vSimulateMouseEvents } from '@/directives/touchHandler'
const { id, top, left, width, height } = defineProps<{ id: string, top: number, left: number, width: number, height: number }>()
</script>

<template>
  <a-card
    :id="id"
    class="card"
    title="Default size card"
    hoverable
  >
    <template #actions>
      <a-button variant="text" color="red">Delete</a-button>
    </template>
  </a-card>
</template>

<style scoped>
* {
  transition: transform 0.2s;
}

.wrapper {
  position: absolute;
  display: grid;
  place-content: center;
  width: 25px;
  height: 25px;
}

.dot {
  display: grid;
  place-content: center;
  width: 12px;
  height: 12px;
  border-radius: 1000px;
  background-color: rgb(248, 160, 204);
}

.wrapper:hover .dot {
  transform: scale(2);
}

.wrapper:hover .inner-dot {
  transform: scale(0.4);
}

.inner-dot {
  width: 12px;
  height: 12px;
  border-radius: 1000px;
  background-color: hotpink;
}
</style>
