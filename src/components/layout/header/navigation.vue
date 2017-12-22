	<template>
		<nav class="header-nav">
			<span v-for="(data, dataIndex) in this.navigation">
				<router-link :to="data.endpoint"><i v-show="data.icon" :class="data.icon"></i><span>{{ data.name }}</span></router-link>
			</span>
		</nav>
	</template>

	<script>
	export default {
		props : {
			open : {
				type : Boolean,
				default : false
			}
		},
		methods: {
		  toggleNav () {
		  	this.open = ! this.open;
		  }
		},
		data () {
			let dataObject = {
			    navigation : [
				    {
				    	name : 'Home',
				    	icon: 'icon-home',
				    	endpoint : { name: 'home' }
				    },
				    {
				    	name : 'Objects',
				    	icon: 'icon-list',
					  	endpoint : { name: 'objects', params : { page: 1 } } // same as in routes
					}
			    ]
			};

		  	return dataObject;
		}
	}
	</script>
