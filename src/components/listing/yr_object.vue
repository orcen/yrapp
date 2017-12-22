<template>
	<div :class="className">
		<img class="object-image" v-if="objectData.images.img_1" :src="objectData.images.img_1.full.src" :width="objectData.images.img_1.full.width" :height="objectData.images.img_1.full.height" alt="">
		<img class="object-image" v-else src="~assets-images/image_not_found-300x300.png" alt="Image not found" width="300" height="300">
		<h2 v-on:click="toggleView" class="object-title has-link">{{ objectData.name }}</h2>

		<div class="object-content" v-show="this.open">
			<div v-html="$options.filters.truncate($options.filters.html(objectData.description), 120)"></div>
			<router-link class="button" v-if="this.open" :to="{ name: 'objectSingle', params: { id: objectData.uid }}">Details anzeigen</router-link>
		</div>
	</div>
</template>

<script>

	export default {
		name : 'yrObject',
		props : [ 'objectData', 'idx' ] ,
		methods : {
			toggleView () {
				this.open = ! this.open;
				if( this.open ) {
					this.className = 'object object--list is-open';
				}
				else {
					this.className = 'object object--list';
				}
			}
		},
		filters : {
		},
		data () {
			return {
				className : 'object object--list',
				open : false
			};
		}
	}
</script>

<style>
	.objects {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		margin-left: -25px;
		margin-right: -25px;
	}
	.objects .object.object--list {
		background-color: #e9eef1;
		width: 270px;
		float: left;
		margin: 0 25px 48px;
		flex: 1 1 250px;
		text-align: center;
		border: 1px solid #CCC;
	}
	.object-image {
		vertical-align: middle;
		margin: 0 auto;
	}
	.object-title {
		margin: 0;
		padding: 14px 12px;
		line-height: 28px;
		font-size: 16px;
		font-weight: 400;
		background-color: #B6DAF1FF;
	}
	.object-title.has-link {
		cursor: pointer;
	}
	.object-content {
		text-align: left;
		padding: 28px 25px;
		background-color: #FFF;
	}
	.object-content .button {
		display: table;
		margin: 0 auto;
	}
</style>