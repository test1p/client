<template>
<col-base class="px-0">
  
  <template v-if="items && !selected">
  <input-select :label="selectLabel" :val.sync="address" :rules="rules" :show="show" :items="items" />
  </template>
  
  <input-text  :label="label" :val.sync="setVal" :rules="rules" :show="show" />
  
</col-base>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectLabel: '住所を選択',
      address: null,
      items: null,
      selected: false
    }
  },
  computed: {
    ...mapGetters({ store:'val' }),
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  watch: {
    store: {
      handler: async function (val, oldVal) {
        if (val[this.$route.path]) {
          const postcode = val[this.$route.path].postcode
          const oldPostcode = oldVal[this.$route.path] ? oldVal[this.$route.path].postcode : null
          if (postcode && postcode !== oldPostcode && /^[0-9]+$/.test(postcode) && !postcode.includes('-') && postcode.length === 7) {
            const { results } = await this.$axios.$post(`/address?zipcode=${postcode}`)
            
            if (!results) return this.$emit('update:val', '郵便番号に誤りがあります')
            
            if (results[1]) {
              this.items = results.map(x => x.address1 + x.address2 + x.address3)
              this.selected = false
            }
            else if (results[0]) {
              const address = results[0].address1 + results[0].address2 + results[0].address3
              this.$emit('update:val', address)
              this.selected = true
            }
          }
        }
      },
      deep: true
    },
    address: function(newVal) {
      this.$emit('update:val', newVal)
      this.selected = true
    }
  },
  props:['label', 'val', 'rules', 'show', 'item_text', 'item_val']
}
</script>