<template>
<v-container>
  
  <row-base>
    <text-title>
      チケット追加(カード決済)
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
      note: 'カード決済によるチケット追加です\n決済直後に追加されます\n一回限りの決済です',
      inputs: {
        price_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'name' },
      },
      confirm: null,
      headers: [
        { text: 'プラン', value: 'name' },
        { text: '追加チケット', value: 'add' },
        { text: '価格', value: 'price' },
      ],
      items: []
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    const items = this.processingData(data)
    
    this.inputs.price_id.items = items
    this.items = items
  },
  watch: {
    inputs: {
      handler: function (val) {
        const plan = this.inputs.price_id.items.find(x => x.id === val.price_id.val)
        if (!plan) return
        const { name, add, price } = plan
        this.confirm = `以下の申込とカード決済を確定します\n\nプラン：${name}\n追加チケット：${add}\n価格：${price}`
      },
      deep: true
    }
  },
  methods: {
    processingData (data) {
      return data.map(x => {
        x.name = x.metadata.name
        x.add = x.metadata.add
        x.price = x.unit_amount + '円(税込)'
        return x
      })
    }
  }
}
</script>