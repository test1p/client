<template>
<v-container>
  
  <row-base>
    <text-title>
      ゲーム情報変更
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="item" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  middleware: 'isHost',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        entry_started_at: { label: 'エントリー開始', val: this.$dayjs().startOf('date').format('YYYY-MM-DD HH:mm'), rules: ['required'], type: 'datetime', min: this.$dayjs().format('YYYY-MM-DD') },
        entry_ended_at: { label: 'エントリー〆切', val: ' 23:59', rules: ['required'], type: 'datetime', min: this.$dayjs().format('YYYY-MM-DD') },
        capacity: { label: '定員(任意)', val: null, rules: [], type: 'integer' },
      },
      item: {},
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
  },
  methods: {
    editData (data) {
      const entry_started_at = this.$dayjs(data.entry_started_at).format('YYYY-MM-DD HH:mm')
      const entry_ended_at = this.$dayjs(data.entry_ended_at).format('YYYY-MM-DD HH:mm')
      return {
        ...data,
        entry_started_at,
        entry_ended_at,
      }
    }
  }
}
</script>