<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img src="~assets/img/logo2.png" width="40" height="40" alt="" />
        <h2 v-show="!collapsed" class="title">Cupshe</h2>
      </div>
      <sidebar :collapsed="collapsed" />
      <template #trigger>
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout">
        <navbar :collapsed="collapsed"> </navbar>
      </a-layout-header>
      <a-layout-content>
        <main>
          <router-view></router-view>
        </main>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { ref, computed } from 'vue'
export default {
  components: {
    Navbar,
    Sidebar,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },

  setup() {
    const collapsed = ref(false)
    const asiderWidth = computed(() => (collapsed.value ? '80px' : '256px'))
    return {
      collapsed,
      asiderWidth
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: rgb(255, 255, 255);
  min-height: 88.5vh;
  text-align: left;
}
.layout {
  background: #fff;
  padding: 0 16px;
}
.logo {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2.title {
    color: #fff;
    margin-bottom: 0;
    padding-left: 8px;
  }
}
</style>
