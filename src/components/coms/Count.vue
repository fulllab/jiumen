<template>
  <div class="flex w-full h-full">
    <p>num</p>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { Button } from 'ant-design-vue';

const node = inject('getNode', () => { })() as any

const num = ref(0)

const add = () => {
  num.value += 1
  const nodeNum = node.setData({
    num: num.value
  });
}
</script>



