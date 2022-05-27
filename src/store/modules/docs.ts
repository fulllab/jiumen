import { DocContent, DocsObj } from '@/types'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { STAGE_KEY, REPO_KEY } from '@/types/cacheEnum'

interface DocsState {
  pageLoading: boolean
  workingDocs: DocsObj
  stageDocs: DocsObj
  repoDocs: DocsObj
  remoteDocs: DocsObj
}

export const useDocsStore = defineStore({
  id: 'docs',
  state: (): DocsState => ({
    pageLoading: false,
    workingDocs: {},
    stageDocs: {},
    repoDocs: {},
    remoteDocs: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getWorkingDocs(): DocsObj | {} {
      return this.workingDocs
    },
    getRemoteDocs(): DocsObj | {} {
      return this.remoteDocs || {}
    },
    getStageDocs(): DocsObj | {} {
      return this.stageDocs || localStorage.getItem(STAGE_KEY)
    },
    getRepoDocs(): DocsObj | {} {
      return this.repoDocs || localStorage.getItem(REPO_KEY)
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setWorkingDocs(data: DocsObj): void {
      this.workingDocs = data
    },
    setWorkingDocById(id: string, doc: DocContent): void {
      this.workingDocs[id] = doc
    },
    delDocById(id: string): void {
      delete this.workingDocs[id]
    },
    // initWorkingDocs(): void {
    //   this.workingDocs = Object.assign(
    //     this.remoteDocs,
    //     localStorage.getItem(REPO_KEY),
    //     localStorage.getItem(STAGE_KEY),
    //   )
    // },
    setRemoteDocs(data: DocsObj): void {
      this.remoteDocs = data
    },
    setStageDoc(nodeId: string, data: DocContent): void {
      this.setWorkingDocById(nodeId, data)
      this.stageDocs[nodeId] = data
      localStorage.setItem(STAGE_KEY, JSON.stringify(this.stageDocs))
    },
    setRepoDoc(nodeId: string, data: DocContent): void {
      this.repoDocs[nodeId] = data
      this.workingDocs[nodeId] = data
      localStorage.setItem(REPO_KEY, JSON.stringify(this.repoDocs))

      delete this.stageDocs[nodeId]
      localStorage.setItem(STAGE_KEY, JSON.stringify(this.stageDocs))
    },
    removeLsDocs(): void {
      this.stageDocs = {}
      this.repoDocs = {}
      this.workingDocs = {}
      localStorage.removeItem(STAGE_KEY)
      localStorage.removeItem(REPO_KEY)
    },
  },
})

// Need to be used outside the setup
export function useDocsStoreWithOut() {
  return useDocsStore(store)
}