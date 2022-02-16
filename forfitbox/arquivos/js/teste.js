var wdw = $(window),
    body = $("body"),
    callLoja = {
        removeComplement: function() {
            $(".helperComplement").remove()
        },
        
         
        buyProduct: function() {
            function e(e) {
                $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked") && (e <= 1 ? ($("input.assinatura-0").prop("checked", !0), 
                $(".plugin-preco .productPrice").removeClass("hide"), 
                $(".product-assinatura-price").addClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-001").addClass("active")) : e >= 11 && ($("input.assinatura-25").prop("checked", !0), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-003").addClass("active"))), 
                $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") && (e <= 1 ? ($("input.assinatura-0").prop("checked", !0), 
                $(".plugin-preco .productPrice").removeClass("hide"), 
                $(".product-assinatura-price").addClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-001").addClass("active")) : e >= 1 && ($("input.assinatura-10").prop("checked", !0), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-002").addClass("active")))
            }
            // $(".skuList label").click(function() {
            //     setTimeout(function() {
            //         "display: block;" == $(".sku-notifyme").attr("style") ? ($(".prod-frete, .forfit-produto__buy-quant").addClass("hide")) : ($($(".prod-frete, .forfit-produto__buy-quant").removeClass("hide"))
            //     }, 200)
            // }), 
            $("#product-details-wrapper .btnAcr").click(function() {
                var a = parseInt($(".btnAcr").prev(".qtdVal").val());
                a += 1, $(".btnAcr").prev(".qtdVal").val(a), $
                ("#calculoFrete .quantity input").val(a), e(a), calculaPreco(a)
            }), 
            $("#product-details-wrapper .btnDec").click(function() {
                var a = parseInt($(".btnDec").next(".qtdVal").val());
                1 == a ? ($(".btnDec").next(".qtdVal").val("1"), 
                $("#calculoFrete .quantity input").val("1")) : (a -= 1, $(".btnDec").next(".qtdVal").val(a), 
                $("#calculoFrete .quantity input").val(a)), e(a), calculaPreco(a)
            }), 
            $("#product-details-wrapper .qtdVal").keydown(function(e) {
                -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 == e.keyCode && !0 === e.ctrlKey || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
            })
            //$(".buy-button").after("<p class='product-security'>Compra 100% segura</p>");
            // $("#___rc-p-id").attr("value");
            // jQuery(document).on("click", ".buy-button", function(e) {
            //     var a = $(".buy-button").attr("href");
            //     a.split("sku=").pop().split("&qty=").shift();
            //     "javascript:alert('Por favor, selecione o modelo desejado.');" == a : $("body").hasClass("forfit-produto-assinatura") && !$(".product-assinatura-box > input").is(":checked") ? ($(".alertProd").html("<span>Selecione uma opção ao lado</span>"), $(".alertProd span").addClass("anima"), setTimeout(function() {
            //         $(".alertProd span").removeClass("anima")
            //     }, 2e3), $("html,body").animate({
            //         scrollTop: $(".seletorSku").offset().top - 30
            //     }, "slow")) : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-0").is(":checked") ? callLoja.addItemToCart() : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked") ? callLoja.addItemToCartRecurrency() : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") ? callLoja.addItemToCartRecurrency() : callLoja.addItemToCart()
            // })
        },
        addItemToCart: function() {
            $(".alertProd").html(""); //$(".buy-button").addClass("loading");
            var e = $("#product-details-wrapper .qtdVal").attr("value"),
                a = $(".buy-button").attr("href").split("sku=").pop().split("&qty=").shift();
            setTimeout(function() {
                vtexjs.checkout.getOrderForm().then(function() {
                    item = {
                        id: a,
                        quantity: e,
                        seller: 1
                    }, vtexjs.checkout.addToCart([item], null, 1).done(function(e) {
                        callLoja.updateMiniCart(e), callLoja.miniCartAfterEffects(e)
                    })
                }), vtexjs.checkout.getOrderForm().then(function(e) {}).done(function(e) {})
            }, 2e3)
        },
        miniCartAfterEffects: function() {
            $('.header-minicart, .minicart__overlay').addClass('open');
            // $(".card.card-default").addClass("active").removeClass("empty"), 
            // $(".mini-cart-overlay").addClass("active"), 
            // $(".cart-total-value").addClass("active"), 
            // $(".card.card-default > h2").html("Produto adicionado!"), 
            // $(".card-products-wrapper").scrollTop($(".card-products-wrapper")[0].scrollHeight),
            // setTimeout(function() {
            //     $(".buy-button").removeClass("loading")
            // }, 3e3)
        },
        addItemToCartRecurrency: function() {
           // $(".buy-button").addClass("loading");
            var e, a = $("#product-details-wrapper .qtdVal").attr("value"),
                t = $(".buy-button").attr("href").split("sku=").pop().split("&qty=").shift();
            22 == t && (e = 7), 23 == t && (e = 8), setTimeout(function() {
                vtexjs.checkout.getOrderForm().then(function() {
                    item = {
                        id: e,
                        quantity: a,
                        seller: 1
                    }, vtexjs.checkout.addToCart([item]).done(function(e) {
                        var a = e.items.length - 1;
                        vtexjs.checkout.addItemAttachment(a, "vtex.subscription.assinatura", {
                            "vtex.subscription.key.frequency": "1 mês"
                        }, null, !1).done(function() {
                            var t = {
                                subscriptions: [{
                                    itemIndex: a,
                                    plan: {
                                        frequency: {
                                            interval: 1,
                                            periodicity: "MONTH"
                                        },
                                        validity: {
                                            begin: formatDate(),
                                            end: formatDate(!0)
                                        }
                                    }
                                }]
                            };
                            vtexjs.checkout.sendAttachment("subscriptionData", t).done(function() {
                                callLoja.updateMiniCart(e), callLoja.miniCartAfterEffects(e)
                            }).fail(function() {
                                console.log("ocoreu um erro ao adicionar a recorrencia")
                            })
                        }).fail(function() {
                            console.log("ocoreu um erro ao adicionar o anexo")
                        })
                    })
                })
            })
        },
        customRecurrence: function(e) {
            $(window).load(function() {
                calculaPreco(1)
            }), 
            $(".productPrice").before("<div class='product-assinatura-price hide'><p>Por <span></span> na *Assinatura mensal</p>* Assinante tem 10% de desconto.</p></div>"), 
            // $(".descricao-preco").append("<span class='subtotal-sem-assinatura'>Subtotal: <span></span></span>"), 
            $("input.assinatura-0").change(function() {
                $(".plugin-preco .productPrice").removeClass("hide"), 
                $(".product-assinatura-price").addClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-001").addClass("active")
            }), 
            $("input.assinatura-10").change(function() {
                $(".qtdVal").val("1"), 
                $(".plugin-preco .productPrice").addClass("hide"), 
                $(".product-assinatura-price").removeClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-002").addClass("active"), calculaPreco(1)
            })
            // $("input.assinatura-25").change(function() {
            //     $(".qtdVal").val("1"), $(".plugin-preco .productPrice").addClass("hide"), $(".product-assinatura-price").removeClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-003").addClass("active"), calculaPreco(1)
            // })
            
        },
        customRecurrenceBuy: function(e) {},

      
        init: function() {
            callLoja.removeComplement(), callLoja.buyProduct(), callLoja.customRecurrence()
        }
    };


