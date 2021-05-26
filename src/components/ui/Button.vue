<template>
  <button>button</button>
</template>
<script>
import { reactive, toRefs, ref } from 'vue'
export default {
  setup() {
    const num = ref(0)
    const state = reactive({})
    return {
      num,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped></style>
