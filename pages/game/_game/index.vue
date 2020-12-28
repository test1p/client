<template>
<v-container>
  
  <row-base>
    <text-title>
      {{ item.name }}
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="item" :btns="btns">
      
      <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
        <span>
          公開資料
        </span>
      </v-col>
    
      <v-col class="px-0">
        <table-file :event="event" />
      </v-col>
      
    </table-detail>
  </row-base>
        
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout ({ store }) {
    if (!store.getters['auth/isAuthenticated']) return 'visitor'
  },
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '主催・主管', value: 'organizer' },
        { text: 'カテゴリ', value: 'game_category' },
        { text: '開催日', value: 'date' },
        { text: '開催地', value: 'venue' },
        { text: 'エントリー期間', value: 'entry_period' },
        { text: '定員', value: 'capacity' },
        { text: '計時カード', value: 'timekeeping_card' },
        { text: 'クラス', value: 'classes' },
        { text: 'チケットコスト', value: 'ticket_cost' },
      ],
      item: {},
      btns: [
        { label: 'エントリー', path: `${this.$route.path}/entry`},
        { label: 'エントリーリスト', path: `${this.$route.path}/entrylist`}
      ],
      event: {}
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
    
    this.event = data.event
    
    if (this.item.capacity === '未設定') this.deleteHeader('capacity')
    
    if (this.item.entry_ended_at && this.$dayjs() > this.$dayjs(this.item.entry_ended_at)) {
      this.btns = [
        { label: 'エントリー(〆切済)', disabled: true },
        { label: 'エントリーリスト', path: `${this.$route.path}/entrylist`}
      ]
      return
    }
    
    if (this.item.available !== undefined && this.item.available === 0) {
      this.btns = [
        { label: 'エントリー(定員)', disabled: true },
        { label: 'エントリーリスト', path: `${this.$route.path}/entrylist`}
      ]
    }
    
    if (this.user && this.user.entries.includes(this.item.id)) {
      this.btns = [
        { label: 'エントリー(申込済)', disabled: true },
        { label: 'エントリーリスト', path: `${this.$route.path}/entrylist`}
      ]
    }
    
    if (this.item.entry_period !== '未設定') return
    
    this.deleteHeader('entry_period')
    this.deleteHeader('capacity')
    this.deleteHeader('timekeeping_card')
    this.deleteHeader('classes')
    
    this.btns = []
  },
  computed: {
    ...mapGetters({ user:'auth/loggedUser' })
  },
  methods: {
    editData (data) {
      const name = data.game_name ? data.event.event_name + data.game_name : data.event.event_name
      const organizer = data.event.organizer
      const game_category = data.game_category.game_category_name
      const date = this.$dayjs(data.date).format('YYYY年MM月DD日')
      const entry_period = this.createEntryPeriod(data)
      const capacity = data.capacity ? data.capacity : '未設定'
      const timekeeping_card = data.timekeeping_card.timekeeping_card_name
      const classes = data.classes.map(x => {
        const capacity = x.capacity ? `(${x.capacity})` : ''
        return x.class_name + capacity
      }).join(', ')
      const ticket_cost = data.game_plan.general_ticket_cost + '枚'
      return {
        ...data,
        name,
        organizer,
        game_category,
        date,
        entry_period,
        capacity,
        timekeeping_card,
        classes,
        ticket_cost
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
      this.headers =  this.headers.filter(x => x.value !== value)
    }
  }
}
</script>