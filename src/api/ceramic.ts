// -- Ceramic and Glazed
import type { CeramicApi } from '@ceramicnetwork/common'
import { CeramicClient } from '@ceramicnetwork/http-client'
import publishedModel from '../../scripts/publish-model.json'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { TileLoader } from '@glazed/tile-loader'
import { GraphList, Graph, DocContent } from '@/types'
import {
  EthereumAuthProvider,
} from '@self.id/web'

const { VITE_CERAMIC_CLIENT } = import.meta.env

export type ModelTypes = {
  schemas: {
    GraphList: GraphList
    Graph: Graph
    DocContent: DocContent
  }
  definitions: {
    GraphList: 'GraphList'
    Graph: 'Graph'
    DocContent: 'DocContent'
  }
  tiles: {}
}

export type Logger = {
  error: (msg: string, context?: object) => void
  log: (msg: string, context?: object) => void
  warn: (msg: string, context?: object) => void
  debug: (msg: string, context?: object) => void
  info: (msg: string, context?: object) => void
}

export function createCeramic(): Promise<CeramicApi> {
  const ceramic = new CeramicClient(VITE_CERAMIC_CLIENT) as unknown as CeramicApi
  return Promise.resolve(ceramic)
}

export function createDataStore(ceramic: CeramicApi): DIDDataStore {
  const datastore = new DIDDataStore({ ceramic, model: publishedModel })
  return datastore
}

export function createTileLoader(ceramic: CeramicApi): TileLoader {
  const loader = new TileLoader({ ceramic })
  return loader
}

export function createDataModel(ceramic: CeramicApi): DataModel<ModelTypes> {
  const model = new DataModel({ ceramic, aliases: publishedModel })
  return model
}

/**
 * Create a {@linkcode web.SelfID SelfID} instance using the given `authProvider` and attach the
 * associated DID instance to the internal Ceramic client instance.
 */
export async function authenticate(
  ceramic: CeramicApi,
  authProvider: EthereumAuthProvider,
  sessionStr?: string,
) {
  const { SelfID } = await import('@self.id/web')
  const selfID = await SelfID.authenticate<ModelTypes>({
    authProvider,
    sessionStr,
    ceramic: VITE_CERAMIC_CLIENT
  })
  // We need to attach the authenticated DID to the client instance to ensure streams can be updated
  ceramic.did = selfID.did
  return ceramic
}
