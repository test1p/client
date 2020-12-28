<template>
<v-container>
        
  <row-base>
    <text-title>
      新規イベント登録
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" @add="add" />
  </row-base>
        
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      inputs: {
        multi: { label: '複数ゲーム', val: false, rules: [], type: 'switch' },
        event_name: { label: 'イベント名', val: null, rules: ['required'] },
        organizer: { label: '主催・主管', val: null, rules: ['required'] },
        games:[
          {
            game_name: { label: 'ゲーム名', val: null, rules: [], show: false },
            date: { label: '開催日', val: null, rules: ['require'], type: 'date', min: this.$dayjs().format('YYYY-MM-DD') },
            venue: { label: '開催地', val: null, rules: ['required'], type: 'venue' },
            game_category_id: { label: 'カテゴリ', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gameCategory', item_text: 'game_category_name' },
            game_plan_id: { label: 'プラン', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gamePlan', item_text: 'game_plan_name' },
          },
        ]
      }
    }
  },
  created() {
    if (this.inputs.multi.val) this.multi()
    const val = this.val[this.$route.path]
    if (!val || !val.games || val.games.length < 2) return
    for (let i = 1; i < val.games.length; i++) {
      this.add()
    }
  },
  watch: {
    'inputs.multi.val': function(val) {
      this.multi()
    },
  },
  computed: {
    ...mapGetters({ val:'val' }),
  },
  methods: {
    add () {
      this.inputs.games.push(
        {
          game_name: { label: 'ゲーム名', val: null, rules: ['required'] },
          date: { label: '開催日', val: null, rules: ['require'], type: 'date', min: this.$dayjs().format('YYYY-MM-DD') },
          venue: { label: '開催地', val: null, rules: ['required'], type: 'venue' },
          game_category_id: { label: 'カテゴリ', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gameCategory', item_text: 'game_category_name' },
          game_plan_id: { label: 'プラン', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gamePlan', item_text: 'game_plan_name' },
        },
      )
    },
    multi () {
      const show = this.inputs.games[0].game_name.show
      if (show) {
        this.inputs.games[0].game_name.show = false
        this.inputs.games = [this.inputs.games[0]]
      }
      else {
        this.inputs.games[0].game_name.show = true
        this.add()
      }
    }
  }
}
</script>