<template>
<v-snackbar
  top
  v-model='show'
  color="green"
  timeout="2000"
>
  {{ message }}
</v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['message']),
    show: {
      get() {
        if (this.message) return true
      },
      set() {
        return this.$store.dispatch('commitMessage', null)
      }
    }
  }
}
</script>