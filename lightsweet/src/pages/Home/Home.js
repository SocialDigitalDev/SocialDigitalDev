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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: true,
                    centerPadding: '60px'
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false
                }
            }
        ]
    });
}

var home = {
    bannerPrincipal: function() {
        $('.banner-principal').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
            dots: false,
            fade: true,
            cssEase: 'linear'
        });
    },
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
        $('.section-acabou-sair .ls-prateleira > ul, .section-degustar .ls-prateleira > ul, .section-outras-delicias .ls-prateleira > ul').slick({ 
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: false,
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });
    },
    carrosselReceitas: function() {
        $('.banner-vitrine-receitas .ls-prateleira > ul').slick({
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
            if (scre <= 850){
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
            if (scre <= 850){
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
            if (scre <= 850){
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
            if (scre <= 850){
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
   
    carrosseisMobile: function() {
        if(scre <= 850){
            $('.banners-departamentos .wrapper').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
            });
            $('.barra-informativo .wrapper .informativo').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                dots: false,
                arrows: true,
            });
            $('.section-mosaico-produtos .wrapper').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                infinite: true,
                autoplay: true,
                dots: true,
                arrows: false,
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
    animationConfig: function () {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to(".third-layer",{
            scrollTrigger: {
                trigger: ".descontos-wrapper",
                start: "top center",
                scrub: true
            },
            y: -350,
            ease: "none",
            duration: 3
        });
        gsap.to(".second-layer",{
            scrollTrigger: {
                trigger: ".descontos-wrapper",
                start: "top center",
                scrub: true
            },
            y: -100,
            ease: "none",
            duration: 3
        });
    },
    init: function () {
        home.bannerPrincipal();
        home.carrosselMarcas();
        home.carrosselMarcasQueAmamos();
        home.carrosselVitrines();
        home.carrosselReceitas();
        home.ajustaSetaMarcasQueAmamos();
        home.textoPromocionalCategoriaHome();
        home.tituloBannerAlt();
        home.trocaTabs();
        home.carrosseisMobile();
        home.animationConfig();
    }
}
home.init();

export default main