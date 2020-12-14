<template>
<v-container>
  
  <row-base>
    <text-title>
      決済
    </text-title>
  </row-base>
  
  <row-dense>
    <text-base v-html="note" />
  </row-dense>
  
  <row-base>
    <form-post :inputs="inputs" :confirm="confirm" />
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
    const { data } = await app.$axios.$get('/api/paymentPlan')
    return { data }
  },
  data() {
    return {
      note: '単発決済プランです\n一回限りの決済です',
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
        this.confirm = `以下の決済を確定します\n\nプラン：${name}\n価格：${with_tax}`
      },
      deep: true
    }
  }
}
</script>