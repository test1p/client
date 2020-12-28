<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリー詳細
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
        { text: '開催日', value: 'date' },
        { text: 'イベント名', value: 'name' },
        { text: 'クラス', value: 'class_name' },
        { text: '所属', value: 'belonging' },
        { text: 'カード番号', value: 'timekeeping_card_num' },
        { text: 'チケットコスト', value: 'ticket_cost' },
      ],
      item: {},
      btns: [
        { label: 'イベント詳細', path: `${this.$route.path.replace('user/entry', 'game')}`},
        { label: 'エントリー内容変更', path: `${this.$route.path}/update`},
        { label: 'キャンセル', type: 'delete', confirm: 'エントリーをキャンセルします'},
      ]
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
  },
  methods: {
    editData (data) {
      const game_category = data.game.game_category.game_category_name
      const date = this.$dayjs(data.game.date).format('YYYY年MM月DD日')
      const class_name = data.event_class.class_name
      return {
        ...data,
        game_category,
        date,
        class_name
      }
    }
  }
}
</script>