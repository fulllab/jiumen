<template>
  <div class="header">
    <div class="title" @click="router.push('/')">Ourspace & ZeroDAO Strategy</div>
    <div class="go-github" @click="goGitHub">
      <i class="icon el-icon-s-promotion"></i> GitHub
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goGitHub = () => {
  window.open('https://github.com/ZeroDAO/jiumen')
}

</script>

<style scoped lang="stylus">

.header {
  width 100%
  height 100%
  background #fff
  display flex
  justify-content space-between
  align-items center
  padding 0 20px
  box-sizing border-box
  font-weight bold

  .title {
    font-size 20px
    cursor pointer
  }

  .go-github {
    cursor pointer
    font-size 16px

    .icon {
      font-size 20px
    }
  }
}
</style>
