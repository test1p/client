<template>
<v-container>
        
  <row-base>
    <text-title>
      新規ゲーム追加
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" @add="add" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        games:[
          {
            game_name: { label: 'ゲーム名', val: null, rules: ['required'] },
            date: { label: '開催日', val: null, rules: ['require'], type: 'date', min: this.$dayjs().format('YYYY-MM-DD') },
            venue: { label: '開催地', val: null, rules: ['required'], type: 'venue' },
            game_category_id: { label: 'カテゴリ', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gameCategory', item_text: 'game_category_name' },
            game_plan_id: { label: 'プラン', val: '00000000-0000-0000-0000-000000000000', rules: ['required'], type: 'select-solo', path: '/host/gamePlan', item_text: 'game_plan_name' },
          },
        ]
      }
    }
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
    }
  }
}
</script>