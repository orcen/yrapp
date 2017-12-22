<template>
	<nav class="pagination" v-if="totalPages > 1">
		<span v-if="current > 1" class="pagination-item pagination-item--first"><router-link :to="{ name: this.url, params: { page: 1 }}" class="pagination-link">&#171;</router-link></span>
		<span v-if="prevPage()" class="pagination-item pagination-item--prev"><router-link :to="{ name: this.url, params: { page: prevPage() }}" class="pagination-link">&#8249;</router-link></span>
		<span v-for="page in totalPages"  :class="itemClass(page)"><router-link :to="{ name: this.url, params: { 'page': page }}" class="pagination-link">{{page}}</router-link></span>
		<span v-if="nextPage()" class="pagination-item pagination-item--next"><router-link :to="{ name: this.url, params: { page: nextPage() }}" class="pagination-link">&#8250;</router-link></span>
		<span v-if="nextPage() != current && current != totalPages"class="pagination-item pagination-item--last"><router-link :to="{ name: this.url, params: { page: this.totalPages }}" class="pagination-link">&#187;</router-link></span>
	</nav>
</template>

<script>
	export default {
		name : 'Pagination',
		props : {
			total : {
				type : Number
			},
			perpage : {
				type : Number,
				default : 20
			},
			url : {
				type : String
			}
		},
		methods : {
			itemClass : function( page ) {
				page = parseInt( page );
				if( this.current === page ) {
					return 'pagination-item pagination-item--current';
				}
				else {
					return 'pagination-item';
				}
			},
			prevPage : function () {
				return this.current - 1;
			},
			nextPage : function () {
				if( this.current == this.totalPages ) return false;

				return this.current + 1;
			},
		},
		computed : {

			totalPages : function () {
				let pages = this.total / this.perpage;

				return Math.ceil( pages );
			},
			current () {
				return parseInt( this.$route.params.page );
			}
		},
		data () {
			return {}
		}
	}
</script>

<style>
	.pagination {
		clear: both;
		display: flex;
		justify-content: center;
		margin: 28px 0;
	}
	.pagination-item {
		/*display: ;*/
	}
	.pagination-item + .pagination-item {
		margin-left: 10px;
	}
	.pagination-link {
		background-color: #CCC;
		border: 1px solid #999;
		color: #666;
		display: inline-block;
		min-width: 2ch;
		padding: 2px 5px;
		text-align:center;
		text-decoration: none;
	}
	.pagination-item--current .pagination-link {
		background-color: #B6DAF1FF;
		border-color: #729FCFFF;
		font-weight: bold;
	}


	.pagination-item--first .pagination-link,
	.pagination-item--prev .pagination-link,
	.pagination-item--next .pagination-link,
	.pagination-item--last .pagination-link {
		background: none;
		border: 0;
		font-size: 1.2em;
	}

</style>