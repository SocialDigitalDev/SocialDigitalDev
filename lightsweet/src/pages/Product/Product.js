import './Product.scss'

const main = () => {
    eventProduct()
}

const eventProduct = () => {
    
}
var produto = {
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
            $(".produto-all #produtoDiv-direita .ls-produto__buy-button .buy-button").click(function (event) {
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
    ajustaTabelaNutri: function () {
        $(document).ready(function(){
            $('td.value-field br').remove();
            $('.value-field table').attr('cellspacing', '0');
            $('td.value-field.Validade').appendTo('#produtoDiv-esquerda');
        });
    },
    abreFechaDescRica: function () {
        $('#descricao-produto').append('<p class="seeMore">Ver Mais</p>');
        $('.seeMore').click(function(){
            $('.productDescription').toggleClass('descAberto');
        });
    },
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
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 590,
                    settings: {
                        infinite: true,
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
    quemViuViuTb: function() {
        $('.helperComplement').remove();
        $('.qvvt .ls-prateleira > ul').slick({
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
                // {
                //     breakpoint: 400,
                //     settings: {
                //         slidesToShow: 2,
                //         slidesToScroll: 1,
                //         centerMode: true,
                //         centerPadding: "25px",
                //         dots: true,
                //         arrows: false
                //     }
                // },
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
    init: function(){
        produto.TabelaNutri();
        produto.ajustaTabelaNutri();
        produto.sliderReceitas();
        produto.quemViuViuTb();
        produto.qtdProd();
        produto.fixFrete();
        produto.abreFechaDescRica();
    }
}

produto.init();

export default main