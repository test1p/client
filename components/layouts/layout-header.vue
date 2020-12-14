<template>
<v-app-bar
  color="white"
  elevation="1"
  fixed
  app
>
  
  <v-spacer></v-spacer>
  
  <v-toolbar-items>
    <template v-for="btn in btns">
    <btn-all
      :btn="btn"
      :type="btn.type"
      @click="click(btn.type)"
      class="px-0"
    >
      {{ btn.label }}
    </btn-all>
    </template>
  </v-toolbar-items>
  
</v-app-bar>
</template>

<script>
export default {
  methods: {
    async click (type) {
      if (type === 'logout') {
        await this.$store.dispatch('auth/logout').catch(e => {})
      }
    }
  },
  props: {
    btns: {
      type: Object,
      default: () => {},
    }
  }
}
</script>