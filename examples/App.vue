<template>
  <div style="display:flex;height:100%;">
    <ul class="sideBar" style="width:256px">
      <li v-for="item in menus" :key="item.name" @click="open(item.name)">
        {{ item.name }}
      </li>
    </ul>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import route from './router/index.js'
export default {
  name: 'Home',
  components: {},
  setup() {
    const state = reactive({
      openKeys: ['sub1', 'sub2'],
      selectedKeys: [],
      menus: route.options.routes
    })
    const router = useRouter()
    const open = id => {
      router.push({
        name: id
      })
    }
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
  background: #000c17;
  box-shadow: 0 2px 8px rgb(0 0 0 / 45%) inset;
  color: rgba(255, 255, 255, 0.65);
}
.sideBar li {
  height: 30px;
  color: #fff;
}
main {
  flex: 1;
  padding: 20px;
}
</style>
