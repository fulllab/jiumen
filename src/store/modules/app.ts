import { defineStore } from 'pinia';
import { store } from '../';

interface AppState {
  spinning: boolean;
  readOnly: boolean;
  atWork: boolean;
  members: string[];
  isMember: boolean;
  graphId: string;
  ceramic: any;
  store: any;
  model: any;
  loader: any;
  selfID: any;
}

// const datastore = createDataStore(ceramic)
// const dataModel = createDataModel(ceramic)
// const tileLoader = createTileLoader(ceramic)

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: true,
    readOnly: true,
    atWork: false,
    members: [],
    isMember: false,
    graphId: '',
    ceramic: null,
    store: null,
    model: null,
    loader: null,
    selfID: null,
  }),
  getters: {
    getIsMember(): boolean {
      return this.isMember
    },
    getIsReadOnly(): boolean {
      return this.readOnly
    },
    getMembers(): any {
      return this.members
    },
    getSpinning(): boolean {
      return this.spinning;
    },
    getAtWork(): boolean {
      return this.atWork;
    },
    getGraphId(): string {
      return this.graphId;
    },
    getCeramic(): any {
      return this.ceramic;
    },
    getStore(): any {
      return this.store;
    },
    getModel(): any {
      return this.model;
    },
    getLoader(): any {
      return this.loader;
    },
    getSelfID(): any {
      return this.selfID;
    }
  },
  actions: {
    setIsMember(isMember: boolean): void {
      this.isMember = isMember
    },
    setIsReadOnly(status: boolean): void {
      this.readOnly = status
    },
    setSpinning(spinning: boolean): void {
      this.spinning = spinning;
    },
    setAtWork(atWork: boolean): void {
      this.atWork = atWork;
    },
    setMembers(members: any): void {
      this.members = members;
    },
    setGraphId(graphId: string): void {
      this.graphId = graphId;
    },
    setCeramic(ceramic: any): void {
      this.ceramic = ceramic;
    },
    setDataBase(database: any): void {
      const { datastore, dataModel, tileLoader } = database
      this.store = datastore;
      this.model = dataModel;
      this.loader = tileLoader;
    },
    setSelfID(selfID: any): void {
      this.selfID = selfID;
    }
  },
});

// Need to be used outside the setup
export function useAppStateWithOut() {
  return useAppState(store);
}
