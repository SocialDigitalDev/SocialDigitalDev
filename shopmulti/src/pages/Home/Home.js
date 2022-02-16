import './Home.scss'

const main = () => {
    eventHome()
}

const eventHome = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var home = {
    
    bannerPrincipal: function() {
        $('.banner-principal').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            fade: true,
            cssEase: 'linear'
        });
    },
    carrosselVitrineUmProduto: function() {
        if (scre > 992){
            $('.helperComplement').remove();
            $('.produtos .prod-right .vitrine-content .sm-prateleira > ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: true
            });
        }
    },
    categoriasGerais: function() {
        $('.section-categorias-gerais .wrapper .box-banner').each(function(){
            var categTitle = $(this).find('img').attr('alt');
            $(this).find('a').append(`<p>${categTitle}</p>`);
        })
    },
    pesquisasEmAlta: function() {
        $('.vitrines-duplas.ofertas .wrapper .prod-left .vitrine-content .box-banner').each(function(){
            var categTitle = $(this).find('img').attr('alt');
            $(this).find('a').prepend(`<p>${categTitle}</p>`);
        })
    },
    descontoColecao: function() {
        $('.vitrines-duplas.ofertas .wrapper .prod-right .vitrine-content .box-banner').each(function(){
            var categTitle = $(this).find('img').attr('alt');
            $(this).find('a').append(`<p>${categTitle}</p>`);
        })
    },
    carrosseisScreen: function() {
        $('.helperComplement').remove();
        if (scre <= 1440) {
            $('.vitrine-simples .wrapper .sm-prateleira > ul').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "50px"
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "140px"
                        }
                    }
                ]
            });
        }
    },
    countDownVitrine: function() {
        $('.flags-promo').vtexCountdown();
    },
    mobileSeeMorePosition: function() {
        if (scre <= 992){
            $('section').each(function(){
                var verMais = $(this).find('.vitrine-simples > a');
                $(this).find('.vitrine-simples .vitrine-title').append(verMais);
            });
        }
    },
    mobileCarrosselBannersTriplos: function() {
        if (scre <= 992){
            $('.section-banners-triplos .wrapper').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: "180px",
                arrows: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            centerPadding: "70px"
                        }
                    }
                ]
            })
        }
    },
    init: function () {
        home.bannerPrincipal();
        home.categoriasGerais();
        home.pesquisasEmAlta();
        home.descontoColecao();
        home.carrosseisScreen();
        home.carrosselVitrineUmProduto();
        home.countDownVitrine();
        home.mobileSeeMorePosition();
        home.mobileCarrosselBannersTriplos();
    }
}
home.init();

export default main