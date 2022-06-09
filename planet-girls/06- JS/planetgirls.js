
$(document).ready(function () {
    // GERAIS PARA USO NO RESTO DO ARQUIVO
    var scre = $("body").width();
    $(".helperComplement").remove();


    // CriaÃ§Ã£o da funÃ§Ã£o de Cookie Management
    // // Setar Cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    // // Buscar Cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    // // Apagar Cookie
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // CÃ“DIGO DA PLANET

    var codePlanet = {

        menuPrincipal: function () {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/api/catalog_system/pub/category/tree/3/",
                "method": "GET"
            }

            $.ajax(settings).done(function (dataMenu) {

                var menu = $('.menu-principal');
                var PlanetMenu = dataMenu;

                $.each(PlanetMenu, function (i, field) {

                    var idCategoria = field.id;

                    menu.append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '" title="' + field.name + '">' + field.name + '</a><div class="box-subMenu fadeIn"><div class="container-center"><div class="sub-menu"><ul class="subCategoria"></ul><div class="imageMenu"></div></div></div></div></li>');

                    $(PlanetMenu[i].children).each(function (ii, el) {

                        var subCatId = PlanetMenu[i].children[ii].id;
                        var subCatNome = PlanetMenu[i].children[ii].name;
                        var subCatUrl = PlanetMenu[i].children[ii].url;

                        $('.cat' + idCategoria).find('.subCategoria').append('<li id="' + subCatId + '"class="subItem sub-index-' + subCatId + '"><a href="' + subCatUrl + '">' + subCatNome + '</a></li>');



                    });

                });

            });

            setTimeout(function () {
                $(".menu-principal > li > .box-subMenu").each(function (i) {
                    var subMenu = $(this).find(".subItem").length;
                    if (subMenu < 1) {
                        $(this).remove();
                    } else {
                        $(this).closest("li").addClass("subMenuTrue");
                    }

                    if (scre > 769) {
                        thisLinks = $(this).find('li');
                        for (var i = 0; i < thisLinks.length; i += 9) {
                            thisLinks.slice(i, i + 9).wrapAll("<span class='menuColuna'></span>");
                        };
                    }
                });

            }, 2500);

        },
        sliderMenu: function () {
            // Imagens do menu
            setTimeout(function () {
                var imgMenu = [];

                imgMenu[0] = $('.imgAcessorios');
                imgMenu[1] = $('.imgBeleza');
                imgMenu[2] = $('.imgCalcados');
                imgMenu[3] = $('.imgMoletom');
                imgMenu[4] = $('.imgRoupas');

                $('.menu-principal .cat-index-0 .imageMenu').html(imgMenu[0]);
                $('.menu-principal .cat-index-1 .imageMenu').html(imgMenu[1]);
                $('.menu-principal .cat-index-2 .imageMenu').html(imgMenu[2]);
                $('.menu-principal .cat-index-3 .imageMenu').html(imgMenu[3]);
                $('.menu-principal .cat-index-4 .imageMenu').html(imgMenu[4]);

                var prateMenu = $('.imageMenu .prateleira >ul');

                prateMenu.slick({
                    infinite: false,
                    speed: 800,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });

                $('.menu-principal .itemMenu').hover(function () {
                    $('.imageMenu .prateleira >ul').slick('setPosition');
                });

            }, 500);
        },
        headerFixo: function () {
            $(window).scroll(function () {
                if ($(window).scrollTop() > $('.menu-fixed').offset().top + 200 && !($('.menu-fixed').hasClass('stickyheader'))) {
                    $('.menu-fixed').addClass('stickyheader').animate({ "top": "0%" }, 1000);
                } else if ($(window).scrollTop() == 0) {
                    $('.menu-fixed').removeClass('stickyheader').css({ "top": "-100%" });
                }
            });
        },

        qtdCart: function () {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                var carItems = orderForm.items.length;
                $('.carrinho .qtd-cart').text(carItems);
            });
        },

        bfLandingPage: function () {
            if ($('body').hasClass('black-friday')) {
                $('.faq-holder h3').click(function () {
                    $(this).parent().find('p').slideToggle();
                    $(this).toggleClass('faq-open');
                });
                $(".black-friday .form-email .enviarForm").click(function () {
                    function validateEmail(fcEmail) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(fcEmail);
                    }

                    var varN = $('#fcNome').val();
                    var varE = $('#fcEmail').val();

                    function validate() {
                        var fcEmail = $("#fcEmail").val();

                        if (validateEmail(fcEmail)) {
                            enviaDados();
                        } else {
                            $('#fcEmail').css('border', '1px solid #d00d0d');
                            $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
                        }

                        return false;
                    }

                    $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                    $('.box-form-msg').css('display', 'none');

                    if (varN == '') {
                        $('#fcNome').css('border', '1px solid #d00d0d');
                        $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                    } else if (varE == '') {
                        $('#fcEmail').css('border', '1px solid #d00d0d');
                        $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                    } else if (varE != '') {
                        validate();
                    }

                    function enviaDados() {
                        var datos = {};
                        datos.nome = varN;
                        datos.email = varE;
                        $.ajax({
                            accept: 'application/vnd.vtex.ds.v10+json',
                            contentType: 'application/json; charset=utf-8',
                            crossDomain: true,
                            data: JSON.stringify(datos),
                            type: 'POST',
                            url: '/api/dataentities/PF/documents',
                            success: function success(data) {
                                $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                                $("#formRightFc h4").css("visibility", "hidden");
                                $("#formFC").html("<p id='msgSucesso'>Cadastro efetuado com sucesso =)</p>");
                            },
                            error: function error(_error) {
                                console.log(_error);
                            }
                        });
                    }
                });
            }
        },

        /* Verifica Logado */
        verificaLogado: function () {
            $(document).one("ajaxStop", function () {
                $("header .ajax-content-loader").each(function () {

                    if ($("#login", this).length) $(this).parent().addClass("loginOff"), $("body").addClass("loginOff");
                    else if (
                        ($(this).parent().addClass("loginOn"),
                            $("body").addClass("loginOn"),
                            $(".ajax-content-loader").append(
                                "<div class='box-welcome'><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
                            ),
                            $("body").hasClass("loginOn"))
                    ) {
                        $("p.welcome em").remove();
                        var e = $("p.welcome").html();
                        (e = e.replace(/ /g, "").replace("OlÃ¡", "").replace(".", "")), $("p.welcome").html("OlÃ¡" + e);
                        $('.welcome').prependTo($('.box-welcome'),
                            $('.welcome').addClass('logado'));
                    }

                    $('body').on('click', function (e) {
                        if (document.getElementsByClassName('.user-name__account')[0] ? !document.getElementsByClassName('.user-name__account')[0].contains(e.target) : 0)
                            $('.box-welcome').removeClass('ativo');
                    });
                    $(".user-name__account").click(function () {
                        $('.box-welcome, .welcome').toggleClass('ativo');
                    });
                });
            });
        },

        /* Busca Header */
        BuscaHeader: function () {
            $(document).on("click", ".search-icon", function () {
                $(".busca-topo__busca-container").toggleClass("busca-open");
                //$(".header-principal__container-hide").removeClass("carrinho-show");
                //$(".header-principal__login-hide").removeClass("login-show");
            });
        },

        slidePrincipal: function () {
            if ($("body").hasClass("planet-home")) {
                $('.slide-principal').slick({
                    dots: true,
                    slidesToShow: 1,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 5000
                });

            }
        },

        slidePrincipalMobile: function () {
            if ($("body").hasClass("planet-home")) {
                $('.slide-mobile').slick({
                    dots: false,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear'
                });

            }
        },

        //Informativo
        carrosselInformativo: function () {
            if (scre < 980) {
                $('.informativos ul').slick({
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    responsive: [{
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    }
                    ]
                });
            }
        },

        //Depoimentos
        carrosselDepoimentos: function () {
            $('.depoimentos ul').slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                autoplay: true,
                responsive: [{
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true
                    }
                }
                ]
            });

        },
        carrosselDepartamentos: function () {
            if (scre < 500) {
                $('.banner-departamentos .container-center').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    autoplay: false
                });
            }
        },
        //Informativo
        carrosselInstagram: function () {
            if (scre < 500) {
                $('.insta_galeria ul').slick({
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        },
        //Prateleiras Gerais
        prateleirasGerais: function () {
            if ($("body").hasClass("planetgirls-home") || $("body").hasClass("planet-produto")) {
                $('.prateleira-topteen .prateleira > ul, .prateleira-camisetas .prateleira > ul, .qvvt .prateleira > ul').slick({
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    responsive: [
                        {
                            breakpoint: 1360,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: false
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        }
                    ]
                });
            }
        },

        slidePrateleiraMais: function () {
            if ($("body").hasClass("planetgirls-home")) {
                $('.prateleira-lexa .prateleira > ul').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 1360,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        }
                    ]
                });
            }
        },

        slidePrateleiraProdutos: function () {
            if ($("body").hasClass("planet-produto")) {
                $('.slide-prod .planet-prateleira > ul').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 1290,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    }
                    ]
                });
            }
        },

        prateleirasVerao2022: function () {
            if ($('body').hasClass('verao-2022')) {
                $('.slide-prod .prateleira > ul').slick({
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows: false,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });
            }
        },

        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function () {
            $('.slide-prod').each(function () {
                if ($("body").hasClass("planetgirls-buscavazia")) {
                    var slide = $(this).find('.prateleira').length;
                    if (slide > 0) {
                        $(this).find('.prateleira > ul').slick({
                            infinite: true,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            responsive: [{
                                breakpoint: 1290,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true
                                }
                            },
                            {
                                breakpoint: 980,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    infinite: true
                                }
                            },
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinite: true
                                }
                            }
                            ]
                        });
                    } else {
                        $(this).hide();
                    }
                }
            });

        },

        filtroMobile: function () {
            if (scre < 1000) {
                var qtdFiltro = $('.filtrosDepartamento .search-multiple-navigator').length;
                if (qtdFiltro > 0) {
                    $('.filtrosDepartamento .search-multiple-navigator').hide();
                    $('.search-multiple-navigator h5').click(function () {
                        $(this).toggleClass('aberto');
                        $('.search-multiple-navigator fieldset div').slideToggle();
                    });
                } else {

                }
            }
        },



        // Nome Departamento Categoria
        aplicaNomeCategoria: function () {
            if ($("body").hasClass("planet-categoria") || $("body").hasClass("planet-departamento")) {
                //Termo buscado
                var categoria = vtxctx.categoryName;
                $(".nomeDepartamento h1").prepend(categoria);
                $(".descricao-categoria .titulo-descricao h3").prepend(categoria);
            }

        },

        descPrat: function () {
            return setTimeout(function () {
                $(".porcentagem").each(function () {
                    var valor = $(this).html();
                    valor = valor.replace(" %", "");
                    valor = valor.replace(",", ".");
                    valor = valor.replace("<br>", "");
                    valor = valor.replace("OFF", "");
                    valor = valor.replace("%", "");
                    valor = Number(valor);
                    valor = Math.round(valor);

                    $(this).html(valor);

                });
            }, 1000),
                this
        },



        fixFrete: function () {

            $(".shipping-value").trigger("click");
            setTimeout(function () {
                //$("#btnFreteSimulacao").attr("value", "calcular");
                $("#txtCep").attr("placeholder", "Digite seu CEP");
            }, 500);

            $(document).ready(function () {
                $(document).on('focus', '#txtCep', function () {
                    $(this).attr('autocomplete', 'nope');
                });
            });
            //troca texto da caixa de CEP
            $(window).load(function () {
                $("#txtCep").attr("placeholder", "00000-000");
                $("#txtCep").attr('autocomplete', 'nope');
                $("#txtCep").attr('autocomplete', 'off');

                //retorna seleÃƒÂ§ÃƒÂ£o de campo cep para inicio
                $('#txtCep').on('focus click', function () {
                    $(this)[0].setSelectionRange(0, 0);
                });
            });
        },

        slideOfertas: function () {
            if ($("body").hasClass("planet-home")) {
                $('.ofertas01 .planet-prateleira > ul').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [{
                        breakpoint: 1290,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true
                        }
                    }
                    ]
                });
            }
        },

        thumbImg: function () {
            if ($("body").hasClass("planet-produto")) {
                var video = $(".infos-prod .infos-left .especificacao-prod table tr td.Videos").html();
                // console.log(video);

                if (video !== undefined) {
                    $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs").append("<li class='video'><img src='/arquivos/video-prod.jpg' alt='video'/></li>");

                    $(".produto-all #produtoDiv-esquerda .apresentacao #show #include #image-main, .produto-all #produtoDiv-esquerda .apresentacao #show #include #image").append(video);

                    $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs li").click(function () {
                        if ($(this).hasClass("video")) {
                            $(".produto-all #produtoDiv-esquerda .apresentacao #show #include iframe").fadeIn();
                            $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs li .ON").removeClass("ON");
                        } else {
                            $(".produto-all #produtoDiv-esquerda.apresentacao #show #include iframe").fadeOut();
                        }
                    });
                }
                if (scre < 500) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: false,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    });
                }
            }
        },


        // Quantidade de produtos +-
        qtdProd: function () {
            if ("abc" == "abc") {
                setTimeout(function () {
                    $(".qtdPrateleira .btnAcr").click(function () {

                        var atual = parseInt($(this).prev(".qtdVal").val());
                        //console.log(atual)
                        atual = atual + 1;
                        $(this).prev(".qtdVal").val(atual);
                    });

                    $(".qtdPrateleira .btnDec").click(function () {
                        var atual = parseInt($(this).next(".qtdVal").val());
                        if (atual == 1) {
                            $(this).next(".qtdVal").val("1");
                        } else {
                            atual = atual - 1;
                            $(this).next(".qtdVal").val(atual);
                        }
                    });

                    $(".qtdPrateleira .qtdVal").bind("keyup blur focus", function (e) {
                        e.preventDefault();
                        var expre = /[^\d]/g;
                        $(this).val($(this).val().replace(expre, ''));
                    });
                }, 200);


                // Prod
                $(".produto-all #produtoDiv-direita .planet-produto__buy-button .buy-button").click(function (event) {
                    event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $('.qtdPrateleira .qtdVal').val();
                    if (qtd == "") {
                        qtd = "1";
                    }

                        var hrefCart = $(".produto-all #produtoDiv-direita .planet-produto__buy-button .buy-button").attr("href");
                        var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                        setTimeout(function () {
                            vtexjs.checkout.getOrderForm().then(function () {
                                item = {
                                    id: resUTL,
                                    quantity: qtd,
                                    seller: 1
                                };
                                vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                                    $(".header-minicart").addClass("open"),
                                        setTimeout(function () {
                                            $(".header-minicart").removeClass("open");
                                        }, 5e3);
                                    });
                                    vtexjs.checkout.getOrderForm().done(function (e) {
                                        var qtdCart = e.items.length;
                                        $(".info-cart .qtd-cart").html(qtdCart);
                                    });
                                });
                            });
                        });
            }
        },

        parcProd: function () {
            $(".valor-parcelado .titulo-parcelamento").text("Veja opÃ§Ãµes de parcelamento");
            $(".valor-parcelado .titulo-parcelamento").click(function () {
                $(".valor-parcelado .other-payment-method-ul").fadeToggle();
                $(this).toggleClass("aberto");
            });
        },

        breadCrumb: function () {
            $(".breadCrumb ul li").first().find("a").text("Home");

            if ($("body").hasClass("Planet-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("Planet-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("planetgirls-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        descricaoCategoria: function () {
            if ($("body").hasClass("Planet-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        nomeBannerCategoria: function () {
            if ($("body").hasClass("planetgirls-home")) {
                $('.banner-categoria .box-banner a img').each(function () {
                    var nomeCategoria = $(this).attr('alt');
                    $(this).parent().prepend(`<div class='planet-title-categoria'><h3>${nomeCategoria}</h3></div>`);
                });
                $('.banner-departamentos .box-banner a img').each(function () {
                    var nomeHomeDepartamento = $(this).attr('alt');
                    $(this).parent().prepend(`<div class='planet-title-departamento'><h3>${nomeHomeDepartamento}</h3></div>`);
                });
            }
            if (scre < 500) {
                $('.planet-home .banner-categoria .container-center').slick({
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                });
            }
        },

        zoomProd: function () {
            $(window).load(function () {
                var janela = $(window).width();
                if ($("body").hasClass("planet-produto")) {

                    window.LoadZoom = function (pi) {
                        var opcoesZomm = {
                            zoomWidth: 500,
                            zoomHeight: 500,
                            preloadText: 'Carregando Super Zoom'
                        };
                        if (janela > 769) {
                            $(".image-zoom").jqzoom(opcoesZomm);
                        }
                    }
                    LoadZoom(0);

                    ImageControl($("ul.thumbs a:first"), 0);

                }

            });
        },

        //Newsletter                   
        newsletter: function () {
            $(".newsletter__form .envia-newsletter").click(function () {

                var varN = $('.newsletter__form input.nome').val();
                var varE = $('.newsletter__form input.email').val();

                function validate() {
                    var fcEmail = $(".newsletter__form input.email").val();
                    if (validateEmail(fcEmail)) {
                        // console.log("Enviado");
                        enviaDados();
                    } else {
                        $('.newsletter__form input.email').css('border', '1px solid #d00d0d');
                        //console.log("NÃ£o Ã© vÃ¡lido");
                    }
                    return false;
                }

                function validateEmail(fcEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fcEmail);
                }

                $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                $('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('.newsletter__form input.nome').css('border', '1px solid #d00d0d');
                } else if (varE == '') {
                    $('.newsletter__form input.email').css('border', '1px solid #d00d0d');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/NL/documents',
                        success: function (data) {
                            console.log(data);
                            $(".newsletter__form").html(`
                                <p id='msgSucesso'>
                                    <span>Você ganhou 10% Off em sua primeira compra!</span>
                                    <span>Utilize o cupom <strong>BEMVINDA10</strong></span>
                                </p>
                            `);
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }

            });
        },

        institucional: function () {
            if (scre < 980) {
                $(".menu-lateral-institucional h3").click(function () {
                    $(this).toggleClass("aberto");
                    $(".menu-lateral-institucional ul").slideToggle();
                });
                $(".menu-lateral-institucional-2 h3").click(function () {
                    $(this).toggleClass("aberto");
                    $(".menu-lateral-institucional-2 ul").slideToggle();
                });
            }
        },

        footerMobile: function () {
            if (scre < 980) {
                $(".footer h3, .footer-01-01 h3").click(function () {
                    $(this).next("ul").slideToggle();
                    $(this).toggleClass("aberto");
                });
                // $(".footer .footer-01-01 h3").click(function() {
                //     $(this).parent().find("p").slideToggle();
                //     $(this).toggleClass("aberto");
                // });
            }
        },

        placeholderFrete: function () {
            $(window).load(function () {
                $(".calc-frete .cep fieldset .prefixo .fitext").attr("placeholder", "Informe seu CEP:");
            });
        },

        /* Fale Conosco */
        faleConosco: function () {
            $(".enviarForm").click(function () {
                function validateEmail(fcEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fcEmail);
                }

                var varN = $('#fcNome').val();
                var varE = $('#fcEmail').val();
                var varT = $('#fcTelefone').val();
                var varM = $('#fcMsg').val();

                function validate() {
                    var fcEmail = $("#fcEmail").val();

                    if (validateEmail(fcEmail)) {
                        enviaDados();
                    } else {
                        $('#fcEmail').css('border', '1px solid #d00d0d');
                        $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>');
                    }

                    return false;
                }

                $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                $('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('#fcNome').css('border', '1px solid #d00d0d');
                    $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                } else if (varE == '') {
                    $('#fcEmail').css('border', '1px solid #d00d0d');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                } else if (varT == '') {
                    $('#fcTelefone').css('border', '1px solid #d00d0d');
                    $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
                } else if (varM == '') {
                    $('#fcMsg').css('border', '1px solid #d00d0d');
                    $('#fcMsg').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    datos.telefone = varT;
                    datos.mensagem = varM;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/FC/documents',
                        success: function success(data) {
                            $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                            $("#formRightFc h4").css("visibility", "hidden");
                            $("#formFC").html("<p id='msgSucesso'>Mensagem enviada com sucesso =)</p>");
                        },
                        error: function error(_error) {
                            console.log(_error);
                        }
                    });
                }
            });
        },
        lojaManutencaoContato: function () {
            $(".enviarForm").click(function () {
                function validateEmail(fcEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fcEmail);
                }

                var varN = $('#fcNome').val();
                var varE = $('#fcEmail').val();

                function validate() {
                    var fcEmail = $("#fcEmail").val();

                    if (validateEmail(fcEmail)) {
                        enviaDados();
                    } else {
                        $('#fcEmail').css('border', '1px solid #d00d0d');
                        $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>');
                    }

                    return false;
                }

                $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                $('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('#fcNome').css('border', '1px solid #d00d0d');
                    $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                } else if (varE == '') {
                    $('#fcEmail').css('border', '1px solid #d00d0d');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/MN/documents',
                        success: function success(data) {
                            $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                            $("#formRightFc h4").css("visibility", "hidden");
                            $("#formFC").html("<p id='msgSucesso'>Cadastro efetuado com sucesso =)</p>");
                        },
                        error: function error(_error) {
                            console.log(_error);
                        }
                    });
                }
            });
        },
        formRevendedora: function () {
            $(".enviarForm").click(function () {
                function validateEmail(fcEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fcEmail);
                }

                var varN = $('#fcNome').val();
                var varE = $('#fcEmail').val();
                var varT = $('#fcTelefone').val();
                var varRs = $('#fcRaSo').val();
                var varCnpj = $('#fcCnpj').val();
                var varImg = $('#fcImagem').val();

                function validate() {
                    var fcEmail = $("#fcEmail").val();

                    if (validateEmail(fcEmail)) {
                        enviaDados();
                    } else {
                        $('#fcEmail').css('border', '1px solid #d00d0d');
                        $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>');
                    }

                    return false;
                }

                $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                $('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('#fcNome').css('border', '1px solid #d00d0d');
                    $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                } else if (varE == '') {
                    $('#fcEmail').css('border', '1px solid #d00d0d');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                } else if (varT == '') {
                    $('#fcTelefone').css('border', '1px solid #d00d0d');
                    $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
                } else if (varRs == '') {
                    $('#fcRaSo').css('border', '1px solid #d00d0d');
                    $('#fcRaSo').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
                } else if (varCnpj == '') {
                    $('#fcCnpj').css('border', '1px solid #d00d0d');
                    $('#fcCnpj').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
                } else if (varImg == '') {
                    $('#fcImagem').css('border', '1px solid #d00d0d');
                    $('#fcImagem').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    datos.telefone = varT;
                    datos.razaoSocial = varRs;
                    datos.cnpj = varCnpj;
                    datos.imagem = varImg;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/RV/documents',
                        success: function success(data) {
                            $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                            $("#formRightFc h4").css("visibility", "hidden");
                            $("#formFC").html("<p id='msgSucesso'>Mensagem enviada com sucesso =)</p>");
                        },
                        error: function error(_error) {
                            console.log(_error);
                        }
                    });
                }
            });
        },
        openMiniCart: function () {
            var e = $(".carrinho a"),
                t = $(".header-minicart, .minicart__overlay");
            e.on("click", function () {
                $(this).addClass("open"), t.addClass("open");
            }),
                $(".header-minicart-close").click(function () {
                    e.removeClass("open"), t.removeClass("open");
                    $(".polo-buy-button").removeClass("loading");
                }),
                $(".header-minicart-empty button").click(function () {
                    t.removeClass("open");
                }),
                $(".header-minicart-actions button").click(function () {
                    t.removeClass("open");
                });
            $(".minicart__overlay").click(function () {
                t.removeClass("open");
            });
        },
        variantesCompraRapida: function () {
            setTimeout(function () {
                $(".prateleira li .planet-product").not(".planet-ajax-completed").each(function (index, el) {
                    var _element = $(this);
                    _element.addClass("planet-ajax-completed"), _element.find(".planet-hover-content").prepend('<div class="hidden-list-skus"></div><ul class="planet-color-list"></ul>');
                    var _product_id = _element.find(".planet-id").val();
                    var avSku;
                    vtexjs.catalog.getProductWithVariations(_product_id).done(function (product) {
                        avSku = product.skus;
                        var colorName = product.dimensionsMap.Cor;
                        var Tamanho = product.dimensionsMap.Tamanho;
                        for (var j = 0; j < avSku.length; j++) {
                            var avColor = avSku[j].dimensions.Cor;
                            var avTamanho = avSku[j].dimensions.Tamanho;
                            var skuVtex = avSku[j].sku;
                            var skuAvailable = avSku[j].available;
                            _element.find(".hidden-list-skus").append('<input class="hidden-select" type="hidden" data-id="' + skuVtex + '" data-color="' + avColor + '" data-tamanho="' + avTamanho + '" data-available="' + skuAvailable + '" />');
                        }
                        for (var i = 0; i < colorName.length; i++) {
                            var _color_name = colorName[i];
                            if (_color_name !== undefined) {
                                _element.find(".planet-color-list").prepend('<li class="' + _color_name + '" data-color="' + _color_name + '">' + _color_name + "</li>");
                            }
                        }
                        for (var k = 0; k < Tamanho.length; k++) {
                            var _Tamanho = Tamanho[k];
                            if (_Tamanho !== undefined) {
                                _element.find(".planet-variations").prepend('<li class="prod-size ' + _Tamanho + '" data-tamanho="' + _Tamanho + '">' + _Tamanho + "</li>");
                            }
                        }

                    });
                    $(document).on("click", ".planet-variations li, .planet-color-list li", function () {
                        $(this).parent().find("li").removeClass("planet-active"),
                            $(this).addClass("planet-active");
                        _element.find('.planet-buy a').removeAttr('href');
                    });
                    _element.find(".planet-buy").hover(function () {
                        var selectorTamanho = $('.planet-variations li.planet-active').attr('data-tamanho');
                        var selectorCor = $('.planet-color-list li.planet-active').attr('data-color');
                        _element.parent().find(`.hidden-list-skus input[data-tamanho="${selectorTamanho}"][data-color="${selectorCor}"]`).addClass('selected');
                    });
                    _element.find(".planet-buy").click(function () {

                        var _sku = _element.parent().find('.selected');
                        if (_sku.attr('data-available') == "false") {
                            alert('Produto nÃ£o disponÃ­vel nesta combinaÃ§Ã£o');
                            $('.hidden-list-skus input').removeClass('selected');
                            _element.parent().find("li").removeClass("planet-active");
                        } else {
                            if (_sku.length) {
                                var item = {
                                    id: _sku.attr("data-id"),
                                    quantity: "1",
                                    seller: "1"
                                };
                                vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                                    $(".header-minicart").addClass("open"),
                                        setTimeout(function () {
                                            $(".header-minicart").removeClass("open");
                                        }, 5e3);

                                });
                                $('.hidden-list-skus input').removeClass('selected');
                                _element.parent().find("li").removeClass("planet-active");
                            } else {
                                alert("Selecione um tamanho e uma cor.");
                            }
                        }
                    });
                });
            }, 2000);
        },

        orderCustom: function () {
            var e = $(".orderBy select").first();
            $(".contOrdenar li a").each(function () {
                var t = $(this).attr("data-href");
                $(this).click(function (a) {
                    a.preventDefault(), e.val(t), e.trigger("change")
                })
            }), jQuery(document).on("click", ".boxFiltroOrder > h3", function (e) {
                $(".boxFiltroOrder > ul.contOrdenar").slideToggle(), $(this).toggleClass("active")
            });
        },
        //Departamento Filtros
        escondeFiltrosNoDesktop: function () {
            $(".search-single-navigator ul").hide();
            $(".search-single-navigator h5").click(function () {
                $(this).next().slideToggle();
                $(this).toggleClass("up-seta-dep");
            });
        },

        insereDivParaToggle: function () {
            $(".search-single-navigator").wrap('<div class="toggle__filtros"></div>');
            $(".toggle__filtros").prepend('<p class="button__categorias">Categorias</p>');

            if (window.outerWidth <= 768) {
                $(".toggle__filtros").hide();
            }

            $(".menu-navegue").click(function (e) {
                e.preventDefault();
                $(this).parent().find(".toggle__filtros").slideToggle();
                $(this).find(".search-navigator-tab.tab-refinar").toggleClass("up-seta-dep");
            });

        },
        alteraNomeDoFiltro: function () {
            $(".search-navigator-tab.tab-refinar").text("Filtros");
        },

        clonaSecionadorDeExibidos: function () {
            var url = window.location.href;
            var valuePagination = url.split('?PS=');
            if (valuePagination[1]) {
                var newValue = valuePagination[1].split('&');
                if (newValue) {
                    $('.order-main-container__numerador-clone').html(newValue[0]);
                } else {
                    $('.order-main-container__numerador-clone').html('20');
                }
            } else {
                $('.order-main-container__numerador-clone').html('20');
            }
        },

        clonaPaginadores: function () {
            var paginadorTop = $(".pager.top");
            $(".center-top").append(paginadorTop);
            var paginadorBottom = $(".pager.bottom");
            $(".center-bottom").append(paginadorBottom);
        },

        trocaNumeroDeResultados: function () {
            var numeroAtual = $(".main .resultado-busca-numero .value:first").text();
            $(".order-main-container__itens").text("\xA0de ".concat(numeroAtual, " produtos"));
        },

        sidebarDepartamento: function () {
            if ($("body").hasClass("planet-departamento")) {
                if (innerWidth > 768) {
                    function animaScroll() {
                        var documentTop = $(window).scrollTop(),
                            sidebar = $(".filtro-sticky"),
                            sidebarBox = $(".filtrosDepartamento"),
                            footerTop = $("footer").offset().top,
                            sidebarBoxHeight = sidebarBox.height() + 90,
                            sidebarTop = sidebar.offset().top;

                        if (documentTop > sidebarTop - 40) {
                            sidebarBox.addClass("active")
                        } else {
                            sidebarBox.removeClass("active")
                        }

                        if (documentTop > footerTop - sidebarBoxHeight) {
                            sidebarBox.addClass("inactive")
                            sidebarBox.removeClass("active")
                        } else {
                            sidebarBox.removeClass("inactive")
                        }
                    }

                    $(document).scroll(function () {
                        animaScroll();
                    })

                }
            }
        },
        seletorVisualizacaoDeQtdProdutos: function () {
            $('.view-one').click(function () {
                $('.resultadoDepartamento .prateleira ul > li').css('width', '100%');
                $(this).addClass('selected');
                $('.view-two, .view-four').removeClass('selected');
            });
            $('.view-two').click(function () {
                $('.resultadoDepartamento .prateleira ul > li').css('width', '48%');
                $(this).addClass('selected');
                $('.view-one, .view-four').removeClass('selected');
            });
            $('.view-four').click(function () {
                $('.resultadoDepartamento .prateleira ul > li').css('width', '32%');
                $(this).addClass('selected');
                $('.view-one, .view-two').removeClass('selected');
            });
        },
        menuMobile: function () {
            if (scre < 980) {

                $(".btn-menu-mobile").fadeToggle();

                setTimeout(function () {
                    $(".btn-menu-mobile").fadeToggle();
                    $(".btn-menu-mobile").click(function () {
                        $("body").toggleClass("aberto");
                    });
                    $('.menu-button').click(function () {
                        $(this).children('div').toggleClass('active');
                    });
                    $(".menu-topo").after("<span class='menu-fechar'> </span>");
                    $(".menu-topo").after("<span class='menu-mobile-close mob'>Close</span>")

                    $(".menu-fechar, .menu-mobile-close").click(function () {
                        $("body").toggleClass("aberto");
                    });
                }, 2500);

                setTimeout(function () {
                    vtexjs.checkout.getOrderForm().done(function (orderForm) {
                        //console.log(orderForm)
                        var userType = orderForm.userType;
                        var nome = (orderForm.clientProfileData !== null) ? orderForm.clientProfileData.firstName : '';
                        var email = (orderForm.clientProfileData !== null) ? (orderForm.clientProfileData.email !== null ? orderForm.clientProfileData.email.substring(0, 10) + '...' : 0) : '';
                        var logado = orderForm.loggedIn;

                        logado = orderForm.loggedIn;
                        if (logado) {
                            $(".menu-topo .menu-principal").prepend("<div class='mobile-login'><ul class='header-user-login'>" +
                                "<li class='saudacao'><span class='user-login'></span> Oi, " + (nome || email) + " </li>" +
                                "</ul></div>");

                            $(".menu-topo .menu-principal").append("<div class='mobile-utility'><ul class='header-user'>" +
                                "<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
                                "<li class='conta'><a href='/_secure/account#/profile'>Minha Conta</a></li>" +
                                "<li class='lojas'><a href='/institucional/nossas-lojas'>Nossas Lojas</a></li>" +
                                "<li class='fale'><a href='/fale-conosco'>Fale Conosco</a></li>" +
                                "<li class='revendedora'><a href='/institucional/seja-uma-revendedora'>SEJA UMA REVENDEDORA</a></li>" +
                                "<li class='sair'><a href='/no-cache/user/logout'><span class='icon-exit'></span>Sair</a></span></li>" +
                                "</ul></div>");
                        } else {
                            $(".menu-topo .menu-principal").prepend("<div class='mobile-login'><ul class='header-user-login'>" +
                                "<li class='saudacao'> <a href='/login'> <span class='user-login'></span><b>Oi, Migs!</b>  Entre ou Cadastre-se </a> </li>" +
                                "</ul></div>");
                            $(".menu-topo .menu-principal").append("<div class='mobile-utility'><ul class='header-user'>" +
                                "<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
                                "<li class='conta'><a href='/_secure/account#/profile'>Minha Conta</a></li>" +
                                "<li class='lojas'><a href='/institucional/nossas-lojas'>Nossas Lojas</a></li>" +
                                "<li class='fale'><a href='/fale-conosco'>Fale Conosco</a></li>" +
                                "<li class='revendedora'><a href='/institucional/seja-uma-revendedora'>SEJA UMA REVENDEDORA</a></li>" +
                                "</ul></div>");
                        }
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function () {
                        $(this).parent().find("ul").first().slideToggle();
                        $(this).parent().toggleClass("aberto");
                    });

                    /* Remove link caso tenha submenu  */
                    $(".menu-topo .menu-principal > li.itemMenu.cat2 > a, .menu-topo .menu-principal > li.itemMenu.cat3 > a, .menu-topo .menu-principal > li.itemMenu.cat5 > a, .menu-topo .menu-principal > li.itemMenu.cat6 > a, .menu-topo .menu-principal > li.itemMenu.cat7 > a, .menu-topo .menu-principal > li.itemMenu.cat64 > a  ").removeAttr("href");
                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function (e) {
                        e.preventDefault()
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue .subMenuTrue").click(function () {
                        $(this).find("ul").first().slideToggle();
                        $(this).toggleClass("aberto");
                    });
                }, 4000);
            }

        },
        recarregaPagina: function () {
            setTimeout(function () {
                $('.pages .page-number, .pages .first, .pages .previous, .pages next, .pages .last').click(function () {
                    location.reload(true);
                });
            }, 1000);
        },

        addVideo: function () {
            const urlVideo = $('.c-video').text()
            const idVideo = urlVideo.lastIndexOf('=') + 1

            $('.c-video__content-video .video').append(`
                <iframe src="https://www.youtube.com/embed/${urlVideo.substring(idVideo)}?rel=0&modestbranding=1&showinfo=0&autohide=1" title="Peptan" frameborder="0" allowfullscreen></iframe>
            `)
        },

        yasminShelf: function () {
            $(".c-images__content ul").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: true,
                arrows: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: false,
                            arrows: true
                        }
                    }
                ]
            });
        },
        iniciaCountdown: function() {
            $(".promo-relampago").each((function() {
                $(this).find(".contador-regressivo-wrapper").vtexCountdown()
            }))
        },

        lpReveilonPG: function() {
            $('.planet-reveillon .prat-right .prateleira > ul').slick({
                slidesToScroll: 3,
                slidesToShow: 3,
                arrows: false,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: "120px",
                            dots: false
                        }
                    }
                ]
            });
        },
        descriptionFixer: function() {
            var descriptionText = $('.productDescription').text();
            var newText = descriptionText.replace('_x000d_', '<br>');
            $('.productDescription').html(newText);
        },
        
        // LP Casas Bahia

        LPnomeCategoria: function(){
            $('.casasbahia .banner-categoria .container-center .box-banner').each(function(){
                var categTitle = $(this).find('img').attr('alt');
                $(this).find('a').append(`<p>${categTitle}</p>`);
            });
        },

        LPbotaoConfira: function(){
            $('.casasbahia .banner-promocionais .container-center .box-banner a').append('<p>Confira</p>');
        },

        LPcarrosselCategoria: function(){
            if (scre < 500) {
                $('.casasbahia .banner-categoria .container-center').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                });
            }
            if (scre < 500) {
                $('.casasbahia .banner-promocionais .container-center').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                });
            }
        },

        init: function () {
            //Geral            
            codePlanet.sliderMenu();
            codePlanet.headerFixo();
            codePlanet.qtdCart();
            codePlanet.verificaLogado();
            codePlanet.BuscaHeader();
            codePlanet.slidePrincipal();
            codePlanet.slidePrincipalMobile();
            codePlanet.carrosselInformativo();
            codePlanet.carrosselDepoimentos();
            codePlanet.carrosselDepartamentos();
            codePlanet.carrosselInstagram();
            codePlanet.prateleirasGerais();
            codePlanet.slidePrateleiraMais();
            codePlanet.slidePrateleiraProdutos();
            codePlanet.aplicaNomeCategoria();
            codePlanet.nomeBannerCategoria();
            codePlanet.prateleirasVerao2022();
            codePlanet.descPrat();
            codePlanet.fixFrete();
            codePlanet.breadCrumb();
            codePlanet.thumbImg();
            codePlanet.qtdProd();
            codePlanet.descricaoCategoria();
            codePlanet.zoomProd();
            codePlanet.slidePrateleiraBusca();
            codePlanet.filtroMobile();
            codePlanet.newsletter();
            codePlanet.institucional();
            codePlanet.footerMobile();
            codePlanet.faleConosco();
            codePlanet.lojaManutencaoContato();
            codePlanet.formRevendedora();
            codePlanet.openMiniCart();
            codePlanet.orderCustom();
            codePlanet.escondeFiltrosNoDesktop();
            codePlanet.insereDivParaToggle();
            codePlanet.alteraNomeDoFiltro();
            codePlanet.clonaSecionadorDeExibidos();
            codePlanet.clonaPaginadores();
            codePlanet.trocaNumeroDeResultados();
            codePlanet.sidebarDepartamento();
            codePlanet.seletorVisualizacaoDeQtdProdutos();
            codePlanet.recarregaPagina();
            codePlanet.bfLandingPage();
            codePlanet.addVideo();
            codePlanet.yasminShelf();
            codePlanet.iniciaCountdown();
            codePlanet.lpReveilonPG();
            codePlanet.descriptionFixer();
            codePlanet.LPnomeCategoria();
            codePlanet.LPbotaoConfira();
            codePlanet.LPcarrosselCategoria();
        },
        init_ajax: function () {
            codePlanet.menuMobile();
            codePlanet.variantesCompraRapida();
        }
    }
    codePlanet.init_ajax();
    codePlanet.init();

});
