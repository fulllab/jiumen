import { computed, Ref } from 'vue'
import { useAppState } from '@/store/modules/app'

export function useRootState() {
  const appStore = useAppState()
  const getIsReadOnly = computed(() => appStore.getIsReadOnly)
  const getSpinning = computed(() => appStore.getSpinning)

  function setSpinning(spinning: boolean) {
    appStore.setSpinning(spinning)
  }

  return {
    getIsReadOnly,
    getSpinning,
    setSpinning,
  }
}

// Use in x6 components
export const useIsReadOnly = (): Ref<boolean> => {
  return computed(()=>useAppState().getIsReadOnly)
}
