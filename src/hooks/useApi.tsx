import { computed, Ref } from 'vue'
import { useDocsStore } from '@/store/modules/docs'
import { useGraphStore } from '@/store/modules/graph'
import { contract, mine } from '@/api/arweave'
import { diffArr, diffObj, cleanObjs } from '@/utils/diff'

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

export const sendGraph = async graph => {
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
    docsStore.getStageDocs,
    docsStore.getRepoDocs,
    docsStore.getWorkingDocs,
  )

  const remoteDocs = docsStore.getRemoteDocs
  const newDocs = cleanObjs(newGraph.cells, allDocs)

  const { deleted: deletedDocs, updated: updatedDocs } = diffObj(newDocs, remoteDocs)

  docsStore.mergerDocs(newDocs as any)

  await contract.writeInteraction({
    function: 'setGraph',
    data: {
      updated: updatedGraph,
      deleted: deletedGraph,
      created: createdGraph,
    },
  })

  await mine()

  await contract.writeInteraction({
    function: 'setDocs',
    data: {
      updated: updatedDocs,
      deleted: deletedDocs,
    },
  })

  await mine()
}

export default {
  initState,
  sendGraph,
}
