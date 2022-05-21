import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'
import Count from '../coms/Count.vue'
import TextInput from '../coms/TextInput.vue'
import GroupCom from '../coms/GroupCom.vue'
import GeneralCom from '../coms/GeneralCom.vue'
import {
  ShapeBorderColor,
  GroupBorderColor,
  GroupbgColor,
  ShapebgColor,
} from '@/settings/graph'

const ShapeComs = {
  COUNT: 'Count',
  TEXT_INPUT: 'TextInput',
  GROUP_COM: 'GroupCom',
  GENERAL_COM: 'GeneralCom',
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
        GeneralCom,
      },
    },
    true,
  )
}

Object.values(ShapeComs).map(comNm => registerVueComponent(comNm))

export class RectShape extends VueShape {}
export class GroupShape extends VueShape {}
export class EllipseShape extends VueShape {}

const portsAttrs = {
  circle: {
    r: 3,
    stroke: ShapeBorderColor,
    fill: ShapebgColor,
    magnet: true,
    strokeWidth: 1,
    visibility: 'visible', // hidden  visible
  },
}

RectShape.config({
  primer: "rect",
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
    primer: "rect",
  },
  ports: {
    items: [
      {
        id: 'port1',
        group: 'left',
      },
      {
        id: 'port2',
        group: 'right',
      },
    ],
    groups: {
      left: {
        position: 'left',
        attrs: portsAttrs,
      },
      right: {
        position: 'right',
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
    template: `<general-com />`,
    components: {
      GeneralCom,
    },
  },
})

EllipseShape.config({
  primer: "ellipse",
  attrs: {
    body: {
      magnet: true,
      fill: ShapebgColor,
      stroke: ShapeBorderColor,
      strokeWidth: 2,
    },
  },
  data: {
    primer: "ellipse",
  },
  ports: {
    items: [
      {
        id: 'port1',
        group: 'ellipse',
      },
      {
        id: 'port2',
        group: 'ellipse',
      },
      {
        id: 'port3',
        group: 'ellipse',
      },
      {
        id: 'port4',
        group: 'ellipse',
      },
    ],
    groups: {
      ellipse: {
        position: 'ellipseSpread',
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
    template: `<general-com />`,
    components: {
      GeneralCom,
    },
  },
})

GroupShape.config({
  primer: 'rect',
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
    primer: "rect",
    parent: true,
  },
  ports: {
    items: [
      {
        id: 'port1',
        group: 'left',
      },
      {
        id: 'port2',
        group: 'right',
      },
    ],
    groups: {
      left: {
        position: 'left',
        attrs: portsAttrs,
      },
      right: {
        position: 'right',
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

Graph.registerNode('rect-shape', RectShape)
Graph.registerNode('group-shape', GroupShape)
Graph.registerNode('ellipse-shape', EllipseShape)

