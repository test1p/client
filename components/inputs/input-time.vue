<template>
<v-menu
  v-model="menu"
  v-show="show"
  offset-y
  min-width="296px"
  max-width="296px"
  :close-on-content-click="false"
  transition="scale-transition"
>
  
  <template v-slot:activator="{ on, attrs }">
  <v-text-field
    v-model="setVal"
    :label="label"
    :rules="rules"
    prepend-icon="mdi-clock-time-two-outline"
    readonly
    outlined
    v-bind="attrs"
    v-on="on"
  ></v-text-field>
  </template>
  
  <v-time-picker
    v-model="setVal"
    locale="jp-ja"
    :max="max"
    :min="min"
    @change="menu = false"
    format="24hr"
    full-width
  ></v-time-picker>
  
</v-menu>
</template>

<script>

export default {
  data () {
    return {
      menu: false
    }
  },
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  props:['label', 'val', 'rules', 'show', 'max', 'min']
}
</script>