import { DocContent, DocsObj } from '../../types'
import { defineStore } from 'pinia'
import { store } from '../'
import { checkedType } from '../../utils/tools'

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
      return checkedType(this.stageDocs)
    },
    getRepoDocs(): DocsObj | {} {
      return checkedType(this.repoDocs)
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
    setRemoteDocById(id: string, data: DocContent): void {
      this.remoteDocs[id] = data
    },
    setStageDoc(nodeId: string, data: DocContent): void {
      this.setWorkingDocById(nodeId, data)
      this.stageDocs[nodeId] = data
    },
    setRepoDoc(nodeId: string, data: DocContent | null): void {
      this.repoDocs[nodeId] = data
      this.workingDocs[nodeId] = data
    },
    mergerDocs(data: DocsObj): void {
      this.repoDocs = data
      this.stageDocs = {}
      this.workingDocs = {}
    },
    recoveryDoc(nodeId: string): void {
      Reflect.deleteProperty(this.workingDocs, nodeId)
      Reflect.deleteProperty(this.remoteDocs, nodeId)
    },
    removeDocs(): void {
      this.stageDocs = {}
      this.repoDocs = {}
      this.workingDocs = {}
    },
  },
})

// Need to be used outside the setup
export function useDocsStoreWithOut() {
  return useDocsStore(store)
}
