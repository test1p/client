<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリー履歴
    </text-title>
  </row-base>
  
  <row-base>
    <table-base :headers="headers" :items="items" :btns="btns" :sort="sort">
      <template #default="table">
        <v-row>
          
          <template v-for="btn in btns">
          <btn-all v-if="editBtn(btn, table.item)" :btn="editBtn(btn, table.item)" :type="btn.type" @click="click(table.item)" class="px-1">
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
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '開催日', value: 'date', align: 'left' },
        { text: 'イベント名', value: 'name', align: 'left' },
        { text: 'クラス', value: 'class', align: 'left' },
        { text: '', value: 'actions', align: 'left', sortable: false },
      ],
      btns: {
        detail: {
          label: '詳細',
          path: `${this.$route.path}/_id`,
          outlined: true,
          small: true
        },
        delete: {
          label: '取消',
          type: 'delete',
          color: 'error',
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
    
    this.items = this.editData(data)
  },
  methods: {
    async click (item) {
      const id = item.id
      
      if (!id) return
      
      this.loading = true
      await this.$axios.$delete(`/api${this.$route.path}/${id}`).catch(e => {})
      const { data } = await this.$axios.$get(`/api${this.$route.path}`).catch(e => {})
      this.items = this.processingData(data)
      this.loading = false
    },
    editData (data) {
      return data.map(x => {
        x.date = this.$dayjs(x.date).format('MM/DD(dd)')
        return x
      })
    },
    editBtn (btn, item) {
      if (!btn.path || !item.id) return null
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.game_id}`)
      }
    }
  }
}
</script>