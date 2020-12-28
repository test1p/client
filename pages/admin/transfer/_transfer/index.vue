<template>
<v-container>
  
  <row-base>
    <text-title>
      振込履歴詳細
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
        { text: '振込プラン名', value: 'name' },
        { text: '追加チケット数', value: 'ticket' },
        { text: '振込額', value: 'amount' },
        { text: '振込状況', value: 'status' },
      ],
      item: {},
      btns: [
        { label: '編集', path: `${this.$route.path}/update`},
        { label: '取消', type: 'delete'},
      ]
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.processingData(data)
    
    if (data.status === 0) {
      this.btns = [
        { label: '振込確認', type: 'post'},
        { label: '編集', path: `${this.$route.path}/update`},
        { label: '取消', type: 'delete'},
      ]
    }
  },
  methods: {
    processingData (data) {
      const name = data.transfer_plan.transfer_plan_name
      const ticket = data.transfer_plan.add_ticket_num + '枚'
      const amount = data.transfer_plan.price + '円'
      const processingStatus = ['未振込', '振込済']
      const status = processingStatus[data.status]
      return {
        ...data,
        name,
        ticket,
        amount,
        status
      }
    }
  }
}
</script>