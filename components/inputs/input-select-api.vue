<template>
<v-select
  v-model="setVal"
  v-show="show"
  :label="label"
  :rules="rules"
  :items="items"
  :item-text="item_text"
  :item-value="item_val"
  :multiple="multiple"
  outlined
  validate-on-blur
></v-select>
</template>

<script>

export default {
  data() {
    return {
      items: []
    }
  },
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  async mounted () {
    if (!this.path) return
    const { data }  = await this.$axios.$get(`/api${this.path}`)
    this.items = data
  },
  props:['label', 'val', 'rules', 'show', 'path', 'item_text', 'item_val', 'multiple']
}
</script>