<template>
  <a-form class="max-w-screen-lg m-auto" :model="formState" @finish="commit" @finishFailed="onFailed">
    <a-form-item label="Status">
      <a-radio-group v-model:value="formState.node.status">
        <a-radio v-for="(status, index) in ProjectStatus" :value="index">{{ status }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Progress" :rules="[{ type: 'number', min: 0, max: 99 }]">
      <a-slider class="max-w-md" v-model:value="formState.node.progress" />
    </a-form-item>
    <a-form-item label="Priority">
      <a-rate v-model:value="formState.node.priority" :disabled="false" />
    </a-form-item>
    <a-form-item label="Introduction">
      <a-textarea v-model:value="formState.node.introduction" />
    </a-form-item>
    <a-form-item label="Description">
      <MarkDown @update:value="saveMarkDown" :value="formState.node.description" />
    </a-form-item>
    <a-space v-for="(resource, index) in formState.node.resources" :key="resource.id"
      style="display: flex; margin-bottom: 8px" align="baseline">
      <a-form-item label="Title" :rules="{
        required: true,
        message: 'Missing Title',
      }">
        <a-input v-model:value="resource.title" placeholder="Description of resources" />
      </a-form-item>
      <a-form-item label="Uri" :name="['node','resources',index,'uri']" :rules="{
        required: true,
        message: 'Missing Uri',
      }">
        <a-input v-model:value="resource.uri" placeholder="http" />
      </a-form-item>
      <MinusCircleOutlined @click="removeResource(resource)" />
    </a-space>
    <a-form-item class="mt-4">
      <a-button type="dashed" block @click="addResource">
        <PlusOutlined />
        Add resource
      </a-button>
    </a-form-item>
    <a-form-item class="mb-4 text-right">
      <a-button type="primary" html-type="submit">Save</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { DocContent, Resource } from '@/types'
import { ProjectStatus, docContentDefault } from '@/settings/graph'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useWokingDoc, useAdd, useCommit } from '@/hooks/useDocs'
import { MarkDown } from './Markdown'

const props = defineProps({
  nodeId: { type: String, default: '' },
});

const nodeIdRef = ref()

interface formStateType {
  node: DocContent
}

const formState = reactive<formStateType>({
  node: docContentDefault
});

const initDoc = (id: string) => {
  nodeIdRef.value = id
  formState.node = useWokingDoc(id) || docContentDefault
}

const removeResource = (item: Resource) => {
  let index = formState.node.resources.indexOf(item);
  if (index !== -1) {
    // @ts-ignore
    formState.node.resources?.splice(index, 1);
  }
};

const addResource = () => {
  formState.node.resources
  formState.node.resources.push({
    title: '',
    uri: '',
    id: Date.now(),
  });
  console.log(formState.node.resources);
};

const saveMarkDown = (v) => {
  formState.node.description = v
  add()
}

const add = () => {
  useAdd(nodeIdRef.value, formState.node)
}

const commit = (values) => {
  console.log('Success:', values);
  useCommit(nodeIdRef.value, formState.node)
}

const onFailed = (e) => {
  console.log('Fail', e);
}

defineExpose({
  initDoc
})

onMounted(() => {
  initDoc(props.nodeId)
});

</script>


<style lang="stylus">
.ant-form-item-label > label {
  min-width 120px
  font-weight: bold
  font-size: large
  color: rgb(96 96 96 / 85%)
}
</style>
