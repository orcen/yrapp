<template id="object-template">
	<div class="list-item" :open=false v-on:click="toggleView">
		<h3>{{ item.objectType }}<small>{{ item.systemType.name }}</small></h3>
		<div v-show="this.open">
			<div v-text="item.description"></div>
			<div v-if="item.images" >
				<img v-for="image in item.images" :src="image.medium.src" />
			</div>
		</div>
	</div>
</template>
<script>
	export default
		props: {

		},
		methods: {
			toggleView () {
				this.open = ! this.open;
			}
		},
		data () {
		  return {
		  }
		}
	}
</script>