import { DocContent } from '../types'
import { useDocsStore } from '../store/modules/docs'
import { useAppState } from '../store/modules/app'
import { STAGE_KEY, REPO_KEY } from '../types/cacheEnum'
import { createKVStorage } from '../utils/localStorage'
import { DocsObj } from '../types'
import isEmpty from 'lodash/isEmpty'
import { useDataBase } from './useCeramic'
import { CeramicApi } from '@ceramicnetwork/common'

export const useCurrentDoc = async (
  ceramic: CeramicApi,
  graphId: string,
  nodeId: string,
  docSteamId: string = '',
): Promise<DocContent> => {
  const docsStore = useDocsStore()
  const appState = useAppState()

  const stageLsDocs = _getStageLsDocs(graphId)

  if (!isEmpty(docSteamId)) {
    await initDocCeramic(ceramic, nodeId, docSteamId)
  }

  const currentDoc = appState.getAtWork
    ? docsStore.getWorkingDocs[nodeId] ||
      _getStageLsDocs(graphId)[nodeId] ||
      _getRepoLsDocs(graphId)[nodeId] ||
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

export const initDocCeramic = async (ceramic: CeramicApi, nodeId: string, docSteamId: string) => {
  const { loadTile } = useDataBase(ceramic)
  const { content } = await loadTile(docSteamId)
  const docsStore = useDocsStore()
  const doc = content
  console.log('useDocs - doc', doc)
  docsStore.setRemoteDocById(nodeId, doc)
  return doc
}

export const getStageLsDocs = (graphId: string) => {
  return _getStageLsDocs(graphId)
}

export const getRepoLsDocs = (graphId: string) => {
  return _getRepoLsDocs(graphId)
}

function _getStageLsDocs(graphId: string) {
  const ls = createKVStorage({})
  const docsStore = useDocsStore()
  const docs = ls.getItem(STAGE_KEY, graphId)
  return docsStore.getStageDocs || docs || {}
}

function _getRepoLsDocs(graphId: string) {
  const ls = createKVStorage({})
  const docsStore = useDocsStore()
  const docs = ls.getItem(REPO_KEY, graphId)
  return docsStore.getRepoDocs || docs || {}
}

function _setStageLsDocs(graphId: string, nodeId: string, data: DocContent) {
  const docsStore = useDocsStore()
  docsStore.setStageDoc(nodeId, data)
  _setDocIteam(graphId, nodeId, data, STAGE_KEY)
}

function _setRepoLsDocs(graphId: string, nodeId: string, data: DocContent | null) {
  const docsStore = useDocsStore()
  docsStore.setRepoDoc(nodeId, data)
  _setDocIteam(graphId, nodeId, data, REPO_KEY)
  _setDocIteam(graphId, nodeId, data, STAGE_KEY)
}

function _setDocIteam(graphId: string, nodeId: string, data: DocContent | null, key: string) {
  const ls = createKVStorage({})
  let lsData = ls.getItem(key, graphId) || {}
  lsData[nodeId] = data
  ls.setItem(key, graphId, lsData)
}

function _removeRepoLsDocs(graphId: string) {
  const ls = createKVStorage({})
  const docsStore = useDocsStore()
  docsStore.removeDocs()
  ls.removeItem(REPO_KEY, graphId)
  ls.removeItem(STAGE_KEY, graphId)
}

export function useAdd(graphId: string, nodeId: string, data: DocContent) {
  _setStageLsDocs(graphId, nodeId, data)
}

export function useCommit(graphId: string, nodeId: string, data: DocContent | null) {
  _setRepoLsDocs(graphId, nodeId, data)
}

export function useRemoveLsDocs(graphId: string) {
  _removeRepoLsDocs(graphId)
}

export function mergerLsDocs(graphId: string, data: DocsObj) {
  const docsStore = useDocsStore()
  docsStore.mergerDocs(data)

  const ls = createKVStorage({})

  if (isEmpty(data)) {
    ls.removeItem(REPO_KEY, graphId)
  } else {
    ls.setItem(REPO_KEY, graphId, data)
  }
  ls.removeItem(STAGE_KEY, graphId)
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
  initDocCeramic,
  getStageLsDocs,
  getRepoLsDocs,
}
