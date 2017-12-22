<template>
	<form action="">
		<p><label for="searchWord">Suchbegriff</label><br /><input type="text" v-model="searchWord" id="searchWord"></p>

		<p><label for="rights">Projektrechte</label><br />
			<select name="transaction_type" id="transaction_type" v-model="transactionType">
				<option value="">All</option>
				<option value="kommanditan">Kommanditan</option>
				<option value="project_rights">Projektrechte</option>
				<option value="anlage">Anlage</option>
			</select>
		</p>
		<p>
			<span><label><input v-model="systemTypeAll" type="checkbox" name="system_type" value="all">All</label></span>
			<span v-for="listItem in systemTypeList"><label><input v-model="systemTypeSelected" type="checkbox" name="system_type" :value="listItem.value">{{listItem.label}}</label></span>
		</p>
		<p>
			<label for="">Projekt Gr&ouml;&szlig;e</label><br />
			<input type="number" v-model="projectSizeMin" name="projectSizeMin" min="0" :max="projectSizeMax" step="10"><input type="number" v-model="projectSizeMax" name="projectSizeMax" :min="projectSizeMin" max="500000" step="10">
			<br />
			<output >{{projectSize}}</output>
		</p>
	</form>
</template>

<script>



	export default {

		name : 'SearchForm',
		components : {

		},
		props : {
			minSearchLength : {
				type : Number,
				default : 3
			}
		},
		data () {
			return {
				searchWord : null,
				transactionType : 'kommanditan',
				systemTypeSelected : [],
				systemTypeList : [
					{ value : 2, label : 'Sonne' },
					{ value : 13, label : 'ECO' },
					{ value : 3, label : 'Wind' }
				],
				projectSizeMin : 10000,
				projectSizeMax : 250000,
				formSettings : {
					searchWord : null,
					transactionType : null,
					systemType : null
				},
			}
		},
		computed : {
			projectSize () {
				return this.projectSizeMin + ',' + this.projectSizeMax;
			},
			systemTypeAll : {
				set : function ( newValue ) {
					if( newValue === true ) {
						let systemTypeSelected = [];
						this.systemTypeList.forEach( function( sysType ) {
							systemTypeSelected.push( sysType.value );
						});
						this.systemTypeSelected = systemTypeSelected;
						return 'all';
					}

				},
				get : function () {
					if( this.systemTypeSelected.length === this.systemTypeList.length ) {
						return 'all';
					}

					return '';
				}
			}
		},
		methods : {
			emitChange() {
				let filterData = {
					searchWord : this.searchWord,
					transactionType : this.transactionType != null ? this.transactionType : false,
					systemType : this.systemTypeSelected,
					projectSize : this.projectSizeMax
				};
				this.$parent.$emit( 'filter', filterData );
			}
		},
		watch : {
			'searchWord' : function( newSearch ) {
				this.emitChange( );
			},
			'transactionType' : function( newSearch ) {
				this.emitChange( );
			},
			'systemTypeSelected' : function( newSearch ) {
				this.emitChange( );
			},
			'projectSize' : function( value ) {
				this.emitChange( );
			}
		}
	}
</script>