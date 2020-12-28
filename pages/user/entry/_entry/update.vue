<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリー内容変更
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="data" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        event_class_id: { label: 'クラス', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'class_name' },
        timekeeping_card_num: { label: '計時カード', val: 'レンタル', rules: ['required'] },
        belonging: { label: '所属', val: null, rules: [] },
      }
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.inputs.event_class_id.items = data.game.classes
    this.inputs.timekeeping_card_num.label = data.game.timekeeping_card.timekeeping_card_name
  }
}
</script>