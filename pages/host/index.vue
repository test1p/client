<template>
<v-container>
  
  <row-base>
    <text-title>
      運営
    </text-title>
  </row-base>
  
  <template v-for="item in items">
  <row-base class="pb-16">
    <table-detail :headers="item.headers" :btns="item.btns" />
  </row-base>
  </template>
        
</v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          headers: [
            { text: 'イベント' },
          ],
          btns: [
            { label: '一覧', path: '/host/event' },
            { label: '登録', path: '/host/event/create' },
          ]
        },
        {
          headers: [
            { text: '振込先口座' },
          ],
          btns: [
            { label: '一覧', path: '/host/transferAccount' },
            { label: '登録', path: '/host/transferAccount/create' },
          ]
        },
      ]
    }
  },
}
</script>