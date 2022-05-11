import { Endpoint as BaseEndpoint, Node as ButterflyNode, Group as BaseGroup, Edge } from 'butterfly-dag'
import { Node, Group, Endpoint, ButterflyDataInitial, NodeInitial,GroupInitial } from '@/types'

class IdNode extends ButterflyNode {
  draw(data: Node) {
    const el = document.getElementById(data.id)!
    el.style.top = `${data.top}px`
    el.style.left = `${data.left}px`
    return el
  }
}

class IdGroup extends BaseGroup {
  draw(data: Group) {
    const el = document.getElementById(data.id)!
    el.style.top = `${data.top}px`
    el.style.left = `${data.left}px`
    el.style.width = `${data.width}px`
    el.style.height = `${data.height}px`
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

export const injectGroupClass = (group: GroupInitial) => ({
  ...group,
  Class: IdGroup,
  endpoints: group.endpoints.map(endpoint => ({
    ...endpoint,
    Class: IdEndpoint,
  })),
})

export const injectEdgeClass = (edge: Edge) => ({ ...edge, Class: Edge })

export const injectClasses = (data: ButterflyDataInitial) => ({
  nodes: data.nodes.map(injectNodeClass),
  groups: data.groups.map(injectGroupClass),
  edges: data.edges.map(injectEdgeClass),
})
