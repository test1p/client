<template>
<col-base>
  
  <template v-for="header in headers">
    
    <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
      <span>
        {{ header.text }}
      </span>
    </v-col>
    
    <v-col class="text-left pb-8 pl-0">
      <template v-if="header.value">
      {{ item[header.value] }}
      </template>
    </v-col>
    
  </template>
  
  <slot />
  
  <v-row>
    <template v-for="btn in btns">
    <btn-all
      :btn="btn"
      :type="btn.type"
      @click="click(btn)"
      :cols="cols"
    >
      {{ btn.label }}
    </btn-all>
    </template>
  </v-row>
  
</col-base>
</template>

<script>
export default {
  data() {
    return {
      cols: 'auto'
    }
  },
  methods: {
    async click (btn) {
      
      if (!btn || !btn.type) return
      
      if (btn.type === 'post' && btn.path) {
        const data = await this.$axios.$post(`/api${btn.path}`).catch(e => {})
      }
    },
  },
  props: {
    headers: {
      type: Array,
      default: () => [], 
    },
    item: {
      type: Object,
      default: () => {},
    },
    btns: {
      type: Array,
      default: () => [],
    }
  }
}
</script>