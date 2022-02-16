import './subhomelivros.scss'

const main = () => {
    eventDepartment()
}

const eventDepartment = () => {
    
}
var scre = $(window).width();
var subhomelivros = {
    
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
                dots: false
            });
        }
    },
    init: function(){
        subhomelivros.categoriasSubhome();
        subhomelivros.carrosseisScreen();
    }
}

subhomelivros.init();

export default main