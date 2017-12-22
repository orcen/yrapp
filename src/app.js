// Main Import
import Vue from 'vue';

// Router import
import Router from 'vue-router';
Vue.use(Router);

// Resource Import
import VueResource from 'vue-resource';

// Vue.use(VueResource);

/** Pages **/
import PageHome from './pages/home.vue';
import PageObjects from './pages/objects.vue';
import PageObjectSingle from './pages/object_single.vue';

/** Components */
import AppNavigation from './components/layout/header/navigation.vue';
// import myObject from './components/block/block.vue';


const routes = [
	{ name: 'home', path : '/', component: PageHome },
	{ name : 'objects', path : '/objects/:page', component: PageObjects, params : { page: 1 } },
	{ name : 'objectSingle', path : '/object/:id', component: PageObjectSingle }
];



const router = new Router({
  routes, // short for `routes: routes`
  // mode : 'history',
  // base : __dirname
});

const Assets = '../../../assets/';
const Images = '../../../assets/images/';


import './includes/filters.js';

Vue.component( 'list-object', {
	props : ['item'],
	template : '#object-template'
});
Vue.component( 'app-logo', {
	template : '<div class="header-logo"><img width="80" height="80" class="logo" :src="this.imageSrc" /></div>',
	data () {
		return {
			'imageSrc' : require( 'assets-images/logo.png' )
		}
	}
});
var app = new Vue({
	el: '#app',

	// Constants
	router,
	Assets,
	Images,

	// Components
	components : {
		'app-navigation' : AppNavigation,
		// 'app-collapsible' : myCollapsible
	},

	// Data
	data() {
		return {}
	},

	// Methods
	methods : {
	},

	// Functions
	functions : {

	},

	beforeMount() {
		// console.dir( this );
		// this.fetchData();
	}
})