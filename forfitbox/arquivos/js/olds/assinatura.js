var wdw = $(window),
    body = $("body"),
    callLoja = {
        criaCookie: function(e, a, t) {
            var o = new Date;
            o.setTime(o.getTime() + 3285e6), document.cookie = e + "=" + a
        },
        lerCookie: function(e) {
            var a = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
            return a ? a[2] : null
        },
        checkCokie: function() {
            var e = parseInt(callLoja.lerCookie("pageLoads"), 10);
            isNaN(e) || e <= 0 ? callLoja.criaCookie("pageLoads", 1) : callLoja.criaCookie("pageLoads", e + 1), callLoja.lerCookie("pageLoads") > 2 ? $(".popUpNews").addClass("hide") : $(".popUpNews").addClass("show")
        },
        reconheceMobile: function() {
            wdw.width() > 1024 ? body.addClass("deskPage") : body.addClass("mobilePage")
        },
        removeComplement: function() {
            $(".helperComplement").remove()
        },

        mobPage: function() {
            $(window).width() < 1025 && $("body").addClass("mobPage")
        },
 
        tempMiniCart: function() {
            callLoja.miniCart(), $("body").hasClass("mobPage") ? ($("body").append('<div id="showMobAdd" style="display: none;" class="modal fade" role="dialog" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content text-center"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">Ã—</span></button></div><div class="modal-body"><p>Produto adicionado!</p></div></div></div><a style="display: none;" data-toggle="modal" data-target="#showMobAdd" class="linkMobAdd"></a>'), $(".linkMobAdd").trigger("click"), setTimeout(function() {
                $(".customBuy").removeClass("active"), $("#showMobAdd .close").trigger("click"), setTimeout(function() {
                    $("#showMobAdd, .linkMobAdd").remove()
                }, 200)
            }, 3e3)) : ($(".customBuy").removeClass("active"), $(".top-interaction .cart-panel h2").addClass("show"), $("html, body").animate({
                scrollTop: 0
            }, 300), $("body").append("<div id='whiteLayer'></div>"), $("#whiteLayer").animate({
                width: "100%"
            }, "fast"), $(".cart-panel").removeClass("empty"), $(".cart-panel").addClass("active activeTemp"), setTimeout(function() {
                $(".cart-panel").removeClass("activeTemp"), $(".top-interaction .cart-panel h2").removeClass("show"), $("#whiteLayer").animate({
                    width: "0px"
                }, "fast")
            }, 4e3))
        },
        customBuyShelf: function() {
            $(".qtdVal").keydown(!1), setTimeout(function() {
                $(".qtdVal").val("1")
            }, 200), jQuery(document).on("click", ".btAddVitrine", function(e) {
                e.preventDefault();
                var a = $(this).attr("data-qtd-prod"),
                    t = $(this).attr("data-id-sku");
                setTimeout(function() {
                    vtexjs.checkout.getOrderForm().then(function() {
                        item = {
                            id: t,
                            quantity: a,
                            seller: 1
                        }, vtexjs.checkout.addToCart([item]).done(function(e) {
                            var a, t = e.items.length,
                                o = 0;
                            for (a = 0; a < t; a++) o += e.items[a].quantity;
                            $(".cart-link > span").html(o), $(".header-minicart").addClass("active").removeClass("empty"), $(".cart-total-value").addClass("active"), $(".header-minicart > h2").html("Produto adicionado!")
                        })
                    })
                })
            }), jQuery(document).on("click", ".btComprarVitrine", function(e) {
                e.preventDefault();
                var a = $(this).attr("data-qtd-prod"),
                    t = $(this).attr("data-id-sku");
                window.location = "/checkout/cart/add?sku=" + t + "&qty=" + a + "&seller=1&redirect=true&sc=1"
            }), jQuery(document).on("click", ".closeCartMsg", function(e) {
                $(".storeCartMessage").hide()
            }), jQuery(document).on("click", ".buyNoVar .btnAcr", function(e) {
                var a = parseInt($(this).parent().next(".qtdVal").val());
                a += 1, $(this).parent().parent().next(".btComprarVitrine").attr("data-qtd-prod", a), $(this).parent().parent().parent().next(".linkAddAoCarrinho-add").children(".btAddVitrine").attr("data-qtd-prod", a), $(this).parent().next(".qtdVal").val(a)
            }), jQuery(document).on("click", ".buyNoVar .btnDec", function(e) {
                var a = parseInt($(this).parent().next(".qtdVal").val());
                1 == a ? ($(this).parent().parent().next(".btComprarVitrine").attr("data-qtd-prod", 1), $(this).parent().parent().parent().next(".linkAddAoCarrinho-add").children(".btAddVitrine").attr("data-qtd-prod", 1), $(this).parent().next(".qtdVal").val(1)) : (a -= 1, $(this).parent().parent().next(".btComprarVitrine").attr("data-qtd-prod", a), $(this).parent().parent().parent().next(".linkAddAoCarrinho-add").children(".btAddVitrine").attr("data-qtd-prod", a), $(this).parent().next(".qtdVal").val(a))
            })
        },

   

        buyProduct: function() {
            function e(e) {
                $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked") && (e <= 4 ? ($("input.assinatura-0").prop("checked", !0), $(".plugin-preco .productPrice").removeClass("hide"), $(".product-assinatura-price").addClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-001").addClass("active")) : e >= 11 && ($("input.assinatura-25").prop("checked", !0), $(".product-assinatura-box").removeClass("active"), $(".assinatura-003").addClass("active"))), $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") && (e <= 4 ? ($("input.assinatura-0").prop("checked", !0), $(".plugin-preco .productPrice").removeClass("hide"), $(".product-assinatura-price").addClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-001").addClass("active")) : e >= 5 && e <= 10 && ($("input.assinatura-10").prop("checked", !0), $(".product-assinatura-box").removeClass("active"), $(".assinatura-002").addClass("active")))
            }
            $(".skuList label").click(function() {
                setTimeout(function() {
                    "display: block;" == $(".sku-notifyme").attr("style") ? ($(".alertProd").html(""), $(".product-security, .prod-frete, .linkAddAoCarrinho").addClass("hide")) : ($(".alertProd").html(""), $(".product-security, .prod-frete, .linkAddAoCarrinho").removeClass("hide"))
                }, 200)
            }), $("#product-details-wrapper .btnAcr").click(function() {
                var a = parseInt($(".btnAcr").parent().prev(".qtdVal").val());
                a += 1, $(".btnAcr").parent().prev(".qtdVal").val(a), $("#calculoFrete .quantity input").val(a), e(a), calculaPreco(a)
            }), $("#product-details-wrapper .btnDec").click(function() {
                var a = parseInt($(".btnDec").parent().prev(".qtdVal").val());
                1 == a ? ($(".btnDec").parent().prev(".qtdVal").val("1"), $("#calculoFrete .quantity input").val("1")) : (a -= 1, $(".btnDec").parent().prev(".qtdVal").val(a), $("#calculoFrete .quantity input").val(a)), e(a), calculaPreco(a)
            }), $("#product-details-wrapper .qtdVal").keydown(function(e) {
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
                }, "slow")) : $("body").hasClass("freeco-produto-assinatura") && !$(".product-assinatura-box > input").is(":checked") ? ($(".alertProd").html("<span>Selecione uma opção ao lado</span>"), $(".alertProd span").addClass("anima"), setTimeout(function() {
                    $(".alertProd span").removeClass("anima")
                }, 2e3), $("html,body").animate({
                    scrollTop: $(".seletorSku").offset().top - 30
                }, "slow")) : $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-0").is(":checked") ? callLoja.addItemToCart() : $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked") ? callLoja.addItemToCartRecurrency() : $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked") ? callLoja.addItemToCartRecurrency() : callLoja.addItemToCart()
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
                        callLoja.updateCart(e)
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
                            "vtex.subscription.key.frequency": "1 month"
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
                                callLoja.updateCart(e)
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
            }), $(".productPrice").before("<div class='product-assinatura-price hide'><p>Por <span></span> / mês</p><p><b>Cancelamento</b><br />* Permitido e gratuito a qualquer momento.</p></div>"), $(".descricao-preco").append("<span class='subtotal-sem-assinatura'>Subtotal: <span></span></span>"), $("input.assinatura-0").change(function() {
                $(".plugin-preco .productPrice").removeClass("hide"), $(".product-assinatura-price").addClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-001").addClass("active")
            }), $("input.assinatura-10").change(function() {
                $(".qtdVal").val("5"), $(".plugin-preco .productPrice").addClass("hide"), $(".product-assinatura-price").removeClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-002").addClass("active"), calculaPreco(5)
            }), $("input.assinatura-25").change(function() {
                $(".qtdVal").val("11"), $(".plugin-preco .productPrice").addClass("hide"), $(".product-assinatura-price").removeClass("hide"), $(".product-assinatura-box").removeClass("active"), $(".assinatura-003").addClass("active"), calculaPreco(11)
            })
        },
        customRecurrenceBuy: function(e) {},
       

       
        init: function() {
            callLoja.mobPage(), callLoja.removeComplement(), callLoja.customBuyShelf(), body.hasClass("freeco-home"), body.hasClass("freeco-category") && (), body.hasClass("freeco-produto") && (callLoja.reconheceMobile(), callLoja.buyProduct()), body.hasClass("freeco-produto-assinatura") && callLoja.customRecurrence()
        }
    };

