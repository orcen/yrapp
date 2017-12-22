<template>
	<div :class="getClass( idx )">
		<app-collapsible v-if="block.type == 'collapsible'" :block="block"></app-collapsible>
		<app-text v-else-if="block.type == 'text'" :block="block"></app-text>
		<app-image v-else-if="block.type == 'image'" :image="block"></app-image>
		<app-linkbox v-else-if="block.type == 'linkbox'" :block="block"></app-linkbox>
	</div>
</template>

<script>
	import myCollapsible from './collapsible_block.vue';
	import myText from './text_block.vue';
	import myImage from './image_block.vue';
	import myLinkbox from './linkbox_block.vue';

	export default {
		components : {
			'app-collapsible' : myCollapsible,
			'app-text' : myText,
			'app-image' : myImage,
			'app-linkbox' : myLinkbox
		},
		props : [ 'block', 'idx' ],
		methods : {
			getClass( ) {
				let htmlClass = "block block--";
				// console.log( this.block );
				htmlClass += this.block.type;

				if( this.block.style ) {
					let style = this.block.style;
					if( style.sm ) {
						htmlClass += " col_sm_" + style.sm;
					}
					if( style.md ) {
						htmlClass += " col_md_" + style.md;
					}
					if( style.lg ) {
						htmlClass += " col_lg_" + style.lg;
					}

					if( style.custom ) {
						htmlClass += " " + style.custom;
					}
				}

				return htmlClass;// + this.block.type;
			}
		},
		data () {
			return {};
		},
		beforeMount() {

		}
	}
</script>