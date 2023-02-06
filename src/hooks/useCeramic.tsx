import { watch, shallowReactive } from 'vue'
import { useUsersState } from '../store/modules/users'
import { useGraphStore } from '../store/modules/graph'
import { initWeb3Onboard } from '../utils/onboard'
import { useOnboard } from '@web3-onboard/vue'
import { ethers } from 'ethers'
import { EthereumAuthProvider } from '@self.id/web'
import publishedModel from '../../scripts/publish-model.json'
import { DIDDataStore } from '@glazed/did-datastore'
import type { CeramicApi } from '@ceramicnetwork/common'
import { createCeramicContext } from './useGraphContext'
import { StreamID } from '@ceramicnetwork/streamid'
import {
  createDataStore,
  createCeramic,
  createDataModel,
  createTileLoader,
  authenticate as authenticateCeramic,
} from '../api/ceramic'
import { Graph, DocContent, GraphList, GraphMetadata } from '../types'
import { useInitGraphList } from './useGraph'

export function useWeb3Onboard() {
  const { alreadyConnectedWallets, connectingWallet, connectedWallet, connectWallet } =
    useOnboard()

  const usersState = useUsersState()

  const init = async () => {
    initWeb3Onboard
  }

  const ceramicRef = shallowReactive<{ ceramic: CeramicApi | null }>({
    ceramic: null,
  })

  createCeramicContext(ceramicRef)

  const initCeramic = async () => {
    const ceramic = await createCeramic()
    ceramicRef.ceramic = ceramic
  }

  const authenticate = async provider => {
    if (!ceramicRef.ceramic) {
      return
    }
    const newCeramic = await authenticateCeramic(ceramicRef.ceramic, provider)
    ceramicRef.ceramic = newCeramic
  }

  watch(
    () => connectedWallet.value,
    async connected => {
      if (connected && connectedWallet.value) {
        if (connectedWallet.value.provider && ceramicRef.ceramic) {

          const provider = connectedWallet.value.provider
          const web3Provider = new ethers.providers.Web3Provider(provider, 'any')
          const account = connectedWallet.value.accounts[0]
          const address = await web3Provider.getSigner().getAddress()
          const ethAuthProvider = new EthereumAuthProvider(provider, address)
          if (ceramicRef.ceramic.did?.id !== address) {
            await authenticate(ethAuthProvider)
          }
          usersState.setWalletInfo({
            account,
            parent: ceramicRef.ceramic.did?.parent,
          })
          await useInitGraphList(ceramicRef.ceramic)
        } else {
          usersState.setWalletInfo({
            account: null,
            parent: null,
          })
        }
      }
    },
    { immediate: true },
  )

  return {
    init,
    initCeramic,
    connectingWallet,
    connectedWallet,
    connectWallet,
    authenticate,
  }
}

export type Logger = {
  error: (msg: string, context?: object) => void
  log: (msg: string, context?: object) => void
  warn: (msg: string, context?: object) => void
  debug: (msg: string, context?: object) => void
  info: (msg: string, context?: object) => void
}

