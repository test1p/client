<template>
<v-container>
  
  <row-base>
    <text-title>
      振込決済登録
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
        price_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', path: '/admin/transferPlan', item_text: 'transfer_plan_name' },
      }
    }
  }
}
</script>