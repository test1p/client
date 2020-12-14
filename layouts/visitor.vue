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
        home: {
          label: 'ホーム',
          path: '/',
          text: true
        },
        signup: {
          label: '新規登録',
          path: '/signup',
          text: true
        },
        login: {
          label: 'ログイン',
          path: '/login',
          text: true
        }
      }
    }
  }
}
</script>