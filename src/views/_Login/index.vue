<template>
  请登录 {{ state.title }}
  <p />
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      title: 'Login'
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped></style>
