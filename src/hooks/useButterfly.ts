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
export const useController = (initialData: ButterflyDataInitial) => {
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
