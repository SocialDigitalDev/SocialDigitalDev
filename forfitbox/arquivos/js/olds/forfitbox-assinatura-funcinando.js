/* FUNCIONANDO */
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
                $(".assinatura-003").addClass("active"))), $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") && (e <= 1 ? ($("input.assinatura-0").prop("checked", !0), 
                $(".plugin-preco .productPrice").removeClass("hide"), 
                $(".product-assinatura-price").addClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-001").addClass("active")) : e >= 1 && e <= 10 && ($("input.assinatura-10").prop("checked", !0), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-002").addClass("active")))
            }
            $(".skuList label").click(function() {
                setTimeout(function() {
                    "display: block;" == $(".sku-notifyme").attr("style") ? ($(".alertProd").html(""), $(".prod-frete, .forfit-produto__buy-quant").addClass("hide")) : ($(".alertProd").html(""), $(".prod-frete, .forfit-produto__buy-quant").removeClass("hide"))
                }, 200)
            }), 
            $("#product-details-wrapper .btnAcr").click(function() {
                var a = parseInt($(".btnAcr").parent().prev(".qtdVal").val());
                a += 1, $(".btnAcr").parent().prev(".qtdVal").val(a), $("#calculoFrete .quantity input").val(a), e(a), calculaPreco(a)
            }), 
            $("#product-details-wrapper .btnDec").click(function() {
                var a = parseInt($(".btnDec").parent().prev(".qtdVal").val());
                1 == a ? ($(".btnDec").parent().prev(".qtdVal").val("1"), $("#calculoFrete .quantity input").val("1")) : (a -= 1, $(".btnDec").parent().prev(".qtdVal").val(a), 
                $("#calculoFrete .quantity input").val(a)), e(a), calculaPreco(a)
            }), 
            $("#product-details-wrapper .qtdVal").keydown(function(e) {
                -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 == e.keyCode && !0 === e.ctrlKey || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
            }), $(".buy-button").before("<p class='alertProd'></p>"), $(".buy-button").after("<p class='product-security'>Compra 100% segura</p>");
            $("#___rc-p-id").attr("value");
            jQuery(document).on("click", ".buy-button", function(e) {
                var a = $(".buy-button").attr("href");
                a.split("sku=").pop().split("&qty=").shift();
                "javascript:alert('Por favor, selecione o modelo desejado.');" == a ? ($(".alertProd").html("<span>Selecione uma opção acima</span>"), $(".alertProd span").addClass("anima"), setTimeout(function() {
                    $(".alertProd span").removeClass("anima")
                }, 2e3), $("html,body").animate({
                    scrollTop: $(".seletorSku").offset().top - 30
                }, "slow")) : $("body").hasClass("forfit-produto-assinatura") && !$(".product-assinatura-box > input").is(":checked") ? ($(".alertProd").html("<span>Selecione uma opÃƒÂ§ÃƒÂ£o ao lado</span>"), $(".alertProd span").addClass("anima"), setTimeout(function() {
                    $(".alertProd span").removeClass("anima")
                }, 2e3), $("html,body").animate({
                    scrollTop: $(".seletorSku").offset().top - 30
                }, "slow")) : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-0").is(":checked") ? callLoja.addItemToCart() : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked") ? callLoja.addItemToCartRecurrency() : $("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") ? callLoja.addItemToCartRecurrency() : callLoja.addItemToCart()
            })
        },
        addItemToCart: function() {
            $(".alertProd").html(""), $(".buy-button").addClass("loading");
            var e = $("#product-details-wrapper .qtdVal").attr("value"),
                a = $(".buy-button").attr("href").split("sku=").pop().split("&qty=").shift();
            setTimeout(function() {
                vtexjs.checkout.getOrderForm().then(function() {
                    item = {
                        id: a,
                        quantity: e,
                        seller: 1
                    }, vtexjs.checkout.addToCart([item], null, 1).done(function(e) {
                        callLoja.updateMiniCart(e)
                    })
                }), vtexjs.checkout.getOrderForm().then(function(e) {}).done(function(e) {})
            }, 2e3)
        },

        addItemToCartRecurrency: function() {
            $(".alertProd").html(""), $(".buy-button").addClass("loading");
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
                                callLoja.updateMiniCart(e)
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
            }), $(".productPrice").before("<div class='product-assinatura-price hide'><p>Por <span></span> na *Assinatura mensal</p>* Assinante tem 10% de desconto.</p></div>"), 
           // $(".descricao-preco").append("<span class='subtotal-sem-assinatura'>Subtotal: <span></span></span>"), 
            $("input.assinatura-0").change(function() {
                $(".plugin-preco .productPrice").removeClass("hide"), $(".product-assinatura-price").addClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-001").addClass("active")
            }), 
            $("input.assinatura-10").change(function() {
                $(".qtdVal").val("1"), 
                $(".plugin-preco .productPrice").addClass("hide"), 
                $(".product-assinatura-price").removeClass("hide"), 
                $(".product-assinatura-box").removeClass("active"), 
                $(".assinatura-002").addClass("active"), calculaPreco(1)
            });
            // $("input.assinatura-25").change(function() {
            //     $(".qtdVal").val("11"), 
            //     $(".plugin-preco .productPrice").addClass("hide"), 
            //     $(".product-assinatura-price").removeClass("hide"), 
            //     $(".product-assinatura-box").removeClass("active"), 
            //     $(".assinatura-003").addClass("active"), calculaPreco(11)
            // })
        },
        customRecurrenceBuy: function(e) {},
    
        calculaRecurrence: function() {
            $(".freeco-recurrence > div > ul > li.plano-10 > select").on("change", function() {
                var e = $(this).parent(".freeco-recurrence-item").attr("data-price");
                e = e.replace(",", "-").replace(".", ",").replace("-", ".");
                var a = parseInt($(this).val()),
                    t = parseFloat((.9 * e * a).toFixed(2));
                $(this).prev(".freeco-recurrence-price").children(".freeco-recurrence-price-value").html(t)
            }), 
            // $(".freeco-recurrence > div > ul > li.plano-25 > select").on("change", function() {
            //     var e = $(this).parent(".freeco-recurrence-item").attr("data-price"),
            //         a = (.749748 * (e = parseFloat(e.replace(",", "-").replace(".", ",").replace("-", "."))) * parseInt($(this).val())).toFixed(2);
            //     $(this).prev(".freeco-recurrence-price").children(".freeco-recurrence-price-value").html(a)
            // }), 
            $(".recurrence-buy-button").click(function(e) {
                e.preventDefault(), $(this).addClass("loading");
                var a = $(this).parent(".freeco-recurrence-buy").parent(".freeco-recurrence-item").children("select").val(),
                    t = $(this).parent(".freeco-recurrence-buy").parent(".freeco-recurrence-item").attr("data-id-sku");
                setTimeout(function() {
                    vtexjs.checkout.getOrderForm().then(function() {
                        item = {
                            id: t,
                            quantity: a,
                            seller: 1
                        }, vtexjs.checkout.addToCart([item]).done(function(e) {
                            var a = e.items.length - 1;
                            vtexjs.checkout.addItemAttachment(a, "vtex.subscription.assinatura", {
                                "vtex.subscription.key.frequency": "1 month"
                            }, null, !1).done(function() {
                                var e = {
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
                                vtexjs.checkout.sendAttachment("subscriptionData", e).done(function() {
                                    window.location = "/checkout/#/cart"
                                }).fail(function() {
                                    console.log("ocoreu um erro ao adicionar a recorrencia")
                                })
                            }).fail(function() {
                                console.log("ocoreu um erro ao adicionar o anexo")
                            })
                        })
                    })
                })
            })
        },
    
        
        init: function() {
            callLoja.removeComplement(), body.hasClass("forfit-produto-assinatura") && callLoja.customRecurrence(), body.hasClass("freeco-institucional") && callLoja.instaFeed(), body.hasClass("freeco-busca-vazia") && callLoja.sliderProducts(".shelf > ul"), body.hasClass("freeco-contato") &&  body.hasClass("trabalhe-conosco") && body.hasClass("freeco-varejista") && callLoja.enviarFormulario("VJ"), body.hasClass("freeco-empresas") && (callLoja.enviarFormulario("FP"), callLoja.instaFeed()), body.hasClass("freeco-faq") && body.hasClass("freeco-assinatura") && ( callLoja.calculaRecurrence())
        }
    };

function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}

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