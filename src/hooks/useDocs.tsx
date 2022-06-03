import { DocContent } from '@/types'
import { useDocsStore } from '@/store/modules/docs'
import { useAppState } from '@/store/modules/app'

export const useCurrentDoc = (nodeId: string): DocContent => {
  const docsStore = useDocsStore()
  const appState = useAppState()

  const currentDoc = appState.getAtWork
    ? docsStore.getWorkingDocs[nodeId] ||
      docsStore.getStageDocs[nodeId] ||
      docsStore.getRepoDocs[nodeId] ||
      docsStore.getRemoteDocs[nodeId]
    : docsStore.getRemoteDocs[nodeId]

  return (
    currentDoc || {
      resources: [],
      progress: 0,
      priority: 0,
      introduction: {},
      status: 0,
      description: {},
    }
  )
}

export function useAdd(nodeId: string, data: DocContent) {
  const docsStore = useDocsStore()
  docsStore.setStageDoc(nodeId, data)
}

export function useCommit(nodeId: string, data: DocContent | null) {
  const docsStore = useDocsStore()
  docsStore.setRepoDoc(nodeId, data)
}

export function useRemoveLsDocs() {
  const docsStore = useDocsStore()
  docsStore.removeLsDocs()
}

// recovery

export function useRecoveryDocs(nodeId: string) {
  const docsStore = useDocsStore()
  docsStore.recoveryDoc(nodeId)
}

export default {
  useCurrentDoc,
  useAdd,
  useCommit,
  useRemoveLsDocs,
}
