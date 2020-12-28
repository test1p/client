<template>
<v-container>
        
  <row-base>
    <text-title>
      振込先口座登録
    </text-title>
  </row-base>
  
  <row-base>
    <form-post :inputs="inputs" />
  </row-base>
  
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      inputs: {
        destination_bank: { label: '銀行名', val: null, rules: ['required'] },
        destination_branch: { label: '支店名', val: null, rules: ['required'] },
        type: { label: '口座種別', val: null, rules: ['required'], type: 'select-solo', items:['普通', '当座'] },
        num: { label: '口座番号', val: null, rules: ['required'], type: 'integer' },
        holder: { label: '名義', val: null, rules: ['required'] },
      }
    }
  }
}
</script>