import { nextTick, reactive, readonly, ref } from 'vue'
import {
  ButterflyData,
  ButterflyDataInitial,
  CanvasInternal,
  NodeData,
  NodeInitial,
} from '@/types'
import { injectNodeClass } from '@/utils/butterfly'

const noCanvasAttachedError = Error(
  'Canvas not attached, remember to pass controller down to Butterfly component',
)

export const useController = () => {
  const initialData = {
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
        nodeData: {
          color: 'white',
        },
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
        nodeData: {
          color: 'white',
        },
      },
    ],
    edges: [],
    groups: [
      {
        id: 'testGroup',
        options: {
          text: 'Group'
        },
        width: 500,
        height: 300,
        top: 360,
        left: 100,
        endpoints: [],
      }
    ],
  } as ButterflyDataInitial
  const _currentData = ref<ButterflyData>(initialData)
  /** Ref storing original butterfly Canvas instance */
  const canvas = ref<CanvasInternal | null>(null)

  // Keep nodes data off the butterfly canvas object to have full control over it
  const nodesData = reactive(
    initialData.nodes.reduce(
      (nodesData, node) => ({ ...nodesData, [node.id]: node.nodeData }),
      {} as Record<string, NodeData>,
    ),
  )

  const addNode = (node: NodeInitial) => {
    if (!canvas.value) throw noCanvasAttachedError
    _currentData.value.nodes.push(node)
    nodesData[node.id] = node.nodeData
    nextTick(() => canvas.value?.addNode(injectNodeClass(node)))
  }
  const removeNode = (nodeId: string) => {
    if (!canvas.value) throw noCanvasAttachedError
    canvas.value.removeNode(nodeId)
    delete nodesData[nodeId]
  }

  return {
    addNode,
    removeNode,
    initialData,
    data: readonly(_currentData),
    nodesData,
    _currentData,
    _canvas: canvas,
  }
}

export type Controller = ReturnType<typeof useController>
