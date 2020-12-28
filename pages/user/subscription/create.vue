<template>
<v-container>
        
  <row-base>
    <text-title>
      プラン登録
    </text-title>
  </row-base>
  
  <row-dense>
    <text-base v-html="note" />
  </row-dense>
  
  <row-base>
    <form-post :inputs="inputs" :redirect="redirect" :confirm="confirm" />
  </row-base>
  
  <row-base>
    <btn-link
      :path="skip.path"
      text
      small
    >
      {{ skip.label }}
    </btn-link>
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
      note: '月額定額制プランです\n登録日より毎月決済されます',
      inputs: {
        price_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', items: [], item_text: 'name' },
        code: { label: 'クーポンコード', val: null, rules: [] },
      },
      redirect: '/user',
      confirm: null,
      skip: {
        label: 'スキップ',
        path: '/user'
      },
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
        this.confirm = `以下のプランを登録します\n本日より毎月自動決済されます\n\nプラン：${name}\n追加チケット：${add}\n価格：${price}`
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