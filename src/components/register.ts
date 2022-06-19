import { Graph } from '@antv/x6'
import { VueShape } from '@antv/x6-vue-shape'
import TextInput from './Coms/TextInput.vue'
import GroupCom from './Coms/GroupCom.vue'
import GeneralCom from './Coms/GeneralCom.vue'
import {
  ShapeBorderColor,
  GroupBorderColor,
  GroupbgColor,
  ShapebgColor,
} from '@/settings/graph'

const ShapeComs = {
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

