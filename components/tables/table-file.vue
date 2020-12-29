<template>
<table-base :headers="headers" :items="items" :mobileBreakpoint="320" hideDefaultHeader hideDefaultFooter>
  <template #default="table">
    <btn-link :path="table.item.url" :icon="true">
      <v-icon>mdi-open-in-new</v-icon>
    </btn-link>
  </template>
</table-base>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: '資料名', value: 'file_name', align: 'left' },
        { text: '最終更新', value: 'updated_at', align: 'left' },
        { text: '', value: 'actions', align: 'left', sortable: false },
      ],
      items: []
    }
  },
  created () {
    const files = this.event.files
    
    if (!files) return
    
    this.items = this.editFiles(files)
  },
  methods: {
    editFiles (data) {
      return data.map(x => {
        x.updated_at = this.$dayjs(x.updated_at).format('MM/DD(dd) HH:mm')
        return x
      })
    }
  },
  props: {
    event: {
      type: Object,
      default: () => {}, 
    }
  }
}
</script>