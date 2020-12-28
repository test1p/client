<template>
<v-data-iterator
  :headers="headers"
  :items="items"
  :footer-props="footerProps"
  :no-data-text="noDataText"
  :disable-sort="!sort"
  :hide-default-footer="hideDefaultFooter"
>
  <template v-slot:default="{ items }">
    <slot :items="items" />
  </template>
</v-data-iterator>
</template>

<script>
export default {
  data() {
    return {
      footerProps: {
        itemsPerPageAllText: '全て',
        itemsPerPageText: '件数'
      },
      noDataText: 'データがありません',
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => [], 
    },
    items: {
      type: Array,
      default: () => [],
    },
    sort: {
      default: true,
    },
    hideDefaultFooter: {
      default: false,
    }
  }
}
</script>