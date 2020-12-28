<template>
<v-container>
        
  <row-base>
    <text-title>
      簡単エントリー設定
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :path="path" @add="add" />
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
        priority_difficulty: { label: '優先難易度', val: 0, rules: [], type: 'select-solo', items: [{ id: 0, text: '難しめ(E)' }, { id: 1, text: 'やや難しめ(A)' }, { id: 2, text: '普通(B)' }, { id: 3, text: '易しめ(ビギナー)' }], item_text: 'text' },
        priority_age: { label: '優先年齢(実年齢から差し引きたい正の数)', val: 0, rules: [] },
        belonging: { label: '所属', val: null, rules: [] },
        timekeeping_cards:[
          { label: ['計時カード', 'マイカード番号'], val: {id: null, timekeeping_card_num: null}, rules: [], type: 'pair', path: '/timekeepingCard', item_text: 'timekeeping_card_name' },
        ],
      },
      path: this.$route.path
    }
  },
  methods: {
    add () {
      this.inputs.timekeeping_cards.push(
        { label: ['計時カード', 'マイカード番号'], val: {id: null, timekeeping_card_num: null}, rules: [], type: 'pair', path: '/timekeepingCard', item_text: 'timekeeping_card_name' }
      )
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.inputs.priority_difficulty.val = data.priority_difficulty
    this.inputs.priority_age.val = data.priority_age
    this.inputs.belonging.val = data.belonging
    
    const cards = data.timekeeping_cards
    
    if (cards.length === 0) return
    
    this.inputs.timekeeping_cards[0].val = { id: cards[0].id, timekeeping_card_num: cards[0].pivot.timekeeping_card_num }
    
    if (cards.length === 1) return
    for (let i = 1; i < cards.length; i++) {
      this.add()
      this.inputs.timekeeping_cards[i].val = { id: cards[i].id, timekeeping_card_num: cards[i].pivot.timekeeping_card_num }
    }
  }
}
</script>