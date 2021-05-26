<template>
  <div class="wrapper">
    <aside>
      <a-menu
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @click="clickMenuItem"
      >
        <template v-for="item in menus" :key="item.name">
          <template v-if="(item.meta && !item.meta.hidden) || !item.meta">
            <sidebar-item
              :menu-info="item"
              :key="item.name"
              v-if="item.children && item.children.length > 0"
            />
            <a-menu-item v-else :key="item.name">
              <PieChartOutlined />
              <span>{{ item.name }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </aside>
  </div>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'

import SidebarItem from './SidebarItem'
import { useRoute, useRouter } from 'vue-router'
import routes from '../../router'
import { PieChartOutlined } from '@ant-design/icons-vue'
export default {
  props: {
    collapsed: {
      type: Boolean
    }
  },
  components: {
    PieChartOutlined,
    SidebarItem
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute()
    const router = useRouter()
    // 获取当前打开的子菜单
    const getOpenKeys = () => {
      return [currentRoute.matched[0] && currentRoute.matched[0].name]
    }

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name],
      menus: routes.options.routes
    })

    //  监听菜单收缩状态
    watch(
      () => state.collapsed,
      newVal => {
        state.openKeys = newVal ? [] : getOpenKeys()
        state.selectedKeys = [currentRoute.name]
      }
    )

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name === 'login' || props.collapsed) return
        state.openKeys = getOpenKeys()
        state.selectedKeys = [currentRoute.name]
      }
    )

    // 点击菜单
    const clickMenuItem = ({ key }) => {
      router.push({ name: key })
    }

    return {
      ...toRefs(state),
      clickMenuItem
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  // width: 256px;
  background: #001529;
  display: flex;
  flex-direction: column;

  aside {
    width: 100%;
    height: 100%;
    flex: 1 1 0%;
    .router-color {
      a {
        color: white;
      }
    }
  }
  .collpased {
    padding: 16px;
    span {
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>
