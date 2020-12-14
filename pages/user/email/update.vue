<template>
<v-container>
  
  <row-base>
    <text-title>
      メールアドレス変更
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
        current_email: { label: '現在のメールアドレス', val: null, rules: ['required', 'email'] },
        new_email: { label: '新しいメールアドレス', val: null, rules: ['required', 'email'] },
      }
    }
  }
}
</script>