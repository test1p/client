<template>
<v-container>
  
  <row-base>
    <text-title>
      振込履歴一覧
    </text-title>
  </row-base>
  
  <row-base>
    <table-base :headers="headers" :items="items" :btns="btns" :sort="sort" :mobileBreakpoint="mobileBreakpoint">
      <template #default="table">
        <v-row>
          
          <template v-for="btn in btns">
          <btn-all v-if="editBtn(btn, table.item)" :btn="editBtn(btn, table.item)" :type="btn.type" class="px-1">
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
        { text: '振込者名', value: 'name', align: 'left' },
        { text: '振込状況', value: 'status', align: 'left' },
        { text: '振込額', value: 'amount', align: 'left' },
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
        const processingStatus = ['未振込', '振込済']
        const status = processingStatus[x.status]
        x.status = status
        x.amount = x.transfer_plan.price + '円'
        return x
      })
    },
    editBtn (btn, item) {
      if (btn.type === 'delete' && item.status === '振込済') return
      if (!btn.path || !item.id) return btn
      return {
        ...btn,
        path: btn.path.replace('/_id', `/${item.id}`)
      }
    }
  }
}
</script>