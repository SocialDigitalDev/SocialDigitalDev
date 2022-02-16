!(function (n) {
    var r = {};
    function i(e) {
        if (r[e]) return r[e].exports;
        var t = (r[e] = { i: e, l: !1, exports: {} });
        return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
    }
    (i.m = n),
        (i.c = r),
        (i.d = function (e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (i.t = function (t, e) {
            if ((1 & e && (t = i(t)), 8 & e)) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if ((i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                for (var r in t)
                    i.d(
                        n,
                        r,
                        function (e) {
                            return t[e];
                        }.bind(null, r)
                    );
            return n;
        }),
        (i.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return i.d(t, "a", t), t;
        }),
        (i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (i.p = ""),
        i((i.s = 11));
})([
    function (e, t, n) {},
    function (e, t) {
        $(document).ready(function () {
            $(".bread-crumb ul li a").first().html("<span>Home</span>");
        });
    },
    function (e, t) {
        $(document).ready(function () {
            var e;
            (e = document.querySelectorAll(".vitrine ul li")),
                Array.from(e).forEach(function (e) {
                    e.classList.contains("helperComplement") ? e.remove() : e.classList.add("vitrine-item");
                }),
                setInterval(function () {
                    $(".vitrine .vitrine__flag-desconto")
                        .not(".complete")
                        .each(function () {
                            $(this).toggleClass("complete");
                            var e = $(this).find(".porcentagem").text(),
                                e = parseInt(e);
                            $(this)
                                .find(".porcentagem")
                                .html(Math.round(e) + "%");
                        });
                }, 100),
                $(".vitrine-carousel .vitrine ul").slick({
                    mobileFirst: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: !1,
                    infinite: !0,
                    arrows: !0,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg class="icon-arrow icon-arrow-left"><use xlink:href="#iconArrowLeft" /></svg></button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg class="icon-arrow icon-arrow-right"><use xlink:href="#iconArrowRight" /></svg></button>',
                    responsive: [
                        { breakpoint: 576, settings: { slidesToShow: 2, slidesToScroll: 2, arrows: !0 } },
                        { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3, arrows: !0 } },
                        { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 4, arrows: !0 } },
                    ],
                });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(".banner-carousel").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: !0,
                autoplaySpeed: 4e3,
                arrows: !1,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg class="icon-arrow icon-arrow-left"><use xlink:href="#iconArrowLeft" /></svg></button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg class="icon-arrow icon-arrow-right"><use xlink:href="#iconArrowRight" /></svg></button>',
            });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(".filters .bread-crumb a[title='lojaplanetgirls']").html("<span>Home</span>");
            var e = $(".js-submenu-filter"),
                t = $(".js-submenu-orderby");
            $(".js-menu-filter").on("click", function () {
                e.slideToggle("fast"), t.slideUp("fast");
            }),
                $(".js-menu-orderby").on("click", function () {
                    t.slideToggle("fast"), e.slideUp("fast");
                }),
                $(".filters__orderby-item").each(function () {
                    $(this).on("click", function (e) {
                        e.preventDefault();
                        var t = $(".resultado-busca-filtro #O").attr("onchange"),
                            n = t.indexOf("/"),
                            r = t.lastIndexOf("&"),
                            i = t.slice(n, r),
                            a = $(this).attr("data-value");
                        window.location = urlFinal + i + "&O=" + a;
                    });
                });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(document).on("click", ".newsletter button", function () {
                var e;
                (e = { name: $("#name").val(), email: $("#email").val(), isNewsletterOptIn: !0 }),
                    $("#mensagem").html('\n      <div class="message-success message-enviando">\n        <span class="text"><strong>Enviando...</strong></span>\n      </div>\n    '),
                    $.ajax({
                        url: "/api/dataentities/NW/documents",
                        type: "put",
                        dataType: "json",
                        contentType: "application/json",
                        success: function () {
                            $("#mensagem").html(
                                '\n          <div class="message-success">\n            <span class="text"><strong>Obrigado por se cadastrar na Planet Girls!</strong></span>\n            <span class="text">Em breve entraremos em contato com vocÃª para oferecer as melhores promoÃ§Ãµes.</span>\n          </div>\n          '
                            );
                        },
                        data: JSON.stringify(e),
                    });
            });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(".btnMenuMobile").click(function () {
                $(".header__menu").addClass("active"), $(".mask-menu").addClass("active");
            }),
                $(".header__menu-close").click(function () {
                    $(".header__menu").removeClass("active"), $(".mask-menu").removeClass("active");
                });
            var r = document.querySelectorAll(".header__menu .header__menu-link.level-0"),
                i = document.querySelectorAll(".header__menu .header__menu-content.level-1"),
                a = document.querySelectorAll(".header__menu .icon-arrow-down");
            r.forEach(function (e, n) {
                e.addEventListener("click", function (e) {
                    var t;
                    e.preventDefault(), i[(t = n)].classList.toggle("active"), r[t].classList.toggle("active"), a[t].classList.toggle("active");
                });
            }),
                $("#header .topnav .icon-search").click(function () {
                    $("#header .search").addClass("active");
                }),
                $("#header .icon-close").click(function () {
                    $("#header .search").removeClass("active");
                });
            var e = $(".js-content-search");
            $(".js-search-content").on("click", function () {
                e.slideToggle("fast");
            }),
                $(".js-close-searchCloseButton").on("click", function () {
                    e.slideUp("fast");
                });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            var n = document.querySelectorAll("#footer .link-nivel-0"),
                r = document.querySelectorAll("#footer .link-nivel-0 .icon-arrow-down"),
                i = document.querySelectorAll("#footer .submenu-box");
            n.forEach(function (e, t) {
                e.addEventListener("click", function () {
                    var e;
                    i[(e = t)].classList.toggle("active"), n[e].classList.toggle("active"), r[e].classList.toggle("active");
                });
            });
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(".page-home");
        });
    },
    function (e, t) {
        $(document).ready(function () {
            $(".page-category") &&
                $(".js-filter input[type='checkbox']").vtexSmartResearch({
                    pageLimit: null,
                    loadContent: ".vitrine[id^=ResultItems]",
                    shelfClass: ".vitrine",
                    filtersMenu: ".search-multiple-navigator",
                    linksMenu: ".search-single-navigator",
                    menuDepartament: ".navigation .menu-departamento",
                    mergeMenu: !0,
                    insertMenuAfter: ".search-multiple-navigator h3:first",
                    emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
                    elemLoading: '<div id="scrollLoading">Carregando produtos... </div>',
                    returnTopText: '<span class="text">Voltar</span><span class="text2">ao topo</span>',
                    emptySearchMsg: "<h3>Esta combinaÃ§Ã£o de filtros nÃ£o retornou nenhum resultado!</h3>",
                    filterErrorMsg: "Houve um erro ao tentar filtrar a pÃ¡gina!",
                    searchUrl: null,
                    usePopup: !1,
                    showLinks: !0,
                    popupAutoCloseSeconds: 3,
                    filterScrollTop: function (e) {
                        return e.top - 180;
                    },
                    callback: function () {},
                    getShelfHeight: function (e) {
                        return e.scrollTop() + e.height();
                    },
                    shelfCallback: function () {},
                    ajaxCallback: function () {},
                    emptySearchCallback: function () {},
                    authorizeScroll: function () {
                        return !0;
                    },
                    authorizeUpdate: function () {
                        return !0;
                    },
                    labelCallback: function () {},
                }),
                $(".js-menu-filter").click(function () {
                    $(".js-filter").addClass("active");
                }),
                $(".c-filters__iconClose").click(function () {
                    $(".js-filter").removeClass("active");
                }),
                $(".js-filter h4, .js-filter h3, .js-filter label").click(function () {
                    $(".js-filter").removeClass("active");
                });
            var e = $(".c-list__top"),
                t = $(".c-list__topMobile"),
                n = $(window).width();
            setTimeout(function () {
                n < 768 ? t.append($(".orderBy").first()) : e.append($(".orderBy").first());
            }, 200),
                $(".c-list__top select option:first-child").text("Ordenar por"),
                (function () {
                    $(".page-category .c-list__tags").append('\n      <div class="applied-filter">\n        <div id="filters">\n        </div>\n      </div>\n    '),
                        $(".page-category .c-list__tags .clear-filter-btn").on("click", function () {
                            $(".applied-filter__item").remove();
                        });
                    var n = $(".applied-filter");
                    $(document).on("change", "input", function () {
                        this.checked || $('[id="'.concat(this.name, '"]')).remove();
                        var e = $(".multi-search-checkbox:checked"),
                            t = e.length;
                        t <= 0 ? $(n).removeClass("applied-filter--draw") : $(n).addClass("applied-filter--draw"),
                            t <= 0 ? $(".navigation-tabs").removeClass("navigation-tabs--smaller") : $(".navigation-tabs").addClass("navigation-tabs--smaller"),
                            $("#applied-filters-title").text("Filtros selecionados (".concat(t, "):")),
                            e.each(function (e, t) {
                                var n = t.parentElement.innerText,
                                    r = t.name;
                                0 === $('[id="'.concat(r, '"]')).length &&
                                    $("<span>", {
                                        text: n,
                                        id: r,
                                        title: "Remover - " + r,
                                        class: "applied-filter__item",
                                        click: function () {
                                            $('input[name="'.concat($(this).attr("id"), '"]'))
                                                .prop("checked", !1)
                                                .trigger("change"),
                                                $(this).remove();
                                        },
                                    }).appendTo("#filters");
                            });
                    });
                })();
        });
    },
    function (e, t) {
        $(document).ready(function () {
            1 === $(".page-department").length &&
                $(".js-submenu-filter input[type='checkbox']").vtexSmartResearch({
                    pageLimit: null,
                    loadContent: ".vitrine[id^=ResultItems]",
                    shelfClass: ".vitrine",
                    filtersMenu: ".search-multiple-navigator",
                    linksMenu: ".search-single-navigator",
                    menuDepartament: ".navigation .menu-departamento",
                    mergeMenu: !0,
                    insertMenuAfter: ".search-multiple-navigator h3:first",
                    emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
                    elemLoading: '<div id="scrollLoading">Carregando ... </div>',
                    returnTopText: '<span class="text">Voltar</span><span class="text2">ao topo</span>',
                    emptySearchMsg: "<h3>Esta combinaÃ§Ã£o de filtros nÃ£o retornou nenhum resultado!</h3>",
                    filterErrorMsg: "Houve um erro ao tentar filtrar a pÃ¡gina!",
                    searchUrl: null,
                    usePopup: !1,
                    showLinks: !0,
                    popupAutoCloseSeconds: 3,
                    filterScrollTop: function (e) {
                        return e.top - 20;
                    },
                    callback: function () {},
                    getShelfHeight: function (e) {
                        return e.scrollTop() + e.height();
                    },
                    shelfCallback: function () {},
                    ajaxCallback: function () {},
                    emptySearchCallback: function () {},
                    authorizeScroll: function () {
                        return !0;
                    },
                    authorizeUpdate: function () {
                        return !0;
                    },
                    labelCallback: function () {},
                }),
                (function () {
                    var e = $(".filters__content-orderby .clear-filter-btn").clone(!0, !0);
                    $(".filters__content-orderby").after('\n      <div class="applied-filter">\n        <div id="filters">\n        </div>\n      </div>\n      '),
                        $(".filters__content-orderby .applied-filter").append(e),
                        $(".filters__content-orderby .clear-filter-btn").on("click", function () {
                            $(".applied-filter__item").remove();
                        });
                    var n = $(".applied-filter");
                    $(document).on("change", "input", function () {
                        this.checked || $('[id="'.concat(this.name, '"]')).remove();
                        var e = $(".multi-search-checkbox:checked"),
                            t = e.length;
                        t <= 0 ? $(n).removeClass("applied-filter--draw") : $(n).addClass("applied-filter--draw"),
                            t <= 0 ? $(".navigation-tabs").removeClass("navigation-tabs--smaller") : $(".navigation-tabs").addClass("navigation-tabs--smaller"),
                            $("#applied-filters-title").text("Filtros selecionados (".concat(t, "):")),
                            e.each(function (e, t) {
                                var n = t.parentElement.innerText,
                                    r = t.name;
                                0 === $('[id="'.concat(r, '"]')).length &&
                                    $("<span>", {
                                        text: n,
                                        id: r,
                                        class: "applied-filter__item",
                                        click: function () {
                                            $('input[name="'.concat($(this).attr("id"), '"]'))
                                                .prop("checked", !1)
                                                .trigger("change"),
                                                $(this).remove();
                                        },
                                    }).appendTo("#filters");
                            });
                    });
                })();
        });
    },
    function (e, t, n) {
        "use strict";
        n.r(t);
        n(0), n(1), n(2), n(3), n(4), n(5), n(6), n(7), n(8);
        var r = {
            loader: '<i class="fas fa-sync fa-spin"></i>',
            productImage: {
                carouselDesktop: !1,
                mobile: !0,
                thumbsQty: 5,
                thumbVertical: !1,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><svg class="icon-arrow icon-arrow-left"><use xlink:href="#iconArrowLeft" /></svg></button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg class="icon-arrow icon-arrow-right"><use xlink:href="#iconArrowRight" /></svg></button>',
            },
        };
        function o(t, e) {
            var n,
                r = Object.keys(t);
            return (
                Object.getOwnPropertySymbols &&
                    ((n = Object.getOwnPropertySymbols(t)),
                    e &&
                        (n = n.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                    r.push.apply(r, n)),
                r
            );
        }
        function l(i) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? o(Object(a), !0).forEach(function (e) {
                          var t, n, r;
                          (t = i), (r = a[(n = e)]), n in t ? Object.defineProperty(t, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (t[n] = r);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
                    : o(Object(a)).forEach(function (e) {
                          Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(a, e));
                      });
            }
            return i;
        }
        var i,
            s = null != (i = "productImage") && void 0 !== r[i] ? r[i] : r;
        function c(e, t) {
            var n = "";
            $(window).width() < 992 &&
                !$(".product-image-mobile").length &&
                ($.each(t.find("li a"), function () {
                    var e = $(this).attr("rel");
                    n += '<li class="product-image-mobile-item"><img class="img-fluid" src="' + e + '" /></li>';
                }),
                "" !== n && e.find("#show").after('<div class="product-image-mobile d-block d-lg-none">\n      <ul id="product-image-mobile-carousel">\n        '.concat(n, "\n      </ul>\n    </div>")),
                $("#product-image-mobile-carousel").slick({ slidesToShow: 1, slidesToScroll: 1, autoplay: !0, autoplaySpeed: 6e3, arrows: !0, prevArrow: s.prevArrow, nextArrow: s.nextArrow }));
        }
        function u(e, t) {
            var n;
            4 < e.find("li").length &&
                ((n = { dots: !1, slidesToShow: 4, slidesToScroll: 4, prevArrow: s.prevArrow, nextArrow: s.nextArrow }),
                t.thumbVertical && ((n.vertical = !0), (n.centerMode = !1), (n.slidesToShow = 4), (n.slidesToScroll = 4)),
                null !== n && $.fn.slick && e.length && e.slick(n));
        }
        function a() {
            var e,
                t,
                n,
                r,
                i,
                a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : '[data-image="product-image"]';
            null != a &&
                $(a).length &&
                ((e = $(a)),
                (t = e.find(".thumbs")),
                (n = l({}, s)),
                null != (r = e.attr("data-config")) && "" !== r && ((r = r.replace(/\'/g, '"')), (n = l(l({}, s), JSON.parse(r)))),
                n.mobile &&
                    ($(window).resize(function () {
                        c(e, t);
                    }),
                    c(e, t),
                    e.find("#show").addClass("d-none d-lg-block")),
                u(t, n),
                (i = document.querySelector("#include > #image")),
                new MutationObserver(function () {
                    n.mobile && ($(".product-image-mobile").remove(), c(e, t)), t.find("> li").length && (t.removeClass("slick-initialized slick-slider slick-vertical"), u(t, n));
                }).observe(i, { childList: !0 }));
        }
        function d(t, e) {
            var n,
                r = Object.keys(t);
            return (
                Object.getOwnPropertySymbols &&
                    ((n = Object.getOwnPropertySymbols(t)),
                    e &&
                        (n = n.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                    r.push.apply(r, n)),
                r
            );
        }
        function p(i) {
            for (var e = 1; e < arguments.length; e++) {
                var a = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? d(Object(a), !0).forEach(function (e) {
                          var t, n, r;
                          (t = i), (r = a[(n = e)]), n in t ? Object.defineProperty(t, n, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (t[n] = r);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(a))
                    : d(Object(a)).forEach(function (e) {
                          Object.defineProperty(i, e, Object.getOwnPropertyDescriptor(a, e));
                      });
            }
            return i;
        }
        function f(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
        }
        var v = { shipping: { calculateQty: !0, titleValue: "Valor", titleDelivery: "Tipo de entrega", titleMsg: "Tempo estimado", resultInfo: "{S-NAME}", resultInfoDays: "{S-DAYS}", btnCalc: "#btn-shipping", inputText: "#cep-shipping" } },
            g = (function () {
                function n() {
                    var e,
                        t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : '[data-delivery="shipping"]';
                    !(function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                    })(this, n),
                        (this._element = t),
                        (this._$el = $(t)),
                        (this._config = null),
                        this._$el.length &&
                            (null != (e = this._$el.attr("data-config")) && "" !== e ? ((e = e.replace(/\'/g, '"')), (this._config = p(p({}, v.shipping), JSON.parse(e)))) : (this._config = p({}, v.shipping)),
                            this.createStruct(),
                            this.events());
                }
                var e, t, r;
                return (
                    (e = n),
                    (t = [
                        {
                            key: "createStruct",
                            value: function () {
                                this._$el.append('<div id="shipping-results"></div>');
                                $(this._config.inputText);
                            },
                        },
                        {
                            key: "calculeShipping",
                            value: function (o) {
                                var e = $(o._config.inputText),
                                    l = $("#shipping-results");
                                l.html();
                                if (
                                    (function (e) {
                                        var t = 0 < arguments.length && void 0 !== e ? e : ".page-product .buy-button",
                                            n = $(".sku-selector-container");
                                        return !!$(t).length && (-1 < $(t).attr("href").indexOf("javascript:alert") ? (n.addClass("sku-selector-alert"), !1) : (n.removeClass("sku-selector-alert"), !0));
                                    })()
                                ) {
                                    if (null == e.val() || null == e.val() || "" == e.val()) return l.html("<p>CEP invÃ¡lido.</p>"), !1;
                                    var t = $(".page-product .buy-button").attr("href"),
                                        n = {};
                                    if (
                                        (t
                                            .substr(t.indexOf("?") + 1, t.length)
                                            .split("&")
                                            .forEach(function (e) {
                                                n[e.split("=")[0]] = e.split("=")[1];
                                            }),
                                        null == n.sku || null == n.sku)
                                    )
                                        return l.html("<p>SKU nÃ£o encontrado</p>"), !1;
                                    var r = skuJson_0.salesChannel,
                                        i = e.val(),
                                        a = $('meta[name="country"]').attr("content"),
                                        s = [{ id: n.sku, quantity: n.qty || 1, seller: n.seller || 1, salesChannel: r || 1 }];
                                    vtexjs.checkout.simulateShipping(s, i, a).done(function (e) {
                                        var t = "";
                                        e.postalCode;
                                        if (void 0 !== e.messages && null !== e.messages && e.messages.length)
                                            for (var n = 0; n < e.messages.length; n++) (t += '\t<div class="alert alert-' + e.messages[n].status + '">'), (t += "\t\t<p>" + e.messages[n].text + "</p>"), (t += "\t</div>");
                                        var r = e.logisticsInfo[0].slas || [];
                                        if (r.length) {
                                            (t += '<table class="table-results table">'),
                                                (t += "\t<thead>"),
                                                (t += "\t\t<tr>"),
                                                (t += '\t\t\t<th class="title">' + o._config.titleValue),
                                                (t += '\t\t\t<th class="title">' + o._config.titleDelivery),
                                                (t += '\t\t\t<th class="title">' + o._config.titleMsg),
                                                (t += "\t\t</tr>"),
                                                (t += "\t</thead>"),
                                                (t += "\t<tbody>");
                                            for (n = 0; n < r.length; n++) {
                                                var i = parseInt(r[n].shippingEstimate),
                                                    a = i + (1 < i ? " dias Ãºteis" : " dia Ãºtil");
                                                (t += " <tr>"),
                                                    (t +=
                                                        '  <td class="result">R$ ' +
                                                        (function (e, t, n, r) {
                                                            (e = e.toString()).indexOf(".") < 0 && e.indexOf(",") < 0 && (e = e.substr(0, e.length - 2) + "." + e.substr(-2));
                                                            var i = e,
                                                                t = isNaN((t = Math.abs(t))) ? 2 : t,
                                                                n = null == n ? "." : n,
                                                                r = null == r ? "," : r,
                                                                a = i < 0 ? "-" : "",
                                                                o = parseInt((i = Math.abs(+i || 0).toFixed(t))) + "",
                                                                l = 3 < (l = o.length) ? l % 3 : 0;
                                                            return (
                                                                a +
                                                                (l ? o.substr(0, l) + r : "") +
                                                                o.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + r) +
                                                                (t
                                                                    ? n +
                                                                      Math.abs(i - o)
                                                                          .toFixed(t)
                                                                          .slice(2)
                                                                    : "")
                                                            );
                                                        })(r[n].price, 2, ",", ".") +
                                                        "</td>"),
                                                    (t += '  <td class="result">' + o._config.resultInfo.replace(/{S-NAME}/g, r[n].name) + "</td>"),
                                                    (t += '  <td class="result">entrega em <strong>' + o._config.resultInfoDays.replace(/{S-DAYS}/g, a) + "</strong></td>"),
                                                    (t += " </tr>");
                                            }
                                            (t += "\t</tbody>"), (t += "</table>");
                                        }
                                        l.html(t);
                                    });
                                }
                            },
                        },
                        {
                            key: "events",
                            value: function () {
                                var t = this;
                                $(document).on("click", this._config.btnCalc, function (e) {
                                    e.preventDefault(), t.calculeShipping(t);
                                });
                            },
                        },
                    ]) && f(e.prototype, t),
                    r && f(e, r),
                    n
                );
            })();
        $(document).ready(function () {
            1 === $(".page-product").length &&
                ($(".page-product .bread-crumb ul li a").first().html("<span>Home</span>"),
                new a(),
                new g(),
                $(".page-product #btn-shipping").click(function (e) {
                    "javascript:alert('Por favor, selecione o modelo desejado.');" != $(".page-product .buy-button-ref").attr("href")
                        ? $(this).unbind("click")
                        : (e.preventDefault(), $(".message-variations-shipping").addClass("active"), $(".mask-variations").addClass("active"));
                }),
                $(".page-product .buy-button").click(function (e) {
                    "javascript:alert('Por favor, selecione o modelo desejado.');" != $(".page-product .buy-button-ref").attr("href")
                        ? $(this).unbind("click")
                        : (e.preventDefault(), $(".c-product__sizes").addClass("active"), $(".message-variations-buy").addClass("active"), $(".mask-variations").addClass("active"));
                }),
                $(".c-product__sizes .skuList label").click(function () {
                    $(".c-product__sizes").removeClass("active"),
                        $(".message-variations-shipping").removeClass("active"),
                        $(".message-variations-buy").removeClass("active"),
                        $(".mask-variations").removeClass("active"),
                        $(".page-product .buy-button-ref").unbind("click");
                }));
        });
        n(9), n(10);
    },
]);

