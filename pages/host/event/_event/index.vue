<template>
<v-container>
  
  <row-base>
    <text-title>
      {{ event.name }}
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="event" :btns="btns">
      
      <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
        <span>
          公開資料
        </span>
      </v-col>
    
      <v-col class="px-0">
        <table-file-host :event="event" />
      </v-col>
      
      <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
        <span>
          ゲーム一覧
        </span>
      </v-col>
    
      <v-col class="px-0">
      <table-data :items="items" hideDefaultFooter>
        <template v-slot:default="{ items }">
        <v-list two-line>
          
          <v-divider />
          
          <template v-for="(game,i) in items">
          
          <v-divider v-if="i !== 0" />
          
          <list-game-host :game="game" />
          
          </template>
          
          <v-divider />
          
        </v-list>
        </template>
      </table-data>
      </v-col>
      
    </table-detail>
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isHost',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '主催・主管', value: 'organizer' },
        { text: '振込先口座', value: 'transfer_account' },
        { text: '振込金額', value: 'transfer_amount' },
        { text: '振込予定日', value: 'transfer_date' },
      ],
      event: {},
      btns: [
        { label: '共通情報変更', path: `${this.$route.path}/update`},
        { label: '公開資料追加', path: `${this.$route.path}/file/create`},
        { label: 'ゲーム追加', path: `${this.$route.path}/create`},
      ],
      items: []
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.event = this.editData(data)
    
    this.items = data.games
    
    if (!this.event.transfer_amount) this.deleteHeader('transfer_amount')
    
    if (!this.event.transfer_date) this.deleteHeader('transfer_date')
  },
  methods: {
    editData (data) {
      const name = data.event_name
      const transfer_account = data.transfer_account_label ? data.transfer_account_label : '未設定'
      return {
        ...data,
        name,
        transfer_account
      }
    },
    deleteHeader (value) {
      this.headers = this.headers.filter(x => x.value !== value)
    }
  }
}
</script>