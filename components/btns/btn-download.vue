<template>
<v-btn
  :color="color"
  :elevation="(outlined || text)? undefined : elevation"
  :loading="loading"
  :disabled="disabled"
  :block="block"
  :outlined="outlined"
  :text="text"
  :small="small"
  @click="click"
  style="text-transform: none"
>
  <slot /><v-icon small>mdi-download</v-icon>
</v-btn>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async click () {
      this.loading = true
      
      if (this.confirm) {
        const submit = confirm(this.confirm)
        
        if (!submit) return this.loading = false
      }
      
      const path = this.path || this.$route.path
      await this.$axios.$get(`/api${path}`, { responseType : 'blob' }).then(response => {
       let link = document.createElement('a')
       link.href = window.URL.createObjectURL(response)
       link.download = this.file_name
       link.click()
      }).catch(e => {})
      const redirect = this.redirect
      if (redirect === 'back') return this.$router.go(-1)
      if (redirect === 'reload') return window.location.reload()
      if (redirect) return this.$router.push(redirect)
      this.loading = false
    }
  },
  props: {
    color: {
      default: undefined
    },
    elevation: {
      default: 1
    },
    disabled: {
      default: false
    },
    block: {
      default: false
    },
    outlined: {
      default: false
    },
    text: {
      default: false
    },
    small: {
      default: false
    },
    confirm: {
      default: undefined
    },
    path: {
      default: null
    },
    redirect: {
      default: 'back'
    },
    file_name: {
      default: 'entrylist.csv'
    },
  }
}
</script>