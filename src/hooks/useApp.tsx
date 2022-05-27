import { computed, Ref } from 'vue'
import { useAppState } from '@/store/modules/app'

export const useIsReadOnly = (): Ref<boolean> => {
  // it can't use ref , and you can use provide
  return computed(()=>useAppState().getIsReadOnly)
}

export default {
  useIsReadOnly,
}
