<template>
  <div class="nav h-full bg-transparent flex flex-row justify-end items-center">
    <ChangeLanguage />
    <a-button class="m-2" shape="circle" ghost>
      <template #icon>
        <GithubOutlined />
      </template>
    </a-button>
    <a-button v-if="!walletLoaded" type="primary" class="m-2" @click="connect()">
      Connect
    </a-button>
    <a-button v-else type="primary" shape="circle" class="m-2" @click="connect()">
      {{address.slice(0,1)}}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { GithubOutlined } from '@ant-design/icons-vue'
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import { useAddress } from '@/hooks/useAccount'

const { address, walletLoaded, connectToArconnect } = useAddress()

const connect = () => {
  connectToArconnect()
}
</script>

<style scoped lang="stylus">

@import "../style/basic.styl"

.nav {
  position relative
  box-sizing border-box
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