function validateEmail(e) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
}

function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}

function formata_valor_dinheiro(e) {
    return e = "R$ " + (.01 * e).toFixed(2).replace(".", ",")
}

function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}

function getCampanha(e) {
    if (e = new RegExp("[?&]" + encodeURIComponent(e) + "=([^&]*)").exec(location.search)) return decodeURIComponent(e[1])
}

function getCookie(e) {
    var a = ("; " + document.cookie).split("; " + e + "=");
    if (2 == a.length) return a.pop().split(";").shift()
}

function calculaPreco(e) {
    var a = limpa_valor_dinheiro($(".skuBestPrice").html()),
        t = a * e;
    if ($(".subtotal-sem-assinatura span").html(formata_valor_dinheiro(t)), $("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-10").is(":checked")) {
        var o = parseFloat((.9 * a * e).toFixed(2));
        $(".product-assinatura-price span").html(formata_valor_dinheiro(o))
    }
    if ($("body").hasClass("freeco-produto-assinatura") && $(".product-assinatura-box > .assinatura-25").is(":checked")) {
        o = parseFloat((.749748 * a * e).toFixed(2));
        $(".product-assinatura-price span").html(formata_valor_dinheiro(o))
    }
}

function formatDate() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        a = new Date,
        t = "" + (a.getMonth() + 1),
        o = "" + a.getDate(),
        r = a.getFullYear();
    return e && (r += 3), t.length < 2 && (t = "0" + t), o.length < 2 && (o = "0" + o), [r, t, o].join("-")
}

