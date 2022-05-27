<template>
  <div class="flex w-full h-full">
    <div v-if="!isReadonlyRef">
      <Stencil v-if="isReady" />
    </div>
    <div id="containered" ref="containered" />
    <div class="absolute right-5 top-2">
      <Edit />
    </div>
    <div v-if="!isReadonlyRef" class="space-x-2 color-picker-group">
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
import { useIsReadOnly } from '@/hooks/useApp'

const containered = ref<HTMLElement | undefined>(undefined)
const isReady = ref(false)
const nodeDataRef = ref({
  nodeId: '',
  label: ''
})
const docRef = ref();
const isReadonlyRef = useIsReadOnly()

const openModal = (n: { nodeId: string, label: string }) => {
  console.log('Base - showModal');

  nodeDataRef.value = n
  docRef.value?.showModal()
}

onMounted(() => {
  const graph = createGraph(containered)
  graph.value?.centerContent()
  isReady.value = true

  graph.value?.on('cell:mouseenter', (args: { cell: any }) => {
    if (isReadonlyRef.value) return

    if (args.cell.isNode()) {
      const currentNode = args.cell
      currentNode.setAttrByPath(`${(currentNode.data ? currentNode.data.primer : false) || currentNode.shape}`, {
        strokeWidth: 8
      })

      args.cell.addTools([
        {
          name: 'button-remove',
          args: {
            x: '100%',
            y: 0,
            offset: { x: -12, y: 18 },
          },
        },
        {
          name: 'button',
          args: {
            markup: {
              tagName: 'circle',
              selector: 'button',
              attrs: {
                r: 10,
                stroke: '#fe854f',
                'stroke-width': 3,
                fill: 'white',
                cursor: 'pointer',
              },
            },
            x: 0,
            y: '100%',
            offset: { x: 18, y: -25 },
            onClick() {
              openModal({
                nodeId: args.cell.id,
                label: args.cell.data.label
              })
            },
          },
        },
      ])
    } else {
      args.cell.addTools([
        {
          name: 'button-remove',
          args: { distance: 20 },
        }])
    }
  })

  graph.value?.on('cell:mouseleave', (args: { cell: any }) => {
    if (args.cell.isNode()) {
      const currentNode = args.cell
      currentNode.setAttrByPath(`${(currentNode.data ? currentNode.data.primer : false) || currentNode.shape}`, {
        strokeWidth: 2
      })
    }
    args.cell.removeTools()
  })

  graph.value?.on('node:click', (args: { node: any }) => {
    console.log('node:click', isReadonlyRef.value);

    if (!isReadonlyRef.value) return
    console.log('openModal');

    openModal({
      nodeId: args.node.id,
      label: args.node.data.label
    })
  })
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
