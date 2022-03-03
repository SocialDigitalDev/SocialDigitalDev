import getVariables from '../settings/icons.js'

const _variables = getVariables('icones');

$(document).ready(function(){
	if($(".page-home").length === 1){

		// Banner Full
		$('.slick-banner').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 4000,
			arrows: true,
			prevArrow: _variables.left,
			nextArrow: _variables.right,
			dots: true
		});
		
	}

})
