import { defineStore } from 'pinia'
import { store } from '@/store'
import { GRAPH_REPO_KEY, GRAPH_REMOTE_KEY } from '@/types/cacheEnum'

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
      return this.repoGraph || JSON.parse(localStorage.getItem(GRAPH_REPO_KEY) as any)
    },
    getRemoteGraph(): string | '' {
      return this.remoteGraph || JSON.parse(localStorage.getItem(GRAPH_REMOTE_KEY) as any)
    },
  },
  actions: {
    // setStageGraph(graph: string): void {
    //   this.stageGraph = graph
    // },
    setRepoGraph(graph: any): void {
      this.repoGraph = graph
      localStorage.setItem(GRAPH_REPO_KEY, JSON.stringify(this.repoGraph))
    },
    setRemoteGraph(graph: any): void {
      this.remoteGraph = graph
      localStorage.setItem(GRAPH_REMOTE_KEY, JSON.stringify(this.remoteGraph))
    },
    removeRepoGraph(): void {
      this.repoGraph = ''
      localStorage.removeItem(GRAPH_REPO_KEY)
    }
  },
})

// Need to be used outside the setup
export function useGraphStoreWithOut() {
  return useGraphStore(store)
}
