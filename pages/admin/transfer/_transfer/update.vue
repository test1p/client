<template>
<v-container>
  
  <row-base>
    <text-title>
      編集
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="data" />
  </row-base>
        
</v-container>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        transfer_plan_id: { label: 'プラン', val: null, rules: ['required'], type: 'select-solo', path: '/admin/transferPlan', item_text: 'transfer_plan_name' },
        status: { label: '状態', val: null, rules: ['required'], type: 'select-solo', items: [{ id: 0, text: '未振込' }, { id: 1, text: '振込済' }], item_text: 'text' },
      },
    }
  },
}
</script>