<template>
<v-container>
  <row-base>
    <text-title>
      メールドレス認証中
    </text-title>
  </row-base>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData ({ app, route }) {
    const path = route.query.queryURL
    const { message } = await app.$axios.$get(path)
    return { message }
  },
  mounted () {
      const message = this.message
      
      if (message && !this.user.customer_id) return this.$router.push('/user/create')
      
      this.$router.push('/')
  },
  computed: {
    ...mapGetters({ user: 'auth/loggedUser' }),
  }
}
</script>