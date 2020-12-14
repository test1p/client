<template>
<v-btn
  :color="color"
  :elevation="elevation"
  :loading="loading"
  :disabled="disabled"
  :block="block"
  :outlined="outlined"
  :text="text"
  :small="small"
  @click="click"
  style="text-transform: none"
>
  <slot />
</v-btn>
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('click')
    }
  },
  props: {
    color: {
      default: undefined
    },
    elevation: {
      default: undefined
    },
    loading: {
      default: false
    },
    disabled: {
      default: false
    },
    block: {
      default: false
    },
    outlined: {
      default: false
    },
    text: {
      default: false
    },
    small: {
      default: false
    }
  }
}
</script>