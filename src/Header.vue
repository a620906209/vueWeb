<template>
<div class="title">
  <b-navbar toggleable="lg" type="light" variant="info">
    <b-navbar-brand href="#">
      <router-link class="logo" :to="{name: 'Index'}">
        <img src="../src/assets/logo_black.svg" height="450" width="600" alt="">
      </router-link>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link :to="{name: 'News'}">
            <div>News</div>
          </router-link></b-nav-item>
        <b-nav-item-dropdown text="Collection" right>
          <b-dropdown-item 
              v-if="catena.catenaName != '無系列'" 
              v-for="catena in catenas">
            <router-link :to="{name: 'CollectionList',
                          query: { nowClass: catena.catenaName}}" >
              {{catena.catenaName}}
            </router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>


        <b-nav-item-dropdown text="Products" right class="classProducts">
          <div><h5>Bags</h5>
          <b-dropdown-item v-if="kind.seat == 'left'" v-for="kind in kinds">
            <router-link :to="{name: 'CollectionList', query: { nowKind: kind.kindName}}">{{kind.kindName}}</router-link></b-dropdown-item>
          </div>
          <div><h5>Accessories</h5>
          <b-dropdown-item v-if="kind.seat == 'right'" v-for="kind in kinds"><router-link :to="{name: 'CollectionList', query: { nowKind: kind.kindName}}">{{kind.kindName}}</router-link></b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script >
import axios from 'axios';
 export default {
    data() {
      return {
            catenas: '',
            kinds: ''
      }
    },
    methods: {
    },
    mounted(){
      //axios 使用
        function getCatena () {
          return axios.get('/admin/fetch/fetch_catena.php')
        }
        function getkind () {
          return axios.get('/admin/fetch/fetch_kind.php')
        }
        var vm = this
        axios.all([getCatena (), getkind ()])
          .then(axios.spread((fncCatena, fncKind)=>{
            vm.catenas = fncCatena.data
            vm.kinds = fncKind.data
            }
          ))
          .catch(error => console.log(error))
    }
  }
</script>

<!-- <style scoped lang="sass">
  @import './lib/sass/header.sass'
</style> -->

<style lang="sass">
body,html
  .title
    .navbar
      background-color: white!important
      flex-wrap: wrap
      justify-content: center
      align-content: center
      a
        color: #333
        width: 100%
        flex-shrink: 0
        &:active
          background-color: rgba(white,0)
        img
          position: relative
          width: 90px
          height: 60px
          left: 50%
          transform: translateX(-50%)
      .navbar-collapse
        flex-grow: 0
        margin: 0px auto
        .navbar-nav
          flex-direction: row
          li
            margin: 10px 30px
            a
              color: #333
              text-decoration: none
          .nav-item
            width: 90px
            text-align: center
            .dropdown-menu
              left: 0px
              border: 0px
              transform: translateX(-50%)
              left: 50%
              li
                margin: 0px
                text-align: center
                display: inline-block
                width: 100%
                a
                  padding: 5px 0px
                  a
                    display: block
                    padding: 0px
                    width: 100%
          .classProducts
            .show
              top: 100%
              display: flex
              // top: 10px
              top: 120%
              right: auto
              padding: 5px 25px
              div
                display: flex
                flex-wrap: wrap
                h5
                  width: 100%
                  text-align: center
                li
                  width: 100%
                  a
                    padding: 5px 0px
                    a
                      width: 100%
                      padding: 0px 25px
                      display: block
      .navbar-toggler
        color: #333
        border: #333
    .collapse
      .navbar-nav
        .nav-item
@media screen and (max-width: 991px)
  body,html
    .title
      .navbar
        a
          img
        .navbar-collapse
          .navbar-nav
            flex-wrap: wrap
            li
              a
            .nav-item
              width: 100%
              margin: 5px 0px
              .dropdown-menu
                width: 100%
                left: 0px 
                transform: translateX(0%)
                padding: 0px
                margin: 0px
                li
                  margin: 0px
                  a
                    padding: 0px
                    margin: 3px 0px
                    a
                      padding: 5px 0px
            .classProducts
              .show
                justify-content: center
                div
                  width: 40%
                  h5
                  li
                    a
                      padding: 0px
                      width: 100%
                      a
                        padding: 5px 0px
        .navbar-toggler
          position: absolute
          left: 30px
          top: 25px
      .collapse
        .navbar-nav
          .nav-item
            .dropdown-menu
              li
            .show
              li
                a
                  color: #777

@media screen and (max-width: 770px)
  body,html
    .title
      .navbar
        a
          img
            width: 70px 
            height: 50px
        .navbar-collapse
          .navbar-nav
            li
              a
            .nav-item
              .dropdown-menu
                li
                  a
            .classProducts
              .show
                div
                  h5
                  li
        .navbar-toggler
          left: 20px
          top: 20px
@media screen and (max-width: 500px)
  body,html
    .title
      .navbar
        a
          padding: 3px 0px
          img
            width: 60px 
            height: 45px
        .navbar-collapse
          padding-top: 10px
          .navbar-nav
            li
              padding: 0px
              a
            .nav-item
              margin: 3px
              .dropdown-menu
                li
                  a
            .classProducts
              .show
                div
                  width: 50%
                  h5
                    margin-top: 5px
                    font-size: 16px  
                  li
        .navbar-toggler
          left: 15px
          top: 17px
          span
            width: 25px 
            height: 25px
      .collapse
        .navbar-nav
          .nav-item
            .dropdown-menu
              li
            .show
              li
                a
@media screen and (max-width: 430px)
  body,html
    .title
      .navbar
        a
          img
            width: 50px 
            height: 40px
        .navbar-collapse
          .navbar-nav
            li
              a
            .nav-item
              .dropdown-menu
                li
                  a
                    a
                      padding: 3px 0px
            .classProducts
              .show
                div
                  h5
                  li
                    a
                      a
                        padding: 3px 0px
        .navbar-toggler
          left: 10px
          top: 17px
          span
            width: 20px 
            height: 20px
      .collapse
        .navbar-nav
          .nav-item
            .dropdown-menu
              li
            .show
              li
                a
</style>
