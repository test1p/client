<template>
<v-container>
  
  <row-base>
    <text-title>
      ユーザー編集
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="data" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isAdmin',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        email: { label: 'メールアドレス', val: null, rules: ['required', 'email'] },
        payment_method_id: { label: '決済方法ID', val: null, rules: [] },
        subscription_id: { label: 'サブスクリプションID', val: null, rules: [] },
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