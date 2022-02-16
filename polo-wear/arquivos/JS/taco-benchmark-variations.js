(headers = { Accept: "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json" }),
    (floatToCurrency = function (_float) {
        for (var s = _float.toString().replace(",", "").split("."), decimals = s[1] || "", integer_array = s[0].split(""), formatted_array = [], i = integer_array.length, c = 0; 0 != i; i--, c++)
            c % 3 == 0 && 0 != c && (formatted_array[formatted_array.length] = "."), (formatted_array[formatted_array.length] = integer_array[i - 1]);
        return (
            1 == decimals.length ? (decimals += "0") : 0 == decimals.length ? (decimals = "00") : 2 < decimals.length && (decimals = Math.floor(parseInt(decimals, 10) / Math.pow(10, decimals.length - 2)).toString()),
            "R$" + formatted_array.reverse().join("") + "," + decimals
        );
    });
var Taco = {
    data: {},
    methods: {
        newsletter: function () {
            $("#newsletterButtonOK").attr("value", "Cadastrar");
            var nome,
                email = "";
            $("#newsletterButtonOK").on("hover", function () {
                (nome = $("#newsletterClientName").val()), (email = $("#newsletterClientEmail").val());
            }),
                $(document).on("click", "#newsletterButtonOK", function (e) {
                    if ((e.preventDefault(), "NOME" == nome || "EMAIL" == email)) console.log("Erro");
                    else {
                        var user = { unique: "Email", "fields[6][Source]": "Newsletter", "fields[0][Nome]": nome, "fields[3][Email]": email };
                        $.ajax({
                            url: "https://landfy.smartcampaign.com.br/landfy/api/cc488bbf-1a41-11e7-a0f5-0e7eae3ca056",
                            data: user,
                            success: function (response) {
                                1 == response.response || response.response, console.log(response);
                            },
                            error: function (response) {
                                console.log(response);
                            },
                        });
                    }
                });
        },
        closebenefits: function () {},
        headerFixed: function () {
            $(".x-beneficios")
                .find(".x-close")
                .click(function () {
                    $(this).parent().remove();
                });
            var arrowBannerHome = $(".x-banner-principal-seta"),
                isHome = $("body").hasClass("home");
            this.headerStatus(isHome, arrowBannerHome);
        },
        headerStatus: function (isHome, arrowBannerHome) {
            console.log("======>", arrowBannerHome),
                isHome
                    ? $(window).on("scroll", function (event) {
                          var scroll = $(window).scrollTop();
                          32 <= scroll
                              ? ($(".x-header").addClass("x-fixed"),
                                $("footer .x-beneficios").show(),
                                $("footer .x-beneficios .slick-slider")[0] && $("footer .x-beneficios .slick-slider")[0].slick.refresh(),
                                arrowBannerHome.addClass("is--hide"))
                              : ($(".x-header").removeClass("x-fixed"), $("footer .x-beneficios").hide(), arrowBannerHome.removeClass("is--hide")),
                              180 <= scroll ? $(".x-header").addClass("x-transparent") : $(".x-header").removeClass("x-transparent");
                      })
                    : ($(".x-header").addClass("x-fixed"),
                      $(".x-general .x-content").css("margin-top", "96px"),
                      arrowBannerHome.addClass("is--hide"),
                      $(window).on("scroll", function (event) {
                          var scroll = $(window).scrollTop();
                          32 <= scroll
                              ? ($(".x-header").removeClass("no-home-fixed"), $(".x-header").addClass("no-home"), $("footer .x-beneficios .slick-slider")[0] && $("footer .x-beneficios .slick-slider")[0].slick.refresh())
                              : $(".x-header").removeClass("no-home"),
                              180 <= scroll ? $(".x-header").addClass("x-transparent") : $(".x-header").removeClass("x-transparent");
                      }));
        },
        sliderBenefits: function () {
            var options = { slidesToShow: 1, slidesToScroll: 1, autoplay: !0, autoplaySpeed: 2e3, infinite: !0, fade: !0, dots: !1, arrows: !1, speed: 800, cssEase: "linear" };
            $(".x-beneficio .x-carrossel").slick(options), $("footer .x-beneficios ul").length && ($("body").addClass("x-has-benefit-on-footer"), $("footer .x-beneficios ul").slick(options));
        },
        minicart: function () {
            var _element = $("#x-minicart-resume");
            _element.find(".x-close").click(function (event) {
                _element.removeClass("x-visible"), $(".x-top").removeClass("cart-open");
            }),
                $(".x-account-group .x-cart > a").click(function (event) {
                    if ($(".cart-list > li").length) return _element.addClass("x-visible"), $(".x-top").addClass("cart-open"), !1;
                });
        },
        variarionsShelf: function (value) {
            $(".x-vitrine .x-product")
                .not(value)
                .each(function (index, el) {
                    $(this).find(".x-variations").append('<ul class="x-tamanhos"></ul>');
                    var id = $(this).find(".x-id").val(),
                        elem = $(this);
                    id &&
                        $.ajax({
                            url: "/api/catalog_system/pub/products/variations/" + id,
                            dataType: "json",
                            success: function (data) {
                                qntItens = data.skus;
                                var tamanho = data.dimensionsMap.Tamanho;
                                data.id;
                                arr_tam = { PP: 0, P: 1, M: 2, G: 3, GG: 4, GGG: 5 };
                                var arr = data.skus;
                                arr.sort(function (a, b) {
                                    return a.dimensions.Tamanho < b.dimensions.Tamanho ? -1 : a.dimensions.Tamanho > b.dimensions.Tamanho ? 1 : 0;
                                }),
                                    arr.sort(function (a, b) {
                                        return arr_tam[a.dimensions.Tamanho] - arr_tam[b.dimensions.Tamanho];
                                    }),
                                    null != tamanho &&
                                        (tamanho = tamanho.map(function (item, index) {
                                            var classe = (item || "").replace(". ", "").replace(/\s/g, "-").replace("-/-", "-").replace("/", "");
                                            if (0 != data.skus[index].availablequantity) return $('<li class="x-sku ' + classe + '" data-id="' + data.skus[index].sku + '" data-color="' + item + '">' + classe + "</li>");
                                        })),
                                    elem.find(".x-tamanhos").length
                                        ? (elem.find(".x-tamanhos").html(""),
                                          null != tamanho &&
                                              tamanho.forEach(function (tam) {
                                                  elem.find(".x-tamanhos").append(tam);
                                              }))
                                        : (elem.find(".x-variations").append('<ul class="x-tamanhos"/>'),
                                          null != tamanho &&
                                              tamanho.forEach(function (tam) {
                                                  elem.find(".x-tamanhos").not(".x-color-list").append(tam), elem.addClass("x-setSize");
                                              }));
                            },
                        });
                });
        },
        clickVariationsShelf: function () {
            $(document).on("click", ".x-variations li", function () {
                $(this).parent().find("li").removeClass("x-active"), $(this).addClass("x-active");
            }),
                $(document).on("click", ".x-product .x-btn-add-cart", function () {
                    var _sku = $(this).parent().find(".x-sku.x-active"),
                        cookieIPS = Cookies.get("IPS");
                    if (cookieIPS)
                        var cookieCampanha = cookieIPS.match("Campanha") ? cookieIPS.split("Campanha=")[1].split("&")[0] : "",
                            cookieMedium = cookieIPS.match("Midia") ? cookieIPS.split("Midia=")[1].split("&")[0] : "",
                            cookieSource = cookieIPS.match("Parceiro") ? cookieIPS.split("Parceiro=")[1].split("&")[0] : "";
                    var utms = { utmCampaign: cookieCampanha || "", utmMedium: cookieMedium || "", utmSource: cookieSource || "", utmiCampaign: cookieCampanha || "", utmiPart: cookieSource || "" };
                    if (_sku.length) {
                        var item = { id: _sku.attr("data-id"), quantity: 1, seller: "1" };
                        vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                            jQuery.vtex_quick_cart(optionsMiniCart),
                                $(".x-header #x-minicart-resume").addClass("x-visible"),
                                vtexjs.checkout.sendAttachment("marketingData", utms),
                                setTimeout(function () {
                                    $(".x-header #x-minicart-resume").removeClass("x-visible");
                                }, 5e3);
                        });
                    } else alert("Selecione um tamanho.");
                });
        },
        removeHelpComplement: function () {
            $(".helperComplement").remove();
        },
        sliderVitrines: function () {
            $(".x-vitrine .x-carousel .prateleira > ul").slick({ slidesToShow: 5, slidesToScroll: 2, autoplay: !0, fade: !1, dots: !0, arrows: !0, autoplay: !1 }),
                window.addEventListener("resize", function () {
                    $(".x-vitrine .x-carousel .prateleira > ul").slick("setPosition");
                });
        },
        selectVitrines: function () {
            $(".x-vitrine-group")
                .find(".x-title-controle")
                .find("a")
                .click(function () {
                    $(this)
                        .addClass("x-active")
                        .closest(".x-title-controle")
                        .find("a")
                        .not($(this))
                        .removeClass("x-active")
                        .closest(".x-vitrine-group")
                        .find(".x-vitrine")
                        .find(".x-carousel." + $(this).attr("data-id"))
                        .addClass("x-active")
                        .siblings(".x-carousel")
                        .removeClass("x-active");
                });
        },
        footer: function () {
            $("footer .x-bottom .x-seta, footer .x-bottom .x-block > h3").click(function () {
                $("footer .x-sub-footer").slideToggle(700),
                    $("footer .x-bottom").toggleClass("x-active"),
                    $("footer .x-bottom .x-block").animate({ width: "20%", marginRight: 0 }),
                    setTimeout(function () {
                        $("html, body").animate({ scrollTop: $(document).height() }, 5e3);
                    }, 1e3);
            });
        },
        sliderVtrineBuscaDinamica: function () {
            $("#x-get-products-search .x-right .prateleira .slick-list").length && $("#x-get-products-search .x-right .prateleira ul").slick("unslick"),
                $("#x-get-products-search .x-right .prateleira ul").slick({ slidesToShow: 4, slidetoScroll: 4, autoplay: !0, fade: !1, dots: !1, arrows: !0, autoplay: !1 });
        },
        autoCompleteSearch: function () {
            $(".x-header .x-search .x-search-list .x-close").click(function () {
                $(".x-header .x-search .x-search-list").removeClass("x-active"), $("body").removeClass("x-scroll");
            }),
                $(".x-header .x-search form").submit(function (event) {
                    var _therm = $(".x-header .x-search .x-term").val();
                    return (window.location.href = "/" + _therm), !1;
                }),
                $(".x-header .x-search .x-term").on("keyup", function () {
                    var _therm = $(this).val();
                    setTimeout(function () {
                        $(".x-header .x-search .x-search-list .x-termo-busca").html(_therm), $("#x-get-products-search .x-left").html('<a href="/' + _therm + '">Ver todos</a>'), $(".x-left a").show();
                    }, 1e3);
                }),
                $(".x-header .x-search .x-term").vtexCustomAutoComplete({ shelfId: "83262b2d-2317-4c4c-8a7f-39a871186921", appendTo: $("#x-get-products-search .x-right"), notFound: function () {}, limit: 10 }),
                $(".x-top .x-term").on("keypress, keydown, keyup", function (event) {
                    var busca = $(this).val();
                    if (1 < busca.length)
                        $.ajax({
                            type: "GET",
                            url: "/api/catalog_system/pub/products/search/" + busca,
                            headers: { resources: "10-12" },
                            success: function (data) {
                                var search = data;
                                console.log(search);
                                var categories = $("#x-get-products-search .x-result-categories ul");
                                $(categories).html(" ");
                                for (var i = 0; i < search.length; i++) {
                                    (products = search[i]), (productName = products.productName), (productLink = products.link);
                                    products.items;
                                    $(categories).append("<li><a href=" + productLink + "><h3>" + productName + "</h3></a></li>");
                                }
                            },
                            error: function (data) {
                                console.log(data), console.log("Ops, ocorreu um erro.");
                            },
                        });
                    else {
                        var categories = $("#x-get-products-search .x-result-categories ul");
                        $(categories).html(" ");
                    }
                });
        },
        backToTop: function () {
            var _limit = $(window).height();
            $(window).on("scroll", function (event) {
                var scroll = $(window).scrollTop();
                _limit <= scroll ? $(".x-back-to-top").fadeIn() : $(".x-back-to-top").fadeOut();
            }),
                $(".x-back-to-top").click(function (event) {
                    $("html, body").animate({ scrollTop: 0 }, 600);
                });
        },
        colorsVariationInShelfs: function () {
            $(".x-vitrine .x-product")
                .not(".x-ajax-completed")
                .each(function (index, el) {
                    var _element = $(this);
                    _element.addClass("x-ajax-completed"), _element.find(".x-variations").prepend('<ul class="x-color-list"></ul>');
                    var _product_id = _element.find(".x-id").val();
                    $.ajax({
                        type: "GET",
                        url: "/api/catalog_system/pub/products/search/?fq=productId:" + _product_id,
                        success: function (_product_infos) {
                            var _color_name = null != _product_infos[0].CORES && _product_infos[0].CORES;
                            _color_name && _element.find(".x-color-list").prepend('<li class="sr_' + _color_name[0].toLowerCase() + '">' + _color_name + "</li>");
                        },
                    });
                });
        },
        overlayOnSearch: function () {
            $(".x-term").focusin(function () {
                $(".x-header").addClass("is--focused"), $("body").css("overflow", "hidden");
            }),
                $(".x-term").focusout(function () {
                    $(".x-header").removeClass("is--focused"), $("body").css("overflow", "");
                });
        },
        login: function () {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                1 == orderForm.loggedIn && ($(".x-account-group .x-account").removeAttr("id").addClass("x-logged"), $(".menu-conta li:last-child a").text("Sair").attr("href", "/no-cache/user/logout")),
                    $('a.bt-entrar[href*="#"]').click(function (event) {
                        event.preventDefault(), vtexid.start();
                    });
            }),
                $("body").on("click", ".x-account-group .x-account.x-logged", function (event) {
                    window.location.href = "/account";
                });
        },
        welcomePopup: function () {
            var popup = $(".x-popup-wrapper"),
                send = $(".x-popup-send");
            null == $.cookie("welcomePopup") ? $(popup).fadeIn() : $(popup).fadeOut(),
                $(".x-popup-content__close, .x-popup-sucess__link").click(function () {
                    $.cookie("welcomePopup", "1", { path: "/", expires: 29 }), $(popup).fadeOut();
                }),
                $(send).on("click", function () {
                    var nome = $("#x-popup-nome"),
                        nomeVal = $("#x-popup-nome").val(),
                        email = $("#x-popup-email"),
                        emailVal = $("#x-popup-email").val(),
                        gender = $('input[name="gender"]:checked').attr("data");
                    if (($(nome, email).removeClass("x-error"), "" == nomeVal)) $(nome).addClass("x-error");
                    else if ("" == emailVal) $(email).addClass("x-error").append("<p> Digite seu email </p>");
                    else {
                        var userMasterData = { email: emailVal, firstName: nomeVal };
                        $.ajax({
                            headers: headers,
                            data: JSON.stringify(userMasterData),
                            type: "PATCH",
                            url: "https://api.vtexcrm.com.br/taco/dataentities/CL/documents",
                            success: function (data) {
                                $.cookie("welcomePopup", "1");
                            },
                            error: function (data) {
                                $(email).addClass("x-error");
                            },
                        });
                        var userSalesForce = { email: emailVal, nome: nomeVal, sexo: gender };
                        console.log(userSalesForce);
                        $.ajax({
                            headers: headers,
                            data: JSON.stringify(userSalesForce),
                            type: "POST",
                            url: "https://api.vtexcrm.com.br/taco/dataentities/CP/documents",
                            success: function (data) {
                                $(".x-popup-content").fadeOut(), $(".x-popup-sucess").fadeIn(), $.cookie("welcomePopup", "1"), vtexjs.checkout.sendAttachment("marketingData", { coupon: "COMPRE10" });
                            },
                            error: function (data) {
                                console.log(data);
                            },
                        });
                    }
                });
        },
        goToShelf: function () {
            window.location.hash.match("vitrine") &&
                $(window).on("load", function () {
                    setTimeout(function () {
                        $("html, body").animate({ scrollTop: $(".x-filters-group").offset().top - 120 }, 500);
                    }, 2e3);
                });
        },
        overWriteFilterUrl: function () {
            $(".x-drop li a").each(function () {
                var url = $(this).attr("href") + "#vitrine";
                $(this).attr("href", url);
            });
        },
        seTiver: function () {
            1 <= $(".x-text-seo .box-banner").length && $(".x-text-seo").addClass("seo-new");
        },
        discountFlag: function () {
            $(".x-product__percent").each(function () {
                var percentCurrent = $.trim($(this).find("p").text()).split(",")[0].replace("-", "").replace("%", "");
                "0" !== percentCurrent &&
                    void 0 !== percentCurrent &&
                    NaN !== percentCurrent &&
                    ($(this)
                        .find("p")
                        .empty()
                        .html("-" + parseInt(percentCurrent) + "%"),
                    $(this).show());
            });
        },
        clickReloaSize: function () {
            $("#").click(function () {});
        },
        jeansMenuActions: function () {
            var jeansMasc = $(".x-jean-banners--masc"),
                jeansFem = $(".x-jean-banners--fem"),
                jeansItem = $(".x-sub-container--banners--item li");
            $(".x-sub-menu.x-jeans .x-title-item").on("mouseover", function () {
                "masculino" == $(this).data("id")
                    ? ($(this).addClass("x-active"), $('.x-title-item[data-id="feminino"]').removeClass("x-active"), $(jeansMasc).addClass("x-submenu-visible"), $(jeansFem).removeClass("x-submenu-visible"))
                    : ($(this).addClass("x-active"), $('.x-title-item[data-id="masculino"]').removeClass("x-active"), $(jeansFem).addClass("x-submenu-visible"), $(jeansMasc).removeClass("x-submenu-visible"));
            }),
                $(jeansItem).on("mouseover", function () {
                    $(this).addClass("x-submenu-item-visible");
                }),
                $(jeansItem).on("mouseout", function () {
                    $(this).removeClass("x-submenu-item-visible");
                });
        },
        popupBlackFriday: {
            email: null,
            validateEmail: function (email) {
                return /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
                    email
                );
            },
            validateForm: function () {
                var val = $(".x-popup-backfriday-input").val();
                (val = val.trim().toLowerCase()), (this.email = val), this.validateEmail(val) ? this.verifyExistEmail(val) : this.callback.error("Email  invÃ¡lido!");
            },
            verifyExistEmail: function (val) {
                var self = this;
                $.ajax({
                    url: "/api/dataentities/BF/search?email=" + val + "&_fields=email",
                    method: "GET",
                    dataType: "json",
                    headers: { Accept: "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                    success: function (resp) {
                        console.log(">>>", resp);
                        var localEmail = localStorage.getItem("email-backfriday-2019");
                        resp.length || localEmail === val ? (self.callback.warning("Esse e-mail jÃ¡ encontra-se cadastrado!"), console.log("if")) : (self.requestForm(val), console.log("else"));
                    },
                    error: function () {
                        self.callback.error("Erro durante o vericaÃ§Ã£o  do Email!");
                    },
                });
            },
            closePopup: function () {
                var popup = $(".x-popup-wrapper-backfriday");
                $(popup).fadeOut(), localStorage.setItem("popup-backfriday-2019", "close");
            },
            requestForm: function (val) {
                var data = { email: val },
                    self = this;
                $.ajax({
                    url: "/api/dataentities/BF/documents",
                    type: "PATCH",
                    dataType: "json",
                    headers: { Accept: "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                    data: JSON.stringify(data),
                    success: function (a) {
                        self.callback.success("Utilize o cupom TACOVIP!"), localStorage.setItem("email-backfriday-2019", val), setTimeout(self.closePopup, 2e3);
                    },
                    error: function () {
                        self.callback.error("Erro durante o Cadastramento!");
                    },
                });
            },
            callback: {
                error: function (msn) {
                    $(".x-popup-backfriday-msn").addClass("error").removeClass("success").removeClass("warning").text(msn).css("visibility", "visible");
                },
                success: function (msn) {
                    $(".x-popup-backfriday-msn").addClass("success").removeClass("warning").removeClass("error").text(msn).css("visibility", "visible");
                },
                warning: function (msn) {
                    $(".x-popup-backfriday-msn").addClass("warning").removeClass("success").removeClass("error").removeClass("error").text(msn).css("visibility", "visible");
                },
            },
            actionForm: function () {
                var self = this;
                $("body").on("click", ".x-popup-backfriday-btn", function () {
                    self.closePopup();
                });
            },
            sendForm: function () {
                var self = this;
                $(".x-popup-backfriday-form").submit(function (event) {
                    self.validateForm(), event.preventDefault();
                });
            },
            init: function () {
                this.sendForm(), this.actionForm();
                var popup = $(".x-popup-wrapper-backfriday");
                document.location.href;
                localStorage.getItem("popup-backfriday-2019") && $(popup).fadeOut(),
                    localStorage.getItem("popup-backfriday-2019") ||
                        setTimeout(function () {
                            $(popup).fadeIn();
                        }, 2e3);
            },
        },
        init: function () {
            this.goToShelf(),
                this.login(),
                this.closebenefits(),
                this.minicart(),
                this.seTiver(),
                this.autoCompleteSearch(),
                this.newsletter(),
                this.removeHelpComplement(),
                this.headerFixed(),
                this.variarionsShelf(".x-ajax-completed"),
                this.clickVariationsShelf(),
                this.sliderVitrines(),
                this.selectVitrines(),
                this.backToTop(),
                this.sliderBenefits(),
                this.colorsVariationInShelfs(),
                this.overlayOnSearch(),
                this.jeansMenuActions(),
                this.popupBlackFriday.init();
        },
        init_ajax: function () {
            this.variarionsShelf(".x-ajax-completed"), this.colorsVariationInShelfs(), this.discountFlag();
        },
    },
    ajax: function () {
        return this.methods.init_ajax();
    },
    mounted: function () {
        return this.methods.init();
    },
    variarionsShelf: function () {
        return this.methods.variarionsShelf(".none");
    },
    apartirDe: function () {
        $(".prateleira .x-product")
            .not(".isChecked")
            .each(function () {
                var $this = $(this),
                    productId = $this.attr("data-id");
                0 <= arrApatrirDe.indexOf(productId) && ($this.find(".x-oldPrice").remove(), $this.find(".x-bestPrice").prepend('<span style="font-size: 14px; color: #000000;">A PARTIR DE </span>')), $this.addClass("isChecked");
            });
    },
};
$(document).ready(function () {
    ((-1 < window.document.location.href.indexOf("vtexlocal") || -1 < window.document.location.href.indexOf("vtexcommercestable")) && ($("body").hasClass("inStable") || $("body").addClass("inStable")),
    Taco.mounted(),
    $("#x-get-products-search .x-right .prateleira").html(" "),
    "Feminino" == vtxctx.departmentName || "Masculino" == vtxctx.departmentName) && $("html body .x-general .x-content .x-filters-group .x-filters .menu-departamento").addClass("noGenero");
}),
    $(document).ajaxStop(function () {
        Taco.ajax(), (-1 < window.location.href.indexOf("vtexcommercestable") || -1 < window.location.href.indexOf("vtexlocal")) && Taco.apartirDe();
    }),
    $(".bt-lupa").on("click", function (event) {
        event.preventDefault(), $(".x-search-list").addClass("x-active"), $(".x-term").focus(), $(".x-left a").remove();
    }),
    $(document).ready(function () {
        $(".x-banner-principal").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            var getCor = $('.x-banner-principal .slick-slide[data-slick-index="' + nextSlide + '"] img').attr("alt");
            getCor && (-1 != (getCor = getCor.split("-")[1]).indexOf("CLARO") ? ($(".x-header").addClass("b-claro"), $(".x-header").removeClass("b-escuro")) : ($(".x-header").addClass("b-escuro"), $(".x-header").removeClass("b-claro")));
        }),
            ($("body").hasClass("departamento") || $("body").hasClass("categoria")) &&
                ($(".x-seo .x-description").each(function () {
                    "" == $(this).text() && $(this).parents(".x-seo").addClass("tiraEstilo");
                }),
                $(".seo-new .estilo-barra").niceScroll({ cursorwidth: 8, cursorcolor: "#d4d4d4", cursorborder: "none", cursorborderradius: 4, autohidemode: !1 }));
    }),
    -1 < window.location.href.indexOf("vtexcommercestable") &&
        ($(function () {
            $("body").addClass("inStable"),
                $(".x-seo .x-description").each(function () {
                    "" == $(this).text() && $(this).parents(".x-seo").addClass("tiraEstilo");
                });
        }),
        $("body").hasClass("categoria") &&
            $(function () {
                $(".seo-new .estilo-barra").niceScroll({ cursorwidth: 8, cursorcolor: "#d4d4d4", cursorborder: "none", cursorborderradius: 4, autohidemode: !1 });
            })),
    $(".x-content > section").each(function () {
        ($(this).is(":empty") || $(this).children().is(":empty")) && $(this).addClass("d-none-cont");
    }),
    $(document).ready(function () {
        "Aceitou os cookies" === localStorage.hasCookies
            ? console.log("esconde faixa de cookies")
            : ($(".content__box").parent().addClass("faixa__cookies"),
              $(".content__box--btn").on("click", function () {
                  setTimeout(function () {
                      $(".faixa__cookies").removeClass("faixa__cookies");
                  }, 50),
                      localStorage.setItem("hasCookies", "Aceitou os cookies");
              }));
    });
