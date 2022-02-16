var wdw = $(window),
    body = $("body"),
    socialCall = {

        menuPrincipal: function () {
            $.ajax({ async: !0, crossDomain: !0, url: "/api/catalog_system/pub/category/tree/3/", method: "GET" })
                .done(function (e) {
                    $(".todos-deptos").html("<div class='todos-deptos-main'></div>");
                    var a = $(".todos-deptos-main"),
                        t = e;
                    $.each(t, function (e, i) {
                        var o = i.id;
                        a.append('<li class="itemMenu cat' + i.id + '"><a href="' + i.url + '" title="' + i.name + '">' + i.name + "</a></li>"),
                            t[e].children.length > 0 &&
                            ($(".cat" + i.id).append('<ul class="box-subMenu"><div class="container-center"><div class="subCategoria"></div></div></ul>'), $(".cat" + i.id).addClass("listDrop")),
                            $(t[e].children).each(function (a, i) {
                                var s = t[e].children[a].id,
                                    l = t[e].children[a].name,
                                    n = t[e].children[a].url;
                                $(".cat" + o)
                                    .find(".subCategoria")
                                    .append('<li id="' + s + '"class="subItem sub-index-' + s + '"><a href="' + n + '">' + l + "</a></li>"),
                                    t[e].children[a].children.length > 0 &&
                                    ($(".sub-index-" + s)
                                        .append('<ul class="sub_nivel3"></ul>')
                                        .addClass("ic-nivel2"),
                                        $(t[e].children[a].children).each(function (i, o) {
                                            var l = t[e].children[a].children[i].id,
                                                n = t[e].children[a].children[i].name,
                                                r = t[e].children[a].children[i].url;
                                            $(".sub-index-" + s)
                                                .find(".sub_nivel3")
                                                .append('<li id="' + l + '" class="sub_item3 sub-index-' + l + '"><a href="' + r + '">' + n + "</a></li>"),
                                                t[e].children[a].children[i].children.length > 0 &&
                                                ($(".sub-index-" + l).append('<ul class=".sub_nivel4"></ul>'),
                                                    $(t[e].children[a].children[i].children).each(function (o, s) {
                                                        var n = t[e].children[a].children[i].children[o].id,
                                                            r = t[e].children[a].children[i].children[o].name,
                                                            c = t[e].children[a].children[i].children[o].url;
                                                        $(".sub-index-" + l)
                                                            .find(".sub_nivel4")
                                                            .append('<li id="' + n + " sub4-index-" + o + '" class="sub_item4"><a href="' + c + '">' + r + "</a></li>");
                                                    }));
                                        }));
                            });
                    });
                    $(".menu-header").prepend(
                        "<li class='minhaConta mob'><a href='/account'><span></span>Minha Conta</a></li><li class='meusPedidos mob'><a href='/_secure/account#/orders'><span></span>Meus Pedidos</a></li><li class='logout mob'><a href='/logout'><span></span>Sair</a></li>"
                    )
                })
        },

        mobPage: function () {
            $(window).width() < 1025 && $("body").addClass("mobPage");
        },

        mobileMenu: function () {
            $("body").hasClass("mobPage") &&
                (jQuery(document).on("click", ".verTodosDeptos > a", function (e) {
                    e.preventDefault(), $(this).toggleClass("arrowMenu"), $(".todos-deptos").slideToggle();
                }),
                jQuery(document).on("click", ".todos-deptos-main .listDrop > a", function (e) {
                    e.preventDefault(), $(this).toggleClass("arrowMenu"), $("+ ul", this).slideToggle();
                }),
                jQuery(document).on("click", ".listaDeptos .listDrop > .show", function (e) {
                    e.preventDefault(), $(this).toggleClass("arrowMenu"), $("+ ul", this).slideToggle();
                }),
                jQuery(document).on("click", ".menu-mobile, .menu-mobile-close", function (e) {
                    $(".container-menu > .container-center").toggleClass("active");
                }));
                // $("#footer-01-01 > span, #footer-01-02 > span, #footer-01-04 > span, #footer-01-03 > span, #footer-01-05 > span, #footer-01-06 > span").click(function () {
                //     $(this).toggleClass("arrowMenu"), $("+ div", this).slideToggle();
                
        },

        init: function () {
            socialCall.mobPage();
            socialCall.menuPrincipal();
            socialCall.mobileMenu();
        }
    };

$(document).ready(function () {
    socialCall.init();
})
