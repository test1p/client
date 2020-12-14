<template>
<v-container>
  
  <row-base>
    <text-title>
      ユーザー詳細
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="item" :btns="btns" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isAdmin',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'メールアドレス', value: 'email' },
        { text: 'メールアドレス認証', value: 'email_verified_at' },
        { text: '顧客ID', value: 'customer_id' },
        { text: '決済方法ID', value: 'payment_method_id' },
        { text: '決済方法', value: 'payment_method' },
        { text: 'サブスクリプションID', value: 'subscription_id' },
        { text: 'サブスクリプション', value: 'subscription' },
        { text: '氏名', value: 'name' },
        { text: 'ふりがな', value: 'furigana' },
        { text: '生年月日', value: 'birth_date' },
        { text: '性別', value: 'sex' },
        { text: '郵便番号', value: 'postcode' },
        { text: '住所', value: 'address' },
        { text: '電話番号', value: 'phone' },
        { text: '緊急連絡先電話番号', value: 'emg_phone' },
        { text: '緊急連絡先続柄', value: 'emg_relation' },
      ],
      item: {},
      btns: [
        {
          label: '編集',
          path: `${this.$route.path}/update`,
        },
        {
          label: '削除',
          type: 'delete',
          path: this.$route.path,
        },
      ]
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.processingData(data)
  },
  methods: {
    async click () {
      this.loading = true
      await this.$axios.$delete(`/api${this.$route.path}`).catch(e => {})
      this.loading = false
      return this.$router.go(-1)
    },
    processingData (data) {
      const subscription = data.subscription ? data.subscription.metadata.name: '未登録'
      const payment_method = data.payment_method ? data.payment_method.brand + '　下4桁：' + data.payment_method.last4 + '　有効期限：' + data.payment_method.exp_month + '/' + data.payment_method.exp_year : '未登録'
      return {
        ...data,
        subscription,
        payment_method
      }
    }
  }
}
</script>