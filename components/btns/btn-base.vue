<template>
<v-btn
  :color="color"
  :elevation="(icon || outlined || text)? undefined : elevation"
  :loading="loading"
  :disabled="disabled"
  :block="block"
  :icon="icon"
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
      default: 1
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
    icon: {
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