<template>
<div>
	<h4>NEWS</h4>
	<div class="newsAll">
		<div class="news" @click="liveBlock(index)" v-for="(news,index) in newsSort">
            <div class="slideLive">
                <div class="liveDiv">
                    <div class="blackBgc" @click="liveNone"></div>
                    <img class="liveImg" src="">
                    <div class="control">
                        <a class="left controlBtn" @click="changeBackLive"></a>
                        <a class="right controlBtn" @click="changeNextLive"></a>
                        <a class="close" @click="liveNone"></a>
                        <div class="loadingImg">
                          <img class="" src="./assets/loading.gif">
                        </div>
                    </div>
                </div>
            </div>
			<div class="newsText">
				<div class="link">
					<img :src="news.min_icon" alt="">
				</div>
				<div class="backImg">
					<img :src="news.banner" alt="">
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

 export default {
    metaInfo() {
      return{
        title: 'NEWS'
      }
    },
    data(){
        return{
            newss: '',
            newsLive: '',
            LiveOn: 'true',
            liveNum: 0,
            liveLength: ''
        }
    },
    computed:{
      newsSort: function () {
        if(this.newss){
            //排序好並回傳
            return this.sortNum(this.newss,'order_num')
        }
      }
    },
    methods:{
      liveBlock: function(index) {
        var vm = this
        if(this.LiveOn){
            var nowNewsLive = this.newss[index]['news_live']
            this.newsLive = nowNewsLive
            var slideLive = document.getElementsByClassName('slideLive')[index]
            //淡入
            slideLive.classList.add('slideLiveBlock')
            //淡出
            slideLive.classList.remove('slideLiveNone')
            var liveImg = document.getElementsByClassName('liveImg')[index]
            //先隱藏完成時再顯現
            liveImg.style.opacity= 0
            liveImg.src = this.newsLive[this.liveNum]
            //loading
            var loadingImg = document.getElementsByClassName('loadingImg')[index]
            loadingImg.classList.remove('loadingNone')
            liveImg.onload = function () {
                var liveWidth = liveImg.offsetWidth
                var liveHeight = liveImg.offsetHeight
                var control = document.getElementsByClassName('control')[index]
                //左右及關閉按鈕也要淡入淡出
                var controlTagA = control.getElementsByTagName('a')
                for (var i = 0; i < controlTagA.length; i++) {
                  controlTagA[i].style.opacity= 0
                  controlTagA[i].classList.remove('slideLiveBlock')
                }
                // 按鈕div變形成img寬高
                control.style.width = liveWidth +'px'
                control.style.height = liveHeight +'px'
                //loading
                setTimeout(
                  function (){
                    //loading關閉
                    loadingImg.classList.add('loadingNone')
                    //左右及關閉按鈕也要淡入淡出
                    for (var i = 0; i < controlTagA.length; i++) {
                      controlTagA[i].classList.add('slideLiveBlock')
                    }
                    // liveImg顯示
                    liveImg.style.opacity= 1

                },500)
            }
        }else{
            this.LiveOn = true
            var slideLive = document.getElementsByClassName('slideLive')[index]
            //淡入
            slideLive.classList.remove('slideLiveBlock')
            //淡出
            slideLive.classList.add('slideLiveNone')
            // 當前live第幾張
            this.liveNum = 0
        }
      },
      liveNone(){
            this.LiveOn = false
            this.liveNum = 0
      },
      changeNextLive(){
        if(!this.liveLength){
            this.liveLength = this.newsLive.length - 1
            this.changeNextLive()
        }else if(this.liveNum < this.liveLength){
            this.liveNum+=1
        }else{
            this.liveNum = 0
        }
      },
      changeBackLive(){
            this.liveLength = this.newsLive.length - 1
        if(!this.liveLength){
            this.changeBackLive()
        }else if(this.liveNum > 0){
            this.liveNum-=1
        }else{
            this.liveNum = this.liveLength
        }
      },
      sortNum(array,key){
        return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return ((x<y)?-1:(x>y)?1:0)

        })
      }
    },
    mounted(){
        axios
          .get('/admin/fetch/fetch_news.php')
          .then(res=>{
                this.newss = res.data});

    }
}
</script>

<style scoped lang="sass">
  @import './lib/sass/news.sass'
</style>