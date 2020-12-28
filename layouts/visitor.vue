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
export default {
  data () {
    return {
      btns: {
        signup: {
          label: '新規登録',
          path: '/signup'
        },
        login: {
          label: 'ログイン',
          path: '/login'
        }
      }
    }
  }
}
</script>