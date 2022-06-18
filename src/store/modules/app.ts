import { defineStore } from 'pinia';
import { store } from '@/store';

interface AppState {
  spinning: boolean;
  readOnly: boolean;
  atWork: boolean;
  members: string[];
  isMember: boolean;
}

export const useAppState = defineStore({
  id: 'app',
  state: (): AppState => ({
    spinning: true,
    readOnly: true,
    atWork: false,
    members: [],
    isMember: false,
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
  },
});

// Need to be used outside the setup
export function useAppStateWithOut() {
  return useAppState(store);
}
