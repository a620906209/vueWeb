<template>
<div class="productsAll">
    <h2>{{nowSelect}}</h2>
    <b-col xl='3' lg='4' md='4' sm='6' cols='6' v-for="product in proNameSort">
        <router-link :to="{name: 'Product' ,query:{id: product.productId}}">
            <img :src="product.one_img">
            <p>{{product.productName}}</p>
        </router-link>
    </b-col>
    <router-view></router-view>
</div>
</template>

<script>

import axios from 'axios';

export default {
    metaInfo() {
        return{
            title: this.nowSelect
        }
    },
    data(){
        return{
            nowSelect: '',
            products: ''
        }
    },
    created(){
        this.getRouteData();
    },
    watch: {
        '$route': 'getRouteData'
    },
    computed: {
      proNameSort: function () {
        if(this.products){
          return this.sortName(this.products,'productName')
        }
      }
    },
    methods:{
        getRouteData() {
            if(this.$route.query.nowClass){
                this.nowSelect = this.$route.query.nowClass;
                axios
                  .get('/admin/fetch/fetch_class_product.php?class=' + this.nowSelect)
                  .then(res=>{
                                this.products = res.data
                            });
            }else if(this.$route.query.nowKind){
                this.nowSelect = this.$route.query.nowKind;
                axios
                  .get('/admin/fetch/fetch_class_product.php?kind=' + this.nowSelect)
                  .then(res=>{
                                this.products = res.data
                            });
            }
        },
        sortName(array,key){
            return array.sort(function(a,b){
                var x = a[key];
                var y = b[key];

                //先判斷第一個字母是否一樣，判斷是否同一個系列
                if(x[0] == y[0]){
                    //判斷長度，越長代表數字越大則越後
                    if (x.length < y.length){
                            return -1
                    //同上
                    }else if(x.length > y.length){
                        return 1
                    //這裡只剩下長度一樣的，所以可以直接座大小比較
                    }else{
                        return x<y?-1:1
                    }
                //第一個字母比較小則直接排前位
                }else if(x[0]<y[0]){
                    return -1
                //反之則排後位
                }else{
                    return 1
                }
            })
        }
    },
    mounted(){
    }
}
</script>


<style scoped lang="sass">
  @import './lib/sass/collectionList.sass'
</style>

