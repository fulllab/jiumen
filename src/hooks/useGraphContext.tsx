import { Graph } from '@antv/x6'
import { provide, inject, ShallowReactive } from 'vue'

export const contextSymbol = String(Symbol('x6ContextSymbol'))
export const appSymbol = String(Symbol('appContextSymbol'))

export const createContext = (context) => {
  provide(contextSymbol, context)
}

export const useAppConfig = () => {
  const context = inject(contextSymbol)
  return context as ShallowReactive<{
    isReadOnly: boolean;
    spinning: boolean;
  }>
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

export default {
  createContext,
  contextSymbol,
  appSymbol,
  useContext,
}

