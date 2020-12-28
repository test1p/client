<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリー詳細
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="item" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '氏名', value: 'name' },
        { text: 'ふりがな', value: 'furigana' },
        { text: '所属', value: 'belonging' },
        { text: 'クラス', value: 'class_name' },
        { text: 'チケットコスト', value: 'ticket_cost' },
        { text: '生年月日', value: 'birth_date' },
        { text: '性別', value: 'sex' },
        { text: '郵便番号', value: 'postcode' },
        { text: '住所', value: 'address' },
        { text: '電話番号', value: 'phone' },
        { text: '緊急連絡先電話番号', value: 'emg_phone' },
        { text: '緊急連絡先続柄', value: 'emg_relation' },
      ],
      item: {},
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
  },
  methods: {
    editData (data) {
      const user = data.user
      const class_name = data.event_class.class_name
      return {
        ...data,
        ...user,
        class_name
      }
    }
  }
}
</script>