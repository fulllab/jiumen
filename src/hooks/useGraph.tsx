import { ref, Ref, shallowReactive, watch } from 'vue'
import { Graph, Shape } from '@antv/x6'
import { createContext } from './useGraphContext'
import { EdgeShape } from '@/types'
import {
  HighlightingStyle,
  ProcessWidth,
  ProcessColor,
  SupportWidth,
  SupportColor,
  CanveBackground,
} from '@/settings/graph'
import { useAppStateWithOut } from '@/store/modules/app'
import { useGraphStoreWithOut } from '@/store/modules/graph'
import { useRootState } from '@/hooks/useApp'

export const createGraph = (containered?: Ref<HTMLElement | undefined>) => {
  const graph = ref<Graph>()
  const contextRef = shallowReactive({
    graph: {},
  })
  const docsStore = useAppStateWithOut()
  const { getIsReadOnly } = useRootState()
  // The function form is convenient to call in the graph
  const isReadOnly = () => getIsReadOnly

  createContext(contextRef)

  if (containered) {
    graph.value = new Graph({
      container: containered?.value,
      // @ts-ignore
      width: '100%',
      // @ts-ignore
      height: '100%',
      resizing: {
        enabled: () => {
          return !isReadOnly().value
        },
        minHeight: 35,
      },
      background: {
        color: CanveBackground,
      },
      grid: {
        size: 10,
        visible: true,
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      selecting: {
        enabled: true,
      },
      // TODO Temporarily invalid
      keyboard: true,
      history: {
        enabled: true,
        ignoreChange: true,
      },
      clipboard: {
        enabled: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      mousewheel: {
        enabled: true,
        global: true,
        // Preventing conflicts with scroller
        modifiers: ['ctrl'],
      },
      interacting: () => {
        if (isReadOnly().value) {
          return {
            magnetConnectable: false,
            nodeMovable: false
          }
        }
        return true
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter(targetNode => {
            const data = targetNode.getData<any>()
            if (data && data.parent) {
              // Exclude nodes itself
              if (targetNode.id != node.id) {
                // put parent node to the back
                targetNode.toBack()
                // put all parent node to the back
                targetNode.getAncestors().map(n => {
                  n.toBack()
                })
              }
              const targetBBox = targetNode.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
      highlighting: {
        embedding: HighlightingStyle,
        magnetAvailable: HighlightingStyle,
        magnetAdsorbed: HighlightingStyle,
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: true,
        allowMulti: true,
        highlight: true,
        allowNode: true,
        sourceAnchor: {
          name: 'center',
        },
        targetAnchor: 'center',
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'metro',
        },
        createEdge() {
          let edgeLineOp = {
            stroke: '#333333',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 7,
            },
          }
          if (edgeShape.value == 'Process') {
            edgeLineOp.stroke = ProcessColor
            edgeLineOp.strokeWidth = ProcessWidth
          } else if (edgeShape.value == 'Support') {
            edgeLineOp.stroke = SupportColor
            edgeLineOp.strokeWidth = SupportWidth
          }
          return new Shape.Edge({
            attrs: {
              line: edgeLineOp,
            },
          })
        },
      },
    })
    contextRef.graph = graph.value
  }

  watch(
    () => docsStore.getAtWork,
    atWork => {
      const graphStore = useGraphStoreWithOut()
      let graphLs = atWork ? graphStore.getRepoGraph : graphStore.getRemoteGraph
      if (!!graphLs) {
        graph.value?.fromJSON(graphLs)
      }
    },
    { immediate: true },
  )
  return graph
}

export const edgeShape = ref<EdgeShape>('Process')

export function useRemoveLsGraph() {
  const graphStore = useGraphStoreWithOut()
  graphStore.removeRepoGraph()
}

export default {
  createGraph,
  Graph,
  edgeShape,
  useRemoveLsGraph,
}
