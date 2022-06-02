import { defineStore } from 'pinia';
import { store } from '@/store';

interface AppState {
  spinning: boolean;
  writable: boolean;
  readOnly: boolean;
  atWork: boolean;
}

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: true,
    writable: false,
    readOnly: true,
    atWork: false,
  }),
  getters: {
    isWritable(): boolean {
      return this.writable
    },
    getIsReadOnly(): boolean {
      return this.readOnly
    },
    getSpinning(): boolean {
      return this.spinning;
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
    setSpinning(spinning: boolean): void {
      this.spinning = spinning;
    },
    setAtWork(atWork: boolean): void {
      this.atWork = atWork;
    },
  },
});

// Need to be used outside the setup
export function useAppStateWithOut() {
  return useAppState(store);
}
