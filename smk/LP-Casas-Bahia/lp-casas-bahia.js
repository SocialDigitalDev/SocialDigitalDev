var scre = $(window).width();

var lpCasasBahia = {
    carregaNomeCategoria: function(){
        $('.categorias-section .categorias-wrapper .box-banner').each(function(){
            var categTitle = $(this).find('img').attr('alt');
            $(this).find('a').append(`<p>${categTitle}</p>`);
        })
    },
    carrosselMobile: function(){
        if (scre <= 500){
            $('.categorias-wrapper').owlCarousel({
                items: 2,
                loop: true
            });
            $('.banner-duplo .slide-principal, .desconto-50offprodutos').owlCarousel({
                items: 1,
                loop: true
            });
        }
    },
    init: function(){
        lpCasasBahia.carregaNomeCategoria();
        lpCasasBahia.carrosselMobile();
    }
}
lpCasasBahia.init();