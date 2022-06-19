<template>
  <a-layout-header class="flex justify-between flex-shrink-0 p-1">
    <div class="flex items-center">
      <img class="h-full" src="../assets/logo-ui-w-s.svg" />
      <span class="<sm:hidden m-1 text-xl primary" style="color: #b8bdd3;">Ourspace & ZeroDAO Strategy</span>
    </div>
    <Nav />
  </a-layout-header>
</template>

<script lang="ts" setup>
import Nav from './Nav.vue'
</script>
