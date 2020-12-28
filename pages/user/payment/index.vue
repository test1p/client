<template>
<v-container>
  
  <row-base>
    <text-title>
      決済履歴一覧
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
        { text: '日付', value: 'created', align: 'left' },
        { text: '金額', value: 'amount', align: 'right' },
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
        x.created = this.$dayjs.unix(x.created).format('YYYY年MM月DD日')
        x.amount = x.amount_due + '円'
        if (x.status === 'paid') {
          x.status = '完了'
        }
        else if (x.status === 'draft') {
          x.status = '手続中'
        }
        else if (x.status === 'open') {
          x.status = '待機中'
        }
        else {
          x.status = '失敗'
        }
        return x
      })
    },
    editBtn (btn, item) {
      if (!btn.path || !item.id) return btn
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.id}`)
      }
    }
  }
}
</script>