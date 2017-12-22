<template>
	<div class="gallery">
		<figure v-for="(image, idx ) in this.images" :key="idx" class="gallery-item">
			<a :href="image.full.src" target="_blank" class="">
				<img  :src="image.small.src" :width="image.small.width" :height="image.small.height"/>
			</a>
		</figure>
	</div>
</template>
<script>
	export default {
		// name : 'app-collapsible',
		props : [ 'images' ],
		methods : {
		},
		data () {
			return {

			}
		}
	}
</script>
<style scoped>
	.gallery {

	}
	.gallery-item {

	}
</style>