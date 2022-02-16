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
                filter: '.doces, .drinks, .cafes, .sucos, .vitaminas'
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
    init: function () {
        Receitas.filtroSelect();
        Receitas.carrosselProdRelacionados();
    }
}
Receitas.init();

export default main