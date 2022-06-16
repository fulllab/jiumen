import { defineStore } from 'pinia'
import { store } from '@/store'
import { GRAPH_REPO_KEY, GRAPH_REMOTE_KEY } from '@/types/cacheEnum'
import { createStorage } from '@/utils/localStorage'

const ls = createStorage({})

// Temporarily disable the staging area, need to make incremental storage
// for the diagram to improve efficiency
interface GraphState {
  // stageGraph: string
  repoGraph: any
  remoteGraph: any
}
export const useGraphStore = defineStore({
  id: 'graph',
  state: (): GraphState => ({
    // stageGraph: '',
    repoGraph: null,
    remoteGraph: null,
  }),
  getters: {
    // getStageGraph(): string | '' {
    //   return this.stageGraph || ''
    // },
    getRepoGraph(): any {
      return this.repoGraph || ls.get(GRAPH_REPO_KEY)
    },
    getRemoteGraph(): string | '' {
      return this.remoteGraph || ls.get(GRAPH_REMOTE_KEY)
    },
  },
  actions: {
    // setStageGraph(graph: string): void {
    //   this.stageGraph = graph
    // },
    setRepoGraph(graph: any): void {
      this.repoGraph = graph
      ls.set(GRAPH_REPO_KEY, this.repoGraph)
    },
    setRemoteGraph(graph: any): void {
      this.remoteGraph = graph
      ls.set(GRAPH_REMOTE_KEY, this.remoteGraph)
    },
    removeRepoGraph(): void {
      this.repoGraph = ''
      ls.remove(GRAPH_REMOTE_KEY)
    },
  },
})

// Need to be used outside the setup
export function useGraphStoreWithOut() {
  return useGraphStore(store)
}
