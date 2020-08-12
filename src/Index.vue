<template>
<div>
  <div class='content'>
    <!-- --------1---------- -->
    <b-carousel
      id='carousel-fade'
      style='text-shadow: 0px 0px 2px #000'
      fade
      indicators
    >
      <b-carousel-slide
        v-for='slide in slidesSort'
        :img-src='slide.slide_img'
      >
      </b-carousel-slide>
    </b-carousel>
    <div class='newsList'>
      <h5 class='RWDText'>NEWS</h5>
      <div class='newsContent'>
          <router-link lg='4' md='10' sm='10' cols='11' class='newsItem' v-for="news in newss.slice(0,3)" :to="{name: 'News'}">
          <img :src="news.banner">
          <p class='caption'>{{news.img_alt}}</p>
          </router-link>
      </div>
    </div>
    <b-container class='bv-example-row' fluid>
      <b-row class='text-center in_product_all'>
        <div class='product_btn left_btn' @click="indexProductClick('left')">
          <img src='../src/assets/leftB.png' alt="">
        </div>
        <b-col class="indexProduct" xl='2' lg='2' md='3' sm='4' cols='6' v-for="in_product in in_productsSort">
          <router-link :to="{name: 'Product',query:{id: in_product.id}}">
          <img :src="in_product.img" :alt="in_product.img_alt">
          <p>{{in_product.img_alt}}</p>
          </router-link>
        </b-col>
        <div class='product_btn right_btn' @click="indexProductClick('right')">
          <img src='../src/assets/rightB.png'>
        </div>
      </b-row>
    </b-container>
  </div>
</div>
</template>
<script >
import axios from 'axios';
 export default {
    metaInfo() {
      return{
        title: 'LOPHURA'
      }
    },
    data(){
        return{
            slides: '',
            newss: '',
            in_products: '',
            screenWidth: document.body.clientWidth,
            in_pro_width : 0,
            in_pro_num: 0,
            in_pro_long: 0,
            in_pro_left: 0
        }
    },
    watch: {
      screenWidth (val) {
          if (!this.timer) {
              this.screenWidth = val
              this.timer = true
              var vm = this
              setTimeout(function () {
                  vm.indexProductWidth()
                  vm.timer = false
              }, 400)
          }
      }
    },
    computed:{
      in_productsSort: function () {
        if(this.in_products){
          return this.sortNum(this.in_products,'order_num')
        }
      },
      slidesSort: function () {
        if(this.slides){
          return this.sortNum(this.slides,'order_num')
        }
      },
      newsSort: function () {
        if(this.newss){
          return this.sortNum(this.newss,'order_num')
        }
      }
    },
    methods:{
      sortNum(array,key){
        return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return ((x<y)?-1:(x>y)?1:0)
        })
      },
      indexProductWidth () {
        var vm = this
        var elem = document.getElementsByClassName('in_product_all')[0],
        properties = window.getComputedStyle(elem, null),
        width = parseInt(properties.width),
        padding_left = parseInt(properties.paddingLeft);
        var in_product_actual_width = width - (padding_left*2)

        var indexProduct = document.getElementsByClassName('indexProduct')
        //-30是因為內有padding
        var in_pro_width = indexProduct[0].offsetWidth
        var now_pro_visible = Math.round(in_product_actual_width / in_pro_width)
        var in_pro_all_long = indexProduct.length
        vm.in_pro_long = in_pro_all_long - now_pro_visible
        vm.in_pro_width = in_pro_width
        //若變更螢幕大小 left num 回歸至0
        vm.in_pro_num = 0
        vm.in_pro_left = 0
        for (var i = 0; i < indexProduct.length; i++) {
          indexProduct[i].style.left = (-vm.in_pro_left)+'px'
        }
        var rightBtn = document.getElementsByClassName('right_btn')[0]
        var leftBtn = document.getElementsByClassName('left_btn')[0]
        leftBtn.style.display = 'none'
        if(vm.in_pro_long == 0){
          rightBtn.style.display = 'none'
        }else{
          rightBtn.style.display = 'block'
        }

      },
      indexProductClick(path) {
        var vm = this
        var rightBtn = document.getElementsByClassName('right_btn')[0]
        var leftBtn = document.getElementsByClassName('left_btn')[0]
        if(path == 'right'){
          if(vm.in_pro_long - vm.in_pro_num > 0){
            vm.in_pro_num +=1
            leftBtn.style.display = 'block'
            if(vm.in_pro_long == vm.in_pro_num){
              rightBtn.style.display = 'none'
            }
          }

        }else if(path == 'left'){

          if(vm.in_pro_num > 0){
            rightBtn.style.display = 'block'
            vm.in_pro_num -=1
            if(vm.in_pro_num == 0){
              leftBtn.style.display = 'none'
            }
          }

        }else{

          return

        }
        vm.in_pro_left = vm.in_pro_width * vm.in_pro_num
        var indexProduct = document.getElementsByClassName('indexProduct')
        for (var i = 0; i < indexProduct.length; i++) {
          indexProduct[i].style.left = (-vm.in_pro_left)+'px'
        }
      }
    },
    mounted(){
      //axios 使用
        function getSlides () {
          return axios.get('/admin/fetch/fetch_slides.php')
        }
        function getNewss () {
          return axios.get('/admin/fetch/fetch_news.php')
        }
        function getin_product () {
          return axios.get('/admin/fetch/fetch_index_product.php')
        }
        var vm = this
        axios.all([getSlides (), getNewss (), getin_product()])
          .then(axios.spread((fncSlides, fncNewss, fncInProduct)=>{
            vm.slides = fncSlides.data
            vm.newss = fncNewss.data
            vm.in_products = fncInProduct.data
            //排序
            //dom載入完再執行產品項目寬度
            this.$nextTick(function () {
                this.indexProductWidth()
              })
          }
        ))
          .catch(error => console.log(error))

        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                vm.screenWidth = window.screenWidth
            })()
        }
    }
  }
</script>


<style scoped lang="sass">
  @import './lib/sass/index.sass'
</style>