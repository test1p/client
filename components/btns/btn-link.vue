<template>
<btn-base
  :color="color"
  :elevation="(icon || outlined || text)? undefined : elevation"
  :disabled="disabled"
  :block="block"
  :icon="icon"
  :outlined="outlined"
  :text="text"
  :small="small"
  @click="click"
>
  <slot />
</btn-base>
</template>

<script>
export default {
  methods: {
    click () {
      if (this.path.includes('http')) return window.open(this.path, '_blank')
      this.$router.push(`${this.path}`)
    }
  },
  props: {
    color: {
      default: undefined
    },
    elevation: {
      default: undefined
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
    },
    path: {
      default: '/',
    }
  }
}
</script>