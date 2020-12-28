export const state = () => ({
  val: {},
  
  message: null
})

export const mutations = {
  setVal (state, payload) {
    state.val = payload
  },
  
  setMessage (state, payload) {
    state.message = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { store }) {
    await store.dispatch('auth/user')
  },
  
  commitVal ({ commit, getters }, payload) {
    let val = {...getters['val']}
    val[payload.key] = payload.val
    commit('setVal', val)
  },
  
  clearVal ({ commit }) {
    commit('setVal', null)
  },
  
  commitMessage ({ commit }, payload) {
    commit('setMessage', payload)
  },
  
  successMessage ({ commit }) {
    commit('setMessage', '成功しました')
  }
}

export const getters = {
  val: state => {
    return state.val
  },

  message: state => {
    return state.message
  }
}


