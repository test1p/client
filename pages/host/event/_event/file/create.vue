<template>
<v-container>
        
  <row-base>
    <text-title>
      公開資料追加
    </text-title>
  </row-base>
  
  <row-base>
    <form-base
      :inputs="inputs"
      :label="label"
      :loading="loading"
      @click="click"
    />
  </row-base>
        
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      inputs: {
        file_name: { label: 'ファイル名', val: null, rules: ['required'] },
        file_data: { label: 'ファイルを選択', val: null, rules: ['required'], type: 'file' },
      },
      label: '追加',
      loading: false,
      confirm: null,
      redirect: 'back'
    }
  },
  computed: {
    ...mapGetters({ val:'val' }),
  },
  methods: {
    async click () {
      this.loading = true
      
      if (this.confirm) {
        const submit = confirm(this.confirm)
        
        if (!submit) return this.loading = false
      }
      
      let formData = new FormData()
      const items = this.val[this.$route.path]
      Object.keys(items).forEach(x => {
        const val = items[x]
        formData.append(x, val)
      })
      const path = this.$route.path.replace('/create', '')
      const response = await this.$axios.$post(`/api${path}`, formData).catch(e => {})
      this.loading = false
      const data = response ? response.data : null
      
      if (!data) return
      
      this.$store.dispatch('commitVal', {key: this.$route.path, val: null})
      const redirect = this.redirect
      if (redirect === 'back') return this.$router.go(-1)
      if (redirect) return this.$router.push(redirect)
    }
  }
}
</script>