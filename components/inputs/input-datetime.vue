<template>
<col-base class="px-0">
  <input-date :label="label + date.label" :val.sync="dateVal" :rules="rules" :show="show" :max="max" :min="min" />
  <input-time :label="label + time.label" :val.sync="timeVal" :rules="rules" :show="show" />
</col-base>
</template>

<script>

export default {
  data() {
    return {
      date: {
        label: '(日付)'
      },
      time: {
        label: '(時刻)'
      }
    }
  },
  computed: {
    setVal () {
      if (!this.val || !this.val.includes(' ')) return ['','']
      return this.val.split(' ')
    },
    dateVal: {
      get () { return this.setVal[0] },
      set (newVal) { return this.$emit('update:val', newVal + ' ' + this.timeVal) }
    },
    timeVal: {
      get () { return this.setVal[1] },
      set (newVal) { return this.$emit('update:val', this.dateVal + ' ' + newVal) }
    }
  },
  props:['label', 'val', 'rules', 'show', 'max', 'min']
}
</script>