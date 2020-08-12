<template>
<div class="product">
	<div class="productAll"
		v-for="product in productOnly_"
	>
		<h2 id="productTitle" v-if="product.catena_name === '無系列'">
			{{product.kind_name}}
		</h2>
		<h2 v-else>
			{{product.catena_name}}
			<span></span>
			{{product.productName}}
		</h2>
		<div
			v-for="(color_apart, index) in product.product_img"
			class="productImgs"
		>
		<!-- 點擊照片放大時的div -->
			<div class="lightboxDiv">
				<img class="lightBoxImg" :src="nowWatchImg">
				<div class="lightLoading"><img src="./assets/loading.gif"></div>
				<div @click="lightButton('left',index)" class="button buttonLeft">
					<img src="../src/assets/left.png" alt="">
				</div>
				<div @click="lightButton('right',index)" class="button buttonRight">
					<img src="../src/assets/right.png">
				</div>
				<div @click="lightButton('space',index)" class="buttonAll"></div>

			</div>
			<!-- 大張照片放置處 -->
			<div class="nowWatchProducts"
				id="magnifierBox"
				@click="lightBox(color_apart,index)">
				<img :src=nowWatchImg>
				<div class="watchBigProducts" id="bigProductImg">
					<img :src="nowWatchImg">
				</div>
			</div>
			<!-- 小張照片放置處 -->
			<div class="listProducts">
				<div v-for="(product_img, index) in color_apart"
					class="liProduct"
					:class="{'liProductHover':!index}"
				>
					<img @click="nowWatchChange(product_img,index);nowImgOpacity($event)"
						:src=product_img
					>
				</div>
			</div>
		</div>
		<div class="format">
			<div>
			  <h4 v-if="product.catena_name === '無系列'">{{product.productName}}</h4>
			  <h4 v-else>{{product.kind_name}}</h4>
			  <li v-for="(proMaterial,index) in product.material">
				<span v-if="index === 0">Material</span>
				<span v-else></span>
				{{proMaterial}}
			  </li>
			  <li v-for="(proSpec,index) in product.spec">
				<span v-if="index === 0">Spec</span>
				<span v-else></span>
				<p v-html="proSpec" style="display: inline-block"></p>
			  </li>
			  <li><span>MSRP</span>
				USD$ {{product.price}}
			  </li>
			  <li class="colorAll">
				<span>Color</span>
				<div 
					class="colorLi"
					v-for="(proColor,index) in product.color" 
					v-on:click="productStart(index);magnifier(index);"
					v-if="proColor[0]==='#'"
					:style="{backgroundColor: proColor}"
				>
				</div>
				<div 
					class="colorLi"
					v-on:click="productStart(index);magnifier(index);"
					v-else
					:style="{backgroundImage: 'url('+proColor+')'}"
				></div>
			  </li>
			</div>
		</div>
		<div class="LivePhoto">
			<img :src="liveImg" alt="" v-for="liveImg in product.live_img">
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios';

