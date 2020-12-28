<template>
<v-container>
  
  <row-base>
    <text-title>
      エントリー
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" />
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
      inputs: {
        event_class_id: { label: 'クラス', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'class_name' },
        timekeeping_card_num: { label: '計時カード', val: 'レンタル', rules: ['required'] },
        belonging: { label: '所属', val: null, rules: [] },
        ticket_cost: { label: 'チケットコスト', val: null, rules: ['required'] },
      }
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.inputs.event_class_id.items = data.game_classes
    this.inputs.event_class_id.val = data.event_class_id
    this.inputs.ticket_cost.val = data.ticket_cost
    this.inputs.timekeeping_card_num.label = data.timekeeping_card_name
    this.inputs.timekeeping_card_num.val = data.timekeeping_card_num
    this.inputs.belonging.val = data.belonging
  }
}
</script>