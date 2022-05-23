var scre = $(window).width();
var ofertaEspecial = {
    montaOfertanoMenu: function() {
        function carregaOfertaEspecial(){
            $('.oferta-especial-temp .ls-prateleira').appendTo('.level-1:last-child .menu-level-2');
            $('.flag-contador').vtexCountdown();
            if (scre <= 980) {
                $('#menuPrincipal .level-1.oferta-especial a').attr('href', '/oferta-especial');
                $('.departamento .flag-contador .flag').css('font-size', '0');
            }
            setTimeout(function(){
                $('.departamento.oferta-especial .vitrine-title h2').text('Oferta Especial');
            }, 2000);
        }
        window.onload = carregaOfertaEspecial();
    },
    init: function(){
        ofertaEspecial.montaOfertanoMenu();
    }
}
ofertaEspecial.init();