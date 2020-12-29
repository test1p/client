<template>
<v-container>
  
  <row-base>
    <text-title>
      運営ゲームエントリー一覧
    </text-title>
  </row-base>
  
  <row-base>
    <table-base :headers="headers" :items="items" :btns="btns" :sort="sort">
      <template #default="table">
        <v-row>
          
          <template v-for="btn in btns">
          <btn-all v-if="processingBtn(btn, table.item)" :btn="processingBtn(btn, table.item)" :type="btn.type" @click="click(table.item)" class="px-1">
            {{ btn.label }}
          </btn-all>
          </template>
          
          <v-spacer></v-spacer>
          
        </v-row>
      </template>
    </table-base>
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
        { text: '氏名', value: 'name', align: 'left' },
        { text: '所属', value: 'belonging', align: 'left' },
        { text: 'クラス', value: 'class', align: 'left' },
        { text: '', value: 'actions', align: 'left', sortable: false },
      ],
      btns: {
        detail: {
          label: '詳細',
          path: `${this.$route.path}/_id`,
          outlined: true,
          small: true
        }
      },
      items: [],
      sort: false
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.items = this.processingData(data)
  },
  methods: {
    processingData (data) {
      return data.map(x => {
        x.name = x.user.name
        x.class = x.event_class.class_name
        return x
      })
    },
    processingBtn (btn, item) {
      if (!btn.path || !item.id) return null
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.user_id}`)
      }
    }
  }
}
</script>