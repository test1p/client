<template>
<v-container>
  
  <row-base>
    <text-title>
      ユーザー登録
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isAdmin',
  data() {
    return {
      inputs: {
        email: { label: 'メールアドレス', val: null, rules: ['required', 'email'] },
        password: { label: 'パスワード', val: null, rules: ['required', 'password'], type: 'password' },
        name: { label: '氏名', val: null, rules: ['required'], type: 'name' },
        furigana: { label: 'ふりがな', val: null, rules: ['required'], type: 'furigana' },
        birth_date: { label: '生年月日', val: null, rules: ['required'], type: 'date-birth' },
        sex: { label: '性別', val: null, rules: ['required'], type: 'select-solo', items:['男', '女'] },
        postcode: { label: '郵便番号', val: null, rules: ['required', 'digits:7'], type: 'integer' },
        address: { label: '住所', val: null, rules: ['required'], type: 'address' },
        phone: { label: '電話番号', val: null, rules: ['required', 'digits_between:10,11'], type: 'integer' },
        emg_phone: { label: '緊急連絡先電話番号', val: null, rules: ['required', 'digits_between:10,11'], type: 'integer' },
        emg_relation: { label: '緊急連絡先続柄', val: null, rules: ['required'] },
      }
    }
  }
}
</script>