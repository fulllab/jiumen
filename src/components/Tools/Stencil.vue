<template>
  <div className="app-stencil" ref="stencilContainer" />
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useContext } from '@/hooks/GraphContext'
import { ShapeBorderColor, GroupBorderColor, ShapebgDarkColor } from '@/settings/graph'
import { useAppState } from '@/store/modules/app'
import { Addon } from '@antv/x6'
import "@antv/x6-vue-shape"

const emit = defineEmits(['openModal'])

const { Stencil } = Addon

const stencilContainer = ref<HTMLDivElement>()

const { graph } = useContext()
const appState = useAppState()

const isReadonlyRef = computed(() => appState.getDocStatu)

onMounted(() => {

  const stencil = new Stencil({
    // title: 'Components',
    target: graph,
    // collapsable: true,
    stencilGraphWidth: 100,
    stencilGraphHeight: 300,
    groups: [
      {
        name: 'shape',
        title: 'Shape',
        collapsable: false,
      },
      {
        name: 'group',
        title: 'Group',
        collapsable: false,
      },
    ],
    layoutOptions: {
      columns: 1,
      center: true,
      columnWidth: 90
    },
    getDropNode(node) {
      const { width, height } = node.size()
      if (node.data && node.data.parent) {
        return node.clone().size(width * 4, height * 3)
      }
      // if (node.data.primer == 'rect') {
      //   return node.clone().size(width * 3, height)
      // }
      return node.clone().size(width * 2, height * 2)
    }
  })
  stencilContainer.value?.appendChild(stencil.container)

  const rectShape = {
    shape: 'rect-shape',
    width: 64,
    height: 35,
    attrs: {
      rect: {
        magnet: true,
        rx: 5,
        ry: 5,
        stroke: ShapeBorderColor,
        strokeWidth: 2
      }
    },
  }

  const rectShapeDark = {
    shape: 'rect-shape',
    width: 64,
    height: 35,
    attrs: {
      rect: {
        magnet: true,
        rx: 5,
        ry: 5,
        stroke: ShapeBorderColor,
        strokeWidth: 2
      },
      body: {
        fill: ShapebgDarkColor,
        stroke: ShapeBorderColor,
        strokeWidth: 1,
      },
      label: {
        fill: '#FFF'
      }
    },
  }

  const ellipseShape = {
    shape: 'ellipse-shape',
    width: 64,
    height: 45,
    attrs: {
      ellipse: {
        magnet: true,
        stroke: ShapeBorderColor,
        strokeWidth: 2
      }
    },
  }

  const groupShape = {
    shape: 'group-shape',
    width: 64,
    height: 64,
    attrs: {
      rect: {
        magnet: true,
        rx: 5,
        ry: 5,
        stroke: GroupBorderColor,
        strokeWidth: 2
      }
    },
  }

  stencil.load([rectShape, rectShapeDark, ellipseShape], 'shape')
  stencil.load([groupShape], 'group')
});

graph.on('cell:mouseenter', (args: { cell: any }) => {
  if (args.cell.isNode()) {
    const currentNode = args.cell
    currentNode.setAttrByPath(`${(currentNode.data ? currentNode.data.primer : false) || currentNode.shape}`, {
      strokeWidth: 8
    })

    if (isReadonlyRef.value) return

    args.cell.addTools([
      {
        name: 'button-remove',
        args: {
          x: '100%',
          y: 0,
          offset: { x: -12, y: 18 },
        },
      },
      {
        name: 'button',
        args: {
          markup: {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              r: 10,
              stroke: '#fe854f',
              'stroke-width': 3,
              fill: 'white',
              cursor: 'pointer',
            },
          },
          x: 0,
          y: '100%',
          offset: { x: 18, y: -25 },
          onClick() {
            emit('openModal', {
              nodeId: args.cell.id,
              label: args.cell.data.label
            })
          },
        },
      },
    ])
  } else {
    args.cell.addTools([
      {
        name: 'button-remove',
        args: { distance: 20 },
      }])
  }
})

graph.on('cell:mouseleave', (args: { cell: any }) => {
  if (args.cell.isNode()) {
    const currentNode = args.cell
    currentNode.setAttrByPath(`${(currentNode.data ? currentNode.data.primer : false) || currentNode.shape}`, {
      strokeWidth: 2
    })
  }
  args.cell.removeTools()
})

graph.on('node:click', (args: { node: any }) => {
  if (!isReadonlyRef.value) return
  emit('openModal', {
    nodeId: args.node.id,
    label: args.node.data.label
  })
})


// const refStencil = (container: HTMLDivElement) => {
//   stencilContainer.value = container
// }

</script>

<style lang="stylus">

.app-stencil {
  width 120px
}
.x6-widget-stencil {
  width 120px
  background: #ffffff !important
}
.x6-widget-stencil-group-content {
  margin auto
}

.x6-widget-dnd {
  overflow hidden
}
</style>
