<template>
<v-container>
  
  <row-base>
    <text-title>
      振込先口座詳細
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
        { text: '銀行名', value: 'destination_bank' },
        { text: '支店名', value: 'destination_branch' },
        { text: '口座種別', value: 'type' },
        { text: '口座番号', value: 'num' },
        { text: '口座名義', value: 'holder' },
      ],
      item: {},
      btns: [
        { label: '削除', type: 'delete' },
      ]
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.processingData(data)
  },
  methods: {
    processingData (data) {
      return data
    }
  }
}
</script>