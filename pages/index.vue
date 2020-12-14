<template>
<v-container>
  ホーム
</v-container>
</template>

<script>
export default {
  layout ({ store }) {
    if (!store.getters['auth/isAuthenticated']) return 'visitor'
  },
  data() {
    return {
    }
  }
}
</script>