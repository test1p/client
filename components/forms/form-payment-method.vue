<template>
<row-base>
  
  <col-base>
    
    <div id="card-element"></div>

    <div id="card-errors" ref="cardErrors" role="alert"></div>
    
  </col-base>

  <col-base>
    <btn-base :loading="loading" block @click="click">
      {{ label }}
    </btn-base>
  </col-base>

</row-base>
</template>

<script>
import {loadStripe} from '@stripe/stripe-js'

export default {
  data() {
    return {
      stripe: "",
      card: null,
      loading: false,
    }
  },
  async mounted() {
    const stripe_api_secret = this.$config.STRIPE_API_PUBLIC || null
    this.stripe = await loadStripe(stripe_api_secret)
    const elements = this.stripe.elements()
    this.card = elements.create("card")
    this.card.mount("#card-element")
    this.card.addEventListener('change', ({error}) => {
      const displayError = this.$refs.cardErrors
      if (error) {
        displayError.textContent = error.message
      } else {
        displayError.textContent = ''
      }
    })
  },
  methods: {
    async click () {
      this.loading = true
      const submit = confirm(`決済カードを${this.label}します`)
      
      if (!submit) return this.loading = false
      
      const { setupIntent } = await this.stripe.confirmCardSetup(this.client_secret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: 'test',
          }
        }
      }).catch(e => {})
      
      if (!setupIntent) return this.loading = false
      
      const { payment_method } = setupIntent
      
      if (!payment_method) return this.loading = false
      
      const response = await this.$axios.$post(`/api/user/paymentMethod`, { payment_method }).catch(e => {})
      this.loading = false
      const data = response ? response.data : null
      
      if (!data) return
      
      const redirect = this.redirect
      if (redirect === 'back') return this.$router.go(-1)
      if (redirect) return this.$router.push(redirect)
    }
  },
  props: {
    label: {
      default: '登録',
    },
    client_secret: {
      default: null,
    },
    redirect: {
      default: 'back',
    },
  }
}
</script>