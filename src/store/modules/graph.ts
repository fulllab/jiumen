import { DocContent, DocsObj } from '@/types'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { GRAPH_REPO_KEY } from '@/types/cacheEnum'

// Temporarily disable the staging area, need to make incremental storage
// for the diagram to improve efficiency
interface GraphState {
  // stageGraph: string
  repoGraph: string
  remoteGraph: string
}
export const useGraphStore = defineStore({
  id: 'graph',
  state: (): GraphState => ({
    // stageGraph: '',
    repoGraph: '',
    remoteGraph: '',
  }),
  getters: {
    // getStageGraph(): string | '' {
    //   return this.stageGraph || ''
    // },
    getRepoGraph(): string | '' {
      return this.repoGraph || JSON.parse(localStorage.getItem(GRAPH_REPO_KEY) as any) || ''
    },
    getRemoteGraph(): DocsObj | {} {
      return this.remoteGraph
    },
  },
  actions: {
    // setStageGraph(graph: string): void {
    //   this.stageGraph = graph
    // },
    setRepoGraph(graph: string): void {
      this.repoGraph = graph
      localStorage.setItem(GRAPH_REPO_KEY, JSON.stringify(this.repoGraph))
    },
    setRemoteGraph(graph: string): void {
      this.remoteGraph = graph
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
