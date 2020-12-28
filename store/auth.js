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
    const res = await this.$axios.$post("/api/login", payload).catch(e => {})
    const data = (res && res.data)? res.data : null
    
    if (!data) return
    
    commit('setUser', data)
  },
  
  async signup ({ commit }, payload) {
    const res = await this.$axios.$post("/api/signup", payload).catch(e => {})
    const data = (res && res.data)? res.data : null
    
    if (!data) return
    
    commit('setUser', data)
  },
  
  async logout ({ commit }) {
    await this.$axios.$get("/api/logout").catch(e => {})
    commit('setUser', null)
    
    if (window.$nuxt.$route.path === '/') return window.location.reload()
    
    this.$router.push('/')
  },
  
  async user ({ commit }) {
    const res = await this.$axios.$get('/api/user').catch(e => {})
    const data = (res && res.data)? res.data : null
    
    if (!data) return
    
    commit('setUser', data)
  },
  
  commitUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

export const getters = {
  isAuthenticated: state => {
    return state.loggedIn
  },

  loggedUser: state => {
    return state.user
  }
}