<template>
  <a-config-provider>
    <div id="app">
      <!-- <full-loading></full-loading> -->
      <app-layout />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, shallowReactive } from 'vue'
import AppLayout from '@/layout/AppLayout.vue'
import { appSymbol } from '@/hooks/GraphContext'
import { useRootState } from '@/hooks/useApp'

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  },
  setup() {
    const { getIsReadOnly, getSpinning } = useRootState()
    const appContext = shallowReactive({
      isReadOnly: getIsReadOnly,
      spinning: getSpinning,
    })
    provide(appSymbol, appContext)
  }
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
