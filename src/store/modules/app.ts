import { defineStore } from 'pinia';
import { store } from '@/store';

interface AppState {
  pageLoading: boolean;
  writable: boolean;
  readOnly: boolean;
  atWork: boolean;
}

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: true,
    writable: false,
    readOnly: true,
    atWork: false,
    // projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    // beforeMiniInfo: {},
  }),
  getters: {
    isWritable(): boolean {
      return this.writable
    },
    getIsReadOnly(): boolean {
      return this.readOnly
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getAtWork(): boolean {
      return this.atWork;
    }
  },
  actions: {
    setWritable(writable: boolean): void {
      this.writable = writable
    },
    setIsReadOnly(status: boolean): void {
      this.readOnly = status
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setAtWork(loading: boolean): void {
      this.atWork = loading;
    },
  },
});

// Need to be used outside the setup
export function useAppStateWithOut() {
  return useAppState(store);
}
