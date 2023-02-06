import { ref, Ref, shallowReactive, watch, computed } from 'vue'
import { Graph, Shape } from '@antv/x6'
import { createContext } from './useGraphContext'
import { EdgeShape } from '../types'
import {
  HighlightingStyle,
  ProcessWidth,
  ProcessColor,
  SupportWidth,
  SupportColor,
  CanveBackground,
} from '../settings/graph'
import { useAppStateWithOut } from '../store/modules/app'
import { useGraphStoreWithOut } from '../store/modules/graph'
import { useUsersStateWithOut } from '../store/modules/users'
import { useRootState } from './useApp'
import { useDataBase } from './useCeramic'
import { CeramicApi } from '@ceramicnetwork/common'
import { useDocsStore } from '../store/modules/docs'
import isEmpty from 'lodash/isEmpty'
import { createKVStorage } from '../utils/localStorage'
import { GRAPH_REPO_KEY, GRAPH_REMOTE_KEY } from '../types/cacheEnum'

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

  const graphStore = useGraphStoreWithOut()

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
        // modifiers: ['ctrl'],
      },
      interacting: () => {
        if (isReadOnly().value) {
          return {
            magnetConnectable: false,
            nodeMovable: false,
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
          name: 'er',
          // args: {
          //   step: graph.value?.options.grid.size || 12,
          // },
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
    [() => docsStore.getAtWork, () => graphStore.getGraphId],
    ([atWork, graphId]) => {
      if (isEmpty(graphId) || !graphId) {
        return
      }
      const { repoLsGraph, remoteLsGraph } = getGraphStore(graphId)
      let graphLs = atWork ? repoLsGraph : remoteLsGraph
      if (!!graphLs) {
        graph.value?.fromJSON(graphLs)
      }
    },
    { immediate: true },
  )
  return graph
}

const getGraphStore = (graphId: string) => {
  const ls = createKVStorage({})
  const graphStore = useGraphStoreWithOut()
  const getRemoteGraph = graphStore.getRepoGraph
  const repoLsGraph = getRemoteGraph || ls.getItem(GRAPH_REPO_KEY, graphId)
  const remoteLsGraph =
    graphStore.getRemoteGraph || ls.getItem(GRAPH_REMOTE_KEY, graphId)
  return {
    repoLsGraph,
    remoteLsGraph,
  }
}

export const setGraphStore = (graphId: string, graph: Graph, isRemote: boolean) => {
  const ls = createKVStorage({})
  const graphStore = useGraphStoreWithOut()
  const graphJson = graph
  const key = isRemote ? GRAPH_REMOTE_KEY : GRAPH_REPO_KEY

  if (isRemote) {
    graphStore.setRemoteGraph(graphJson)
  } else {
    graphStore.setRepoGraph(graphJson)
  }
  ls.setItem(key, graphId, graphJson)
}

export const removeGraphStore = (graphId: string) => {
  const ls = createKVStorage({})
  const graphStore = useGraphStoreWithOut()
  graphStore.removeRepoGraph()
  ls.removeItem(GRAPH_REMOTE_KEY, graphId)
}

export const edgeShape = ref<EdgeShape>('Process')

export function useRemoveLsGraph() {
  const graphStore = useGraphStoreWithOut()
  graphStore.removeRepoGraph()
}

export async function useInitGraphList(ceramic: CeramicApi) {
  const { setSpinning } = useRootState()
  setSpinning(true)
  const usersState = useUsersStateWithOut()
  const account = usersState.account
  const graphStore = useGraphStoreWithOut()
  if (account) {
    const { getGraphs } = useDataBase(ceramic)
    const graphList = await getGraphs()
    graphStore.setGraphs(graphList ? graphList.graphs : [])
  } else {
    graphStore.setGraphs([])
  }
  setSpinning(false)
}

export async function initGraphData(id: string, ceramic: CeramicApi) {
  const usersState = useUsersStateWithOut()
  const { loadTile } = useDataBase(ceramic)
  const { content, controllers } = await loadTile(id)

  const graphChecked = content.map(item => JSON.parse(item))
  const graphJson = {
    cells: graphChecked,
  }

  const graphStore = useGraphStoreWithOut()

  setGraphStore(id, graphJson as any, true)
  graphStore.setControllers(controllers)

  watch(
    () => [graphStore.controllers, usersState.getParent],
    ([controllers, parent]) => {
      if (parent && typeof parent == 'string') {
        graphStore.setIsMember(controllers?.includes(parent) || false)
      } else {
        graphStore.setIsMember(false)
      }
    },
    { immediate: true },
  )

  return graphJson
}

export function getIsMember() {
  const graphStore = useGraphStoreWithOut()
  const isMember = computed(() => graphStore.getIsMember)
  return isMember
}

export default {
  createGraph,
  Graph,
  getIsMember,
  edgeShape,
  useRemoveLsGraph,
  useInitGraphList,
  setGraphStore,
}
