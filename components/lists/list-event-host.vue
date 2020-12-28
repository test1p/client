<template>
<v-list-group>
  
  <template v-slot:activator>
    
    <list-data :data="data" :upper_items="upper_items" :lower_items="lower_items" />
  
    <v-list-item-action class="align-center pr-2">
    
      <btn-link :icon="true" :path="btn.path">
        <v-icon>
          {{ btn.icon }}
        </v-icon>
      </btn-link>
      
      <v-list-item-action-text>
        {{ btn.label }}
      </v-list-item-action-text>
    
    </v-list-item-action>
    
    <v-divider style="margin-right:-27px" vertical />
  
  </template>
  
  <template v-for="game in event.games">
  
    <v-divider />
    
    <list-game-host :game="game" />
  
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
      ],
      btn: {
        label: '詳細',
        path: null,
        icon: 'mdi-information-outline',
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
    
    this.btn.path = `${this.$route.path}/${event.id}`
  },
  methods: {
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