import { defineStore } from 'pinia';
import { store } from '@/store';


interface UsersState {
  account: any;
  parent: string | null;
}

export const useUsersState = defineStore({
  id: 'users',
  state: (): UsersState => ({
    account: null,
    parent: null,
  }),
  getters: {
    getAccount(): string {
      return this.account;
    },
    getParent(): string | null {
      return this.parent;
    }
  },
  actions: {
    setWalletInfo({
      account,
      parent,
    }: {
      account: any;
      parent: any;
    }): void {
      this.account = account || null;
      this.parent = parent || null;
    },
  },
});

// Need to be used outside the setup
export function useUsersStateWithOut() {
  return useUsersState(store);
}
