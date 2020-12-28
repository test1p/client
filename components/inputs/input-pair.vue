<template>
<col-base class="px-0">
  <input-select-api :label="selectLabel" :val.sync="setSelectVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" />
  <input-text  :label="textLabel" :val.sync="setVal" :rules="rules" :show="show" />
</col-base>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    selectLabel () {
      const label = this.label
      if (Array.isArray(label)) return label[0]
      return label
    },
    textLabel () {
      const label = this.label
      if (Array.isArray(label)) return label[1]
      return null
    },
    key () {
      const keys = Object.keys(this.val)
      return keys[1] || 'val'
    },
    setSelectVal: {
      get () { return this.val.id || null },
      set (newVal) { return this.$emit('update:val', { ...this.val, id: newVal }) }
    },
    setVal: {
      get () { return this.val[this.key] || null },
      set (newVal) { return this.$emit('update:val', { ...this.val, [this.key]: newVal }) }
    }
  },
  props:['label', 'val', 'rules', 'show', 'path', 'item_text', 'item_val']
}
</script>