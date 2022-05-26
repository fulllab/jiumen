/** The data to store on the given node */
export type NodeData = { color: string }

export type EdgeShape = 'Process' | 'Support'

export type SaveMode = 'stageDocs' | 'repoDocs'

export enum StatusEnum {
  Idea,
  Draft,
  Review,
  implementating,
  Final,
  Stagnant,
  Withdrawn,
  Living,
}

export enum DocStatus {
  READ_ONLY,
  EDIT,
}

export interface Resource {
  id: number
  title: string
  uri: string
}

export interface DocsObj {
  [id: string]: DocContent
}

export type DocContent = {
  status: number
  introduction: string
  description: string
  resources: Resource[]
  priority: number
  progress: number
}

export interface NavItem {
  path: string
  name: string
  isActive: boolean
}

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

// Error-log information
export interface ErrorLogInfo {
  // Error file
  file: string
  // Error name
  name?: string
  // Error message
  message: string
  // Error stack
  stack?: string
  // Error detail
  detail: string
  // Error url
  url: string
  // Error time
  time?: string
}

export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
}

export type Endpoint = {
  id: string
  orientation: [number, number]
  pos?: [number, number]
}

export type NodeInitial = {
  id: string
  top: number
  left: number
  endpoints: Endpoint[]
  nodeData: NodeData
}

export type GroupInitial = {
  id: string
  top: number
  left: number
  width: number
  height: number
  endpoints: Endpoint[]
  options: GroppOption
  group?: string
  nodeData?: NodeData
}

export type Node = Omit<NodeInitial, 'nodeData'>
export type Group = Omit<GroupInitial, 'nodeData'>

export type Edge = {
  id: string
  sourceNode: Node
  sourceEndpoint: Endpoint
  targetNode: Node
  targetEndpoint: Endpoint
  label?: string
}

export type GroppOption = {
  text: string
}

export type ButterflyDataInitial = {
  nodes: NodeInitial[]
  edges: Edge[]
  groups: Group[]
}

export type ButterflyData = {
  nodes: Node[]
  edges: Edge[]
  groups: Group[]
}

export type CanvasInternal = {
  addNode: (node: object) => void
  addNodes: (nodes: object[]) => void
  removeNode: (nodeId: string) => void
  removeNodes: (nodeIds: string[]) => void
  getNeighborEdges: (nodeId: string) => Edge[]
  getNeighborEdgesByEndpoint: (nodeId: string, endpointId: string) => Edge[]
  // and a lot more less useful stuff
}

export type CanvasConfig = {
  disLinkable?: boolean
  linkable?: boolean
  draggable?: boolean
  zoomable?: boolean
  moveable?: boolean
  theme?: {
    group?: {
      type?: 'normal' | 'inner'
      dragGroupZIndex?: number
      resize?: boolean
      position: string
    }
    node?: {
      dragNodeZIndex?: number
    }
    edge?: {
      /** edge connection type */
      type?: 'endpoint' | 'node'
      shapeType?:
        | 'Bezier'
        | 'AdvancedBezier'
        | 'Bezier2-1'
        | 'Bezier2-2'
        | 'Bezier2-3'
        | 'Manhattan'
        | 'BrokenLine'
        | 'Flow'
      label?: string
      /** whether to show arrow*/
      arrow?: boolean
      /** arrow position (0 ~ 1) */
      arrowPosition?: number
      arrowOffset?: number
      arrowShapeType?: string
      isExpandWidth?: boolean
      defaultAnimate?: boolean
      dragEdgeZindex?: number
    }
    endpoint?: {
      /** limit endpoint position ['Top', 'Bottom', 'Left', 'Right'] */
      position?: any[]
      /** point.linkable method is triggered when connecting, can be highlighted */
      linkableHighlight?: boolean
    }
    zoomGap?: number
    autoFixCanvas?: {
      enable?: boolean
      autoMovePadding?: [number, number, number, number]
    }
    autoResizeRootSize?: boolean
  }
  global?: {
    isScopeStrict?: boolean
  }
}
