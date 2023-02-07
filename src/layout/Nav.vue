<template>
  <div class="nav h-full bg-transparent flex flex-row justify-end items-center">
    <ChangeLanguage />
    <!-- <a-button class="m-2" shape="circle" ghost>
      <template #icon>
        <GithubOutlined />
      </template>
    </a-button> -->
    <a-button v-if="!accountRef" type="primary" class="m-2" @click="connect()">
      Connect
    </a-button>
    <a-button v-else type="primary" class="m-2">
      {{ accountRef }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
// import { GithubOutlined } from '@ant-design/icons-vue'
import ChangeLanguage from '../components/ChangeLanguage.vue'
import { useWeb3Onboard } from '../hooks/useCeramic'
import { useUsersState } from '../store/modules/users'

const { connectWallet } = useWeb3Onboard()

const usersState = useUsersState()

const accountRef = computed(() => {
  if (!usersState.account) return null
  const address = usersState.account.address
  return `${address.slice(0, 5)}...${address.slice(-5)}`
})
const connect = () => {
  connectWallet()
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
