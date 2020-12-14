<template>
<v-data-table
  :headers="headers"
  :items="items"
  :footer-props="footerProps"
  :mobile-breakpoint="mobileBreakpoint"
  :no-data-text="noDataText"
  :disable-sort="!sort"
>
  <template v-slot:item.actions="{ item }">
    <slot :item="item" />
  </template>
</v-data-table>
</template>

<script>
export default {
  data() {
    return {
      footerProps: {
        itemsPerPageAllText: '全て',
        itemsPerPageText: '件数'
      },
      mobileBreakpoint: 320,
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
    }
  }
}
</script>