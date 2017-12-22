<template>
	<section>
		<h2 v-on:click="toggle( )">{{ block.title }}</h2>
		<div v-html="block.text" v-show="block.open"></div>
	</section>
</template>
<script>
	export default {
		// name : 'app-collapsible',
		props : [ 'block', 'idx' ],
		methods : {
			toggle ( event ) {
				this.block.open = ! this.block.open;
			}
		},
		data () {
			return {};
		}
	}
</script>