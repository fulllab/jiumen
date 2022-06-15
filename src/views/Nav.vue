<template>
  <aside class="nav">
    <a-button type="link" class="nav-item flex-center" v-for="(nav, index) in navList" :key="index"
      :class="{ active: nav.isActive }" @click="navClick(nav)">
      {{ nav.name }}
    </a-button>
    <a-button type="link" class="nav-item flex-center" @click="connect()">
      Connect
    </a-button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NavItem } from '@/types'
import { useAddress } from '@/hooks/useAccount'

export default defineComponent({
  name: 'Nav',

  setup() {
    const router = useRouter()

    const { address, walletLoaded, connectToArconnect } = useAddress()

    const reactiveData = reactive({
      navList: [
        {
          name: 'Home',
          isActive: false,
          path: '/',
        },
        {
          name: 'Test',
          isActive: false,
          path: '/test',
        },
        {
          name: 'Dag',
          isActive: false,
          path: '/dag',
        },
      ],

      navClick(e: NavItem) {
        router.push(e.path)
      },
    })

    const connect = () => {
      connectToArconnect()
    }

    const changeNavActive = (currentPath: string) => {
      reactiveData.navList.forEach((v: NavItem) => {
        const temp = v
        temp.isActive = temp.path === currentPath
        return temp
      })
    }

    watch(
      () => router.currentRoute.value,
      _n => {
        changeNavActive(_n.path)
      },
    )

    onMounted(() => {
      router.isReady().then(() => {
        changeNavActive(router.currentRoute.value.path)
      })
    })

    return {
      ...toRefs(reactiveData),
      connect
    }
  },
})
</script>

<style scoped lang="stylus">

@import "../style/basic.styl"

.nav {
  position relative
  width 100%
  height 100%
  box-sizing border-box
  background: #fff
  display: flex

    .nav-item {
      box-sizing border-box
      height 60px
      cursor pointer

      &.active {
        font-weight bold
        background $second-background-color
      }

    }

}
</style>
