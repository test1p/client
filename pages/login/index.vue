<template>
<v-container>
        
  <row-base>
    <text-title>
      ログイン
    </text-title>
  </row-base>
  
  <row-base>
    <btn-social-login />
  </row-base>
  
  <row-base class="pa-4">
    <v-divider></v-divider>
  </row-base>
  
  <row-base>
    メールアドレスでログイン
  </row-base>
  
  <row-base>
    <form-base :inputs="inputs" :label="label" :loading="loading" @click="click" />
  </row-base>
  
  <template v-for="btn in btns">
  <row-base>
    <btn-link
      :path="btn.path"
      :text="true"
      small
    >
      {{ btn.label }}
    </btn-link>
  </row-base>
  </template>
        
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'visitor',
  data() {
    return {
      inputs: {
        email: { label: 'メールアドレス', val: null, rules: ['required'] },
        password: { label: 'パスワード', val: null, type: 'password', rules: ['required'] },
        remember: { label: 'ログインし続ける', val: undefined, type: 'switch' }
      },
      label: 'ログイン',
      loading: false,
      btns: {
        forgot_password: {
          label: 'パスワードを忘れた',
          path: '/password/forgot'
        },
        signup: {
          label: 'アカウントを持っていない',
          path: '/signup'
        }
      }
    }
  },
  computed: {
    ...mapGetters({ val:'val', isAuthenticated: 'auth/isAuthenticated' }),
  },
  methods: {
    async click () {
      this.loading = true
      await this.$store.dispatch('auth/login', this.val[this.$route.path]).catch(e => {})
      this.loading = false
      if (this.isAuthenticated) {
        this.$store.dispatch('commitVal', {key: this.$route.path, val: null})
        this.$router.push('/')
      }
    }
  }
}
</script>