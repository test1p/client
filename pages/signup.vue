<template>
<v-container>
  
  <row-base>
    <text-title>
      新規アカウント登録(無料)
    </text-title>
  </row-base>
  
  <row-base>
    <btn-social-login :label="label" />
  </row-base>
  
  <row-base class="pa-4">
    <v-divider></v-divider>
  </row-base>
  
  <row-base>
    メールアドレスで登録
  </row-base>
  
  <row-base>
    <form-base :inputs="inputs" :label="label" :loading="loading" @click="click" />
  </row-base>
  
  <row-base>
    <btn-link
      :path="login.path"
      :text="true"
      small
    >
      {{ login.label }}
    </btn-link>
  </row-base>
  
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'visitor',
  data() {
    return {
      inputs: {
        email: { label: 'メールアドレス', val: null, rules: ['required', 'email'] },
        password: { label: 'パスワード', val: null, rules: ['required', 'password'], type: 'password' },
        password_confirmation: { label: 'パスワード確認', val: null, rules: ['required', 'confirmation'], type: 'password' }
      },
      label: '登録',
      loading: false,
      login: {
        label: 'ログインする',
        path: '/login'
      }
    }
  },
  computed: {
    ...mapGetters({ val:'val', isAuthenticated: 'auth/isAuthenticated' }),
  },
  methods: {
    async click () {
      this.loading = true
      await this.$store.dispatch('auth/signup', this.val[this.$route.path]).catch(e => {})
      this.loading = false
      if (this.isAuthenticated) {
        this.$store.dispatch('commitVal', {key: this.$route.path, val: null})
        this.$router.push('/user')
      }
    }
  }
}
</script>