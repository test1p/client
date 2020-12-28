<template>
<v-autocomplete
  v-model="setVal"
  v-show="show"
  :label="label"
  :rules="rules"
  :items="items"
  :item-text="item_text"
  :item-value="item_val"
  :search-input.sync="search"
  :loading="loading"
  :multiple="multiple"
  :chips="multiple"
  :deletable-chips="multiple"
  :hide-selected="multiple"
  hide-no-data
  outlined
  validate-on-blur
></v-autocomplete>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      search: null
    }
  },
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  watch: {
    async search(val) {
      if (!val) return
      this.loading = true
      const data = await this.$axios.$get(`${this.proxy}${this.path}`)
      this.items = data[this.wrapper]
      this.loading = false
    }
  },
  props: ['label', 'val', 'rules', 'show', 'proxy', 'path', 'wrapper', 'item_text', 'item_val', 'multiple']
}
</script>