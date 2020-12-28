<template>
<row-data :data="data" :upper_items="upper_items" :lower_items="lower_items">

  <btn-link icon :path="createPath(game)" style="margin-right:1px">
    <v-icon>mdi-information-outline</v-icon>
  </btn-link>
  
  <btn-base icon :path="createPath(game,'entry')">
    <v-icon>mdi-run-fast</v-icon>
  </btn-base>

</row-data>
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
        { value: 'venue' }
      ]
    }
  },
  created () {
    const game = this.game
    
    if (!game) return
    
    const date = this.$dayjs(game.date).format('MM/DD(dd)')
    const name = this.event_name || game.game_name
    
    this.data = {
      ...game,
      date,
      name
    }
  },
  methods: {
    createPath (data, text) {
      if(!data || !data.id) return
      
      const path = text ? '/' + text : ''
      
      return `/game/${data.id}${path}`
    },
  },
  props: {
    game: {
      type: Object,
      default: () => {},
    },
    event_name: {
      default: null
    }
  }
}
</script>