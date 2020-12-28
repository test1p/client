<template>
<v-list-group>
  
  <template v-slot:activator>
    <list-data :data="data" :upper_items="upper_items" :lower_items="lower_items" />
  </template>
  
  <template v-for="game in event.games">
  
  <v-divider />
  
  <list-game :game="game" />
  
  </template>
  
</v-list-group>
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
      ]
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
  methods: {
    createPath (data, text) {
      if(!data || !data.id) return
      
      const path = text ? '/' + text : ''
      
      return `${this.$route.path}/${data.id}${path}`
    },
    editDuring (start_date, end_date) {
      const start = this.$dayjs(start_date)
      const end = this.$dayjs(end_date)
      
      if (start.get('month') !== end.get('month')) return start.format('MM/DD(dd)') + ' ~ ' + end.format('MM/DD(dd)')
      
      if (start.get('date') !== end.get('date')) return start.format('MM/DD(dd)') + ' ~ ' + end.format('DD(dd)')
      
      return start.format('MM/DD(dd)')
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