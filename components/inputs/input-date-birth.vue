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
    prepend-icon="mdi-calendar"
    readonly
    outlined
    v-bind="attrs"
    v-on="on"
  ></v-text-field>
  </template>
  
  <v-date-picker
    v-model="setVal"
    locale="jp-ja"
    ref="picker"
    :max="$dayjs().subtract(5, 'year').format('YYYY-MM-DD')"
    :min="$dayjs().subtract(100, 'year').format('YYYY-MM-DD')"
    @input="menu = false"
    full-width
  ></v-date-picker>
  
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
  watch: {
    menu: function (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  props:['label', 'val', 'rules', 'show']
}
</script>