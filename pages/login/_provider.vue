<template>
<v-container>
  <row-base>
    <text-title>
      ログイン中
    </text-title>
  </row-base>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'visitor',
  data() {
    return {
    }
  },
  async mounted () {
    const { user } = await this.$axios.$get(`/api${this.$route.path}/callback`, { params: this.$route.query }).catch(e => {})
    
    if (!user) return
    
    await this.$store.dispatch('auth/commitUser', user).catch(e => {})
    
    if (this.user && !this.user.customer_id) return this.$router.push('/user/create')
    
    this.$router.push('/')
  },
  computed: {
    ...mapGetters({ user: 'auth/loggedUser' }),
  },
}
</script>