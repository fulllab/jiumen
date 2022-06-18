import { computed, Ref } from 'vue'
import { useAppState } from '@/store/modules/app'

export function useRootState() {
  const appStore = useAppState()
  const getIsReadOnly = computed(() => appStore.getIsReadOnly)
  const getSpinning = computed(() => appStore.getSpinning)
  const getIsMember = computed(() => appStore.getIsMember)

  function setSpinning(spinning: boolean) {
    appStore.setSpinning(spinning)
  }

  function setIsMember(spinning: boolean) {
    appStore.setIsMember(spinning)
  }

  return {
    getIsReadOnly,
    getSpinning,
    setSpinning,
    setIsMember,
    getIsMember,
  }
}

// Use in x6 components
export const useIsReadOnly = (): Ref<boolean> => {
  return computed(()=>useAppState().getIsReadOnly)
}
