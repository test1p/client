<template>
<v-form
  ref="form"
  v-model="valid"
>
  
  <template v-for="input in inputs">
    
    <template v-if="Array.isArray(input)">
      
      <template v-for="child in input">
      <col-base class="pt-8">
        
        <template v-if="typeof child.val === 'undefined'">
          <template v-for="grandChild in child">
          <input-all :label="grandChild.label" :val.sync="grandChild.val" :type="grandChild.type" :rules="rules(grandChild)" :show="grandChild.show" :proxy="grandChild.proxy" :path="grandChild.path" :wrapper="grandChild.wrapper" :items="grandChild.items" :item_text="grandChild.item_text" :item_val="grandChild.item_val" :max="grandChild.max" :min="grandChild.min" />
          </template>
        </template>
        
        <template v-else>
        <input-all :label="child.label" :val.sync="child.val" :type="child.type" :rules="rules(child)" :show="child.show" :proxy="child.proxy" :path="child.path" :wrapper="child.wrapper" :items="child.items" :item_text="child.item_text" :item_val="child.item_val" :max="child.max" :min="child.min" />
        </template>
      
      </col-base>
      </template>
  
      <col-base class="pb-8 px-6 text-right">
        <btn-base @click="add">
          追加
        </btn-base>
      </col-base>
      
    </template>
    
    <template v-else>
      <input-all :label="input.label" :val.sync="input.val" :type="input.type" :rules="rules(input)" :show="input.show" :proxy="input.proxy" :path="input.path" :wrapper="input.wrapper" :items="input.items" :item_text="input.item_text" :item_val="input.item_val" :max="input.max" :min="input.min" />
    </template>
    
  </template>
  
  <col-base>
    <btn-base :loading="loading" :disabled="!valid" block @click="click">
      {{ label }}
    </btn-base>
  </col-base>
  
</v-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      valid: false
    }
  },
  created () {
    const data = this.val[this.$route.path] || this.data
    if (!data) return
    
    Object.keys(data).forEach(key => {
      const val = data[key]
      const input = this.inputs[key]
      if (!input) return
      
      if (Array.isArray(input)) {
        input.forEach((child,i) => {
          if (typeof child.val === 'undefined') {
            Object.keys(child).forEach(childKey => {
            this.inputs[key][i][childKey].val = val[i][childKey]
            })
          }
          else {
            this.inputs[key][i].val = val[i]
          }
        })
      }
      else {
        this.inputs[key].val = val
      }
    })
  },
  mounted () {
    const data = this.val[this.$route.path] || this.data
    if (data) return this.$refs.form.validate()
  },
  watch: {
    formVal: {
      handler: function (val, oldVal) {
        this.$store.dispatch('commitVal', {key: this.$route.path, val: val})
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({ val:'val' }),
    formVal () {
      if (!this.inputs) return
      
      let formVal = {}
      const inputs = this.inputs
      
      Object.keys(inputs).forEach(key => {
        const input = inputs[key]
        if (Array.isArray(input)) {
          input.forEach(child => {
            if (!formVal[key]) formVal[key] = []
            
            if (typeof child.val === 'undefined') {
              let childVal = {}
              Object.keys(child).forEach(childKey => {
                const val = child[childKey].val
                childVal[childKey] = val
              })
              formVal[key] = [...formVal[key], childVal]
            }
            else {
              formVal[key] = [...formVal[key], child.val]
            }
          })
        }
        else {
          const val = input.val
          formVal[key] = val
        }
      })
      
      return formVal
    },
    setValid: {
      get () { return this.valid },
      set (newVal) { return this.$emit('update:valid', newVal) }
    },
    rules () {
      return function(input) {
        if (!input || !input.rules) return
        var rules = []
        input.rules.forEach(y => {
          if (y.includes('required')) {
            const required = v => !!v || ''
            rules = [...rules, required]
          }
          
          else if (y.includes('email')) {
            const email = v => /.+@.+\..+/.test(v) || '書式が無効です'
            rules = [...rules, email]
          }
          
          else if (y.includes('password')) {
            const password = v => /^([a-zA-Z0-9!-/:-@¥[-`{-~]{8,})$/.test(v) || '半角英数記号で8文字以上にしてください'
            rules = [...rules, password]
          }
          
          else if (y.includes('confirmation')) {
            const val = this.val[this.$route.path]
            
            if (!val) return
            
            if (val.password) {
              const confirmation = val.password === val.password_confirmation || 'パスワードと一致しません'
              rules = [...rules, confirmation]
            }
            else if (val.new_password) {
              const confirmation = val.new_password === val.new_password_confirmation || 'パスワードと一致しません'
              rules = [...rules, confirmation]
            }
          }
          
          else if (y.includes('integer')) {
            const integer = v => /^[0-9]+$/.test(v) || '整数のみ有効です'
            rules = [...rules, integer]
          }
          
          else if (y.includes('digits_between')) {
            const between = y.replace('digits_between:', '').split(',')
            const min = Number(between[0])
            const max = Number(between[1])
            const integer = v => /^[0-9]+$/.test(v) || '半角数字のみ有効です'
            const digits = v => (v && min <= v.length && v.length <= max) || `${min}～${max}桁のみ有効です`
            rules = [...rules, integer, digits]
          }
          
          else if (y.includes('digits')) {
            const num = Number(y.replace('digits:', ''))
            const digits = v => (v && v.length === num) || `${num}桁のみ有効です`
            rules = [...rules, digits]
          }
          
          else if (y.includes('hiragana')) {
            const password = v => /^[ぁ-んー]+$/u.test(v) || 'ひらがなのみ有効です'
            rules = [...rules, password]
          }
        })
        return rules
      }
    }
  },
  methods: {
    click () {
      this.$emit('click')
    },
    add () {
      this.$emit('add')
    }
  },
  props: ['data', 'inputs', 'label', 'loading']
}
</script>