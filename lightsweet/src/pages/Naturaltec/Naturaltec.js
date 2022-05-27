import './Naturaltec.scss'

const main = () => {
    eventNaturaltec()
}

const eventNaturaltec = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Naturaltec = {
    tabSelector: function(){
        $('.tab.acucares').click(function(){
            $(this).addClass('active');
            $('.tab.adocante-liquido').removeClass('active');
            $('.tab.adocantes-culinarios').removeClass('active');
            $('.vitrine-acucares').addClass('active');
            $('.vitrine-adocante-liquido').removeClass('active');
            $('.vitrine-adocantes-culinarios').removeClass('active');
        });
        $('.tab.adocante-liquido').click(function(){
            $(this).addClass('active');
            $('.tab.acucares').removeClass('active');
            $('.tab.adocantes-culinarios').removeClass('active');
            $('.vitrine-acucares').removeClass('active');
            $('.vitrine-adocante-liquido').addClass('active');
            $('.vitrine-adocantes-culinarios').removeClass('active');
        });
        $('.tab.adocantes-culinarios').click(function(){
            $(this).addClass('active');
            $('.tab.adocante-liquido').removeClass('active');
            $('.tab.acucares').removeClass('active');
            $('.vitrine-acucares').removeClass('active');
            $('.vitrine-adocante-liquido').removeClass('active');
            $('.vitrine-adocantes-culinarios').addClass('active');
        });
        $('.tab.chas').click(function(){
            $(this).addClass('active');
            $('.tab.refrescos').removeClass('active');
            $('.tab.sobremesas').removeClass('active');
            $('.vitrine-chas').addClass('active');
            $('.vitrine-refrescos').removeClass('active');
            $('.vitrine-sobremesas').removeClass('active');
        });
        $('.tab.refrescos').click(function(){
            $(this).addClass('active');
            $('.tab.chas').removeClass('active');
            $('.tab.sobremesas').removeClass('active');
            $('.vitrine-chas').removeClass('active');
            $('.vitrine-refrescos').addClass('active');
            $('.vitrine-sobremesas').removeClass('active');
        });
        $('.tab.sobremesas').click(function(){
            $(this).addClass('active');
            $('.tab.refrescos').removeClass('active');
            $('.tab.chas').removeClass('active');
            $('.vitrine-chas').removeClass('active');
            $('.vitrine-refrescos').removeClass('active');
            $('.vitrine-sobremesas').addClass('active');
        });
    },
    sideBarSelector: function(){
        $('.alimentos-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.adocantes-liquidos-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.adocantes-culinarios-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.biscoitos-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.bolos-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.chocolates-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.chas-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.refrescos-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.sobremesas-link').removeClass('active');
        });
        $('.sobremesas-link').click(function(){
            $(this).addClass('active');
            $('.acucares-link').removeClass('active');
            $('.alimentos-link').removeClass('active');
            $('.adocantes-liquidos-link').removeClass('active');
            $('.adocantes-culinarios-link').removeClass('active');
            $('.biscoitos-link').removeClass('active');
            $('.bolos-link').removeClass('active');
            $('.chocolates-link').removeClass('active');
            $('.chas-link').removeClass('active');
            $('.refrescos-link').removeClass('active');
        });
    },
    init: function(){
        Naturaltec.tabSelector();
        Naturaltec.sideBarSelector();
    }

}

Naturaltec.init();

export default main