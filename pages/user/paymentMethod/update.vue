<template>
<v-container>
        
  <row-base>
    <text-title>
      決済方法変更
    </text-title>
  </row-base>
  
  <form-payment-method :client_secret="client_secret" />
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    const { client_secret } = data
    return { client_secret }
  },
  data() {
    return {
    }
  }
}
</script>