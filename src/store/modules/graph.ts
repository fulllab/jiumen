import { defineStore } from 'pinia'
import { store } from '@/store'
import { GRAPH_REPO_KEY, GRAPH_REMOTE_KEY } from '@/types/cacheEnum'
import { GraphList, GraphMetadata } from '@/types/'
// Temporarily disable the staging area, need to make incremental storage
// for the diagram to improve efficiency
interface GraphState {
  // stageGraph: string
  repoGraph: any
  remoteGraph: any
  graphs: GraphMetadata[]
  graphListId: string | null
  controllers: Array<any>
  isMember: boolean
  graphId: string
}
export const useGraphStore = defineStore({
  id: 'graph',
  state: (): GraphState => ({
    // stageGraph: '',
    repoGraph: null,
    remoteGraph: null,
    graphs: [],
    graphListId: null,
    controllers: [],
    isMember: false,
    graphId: ''
  }),
  getters: {
    // getStageGraph(): string | '' {
    //   return this.stageGraph || ''
    // },
    getRepoGraph(): any {
      return this.repoGraph
    },
    getRemoteGraph(): string | '' {
      return this.remoteGraph
    },
    getGraphs(): GraphMetadata[] {
      return this.graphs
    },
    getGraphListId(): string | null {
      return this.graphListId || null
    },
    getControllers(): Array<any> {
      return this.controllers
    },
    getIsMember(): boolean {
      return this.isMember
    },
    getGraphId(): string {
      return this.graphId
    }
  },
  actions: {
    // setStageGraph(graph: string): void {
    //   this.stageGraph = graph
    // },
    setRepoGraph(graph: any): void {
      this.repoGraph = graph
    },
    setRemoteGraph(graph: any): void {
      this.remoteGraph = graph
    },
    removeRepoGraph(): void {
      this.repoGraph = ''
    },
    setGraphs(graphs: GraphMetadata[]): void {
      this.graphs = graphs
    },
    setGraphListId(graphListId: string): void {
      this.graphListId = graphListId
    },
    setControllers(controllers: Array<any>): void {
      this.controllers = controllers
    },
    setIsMember(isMember: boolean): void {
      this.isMember = isMember
    },
    setGraphId(graphId: string): void {
      this.graphId = graphId
    }
  },
})

// Need to be used outside the setup
export function useGraphStoreWithOut() {
  return useGraphStore(store)
}
