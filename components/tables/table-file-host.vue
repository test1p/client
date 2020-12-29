<template>
<table-base :headers="headers" :items="items" hideDefaultHeader hideDefaultFooter>
  <template #default="table">
    <v-row>
      
      <btn-link :path="table.item.url" class="px-1" :icon="true">
        <v-icon>mdi-open-in-new</v-icon>
      </btn-link>
      
      <btn-link :path="`${path}/file/${table.item.id}/update`" class="mx-1" :outlined="true">
        更新
      </btn-link>
      
      <btn-delete :path="`${path}/file/${table.item.id}`" class="mx-1" :outlined="true">
        削除
      </btn-delete>
      
    </v-row>
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
      items: [],
      path: null
    }
  },
  created () {
    const files = this.event.files
    
    if (!files) return
    
    this.items = this.editFiles(files)
    
    this.path = `/host/event/${this.event.id}`
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