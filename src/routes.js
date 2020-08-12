import Vue from 'vue'
import VueRouter from 'vue-router'
//分別連結
import Home from './Home.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Index from './Index.vue'
import News from './News.vue'

import CollectionList from './CollectionList.vue'

import NotFoundComponent from './routerError.vue'

//meata 插件
import VueMeta from 'vue-meta'
//產品
import Product from './product.vue'

//子連結

//bootstrap
import BootstrapVue from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueMeta)
export default new VueRouter ({
	mode: 'history',
	base: __dirname,
	routes: [
		{name: 'Home', path: '/',
            components: {
                default: Home,
                title: Header,
                footer: Footer
            },
            children: [
                {name: 'Index', path: '', component: Index},
                {name: 'News', path: 'news', component: News},
                {name: 'CollectionList', path: 'collectionList', component: CollectionList},
                {name: 'Product', path: 'product', component: Product}
            ]
        },{
            path: '*', component: NotFoundComponent
        }
	],
    data(){
        return{
        }
    },
    mounted () {
    }
})



