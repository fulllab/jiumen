<template>
  <div class="absolute right-4 bottom-4">
    <a-button class="m-2" shape="circle" @click="zoom(0.2)" :disabled="plusDisabled" >
      <template #icon>
        <PlusOutlined />
      </template>
    </a-button>
    <a-button class="m-2" shape="circle" @click="zoom(-0.2)" :disabled="minusDisabled">
      <template #icon>
        <MinusOutlined />
      </template>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { useContext } from '@/hooks/useGraphContext'

const { graph } = useContext()

const scalingMin = graph.options.scaling.min || 0.1
const scalingMax = graph.options.scaling.max || 16

const plusDisabled = ref(false)
const minusDisabled = ref(false)

const zoom = (par) => {
  graph.zoom(par)
  const scale = graph.zoom()
  plusDisabled.value = scale >= scalingMax
  minusDisabled.value = scale <= scalingMin
}

</script>
