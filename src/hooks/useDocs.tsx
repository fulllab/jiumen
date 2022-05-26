import { DocContent } from '@/types'
import { useDocsStore } from '@/store/modules/docs'
import { docContentDefault } from '@/settings/graph'

export const useWokingDoc = (
  nodeId: string,
): DocContent => {
  const docsStore = useDocsStore()
  return (
    docsStore.getWorkingDocs[nodeId] ||
    docsStore.getStageDocs[nodeId] ||
    docsStore.getRepoDocs[nodeId] ||
    docsStore.getRemoteDocs[nodeId] ||
    docContentDefault
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
