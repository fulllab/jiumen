import { DocContent } from '@/types'
import { useDocsStore } from '@/store/modules/docs'

export const useWokingDoc = (
  nodeId: string,
): DocContent => {
  const docsStore = useDocsStore()
  return (
    docsStore.getWorkingDocs[nodeId] ||
    docsStore.getStageDocs[nodeId] ||
    docsStore.getRepoDocs[nodeId] ||
    docsStore.getRemoteDocs[nodeId] ||
    {
      resources: [],
      progress: 0,
      priority: 0,
      introduction: '',
      status: 0,
      description: '',
    }
  )
}

export function useAdd(nodeId: string, data: DocContent) {
  const docsStore = useDocsStore()
  docsStore.setStageDoc(nodeId, data)
}

export function useCommit(nodeId: string, data: DocContent) {
  const docsStore = useDocsStore()
  docsStore.setRepoDoc(nodeId, data)
}

export default {
  useWokingDoc,
  useAdd,
  useCommit,
}
