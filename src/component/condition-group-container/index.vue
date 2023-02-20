<template>
  <div :style="{ width: localWidth }" class="condition-group-container">
    <template v-for="(item, index) in filterGroups" :key="item.uuid">
      <ConditionGroup
        :ref="'group' + index"
        :title="renderTitleText(index)"
        :data="item.group"
        :disabled="disabled"
        @delete-group="handleDeleteGroup(index)"
      />
      <el-divider v-if="index < filterGroups.length - 1">
        <el-select v-model="localOperate" :disabled="disabled" :size="size" style="width: 80px">
          <el-option :value="item.value" :label="item.label" v-for="(item, index) in ConnectOptions" :key="index" />
        </el-select>
      </el-divider>
    </template>
    <el-button class="add-btn" type="text" @click="handleClickAddGroup">
      <el-icon class="add-icon"><circle-plus-filled /></el-icon>
      添加条件组
    </el-button>
  </div>
</template>

<script lang="ts">
import { ref, provide, getCurrentInstance, defineComponent, watch, Ref } from 'vue'
import { ConditionManager } from '@/core/condition-group-manager'
import { COMPONENT_SIZE, CONDITION_GROUP_TOKENS, FIELDS_TOKENS } from '@/util/tokens'
import { ConnectOptions } from '@/util/default-options'
import { ConnectEnum } from '@/util/operator-enum'
import ConditionGroup from './components/condition-group.vue'
import { getUUID } from '@/util/common'
import { registryCurrentScopeWidget } from '@/util/provide-widget'
import { CommonProps } from '@/component/common-props'
import { ContainerGroup, SubmitHook } from '@/model'

export default defineComponent({
  name: 'condition-group-container',
  components: {
    ConditionGroup
  },
  props: {
    ...CommonProps
  },
  setup(props, context) {
    context.expose({
      getOriginData,
      getFields: () => props.fields
    })

    const instance = getCurrentInstance()
    const manager = ConditionManager.createManager(props.id)
    const filterGroups = ref<ContainerGroup[]>([{ uuid: getUUID() }])
    const localOperate = ref(ConnectEnum.AND) as Ref<ConnectEnum>

    provide(COMPONENT_SIZE, props.size)
    provide(CONDITION_GROUP_TOKENS, manager.id)
    provide(FIELDS_TOKENS, props.fields)

    watch(
      props,
      (newProps) => {
        if (props.widgets && props.widgets?.length !== 0) {
          registryCurrentScopeWidget(manager.id, props.widgets)
        }
        if (newProps.data && newProps.data.group) {
          filterGroups.value = newProps.data.group.map((item) => ({ uuid: getUUID(), group: item }))
          localOperate.value = props.data?.operate as unknown as ConnectEnum.AND
        }
        localOperate.value = props.data?.operate as unknown as ConnectEnum
      },
      { deep: true, immediate: true }
    )

    const handleClickAddGroup = () => filterGroups.value.push({ uuid: getUUID() })
    const handleDeleteGroup = (index: number) => filterGroups.value.splice(index, 1)

    function getOriginData() {
      const group = []
      const refs = instance?.refs || {}
      const names = Object.keys(refs)
      for (const key of names) {
        const target = refs[key] as SubmitHook
        if (target && typeof target.getModel === 'function') {
          group.push(target.getModel())
        }
      }
      return {
        id: props.data?.id,
        operate: localOperate.value,
        group
      }
    }

    return {
      localWidth: props.width,
      filterGroups,
      localOperate,
      ConnectOptions,
      handleDeleteGroup,
      handleClickAddGroup,
      scopeWidgetCount: manager.scopeWidgetCount
    }
  }
})
</script>

<style scoped lang="scss">
.condition-group-container {
  width: 100%;
  .add-btn {
    .add-icon {
      width: 16px;
      vertical-align: middle;
    }
  }
}
</style>
