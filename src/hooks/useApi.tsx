import { useDocsStore } from '@/store/modules/docs'
import { useGraphStore } from '@/store/modules/graph'
import { contract, mineOrWait } from '@/api/arweave'
import { diffArr, diffObj, cleanObjs } from '@/utils/diff'
import { useMessage } from '@/hooks/useMessage'
import { useRootState } from '@/hooks/useApp'
import { useI18n } from '@/hooks/useI18n'
import { useAppState } from '@/store/modules/app'
import { isEmpty } from '@/utils/is'

export const initState = async () => {
  const { state } = await contract.readState()
  const appStore = useAppState()
  const graphChecked = state.graph.filter(item => item && !isEmpty(item))
  const graphJson = {
    cells: graphChecked,
  }

  const graphStore = useGraphStore()
  const docsStore = useDocsStore()

  docsStore.setRemoteDocs(state.docs)
  graphStore.setRemoteGraph(graphJson)
  appStore.setMembers(state.members)

  return graphJson
}

export async function sendGraph(graph) {
  const newGraph = graph.toJSON()
  const { t } = useI18n()

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

  const showErr = err => {
    console.log('err', err)
    setSpinning(false)
    notification.error({
      message: t('notification.failed'),
      description: '',
      duration: 5,
    })
  }

  setSpinning(true)

  let jobsCount = 2

  const success = send => {
    jobsCount -= 1
    notification.success({
      message: `${send} ${t('notification.completed')}`,
      description: '',
      duration: 3,
    })
    if (jobsCount <= 0) {
      setSpinning(false)
    }
  }

  const clean = send => {
    jobsCount -= 1
    notification.success({
      message: `${send} is clean , nothing update!`,
      description: '',
      duration: 3,
    })
    if (jobsCount <= 0) {
      setSpinning(false)
    }
  }

  if (!isEmpty(updatedGraph) || !isEmpty(deletedGraph) || !isEmpty(createdGraph)) {
    await contract
      .writeInteraction({
        function: 'setGraph',
        data: {
          updated: updatedGraph,
          deleted: deletedGraph,
          created: createdGraph,
        },
      })
      .then(transactionId => {
        success('Graph')
        return mineOrWait(transactionId)
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    clean('Graph')
  }

  if (!isEmpty(updatedDocs) || !isEmpty(deletedDocs)) {
    await contract
      .writeInteraction({
        function: 'setDocs',
        data: {
          updated: updatedDocs,
          deleted: deletedDocs,
        },
      })
      .then(transactionId => {
        success('Docs')
        return mineOrWait(transactionId)
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    clean('Docs')
  }
}

export default {
  initState,
  sendGraph,
}
