<template>
<v-container>
  
  <row-base>
    <text-title>
      パスワード再設定メール送信
    </text-title>
  </row-base>
  
  <row-base>
  <form-post :inputs="inputs" :label="label" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  layout: 'visitor',
  data() {
    return {
      inputs: {
        email: { label: 'メールアドレス', val: null, rules: ['required', 'email'] }
      },
      label: '送信'
    }
  }
}
</script>