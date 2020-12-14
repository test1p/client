<template>
<v-text-field
  v-model="setVal"
  v-show="show"
  :label="label"
  :rules="rules"
  :type="(password && hide) ? 'password' : 'text'"
  :append-icon="password ? passwordIcon : undefined"
  @click:append="password ? hide = !hide : undefined"
  @change="change"
  outlined
  validate-on-blur
></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      hide: true
    }
  },
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    },
    passwordIcon () {
      if (this.hide) return 'mdi-eye'
      return 'mdi-eye-off'
    }
  },
  methods: {
    change () {
      this.$emit('change')
    }
  },
  props: ['label', 'val', 'rules', 'show', 'password']
}
</script>