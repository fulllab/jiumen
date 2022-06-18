import { DocContent, DocsObj } from '@/types'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { STAGE_KEY, REPO_KEY } from '@/types/cacheEnum'
import { checkedType } from '@/utils/tools'
import { createStorage } from '@/utils/localStorage'

const ls = createStorage({})

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
      return checkedType(this.stageDocs) || ls.get(STAGE_KEY) || {}
    },
    getRepoDocs(): DocsObj | {} {
      return checkedType(this.repoDocs) || ls.get(REPO_KEY) || {}
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
      ls.set(STAGE_KEY, this.stageDocs)
    },
    setRepoDoc(nodeId: string, data: DocContent | null): void {
      this.repoDocs[nodeId] = data
      this.workingDocs[nodeId] = data
      ls.set(REPO_KEY, this.repoDocs)

      localStorage.setItem(STAGE_KEY, JSON.stringify(this.stageDocs))
      ls.set(STAGE_KEY, this.stageDocs)
    },
    mergerDocs(data: DocsObj): void {
      this.repoDocs = data
      this.stageDocs = {}
      this.workingDocs = {}
      console.log('data', data);

      if ((data == {})) {
        ls.remove(REPO_KEY)
      } else {
        ls.set(REPO_KEY, data)
      }
      ls.remove(STAGE_KEY)
    },
    recoveryDoc(nodeId: string): void {
      Reflect.deleteProperty(this.workingDocs, nodeId)
      Reflect.deleteProperty(this.remoteDocs, nodeId)
    },
    removeLsDocs(): void {
      this.stageDocs = {}
      this.repoDocs = {}
      this.workingDocs = {}
      ls.remove(STAGE_KEY)
      ls.remove(REPO_KEY)
    },
  },
})

// Need to be used outside the setup
export function useDocsStoreWithOut() {
  return useDocsStore(store)
}
