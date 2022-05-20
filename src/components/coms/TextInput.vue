<template>
  <div class="flex items-center w-full h-full p-4 text-base text-center" @dblclick="edit">
    <Input class="text-center" v-if="isEditStatus" v-model:value="text" :placeholder="text" @blur="blur" />
    <p class="w-full" v-else>{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Input } from 'ant-design-vue';

const isEditStatus = ref(false)

const text = ref('test')

const blur = () => {
  isEditStatus.value = false
}

const edit = () => {
  isEditStatus.value = true
}
</script>
