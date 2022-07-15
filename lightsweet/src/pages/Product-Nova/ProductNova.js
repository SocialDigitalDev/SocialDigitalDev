import './ProductNova.scss'

const main = () => {
    eventProductNova()
}

const eventProductNova = () => {
    
}
var scre = $(window).width();
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
        if ($('.Tabela-Nutricional').length <= 0){
            $('table.Especificacoes').parent().parent().hide();
        }
    },
    abreFechaDescRica: function () {
        if (scre <= 500) {
            $('#descricao-produto .titulo').click(function(){
                $(this).toggleClass('open');
                $('.productDescription').slideToggle();
            });
        }
    },
    sliderReceitas: function() {
        $('.helperComplement').remove();
        $('.slide-prod .ls-receita-pdp > ul').slick({
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1300,
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
        if (!document.querySelector('#divCompreJunto').innerHTML === "") {
            // Trata o Titulo
            var titulo = $('#divTitulo').html();
            var newTitulo = titulo.replace('Aproveite e compre junto', 'Compre Junto');
            $('#divTitulo').html(newTitulo);
            // Trata o HTML completo
            var strong1 = $('.buy strong:nth-child(1)').text();
            var strong2 = $('.buy strong:nth-child(2)').text();
            var arr = [];
            $('td.buy').each(function(){
                arr.push($(this).find('br').get(0).nextSibling.nodeValue);
            });
            var splitPrice = arr[0].split(': ');
            var linkComprar = $('#lnkComprar').attr('href');
            $('td.buy').html(`
                <div class="preco-wrapper">
                    <div class="preco-total">
                        <p class="total-texto">Preço Total:</p>
                        <p class="preco">${splitPrice[1]}</p>
                    </div>
                    <div class="preco-parcelado">
                        <p>${strong1} de ${strong2}</p>
                    </div>
                </div>
                <div class="botao-comprar">
                    <p class="comprar-junto">
                        <a id="linkComprar" href="${linkComprar}">Comprar</a>
                    </p>
                </div>
            `);
        }else{
            $('#divCompreJunto').parent().parent().hide();
        }
    },
    freightReturn: function freightReturn() {
        $(document).ajaxSuccess(function (event, xhr, settings, data) {
            if (settings.url.indexOf("frete/calcula") !== -1) {
                produto.replaceFreightContent();
            }
        });
    },
    replaceFreightContent: function replaceFreightContent() {
        var tr = document.querySelector('.freight-values thead tr');
        var th = document.createElement('th');
        var textTh = document.createTextNode('Entrega');
        th.appendChild(textTh);
        tr.appendChild(th);
        document.querySelector('.freight-values thead tr th:first-child').innerText = "Valor";
        document.querySelector('.freight-values thead tr th:nth-child(2)').innerText = "Prazo";
        document.querySelector('.freight-values thead tr th:nth-child(3)').innerText = "Entrega";
        var especItems = document.querySelectorAll('.freight-values table tbody tr td:nth-child(2)');
        for (var i = 0; i < especItems.length; i++) {
            var text = especItems[i].innerText.split(', entrega em ');
            var tipoDeFrete = text[0];
            var prazo = text[1].split('para o CEP')[0];
            especItems[i].innerText = prazo;
            especItems[i].nextElementSibling.innerText = tipoDeFrete;
        }
    },
    calculaDescontoPdp: function() {
        vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
            var fullPrice = product.skus[0].listPrice;
            var hasDiscount = product.skus[0].hasDiscount
            var discount = product.skus[0].discount;
            if (hasDiscount == true) {
                var percentual = Math.floor((discount / fullPrice) * 100);
                if (scre <= 500) {
                    $('#produtoDiv-esquerda .img-produto').prepend(`<p class="porcentagem">${percentual}</p>`);
                }else{
                    $('.valor-de').append(`<p class="porcentagem">${percentual}</p>`);
                }
            }
        });  
    },
    montaSlickDeImagensMobile: function() {
        if (scre <= 500) {
            vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
                var prodId = product.productId;
                $.get(`/api/catalog_system/pub/products/search?fq=productId:${prodId}`, function(prod){
                    var prodItems = prod[0].items;
                    var prodImgArray = prodItems[0].images;
                    for(var i = 0; i < prodImgArray.length; i++){
                        var prodImg = prodImgArray[i].imageUrl;
                        $('.mobile #show #include #image').append(`
                            <div class="image-content">
                                <img src="${prodImg}">
                            </div>
                        `);
                    }
                }).done(function(){
                    $('#show #include #image').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        infinite: true
                    });
                    $('#image .slick-dots').appendTo('figure');
                });
            });
        } 
    },
    init: function(){
        produto.montaSlickDeImagensMobile();
        produto.TabelaNutri();
        produto.ajustaTabelaNutri();
        produto.sliderReceitas();
        produto.quemViuViuTb();
        produto.qtdProd();
        produto.fixFrete();
        produto.abreFechaDescRica();
        produto.freightReturn();
        produto.calculaDescontoPdp();
        produto.compreJunto();
    }
}

produto.init();

export default main