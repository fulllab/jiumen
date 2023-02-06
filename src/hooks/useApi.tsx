import { useDocsStore } from '../store/modules/docs'
import { useGraphStore } from '../store/modules/graph'
import { diffObj, cleanObjs, isObjectValueEqual } from '../utils/diff'
import { useMessage } from './useMessage'
import { useRootState } from './useApp'
import { useI18n } from './useI18n'
import { isEmpty } from '../utils/is'
import { useDataBase } from './useCeramic'
import { CeramicApi } from '@ceramicnetwork/common'
import { mergerLsDocs, getStageLsDocs, getRepoLsDocs } from './useDocs'
import { Graph } from '@antv/x6'
import { Graph as GraphCeramic } from '../types'

export async function sendGraph(ceramic: CeramicApi, graphId: string, graph: Graph) {
  let newGraph = graph.toJSON().cells
  const { t } = useI18n()
  const { addDocs, updateDocs, deleteDocs, updateTile } = useDataBase(ceramic)

  const graphStore = useGraphStore()
  const remoteGrap = graphStore.getRemoteGraph

  const docsStore = useDocsStore()
  const allDocs = Object.assign(
    getRepoLsDocs(graphId),
    getStageLsDocs(graphId),
    docsStore.getWorkingDocs,
  )

  const remoteDocs = docsStore.getRemoteDocs
  const newDocs = cleanObjs(newGraph, allDocs)

  const {
    deleted: deletedDocs,
    updated: updatedDocs,
    created: createdDocs,
  } = diffObj(newDocs, remoteDocs)

  mergerLsDocs(graphId, newDocs as any)

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

  let jobsCount = 4

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

  if (!isEmpty(updatedDocs)) {
    const updatedDocsArr = Object.values(updatedDocs).map((doc)=>{
      const docCeramic = doc as any
      for (let index = 0; index < newGraph.length; index++) {
        const cell = newGraph[index]
        if (cell.id === docCeramic.id) {
          docCeramic.docSteamId = cell.data.docSteamId
          return docCeramic
        }
      }
    })
    await updateDocs(updatedDocsArr as any)
      .then(() => {
        success('Docs updated')
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    success('Docs updated')
  }

  if (!isEmpty(deletedDocs)) {
    const deletedDocsArr = Object.values(deletedDocs)
    await deleteDocs(deletedDocsArr as any)
      .then(() => {
        success('Docs deleted')
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    success('Docs deleted')
  }

  if (!isEmpty(createdDocs)) {
    const createdDocsArr = Object.values(createdDocs)
    await addDocs(createdDocsArr as any)
      .then(createdDocsArrWithCid => {
        const cells = newGraph
        createdDocsArrWithCid.forEach(doc => {
          for (let index = 0; index < cells.length; index++) {
            const cell = cells[index]
            if (cell.id === doc.id) {
              cell.data.docSteamId = doc.stream_id
              break
            }
          }
        })
        newGraph = cells
      })
      .then(() => {
        updateTile(graphId, _handleGraphToJSON(newGraph))
      })
      .then(() => {
        success('Docs Created && Graph updated')
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    success('Docs Created && Graph updated')
  }

  if (!isObjectValueEqual(newGraph, remoteGrap) && isEmpty(createdDocs)) {
    updateTile(graphId, _handleGraphToJSON(newGraph))
      .then(() => {
        success('Graph updated!')
      })
      .catch(error => {
        showErr(error)
      })
  } else {
    success('Graph updated!')
  }
}

function _handleGraphToJSON(graph: Array<any>) {
  return graph.map(cell => JSON.stringify(cell)
  )
}

export default {
  sendGraph,
}
