<template>
  <el-input v-bind="componentProps">
    <template v-if="componentProps.prefixText" v-slot:prefix>{{ componentProps.prefixText }}</template>
    <template v-if="componentProps.suffixText" v-slot:suffix>{{ componentProps.suffixText }}</template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'widget-input',
  props: {
    componentProps: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
