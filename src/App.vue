<template>
  <a-config-provider :locale="getAntLocale">
    <div id="app">
      <app-layout />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, shallowReactive } from 'vue'
import AppLayout from './layout/AppLayout.vue'
import { appSymbol } from './hooks/useGraphContext'
import { useRootState } from './hooks/useApp'
import { useLocale } from './locales/useLocales'
import { useWeb3Onboard } from './hooks/useCeramic'
import { getIsMember } from './hooks/useGraph'
export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  },
  setup() {
    const { getAntLocale } = useLocale()
    const { getIsReadOnly, getSpinning } = useRootState()
    const isMember = getIsMember()
    const { initCeramic } = useWeb3Onboard()
    initCeramic()

    const appContext = shallowReactive({
      isReadOnly: getIsReadOnly,
      spinning: getSpinning,
      isMember: isMember,
    })
    provide(appSymbol, appContext)
    return {
      getAntLocale,
    }
  },
  created() {
    document.body.removeChild(document.getElementById('Loading') as any)
  },
})
</script>

<style lang="stylus">
#app {
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  box-sizing border-box
  position relative
  width 100%
  height 100%
}
</style>
