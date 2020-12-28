<template>
<col-base class="px-0">
  
  <v-autocomplete
    v-model="prefVal"
    v-show="show"
    :label="label + pref.label"
    :rules="rules"
    :items="items"
    :item-text="pref.item_text"
    :item-value="pref.item_val"
    :search-input.sync="search"
    :loading="loading"
    hide-no-data
    outlined
    validate-on-blur
  ></v-autocomplete>
  
  <input-resas
    :label="label + city.label"
    :val.sync="cityVal"
    :rules="rules"
    :show="show"
    :proxy="proxy"
    :path="city.path"
    :wrapper="wrapper"
    :item_text="city.item_text"
    :item_val="city.item_val"
  />
  
</col-base>
</template>

<script>
export default {
  data() {
    return {
      proxy: '/venue',
      wrapper: 'result',
      pref: {
        label: '(都道府県)',
        path: '/prefectures',
        item_text: 'prefName',
        item_val: 'prefName'
      },
      city: {
        label: '(市区町村)',
        path: '/cities',
        item_text: 'cityName',
        item_val: 'cityName'
      },
      items: [],
      loading: false,
      search: null
    }
  },
  computed: {
    setVal () {
      if (!this.val || !this.val.includes(' ')) return ['','']
      return this.val.split(' ')
    },
    prefVal: {
      get () { return this.setVal[0] },
      set (newVal) { return this.$emit('update:val', newVal + ' ' + this.cityVal) }
    },
    cityVal: {
      get () { return this.setVal[1] },
      set (newVal) { return this.$emit('update:val', this.prefVal + ' ' + newVal) }
    }
  },
  watch: {
    async search(val) {
      if (!val || !/^[\u30e0-\u9fcf]+$/.test(val)) return
      
      this.loading = true
      const data = await this.$axios.$get(`${this.proxy}${this.pref.path}`, {
        headers: { 'X-API-KEY': '1rpG1BR1zGGEkJGthV2DASkwbMYCNpq6pdGqwLQN' }
      })
      this.items = data[this.wrapper]
      this.loading = false
    },
    prefVal (val) {
      const prefCode = this.items.find(x => x.prefName === val).prefCode
      if (!prefCode) return
      this.city.path = '/cities?prefCode=' + prefCode
    }
  },
  props: ['label', 'val', 'rules', 'show']
}
</script>