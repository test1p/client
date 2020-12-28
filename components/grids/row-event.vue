<template>
<v-row no-gutters>
  
  <v-col cols="12" class="py-0">
    <row-data :data="data" :upper_items="upper_items" :lower_items="lower_items">
      
      <btn-link icon :path="createPath(event)">
        <v-icon>mdi-information-outline</v-icon>
      </btn-link>
  
      <v-divider vertical />
      
      <btn-base icon @click="show = !show">
        <v-icon>mdi-menu-down</v-icon>
      </btn-base>
      
    </row-data>
  </v-col>
  
  <template v-for="game in event.games">
  <v-col cols="12" class="py-0" v-show="show">
    
    <row-divider />
    
    <row-game :game="game" />
    
  </v-col>
  </template>
  
</v-row>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      upper_items: [
        { value: 'date' }
      ],
      lower_items: [
        { value: 'venues' }
      ],
      show: false
    }
  },
  methods: {
    createPath (data, text) {
      if(!data || !data.id) return
      
      const path = text ? '/' + text : ''
      
      return `${this.$route.path}/${data.id}${path}`
    },
    editDuring (start_date, end_date) {
      const start = this.$dayjs(start_date)
      const end = this.$dayjs(end_date)
      if (start.get('date') === end.get('date')) {
        return start.format('MM/DD(dd)')
      }
      else if (start.get('month') === end.get('month')) {
        return start.format('MM/DD(dd)') + ' ~ ' + end.format('DD(dd)')
      }
      else {
        return start.format('MM/DD(dd)') + ' ~ ' + end.format('MM/DD(dd)')
      }
    }
  },
  created () {
    const event = this.event
    
    if (!event) return
    
    const date = this.editDuring(event.start_date, event.end_date)
    const name = event.event_name
    
    this.data = {
      ...event,
      name,
      date
    }
  },
  props: {
    event: {
      type: Object,
      default: () => {},
    }
  }
}
</script>