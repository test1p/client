<template>
<form-base
  :inputs="inputs"
  :label="label"
  :loading="loading"
  @click="click"
  @add="add"
/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({ val:'val' }),
  },
  methods: {
    async click () {
      this.loading = true
      
      if (this.confirm) {
        const submit = confirm(this.confirm)
        
        if (!submit) return this.loading = false
      }
      
      const path = this.path || this.$route.path.replace('/create', '')
      const response = await this.$axios.$post(`/api${path}`, this.val[this.$route.path]).catch(e => {})
      this.loading = false
      const data = response ? response.data : null
      
      if (!data) return
      
      this.$store.dispatch('commitVal', {key: this.$route.path, val: null})
      const redirect = this.redirect
      if (redirect === 'back') return this.$router.go(-1)
      if (redirect) return this.$router.push(redirect)
    },
    add () {
      this.$emit('add')
    }
  },
  props: {
    inputs: {
      type: Object,
      default: () => {},
    },
    label: {
      default: '登録',
    },
    path: {
      default: null,
    },
    redirect: {
      default: 'back',
    },
    confirm: {
      default: null,
    },
  }
}
</script>