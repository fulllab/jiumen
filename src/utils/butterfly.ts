import { Endpoint as BaseEndpoint, Node as ButterflyNode, Edge } from 'butterfly-dag'
import { Node, Endpoint, ButterflyDataInitial, NodeInitial } from '@/types'

class IdNode extends ButterflyNode {
  draw(data: Node) {
    const el = document.getElementById(data.id)!
    el.style.top = `${data.top}px`
    el.style.left = `${data.left}px`
    return el
  }
}

class IdEndpoint extends BaseEndpoint {
  draw(data: Endpoint) {
    return document.getElementById(data.id)
  }
}

export const injectNodeClass = (node: NodeInitial) => ({
  ...node,
  Class: IdNode,
  endpoints: node.endpoints.map(endpoint => ({
    ...endpoint,
    Class: IdEndpoint,
  })),
})

export const injectEdgeClass = (edge: Edge) => ({ ...edge, Class: Edge })

export const injectClasses = (data: ButterflyDataInitial) => ({
  nodes: data.nodes.map(injectNodeClass),
  edges: data.edges.map(injectEdgeClass),
})
