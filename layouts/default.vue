<template>
<v-app>
  
  <layout-header :btns="btns" />
  
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
        home: {
          label: 'ホーム',
          path: '/',
          text: true
        },
        user: {
          label: '設定',
          path: '/user',
          text: true
        },
        logout: {
          label: 'ログアウト',
          type: 'logout',
          text: true
        }
      }
    }
  },
  created () {
    if (!this.user) return
    
    if (this.user.role === 0) {
      this.btns = {
        admin: {
          label: '管理',
          path: '/admin',
          text: true
        },
        ...this.btns,
      }
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/loggedUser' }),
  }
}
</script>