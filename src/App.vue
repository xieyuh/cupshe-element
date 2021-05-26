<template>
  <toB-layout v-if="isTOB"></toB-layout>
  <main v-else><router-view></router-view></main>
</template>

<script>
import { computed, defineComponent } from 'vue'
// 获取路由对象
import { useRoute } from 'vue-router'

// 获取axios中的对象
import toBLayout from './layout/toB.vue'
export default defineComponent({
  name: 'App',
  components: {
    'toB-layout': toBLayout
  },
  setup() {
    const route = useRoute()
    const env = process.env.NODE_ENV
    // 配置默认布局
    const USE_DEFAULT_LAYOUT = ['Login', '404']
    // 获取不同页面的布局
    const isTOB = computed(() => {
      if (USE_DEFAULT_LAYOUT.includes(route.name) || env === 'production') {
        return false
      }
      return true
    })
    return {
      isTOB
    }
  }
})
</script>
