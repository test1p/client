<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリーリスト
    </text-title>
  </row-base>
  
  <row-base>
    <table-base :headers="headers" :items="items" :btns="btns" :sort="sort" :mobileBreakpoint="mobileBreakpoint" />
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
        { text: '氏名', value: 'name', align: 'left' },
        { text: '所属', value: 'belonging', align: 'left' },
        { text: 'クラス', value: 'class', align: 'left' },
      ],
      items: [],
      sort: false,
      mobileBreakpoint: 320
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.items = this.editData(data)
  },
  methods: {
    editData (data) {
      return data.map(x => {
        x.name = x.user.name
        x.class = x.event_class.class_name
        return x
      })
    }
  }
}
</script>