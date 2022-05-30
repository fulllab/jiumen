import { computed, Ref } from 'vue'
import { useAppState } from '@/store/modules/app'
import contract from '@/api/arweave'

export const initState = async () => {
  console.log(contract);

  // const state = await contract.readState();
  // console.log(state);
}

export default {
  initState,
}
