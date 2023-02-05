import { computed, ref, Ref } from 'vue'
import { useAppState } from '@/store/modules/app'
import { useGraphStore } from '@/store/modules/graph'

export function useRootState() {
  const appStore = useAppState()
  const graphStore = useGraphStore()
  const getIsReadOnly = computed(() => appStore.getIsReadOnly)
  const getSpinning = computed(() => appStore.getSpinning)
  const getIsMember = computed(() => appStore.getIsMember)

  const isMemberRef = ref(false)

  // const getControllers = computed(() => graphStore.getControllers)

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
  return computed(() => useAppState().getIsReadOnly)
}
