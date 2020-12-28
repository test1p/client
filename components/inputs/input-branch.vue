<template>
<v-combobox
  v-model="setVal"
  :label="label"
  :rules="rules"
  :items="items"
  :item-text="item_text"
  :item-value="item_val"
  :search-input.sync="search"
  :loading="loading"
  hide-no-data
  no-filter
  outlined
  validate-on-blur
></v-combobox>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      items: [],
      loading: null,
      item_text: 'name',
      item_val: 'name',
      search: null,
      proxy: '/bank',
      path: '/branches/search.json'
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
    async search(val) {
      if (!val) return
      
      this.loading = true
      let query = null
      if (val.match(/^[\u3040-\u309f]+$/)) {
        const kana =  val.replace(/[\u3041-\u3096]/g, ch =>
          String.fromCharCode(ch.charCodeAt(0) + 0x60)
        )
        query = 'kana'
        this.items = await this.$axios.$get(`${this.proxy}/${this.store.bankcode}${this.path}?${query}=${kana}`)
        this.loading = false
        return
      }
      else if (val.match(/^[\u30a0-\u30ff]+$/)) {
        query = 'kana'
      }
      else if (val.match(/^[0-9]*$/)) {
        if (val.length === 4) {
          query = 'code'
        }
      }
      else if (val.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) {
        query = 'name'
      }
      if (query === null) {
        this.loading = false
        return
      }
      this.items = await this.$axios.$get(`${this.proxy}/${this.store.bankcode}${this.path}?${query}=${val}`)
      this.loading = false
    }
  },
  props:['label', 'val', 'rules', 'show']
}
</script>