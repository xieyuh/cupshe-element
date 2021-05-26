<template>
  <main>
    <router-view></router-view>
  </main>
</template>
<script>
import { ref, computed } from 'vue'
export default {
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
