<template>
<v-container>
  
  <row-base>
    <text-title>
      チケット追加(振込決済)
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
    const { data } = await app.$axios.$get('/api/transferPlan')
    return { data }
  },
  data() {
    return {
      note: '振込決済によるチケット補充です\n振込後に補充されます\n指定口座にお振込みください',
      inputs: {
        price_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'transfer_plan_name' },
      },
      confirm: null,
      headers: [
        { text: 'プラン', value: 'transfer_plan_name' },
        { text: '追加チケット', value: 'add_ticket_num' },
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
        const { transfer_plan_name, add_ticket_num, price } = plan
        this.confirm = `以下の振込決済を確定します\n\nプラン：${transfer_plan_name}\n追加チケット：${add_ticket_num}\n価格：${price}`
      },
      deep: true
    }
  },
  methods: {
    processingData (data) {
      return data.map(x => {
        x.add_ticket_num = x.add_ticket_num + '枚'
        x.price = x.price + '円'
        return x
      })
    }
  }
}
</script>