function formata_valor_dinheiro(e) {
     return e = "R$ " + (.01 * e).toFixed(2).replace(".", ",")
}

function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}

function calculaPreco(e) {
    var a = limpa_valor_dinheiro($(".skuBestPrice").html()),
        t = a * e;
    if ($("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked")) {
        var o = parseFloat((.9 * a * e).toFixed(2));
        $(".product-assinatura-price span").html(formata_valor_dinheiro(o))
    }
    // if ($("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked")) {
    //     o = parseFloat((.749748 * a * e).toFixed(2));
    //     $(".product-assinatura-price span").html(formata_valor_dinheiro(o))
    // }
}

function formatDate() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        a = new Date,
        t = "" + (a.getMonth() + 1),
        o = "" + a.getDate(),
        r = a.getFullYear();
    return e && (r += 3), t.length < 2 && (t = "0" + t), o.length < 2 && (o = "0" + o), [r, t, o].join("-")
}

$(document).ready(function() {
    callLoja.init()
}), Number.prototype.formatMoney = function(e, a, t) {
    var o = this,
        r = (e = isNaN(e = Math.abs(e)) ? 2 : e, a = null == a ? "," : a, t = null == t ? "." : t, o < 0 ? "-" : ""),
        s = parseInt(o = Math.abs(+o || 0).toFixed(e)) + "",
        i = (i = s.length) > 3 ? i % 3 : 0;
    return r + (i ? s.substr(0, i) + t : "") + s.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + t) + (e ? a + Math.abs(o - s).toFixed(e).slice(2) : "")
};

