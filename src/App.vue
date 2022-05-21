<template>
  <a-config-provider>
    <div id="app">
      <!-- <full-loading></full-loading> -->
      <app-layout />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '@/layout/AppLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
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
