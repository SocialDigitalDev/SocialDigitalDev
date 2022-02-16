import getVariables from '../settings/icons.js'

const _variables = getVariables('icones');

$(document).ready(function(){

	// Adicionar Class na Vitrine
	function addClassVitrine() {
		const vitrineItem = document.querySelectorAll(".vitrine-products ul li")
		const vitrineArray = Array.from(vitrineItem);

		vitrineArray.forEach(item => {
			if (item.classList.contains("helperComplement")) {
				item.remove();
			} else {
				item.classList.add("vitrine-item");
			}
		});
	}

	addClassVitrine();

	// Vitrine Carousel
	if($(".vitrine-carousel")){
		$(".slick-slider .prod-vitrine .imagem img").each(function(){
			var srcImagem = $(this).attr("src")
			$(this).attr("data-lazy", srcImagem)
			$(this).removeAttr("src")
		})
	}

	$(".vitrine-carousel .vitrine-products ul").slick({
		lazyLoad: 'ondemand',
		lazyLoaded: 'image',
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: false,
					arrows: true,
					prevArrow: `<button class="slick-prev" aria-label="Previous" type="button">${_variables.left}</button>`,
					nextArrow: `<button class="slick-next" aria-label="Next" type="button">${_variables.right}</button>`,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false,
					arrows: true,
					prevArrow: `<button class="slick-prev" aria-label="Previous" type="button">${_variables.left}</button>`,
					nextArrow: `<button class="slick-next" aria-label="Next" type="button">${_variables.right}</button>`,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
					arrows: true,
					prevArrow: `<button class="slick-prev" aria-label="Previous" type="button">${_variables.left}</button>`,
					nextArrow: `<button class="slick-next" aria-label="Next" type="button">${_variables.right}</button>`,
				}
			}
		]
	});

})
