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
                ? ($(".header-cart--info-value").html(minicart.formatPrice(vtexjs.checkout.orderForm.totalizers[0].value / 100)), $(".header-minicart-value").html(minicart.formatPrice(vtexjs.checkout.orderForm.totalizers[0].value / 100)))
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
    miniCartInit: function () {
        vtexjs.checkout.getOrderForm().done(function (t) {
            minicart.mountCart(), minicart.isEmptyCart(), minicart.controlers(), minicart.update();
        });
    },
};
minicart.miniCartInit();
