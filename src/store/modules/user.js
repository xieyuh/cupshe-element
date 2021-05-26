export default {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    increment(state, componentData) {
      // 变更状态
      state.count = state.count + componentData
    }
  },
  actions: {
    // actions一般是处理异步逻辑
    incrementData(context) {
      context.commit('increment', 10)
    }
  }
}
