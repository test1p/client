<template>
<v-container>
  
  <row-base>
    <text-title>
      運営イベント一覧
    </text-title>
  </row-base>
  
  <row-base class="px-2 text-left">
    <table-data :items="items">
      <template v-slot:default="{ items }">
      <v-list two-line>
        
        <v-divider />
        
        <template v-for="(event,i) in items">
        
          <v-divider v-if="i !== 0" />
          
          <template v-if="event.games.length === 1">
            <list-game-host :game="event.games[0]" :event_name="event.event_name" />
          </template>
          
          <template v-else-if="event.games.length >= 2">
            <list-event-host :event="event" />
          </template>
        
        </template>
        
        <v-divider />
        
      </v-list>
      </template>
    </table-data>
  </row-base>
        
</v-container>
</template>

<script>
export default {
  middleware: 'isHost',
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      items: [],
      color: 'black'
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.items = this.editData(data)
  },
  methods: {
    editData (data) {
      return data
    },
  }
}
</script>