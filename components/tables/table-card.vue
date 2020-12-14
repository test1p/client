<template>
<v-row no-gutters justify="center">
  <template v-for="item in items">
  <v-col cols="12" sm="8" class="pa-3">
    <v-card outlined>
      <template v-for="(header, i) in headers">
        <v-divider v-if="i !== 0"></v-divider>
        
        <v-row no-gutters>
          
          <v-col class="pa-2 text-left">
            {{ header.text }}
          </v-col>
          
          <v-col class="pa-2 text-left">
            {{ item[header.value] }}
          </v-col>
          
        </v-row>
        
      </template>
    </v-card>
  </v-col>
  </template>
</v-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => [], 
    },
    items: {
      type: Array,
      default: () => [],
    }
  }
}
</script>