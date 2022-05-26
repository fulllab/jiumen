<template>
  <div class="flex items-center w-full p-1 text-base text-center" :style="styleObject" @dblclick="edit">
    <Input class="text-center" v-if="isEditStatus" v-model:value="text" :placeholder="text" @blur="blur" />
    <p class="w-full" v-else>{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, computed} from 'vue'
import { Input } from 'ant-design-vue'
import { useAppState } from '@/store/modules/app'

const node = inject('getNode', () => { })() as any
const appState = useAppState()
const isEditStatus = ref(false)
const text = ref('')
const styleObject = ref({
  color: node.getAttrByPath('label/fill')
})

const isReadonlyRef = computed(()=>appState.getDocStatu)

const blur = () => {
  node.data.label =  text.value
  isEditStatus.value = false
}

const edit = () => {
  isEditStatus.value = !isReadonlyRef.value
}

onMounted(() => {
  text.value = node.data.label || ''

  node.on('changed', (data) => {
    const { options } = data
    if (options && options.propertyPath == 'attrs/label/fill') {
      styleObject.value = {
        color: options.propertyValue
      }
    }
  })
});
</script>
