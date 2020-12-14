<template>
<v-container>
  
  <row-base>
    <text-title>
      パスワード変更
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        current_password: { label: '現在のパスワード', val: null, rules: ['required', 'password'], type: 'password' },
        new_password: { label: '新しいパスワード', val: null, rules: ['required', 'password'], type: 'password' },
        new_password_confirmation: { label: '新しいパスワード確認', val: null, rules: ['required', 'confirmation'], type: 'password' },
      }
    }
  }
}
</script>