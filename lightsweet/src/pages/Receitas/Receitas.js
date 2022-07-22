import './Receitas.scss'

const main = () => {
    eventReceitas()
}

const eventReceitas = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Receitas = {
    filtroSelect: function () {
        $('#portfoliolist').mixItUp({
            selectors: {
                target: '.portfolio',
                filter: '.filter'
            },
            load: {
                filter: 'all'
            }
        });
    },
    carrosselProdRelacionados: function () {
        $('.helperComplement').remove();
        $('.ls-departamento-receitas .prod-relacionados .ls-prateleira > ul').slick({
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
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: "25px",
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
    init: function () {
        Receitas.filtroSelect();
        Receitas.carrosselProdRelacionados();
    }
}
Receitas.init();

export default main