export default {
	metaInfo() {
		return {
			title: this.productName
		}
	},
	data() {
		return{
			//當前商品id
			nowId: '',
			//當前所有商品資訊
			productOnly_ : '',
			//當前產品名稱
			productName: '',
			//當前所觀看產品的照片
			nowWatchImg: '',
			//燈箱第幾個
			lightButtonNum: 0,
			//當前產品照的總資訊
			lightImgData: ''
		}
	},
	created(){
		this.getProductName()
	},
	watch: {
		'$route': 'getProductName'
	},
	mounted() {
	},
	methods:{
		getProductName () {
			this.nowId=this.$route.query.id
			axios
				  .get('/admin/fetch/fetch_product.php?id=' + this.nowId + '')
				  .then(res=>{
								this.productOnly_ = res.data
								this.decideFormat()
								//Dom載入後執行
								this.$nextTick(function () {
									this.productStart()
									this.magnifier()
								})
							})
		},
		// 敘述文字解析
		decideFormat () {
			//材質
			var productData = this.productOnly_[0]
			var fncMaterial = productData.material.split(",")
			this.productOnly_[0].material = fncMaterial
			this.productName = productData.productName
			//尺寸驗證是否有分數
			var specData = productData.spec
			var specLength = specData.length
			var newSpec = ''
			for (var i = 0 ; i < specLength; i++) {
				if(specData[i] === '/'){
					//刪除'/'前一位，順序不能調換
					newSpec = newSpec.substring(0,newSpec.length-1)
					//新增html上標與下標籤
					newSpec += '<sup>' + specData[i-1] + '</sup>/' + '<sub>' + specData[i+1] + '</sub>'
					//將'/'後面那一位自動省略
					i+=1
				}else{
					newSpec += specData[i]
				}
			}
			this.productOnly_[0].spec = newSpec
			//尺寸
			var fncSpec = productData.spec.split(",")
			this.productOnly_[0].spec = fncSpec
			//顏色
			var fncColor = productData.color.split(",")
			this.productOnly_[0].color = fncColor
		},
		//顯現產品照第幾張
		productStart (index) {
			this.lightButtonNum = 0
			var nowNumber = index || 0
			var productOnlyImgLong = this.productOnly_[0].product_img.length
			var liProductsImg = document.getElementsByClassName("productImgs")
			for(var i = 0; i < liProductsImg.length; i++){
				liProductsImg[i].classList.add("notNowColor")
				var lightBox = liProductsImg[i].getElementsByClassName('lightboxDiv')
				lightBox[0].classList.remove('lightBoxNone')
				if(i === nowNumber){
					liProductsImg[i].classList.remove("notNowColor")
				}
				//選定產品照第一個顏色且第一個商品
				this.nowWatchImg = this.productOnly_[0].product_img[nowNumber][0]
			}
			//導正小圖產品照透明度應該為1的照片
			var listProducts = document.getElementsByClassName('listProducts')
			var liProducts = listProducts[nowNumber].getElementsByClassName("liProduct")
			for (var j = 0; j < liProducts.length; j++) {
				liProducts[j].classList.remove('liProductHover')
			}
			liProducts[this.lightButtonNum].classList.add('liProductHover')
		},
		//切換產品照照片
		nowWatchChange (product_img,lightButtonNum) {
				this.lightButtonNum = lightButtonNum
				this.nowWatchImg = product_img
		},
		//選中當前產品照顯示
		nowImgOpacity(e){
			var startImgOpacity
			if(!e){
				startImgOpacity = 0
			}
			if(startImgOpacity === 0){

			}
			var liProduct = document.getElementsByClassName('liProduct')
			for(var i = 0; i < liProduct.length; i++){
				// liProduct[i].style.opacity = 0.6
				liProduct[i].classList.remove('liProductHover')
			}
			e.target.parentNode.classList.add('liProductHover')
		},
		//左右第幾張
		lightButton (path,index) {
		// lightButton (nowWatchImg,path) {
			var vm = this
			var imgTotal = vm.lightImgData.length
			var lightBlockAll = document.getElementsByClassName("lightboxDiv")[index]
			var buttonLeft = lightBlockAll.getElementsByClassName("buttonLeft")
			var buttonRight = lightBlockAll.getElementsByClassName("buttonRight")
			if(path == 'left' && vm.lightButtonNum > 0){
				vm.lightButtonNum -=1
				if(vm.lightButtonNum == 0){
					//
					buttonLeft[0].classList.add('buttonNone')
				}else{
					buttonLeft[0].classList.remove('buttonNone')
				}
				buttonRight[0].classList.remove('buttonNone')
				vm.lightLoadingFc(lightBlockAll)
			}else if(path == 'right' && vm.lightButtonNum < (imgTotal-1)){
				vm.lightButtonNum +=1
				if(vm.lightButtonNum < (imgTotal-1)){
					buttonRight[0].classList.remove('buttonNone')
					buttonLeft[0].classList.remove('buttonNone')
				}else{
					buttonRight[0].classList.add('buttonNone')
					buttonLeft[0].classList.remove('buttonNone')
				}
				vm.lightLoadingFc(lightBlockAll)
			}else if(path === 'space'){
				// lightBlockAll.classList.add("lightBoxNone");
				lightBlockAll.classList.add("lightBoxNone")
				lightBlockAll.classList.remove("lightBoxBlock")
			}
			var nowProImg = vm.lightImgData[vm.lightButtonNum]
			vm.nowWatchChange(nowProImg,vm.lightButtonNum)
			//更換小圖的透明度變化
			var listProductsIndex = document.getElementsByClassName('listProducts')[index]
			var liProduct = listProductsIndex.getElementsByClassName('liProduct')
			for (var i = 0; i < liProduct.length; i++) {
				if(i == vm.lightButtonNum){
					liProduct[i].classList.add('liProductHover')
				}else{
					liProduct[i].classList.remove('liProductHover')	
				}
			}

		},
		lightLoadingFc(lightBlockAll){
			//loading 載入及刪除
			//兩個元素都只有當前元素唯一一個class
			var lightLoading = lightBlockAll.getElementsByClassName('lightLoading')[0]
			var lightImg = lightBlockAll.getElementsByClassName('lightBoxImg')[0]
			lightLoading.classList.add('lightLoadingBlock')
			lightLoading.classList.remove('lightLoadingNone')
			lightImg.onload = function () {
				var lightImgWidth = lightImg.offsetWidth
				var lightImgHeight = lightImg.offsetHeight
				lightLoading.style.width = lightImgWidth + 'px'
				lightLoading.style.height = lightImgHeight + 'px'
				// 設置延遲關閉否則loading的動畫還沒跑完就會關閉
				setTimeout(function () {
					lightLoading.classList.remove('lightLoadingBlock')
					lightLoading.classList.add('lightLoadingNone')
				},200)

			}
		},
		//大張照片顯示
		lightBox (color_apart,index) {
			this.lightButtonNum = this.lightButtonNum||0
			this.lightImgData = color_apart
			//全螢幕產品照展開
			var lightBlockAll = document.getElementsByClassName("lightboxDiv")[index]
			lightBlockAll.classList.add("lightBoxBlock")
			lightBlockAll.classList.remove("lightBoxNone")

			//判斷是否第一張或者最後一張，若是則button左或右隱藏
			//img總數
			var imgTotal = this.lightImgData.length
			var buttonLeft = lightBlockAll.getElementsByClassName('buttonLeft')
			var buttonRight = lightBlockAll.getElementsByClassName('buttonRight')
			if(this.lightButtonNum == 0){
				buttonRight[0].classList.remove('buttonNone')
				buttonLeft[0].classList.add('buttonNone')
				
			}else if(this.lightButtonNum == (imgTotal-1)){
				buttonLeft[0].classList.remove('buttonNone')
				buttonRight[0].classList.add('buttonNone')
			}else{
				buttonRight[0].classList.remove('buttonNone')
				buttonLeft[0].classList.remove('buttonNone')
			}
			if(imgTotal==1){
				buttonRight[0].classList.add('buttonNone')
				buttonLeft[0].classList.add('buttonNone')
			}
			//打開時應先將loading的div大小設定與第一張img一樣大
			var lightLoading = lightBlockAll.getElementsByClassName('lightLoading')[0]
			var lightImg = lightBlockAll.getElementsByClassName('lightBoxImg')[0]
			var lightImgWidth = lightImg.offsetWidth
			var lightImgHeight = lightImg.offsetHeight
			lightLoading.style.width = lightImgWidth + 'px'
			lightLoading.style.height = lightImgHeight + 'px'
		},
		//放大鏡
		magnifier (numColor) {
			// 綁定當前顏色底下的div
			var num = numColor || 0
			var boxAll = document.getElementsByClassName("nowWatchProducts")[num]
			var boxChildImg = boxAll.firstChild
			var bigBoxAll = document.getElementsByClassName("watchBigProducts")[num]
			var bigChildImg = bigBoxAll.firstChild
			var mouseOn = true
			//與 onmousemove 內設定高度一樣，只是因css問題 footer 無法緊貼下方，故而一開始執行先抓取高度讓中間內容物可以完整撐滿中間位置
			var startBoxHeight = boxAll.offsetHeight
				bigBoxAll.style.height = startBoxHeight+'px'
			boxAll.onmousemove = function (e) {
				//放大鏡div開關
				mouseOn = true
				if(mouseOn){
					boxChildImg.style.visibility = 'hidden'
					bigChildImg.style.visibility = 'visible'
					bigBoxAll.style.opacity = 1
				//設定放大鏡div大小，因載入完畢 Dom 還未生成若放在外面則寬高異常
				var boxWidth = boxAll.offsetWidth
				var boxHeight = boxAll.offsetHeight
					bigBoxAll.style.width = boxWidth+'px'
					bigBoxAll.style.height = boxHeight+'px'
				var rect = e.target.getBoundingClientRect()
				var boxNowX = e.clientX - rect.left
				var boxNowY = e.clientY - rect.top
					bigChildImg.style.left = -boxNowX+'px'
					bigChildImg.style.top = -boxNowY+'px'
				}
			}
			boxAll.onmouseout = function () {
				//離開時關閉開關且，父元素顯現
				mouseOn = false
				boxChildImg.style.visibility = 'visible'
				bigChildImg.style.visibility = 'hidden'
			}
		}
	}
}
</script>

<style scoped lang="sass">
  @import './lib/sass/product.sass'
</style>