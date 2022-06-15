<template>
  <div class="flex w-full h-full">

    <div v-if="!isReadOnly">
      <Stencil />
    </div>
    <div id="containered" ref="containered" />
    <div class="absolute right-5 top-2">
      <Edit v-if="isReady" />
    </div>
    <div v-if="!isReadOnly" class="space-x-2 color-picker-group">
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
    <a-spin v-if="spinning" class="absolute w-full h-full flex justify-center items-center bg-gray-500/50 bg-opacity-20"
      :spinning="spinning"></a-spin>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue'
import EdgeSelect from './Tools/EdgeSelect.vue'
import { createGraph } from '@/hooks/useGraph'
import "@antv/x6-vue-shape"
import Stencil from '@/components/Tools/Stencil.vue'
import './register'
import ColorPicker from './Tools/ColorPicker.vue'
import Doc from './Docs/Doc.vue'
import { MinusOutlined, BorderOutlined, FontColorsOutlined } from '@ant-design/icons-vue'
import Edit from './Tools/Edit.vue'
import { useRootState } from '@/hooks/useApp'
import { initState } from '@/hooks/useApi'
import { NodeLabelPath, InstantSaveTime } from '@/settings/graph'
import { Graph } from '@antv/x6'
import { useGraphStore } from '@/store/modules/graph'
import { appSymbol } from '@/hooks/GraphContext'
import { useMessage } from '@/hooks/useMessage'
import { useLocale } from '@/locales/useLocales'

const containered = ref<HTMLElement | undefined>(undefined)
const isReady = ref(false)
const nodeDataRef = ref({
  nodeId: '',
  label: ''
})
const { getLocale } = useLocale()
const docRef = ref()
const { setSpinning } = useRootState()

const { isReadOnly, spinning } = inject(appSymbol) as any

const graphStore = useGraphStore()

const openModal = (cell: any) => {
  nodeDataRef.value = {
    nodeId: cell.id,
    label: cell.getAttrByPath(NodeLabelPath)[getLocale.value] || ''
  }
  docRef.value?.showModal()
}

const saveGraph = (graph: Graph | undefined) => {
  if (graph) {
    graphStore.setRepoGraph(graph.toJSON() as any)
  }
}

// const graph: Ref<Graph | undefined> = ref(undefined)

const initGraph = (graphData, graph) => {

  graph.value?.fromJSON(graphData)
  graph.value?.centerContent()

  graph.value?.on('cell:mouseenter', (args: { cell: any }) => {
    if (isReadOnly.value) return
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
              openModal(args.cell)
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
    if (!isReadOnly.value) return
    openModal(args.node)
  })

  graph.value?.on('cell:changed', () => {
    if (isReadOnly.value) return
    setTimeout(() => {
      saveGraph(graph.value);
    }, InstantSaveTime);
  })
}

const init = () => {
  const graph = createGraph(containered)
  initState().then((graphData) => {
    setSpinning(false)
    initGraph(graphData, graph)
  }).then(() => {
    isReady.value = true
  }).catch((err) => {
    setSpinning(false)
    const { notification } = useMessage()
    notification.error({
      message: 'Failed to get data',
      description: err,
      duration: 3,
    });
  });
}

onMounted(() => {
  setSpinning(true)
  init()
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
