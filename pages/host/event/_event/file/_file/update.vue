<template>
<v-container>
        
  <row-base>
    <text-title>
      {{ file_name }}更新
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
  async asyncData ({ app, route }) {
    const { data } = await app.$axios.$get(`/api${route.path.replace('/update','')}`)
    return { data }
  },
  data() {
    return {
      inputs: {
        file_data: { label: 'ファイルを選択', val: null, rules: ['required'], type: 'file' },
      },
      label: '更新',
      loading: false,
      confirm: null,
      redirect: 'back',
      file_name: '公開資料'
    }
  },
  computed: {
    ...mapGetters({ val:'val' }),
  },
  created () {
    const data = this.data
    
    if (!data) return
    
    this.file_name = data.file_name
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
      const path = this.$route.path.replace('/update', '')
      const response = await this.$axios.$post(`/api${path}`, formData, {
            headers: {
              'X-HTTP-Method-Override': 'PUT'
            }
          }).catch(e => {})
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