import { ref, Ref, shallowReactive } from 'vue'
import { Graph, Shape } from '@antv/x6'
import { createContext } from './GraphContext'
import { EdgeShape } from '@/types'

export const createGraph = (containered?: Ref<HTMLElement | undefined>) => {
  const graph = ref<Graph>()
  const contextRef = shallowReactive({
    graph: {},
  })

  createContext(contextRef)

  if (containered) {
    graph.value = new Graph({
      container: containered?.value,
      // @ts-ignore
      width: '100%',
      // @ts-ignore
      height: '100%',
      resizing: {
        enabled: true,
      },
      background: {
        color: '#fffbe6',
      },
      grid: {
        size: 10,
        visible: true,
      },
      snapline: {
        enabled: true,
        sharp: true,
      },
      selecting: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      history: {
        enabled: true,
        ignoreChange: true,
      },
      clipboard: {
        enabled: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      mousewheel: {
        enabled: true,
        global: true,
        modifiers: ['ctrl', 'meta'],
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter(targetNode => {
            const data = targetNode.getData<any>()
            if (data && data.parent) {
              // Exclude nodes itself
              if (targetNode.id != node.id) {
                // put parent node to the back
                targetNode.toBack()
                // put all parent node to the back
                targetNode.getAncestors().map((n)=>{
                  n.toBack()
                })
              }
              const targetBBox = targetNode.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
      highlighting: {
        embedding: {
          name: 'stroke',
          args: {
            attrs: {
              stroke: '#47C769',
            },
          },
        },
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              stroke: '#47C769',
            },
          },
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              stroke: '#47C769',
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: true,
        allowMulti: true,
        highlight: true,
        sourceAnchor: {
          name: 'center',
        },
        targetAnchor: 'center',
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'manhattan',
        },

        // router: 'manhattan',
        // connector: {
        //   name: 'rounded',
        //   args: {
        //     radius: 8
        //   }
        // },
        // anchor: 'top',
        // sourceAnchor: 'bottom',
        // connectionPoint: 'anchor',
        // sourceConnectionPoint: 'anchor',
        // allowBlank: false,
        // snap: {
        //   radius: 20
        // },
        validateMagnet({ magnet, cell }) {
          console.log(magnet);

          // console.log('magnet', e, magnet, view, cell);
          // if (magnet.getAttribute('port-group') === 'in') {
          //   return false
          // }
          return true
        },
        createEdge() {
          let edgeLineOp = {
            stroke: '#333333',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 7,
            },
          }
          if (edgeShape.value == 'Process') {
            edgeLineOp.stroke = '#4E81BDF0'
            edgeLineOp.strokeWidth = 4
          } else if(edgeShape.value == 'Support') {
            edgeLineOp.stroke = '#6EA87BE0'
            edgeLineOp.strokeWidth = 2
          }
          return new Shape.Edge({
            attrs: {
              line: edgeLineOp,
            },
          })
        },
        // validateConnection({
        //   sourceMagnet,
        //   targetMagnet,
        //   sourceCell,
        //   targetCell,
        // }: any) {
        //   return true
        // },
        // validateEdge({ edge }) {
        //   const { source, target } = edge

        //   return true
        // },
      },
    })
    contextRef.graph = graph.value
  }
  return graph
}

export const edgeShape = ref<EdgeShape>('Process')

export default {
  createGraph,
  Graph,
  edgeShape,
}
