<template>
<v-container>
  
  <row-base>
    <text-title>
      管理
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
  middleware: 'isAdmin',
  data() {
    return {
      items: [
        {
          headers: [
            { text: 'ユーザー' },
          ],
          btns: [
            { label: '一覧', path: '/admin/user' },
            { label: '登録', path: '/admin/user/create' },
          ]
        },
        {
          headers: [
            { text: '振込' },
          ],
          btns: [
            { label: '一覧', path: '/admin/transfer' },
            { label: '登録', path: '/admin/transfer/create' },
          ]
        },
        {
          headers: [
            { text: 'チケット' },
          ],
          btns: [
            { label: '追加', path: '/admin/ticket/create' },
          ]
        },
      ]
    }
  }
}
</script>