export function useDataBase(ceramic: CeramicApi) {
  const loader = createTileLoader(ceramic)
  const model = createDataModel(ceramic)
  const store = createDataStore(ceramic)
  const logger = console

  const _pinAdd = async (streamId: StreamID) => {
    try {
      await ceramic.pin.add(streamId as any)
    } catch (e) {
      logger.error(
        `Error when pinning stream ${streamId.toString()} for did ${ceramic.did}:` +
          e?.toString(),
      )
    }
  }

  const _pinRm = async (streamId: StreamID) => {
    try {
      await ceramic.pin.rm(streamId as any)
    } catch (e) {
      logger.error(
        `Error when removing stream ${streamId.toString()} from pinning for did ${
          ceramic.did
        }:` + e?.toString(),
      )
    }
  }

  const getGraphs = async (): Promise<GraphList | null> => {
    if (!ceramic) return null
    const datastore = new DIDDataStore({
      ceramic: ceramic,
      model: publishedModel,
    })
    const graphList = await datastore.get('GraphList')
    if (!graphList) return null
    return graphList
  }

  // create new graph list for did
  const createGraphList = async () => {
    const datastore = new DIDDataStore({
      ceramic: ceramic as any,
      model: publishedModel,
    })

    const streamID = await datastore.set('GraphList', { graphs: [] })
    return streamID.toUrl()
  }

  // add new graph to graph list
  const addGraphToCeramic = async (name, graph: Graph = []) => {
    const graphStore = useGraphStore()
    const graphs = graphStore.graphs

    // create a tile for the graph
    const newGraphTile = await model.createTile('Graph', graph)

    // add new graph tile to the graph list
    const newGraphs = graphs.concat({
      id: newGraphTile.id.toString(),
      name,
    } as GraphMetadata)

    // merge new graph list
    const streamId = await store.merge('GraphList', { graphs: newGraphs })
    graphStore.setGraphs(newGraphs)

    // try pinning the new graph list
    await _pinAdd(streamId as any)

    return {
      graphList: newGraphs,
      graphListId: streamId.toUrl(),
      graphId: newGraphTile.id.toUrl(),
    }
  }

  // delete graph from graph list
  const deleteGraph = async (graphId): Promise<void> => {
    // get graph list
    const graphList = await store.get('GraphList')
    if (graphList && graphList?.graphs.length > 0) {
      const newGraphs = graphList?.graphs.filter(id => id !== graphId)
      if (newGraphs.length === graphList?.graphs.length) {
        throw new Error('graph not found')
      }
      const graphListStreamId = (await store.merge('GraphList', {
        graphs: newGraphs,
      })) as unknown as StreamID
      // const graphIdStreamId: StreamID = StreamID.fromString(graphId)
      // try to unpin the graph
      const graphIdStreamId: StreamID = StreamID.fromString(graphId)
      await _pinRm(graphIdStreamId)

      // try pinning graph list
      await _pinAdd(graphListStreamId)
    }
  }

  // update graph
  const updateGraph = async (tileId: string, newTile: any): Promise<void> => {
    const streamId: StreamID = StreamID.fromString(tileId)
    const tile = await model.loader.load(streamId)
    await tile.update(newTile)
  }

  // add new docs
  const addDocs = async (docs: DocContent[]): Promise<DocContent[]> => {
    const docsToAdd = docs.map(async doc => {
      // create a tile for the doc
      try {
        // const newDocTile = await loader.create(JSON.stringify(doc) as any)
        const newDocTile = await model.createTile('DocContent', doc)
        // model.createTile('DocContent', doc)
        return {
          ...doc,
          stream_id: newDocTile.id.toString(),
        }
      } catch (e) {
        logger.error(`Error when creating doc for did ${ceramic.did}:` + e?.toString())
      }
      return {
        ...doc,
        stream_id: '',
      }
    })

    const docsAddStatus = await Promise.allSettled(docsToAdd)

    const isFulfilled = (
      input: PromiseSettledResult<DocContent>,
    ): input is PromiseFulfilledResult<DocContent> => input.status === 'fulfilled'
    const filteredDocs = docsAddStatus.filter(isFulfilled)
    const settledDocs = filteredDocs.map(settledDoc => settledDoc.value)

    return settledDocs
  }

  // update docs
  const updateDocs = async (docs: any): Promise<any> => {
    const docsToUpdate = docs.map(async doc => {
      // create a tile for the doc
      try {
        const docSteamId = doc.docSteamId
        delete doc.docSteamId
        await updateTile(docSteamId, doc)
      } catch (e) {
        logger.error(`Error when updating doc for did ${ceramic.did} :` + e?.toString())
      }
    })

    const docsUpdateStatus = await Promise.allSettled(docsToUpdate)

    const isFulfilled = (
      input: PromiseSettledResult<void>,
    ): input is PromiseFulfilledResult<void> => input.status === 'fulfilled'
    const filteredDocs = docsUpdateStatus.filter(isFulfilled)
    const settledDocs = filteredDocs.map(settledDoc => settledDoc.value)

    return settledDocs
  }

  // load doc
  const loadTile = async (id: string): Promise<any> => {
    const streamId: StreamID = StreamID.fromString(id)
    const tile = await loader.load(streamId.toString())
    const controllers = await tile.controllers
    return {
      controllers,
      content: tile.content,
    }
  }

  // update doc
  const updateTile = async (tileId: string, newTile: any): Promise<void> => {
    const streamId: StreamID = StreamID.fromString(tileId)
    const tile = await loader.load(streamId)
    await tile.update(newTile)
  }

  // delete docs
  const deleteDocs = async (docIds: string[]): Promise<void> => {
    docIds.forEach(async docId => {
      // try to unpin the doc
      const docIdStreamId: StreamID = StreamID.fromString(docId)
      _pinRm(docIdStreamId)
    })
  }

  const deleteGraphList = async (): Promise<void> => {
    await store.remove('GraphList')
  }

  return {
    getGraphs,
    createGraphList,
    addGraphToCeramic,
    updateGraph,
    addDocs,
    updateDocs,
    loadTile,
    updateTile,
    deleteDocs,
    deleteGraph,
    deleteGraphList,
  }
}

export default {
  useDataBase,
}
