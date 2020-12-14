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
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  props:['label', 'val', 'rules', 'show', 'items', 'item_text', 'item_val', 'multiple']
}
</script>