<template>
<v-app>
  
  <layout-header :menus="menus" :btns="btns" />
  
  <v-main>
    <nuxt />
  </v-main>
  
  <layout-footer />
  
  <message />
  
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'isUser',
  data () {
    return {
      btns: {
        entry: {
          label: 'エントリー',
          path: '/user/entry'
        }
      },
      menus: {
        user: {
          label: '設定',
          path: '/user'
        },
        logout: {
          label: 'ログアウト',
          type: 'logout'
        }
      }
    }
  },
  watch: {
    user: {
      handler: function (user) {
        if (!user) return
        
        if (user.role === 100) {
          this.btns = {
            entry: {
              label: 'エントリー',
              path: '/user/entry'
            }
          }
          return
        }
        
        if (user.role <= 50) {
          this.btns = {
            host: {
              label: '運営',
              path: '/host'
            },
            ...this.btns,
          }
        }
        
        if (user.role === 0) {
          this.menus = {
            admin: {
              label: '管理',
              path: '/admin'
            },
            ...this.menus,
          }
        }
      },
      deep: true
    }
  },
  created () {
    if (!this.user) return
    
    if (this.user.role <= 50) {
      this.btns = {
        host: {
          label: '運営',
          path: '/host'
        },
        ...this.btns,
      }
    }
    
    if (this.user.role === 0) {
      this.menus = {
        admin: {
          label: '管理',
          path: '/admin'
        },
        ...this.menus,
      }
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/loggedUser' }),
  }
}
</script>