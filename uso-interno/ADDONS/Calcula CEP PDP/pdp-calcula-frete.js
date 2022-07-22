"use strict";
var calculacep = {
    init: function() {
        this.unavailableProduct()
    },
    //Calcula o frete na PDP
    quantity: function() {
        $(window);
        $(document).on("click", ".js-quantity a", function(t) {
            t.preventDefault();
            var o = $(this)
              , i = o.siblings(".quantity__field")
              , n = parseInt(i.val()) + parseInt(o.data("number"))
              , e = $(".form-product .form__actions .buy-button").attr("href").split("?")[1].split("&")
              , c = []
              , r = null;
            n = n > 9 ? n : "" + n,
            i.val(parseInt(n) ? n : "1");
            for (var a in e)
                "string" == typeof e[a] && e[a].indexOf("sku") > -1 && c.push(e[a].split("=").pop());
            r = "/checkout/cart/add?sku=" + c + "&qty=" + n + "&seller=1&redirect=true&sc=1",
            $(".form-product .form__actions .buy-button").attr("href", r);
            $('#calculoFrete .quantity input').val(n).attr('value', n);
            var cepValue = $('#txtCep').val().length;
            console.log('valor:' + cepValue)
            if (cepValue !== 0) {
                $('#btnFreteSimulacao').trigger('click')
            }
        })
    },
    //Quando o produto está indisponível
    unavailableProduct: function() {
        vtexjs.catalog.getProductWithVariations(skuJson_0.productId).done(function(t) {
            if (t.available) {
                $(".form-product .js-quantity, #produtoDiv-direita .plugin-preco").show()
            } else {
                $(".form-product .js-quantity, #produtoDiv-direita .plugin-preco").remove();
                $.getJSON('https://api.vtex.com/jasmine/pricing/prices/' + t.skus[0].sku).done(function(json) {
                    var o = JSON.parse(json);
                    console.log(o);
                    var basePrice = o.basePrice;
                    var listPrice = o.listPrice;
                    var valParcelaMinima = 20.00;
                    var numParcelaMaxima = 12;
                    var numParcelas = parseInt(basePrice / valParcelaMinima);
                    numParcelas = (numParcelas > numParcelaMaxima) ? numParcelaMaxima : numParcelas;
                    var valParcelas = (basePrice / numParcelas);
                    var valorAvista = basePrice - (basePrice * 0.1);
                    basePrice = basePrice.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
                    listPrice = listPrice.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
                    valorAvista = valorAvista.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
                    valParcelas = valParcelas.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                    });
                    
                    $(".product__content .product__price .sku__price").show();
                    $(".product__content .product__price").show()
                }).fail(function(a, b, c) {
                    console.error(a);
                    console.error(b);
                    console.error(c)
                })
            }
        })
    }
};
calculacep.init(),
$(document).ready(function() {
    ShippingValue();//Controle da VTEX padrão
})
$(window).on('load', function() {
    calculacep.quantity();   
})