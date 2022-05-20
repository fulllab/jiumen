<template>
  <a-popconfirm v-if="selectedNodes > 0" placement="rightTop" @confirm="confirm">
    <template #icon></template>
    <template #title>
      <Sketch v-model="selectedColors" />
    </template>
    <a-button type="primary" :style="`background-color: ${color}`" shape="circle" size="small">
      <template #icon>
        <slot></slot>
      </template>
    </a-button>
  </a-popconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Sketch } from '@ckpack/vue-color'
import { useContext } from '@/hooks/GraphContext'
import {modeProps} from './ModeProps'

const props = defineProps(modeProps);
const {mode} = props
const color = ref('#194D33A8')
const selectedColors = ref({
  hex8: '#E04343FF'
})
const selectedNodes = ref(0)
const { graph } = useContext()

const attrkey = mode == 'stroke' ? 'stroke' : 'fill'
const realBodyKey = mode == 'text' ? 'label' : 'body'

graph.on('node:selected', (attrs) => {
  selectedNodes.value += 1
  console.log(attrs);


  if (selectedNodes.value == 1) {
    color.value = (attrs.node.attrs as any)[realBodyKey][attrkey]
  }

})

graph.on('node:unselected', () => {
  selectedNodes.value -= 1
})

const confirm = () => {
  const confirmColor = selectedColors.value.hex8
  const cells = graph.getSelectedCells()
  color.value = confirmColor

  cells.forEach(cell => {
    if (cell.isNode()) {
      cell.setAttrs({
        [realBodyKey]: {
          [attrkey]: confirmColor
        }
      })
    }
  });

}

</script>

<style scoped lang="stylus">
.ant-popover-message-title {
  padding-left: 0 !important

}
</style>
