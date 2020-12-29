<template>
<v-container>
        
  <row-base>
    <text-title>
      プロフィール変更
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="data" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        name: { label: '氏名(本名)', val: null, rules: ['required'], type: 'name' },
        furigana: { label: 'ふりがな', val: null, rules: ['required'], type: 'furigana' },
        sex: { label: '性別', val: null, rules: ['required'], type: 'select', items:['男', '女'] },
        postcode: { label: '郵便番号', val: null, rules: ['required', 'digits:7'], type: 'integer' },
        address: { label: '住所', val: null, rules: ['required'], type: 'address' },
        phone: { label: '電話番号', val: null, rules: ['required', 'digits_between:10,11'], type: 'integer' },
        emg_phone: { label: '緊急連絡先電話番号', val: null, rules: ['required', 'digits_between:10,11'], type: 'integer' },
        emg_relation: { label: '緊急連絡先続柄', val: null, rules: ['required'] },
        role: { label: 'イベント開催', val: null, rules: ['required'], type: 'select-solo', items:[{ id: 100, text: 'しない' }, { id: 50, text: 'する' }], item_text: 'text' },
      }
    }
  }
}
</script>