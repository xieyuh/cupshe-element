<template>
  <div style="display:flex;height:100%;">
    <ul class="sideBar" style="width:256px">
      <template v-for="item in menus" :key="item.name">
        <li
          v-if="item.name !== '/'"
          @click="open(item)"
          :class="item.name === activeIndex ? 'active' : ''"
        >
          {{ item.name }}
        </li>
      </template>
    </ul>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
import route from './router/index.js'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Home',
  components: {},
  setup() {
    const state = reactive({
      activeIndex: '',
      menus: route.options.routes
    })
    const router = useRouter()
    const param = useRoute()
    const open = item => {
      state.activeIndex = item.name
      router.push({
        name: item.name
      })
    }
    onMounted(() => {
      const name = param.name || 'Button'
      state.activeIndex = name
    })
    return {
      open,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  text-align: left !important;
}
.sideBar {
  box-shadow: 0 2px 8px rgb(0 0 0 / 45%) inset;
}
.sideBar li {
  height: 30px;
  line-height: 30px;
  padding: 10px;
  &.active {
    color: #1890ff;
    background-color: #e6f7ff;
    border-right: 5px solid;
  }
}
main {
  flex: 1;
  padding: 20px;
}
</style>
