<template>
  <div class="condition-group">
    <div class="condition-group__inner">
      <div class="condition-title">
        <span>{{ groupTitle }}</span>
        <span class="delete-group" @click="handleRemoveGroup">
          <el-icon class="delete-icon"><close /></el-icon>
        </span>
      </div>
      <condition-item
        :ref="'condition-item__' + idx"
        v-for="(item, idx) in localFilters"
        :show-connect="localFilters.length > 1"
        :key="item.uuid"
        :connect="localConnect"
        :data="item.data || {}"
        :disabled="disabled"
        @on-delete="handleRemoveItem(idx)"
        @change-connect="(val) => handleChangeConnect(val)"
      />
      <el-button type="text" style="margin-left: 6px" @click="handleAddItem">
        <el-icon class="add-icon"><circle-plus-filled /></el-icon>
        添加条件
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, defineComponent, PropType, watch } from 'vue'
import ConditionItem from './condition-item.vue'
import { Group, Model, Obj } from '@/model'
import { ConnectEnum, DisplayModelEnum } from '@/util/operator-enum'
import { getUUID } from '@/util/common'

interface SubmitHook {
  getModel: () => Obj
}

interface Filter {
  uuid: string
  data?: Model
}

export default defineComponent({
  name: 'condition-group',
  components: {
    ConditionItem
  },
  props: {
    title: String,
    data: {
      type: Object as PropType<Group>
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['delete-group', 'input'],
  setup(props, context) {
    context.expose({ getModel })

    const instance = getCurrentInstance()
    const localFilters = ref<Filter[]>([{ uuid: getUUID() }])
    const localConnect = ref<ConnectEnum>(ConnectEnum.AND)

    const handleAddItem = () => {
      const filters = getLocalData() as Model[]
      localFilters.value = filters.map((item) => ({ data: item, uuid: getUUID() }))
      localFilters.value.push({ uuid: getUUID() })
    }
    const handleRemoveItem = (idx: number) => localFilters.value.splice(idx, 1)
    const handleChangeConnect = (val: ConnectEnum) => (localConnect.value = val)
    const handleRemoveGroup = () => context.emit('delete-group')

    watch(
      props,
      (newProps, oldProps) => {
        if (newProps.data && newProps.data !== oldProps?.data && newProps.data.filters) {
          localFilters.value = newProps.data.filters.map((item) => ({ data: item, uuid: getUUID() }))
        }
        if (props.data) localConnect.value = props.data?.operate as ConnectEnum
      },
      { immediate: true, deep: true }
    )

    /**
     * 获取本地数据，重新赋值
     */
    function getLocalData() {
      const filters = []
      const refs = instance?.refs || {}
      const names = Object.keys(refs)
      for (const key of names) {
        const target = refs[key] as SubmitHook
        if (target && typeof target.getModel === 'function') {
          const data = target.getModel()
          filters.push(data)
        }
      }
      return filters
    }
    /**
     * 暴露给父组件获取数据
     */
    function getModel() {
      const filters = []
      const refs = instance?.refs || {}
      const names = Object.keys(refs)
      for (const key of names) {
        const target = refs[key] as SubmitHook
        if (target && typeof target.getModel === 'function') {
          const data = target.getModel()
          // value有值 或者 display属于 NONE 才push
          if (!['', null, undefined, NaN].includes(data.value) || DisplayModelEnum.NONE === data.display) {
            filters.push(data)
          }
        }
      }
      return {
        id: props.data?.id,
        operate: localConnect.value,
        filters
      }
    }

    return {
      groupTitle: props.title,
      handleRemoveItem,
      handleChangeConnect,
      handleAddItem,
      localFilters,
      localConnect,
      handleRemoveGroup
    }
  }
})
</script>
<style scoped lang="scss">
.condition-group {
  &__inner {
    background: #f4f7f9;
    display: inline-block;
    width: 100%;
  }
  .condition-title {
    padding: 10px;
    font-size: 14px;
    color: #909399;
    line-height: 1;
    font-weight: bold;
    border-bottom: 1px solid #ebebec;
    .delete-group {
      float: right;
      // color: var(--el-color-primary);
      font-weight: normal;
      cursor: pointer;
      .delete-icon {
        width: 16px;
        vertical-align: middle;
      }
    }
  }
  .el-button {
    margin-left: 10px;
    .add-icon {
      width: 16px;
      vertical-align: middle;
      // color:#187ddc;
    }
  }
}
</style>
