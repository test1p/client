<template>
<v-footer>
  <v-container class="py-0">
      
    <v-row justify="center" class="py-3">
      <template v-for="(btn,i) in btns">
      <btn-link
        :path="btn.path"
        :disabled="btn.disabled"
        small
        :text="true"
      >
        {{ btn.label }}
      </btn-link>
      </template>
    </v-row>
    
    <v-row justify="center">
      <span class="text-center caption">
        {{ copyright }}
      </span>
    </v-row>
    
  </v-container>
</v-footer>
</template>

<script>
export default {
  data () {
    return {
      copyright: '©2020 col',
      btns: {
        user: {
          label: '使い方',
          path: 'https://info.create-o-life.com//howToUse',
          disabled: true,
        },
        logout: {
          label: 'お問い合わせ',
          path: 'https://info.create-o-life.com//contactUs',
          disabled: true,
        },
        scta: {
          label: '特定商取引法に基づく表示',
          path: 'https://info.create-o-life.com//scta',
        },
        tos: {
          label: '利用規約',
          path: 'https://info.create-o-life.com//termsOfService',
          disabled: true,
        },
        privacy: {
          label: 'プライバシーポリシー',
          path: 'https://info.create-o-life.com//privacy',
          disabled: true,
        },
        security: {
          label: 'セキュリティ',
          path: 'https://info.create-o-life.com//security',
          disabled: true,
        }
      }
    }
  }
}
</script>