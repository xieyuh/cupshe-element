<template>
  <div class="layout-header">
    <div class="inner-header">
      <div class="left-options">
        <a-breadcrumb>
          <template v-for="routeItem in route.matched" :key="routeItem.name">
            <a-breadcrumb-item>
              <router-link :to="{ name: routeItem.name }">{{
                routeItem.name
              }}</router-link>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
      </div>
      <div class="right-options">欢迎 {{ username }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Header',
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const state = reactive({
      username: 'Cupshe'
    })

    const route = useRoute()

    return {
      ...toRefs(state),
      route
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .inner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 2;
  }
  .left-options {
    display: flex;
    align-items: center;
    .menu-fold {
      padding: 0 24px;
      cursor: pointer;
    }
  }

  .right-options {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
