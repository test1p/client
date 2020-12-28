<template>
<v-row no-gutters class="py-2">
  <v-divider :color="color" />
</v-row>
</template>

<script>
export default {
  props: {
    color: {
      default: undefined
    }
  }
}
</script>