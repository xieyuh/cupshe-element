<template>
  <iframe
    :class="showIndex === 1 ? 'showAll container' : 'container'"
    src="https://datav.aliyuncs.com/share/48eeddaf22bc699ea11fd364947c0ab5"
    frameborder="0"
  ></iframe>
  <iframe
    :class="showIndex === 2 ? 'showAll2 container' : 'container'"
    src="https://datav.aliyuncs.com/share/2886c7d533487c65acbf7a8d7a79fd0c"
    frameborder="0"
  ></iframe>
  <iframe
    :class="showIndex === 3 ? 'showAll3 container' : 'container'"
    src="https://datav.aliyuncs.com/share/5cbccfff0b653f955ef5b01b7b9cfddb"
    frameborder="0"
  ></iframe>
  <iframe
    :class="showIndex === 4 ? 'showAll4 container' : 'container'"
    src="https://datav.aliyuncs.com/share/45f265f19d8c9d34a586a511377ca629"
    frameborder="0"
  ></iframe>
  <div class="big big01" @click="() => showFrame(1)"></div>
  <div class="big big02" @click="() => showFrame(2)"></div>
  <div class="big big03" @click="() => showFrame(3)"></div>
  <div class="big big04" @click="() => showFrame(4)"></div>
  <div class="small" @click="() => showFrame(0)" v-if="showIndex != 0"></div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      showIndex: 0,
      showFrame: showIndex => {
        state.showIndex =
          showIndex === state.showIndex || showIndex === 0 ? 0 : showIndex
      }
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 50vw;
  height: 50vh;
  cursor: pointer;
}

.showAll {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  transition: all 0.5s;
}

.showAll2 {
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  transition: all 0.5s;
}

.showAll3 {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  transition: all 0.5s;
}

.showAll4 {
  width: 100vw;
  height: 100vh;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 10;
  transition: all 0.5s;
}

.big {
  width: 30px;
  height: 30px;
  background: url('~assets/img/big.png') center center/cover no-repeat;
  position: fixed;
  left: calc(50vw - 50px);
  top: calc(50vh - 50px);
  opacity: 0.4;
  cursor: pointer;
}

.small {
  width: 50px;
  height: 50px;
  background: url('~assets/img/small.png') center center/cover no-repeat;
  position: fixed;
  left: calc(100vw - 100px);
  top: calc(100vh - 100px);
  opacity: 0.4;
  cursor: pointer;
  z-index: 11;
}

.big02 {
  left: calc(100vw - 50px);
  top: calc(50vh - 50px);
}

.big03 {
  left: calc(50vw - 50px);
  top: calc(100vh - 50px);
}

.big04 {
  left: calc(100vw - 50px);
  top: calc(100vh - 50px);
}
</style>
