export const state = () => ({
  loggedIn: false,
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.loggedIn = Boolean(user)
  }
}

export const actions = {
  async login ({ commit }, payload) {
    const { user } = await this.$axios.$post("/api/login", payload).catch(e => {})
    
    if (!user) return
    
    commit('setUser', user)
  },
  
  async signup ({ commit }, payload) {
    const { user } = await this.$axios.$post("/api/signup", payload).catch(e => {})
    
    if (!user) return
    
    commit('setUser', user)
  },
  
  async logout ({ commit }) {
    await this.$axios.$get("/api/logout").catch(e => {})
    commit('setUser', null)
    window.location.reload()
  },
  
  async user ({ commit }) {
    const { user } = await this.$axios.$get('/api/user').catch(e => {})
    
    if (!user) return
    
    commit('setUser', user)
  },
  
  commitUser ({ commit }, payload) {
    commit('setUser', payload)
  },
}

export const getters = {
  isAuthenticated: state => {
    return state.loggedIn
  },

  loggedUser: state => {
    return state.user
  }
}