function doGTranslate(e) {
    if (e.value && (e = e.value), "" != e) {
        var a = e.split("|")[1],
            t = location.hostname.split(".")[0];
        "pt" !== a ? (2 != t.length && "zh-cn" != t.toLowerCase() && "zh-tw" != t.toLowerCase() && (t = "pt"), location.href = location.protocol + "//" + ("pt" == a ? "" : a + ".") + location.hostname.replace("www.", "").replace(RegExp("^" + t + "\\."), "") + location.pathname + location.search) : location.href = location.protocol + "//www." + location.hostname.replace(RegExp("^" + t + "\\."), "") + location.pathname + location.search
    }
}
$(document).ready(function() {
    callLoja.init()
}), Number.prototype.formatMoney = function(e, a, t) {
    var o = this,
        r = (e = isNaN(e = Math.abs(e)) ? 2 : e, a = null == a ? "," : a, t = null == t ? "." : t, o < 0 ? "-" : ""),
        s = parseInt(o = Math.abs(+o || 0).toFixed(e)) + "",
        i = (i = s.length) > 3 ? i % 3 : 0;
    return r + (i ? s.substr(0, i) + t : "") + s.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + t) + (e ? a + Math.abs(o - s).toFixed(e).slice(2) : "")
}, $.fn.unslick = function() {
    return this.each(function(e, a) {
        a.slick && a.slick.destroy()
    })
};