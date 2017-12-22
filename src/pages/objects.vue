<template>
	<div>
		<h1>Objects</h1>
		<div>
			<app-searchobjects></app-searchobjects>
				<p>Gefundene Objekte: {{ total_count }}</p>
			<div class="objects" v-if="objects.length > 0">
				<app-objectItem v-for="( object, idx ) in objects" :objectData="object" :key="idx"></app-objectItem>
			</div>
			<span class="loader" v-else>
				Loading
			</span>
			<app-pagination :total="this.total_count" :url="this.$route.name" :perpage="this.limit"></app-pagination>
		</div>
	</div>
</template>

<script>


	import axios from 'axios';
	import VueAxios from 'vue-axios';
	import localforage from 'localforage'
	import memoryDriver from 'localforage-memoryStorageDriver'
	import { setupCache } from 'axios-cache-adapter';

	import searchForm from '../components/search_form.vue';

	/**
	 Axios Cache
	*/
	const store = localforage.createInstance({
		// List of drivers used
		driver: [
		localforage.INDEXEDDB,
		localforage.LOCALSTORAGE,
		memoryDriver
		],
		// Prefix all storage keys to prevent conflicts
		name: 'objects'
	})
	const cache = setupCache({
		maxAge: 15 * 60 * 1000,
		store
	})

	const api = axios.create({
		adapter: cache.adapter
	})

	// Components
	import objectItem from '../components/listing/yr_object.vue';
	import Pagination from '../components/pagination.vue';

	export default {
		name : 'ObjectsView',
		components : {
			'app-objectItem' : objectItem,
			'app-pagination' : Pagination,
			'app-searchobjects' : searchForm
		},
		methods : {
			fetchData : function ( filter ) {
				let page = this.$route.params.page;

				let apiParams = {
					'limit': this.limit,
					'offset' : ( ( page - 1 ) * this.limit )
				};


				if( typeof filter == "undefined" ) {

					api.get( 'http://www.advance-domains.de/yourenergy/api/4fbf7c110291fb48/LIST/objects', {
				        timeout : 10000,
				        withCredentials : false,
						params : apiParams,
						responseType : 'json'
					})
					.then( response => {
						this.total_count = parseInt( response.data.HEAD.objects_total );
						// this.limit = response.data.HEAD.limit;
						this.objects = response.data.DATA.objects;
					})
					.catch( e => {
						console.log( e );
					});
				}
				else {

					// filterData = [
					// 	'filter' => true,
					// 	'transactionType' => $_GET['anlageart'],
					// 	'systemType' => $searchSystemType ? join('|',$searchSystemType) : false,
					// 	// 'country' => $searchCountry ? join('|',$searchCountry) : false,
					// 	// 'onlineFrom' =>  gmmktime (0,0,0,1,1, $searchOnlineFrom ),
					// 	'projectSize' => $searchProjectSize,
					// );
					apiParams.filter = true;

					// filter.forEach( function( param, idx ){
					// 	console.log( idx, param );
					// });

					Object.keys(filter).map(function(objectKey, index) {
					    apiParams[objectKey] = filter[objectKey];
					    // console.log(value);
					});

					api.get( 'http://www.advance-domains.de/yourenergy/api/4fbf7c110291fb48/FIND/objects', {
				        timeout : 10000,
				        withCredentials : false,
						params : apiParams,
						responseType: 'json'
					})
					.then( response => {
						this.total_count = parseInt( response.data.HEAD.objects_total );
						// this.limit = response.data.HEAD.limit;
						this.objects = response.data.DATA.objects;
					})
					.catch( e => {
						console.log( e );
					});

				}
			}
		},
		computed : {
		},
		data ()  {
			return {
				objects : [],
				total_count : 0,
				limit : 21
			}
		},
		watch: {
		    '$route.params.page': function ( page ) {
		      this.fetchData();
		    },

		},
		beforeMount() {
			this.fetchData();
		},
		created () {
			this.$on( 'filter', function( filterData ) {

				this.fetchData( filterData );
			} );
		}
	}
</script>

<style>

</style>