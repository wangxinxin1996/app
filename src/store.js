import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  SET_ENTERPRISEREGION: 'SET_ENTERPRISEREGION'
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {},   // 存储用户信息
  enterpriseRegion: []    //管理员获取当前管理企业
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  enterpriseRegion: state => state.enterpriseRegion
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  [types.SET_ENTERPRISEREGION](state, enterpriseRegion) {
    if (enterpriseRegion)
      state.enterpriseRegion = enterpriseRegion
    else
      state.enterpriseRegion = [];
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setEnterpriseRegion: ({ commit }, enterpriseRegion) => {
    commit(types.SET_ENTERPRISEREGION, enterpriseRegion)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
    commit(types.SET_ENTERPRISEREGION, null)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
