import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'

import Count from '../coms/Count.vue'
import TextInput from '../coms/TextInput.vue'
import GroupCom from '../coms/GroupCom.vue'
import RectCom from '../coms/RectCom.vue'
import { ShapeBorderColor, GroupBorderColor, GroupbgColor, ShapebgColor } from '@/settings/graph'

const ShapeComs = {
  COUNT: 'Count',
  TEXT_INPUT: 'TextInput',
  GROUP_COM: 'GroupCom',
  RECT_COM: 'RectCom',
}

const registerVueComponent = (comNm: string) => {
  Graph.registerVueComponent(
    comNm,
    {
      template: `<${comNm} />`,
      components: {
        Count,
        TextInput,
        GroupCom,
        RectCom,
      },
    },
    true,
  )
}

Object.values(ShapeComs).map(comNm => registerVueComponent(comNm))

export class MyShape extends VueShape {}
export class GroupShape extends VueShape {}

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
      fill: ShapebgColor,
      stroke: ShapeBorderColor,
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
        group: 'bottom',
      },
    ],
    groups: {
      top: {
        position: 'top',
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
  component: {
    template: `<rect-com />`,
    components: {
      RectCom,
    },
  },
})

GroupShape.config({
  attrs: {
    root: {
      magnet: true,
    },
    body: {
      fill: GroupbgColor,
      stroke: GroupBorderColor,
      strokeWidth: 1,
    },
  },
  data: {
    primer: 'rect',
    parent: true
  },
  ports: {
    items: [
      {
        id: 'port1',
        group: 'top',
      },
      {
        id: 'port2',
        group: 'bottom',
      },
    ],
    groups: {
      top: {
        position: 'top',
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
  component: {
    template: `<group-com />`,
    components: {
      GroupCom,
    },
  },
})

Graph.registerNode('my-shape', MyShape)
Graph.registerNode('group-shape', GroupShape)
