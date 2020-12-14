<template>
<v-container>
  
  <row-base>
    <text-title>
      パスワード再設定
    </text-title>
  </row-base>
  
  <row-base>
  <form-post :inputs="inputs" :label="label" :redirect="redirect" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  layout: 'visitor',
  data() {
    return {
      inputs: {
        token: { val: null, rules: ['required'], show: false },
        email: { val: null, rules: ['required', 'email'], show: false },
        password: { label: '新しいパスワード', val: null, rules: ['required', 'password'], type: 'password' },
        password_confirmation: { label: '新しいパスワード確認', val: null, rules: ['required', 'confirmation'], type: 'password' },
      },
      label: '再設定',
      redirect: '/login'
    }
  },
  created () {
    if (this.$route.query.token) {
      this.inputs.token.val = this.$route.query.token
    }
    if (this.$route.query.email) {
      this.inputs.email.val = this.$route.query.email
    }
  }
}
</script>