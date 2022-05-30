import { computed, Ref } from 'vue'
import { useDocsStore } from '@/store/modules/docs'
import { useGraphStore } from '@/store/modules/graph'
import { useContext } from '@/hooks/GraphContext'
import contract from '@/api/arweave'

export const initState = () => {
  contract
    .readState()
    .then(state => {
      const graphStore = useGraphStore()
      const docsStore = useDocsStore()

      docsStore.setRemoteDocs(state.docs)
      graphStore.setRemoteGraph(state.graph)
    })
    .catch()
}

export const diffData = () => {

  const { graph } = useContext()
  let diffGraph = graph.toJSON({diff: true})
  console.log(diffGraph);
  const graphStore = useGraphStore()
  const remoteGrap = graphStore.getRemoteGraph
}

export default {
  initState,
}
