<template>
  <button></button>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'CButton',
  setup() {
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped></style>
