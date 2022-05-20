import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'

import Count from '../coms/Count.vue'

const ShapeComs = {
  COUNT: 'Count',
}

const registerVueComponent = (comNm: string) => {
  Graph.registerVueComponent(
    comNm,
    {
      template: `<${comNm} />`,
      components: {
        Count,
      },
    },
    true,
  )
}

Object.values(ShapeComs).map(comNm => registerVueComponent(comNm))

export class MyShape extends VueShape {}
const portsAttrs = {
  circle: {
    r: 5,
    stroke: '#136fff',
    fill: '#fff',
    magnet: true,
    strokeWidth: 1,
    visibility: 'visible', // hidden  visible
  },
}

MyShape.config({
  attrs: {
    root: {
      magnet: true,
    },
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
  data: {
    primer: 'rect',
  },
  ports: {
    items: [
      {
        id: 'port1',
        group: 'top',
      },
      {
        id: 'port2',
        group: 'left',
      },
      {
        id: 'port3',
        group: 'right',
      },
      {
        id: 'port4',
        group: 'bottom',
      },
    ],
    groups: {
      top: {
        position: 'top',
        attrs: portsAttrs,
      },
      left: {
        position: 'left',
        attrs: portsAttrs,
      },
      right: {
        position: 'right',
        attrs: portsAttrs,
      },
      bottom: {
        position: 'bottom',
        attrs: portsAttrs,
      },
    },
    portMarkup: [
      {
        tagName: 'circle',
        selector: 'portBody',
      },
    ],
  },
  // component: {
  //   template: `< />`,
  //   components: {
  //     ,
  //   },
  // },
})

Graph.registerNode('my-shape', MyShape)
