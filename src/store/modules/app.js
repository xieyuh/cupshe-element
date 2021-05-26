const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 在a模块中调用b模块的内容
  testACallB({ dispatch }) {
    /**
     * url 其他模块的 actions 路径,
     * params
     * 第三个参数是配置选项, 申明这个 acitons 不是当前模块的
     */
    dispatch('userStore/incrementData', {}, { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
