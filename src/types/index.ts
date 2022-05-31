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
