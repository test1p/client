<template>
<v-row no-gutters align="center">
  
  <v-col cols="8">
    <v-row no-gutters class="text-left">
      
      <v-col cols="12" class="caption grey--text">
        <template v-for="item in upper_items">
          {{ data[item.value] }}　
        </template>
      </v-col>
      
      <v-col cols="12" class="font-weight-bold">
        {{ data.name }}
      </v-col>
      
      <v-col cols="12" class="caption grey--text">
        <template v-for="item in lower_items">
          {{ data[item.value] }}　
        </template>
      </v-col>
      
    </v-row>
  </v-col>

  <v-spacer></v-spacer>
  
  <slot />

</v-row>
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