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
                dots: false
            });
        }
    },
    init: function(){
        subhomeinformatica.categoriasSubhome();
        subhomeinformatica.carrosseisScreen();
    }
}

subhomeinformatica.init();

export default main