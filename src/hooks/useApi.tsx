import { useDocsStore } from '@/store/modules/docs'
import { useGraphStore } from '@/store/modules/graph'
import { contract, mineOrWait, getStatus } from '@/api/arweave'
import { diffArr, diffObj, cleanObjs } from '@/utils/diff'
import { useMessage } from '@/hooks/useMessage'
import { useRootState } from '@/hooks/useApp'

export const initState = async () => {
  const { state } = await contract.readState()
  const graphJson = {
    cells: state.graph,
  }

  const graphStore = useGraphStore()
  const docsStore = useDocsStore()

  docsStore.setRemoteDocs(state.docs)
  graphStore.setRemoteGraph(graphJson)

  return graphJson
}

export function sendGraph<T = any>(graph): Promise<T> {
  const newGraph = graph.toJSON()

  const graphStore = useGraphStore()
  const remoteGrap = graphStore.getRemoteGraph
  const {
    created: createdGraph,
    deleted: deletedGraph,
    updated: updatedGraph,
  } = diffArr(newGraph.cells, (remoteGrap as any).cells)

  // new Date().getTime()
  // TODO: Version control and support for forking

  const docsStore = useDocsStore()
  const allDocs = Object.assign(
    docsStore.getRepoDocs,
    docsStore.getStageDocs,
    docsStore.getWorkingDocs,
  )

  const remoteDocs = docsStore.getRemoteDocs
  const newDocs = cleanObjs(newGraph.cells, allDocs)

  const { deleted: deletedDocs, updated: updatedDocs } = diffObj(newDocs, remoteDocs)

  docsStore.mergerDocs(newDocs as any)

  const { notification } = useMessage()
  const { setSpinning } = useRootState()

  return new Promise(() => {
    setSpinning(true)
    contract
      .writeInteraction({
        function: 'setGraph',
        data: {
          updated: updatedGraph,
          deleted: deletedGraph,
          created: createdGraph,
        },
      })
      .then((transactionId) => {
        notification.success({
          message: 'Graph Completed',
          description: '',
          duration: 3,
        })
        mineOrWait(transactionId)
      })
      .then(() => {
        contract.writeInteraction({
          function: 'setDocs',
          data: {
            updated: updatedDocs,
            deleted: deletedDocs,
          },
        })
      })
      .then((transactionId) => {
        setSpinning(false)
        notification.success({
          message: 'Documentation Completed',
          description: '',
          duration: 3,
        })
        mineOrWait(transactionId)
      })
      .catch(err => {
        setSpinning(false)
        notification.error({
          message: 'Failed',
          description: err,
          duration: 5,
        })
      })
  })
}

export default {
  initState,
  sendGraph,
}
