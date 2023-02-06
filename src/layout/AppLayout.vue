<template>
  <div class="app-layout">
    <a-layout>
      <app-header />
      <a-layout-content class="relative">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import AppHeader from './Header.vue'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jobFlush } from '../hooks/useScheduler'

export default defineComponent({
  components: {
    // AppFooter,
    AppHeader,
    // AccountSelector,
    // ChangeLanguage
  },
  setup() {
    const fullScreenMode = ref(true)
    const router = useRouter()
    const selectedKeys = ref<string[]>(['1'])
    const isSollapsed = ref(false)
    const isBroken = ref(false)

    onMounted(() => {
      jobFlush()
    })

    return {
      fullScreenMode,
      selectedKeys,
      isSollapsed,
      isBroken
    }
  }
})
</script>

<style lang="less">
.logo {
  width: 220px;
  margin: 10px;
}

.app-layout {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.sider-btm {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding: 5px;

  a {
    margin-right: 5px;
  }
}

.content-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #071f36;
  opacity: 0.8;
  filter: alpha(opacity=85);
  transition: opacity 0.3s linear, height 0s ease 0.3s;
}

.ant-layout {
  height: 100%;
}

.ant-layout-sider {
  height: 100%;
}

.ant-layout-sider-zero-width-trigger {
  top: 10px !important;
}

.ant-layout-sider-children {
  overflow: auto;
  height: 100vh;
  position: fixed;
  width: 300px;
  left: 0;
  background: #001529;

  .ant-menu {
    li {
      padding: 38px;

      .anticon {
        font-size: 26px;
        margin-right: 10px;
      }

      .ant-menu-title-content {
        display: flex !important;
        justify-content: flex-start;
        align-items: center;
      }

      a {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .ant-menu-item-selected {
      background-color: #03178f !important;
      border-right: 5px solid #0025ff !important;
    }
  }
}

.ant-layout-sider-collapsed {
  .ant-layout-sider-children {
    width: 0;
  }
}

.ant-layout-sider-below {
  position: absolute !important;
  z-index: 100;
}

.app-content {
  position: relative;
  padding: 0;
  margin: 0;
}

.router-view {
  margin: 0;
  padding: 0;
}

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
