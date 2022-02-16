const main = () => {
    bodyEvent()
}

const bodyEvent = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            //console.log('is body event')
        })
}
var scre = $(window).width();
var header = {
    topBarRotativo: function() {
        $('.textoRotativo').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            infinity: true
        });
    },
    abreFechaBusca: function() {
        $('.busca-topo__busca-container .icon-search').click(function(){
            $('fieldset.busca').toggleClass('busca-open');
        });
    },
    abreFechaMinicart: function() {
        $('.header-cart .icon-cart').click(function(){
            $('.header-minicart, .minicart__overlay').addClass('open');
        });
        $('.header-minicart-close, .header-minicart-empty button').click(function(){
            $('.header-minicart, .minicart__overlay').removeClass('open');
        });
    },
    init: function(){
        header.topBarRotativo();
        header.abreFechaBusca();
        header.abreFechaMinicart();
    }
}
header.init();

export default main