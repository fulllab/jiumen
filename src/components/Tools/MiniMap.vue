<script lang="tsx">
// @ts-nocheck
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useContext } from '@/hooks/useGraphContext'
import { mergeOption } from '@/utils/tools'

const defaultOptions = {
  enabled: true,
  width: 160,
  height: 120,
  padding: 10,
  scalable: false,
  minScale: 0.01,
  maxScale: 16,
  graphOptions: null,
}

export default defineComponent({
  name: 'MiniMap',
  props: ['enabled', 'width', 'height', 'padding', 'scalable', 'minScale', 'maxScale', 'graphOptions', 'createGraph', 'style'],
  setup(props) {
    const { graph } = useContext()
    const containerRef = ref()
    const clear = () => {
      if (graph.minimap.widget) {
        graph.minimap.widget.dispose()
      }
    }
    const create = () => {
      clear()
      const { enabled, ...otherOptions } = props
      const options = mergeOption(
        graph.options.minimap || {},
        mergeOption(
          {
            ...defaultOptions,
            graphOptions: { background: graph.options.background, grid: graph.options.grid },
          },
          {
            ...otherOptions,
            enabled: enabled !== false,
            container: containerRef.value,
          }
        )
      )
      graph.options.minimap = options
      graph.minimap.widget = graph.hook.createMiniMap()
    }
    watch(() => props, () => create(), {deep: true})
    onMounted(() => create())
    onUnmounted(() => clear())
    return () => {
      const { style = {} } = props
      return <div ref={node => containerRef.value = node} style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        background: 'transparent',
        boxShadow: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
        ...style
      }} />
    }
  }
})
</script>
