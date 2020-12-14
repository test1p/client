<template>
<col-base>
  
  <template v-if="type === 'text' || type === 'integer' || type === 'name' || type === 'furigana'">
    <input-text :label="label" :val.sync="setVal" :rules="rules" :show="show" @change="replace" />
  </template>
  
  <template v-else-if="type === 'password'">
    <input-text :label="label" :val.sync="setVal" :rules="rules" :show="show" password="true" />
  </template>
  
  <template v-else-if="type === 'date'">
    <input-date :label="label" :val.sync="setVal" :rules="rules" :show="show" :max="max" :min="min" />
  </template>
  
  <template v-else-if="type === 'date-birth'">
    <input-date-birth :label="label" :val.sync="setVal" :rules="rules" :show="show" />
  </template>
  
  <template v-else-if="type === 'time'">
    <input-time :label="label" :val.sync="setVal" :rules="rules" :show="show" :max="max" :min="min" />
  </template>
  
  <template v-else-if="type === 'datetime'">
    <input-datetime :label="label" :val.sync="setVal" :rules="rules" :show="show" :max="max" :min="min" />
  </template>
  
  <template v-else-if="type === 'address'">
    <input-address :label="label" :val.sync="setVal" :rules="rules" :show="show" />
  </template>
  
  <template v-else-if="type === 'switch'">
    <input-switch :label="label" :val.sync="setVal" :rules="rules" :show="show" />
  </template>
  
  <template v-else-if="type === 'select'">
    
    <template v-if="items">
    <input-select :label="label" :val.sync="setVal" :rules="rules" :show="show" :items="items" :item_text="item_text" :item_val="item_val" multiple />
    </template>
    
    <template v-else>
    <input-select-api :label="label" :val.sync="setVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" multiple />
    </template>
    
  </template>
  
  <template v-else-if="type === 'select-solo'">
    
    <template v-if="items">
    <input-select :label="label" :val.sync="setVal" :rules="rules" :show="show" :items="items" :item_text="item_text" :item_val="item_val" />
    </template>
    
    <template v-else>
    <input-select-api :label="label" :val.sync="setVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" />
    </template>
    
  </template>
  
  <template v-else-if="type === 'combo'">
    
    <template v-if="items">
    <input-combo :label="label" :val.sync="setVal" :rules="rules" :show="show" :items="items" :item_text="item_text" :item_val="item_val" multiple />
    </template>
    
    <template v-else>
    <input-combo-api :label="label" :val.sync="setVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" multiple />
    </template>
    
  </template>
  
  <template v-else-if="type === 'combo-solo'">
    
    <template v-if="items">
    <input-combo :label="label" :val.sync="setVal" :rules="rules" :show="show" :items="items" :item_text="item_text" :item_val="item_val" />
    </template>
    
    <template v-else>
    <input-combo-api :label="label" :val.sync="setVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" />
    </template>
    
  </template>
  
  <template v-else-if="type === 'pair'">
    <input-pair :label="label" :val.sync="setVal" :rules="rules" :show="show" :path="path" :item_text="item_text" :item_val="item_val" />
  </template>
  
  <template v-else-if="type === 'search'">
    <input-search :label="label" :val.sync="setVal" :rules="rules" :show="show" :proxy="proxy" :path="path" :wrapper="wrapper" :item_text="item_text" :item_val="item_val" multiple />
  </template>
  
  <template v-else-if="type === 'search-solo'">
    <input-search :label="label" :val.sync="setVal" :rules="rules" :show="show" :proxy="proxy" :path="path" :wrapper="wrapper" :item_text="item_text" :item_val="item_val" />
  </template>
  
  <template v-else-if="type === 'venue'">
    <input-venue :label="label" :val.sync="setVal" :rules="rules" :show="show" />
  </template>
  
</col-base>
</template>

<script>
export default {
  computed: {
    setVal: {
      get () { return this.val },
      set (newVal) { return this.$emit('update:val', newVal) }
    }
  },
  methods: {
    replace () {
      if (this.type === 'integer') {
        const newVal = this.val
          .replace(/[０-９]/g, s => {
              return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
          })
          .replace(/[-‐―－ー]/g, '')
          .replace(/\s+/g, '')
        this.$emit('update:val', newVal)
      }
      else if (this.type === 'name') {
        const newVal = this.val
          .replace(/[-‐―－]/g, 'ー')
          .replace(/\s+/g, '')
        this.$emit('update:val', newVal)
      }
      else if (this.type === 'furigana') {
        const  newVal = this.val
          .replace(/[ァ-ン]/g, s => {
            return String.fromCharCode(s.charCodeAt(0) - 0x60)
          })
          .replace(/[-‐―－]/g, 'ー')
          .replace(/\s+/g, '')
        this.$emit('update:val', newVal)
      }
    }
  },
  props: {
    label: {
      default: null,
    },
    val: {
      default: null,
    },
    type: {
      default: 'text',
    },
    rules: {
      type: Array,
      default: () => {},
    },
    show: {
      default: true,
    },
    proxy: {
      default: '/api',
    },
    path: {
      default: null,
    },
    wrapper: {
      default: 'data',
    },
    items: {
      type: Array,
      default: () => {},
    },
    item_text: {
      default: 'id',
    },
    item_val: {
      default: 'id',
    },
    max: {
      default: undefined,
    },
    min: {
      default: undefined,
    },
  }
}
</script>