import { Graph } from '@antv/x6'
import type { CeramicApi } from '@ceramicnetwork/common'
import { provide, inject, ShallowReactive } from 'vue'

export const contextSymbol = String(Symbol('x6ContextSymbol'))
export const ceramicSymbol = String(Symbol('ceramicContextSymbol'))
export const appSymbol = String(Symbol('appContextSymbol'))


export const createCeramicContext = (context) => {
  provide(ceramicSymbol, context)
}

export const createContext = (context) => {
  provide(contextSymbol, context)
}

export const useContext = () => {
  const context = inject(contextSymbol)
  if (!context) {
    throw new Error('context must be used after useProvide')
  }
  return context as ShallowReactive<{
    graph: Graph;
  }>
}

export const useCeramicContext = () => {
  const context = inject(ceramicSymbol)
  return context as ShallowReactive<{
    ceramic: CeramicApi;
  }>
}

export default {
  createContext,
  contextSymbol,
  appSymbol,
  ceramicSymbol,
  useContext,
  useCeramicContext,
  createCeramicContext,
}

