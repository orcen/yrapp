import Vue from 'vue';

Vue.filter( 'html', function( text ) {
	if( ! text ) return '';

	var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['#60', '<'],
        ['#62', '>']
    ];
    // console.log( text );
    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
});

Vue.filter('truncate', function( text, length ) {
	if( ! text ) return '';
	if( typeof length == "undefined" ) length = 50;

	return text.substring(0, length );
});

Vue.filter('number_format', function( number, format ) {
	if( ! number ) return '';
	// if( typeof format == "undefined" ) format = '';
	number = new Intl.NumberFormat().format(number);

	return number;
});