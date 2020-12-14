<template>
<v-container>
  
  <row-base>
    <text-title>
      設定
    </text-title>
  </row-base>
  
  <template v-for="item in items">
  <row-base class="pb-16">
    <table-detail :headers="item.headers" :item="user" :btns="item.btns" />
  </row-base>
  </template>
        
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
      items: [
        {
          headers: [
            { text: 'プロフィール', value: 'profile' },
          ],
          btns: [
            { label: '変更', path: '/user/update' },
            { label: 'メールアドレス変更', path: '/user/email/update' },
            { label: 'パスワード変更', path: '/user/password/update' },
            { label: '紹介コード発行', path: '/user/referralCode' }
          ]
        },
        {
          headers: [
            { text: 'プラン', value: 'subscription' },
          ],
          btns: [
            { label: '変更', path: '/user/subscription/update' }
          ]
        },
        {
          headers: [
            { text: '決済', value: 'payment_method' },
          ],
          btns: [
            { label: '決済方法変更', path: '/user/paymentMethod/update' },
            { label: '決済登録', path: '/user/payment/create' },
            { label: '決済履歴', path: '/user/payment' }
          ]
        },
        {
          headers: [
            { text: 'その他', value: '' },
          ],
          btns: [
            { label: 'プラン解約', path: '/user/subscription', type: 'delete' },
            { label: '決済方法削除', path: '/user/paymentMethod', type: 'delete' },
            { label: '退会', path: '/user', type: 'delete' }
          ]
        }
      ],
      user: {}
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.user = this.processingData(data)
    
    if (!data.email_verified_at) {
      this.items[0].btns = [
        { label: '認証メール再送', path: '/user/email/resend', type: 'post' },
        { label: 'メールアドレス変更', path: '/user/email/update' },
        { label: 'パスワード変更', path: '/user/password/update' }
      ]
    }
    
    if (data.provider_name) {
      this.items[0].btns = this.deleteBtn(this.items[0].btns, 'パスワード変更')
    }
    
    if (data.subscription_id) return
    
    this.items[0].btns = this.deleteBtn(this.items[0].btns, '紹介コード発行')
    this.items[3].btns = this.deleteBtn(this.items[3].btns, 'プラン解約')
    this.items[1].btns = [
      { label: '登録', path: '/user/subscription/create' }
    ]
    
    if (data.payment_method_id) return
    
    this.items[3].btns = this.deleteBtn(this.items[3].btns, '決済方法削除')
    this.items = this.deleteItem(this.items, 1)
    this.items[1].btns = [
      { label: '決済方法登録', path: '/user/paymentMethod/create' },
      { label: '決済履歴', path: '/user/payment' }
    ]
    
    if (data.customer_id) return
    
    this.items = this.deleteItem(this.items, 1)
    
    if (!data.email_verified_at) return
    
    this.items[0].btns = this.deleteBtn(this.items[0].btns, '変更')
    this.items[0].btns = [
      { label: '登録', path: '/user/create' },
      ...this.items[0].btns
    ]
    
  },
  methods: {
    processingData (data) {
      const subscription = data.subscription ? data.subscription.metadata.name: '未登録'
      const profile = data.name
      const payment_method = data.payment_method ? data.payment_method.brand + '　下4桁：' + data.payment_method.last4 + '　有効期限：' + data.payment_method.exp_month + '/' + data.payment_method.exp_year : '未登録'
      return {
        ...data,
        subscription,
        profile,
        payment_method
      }
    },
    deleteItem (items, num) {
      return items.filter((x,i) => i !== num)
    },
    deleteBtn (btns, label) {
      return btns.filter(x => x.label !== label)
    }
  }
}
</script>