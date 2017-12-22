	<template>
		<nav>
			<button v-on:click="toggleNav"><i class="icon-menu"></i> Menu</button>
			<ul v-if="this.open">
				<app-navigation-item v-for="data in this.navigation" :item="data"></app-navigation-item>
			</ul>
		</nav>
	</template>

	<script>
	export default {
		methods: {
		  toggleNav () {
		  	this.open = ! this.open;
		  }
		},
		data () {
		  return {
		    open: true,
		    navigation : [
			    { name : 'Home' ,
				  endpoint : ''},
			    { name : 'Objects',
				  endpoint : ''}
		    ]
		  };
		}
	}
	</script>
