<template>
<v-file-input
  v-model="setVal"
  v-show="show"
  :label="label"
  :rules="rules"
  :accept="accept"
  outlined
  validate-on-blur
></v-file-input>
</template>

<script>
export default {
  data() {
    return {
      accept: 'application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  },
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  props: ['label', 'val', 'rules', 'show']
}
</script>