<template>
<v-list-item-content class="text-left">
  
  <v-list-item-subtitle class="caption">
    
    <template v-for="item in upper_items">
    {{ data[item.value] }}　
    </template>
    
    <slot />
    
  </v-list-item-subtitle>
  
  <v-list-item-title class="body-2 font-weight-bold">
    {{ data.name }}
  </v-list-item-title>
  
  <v-list-item-subtitle class="caption">
    <template v-for="item in lower_items">
    {{ data[item.value] }}　
    </template>
  </v-list-item-subtitle>
  
</v-list-item-content>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    upper_items: {
      type: Array,
      default: () => [], 
    },
    lower_items: {
      type: Array,
      default: () => [], 
    }
  }
}
</script>