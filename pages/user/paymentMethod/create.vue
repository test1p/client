<template>
<v-container>
        
  <row-base>
    <text-title>
      決済方法登録
    </text-title>
  </row-base>
  
  <form-payment-method :client_secret="client_secret" :redirect="redirect" />
  
  <row-base>
    <btn-link
      :path="skip.path"
      text
      small
    >
      {{ skip.label }}
    </btn-link>
  </row-base>
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/create','')}`)
    const { client_secret } = data
    return { client_secret }
  },
  data() {
    return {
      redirect: '/user/subscription/create',
      skip: {
        label: 'スキップ',
        path: '/user'
      }
    }
  }
}
</script>