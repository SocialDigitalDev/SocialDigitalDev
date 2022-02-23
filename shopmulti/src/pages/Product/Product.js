import './Product.scss'

const main = () => {
    eventProduct()
}

const eventProduct = () => {
    
}
var scre = $(window).width();
var produto = {
    carrosselPdp: function() {
        $('.helperComplement').remove();
        if (scre <= 1440) {
            $('.vitrine-simples .wrapper .sm-prateleira > ul').slick('unslick');
            $('.vitrine-simples .wrapper .sm-prateleira > ul').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "50px"
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                            dots: true,
                            centerMode: true,
                            centerPadding: "140px"
                        }
                    }
                ]
            });
        }
    },
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
            $(".sm-produto__add-cart").click(function (event) {
                event.preventDefault();
                var hrefCart = $('.buy-button').attr("href");
                var qtd = $(".qtdPrateleira .qtdVal").val();
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
                    var hrefCart = $(".buy-button").attr("href");
                    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                    setTimeout(function () {
                        vtexjs.checkout.getOrderForm().then(function () {
                            var item = {
                                id: resUTL,
                                quantity: qtd,
                                seller: 1
                            };
                            vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {
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
    quemViuViuTb: function() {
        if (scre <= 1440){
            $('.helperComplement').remove();
            $('.qvvt .sm-prateleira > ul').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false
            });
        }
    },
    qtdStockAvailability: function() {
        vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
            var qtd = product.skus[0].availablequantity;
            $('.sm-produto__buy-quant').append(`<p class="availableQtd">(${qtd} disponíveis)</p>`);
            if (qtd > 0){
                $('.valor-por').after('<p class="estoque em-estoque">Em estoque</p>');
            }else{
                $('.valor-por').after('<p class="estoque sem-estoque">Sem estoque</p>');
            }
        });
    },
    openParcelas: function() {
        $('.other-payment-method').prepend('<p class="closeParcelas">Fechar</p>');
        $('.open-parcelas').click(function(){
            $('.other-payment-method-content').css('display', 'flex');
        });
        $('.closeParcelas').click(function(){
            $('.other-payment-method-content').css('display', 'none');
        });
    },
    freteSameDayNextDay: function() {
        var d = new Date();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var hoursLeftToday = 13 - hour;
        var hoursLeftTomorrow = 24 - hour;
        var minutesLeft = 60 - minutes;
        if (hour <= 14) {
            $('.hoje-amanha').html('<b> Hoje </b>');
            $('.reg-hour').html(`<b> ${hoursLeftToday}h e ${minutesLeft}m</b>`);
        }else if (hour > 14 && minutes >= 1) {
            $('.hoje-amanha').html('<b> Amanhã </b>');
            $('.reg-hour').html(`<b> ${hoursLeftTomorrow}h e ${minutesLeft}m</b>`);
        }
    },
    init: function(){
        produto.TabelaNutri();
        produto.quemViuViuTb();
        produto.qtdProd();
        produto.fixFrete();
        produto.qtdStockAvailability();
        produto.freteSameDayNextDay();
        produto.carrosselPdp();
        produto.openParcelas();
    }
}

produto.init();

export default main