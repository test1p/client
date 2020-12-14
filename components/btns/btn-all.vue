<template>
<col-base :cols="cols" class="align-self-center">
  <template v-if="type === 'link'">
  <btn-link
    :color="btn.color"
    :elevation="btn.elevation"
    :disabled="btn.disabled"
    :block="btn.block"
    :outlined="btn.outlined"
    :text="btn.text"
    :small="btn.small"
    :path="btn.path"
  >
    <slot />
  </btn-link>
  </template>
  
  <template v-else>
  <btn-base
    :color="btn.color"
    :elevation="btn.elevation"
    :loading="btn.loading"
    :disabled="btn.disabled"
    :block="btn.block"
    :outlined="btn.outlined"
    :text="btn.text"
    :small="btn.small"
    @click="click"
  >
    <slot />
  </btn-base>
  </template>
</col-base>
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('click')
    }
  },
  props: {
    btn: {
      type: Object,
      default: () => {},
    },
    type: {
      default: 'link',
    },
    cols: {
      default: undefined,
    }
  }
}
</script>