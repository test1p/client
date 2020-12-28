<template>
<v-list-item style="padding-right:10px">
  
  <list-data :data="data" :upper_items="upper_items" :lower_items="lower_items">
    <span v-if="open" class="d-inline-flex align-center">
      <template v-for="n in data.ticket_cost">
      <v-icon x-small>mdi-ticket</v-icon>
      </template>
    </span>
  </list-data>
  
  <v-list-item-action class="align-center">
    <btn-link
      :path="createPath(game)"
      :icon="true"
    >
      <v-icon>mdi-information-outline</v-icon>
    </btn-link>
    <v-list-item-action-text>詳細</v-list-item-action-text>
  </v-list-item-action>
  
  <v-list-item-action v-if="open" class="align-center">
    <btn-entry
      color="orange"
      :disabled="disabled"
      :path="game.id"
      :icon="true"
    >
      <v-icon>mdi-run-fast</v-icon>
    </btn-entry>
    <v-list-item-action-text>{{ entry }}</v-list-item-action-text>
  </v-list-item-action>
  
</v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'

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
      open: false,
      disabled: false,
      entry: '申込'
    }
  },
  created () {
    const game = this.game
    
    if (!game) return
    
    const date = this.$dayjs(game.date).format('MM/DD(dd)')
    const name = this.event_name || game.game_name
    const ticket_cost = (this.user && this.user.age && this.user.age <= 24) ? game.game_plan.student_ticket_cost : game.game_plan.general_ticket_cost
    
    this.data = {
      ...game,
      date,
      name,
      ticket_cost
    }
    
    if (!this.user) return
    
    if (game.entry_started_at && this.$dayjs() >= this.$dayjs(game.entry_started_at)) this.open = true
    
    if (game.entry_ended_at && this.$dayjs() > this.$dayjs(game.entry_ended_at)) {
      this.disabled = true
      this.entry = '〆切済'
      return
    }
    
    if (game.available !== undefined && game.available === 0) {
      this.disabled = true
      this.entry = '定員'
    }
    
    if (this.user.entries.includes(this.data.id)) {
      this.disabled = true
      this.entry = '申込済'
    }
  },
  computed: {
    ...mapGetters({ user:'auth/loggedUser' })
  },
  watch: {
    user: {
      handler: function (val) {
        if (val && val.entries.includes(this.data.id)) {
          this.disabled = true
          this.entry = '申込済'
        }
      },
      deep: true
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