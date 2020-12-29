<template>
<v-app-bar
  color="white"
  elevation="1"
  fixed
  app
>
  
  <v-toolbar-items>
    <btn-base
      class="px-0"
      aria-label="to-top"
      @click="home()"
      :text="true"
    >
      
      <img src="~/assets/logo.svg" style="height:56px;" class="pa-2" alt="" />
    
      <v-toolbar-title>
        <span class="text-h6 text-sm-h5 font-weight-black">col</span>
        <span class="caption">カル</span>
      </v-toolbar-title>
      
    </btn-base>
  </v-toolbar-items>
  
  <v-spacer></v-spacer>
  
  <v-toolbar-items>
    <template v-for="btn in btns">
    <btn-link
      :path="btn.path"
      class="px-1 px-sm-3"
      :small="$vuetify.breakpoint.xs"
      :text="true"
    >
      {{ btn.label }}
    </btn-link>
    </template>
    
    <template v-if="menus">
    <v-menu offset-y>
      
      <template v-slot:activator="{ on, attrs }">
        <div class="pl-1 align-self-center">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :small="$vuetify.breakpoint.smAndUp"
          :x-small="$vuetify.breakpoint.xs"
          outlined
          fab
          text
        >
          <v-icon>mdi-account-cog</v-icon>
        </v-btn>
        </div>
      </template>
      
      <v-list>
        <template v-for="menu in menus">
        <v-list-item @click="click(menu)">
          <v-list-item-title>{{ menu.label }}</v-list-item-title>
        </v-list-item>
        </template>
      </v-list>
      
    </v-menu>
    </template>
    
  </v-toolbar-items>
  
</v-app-bar>
</template>

<script>
export default {
  methods: {
    async click (menu) {
      if (menu && menu.type === 'logout') {
        await this.$store.dispatch('auth/logout').catch(e => {})
      }
      else {
        this.$router.push(menu.path)
      }
    },
    home () {
      this.$router.push('/')
    }
  },
  props: {
    btns: {
      type: Object,
      default: () => {},
    },
    menus: {
      type: Object,
      default: () => {},
    }
  }
}
</script>