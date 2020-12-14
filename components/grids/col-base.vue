<template>
<v-col :cols="cols" class="py-1">
  <slot />
</v-col>
</template>

<script>
export default {
  props: {
    cols: {
      default: undefined,
    }
  }
}
</script>