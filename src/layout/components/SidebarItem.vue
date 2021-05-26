<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
    <template v-slot:title>
      <span>
        <PieChartOutlined />
        <span>{{ menuInfo.name }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="(item.meta && !item.meta.hidden) || !item.meta">
        <a-menu-item
          :key="item.name"
          v-if="!item.children || item.children.length === 0"
        >
          <span>{{ item.name }}</span>
        </a-menu-item>

        <sidebar-item v-else :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { PieChartOutlined } from '@ant-design/icons-vue'
export default {
  name: 'SildebarItem',
  components: {
    PieChartOutlined
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {}
}
</script>
