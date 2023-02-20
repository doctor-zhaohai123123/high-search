<template>
  <el-form :label-width="labelWidth" label-position="right" class="high-search-clz">
    <el-form-item v-for="(f, index) in fields" :label="f.name" :key="index + '_' + f.key">
      <ConditionItem
        :ref="`high_${index}`"
        :show-connect="false"
        :data="getDefaultModel(f, data)"
        :show-close="showClose"
        :show-field="showField"
        :disabled="disabled"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, provide, getCurrentInstance, PropType, onMounted } from 'vue'
import ConditionItem from '../condition-group-container/components/condition-item.vue'
import { ConditionManager } from '@/core/condition-group-manager'
import { COMPONENT_SIZE, CONDITION_GROUP_TOKENS, FIELDS_TOKENS } from '@/util/tokens'
import { CommonProps } from '@/component/common-props'
import { Field, Model, Obj } from '@/model'
import { registryCurrentScopeWidget } from '@/util/provide-widget'

export default defineComponent({
  name: 'HighSearch',
  components: {
    ConditionItem
  },
  props: {
    ...CommonProps,
    data: {
      type: Array as PropType<Model[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '90px'
    },
    showField: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    context.expose({ getOriginData })
    const instance = getCurrentInstance()
    const manager = ConditionManager.createManager(props.id)

    provide(COMPONENT_SIZE, props.size)
    provide(CONDITION_GROUP_TOKENS, manager.id)
    provide(FIELDS_TOKENS, props.fields)

    onMounted(() => {
      if (props.widgets && props.widgets?.length !== 0) {
        registryCurrentScopeWidget(manager.id, props.widgets)
      }
    })

    function getDefaultModel(field: Field, data: Model[]) {
      if (!data) return undefined
      return data.find((f) => f.key === field.key) || { key: field.key }
    }

    function getOriginData() {
      const arr: Model[] = []
      const refs = instance?.refs as Obj
      Object.keys(refs).forEach((key) => {
        if (refs && key.startsWith('high_') && refs[key] && refs[key].getModel) {
          const m = refs[key].getModel() as Model
          if (m.operator !== undefined) arr.push(m)
        }
      })
      return arr
    }

    return {
      getDefaultModel
    }
  }
})
</script>

<style lang="scss">
.high-search-clz {
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
  .condition-item {
    padding-top: 0;
    padding-left: 0;
  }
}
</style>
