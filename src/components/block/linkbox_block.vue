<template>
	<router-link :to="block.href">
		<h2>{{ block.title }}</h2>
		<img :src="block.image" />
	</router-link>
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