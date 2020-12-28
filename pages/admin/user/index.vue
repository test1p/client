<template>
<v-container>
  
  <row-base>
    <text-title>
      ユーザー一覧
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
        </v-row>
      </template>
    </table-base>
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isAdmin',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '氏名', value: 'name', align: 'left' },
        { text: 'チケット', value: 'tickets_count', align: 'left' },
        { text: '', value: 'actions', align: 'right', sortable: false },
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
      return data
    },
    processingBtn (btn, item) {
      if (!btn.path || !item.id) return null
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.id}`)
      }
    }
  }
}
</script>