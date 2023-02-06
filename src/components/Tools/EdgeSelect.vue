<template>
  <a-radio-group v-model:value="edgeShape" button-style="solid">
    <a-radio-button value="Process">Process</a-radio-button>
    <a-radio-button value="Support">Support</a-radio-button>
  </a-radio-group>
</template>

<script lang="ts" setup>
import { edgeShape } from '../../hooks/useGraph'
</script>
