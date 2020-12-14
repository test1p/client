<template>
<v-row no-gutters>
  <template v-for="provider in providers">
  <v-col cols="12" class="pa-4">
    <btn-base block @click="socialLogin(provider)">
      <v-icon left>
        {{ provider.icon }}
      </v-icon>
      {{ `${provider.name}で${label}` }}
    </btn-base>
  </v-col>
  </template>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      providers: [
        { name: 'Google', icon: 'mdi-google', path: 'google' },
        { name: 'Facebook', icon: 'mdi-facebook', path: 'facebook' },
        { name: 'Twitter', icon: 'mdi-twitter', path: 'twitter' }
      ]
    }
  },
  methods: {
    async socialLogin(provider) {
      const { redirect_url } = await this.$axios.$get(`/api/login/${provider.path}`)
       window.location.href = redirect_url
    }
  },
  props: {
    label: {
      default: 'ログイン',
    },
  }
}
</script>