<template>
<v-container>
  
  <row-base>
    <text-title>
      イベント情報変更
    </text-title>
  </row-base>
  
  <row-base>
    <form-put :inputs="inputs" :data="item" />
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
        organizer: { label: '主催・主管', val: null, rules: ['required'] },
        transfer_account_id: { label: '振込先口座', val: null, rules: [], type: 'select-solo', path: '/host/transferAccount', item_text: 'label' },
      },
      item: {},
    }
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.item = this.editData(data)
  },
  methods: {
    editData (data) {
      return data
    }
  }
}
</script>