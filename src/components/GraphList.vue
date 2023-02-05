<template>
  <div class="w-full h-full m-4">
    <a-row class="flex w-full">
      <a-spin v-if="spinning"
        class="z-1 absolute flex items-center justify-center w-full h-full bg-gray-500/50 bg-opacity-40"
        :spinning="spinning"></a-spin>
      <a-col class="p-1 h-20" v-for="graph in graphsRef" :xs="12" :sm="8" :lg="6">
        <a-card :title="graph.name" @click="toGraph(graph.id)" :hoverable="true">
        </a-card>
      </a-col>
      <a-col class="p-1 h-20" :xs="12" :sm="8" :lg="6">
        <a-card class="m-auto text-center" @click="showModal" :hoverable="true">
          <PlusOutlined />
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="addGraph" :confirmLoading="loading">
      <a-input v-model:value="graphName" placeholder="Basic usage" :disabled="loading" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, inject, computed, ref } from 'vue'
import "@antv/x6-vue-shape"
import { useRouter } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'

import { useInitGraphList } from '@/hooks/useGraph'
import { useRootState } from '@/hooks/useApp'
import { ceramicSymbol, appSymbol } from '@/hooks/useGraphContext'
import { useDataBase } from '@/hooks/useCeramic'

import { useUsersState } from '@/store/modules/users'
import { useGraphStore } from '@/store/modules/graph'
import { useWeb3Onboard } from '@/hooks/useCeramic'

const { connectWallet } = useWeb3Onboard()
const router = useRouter()

const graphName = ref<string>('');
const visible = ref<boolean>(false);

const graphsRef = computed(() => {
  return useGraphStore().getGraphs
})

const loading = ref(false)

const { spinning } = inject(appSymbol) as any
const { ceramic } = inject(ceramicSymbol) as any

const initGraphs = async () => {
  await useInitGraphList(ceramic)
}

const showModal = () => {
  const { getAccount } = useUsersState()
  const account = getAccount
  if (!account) {
    connectWallet()
  } else {
    visible.value = true;
  }
};

const addGraph = async (name: string) => {
  loading.value = true
  name = graphName.value || 'untitled'
  const { addGraphToCeramic } = await useDataBase(ceramic)
  await addGraphToCeramic(name)
  visible.value = false
  loading.value = false
}

const toGraph = (id: string) => {
  router.push({
    path: `/graph/${id}`,
  })
}

onMounted(async () => {
  await initGraphs()
});

</script>

<style lang="stylus">
.x6-graph-scroller {
  overflow hidden !important
}

.x6-node.x6-node-immovable {
  cursor: pointer !important;
}

.x6-node.x6-node-immovable:hover {
  filter: brightness(105%);
}

.gra {
  width 100%
  height 100%
}

.color-picker-group {
  position absolute
  margin-left 130px
  margin-top 0.5rem
}
</style>
