<template>
<v-container>
  
  <row-base>
    <text-title>
      ゲーム詳細登録
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :label="label" :path="path" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        classes: { label: 'クラス', val: [], rules: ['required'], type: 'search', path: '/host/class', item_text: 'class_name', item_val: 'id' },
        timekeeping_card_id: { label: '計時カード', val: null, rules: ['required'], type: 'select-solo', path: '/host/timekeepingCard', item_text: 'timekeeping_card_name' },
        entry_started_at: { label: 'エントリー開始', val: this.$dayjs().startOf('date').format('YYYY-MM-DD HH:mm'), rules: ['required'], type: 'datetime', min: this.$dayjs().format('YYYY-MM-DD') },
        entry_ended_at: { label: 'エントリー〆切', val: ' 23:59', rules: ['required'], type: 'datetime', min: this.$dayjs().format('YYYY-MM-DD') },
        capacity: { label: '定員(任意)', val: null, rules: [], type: 'integer' },
      },
      label: '登録',
      path: this.$route.path.replace('/register', '')
    }
  }
}
</script>