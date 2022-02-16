import './Pdp_Receitas.scss'

const main = () => {
    eventPdp_Receitas()
}

const eventPdp_Receitas = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Pdp_Receitas = {
 
    sliderReceitas: function() {
        $('.helperComplement').remove();
        $('.slide-prod .ls-receita-pdp > ul').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    }
                }
            ]
        });
    },
    quemViuViuTb: function() {
        $('.helperComplement').remove();
        $('.slide-prod .ls-prateleira > ul').slick({
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        centerMode: true,
                        centerPadding: "30px"
                    }
                }
            ]
        });
    },
    ajusteVideoFunction(){
        if ($('#caracteristicas .ESPEC-DE-RECEITA').length > 0) {
            $('.value-field.VIDEO iframe').appendTo('#include');
            $('#include #image').css('display', 'none');
        }
    },
    init: function(){
        Pdp_Receitas.sliderReceitas();
        Pdp_Receitas.quemViuViuTb();
        Pdp_Receitas.ajusteVideoFunction();
    }

}

Pdp_Receitas.init();

export default main