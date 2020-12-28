<template>
<v-container>
  
  <row-base>
    <text-title>
      紹介コード
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
        { text: 'クーポンコード', value: 'code' },
        { text: '有効期限', value: 'expires_at' },
      ],
      item: {}
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.processingData(data)
  },
  methods: {
    processingData (data) {
        const expires_at = this.$dayjs.unix(data.expires_at).format('YYYY年MM月DD日 HH:mm:ss')
      return {
          ...data,
          expires_at
      }
    }
  }
}
</script>