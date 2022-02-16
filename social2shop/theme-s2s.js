var os_event = {
    init: function () {
        this.common(), this.scroll(), this.drop(), this.inputEmpty(), this.newsletter();
    },
    common: function () {
        $("body").on("click", ".slide-show", function (e) {
            e.preventDefault();
            var t,
                o,
                s = $(this).attr("rel"),
                a = $(this).attr("rev");
            (t = "." + s), ((o = {})[a] = "0"), $(t).show().animate(o, 300), $("body").addClass("noScroll");
        }),
            $("body").on("click", ".slide-hide", function (e) {
                e.preventDefault();
                var t,
                    o,
                    s = $(this).attr("rel"),
                    a = $(this).attr("rev");
                (t = "." + s),
                    ((o = {})[a] = "-100%"),
                    $(t).animate(o, 300, function () {
                        $(t).hide();
                    }),
                    $("body").removeClass("noScroll");
            }),
            $("body").on("click", ".show", function (e) {
                e.preventDefault();
                var t = $(this).attr("rel");
                $("." + t).slideToggle("fast"), $(this).toggleClass("active");
            }),
            $("body").on("click", ".protected", function () {
                var e = $(this).attr("rel");
                isLogin
                    ? (window.location.href = e)
                    : ($(".ext-modal, .wrap-modal.current").hide(), $("html, body").animate({ scrollTop: 0 }, 0), vtexid.setScopeName(jsnomeSite), vtexid.start({ returnUrl: e, userEmail: "", locale: "pt-BR", forceReload: !1 }));
            }),
            $("body").on("click", ".login-redir", function () {
                var e = $(this).attr("rel");
                isLogin
                    ? (window.location.href = e)
                    : ($(".ext-modal, .wrap-modal.current").hide(), $("html, body").animate({ scrollTop: 0 }, 0), vtexid.setScopeName(jsnomeSite), vtexid.start({ returnUrl: e, userEmail: "", locale: "pt-BR", forceReload: !1 }));
            });
    },
    drop: function () {
        var o = [];
        $(".hover-open").hover(
            function () {
                var e = jQuery.data(this),
                    t = $(this);
                o[e] = setTimeout(function () {
                    t.children(".drop").fadeIn(100), $(".bg-menu").fadeIn(), (o[e] = "");
                }, 100);
            },
            function () {
                var e = jQuery.data(this);
                "" != o[e] ? clearTimeout(o[e]) : ($(this).children(".drop").fadeOut(0), $(".bg-menu").hide());
            }
        ),
            $("body").on("click", ".click-open", function () {
                $(".drop").slideUp("fast"),
                    $("body .click-close").addClass("click-open"),
                    $("body .click-open").removeClass("click-close"),
                    $(this).addClass("click-close").removeClass("click-open").next(".drop").slideDown(200).addClass("current");
            }),
            $(document).mouseup(function (e) {
                var t = $(".drop.current");
                t.is(e.target) ||
                    0 !== t.has(e.target).length ||
                    (t.slideUp(200).removeClass("current"),
                    setTimeout(function () {
                        t.prev(".click-close").removeClass("click-close").addClass("click-open");
                    }, 100));
            });
    },
    scroll: function () {
        $(window).scroll(function (e) {
            300 < $(this).scrollTop() ? $("body").addClass("top-fixed") : $("body").removeClass("top-fixed"), 400 < $(this).scrollTop() ? $("body").addClass("show-top-fixed") : $("body").removeClass("show-top-fixed");
        });
    },
    modal: function () {
        $("body").on("click", ".remove-modal", function (e) {
            e.preventDefault(), $(this).parents(".ext-modal").remove(), $("body").removeClass("noScroll");
        }),
            $("body").on("click", ".hide-modal", function (e) {
                e.preventDefault(), $(this).parents(".ext-modal").hide(), $("body").removeClass("noScroll");
            }),
            $("body").on("click", ".show-modal", function (e) {
                e.preventDefault();
                var t = $(this).attr("rel");
                $("." + t).fadeIn(100), $("body").addClass("noScroll");
            }),
            $("body").on("click", ".video-modal", function (e) {
                e.preventDefault();
                var t = $(this).attr("data-id");
                $("body").append(
                    '<div class="ext-modal"><div class="wrap-modal"><div class="inner"><div class="dialog video"><a class="close remove-modal">Ãƒâ€”</a><div class="result"><iframe width="560" height="315" src="https://www.youtube.com/embed/' +
                        t +
                        '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div><div></div>'
                );
            });
    },
    tabs: function () {
        $("body").on("click", ".tabs .tab", function (e) {
            e.preventDefault();
            var t = $(this).attr("rel");
            return (
                $(this).parents(".tabs-all").find(".tabs .tab").removeClass("current"),
                $(this).addClass("current"),
                $(this).parents(".tabs-all").find(".tab-content").hide(),
                $(this)
                    .parents(".tabs-all")
                    .find("." + t)
                    .fadeIn(),
                !1
            );
        });
    },
    popup: function () {
        $("body").on("click", ".popup", function () {
            var e = $(this).attr("rel"),
                t = $(this).attr("pW"),
                o = $(this).attr("pH"),
                s = $("text", this).text();
            varWindow = window.open(e, s, "width=" + t + ", height=" + o + ", top=10, left=10");
        });
    },
    navinpage: function () {
        $("body").on("click", ".nav-in-page", function () {
            var e = $(this).attr("rel");
            $("html, body").animate({ scrollTop: $("." + e).offset().top - 120 }, 1e3);
        });
    },
    backtotop: function () {
        $("body").on("click", ".nav-top-page", function () {
            $("html, body").animate({ scrollTop: 0 }, 1e3);
        });
    },
    quantity: function () {
        $("body").on("click", ".update-qty.remove", function (e) {
            e.preventDefault();
            var t = $(this).parents(".qty").find(".select-qty"),
                o = t.val();
            "" == o && (o = 2), 1 < o && t.val(parseInt(o) - 1).trigger("change");
        }),
            $("body").on("click", ".update-qty.add", function (e) {
                e.preventDefault();
                var t = $(this).parents(".qty").find(".select-qty"),
                    o = t.val();
                "" == o && (o = 0), t.val(parseInt(o) + 1).trigger("change");
            });
    },
    inputEmpty: function () {
        $("body").on("keypress", "input.empty, textarea.empty", function () {
            $(this).removeClass("empty");
        });
    },
    newsletter: function () {
        $(".ft-newsletter").on("click", ".send", function () {
            var e = $("#ne-email").val(),
                t = $(this);
            if ("" == e) $("#ne-email").addClass("empty").focus();
            else if (os_util.isEmail(e)) {
                t.addClass("load");
                var o = { neEmail: e, neSend: !0 };
                setTimeout(function () {
                    $.ajax({ headers: { Accept: "application/json", "Content-Type": "application/json" }, url: "/api/dataentities/NE/documents", async: !1, crossDomain: !0, type: "PUT", data: JSON.stringify(o) })
                        .success(function (e) {
                            t.removeClass("load"), $(".ft-newsletter input").val(""), $(".ft-newsletter fieldset").hide(), $(".ft-newsletter .success").fadeIn();
                        })
                        .fail(function (e) {
                            t.removeClass("load"), alert("NÃƒÂ£o foi possÃƒÂ­vel cadastrar seu e-mail");
                        });
                }, 50);
            } else $("#ne-email").addClass("empty").focus();
        });
    },
},
os_menu = {
    init: function () {
        this.setup(), this.event();
    },
    setup: function () {},
    event: function () {
        $("body").on("click", ".nav-all .sub-open", function () {
            isMobile && ($(".nav-all .drop").show().animate({ left: "0" }, 300), $("#nav-store .wrap").css("overflow-y", "hidden"));
        }),
            $("body").on("click", ".nav-all li.level-1 a.level-1", function () {
                isMobile && ($(this).next(".sub-menu").show().animate({ left: "0" }, 300), $(this).parents(".drop").css("overflow-y", "hidden"));
            }),
            $("body").on("click", ".menu-back", function () {
                var e = $(this).parents(".sub-menu");
                e.animate({ left: "-100%" }, 300, function () {
                    e.hide();
                }),
                    $(this).parents(".drop").css("overflow-y", "auto");
            }),
            $("body").on("click", ".close-menu", function () {
                $("#nav-store").hide().css("left", "-100%"), $("#nav-store .wrap, .nav-all .drop, .nav-all .sub-menu").removeAttr("style"), $("body").removeClass("noScroll");
            }),
            $("body").on("click", ".menu-back-all", function () {
                var e = $(".nav-all .drop");
                e.animate({ left: "-100%" }, 300, function () {
                    e.hide();
                }),
                    $("#nav-store .wrap").css("overflow-y", "auto");
            }),
            $(".nav-all").hover(
                function () {
                    isMobile || ($(this).children(".drop").fadeIn(100), $(".bg-menu").fadeIn());
                },
                function () {
                    isMobile || ($(".nav-all a.level-1").removeClass("active"), $(".nav-all .sub-menu").hide(), $(".nav-all .drop").hide(), $(".nav-all .sub-menu").hide().css("width", "0"), $(".bg-menu").hide());
                }
            ),
            $(".nav-all li.level-1").hover(function () {
                if (!isMobile) {
                    var e = $(this).attr("rel");
                    $(".nav-all a.level-1").removeClass("active"),
                        $("a.level-1", this).addClass("active"),
                        $(".nav-all .sub-menu").hide(),
                        $(".sub-menu", this)
                            .css("width", e + "px")
                            .show();
                }
            });
    },
},
gtmCart = {
    init: function () {
        this.cartConfig(), this.updateCart(), this.qtyAdd(), this.qtyRemove(), this.qtyUpdate(), this.skuRemove(), this.shipping(), this.coupon();
    },
    disableCart: function () {
        $(".cartSkuQuantity a, .cartSkuQuantity .select-qty").addClass("disable").removeClass("enable"), $(".cartSkuQuantity .select-qty").attr("readonly", "readonly"), $(".resume-cart").addClass("load");
    },
    enableCart: function () {
        $(".cartSkuQuantity a, .cartSkuQuantity .select-qty").addClass("enable").removeClass("disable"),
            $(".cartSkuQuantity .select-qty").removeAttr("readonly"),
            $(".cart-qty").removeClass("read"),
            $(".resume-cart").removeClass("load");
    },
    cartLayout: function () {
        var e = $(window).height();
        $(window).width(), $(document).height();
        $(".wrap-minicart, .resume-cart").css("height", e + "px"), $(".cart-itens").css("height", e - 368 + "px");
    },
    cartConfig: function () {
        $(".resume-cart")
            .html(
                '<div class="cart-wrap"><div class="cart-header"><h4 class="title">Sua sacola</h4></div><div class="cart-content"><div class="cart-itens"><div class="cart-wrap-itens"></div></div></div><div class="cart-footer"><div class="row cart-calc"><div class="row coupon"><a class="hide remove-coupon">Remover cupom</a><label for="coupon">Cupom de<br> desconto</label><input type="text" name="coupon" id="coupon" autocomplete="off"><button class="calc-coupon">Ok</button></div><div class="row shipping"><label for="zipcode">Calcule<br> o frete</label><input type="text" name="zipcode" id="zipcode" maxlength="9" onkeypress="return os_util.isNumberKey(event,this)" autocomplete="off"><button class="calc-shipping">Ok</button></div></div><div class="cart-summary"><div class="hide row coupon"><span class="txt">Desconto</span><strong class="value"></strong></div><div class="hide row shipping"><span class="txt">Frete</span><strong class="value"></strong></div><div class="row total"><span class="txt">Subtotal</span><strong class="value"></strong></div></div><div class="row cart-action"><a class="btn-cart" href="/checkout/#/cart"><span>Finalizar compra</span></a></div></div></div><div class="cart-modal"></div>'
            )
            .addClass("load"),
            gtmCart.cartLayout();
    },
    updateCart: function () {
        vtexjs.checkout.getOrderForm().done(function (e) {
            gtmCart.listCart(e);
        });
    },
    listCart: function (e) {
        var s = 0;
        if (0 < e.items.length) {
            var a = "",
                t = e.shippingData,
                o = e.totalizers,
                i = e.ratesAndBenefitsData;
            $.each(e.items, function (e, t) {
                var o = e;
                (cartName = t.name),
                    (cartId = t.id),
                    (cartQty = t.quantity),
                    (cartImage = t.imageUrl),
                    (cartPrice = t.price),
                    (cartUrl = t.detailUrl),
                    (a +=
                        '<ul class="row cart-group item-' +
                        o +
                        '" rel="' +
                        o +
                        '"><li class="cartSkuImage"><a href="' +
                        cartUrl +
                        '"><img src="' +
                        cartImage +
                        '" alt="' +
                        cartName +
                        '"></a></li><li class="cartSkuDados"><div class="cartSkuName"><a href="' +
                        cartUrl +
                        '">' +
                        cartName +
                        '</a></div><div class="cartSkuQuantity"><div class="row cart-qty"><label>Qtde.:</label><span><a class="remove-cart-qty disable">-</a><input type="text" onkeypress="return os_util.isNumberKey(event,this)" class="select-qty disable" maxlength="4" readonly value="' +
                        cartQty +
                        '"><a class="add-cart-qty disable">+</a></span></div></div><div class="cartSkuPrice"><span class="cartValue">R$ ' +
                        os_util.formatCurrency(cartPrice) +
                        '</span></div></li><li class="cartSkuRemove"><a class="removeItem" rel="' +
                        o +
                        '">x</a></li></ul>'),
                    (s += cartQty);
            }),
                $(".resume-cart .cart-itens").html('<div class="cart-wrap-itens">' + a + "</div>"),
                null != t &&
                    null != t &&
                    0 < t.selectedAddresses.length &&
                    ($("#zipcode").val(t.address.postalCode),
                    $.each(o, function (e, t) {
                        "Shipping" == t.id &&
                            (0 == t.value
                                ? $(".shipping").show().find(".value").html("Grátis")
                                : $(".shipping")
                                      .show()
                                      .find(".value")
                                      .html("R$ " + os_util.formatCurrency(t.value)));
                    })),
                null != i &&
                    0 < i.rateAndBenefitsIdentifiers.length &&
                    ($(".remove-coupon").css("display", "block"),
                    $.each(o, function (e, t) {
                        "Discounts" == t.id &&
                            $(".coupon")
                                .show()
                                .find(".value")
                                .html("R$ " + os_util.formatCurrency(t.value));
                    })),
                $(".resume-cart .cart-summary .total .value").html("R$ " + os_util.formatCurrency(e.value)),
                $(".cart-footer, .cart-header").show(),
                gtmCart.enableCart();
        } else
            $(".cart-itens").html('<div class="empty-mini-cart"><img src="/arquivos/icon-search-2.png" alt="i­cone lupa" class="image"> <p>A sua sacola de compras<br>está vazia.</p></div>'), $(".cart-footer, .cart-header").hide();
        $(".mini-cart .total-qty").html(s), $(".cart-wrap").show();
    },
    qtyAdd: function () {
        $(".resume-cart").on("click", ".add-cart-qty.enable", function () {
            var e = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) + 1;
            $(this).parents(".cart-qty").find(".select-qty").val(e).trigger("change");
        });
    },
    qtyRemove: function () {
        $(".resume-cart").on("click", ".remove-cart-qty.enable", function () {
            var e = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) - 1;
            0 < e && $(this).parents(".cart-qty").find(".select-qty").val(e).trigger("change");
        });
    },
    qtyUpdate: function () {
        $(".resume-cart").on("change", ".select-qty.enable", function () {
            var e = $(this).parents(".cart-group").attr("rel"),
                t = parseInt($(this).val());
            gtmCart.disableCart(), gtmCart.qtyRefresh(e, t), $(this).parents(".cart-qty").addClass("read");
        });
    },
    qtyRefresh: function (o, s) {
        vtexjs.checkout
            .getOrderForm()
            .then(function (e) {
                e.items[0];
                var t = { index: parseInt(o), quantity: parseInt(s) };
                return vtexjs.checkout.updateItems([t], null, !1);
            })
            .done(function (e) {
                gtmCart.listCart(e);
            });
    },
    skuRemove: function () {
        $(".resume-cart").on("click", ".removeItem", function () {
            var o = parseInt($(this).attr("rel"));
            gtmCart.disableCart(),
                vtexjs.checkout
                    .getOrderForm()
                    .then(function (e) {
                        e.items[0];
                        var t = [{ index: o, quantity: 0 }];
                        return vtexjs.checkout.removeItems(t);
                    })
                    .done(function (e) {
                        gtmCart.listCart(e);
                    });
        });
    },
    shipping: function () {
        $("body").on("keypress", ".cart-footer #zipcode", function () {
            os_util.maskZip(this, "#####-###");
        }),
            $("body").on("click", ".calc-shipping", function () {
                var o = $(".cart-footer #zipcode").val();
                9 != o.length
                    ? $(".cart-footer #postalCart").addClass("empty").focus()
                    : (gtmCart.disableCart(),
                      vtexjs.checkout
                          .getOrderForm()
                          .then(function (e) {
                              var t = { postalCode: o, country: "BRA" };
                              return vtexjs.checkout.calculateShipping(t);
                          })
                          .done(function (e) {
                              gtmCart.listCart(e);
                          }));
            });
    },
    coupon: function () {
        $("body").on("click", ".calc-coupon", function () {
            var t = $(".cart-footer #coupon").val();
            "" == t
                ? $(".cart-footer #coupon").addClass("empty").focus()
                : (gtmCart.disableCart(),
                  vtexjs.checkout
                      .getOrderForm()
                      .then(function (e) {
                          return vtexjs.checkout.addDiscountCoupon(t);
                      })
                      .done(function (e) {
                          $(".cart-footer #coupon").val(""), gtmCart.listCart(e);
                      }));
        }),
            $("body").on("click", ".remove-coupon", function () {
                $(this).hide(),
                    gtmCart.disableCart(),
                    vtexjs.checkout
                        .getOrderForm()
                        .then(function (e) {
                            return vtexjs.checkout.removeDiscountCoupon();
                        })
                        .done(function (e) {
                            $(".cart-summary .coupon").hide(), gtmCart.listCart(e);
                        });
            });
    },
},
isMobile = !1,
os_mobile = {
    init: function () {
        this.setup(), this.event();
    },
    setup: function () {
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
            ((isMobile = !0), $("body").addClass("nav-mobile"), $(".hover-open").removeClass("hover-open").find(".sub-open").addClass("click-open").removeAttr("href"));
    },
    event: function () {
        $(window).height();
        var e = $(window).width(),
            t = $(".box-link.nav-account, .box-link.nav-user");
        e < 1023 ? t.appendTo($("#nav-store .menu-user")) : $(".utilities .sac").after(t);
    },
},
os_shelf = {
    init: function () {
        $(".list-prod.shelf").length && this.setup();
    },
    setup: function () {},
},
isLogin = !1,
userEmail = "";
jQuery.expr[":"].icontains = function (e, t, o) {
return 0 <= jQuery(e).text().toUpperCase().indexOf(o[3].toUpperCase());
};
var os_store = {
init: function () {
    this.getInstance(), this.setup(), this.welcome();
},
setup: function () {
    $(".header .search .btn-buscar").after($(".ui-autocomplete")), $("li.helperComplement").remove();
},
getInstance: function () {
    var controller = $("meta[name=controller]").attr("content");
    eval(controller).init();
},
welcome: function () {
    $.get("/no-cache/profileSystem/getProfile").done(function (e) {
        if (e.IsUserDefined) {
            (isLogin = !0), (userEmail = e.Email);
            var t = e.FirstName;
            (null != t && null != t) || (userEmail.split("@"), 8 < (t = t[0]).length && (t = t.substring(0, 2) + "...")), $(".nav-user .logout .name").html(t), $(".nav-user .logout").show();
        } else (isLogin = !1), $(".nav-user .login").show();
    });
},
autoSearch: function () {
    $(".ui-autocomplete li").each(function () {
        var e = $(this);
        if (0 < e.find("img").length) {
            var t = e.find("img").attr("src");
            (t = t.replace("-25-25", "-60-60")), e.find("img").attr("src", t), e.addClass("hasImage");
        }
    }),
        $(".product-found").length <= 0 && $(".hasImage").wrapAll('<ul class="product-found"></ul>');
},
};
$(document).ajaxStop(function () {
$("li.helperComplement").remove(), $(".ui-autocomplete li").length && os_store.autoSearch();
}),
(window.onresize = function (e) {
    gtmCart.cartLayout(), os_mobile.event();
});
var map = {
    "ÃƒÂ¢": "a",
    "Ãƒâ€š": "A",
    "Ãƒ ": "a",
    "Ãƒâ‚¬": "A",
    "ÃƒÂ¡": "a",
    "ÃƒÂ": "A",
    "ÃƒÂ£": "a",
    "ÃƒÆ’": "A",
    ÃƒÂª: "e",
    "ÃƒÅ ": "E",
    "ÃƒÂ¨": "e",
    "ÃƒË†": "E",
    "ÃƒÂ©": "e",
    "Ãƒâ€°": "E",
    "ÃƒÂ®": "i",
    "ÃƒÅ½": "I",
    "ÃƒÂ¬": "i",
    "ÃƒÅ’": "I",
    "ÃƒÂ­": "i",
    "ÃƒÂ": "I",
    ÃƒÂµ: "o",
    "Ãƒâ€¢": "O",
    "ÃƒÂ´": "o",
    "Ãƒâ€": "O",
    "ÃƒÂ²": "o",
    "Ãƒâ€™": "O",
    "ÃƒÂ³": "o",
    "Ãƒâ€œ": "O",
    "ÃƒÂ¼": "u",
    "ÃƒÅ“": "U",
    "ÃƒÂ»": "u",
    "Ãƒâ€º": "U",
    ÃƒÂº: "u",
    "ÃƒÅ¡": "U",
    "ÃƒÂ¹": "u",
    "Ãƒâ„¢": "U",
    "ÃƒÂ§": "c",
    "Ãƒâ€¡": "C",
    " ": "-",
    "&": "e",
},
os_util = {
    isEmail: function (e) {
        console.log(e);
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
    },
    strToClass: function (e) {
        return e
            .replace(/[\W\[\] ]/g, function (e) {
                return map[e] || e;
            })
            .toLowerCase();
    },
    isNumberKey: function (e, t) {
        var o = e.which ? e.which : event.keyCode;
        return (-1 == t.value.indexOf(".") || 46 != o) && (46 == o || !(31 < o && (o < 48 || 57 < o)));
    },
    maskZip: function (e, t) {
        var o = e.value.length,
            s = t.substring(1, 0),
            a = t.substring(o);
        a.substring(0, 1) != s && (e.value += a.substring(0, 1));
    },
    extraiValor: function (e) {
        return parseFloat(
            e
                .replace(",", ".")
                .replace(/(\d)(\.)(?=\d\d\d)/g, "$1")
                .slice(3)
        );
    },
    formatFloatReal: function (e) {
        var t;
        return (
            (t = e.toString().slice(-2)),
            "<span>R$</span> " +
                e
                    .toString()
                    .slice(0, -3)
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
                "," +
                t
        );
    },
    formatCurrency: function (e) {
        var t = e + "",
            o = !1;
        return (
            0 == t.indexOf("-") && ((o = !0), (t = t.replace("-", ""))),
            1 == t.length && (t = "0" + t),
            6 < (t = t.replace(/([0-9]{2})$/g, ",$1")).length && (t = t.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")),
            9 < t.length && (t = t.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3")),
            12 < t.length && (t = t.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4")),
            0 == t.indexOf(".") && (t = t.replace(".", "")),
            0 == t.indexOf(",") && (t = t.replace(",", "0,")),
            o ? "-" + t : t
        );
    },
    createCookie: function (e, t, o) {
        var s = "";
        if (o) {
            var a = new Date();
            a.setTime(a.getTime() + 24 * o * 60 * 60 * 1e3), (s = "; expires=" + a.toUTCString());
        }
        document.cookie = e + "=" + t + s + "; path=/";
    },
    readCookie: function (e) {
        for (var t = e + "=", o = document.cookie.split(";"), s = 0; s < o.length; s++) {
            for (var a = o[s]; " " == a.charAt(0); ) a = a.substring(1, a.length);
            if (0 == a.indexOf(t)) return a.substring(t.length, a.length);
        }
        return null;
    },
    removeCookie: function (e) {
        os_util.createCookie(e, "", -1);
    },
    skuToCart: function (e) {
        $.ajax({
            type: "GET",
            url: window.location.origin + e,
            success: function () {
                vtexjs.checkout.getOrderForm().done(function (e) {
                    gtmCart.listCart(e);
                }),
                    $(".open-minicart").click(),
                    $(".buy-button.load, .add-to-cart.load, .btn-buy.load").removeClass("load");
            },
            error: function () {
                console.log("Nãoo foi possível adicionar ao carrinho");
            },
            complete: function () {},
        });
    },
    carrosselShelf: function (e, t) {
        $(e).slick({
            infinite: !1,
            dots: t,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 321, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        });
    },
    buyOnPage: function (e) {
        $.ajax({
            type: "GET",
            url: window.location.origin + e,
            success: function () {
                vtexjs.checkout.getOrderForm().done(function (e) {
                    gtmCart.listCart(e);
                }),
                    $(".open-minicart").click(),
                    $(".buy-button.load").removeClass("load");
            },
            error: function () {
                console.log("Não foi possí­vel adicionar ao carrinho");
            },
            complete: function () {},
        });
    },
},
pg404 = {
    init: function () {
        this.setup();
    },
    setup: function () {
        $(".collection.group-4 h2 + ul").slick({
            infinite: !1,
            dots: !1,
            arrows: !0,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1281, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        }),
            $(".sd h2").append('<div class="new-arrow"></div>').wrapInner("<span></span>"),
            $(".sd .slick-prev").appendTo($(".new-arrow")),
            $(".sd .slick-next").appendTo($(".new-arrow"));
    },
},
pgCatalog = {
    init: function () {
        this.event(), this.setup();
    },
    setup: function () {
        var e = $(".resultado-busca-numero:eq(0) .value").text();
        $(".total-list .value").html(e),
            pgCatalog.orderby(),
            $(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
                emptySearchMsg: "<h3>Ops! Esta combinação de filtros não retornou nenhum resultado.</h3><div></div>",
                filtersMenu: ".navigation-tabs",
                filterScrollTop: function () {
                    $("html, body").animate({ scrollTop: $("tool-category").offset().top }, 1e3);
                },
            }),
            $(".search-multiple-navigator fieldset").each(function () {
                var e = $("label", this).length;
                if (5 < e) {
                    for (var t = 5; t <= e; t++) $("label:eq(" + t + ")", this).addClass("inner");
                    $("div", this).append('<a class="ver-mais">ver todas</a>'), $(".inner", this).wrapAll('<div class="hide all-itens" />');
                }
            }),
            $(".menu-departamento").show();
    },
    event: function () {
        $(".search-multiple-navigator").on("click", ".ver-mais", function (e) {
            e.preventDefault(), $(this).prev(".all-itens").slideToggle("fast"), "ver todas" === $(this).text() ? $(this).text("ver menos") : $(this).text("ver todas");
        }),
            $(".search-multiple-navigator").on("click", "h5", function (e) {
                e.preventDefault(), $(this).next("div").slideToggle("fast"), $(this).toggleClass("active");
            });
    },
    orderby: function () {
        var s = $(".orderBy:eq(0) select").attr("onchange"),
            a = "";
        (s = (s = s.split("href= '"))[1].split("' + 'O=")),
            $(".orderBy:eq(0) option").each(function () {
                var e = "",
                    t = $(this).val(),
                    o = $(this).text();
                $(this).is(":selected") && (e = "current-order"), (a += '<li><a href="' + s[0] + "O=" + t + '" class="' + e + '">' + o + "</a></li>");
            }),
            $(".select-orderby").html(a),
            $(".list-orderby li:eq(0) a").remove(),
            $(".list-orderby li:eq(0), .list-orderby li:eq(4)").remove(),
            $(".list-orderby li a.current-order").attr("href", "javascript:void(0);"),
            $(".list-orderby").show();
    },
},
pgDepartament = {
    init: function () {
        this.setup(), this.event();
    },
    setup: function () {
        $(".header-category .title").text(vtxctx.departmentName),
            $(".collection.group-5 h2 + ul, .collection.group-6 h2 + ul").slick({
                infinite: !1,
                dots: !1,
                arrows: !0,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1281, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 591, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                    { breakpoint: 321, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            }),
            $(".sd").each(function () {
                $("h2", this).append('<div class="new-arrow"></div>').wrapInner("<span></span>"), $(".slick-prev", this).appendTo($(".new-arrow", this)), $(".slick-next", this).appendTo($(".new-arrow", this));
            }),
            $(".productClusterSearchableIds a").each(function () {
                var e = $(this).attr("title");
                $(this).addClass(e);
            }),
            $(".search-single-navigator ul").each(function () {
                var e = $("li", this).length;
                if ((0 < e ? $(this).prev("h4").addClass("showgroup").find("a").removeAttr("href") : $(this).remove(), 5 < e)) {
                    for (var t = 5; t <= e; t++) $("li:eq(" + t + ")", this).addClass("inner");
                    $(".inner", this).wrapAll('<div class="hide all-itens" />'), $(this).append('<a class="ver-mais">ver todas</a>');
                }
            }),
            $(".menu-departamento").show();
    },
    event: function () {
        $(".search-single-navigator").on("click", "h5, .showgroup", function (e) {
            e.preventDefault(), $(this).next("ul").slideToggle("fast"), $(this).toggleClass("active");
        }),
            $(".search-single-navigator").on("click", ".ver-mais", function (e) {
                e.preventDefault(), $(this).prev(".all-itens").slideToggle("fast"), "ver todas" === $(this).text() ? $(this).text("ver menos") : $(this).text("ver todas");
            });
    },
},
pgDesigner = {
    init: function () {
        this.setup();
    },
    setup: function () {
        var e = $(".designer .info h2").text();
        $(".bread-crumb ul").append('<li class="last">' + e + "</li>");
    },
},
pgEmpty = {
    init: function () {
        this.setup();
    },
    setup: function () {
        var e = $("meta[name=Abstract]").attr("content"),
            t = decodeURIComponent(escape(e));
        $(".digitado").html(t);
    },
},
pgHome = {
    init: function () {
        this.setup(), os_event.modal();
    },
    setup: function () {
        $(".banner.position-1 .desktop .row, .banner.position-1 .mobile .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3, dots: !1 }),
            $(".collection.group-1 h2 + ul, .collection.group-2 h2 + ul").slick({
                infinite: !0,
                dots: !1,
                arrows: !0,
                slidesToShow: 6,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1281, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                    { breakpoint: 1023, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 591, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                    { breakpoint: 321, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            }),
            $(".collection.group-3 h2 + ul").slick({
                infinite: !0,
                dots: !1,
                arrows: !0,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                    { breakpoint: 591, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            }),
            $(".banner.position-4 .row").slick({
                infinite: !1,
                dots: !1,
                arrows: !0,
                slidesToShow: 6,
                centerMode: !1,
                centerPadding: "30px",
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1025, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                    { breakpoint: 961, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 491, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                ],
            }),
            $(".sd").each(function () {
                $("h2", this).append('<div class="new-arrow"></div>').wrapInner("<span></span>"), $(".slick-prev", this).appendTo($(".new-arrow", this)), $(".slick-next", this).appendTo($(".new-arrow", this));
            }),
            $(".banner.position-5 .box-banner").each(function () {
                var e = $("img", this).attr("alt");
                $(this).append('<div class="legenda fs-20"><h3>' + e + "</h3></div>");
            });
    },
},
pgInstitucional = {
    init: function () {
        this.setup();
    },
    setup: function () {
        var e = $(".custom .post h2:eq(0)").text();
        $(".bread-crumb ul").append('<li class="last">' + e + "</li>");
    },
},
pgProduct = {
    init: function () {
        this.setup(), this.share(), this.event(), $(".image-product").vtexImage({ fullscreen: !1, zoom: !0, typeZoom: "click", thumb: 20 });
    },
    setup: function () {
        $(".collection.group-7 h2 + ul").slick({
            infinite: !1,
            dots: !1,
            arrows: !0,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                { breakpoint: 1281, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                { breakpoint: 1023, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                { breakpoint: 769, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 591, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                { breakpoint: 321, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        }),
            $(".sd h2").append('<div class="new-arrow"></div>').wrapInner("<span></span>"),
            $(".sd .slick-prev").appendTo($(".new-arrow")),
            $(".sd .slick-next").appendTo($(".new-arrow"));
    },
    share: function () {
        var e = window.location.href;
        skuJson.name, skuJson.skus[0].image;
        $(".twitter-share-button").attr("rel", "https://twitter.com/intent/tweet?text=" + e), $(".facebook-share-button").attr("rel", "https://www.facebook.com/sharer/sharer.php?u=" + e);
    },
    event: function () {
        os_event.tabs(),
            os_event.popup(),
            os_event.quantity(),
            $("body").on("click", ".buy-button", function (e) {
                e.preventDefault();
                var t = $(this),
                    o = t.attr("href"),
                    s = $(".info-product .select-qty").val();
                isNaN(s) && (s = 1),
                    s < 1 && (s = 1),
                    1 < o.indexOf("alert")
                        ? alert("Por favor, selecione a opção desejada antes de comprar.")
                        : (t.addClass("load"),
                          setTimeout(function () {
                              var e = "/checkout/cart/add?sc=1&sku=" + o.split("sku=")[1].split("&qty=")[0] + "&qty=" + s + "&seller=1";
                              os_util.buyOnPage(e);
                          }, 50));
            });
    },
};
(pgSearch = {
init: function () {
    this.setup(), pgDepartament.event();
},
setup: function () {
    var e = $(".resultado-busca-numero:eq(0) .value").text();
    $(".total-list .value").html(e),
        $(".header-search .description").text(vtxctx.searchTerm),
        pgCatalog.orderby(),
        1 < $(".search-single-navigator h3").length
            ? $(".search-single-navigator ul").each(function () {
                  var e = $("li", this).length;
                  if ((0 < e ? $(this).prev("h3").addClass("showgroup").find("a").removeAttr("href") : $(this).remove(), 5 < e)) {
                      for (var t = 5; t <= e; t++) $("li:eq(" + t + ")", this).addClass("inner");
                      $(".inner", this).wrapAll('<div class="hide all-itens" />'), $(this).append('<a class="ver-mais">ver todas</a>');
                  }
              })
            : $(".search-single-navigator ul").show(),
        $(".menu-departamento").show();
},
}),
$(document).ready(function () {
    $("li.helperComplement").remove(), gtmCart.init(), os_store.init(), os_mobile.init(), os_menu.init(), os_event.init();
});


// // MODAL DO AGEGATE
// if (window.location.href.indexOf('vinho') > 0) {
//     $('.lightbox-bg, .selectAge').addClass('active');
//     console.log('true');
//  }else{
//      $('.lightbox-bg').removeClass('active');
//      $('.selectAge').removeClass('active');
//      $('.negative').removeClass('active');
//      console.log('false');
//  }
 
//  var yes = 'true';
//  var no = 'false';
 
//  $('.button-yes').click(function(){
//      localStorage.setItem('ageGate', yes);
//      $('.lightbox-bg').removeClass('active');
//  });
//  $('.button-no').click(function(){
//      localStorage.setItem('ageGate', no);
//      $('.negative').addClass('active');
//      $('.selectAge').removeClass('active');
//  });
 
//  if (localStorage.getItem('ageGate') === 'true'){
//      $('.ageGate').removeClass('active');
//      $('.selectAge').removeClass('active');
//  }else if (localStorage.getItem('ageGate') === 'false'){
//     $('.ageGate').addClass('active'); 
//     $('.negative').addClass('active');
//     $('.selectAge').removeClass('active');
//  }

//  if (localStorage.getItem('ageGate') === 'false' && document.location.href.indexOf('vinho') === -1){
//     $('.lightbox-bg').removeClass('active');
//      $('.selectAge').removeClass('active');
//      $('.negative').removeClass('active');
// }

//MODAL DA PRÉ FRIDAY (com utilidade)

// Criação da função de Cookie Management
// // Setar Cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
// // Buscar Cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// // Apagar Cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// CONFIGURAÇÃO DO DISPARO DO MODAL COM COOKIE MANAGEMENT
var retrieveCookie = getCookie('preFriday');
if (!retrieveCookie) {
    $('.black-friday').css('display','block');
}else{
    $('.black-friday').css('display','none');
}

$('.close-botao').click(function(){
    setCookie('preFriday','true', 1);
    $('.black-friday').css('display','none');
});

