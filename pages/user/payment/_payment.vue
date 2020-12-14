<template>
<v-container>
  
  <row-base>
    <text-title>
      決済履歴詳細
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="item" :btns="btns" />
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
        { text: '請求日', value: 'created' },
        { text: '決済額', value: 'amount' },
        { text: '決済状況', value: 'status' },
      ],
      item: {},
      btns: []
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.processingData(data)
    
    if (!data.hosted_invoice_url) return
    
    this.btns = [
      { label: '領収書', path: data.hosted_invoice_url }
    ]
  },
  methods: {
    async click () {
      this.loading = true
      await this.$axios.$delete(`/api${this.$route.path}`).catch(e => {})
      this.loading = false
      return this.$router.go(-1)
    },
    processingData (data) {
        const created = this.$dayjs.unix(data.created).format('YYYY年MM月DD日')
        const amount = data.amount_due + '円'
        const processingStatus = (status) => {
            if (status === 'paid') {
              return '完了'
            }
            else if (status === 'draft') {
              return '手続中'
            }
            else if (status === 'open') {
              return '待機中'
            }
            else {
              return '失敗'
            }
        }
        const status = processingStatus(data.status)
      return {
          ...data,
          created,
          amount,
          status
      }
    }
  }
}
</script>