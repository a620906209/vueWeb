
<template>
  <div id="app">
      <router-view id="header" name="title"></router-view>
      <hr>
      <router-view v-bind:style="{minHeight: centerHeight+'px'}" class="appMain"></router-view>

      <router-view id="footer" name="footer"></router-view>
  </div>
</template>
<script> 
  
export default{
  name: 'App',
  data(){
    return {
      centerHeight: 0,
      footerHeight: 0,
      headerHeight: 0
    }
  },
  mounted(){
    this.footerHeight = document.getElementById('header').clientHeight
    this.footerHeight = document.getElementById('footer').clientHeight
    this.centerHeight = document.documentElement.clientHeight - this.footerHeight - this.footerHeight
    window.onresize=()=> 
      {
        this.footerHeight = document.getElementById('header').clientHeight
        this.footerHeight = document.getElementById('footer').clientHeight
        this.centerHeight = document.documentElement.clientHeight - this.footerHeight - this.footerHeight + 5
      }

  },
  metaInfo: {
    meta: [

      {
        charset: 'utf-8'
      },

      {
        httpEquiv: 'X-UA-Compatible', 
        content: 'IE=8, IE=9, IE=Edge'
      },

      {
        name: 'viewport', 
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },

      {
        name: 'format-detection',
        content: 'Lophura has all kinds of bike accessories like bar tapes, grips, saddle and bike bags for frame bags, saddle bags, and shoulder bags.'
      },

      {name: 'keywords',
        content: 'LOPHURA'}

    ]
  }
}
</script>

<style scoped lang="sass">
  @import './lib/sass/app.sass'
</style>