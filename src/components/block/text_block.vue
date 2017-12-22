<template>
	<div>
		<h2>{{ block.title }}</h2>
		<div v-html="block.text"></div>
	</div>
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