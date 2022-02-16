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
function tabsSlick() {
    $('.novidades-por-categoria .wrapper .tab-content').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        autoplay: false,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    centerPadding: '50px'
                }
            }
        ]
    });
}

var home = {
 
    carrosselMarcas: function () {
        $('.carrossel-marcas .wrapper').slick({
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        centerMode: true,
                        centerPadding: '80px',
                        arrows: false
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        centerMode: true,
                        centerPadding: '60px',
                        arrows: false
                    }
                },
                {
                    breakpoint: 340,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        centerMode: true,
                        centerPadding: '45px',
                        arrows: false
                    }
                }
            ]
        });
    },
    carrosselVitrines: function() {                         
        $('.helperComplement').remove();
        $('.leve-antes-que-acabe .om-prateleira > ul, .ofertas-imperdiveis .om-prateleira > ul, .vitrine-final .om-prateleira > ul').slick({ 
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });
    },
    carrosselOtl: function() {
        $('.banner-vitrine-countdown .om-prateleira > ul').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
    },
    carrosselMarcasQueAmamos: function () {
        $('.marcas-que-amamos .wrapper .side-left').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: true,
            asNavFor: '.marcas-que-amamos .wrapper .side-right',
            arrows: false,
            dots: false
        });
        $('.marcas-que-amamos .wrapper .side-right').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            asNavFor: '.marcas-que-amamos .wrapper .side-left',
            arrows: true,
            dots: true
        });
    },
    textoPromocionalCategoriaHome: function () {
        $('.compra-na-medida-certa .wrapper .box-banner:nth-of-type(1) a').append('<p>Compras até R$<span class="big-font">39</span><span class="little-font">,99</span></p>');
        $('.compra-na-medida-certa .wrapper .box-banner:nth-of-type(2) a').append('<p>Compras até R$<span class="big-font">79</span><span class="little-font">,99</span></p>');
        $('.compra-na-medida-certa .wrapper .box-banner:nth-of-type(3) a').append('<p>Compras até R$<span class="big-font">99</span><span class="little-font">,99</span></p>');
    },
    tituloBannerAlt: function () {
        $('.novidades-por-categoria .tab-content .box-banner').each(function(){
            var title = $(this).find('img').attr('alt');
            $(this).find('a').append(`<h3 class="title-alt">${title}</h3>`);
        });
        $('.marcas-que-amamos .side-right .box-banner').each(function(){
            var title = $(this).find('img').attr('alt');
            $(this).find('a').append(`<p class="text-alt">${title}</p>`);
        });
    },
    trocaTabs: function() {
        $('.tabs-links[data-tab="prat-1"]').click(function(){
            $(this).addClass('tab-ativo');
            $('#prat-1').addClass('tab-ativo');
            $('#prat-2').removeClass('tab-ativo');
            $('#prat-3').removeClass('tab-ativo');
            $('#prat-4').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-2"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-3"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-4"]').removeClass('tab-ativo');
            if (scre <= 768){
                $('.novidades-por-categoria .wrapper .tab-content').slick('unslick');
                setTimeout(tabsSlick(), 500);
            }
            
        });
        $('.tabs-links[data-tab="prat-2"]').click(function(){
            $(this).addClass('tab-ativo');
            $('#prat-1').removeClass('tab-ativo');
            $('#prat-2').addClass('tab-ativo');
            $('#prat-3').removeClass('tab-ativo');
            $('#prat-4').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-1"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-3"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-4"]').removeClass('tab-ativo');
            if (scre <= 768){
                $('.novidades-por-categoria .wrapper .tab-content').slick('unslick');
                setTimeout(tabsSlick(), 500);
            }
        });
        $('.tabs-links[data-tab="prat-3"]').click(function(){
            $(this).addClass('tab-ativo');
            $('#prat-1').removeClass('tab-ativo');
            $('#prat-2').removeClass('tab-ativo');
            $('#prat-3').addClass('tab-ativo');
            $('#prat-4').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-1"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-2"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-4"]').removeClass('tab-ativo');
            if (scre <= 768){
                $('.novidades-por-categoria .wrapper .tab-content').slick('unslick');
                setTimeout(tabsSlick(), 500);
            }
        });
        $('.tabs-links[data-tab="prat-4"]').click(function(){
            $(this).addClass('tab-ativo');
            $('#prat-1').removeClass('tab-ativo');
            $('#prat-2').removeClass('tab-ativo');
            $('#prat-3').removeClass('tab-ativo');
            $('#prat-4').addClass('tab-ativo');
            $('.tabs-links[data-tab="prat-1"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-2"]').removeClass('tab-ativo');
            $('.tabs-links[data-tab="prat-3"]').removeClass('tab-ativo');
            if (scre <= 768){
                $('.novidades-por-categoria .wrapper .tab-content').slick('unslick');
                setTimeout(tabsSlick(), 500);
            }
        });
    },
    ajustaSetaMarcasQueAmamos: function() {
        var slickNext = $('.marcas-que-amamos .wrapper .side-right .slick-next');
        $('.marcas-que-amamos .wrapper .side-right').append('<div class="navigation-slick"></div>');
        $(`.marcas-que-amamos .wrapper .side-right .slick-prev,
            .marcas-que-amamos .wrapper .side-right .slick-dots`).appendTo('.navigation-slick');
        $('.navigation-slick ul.slick-dots').after(slickNext);
    },
    iniciaCountdown: function() {
        $('.banner-vitrine-countdown .slick-slide').each(function(){
            $(this).find('.flags-promo').vtexCountdown();
        });
    },
    carrosseisMobile: function() {
        if(scre <= 768){
            $('.compre-por-categoria .wrapper').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '60px'
                        }
                    }
                ]
            });
            $('.promocoes-por-marcas .wrapper').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '20px'
                        }
                    }
                ]
            });
            $('.compra-na-medida-certa .wrapper').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '20px'
                        }
                    }
                ]
            });
            setTimeout(tabsSlick(), 500);
            $('.amamos-combos .wrapper').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '30px'
                        }
                    }
                ]
            });
        }
    },
    init: function () {
        home.carrosselMarcas();
        home.carrosselMarcasQueAmamos();
        home.carrosselVitrines();
        home.carrosselOtl();
        home.ajustaSetaMarcasQueAmamos();
        home.textoPromocionalCategoriaHome();
        home.tituloBannerAlt();
        home.trocaTabs();
        home.iniciaCountdown();
        home.carrosseisMobile();
    }
}
home.init();

export default main