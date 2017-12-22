<template>
	<div class="object object--single" v-if="isFetched">
		<h2>{{yrObject.name}}<br /><small>{{yrObject.object_type}}</small></h2>
		<aside class="object-data">
			<h4>Objekt Daten</h4>
			<p><strong>System: </strong>{{yrObject.system_type.uid}}</p>
			<p><strong>Objekt Nr.: </strong>{{yrObject.object_nr}}</p>
			<p><strong>Projektgr&ouml;&szlig;e: </strong>{{yrObject.project_size.value}} {{yrObject.project_size.unit}}</p>

			<p v-if="yrObject.price.transaction_type == 'komanditan' || yrObject.price.transaction_type == 'project_rights'">
				<strong>Preis: </strong>{{ yrObject.price.full | number_format }}&nbsp;{{yrObject.price.currency}}
			</p>
			<p v-else>
				<strong>Rent: </strong>{{ yrObject.price.rent | number_format }}&nbsp;{{yrObject.price.currency}} / {{yrObject.price.rent_duration}}
			</p>
		</aside>
		<div>
			<div v-html="yrObject.description"></div>
		</div>
		<app-gallery :images="yrObject.images"></app-gallery>
		<div class="object-params object-params--params">
			<h4>Parameter</h4>
			<ul>
				<li v-for="(value,name) in yrObject.parameter"><strong>{{name}}:</strong> <span v-if="value == null"> - </span><span v-else>{{value}}</span></li>
			</ul>
		</div>
		<div class="object-params object-params--costs">
			<h4>Kosten</h4>
			<ul>
				<li v-for="(value,name) in yrObject.costs"><strong>{{name}}:</strong> <span v-if="value == null"> - </span><span v-else>{{value}}</span></li>
			</ul>
		</div>

		<block-address :address="yrObject.address"></block-address>
	</div>
</template>

<script>
	import axios from 'axios';
	import VueAxios from 'vue-axios';
	import localforage from 'localforage'
	import memoryDriver from 'localforage-memoryStorageDriver'
	import { setupCache } from 'axios-cache-adapter';

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
		name: 'object-single'
	})
	const cache = setupCache({
		maxAge: 15 * 60 * 1000,
		store
	})

	const api = axios.create({
		adapter: cache.adapter
	})

	// Components
	import myGallery from '../components/block/gallery_block.vue';
	// import objectItem from '../components/listing/yr_object.vue';

	export default {
		name : 'ObjectSingle',
		components : {
			'app-gallery' : myGallery,
			'block-address' : {
				props : [ 'address' ],
				template : `<address class="object-params object-params--address">
				<h3>Adresse</h3>
				<p v-if="address.street">{{ address.street }}</p>
				<p v-if="address.state">{{ address.state }}</p>
				<p v-if="address.city || address.zip">{{ address.zip }} {{ address.city }}</p>
				<p v-if="address.country">{{ address.country }}</p>
				</address>`,
				data : function(){ return{} }
			}
		},
		data : function()  {
			return {
				isFetched : false
			}
		},
		methods : {
			fetchData : function ( ) {
				let objectID = this.$route.params.id;

				api.get('http://www.advance-domains.de/yourenergy/api/4fbf7c110291fb48/GET/objects/' + objectID,{
			        timeout : 10000,
			        withCredentials : false,
					responseType: 'json'
				})
				.then( response => {
					this.isFetched = true;
					this.yrObject = response.data.DATA;
				})
				.catch( e => {
					console.log( e );
				});
			}
		},
		beforeMount() {
			this.fetchData();
		}
	}
</script>

<style scoped>
	.object {
		float: none;
		width: auto;
		border: 0;
	}

	.object-data {
		float: right;
		border: 1px solid #999;
		background-color: #CCC;
		padding: 0 25px 14px;
		margin-left: 25px;
		margin-bottom: 28px;
		min-width: 270px;
	}

	.object-data h4{
		text-align: center;
		border-bottom: 1px solid #999;
	}

	.object-params {
		box-sizing: border-box;
		float: left;
		width: 33%;
		width: calc( 33% - 50px );
		margin-left: 25px;
		margin-right: 25px;
		padding: 0 25px 14px;
		border: 1px solid #999;
	}
	.object-params.object-params--params {
		clear: both;
		margin-left: 0;
	}
	.object-params li {
		display: flex;
		justify-content: space-between;
	}
	.object-params li strong {
		display: inline-block;
		min-width: 25ch;
	}

	.object-params ul {
		list-style: none;
		padding-left: 0;
	}
</style>