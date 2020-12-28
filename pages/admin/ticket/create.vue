<template>
<v-container>
  
  <row-base>
    <text-title>
      チケット追加
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        user_id: { label: 'ユーザー', val: null, rules: ['required'], type: 'search-solo', path: '/admin/user', item_text: 'name' },
        add_ticket_num: { label: '追加チケット枚数', val: null, rules: ['required'] },
      }
    }
  }
}
</script>