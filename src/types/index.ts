/** The data to store on the given node */
export type NodeData = { color: string }

export type EdgeShape = 'Process' | 'Support'

export type SaveMode = 'stageDocs' | 'repoDocs'

export type LocaleType = 'zh_CN' | 'en' | 'en_US' | 'ru' | 'ja' | 'ko';

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
  [id: string]: DocContent | null
}

export interface LocaleString {
  [locale: string]: string
}

export type DocContent = {
  stream_id: string
  id: string
  status: number
  introduction: LocaleString
  description: LocaleString
  resources: Resource[]
  priority: number
  progress: number
}

export type DID = string
export type GraphId = string
export type Doc = string

export type GraphMetadata = {
  id: GraphId
  name: string
}

export type GraphList = {
  graphs: GraphMetadata[]
}

export type Graph = string[]

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
