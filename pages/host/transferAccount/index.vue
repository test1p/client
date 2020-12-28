<template>
<v-container>
  
  <row-base>
    <text-title>
      振込先口座一覧
    </text-title>
  </row-base>
  
  <row-base>
    <table-base :headers="headers" :items="items" :btns="btns" :sort="sort">
      <template #default="table">
        <v-row>
          
          <template v-for="btn in btns">
          <btn-all v-if="processingBtn(btn, table.item)" :btn="processingBtn(btn, table.item)" :type="btn.type" class="px-1">
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
        { text: '銀行名', value: 'destination_bank', align: 'left' },
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
          label: '削除',
          type: 'delete',
          path: `${this.$route.path}/_id`,
          color: 'error',
          outlined: true,
          small: true,
          redirect: 'reload'
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
      return data
    },
    processingBtn (btn, item) {
      if (!btn.path || !item.id) return btn
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.id}`)
      }
    }
  }
}
</script>