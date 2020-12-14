<template>
<v-switch
  v-model="setVal"
  v-show="show"
  :label="label"
  :rules="rules"
  validate-on-blur
  class="mt-0"
></v-switch>
</template>

<script>
export default {
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  props: ['label', 'val', 'rules', 'show']
}
</script>