<template>
<v-container>
  
  <row-base>
    <text-title>
      {{ item.name }}
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="item" :btns="btns" />
  </row-base>
  
  <row-base class="pt-16 pb-0">
    <v-subheader class="px-3">
      共通情報
    </v-subheader>
  </row-base>
  
  <row-base>
    <table-detail :headers="event_headers" :item="item" :btns="event_btns">
      
      <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
        <span>
          公開資料
        </span>
      </v-col>
    
      <v-col class="px-0">
        <table-file-host :event="event" />
      </v-col>
      
    </table-detail>
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
        { text: 'カテゴリ', value: 'game_category' },
        { text: '開催日', value: 'date' },
        { text: '開催地', value: 'venue' },
        { text: 'エントリー期間', value: 'entry_period' },
        { text: '定員', value: 'capacity' },
        { text: '計時カード', value: 'timekeeping_card' },
        { text: 'クラス', value: 'classes' },
        { text: 'プラン', value: 'game_plan' },
      ],
      item: {},
      btns: [
        { label: 'エントリー一覧', path: `${this.$route.path}/entry` },
        { label: 'エントリーリストダウンロード', type: 'download', path: `${this.$route.path}/entrylist`, redirect: null },
        { label: 'ゲーム情報変更', path: `${this.$route.path}/update` },
      ],
      event_headers: [
        { text: '主催・主管', value: 'organizer' },
        { text: '振込先口座', value: 'transfer_account' },
        { text: '振込金額', value: 'transfer_amount' },
        { text: '振込予定日', value: 'transfer_date' },
      ],
      event_btns: [],
      event: {}
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
    
    this.event = data.event
    
    this.event_btns = [
      { label: '共通情報変更', path: `/host/event/${data.event.id}/update`},
      { label: '公開資料追加', path: `/host/event/${data.event.id}/file/create`},
    ]
    
    if (!this.item.transfer_amount) this.deleteEventHeader('transfer_amount')
    
    if (!this.item.transfer_date) this.deleteEventHeader('transfer_date')
    
    if (this.item.entry_period !== '未設定') return
    
    this.deleteHeader('entry_period')
    this.deleteHeader('capacity')
    this.deleteHeader('timekeeping_card')
    this.deleteHeader('classes')
    
    this.btns = [
      { label: '詳細情報登録', path: `${this.$route.path}/register`},
      { label: 'ゲーム削除', type: 'delete'},
    ]
  },
  methods: {
    editData (data) {
      const name = data.game_name ? data.event.event_name + data.game_name : data.event.event_name
      const game_category = data.game_category.game_category_name
      const date = this.$dayjs(data.date).format('YYYY年MM月DD日')
      const entry_period = this.createEntryPeriod(data)
      const capacity = data.capacity ? data.capacity : '未設定'
      const timekeeping_card = data.timekeeping_card.timekeeping_card_name
      const classes = data.classes.map(x => {
        const capacity = x.capacity ? `(${x.capacity})` : ''
        return x.class_name + capacity
      }).join(', ')
      const game_plan = `${data.game_plan.game_plan_name}(一般：${data.game_plan.general_ticket_cost}枚、学生：${data.game_plan.student_ticket_cost}枚)`
      const organizer = data.event.organizer
      const transfer_account = data.transfer_account_label ? data.transfer_account_label : '未設定'
      return {
        ...data,
        name,
        game_category,
        date,
        entry_period,
        capacity,
        timekeeping_card,
        classes,
        game_plan,
        organizer,
        transfer_account
      }
    },
    createEntryPeriod (data) {
      const start = data.entry_started_at ? this.$dayjs(data.entry_started_at) : null
      const end = data.entry_ended_at ? this.$dayjs(data.entry_ended_at) : null
      const now = this.$dayjs()
      
      if (!start || !end) return '未設定'
      
      if (start <= now) return '～ ' + end.format('YYYY/MM/DD(dd) HH:mm')
      
      if (start.get('year') !== end.get('year')) return start.format('MM/DD(dd) HH:mm') + ' ～ ' + end.format('YYYY/MM/DD(dd) HH:mm')
      
      if(start.get('month') !== end.get('month')) return start.format('MM/DD(dd) HH:mm') + ' ～ ' + end.format('MM/DD(dd) HH:mm')
      
      if(start.get('date') !== end.get('date')) return start.format('MM/DD(dd) HH:mm') + ' ～ ' + end.format('DD(dd) HH:mm')
      
      return start.format('MM/DD(dd) HH:mm') + ' ～ ' + end.format('HH:mm')
    },
    deleteHeader (value) {
      this.headers = this.headers.filter(x => x.value !== value)
    },
    deleteEventHeader (value) {
      this.event_headers = this.event_headers.filter(x => x.value !== value)
    }
  }
}
</script>