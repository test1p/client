<template>
<v-list-item style="padding-right:10px">
  
  <list-data :data="data" :upper_items="upper_items" :lower_items="lower_items" />
  
  <v-list-item-action class="align-center">
    
    <btn-link
      :path="btn.path"
      :icon="true"
    >
      <v-icon>
        {{ btn.icon }}
      </v-icon>
    </btn-link>
    
    <v-list-item-action-text>
      {{ btn.label }}
    </v-list-item-action-text>
    
  </v-list-item-action>
  
</v-list-item>
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
      ],
      btn: {
        label: '詳細',
        path: null,
        icon: 'mdi-information-outline',
      }
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
    
    this.btn.path = `/host/game/${game.id}`
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