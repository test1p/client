<template>
<btn-base
  :color="color"
  :elevation="(icon || outlined || text)? undefined : elevation"
  :loading="loading"
  :disabled="disabled"
  :block="block"
  :icon="icon"
  :outlined="outlined"
  :text="text"
  :small="small"
  @click="click(path)"
>
  <slot />
</btn-base>
</template>

<script>
export default {
  methods: {
    async click (id) {
      const res = await this.$axios.$get(`/api/game/${id}/entry`).catch(e => {})
      const data = res ? res.data : null
      
      if (!data) return
      
      const text = this.createConfirm(data)
      
      if (confirm(text)) {
        await this.$axios.$post(`/api/game/${id}/entry`, data).catch(e => {})
      }
    },
    createConfirm (data) {
      const text = {
        event_name: 'イベント',
        event_class_name: 'クラス',
        belonging: '所属',
        timekeeping_card_num: data.timekeeping_card_name || null,
        ticket_cost: '消費チケット'
      }
      let confirm = '以下の内容でエントリーを確定します\n'
      Object.keys(data).forEach(x => {
        if (!text[x]) return
        
        const val = (text[x] === '所属')? data[x] || '' : data[x]
        confirm += `\n${text[x]}：${val}`
      })
      return confirm
    }
  },
  props: {
    color: {
      default: undefined
    },
    elevation: {
      default: undefined
    },
    loading: {
      default: false
    },
    disabled: {
      default: false
    },
    block: {
      default: false
    },
    icon: {
      default: false
    },
    outlined: {
      default: false
    },
    text: {
      default: false
    },
    small: {
      default: false
    },
    path: {
      default: null
    }
  }
}
</script>