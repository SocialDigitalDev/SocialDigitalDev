import './Pdp_Especial.scss'

const main = () => {
    eventPdp_Especial()
}

const eventPdp_Especial = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Pdp_Especial = {
    qtdProd: function () {
        if ("abc" == "abc") {
            setTimeout(function () {
                $(".qtdPrateleira .btnAcr").click(function () {
                    var atual = parseInt($(this).prev(".qtdVal").val());
                    atual = atual + 1;
                    $(this).prev(".qtdVal").val(atual);
                });
                $(".qtdPrateleira .btnDec").click(function () {
                    var atual = parseInt($(this).next(".qtdVal").val());
                    if (atual == 1) {
                        $(this).next(".qtdVal").val("1");
                    } else {
                        atual = atual - 1;
                        $(this).next(".qtdVal").val(atual);
                    }
                });
                $(".qtdPrateleira .qtdVal").bind("keyup blur focus", function (e) {
                    e.preventDefault();
                    var expre = /[^\d]/g;
                    $(this).val($(this).val().replace(expre, ''));
                });
            }, 200);
            $(".produto-all #produtoDiv-direita .om-produto__buy-button .buy-button").click(function (event) {
                event.preventDefault();
                var hrefCart = $(this).attr("href");
                var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();
                if (qtd == "") {
                    qtd = "1";
                }
                if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Por favor, selecione o modelo desejado.',
                        toast: 'true',
                        position: 'bottom-end',
                        showConfirmButton: false,
                        showCloseButton: 'true',
                        timerProgressBar: 'true',
                        timer: '3000'
                    })
                } else {
                    var res = hrefCart.replace("qty=1", "qty=" + qtd);
                    var hrefCart = $(this, ".buy-button").attr("href");
                    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                    setTimeout(function () {
                        vtexjs.checkout.getOrderForm().then(function () {
                            var item = {
                                id: resUTL,
                                quantity: qtd,
                                seller: 1
                            };
                            vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                                $(".header-minicart").addClass("open"),
                                    setTimeout(function () {
                                        $(".header-minicart").removeClass("open");
                                    }, 5e3);
                            });
                        });
                    });
                }
            });
        }
    },
    fixFrete: function () {
        $(window).load(function () {
            $("#txtCep").attr("placeholder", "00000-000");
            $("#txtCep").attr('autocomplete', 'none');
            $("#txtCep").attr('autocomplete', 'off');
            $('#txtCep').on('focus click', function () {
                $(this)[0].setSelectionRange(0, 0);
            });
        });
    },
    fixName: function() {
        if (!$('body').hasClass('ls-produto-especial')){
            var productName = $('.productName').text();
            var newProductName = productName.split('-');
            var finalProductName = newProductName[0];
            $('.productName').html(finalProductName);
        }
    },
    abreFechaDescRica: function () {
        $('#descricao-produto .descriptionWrap').append('<p class="seeMore">Ver Mais</p>');
        $('.seeMore').click(function(){
            $('.productDescription').toggleClass('descAberto');
            $(this).toggleClass('descAberto');
            if($(this).hasClass('descAberto')){
                $(this).text('Ver Menos');
            }else{
                $(this).text('Ver Mais');
            }
        });
    },
    trocaCorPDPespecial: function() {
        if ($('body').hasClass('ls-produto-especial')){
            var url = window.location.pathname;
            var containerCenter = $('.ls-produto-especial-main section .wrapper.produto-all > .container-center');
            var lateralOrnamento = $('.ls-produto-especial-main section .wrapper.produto-all .ornamento');
            if (url === "/creme-de-avela-com-cacau-lowcucar-zero-acucares-150g-ls-10001192/p"){
                if(scre < 500){
                    containerCenter.css('background-image','url(/arquivos/new-marrom-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/new-marrom.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-marrom)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-marrom)');
                $('.valor-por, .valor-dividido, .PDP-Especial, .slick-dots').addClass('marrom');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('marrom');
            }
            else if (url === "/bolo-integral-com-cacau-magro-400g-ls-10001414/p") {
                if(scre < 500){
                    containerCenter.css('background-image','url(/arquivos/new-marrom-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/new-marrom.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-marrom)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-marrom)');
                $('.valor-por, .valor-dividido, .PDP-Especial, .slick-dots').addClass('marrom');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('marrom');
            }
            else if (url === "/chocolate-ao-leite-zero-adicao-de-acucares-22g-ls-10001506/p") {
                if(scre < 500){
                    containerCenter.css('background-image','url(/arquivos/new-marrom-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/new-marrom.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-marrom)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-marrom)');
                $('.valor-por, .valor-dividido, .PDP-Especial, .slick-dots').addClass('marrom');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('marrom');
            }
            else if (url === "/mini-wafer-lowcucar-zero-acucares-sabor-morango-22g-ls-10001487/p") {
                lateralOrnamento.css('background-image','url(/arquivos/lateral-morango.png)');
                if(scre < 500){
                    containerCenter.css('background-image','url(/arquivos/new-vermelho-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/new-vermelho.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-vermelho)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-vermelho)');
                $('.valor-por, .PDP-Especial, .slick-dots').addClass('vermelho');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('vermelho');
            }
            else if (url === "/gli-instan-lowcucar-sabor-guarana-glicose-instantanea-5x15g-ls-10000674/p") {
                lateralOrnamento.css('background-image','url(/arquivos/new-guarana.png)');
                if(scre < 500){
                    containerCenter.css('background-image','url(/arquivos/v2-amarelo-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/v2-amarelo.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-amarelo)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-amarelo)');
                $('.valor-por, .PDP-Especial, .slick-dots').addClass('amarelo');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('amarelo');
            }
            else if (url === "/mistura-para-bolo-sabor-chocolate-sem-gluten-150g-ls-10001571/p") {
                if (scre < 500){
                    containerCenter.css('background-image','url(/arquivos/new-marrom-mobile.png)');
                }else{
                    containerCenter.css('background-image','url(/arquivos/new-marrom.png)');
                }
                $('.productName, .skuBestPrice, .valor-dividido, .skuListPrice, h4.PDP-Especial, .titulo-prateleira h2').css('color', 'var(--pdp-marrom)');
                $('.ls-produto__buy-button a, li.receita').css('background', 'var(--pdp-marrom)');
                $('.valor-por, .valor-dividido, .PDP-Especial, .slick-dots').addClass('marrom');
                $('.PDP-Especial tbody tr, .slick-arrow').addClass('marrom');
            }
            else{
                containerCenter.css('background-image','url(/arquivos/splash.png)');
            }
        }
    },
    TabelaNutri: function() {
        if ($("#caracteristicas").before("<div class='tabelasMain'><div class='tabelasTitle'></div><div class='tabelasCentral'><div class='tabelaNutricional active'></div><div class='tabelaAminograma'></div></div></div>"), 
        $("#caracteristicas .Informacoes-Nutricionais").length && ($("#caracteristicas .Informacoes-Nutricionais tr").each(function() {
            var e = $(".value-field", this).html().toString();
            e.indexOf("??") > -1 ? (e = e.split("??"), $(".value-field", this).html(e[0]), $(this).append("<td class='value-complement'>" + e[1] + "</td>")) : $(this).append("<td class='value-complement'></td>")
        }), 
        $(".tabelaNutricional").append($("#caracteristicas .Informacoes-Nutricionais")), 
        $(".tabelasTitle").append("<span class='tableaNutriBt active'>Valores Nutricionais</span>"), 
        $(".value-field.Informacao-Nutricional-Tabela-Nutricional").length)) {
            var e = $(".value-field.Informacao-Nutricional-Tabela-Nutricional").html();
            $(".tabelaNutricional").append("<p><b>Informação Nutricional:</b>" + e + "</p>")
        }
        jQuery(document).on("click", ".tableaNutriBt", function() {
            $(".tableaAminoBt, .tabelaAminograma").removeClass("active"), $(".tableaNutriBt, .tabelaNutricional ").addClass("active")
        }), 
        jQuery(document).on("click", ".tableaAminoBt", function() {
            $(".tableaNutriBt, .tabelaNutricional ").removeClass("active"), 
            $(".tableaAminoBt").addClass("active")
        });
    },
    sliderReceitas: function() {
        $('.helperComplement').remove();
        $('.slide-prod .ls-receita-pdp > ul').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    },
    quemViuViuTb: function() {
        $('.helperComplement').remove();
        $('.qvvt .ls-prateleira > ul').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            dots: true
        });
    },
    fixPrecoEspecial: function () {
        var moeda = $('.valor-por .skuBestPrice').text();
        var moedaTratada = moeda.split(" ");
        var moedaNew = moedaTratada[1].split(",");
        $('.valor-por .skuBestPrice').html(`<span class="font-big">${moedaNew[0]}</span><span class="font-little">,${moedaNew[1]}</span>`);
    },
    init: function(){
        Pdp_Especial.TabelaNutri();
        Pdp_Especial.sliderReceitas();
        Pdp_Especial.quemViuViuTb();
        Pdp_Especial.qtdProd();
        Pdp_Especial.abreFechaDescRica();
        Pdp_Especial.fixName();
        Pdp_Especial.fixFrete();
        Pdp_Especial.fixPrecoEspecial();
        Pdp_Especial.trocaCorPDPespecial();
    }

}

Pdp_Especial.init();

export default main