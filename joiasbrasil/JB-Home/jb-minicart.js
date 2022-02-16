"use strict";
var minicart = {
    formatPrice: function (t) {
        return t.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    removeItem: function (t) {
        $(t).parents(".list-prod").hide();
        var e = $(t).parents(".list-prod").index();
        vtexjs.checkout.getOrderForm().done(function (t) {
            var r = e,
                i = (t.items[r], [{ index: r, quantity: 1 }]);
            return vtexjs.checkout.removeItems(i);
        });
    },
    update: function () {
        $(window).on("orderFormUpdated.vtex", function (t, e) {
            minicart.isEmptyCart(), minicart.mountCart();
        });
    },
    isEmptyCart: function () {
        var t = vtexjs.checkout.orderForm.items.length;
        0 == $(".empty-cart").length && $(".header-minicart-empty").show(),
            t > 0
                ? ($(".empty-cart").hide(),
                  $(".header-minicart-empty").hide(),
                  $(".header-minicart-navigation .header-minicart-listuct").css("display", "flex"),
                  $(".header-minicart-badge, .header-minicart-footer").show(),
                  $(".header-minicart-title").css("margin-left", "0px"))
                : ($(".empty-cart").show(), $(".header-minicart-footer").hide(), $(".header-minicart-badge").hide());
    },
    checkIndex: function (t, e) {
        $(".list-prod").length > 0
            ? $(".list-prod").each(function () {
                  if ($(this).attr("dataskuid") == t) {
                      var r = $(this).index(),
                          i = parseInt(e) + parseInt($(this).attr("dataqtd"));
                      minicart.updateCart(r, i);
                  } else minicart.addToCart(t, e);
              })
            : minicart.addToCart(t, e);
    },
    toggleMinicartTimeout: function () {
        var t = $(".header-minicart");
        $(window).width() > 520 && t.addClass("open"),
            setTimeout(function () {
                return t.removeClass("open");
            }, 2e3);
    },
    addToCart: function (t, e) {
        var r = { id: t, quantity: e, seller: "1" };
        vtexjs.checkout.addToCart([r], null, jssalesChannel).then(function (t) {
            Swal.fire({ type: "success", title: "Produto adicionado com sucesso!", showConfirmButton: true, timer: 100 }).then(function () {
                minicart.toggleMinicartTimeout();
            });
        });
    },
    updateCart: function (t, e) {
        vtexjs.checkout
            .getOrderForm()
            .then(function (r) {
                var i = { index: t, quantity: e };
                return vtexjs.checkout.updateItems([i], null, !1);
            })
            .then(function () {
                var r = vtexjs.checkout.orderForm.items[t].quantity;
                e > r
                    ? Swal.fire({ type: "info", title: "Você já possui o limite deste produto no carrinho", showConfirmButton: false, timer: 100 }).then(function () {
                          minicart.toggleMinicartTimeout();
                      })
                    : Swal.fire({ type: "success", title: "Quantidade atualizada no carrinho", showConfirmButton: false, timer: 100 }).then(function () {
                          minicart.toggleMinicartTimeout();
                      });
            });
    },
    mountCart: function () {
        var t = vtexjs.checkout.orderForm.items.length,
            e = (vtexjs.checkout.orderForm.items.length, 0);
        if (t > 0) for (var r = 0; r < t; r++) e += vtexjs.checkout.orderForm.items[r].quantity;
        if (0 == vtexjs.checkout.orderForm.totalizers.length) 0 == (i = vtexjs.checkout.orderForm.value) && (i = 0);
        else var i = vtexjs.checkout.orderForm.totalizers[0].value;
        $(".quantity-price").html(minicart.formatPrice(i / 100)), $(".carrinho .qtd-cart").text(e), $(".header-minicart-badge").text(e), $(".header-minicart-itens").text(e > 1 ? "itens" : "item"), $(".list-prod").remove();
        for (r = 0; r < t; r++)
            $(
                '<div class="list-prod" dataProdId="' +
                    vtexjs.checkout.orderForm.items[r].productId +
                    '" dataSkuId="' +
                    vtexjs.checkout.orderForm.items[r].id +
                    '" dataQtd="' +
                    vtexjs.checkout.orderForm.items[r].quantity +
                    '" >\n\t\t\t<div class="list-prod-image">\n\t\t\t\t<a href="' +
                    vtexjs.checkout.orderForm.items[r].detailUrl +
                    '">\n\t\t\t\t\t<img src=" ' +
                    vtexjs.checkout.orderForm.items[r].imageUrl.replace("-55-55", "-100-100").replace("http", "https") +
                    " + '\" alt=\"'" +
                    vtexjs.checkout.orderForm.items[r].name +
                    '\'">\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="list-prod-info">\n\t\t\t\t<div class="list-prod-name">\n\t\t\t\t\t<a href="' +
                    vtexjs.checkout.orderForm.items[r].detailUrl +
                    '">\n\t\t\t\t\t\t<h4>' +
                    vtexjs.checkout.orderForm.items[r].name +
                    '</h4>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class="list-prod-price">\n\t\t\t\t\t<div class="list-prod-qtd updating">\n\t\t\t\t\t\t<p class="qtd-remove">-</p>\n\t\t\t\t\t\t<p class="qtd-value">' +
                    vtexjs.checkout.orderForm.items[r].quantity +
                    '</p>\n\t\t\t\t\t\t<p class="qtd-adiciona">+</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="list-prod-total">\n\t\t\t\t\t\t<p>' +
                    minicart.formatPrice((vtexjs.checkout.orderForm.items[r].listPrice * vtexjs.checkout.orderForm.items[r].quantity) / 100) +
                    "</p>\n\t\t\t\t\t\t<p>" +
                    minicart.formatPrice((vtexjs.checkout.orderForm.items[r].price * vtexjs.checkout.orderForm.items[r].quantity) / 100) +
                    '</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<span class="list-prod-remove"></span>\n\t\t</div>'
            ).appendTo(".header-minicart-list");
        $(".list-prod-qtd").removeClass("updating"),
            vtexjs.checkout.orderForm &&
            vtexjs.checkout.orderForm.totalizers &&
            vtexjs.checkout.orderForm.totalizers &&
            vtexjs.checkout.orderForm.totalizers[0] &&
            vtexjs.checkout.orderForm.totalizers &&
            vtexjs.checkout.orderForm.totalizers[0].value
                ? ($(".header-cart--info-value").html(minicart.formatPrice(vtexjs.checkout.orderForm.totalizers[0].value / 100)), $(".header-minicart-subtotal > .header-minicart-value").html(minicart.formatPrice(vtexjs.checkout.orderForm.totalizers[0].value / 100)), $(".header-minicart-total > .header-minicart-value").html(minicart.formatPrice(vtexjs.checkout.orderForm.value / 100)))
                : ($(".header-cart--info-value").html("R$ 00,00"), $(".header-minicart-value").html("R$ 00,00"));
    },
    controlers: function () {
        $("body").on("click", ".list-prod-remove", function () {
            minicart.removeItem(this);
        }),
            $("body").on("click", ".qtd-adiciona", function () {
                var t = $(this).parents(".list-prod").index(),
                    e = vtexjs.checkout.orderForm.items[t].quantity,
                    r = vtexjs.checkout.orderForm.items[t].quantity + 1;
                $(this).parents(".list-prod").find(".list-prod-qtd").addClass("updating"), minicart.updateItem(this, r, t, e);
            }),
            $("body").on("click", ".qtd-remove", function () {
                var t = $(this).parents(".list-prod").index(),
                    e = vtexjs.checkout.orderForm.items[t].quantity,
                    r = vtexjs.checkout.orderForm.items[t].quantity - 1;
                $(this).parents(".list-prod").find(".list-prod-qtd").addClass("updating"), minicart.updateItem(this, r, t, e);
            });
    },
    updateItem: function (t, e, r, i) {
        var o = r;
        vtexjs.checkout
            .getOrderForm()
            .then(function (t) {
                var r = o,
                    i = (t.items[r], [{ index: r, quantity: e }]);
                return vtexjs.checkout.updateItems(i);
            })
            .then(function (t) {
                vtexjs.checkout.orderForm.items[o].quantity < e ? $(".list-prod").eq(o).find(".list-prod-qtd").addClass("limit") : $(".list-prod").eq(o).find(".list-prod-qtd").removeClass("limit");
            });
    },
    shippingCalc: function(){
        $('.action-calc').click(function(){
            var cepValue = $('.header-minicart-shipping #calculaShip').val()
            vtexjs.checkout.getOrderForm().then(function(orderForm){
                var infoShipping = {
                    postalCode: cepValue,
                    // MUDAR CASO HAJA LOJA DE OURO PAÍS
                    country: "BRA"
                };
                return vtexjs.checkout.calculateShipping(infoShipping);
            }).done(function(orderForm){
                if (orderForm.totalizers.length == 3){
                    var shippingValue = orderForm.totalizers[2].value;
                }else if(orderForm.totalizers.length == 2){
                    var shippingValue = orderForm.totalizers[1].value;
                }
                if (shippingValue === 0){
                    $('.freteValores .totalFrete-value').html('Grátis');
                }else{
                    $('.freteValores .totalFrete-value').html(`${shippingValue}`);
                    if(shippingValue < 10000){
                        $('.freteValores .totalFrete-value').mask('R$ #0,00');
                    }else if(shippingValue < 1000){
                        $('.freteValores .totalFrete-value').mask('R$ #,00');
                    }else if(shippingValue < 100){
                        $('.freteValores .totalFrete-value').mask('R$ 0,##');
                    }else{
                        $('.freteValores .totalFrete-value').mask('R$ #00,00');
                    }
                }
            });
        });
    },
    couponCalc: function(){
        // Adiciona Cupom
        $('.action-coupon').click(function(){
            var couponValue = $('.header-minicart-coupon #calculaCupom').val()
            if (couponValue === ""){
                alert("Preencha um cupom válido");
            }else{
                vtexjs.checkout.getOrderForm().then(function(orderForm){
                    return vtexjs.checkout.addDiscountCoupon(couponValue);
                }).done(function(orderForm){
                    var couponValue = orderForm.totalizers[1].value;
                    var newCoupon = Math.abs(couponValue);
                    $('.totalDiscount-value').html(`${newCoupon}`);
                    if(newCoupon < 10000){
                        $('.discountValores .totalDiscount-value').mask('R$ #0,00');
                    }else if(newCoupon < 1000){
                        $('.discountValores .totalDiscount-value').mask('R$ #,00');
                    }else if(newCoupon < 100){
                        $('.discountValores .totalDiscount-value').mask('R$ 0,##');
                    }else{
                        $('.discountValores .totalDiscount-value').mask('R$ #00,00');
                    }
                    $('.action-coupon').attr('id', 'removeCupom').removeAttr('class').html('X');
                    minicart.update()
                    // Remove Cupom
                    $('#removeCupom').click(function(){
                        vtexjs.checkout.getOrderForm().then(function(orderForm){
                            return vtexjs.checkout.addDiscountCoupon();
                        }).then(function(orderForm){
                            $('.totalDiscount-value').html("");
                            $('.header-minicart-coupon #calculaCupom').val('')
                            $('#removeCupom').removeAttr('id').addClass('action-coupon').html('OK');
                            minicart.update()
                        });
                    });
                });
            }
        });   
    },
    verificaValorFreteGratis: function(){
        return setTimeout((function() {
            var subTotal = vtexjs.checkout.orderForm.totalizers;
            var newSubTotal = subTotal[0].value;      
                if (newSubTotal < 29998) {
                    var hundredPercent = 29998;
                    var totalPercent = Math.floor((newSubTotal / hundredPercent) * 100);
                    var sum = hundredPercent - newSubTotal;
                    var newSum = sum;
                    $('.free-shipping-bar').html(`<p>Faltam <span class="valor-moeda">${newSum}</span> para Frete Grátis</p>`);
                    if(newSum < 10000){
                        $('.valor-moeda').mask('R$ #0,00');
                    }else if(newSum < 1000){
                        $('.valor-moeda').mask('R$ #,00');
                    }else if(newSum < 100){
                        $('.valor-moeda').mask('R$ 0,##');
                    }else{
                        $('.valor-moeda').mask('R$ #00,00');
                    }
                    $('.color-bar').css('width', `${totalPercent}%`);  
                }else if (newSubTotal >= 29998) {
                    $('.color-bar').css('width', '100%');
                    $('.free-shipping-bar').html("<p><span>Parabéns</span>Você ganhou Frete Grátis</p>");
                }else{
                    $('.color-bar').css('width', '0%');
                    $('.free-shipping-bar').text('Faltam R$299,99 para você ganhar Frete Grátis');
                }
        }
        ), 3000),
        this
    },
    verificaAdicaoSubtracaoCart: function(){
        $(document).on("click", ".qtd-remove, .qtd-adiciona, .planet-buy-button, .list-prod-remove", (function() {
            minicart.verificaValorFreteGratis();
        }
        ))
    },
    miniCartInit: function () {
        vtexjs.checkout.getOrderForm().done(function (t) {
            minicart.mountCart(), minicart.isEmptyCart(), minicart.controlers(), minicart.update(), minicart.shippingCalc(), minicart.couponCalc(), minicart.verificaValorFreteGratis(), minicart.verificaAdicaoSubtracaoCart(); 
        });
    },
};
minicart.miniCartInit();


function showHide() {
    $("body").on("click", ".click-open", function() {
            $(".drop").slideUp("fast"),
                $("body .click-close").addClass("click-open"),
                $("body .click-open").removeClass("click-close"),
                $(this).addClass("click-close").removeClass("click-open").next(".drop").slideDown(200).addClass("current");
        }),
        $(document).mouseup(function(e) {
            var i = $(".drop.current");
            i.is(e.target) ||
                0 !== i.has(e.target).length ||
                (i.slideUp(200).removeClass("current"),
                    setTimeout(function() {
                        i.prev(".click-close").removeClass("click-close").addClass("click-open");
                    }, 100));
        }),
        $("body").on("click", ".hide-open", function() {
            var e = $(this).attr("rel");
            $("." + e + ".current")
                .slideUp(200)
                .removeClass("current"),
                setTimeout(function() {
                    $("." + e)
                        .prev(".click-close")
                        .removeClass("click-close")
                        .addClass("click-open");
                }, 100);
        }),
        isMobile && $(".hover-open").removeClass("hover-open").find(".sub-open").addClass("click-open").removeAttr("href"),
        $("body").on("click", ".slide-show", function() {
            var e = $(this).attr("rel");
            !(function(e, i) {
                var t = {};
                (t[e] = "0"), $(i).show().animate(t, 300);
            })($(this).attr("rev"), "." + e),
            jQuery("body").addClass("noScroll");
        }),
        $("body").on("click", ".slide-hide", function() {
            var e = $(this).attr("rel");
            !(function(e, i) {
                var t = {};
                (t[e] = "-100%"),
                $(i).animate(t, 300, function() {
                    $(i).hide();
                });
            })($(this).attr("rev"), "." + e),
            jQuery("body").removeClass("noScroll");
        }),
        $("body").on("click", ".show", function() {
            var e = $(this).attr("rel");
            $("." + e).slideToggle("fast"), $(this).toggleClass("active");
        }),
        $(".search .wrap").prepend("<span class='close-search'> </span>"),
        $("body .close-search").on("click", function() {
            $(".search").slideToggle("fast");
        });
    var e = [];
    $(".hover-open").hover(
        function() {
            var i = jQuery.data(this),
                t = $(this);
            e[i] = setTimeout(function() {
                t.children(".drop").fadeIn(0), (e[i] = "");
            }, 0);
        },
        function() {
            var i = jQuery.data(this);
            "" != e[i] ? clearTimeout(e[i]) : $(this).children(".drop").fadeOut(0);
        }
    );
}
setTimeout(showHide, 1000);



