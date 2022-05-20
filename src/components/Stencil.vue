<template>
  <div className="app-stencil" ref="stencilContainer" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useContext } from '@/hooks/GraphContext'
import Count from "@/components/coms/Count.vue";
import { Addon, Shape } from '@antv/x6'
import "@antv/x6-vue-shape"

const { Stencil } = Addon
const { Rect, Circle } = Shape

const stencilContainer = ref<HTMLDivElement>()

const { graph } = useContext()

onMounted(() => {

  const stencil = new Stencil({
    // title: 'Components',
    target: graph,
    // collapsable: true,
    stencilGraphWidth: 100,
    stencilGraphHeight: 300,
    groups: [
      {
        name: 'group1',
        title: 'Group(Collapsable)',
      },
      {
        name: 'group2',
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
        return node.clone().size(width * 3, height * 2)
      }
      return node.clone()
    }
  })
  stencilContainer.value?.appendChild(stencil.container)

  const rectShape = {
    shape: 'my-shape',
    width: 64,
    height: 64,
    attrs: {
      rect: {
        magnet: true,
        stroke: "#333333",
        strokeWidth: 4
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
        stroke: "#333333",
        strokeWidth: 4
      }
    },
  }

  stencil.load([rectShape, rectShape], 'group1')
  stencil.load([groupShape], 'group2')
});

graph.on('cell:mouseenter', (args: { cell: any }) => {
  if (args.cell.isNode()) {
    const currentNode = args.cell
    currentNode.setAttrByPath(`${currentNode.data.primer || currentNode.shape}`, {
      strokeWidth: 8
    })

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
          onClick({ view }) {
            console.log('111111');

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
    currentNode.setAttrByPath(`${currentNode.data.primer || currentNode.shape}`, {
      strokeWidth: 2
    })
  }
  args.cell.removeTools()
})

// const refStencil = (container: HTMLDivElement) => {
//   stencilContainer.value = container
// }

</script>

<style lang="stylus">

.app-stencil {
  width: 120px
}
.x6-widget-stencil {
  width: 120px
}
.x6-widget-stencil-group-content {
  margin auto
}

.x6-widget-dnd {
  overflow hidden
}
</style>
