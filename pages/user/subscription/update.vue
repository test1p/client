<template>
<v-container>
  
  <row-base>
    <text-title>
      プラン変更
    </text-title>
  </row-base>
  
  <row-dense>
    <text-base v-html="note" />
  </row-dense>
  
  <row-base>
    <form-put :inputs="inputs" :confirm="confirm" />
  </row-base>
  
  <row-base class="pt-16">
    <text-title>
      プラン一覧
    </text-title>
  </row-base>
  
  <row-base>
    <table-card :headers="headers" :items="items" />
  </row-base>
  
</v-container>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const { data } = await app.$axios.$get('/api/subscriptionPlan')
    return { data }
  },
  data() {
    return {
      note: '月額定額制プランです\n次回から適用のため、次回まで決済は行われません',
      inputs: {
        price_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'name' },
      },
      confirm: null,
      headers: [
        { text: 'プラン', value: 'name' },
        { text: '価格', value: 'without_tax' },
      ],
      items: []
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    const items = data.map(x => {
      x.name = x.metadata.name
      x.without_tax = x.unit_amount + '円(税抜)'
      x.with_tax = Math.round(x.unit_amount * 1.1) + '円(税込)'
      return x
    })
    
    this.inputs.price_id.items = items
    this.items = items
  },
  watch: {
    inputs: {
      handler: function (val) {
        const plan = this.inputs.price_id.items.find(x => x.id === val.price_id.val)
        if (!plan) return
        const { name, with_tax } = plan
        this.confirm = `以下のプランを次回から適用します\n次回まで決済は行われません\n\nプラン：${name}\n価格：${with_tax}`
      },
      deep: true
    }
  }
}
</script>