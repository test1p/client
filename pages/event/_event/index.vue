<template>
<v-container>
  
  <row-base>
    <text-title>
      {{ event.name }}
    </text-title>
  </row-base>
  
  <row-base>
    <table-detail :headers="headers" :item="event" />
  </row-base>
  
  <row-base class="px-2 text-left">
    <table-data :items="items" hideDefaultFooter>
      <template v-slot:default="{ items }">
      <v-list two-line>
        
        <v-divider />
        
        <template v-for="(game,i) in items">
        
        <v-divider v-if="i !== 0" />
        
        <list-game :game="game" />
        
        </template>
        
        <v-divider />
        
      </v-list>
      </template>
    </table-data>
  </row-base>
  
  <row-base>
    <col-base>
      
      <v-col class="text-left font-weight-bold pb-1 pl-0" style="border-bottom: 2px solid #000;">
        <span>
          公開資料
        </span>
      </v-col>
    
      <v-col class="px-0">
        <table-file :event="event" />
      </v-col>
      
    </col-base>
  </row-base>
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path}`)
    return { data }
  },
  data() {
    return {
      headers: [
        { text: '主催・主管', value: 'organizer' },
      ],
      event: {},
      items: []
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.event = this.processingData(data)
    
    this.items = data.games
  },
  methods: {
    processingData (data) {
      const name = data.event_name
      return {
        ...data,
        name,
      }
    }
  }
}
</script>