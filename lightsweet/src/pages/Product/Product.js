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
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
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
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
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
    compreJunto: function () {
        if ($("body").hasClass("ev-produto")) {

            // Clique bootao Comprar Junto
            setTimeout(function () {
                $('.btn-batch-buy').off('click').click(function (event) {
                    event.preventDefault();
                    var hrefCart = $('.info-prod .comprar-prod .bt-comprar a').attr("href");
                    var qtd = 1;
                    var res = hrefCart.replace(/qty=1/, "qty=" + qtd);
                    var idSkuCJ = $('.slideCompreJunto .slick-active .buy-product-checkbox').attr('rel');
                    alert(idSkuCJ);

                    // //var resUTL = res.substring(res.lastIndexOf("sku=")+1,res.lastIndexOf("&qty="));
                    var resUTL = res.split("sku=").pop().split("&qty=").shift();
                    alert(resUTL);

                    setTimeout(function () {
                        vtexjs.checkout.getOrderForm().then(function () {
                            item = {
                                id: resUTL,
                                quantity: 1,
                                seller: 1
                            };
                            itemDois = {
                                id: idSkuCJ,
                                quantity: 1,
                                seller: 1
                            };
                            vtexjs.checkout.addToCart([item, itemDois]).done(function (orderForm) {
                                alert('foi');
                            });
                        })
                    });
                });
            }, 1500);

            function currencyFormatted(value, str_cifrao) {
                return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
            }

            Number.prototype.formatMoney = function (c, d, t) {
                var n = this,
                    c = isNaN(c = Math.abs(c)) ? 2 : c,
                    d = d == undefined ? "." : d,
                    t = t == undefined ? "," : t,
                    s = n < 0 ? "-" : "",
                    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            };

            $('.ls-prateleira>ul').on('setPosition', function (event, slick, direction) {
                var precoCJ = $('.slideCompreJunto .slick-initialized .slick-slide.slick-active .prodData .price .bestPrice').text();
                precoCJ = precoCJ.trim();
                precoCJ = precoCJ.replace('R$ ', '');
                precoCJ = precoCJ.replace(',', '.');
                var preco = $('.prodFixo .skuBestPrice').text();
                preco = preco.trim();
                preco = preco.replace('R$ ', '');
                preco = preco.replace(',', '.');
                precoFinal = parseFloat(preco) + parseFloat(precoCJ);
                precoFinal = currencyFormatted(precoFinal, 'R$');
                //console.log(precoFinal);
                $('.selected-value').text(precoFinal);

            });



            var prodCompreJunto = $('.prodCompreJunt .ls-prateleira >ul');
            var boxCompre = $('.prodCompreJunt');

            if (prodCompreJunto.length > 0) {
                boxCompre.css('display', 'block');
            } else {
                boxCompre.css('display', 'none');
            };

            // Slide compre junto
            $('#image img').clone().prependTo('.prodFixo').wrapAll('<div class="imgCompre"></div>'); //Clone imagem
            $('.productPrice').clone().appendTo('.prodFixo'); //Clona preco

            $('.prodFixo').after('<div class="juntoAction"><p><img src="/arquivos/plus-bup.png" /></p></div>');
            $('.slideCompreJunto .ls-prateleira>ul').after('<div class="juntoAction"><p><img src="/arquivos/equal-bup.png" /></p></div>');

            // Pega field que seleciona cada produto e colocar dentro da LI prodData
            var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

            prodCheck.each(function () {
                var idCheck = $(this);

                $('.slideCompreJunto .ls-prateleira .data').each(function () {
                    if ($(this).attr('data-id') == idCheck.attr('rel')) {
                        idCheck.prependTo($(this));
                    }
                });
            });

            $('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

            $('.slideCompreJunto .ls-prateleira>ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false
            });

        }
    },
    init: function(){
        produto.TabelaNutri();
        produto.ajustaTabelaNutri();
        produto.sliderReceitas();
        produto.compreJunto();
        produto.quemViuViuTb();
        produto.qtdProd();
        produto.fixFrete();
        produto.abreFechaDescRica();
    }
}

produto.init();

export default main