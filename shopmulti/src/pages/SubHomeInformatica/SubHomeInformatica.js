import './subhomeinformatica.scss'

const main = () => {
    eventDepartment()
}

const eventDepartment = () => {
    
}
var scre = $(window).width();
var subhomeinformatica = {
    
    categoriasSubhome: function() {
        $('.section-categorias-subhome .wrapper .box-banner').each(function(){
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
    mobileCarrosselBannersTriplos: function() {
        if (scre <= 767){
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
    init: function(){
        subhomeinformatica.categoriasSubhome();
        subhomeinformatica.carrosseisScreen();
        subhomeinformatica.mobileCarrosselBannersTriplos();
    }
}

subhomeinformatica.init();

export default main