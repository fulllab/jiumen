<script setup lang="ts">
import { NodeData } from '@/types'
import { useController } from '@/hooks/useButterfly'
import { buildShortUUID } from '@/utils/uuid'
import { Controller } from '@/hooks/useButterfly'

export type OperatorsProps = {
  controller: Controller
}

const { controller } = defineProps<OperatorsProps>()

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
</script>

<template>
  <div class="">
    <a-button type="primary" shape="circle" @click="addNode()"> Add node </a-button>
  </div>
</template>
