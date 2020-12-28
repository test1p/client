<template>
<v-data-table
  :headers="headers"
  :items="items"
  :footer-props="footerProps"
  :no-data-text="noDataText"
  :disable-sort="!sort"
  :mobile-breakpoint="mobileBreakpoint"
  :hide-default-header="hideDefaultHeader"
  :hide-default-footer="hideDefaultFooter"
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
      noDataText: 'なし',
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
    mobileBreakpoint: {
      default: 480,
    },
    hideDefaultHeader: {
      default: false,
    },
    hideDefaultFooter: {
      default: false,
    }
  }
}
</script>