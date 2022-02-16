import './Pdp_Receitas_Novo.scss'

const main = () => {
    eventPdp_Receitas_Novo()
}

const eventPdp_Receitas_Novo = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Pdp_Receitas_Novo = {
 
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
                    breakpoint: 340,
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
            $('.receita-dados .value-field.VIDEO iframe').appendTo('#include');
            $('#include #image').css('display', 'none');
        }
    },
    removeBRajusteCampoProduto(){
        $(document).ready(function(){
            $('td.value-field br').remove();
            $('.value-field table').attr('cellspacing', '0');
        });
    },
    init: function(){
        Pdp_Receitas_Novo.sliderReceitas();
        Pdp_Receitas_Novo.quemViuViuTb();
        Pdp_Receitas_Novo.ajusteVideoFunction();
        Pdp_Receitas_Novo.removeBRajusteCampoProduto();
    }

}

Pdp_Receitas_Novo.init();

export default main