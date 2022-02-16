
$(document).ready(function() {
    // GERAIS PARA USO NO RESTO DO ARQUIVO
    var scre = $("body").width();
    $(".helperComplement").remove();


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

    var codeJB = {
        menuPrincipal : function(){
            setTimeout(function () {
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
            }, 1000);
        },
        
        sliderMenu: function(){
             // Imagens do menu
            setTimeout(function () {
                var imgMenu = [];

                imgMenu[0] = $('.imgAcessorios');
                imgMenu[1] = $('.imgBeleza');
                imgMenu[2] = $('.imgCalcados');
                imgMenu[3] = $('.imgMoletom');
                imgMenu[4] = $('.imgRoupas');

                $('.menu-principal .cat6319 .imageMenu').html(imgMenu[0]);
                $('.menu-principal .cat6320 .imageMenu').html(imgMenu[1]);
                $('.menu-principal .cat6321 .imageMenu').html(imgMenu[2]);
                $('.menu-principal .cat6322 .imageMenu').html(imgMenu[3]);
                $('.menu-principal .cat6323 .imageMenu').html(imgMenu[4]);

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

            }, 3000);
        },
        stickyHeader: function(){
            $(window).scroll(function() {
                if ($(this).scrollTop() > 1){
                    $('.header').addClass('sticky');
                }
                else{
                    $('.header').removeClass('sticky');
                }
            });
            $(".close").click(function(){
                $(".header .jb-top-bar").slideUp();
                $('.slide').css('margin-top', '3em');
                $('.jb-produto .bread').css('margin-top', '4em');
                if (scre <= 500){
                    $('.jb-produto .bread').css('margin-top', '3em');
                    $('.slide-mobile').css('margin-top', '10px');
                }
            });
        },

        trataTituloPdp: function(){
            var text = $('.productName').text();
            var textToSplit = text.split(' - ');
            var newText = textToSplit[0];
            $('.productName').text(newText);
        },

        userNameAccountMobile: function() {
            if (scre <= 980){
                $('.lista-desejos').prependTo('ul.nav-departament');
                $('.user-name__account').prependTo('ul.nav-departament');
                $('.carrinho').before('<div class="icon-search"></div>');
            }
        },

        abreFechaBuscaMobile: function() {
            if (scre <= 980) {
                $('.icon-search').click(function(){
                    $('.header-busca').slideToggle();
                });
            }
        },

        //Top Bar
        TopBar: function() {
            $('.jb-top-bar ul').slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
            });

        },
        qtdCart: function() {
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                var carItems = orderForm.items.length;
                $('.carrinho .qtd-cart').text(carItems);
            });
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
                        (e = e.replace(/ /g, "").replace("Olá", "").replace(".", "")), $("p.welcome").html("Olá" + e);
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
        BuscaHeader: function() {
            $(document).on("click", ".search-icon", function() {
                $(".busca-topo__busca-container").toggleClass("busca-open");
                //$(".header-principal__container-hide").removeClass("carrinho-show");
                //$(".header-principal__login-hide").removeClass("login-show");
            });
        },

        slidePrincipal: function() {
            if ($("body").hasClass("jb-home")) {
                $('.slide-principal').slick({
                    dots: true,
                    arrows: true,
                    slidesToShow: 1,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 5000,
                    lazyLoad: 'ondemand',
                });

            }
        },

        slidePrincipalMobile: function() {
            if ($("body").hasClass("jb-home")) {
                $('.slide-mobile').slick({
                    dots: true,
                    arrows: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    lazyLoad: 'ondemand',
                });

            }
        },

        //Informativo
        carrosselInformativo: function() {
            if (scre < 980) {
                $('.informativos ul').slick({
                    infinite: false,
                    autoplay: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    lazyLoad: 'ondemand',
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
        carrosselDestaques: function() {
            if (scre < 980) {
                $('.jb-destaques .slick-destaques').slick({
                    infinite: false,
                    autoplay: false,
                    slidesToShow: 3,
                    lazyLoad: 'ondemand',
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
        carrosselColecoes: function() {
            if (scre < 980) {
                $('.jb-banners-colecoes .slick-colecoes').slick({
                    infinite: false,
                    autoplay: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    lazyLoad: 'ondemand',
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

        //Banner de Banners departamento
        bannersDepartamentos: function() {
            if (scre < 980) {
                $('.banner-departamentos > div').slick({
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    responsive: [{
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: false
                            }
                        },
                        {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: false
                            }
                        }
                    ]
                });
            }
        },


        prateleiraPatua: function() {
            $('.prat-right__amuletos .prateleira > ul').slick({
                dots: false,
                arrow: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 980,
                        settings: {
                            dots: false,
                            arrow: true,
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            dots: false,
                            arrow: true,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            dots: false,
                            arrow: true,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            })
        },

        slidePrateleiraProdutos: function() {
            if ($("body").hasClass("jb-produto")) {
                $('.slide-prod .prateleira > ul').slick({
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        }
                    ]
                });
            }
        },
        comprarFlutuante: function(){
            $(window).scroll(function () {
                if( $(window).scrollTop() > $('div#comprar-flutuante').offset().top - $('div#comprar-flutuante').offset().top && !($('div#comprar-flutuante').hasClass('stickybottom'))){
                    $('div#comprar-flutuante').addClass('stickybottom');
                    $('div#comprar-flutuante').animate({"bottom":"0%"}, 1000);
                } else if ($(window).scrollTop() == 0){
                    $('div#comprar-flutuante').removeClass('stickybottom');
                    $('div#comprar-flutuante').css({"bottom":"-100%"});
                }
            });
        },
        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function() {
            $('.slide-prod').each(function() {
                if ($("body").hasClass("jb-buscavazia")) {
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

        filtroMobile: function() {
            if (scre < 1000) {
                var qtdFiltro = $('.filtrosDepartamento .search-multiple-navigator').length;
                if (qtdFiltro > 0) {
                    $('.filtrosDepartamento .search-multiple-navigator').hide();
                    $('.search-multiple-navigator h5').click(function() {
                        $(this).toggleClass('aberto');
                        $('.search-multiple-navigator fieldset div').slideToggle();
                    });
                } else {

                }
            }
        },

    

        // Nome Departamento Categoria
        aplicaNomeCategoria: function() {
            if ($("body").hasClass("jb-categoria") || $("body").hasClass("jb-departamento")) {
                //Termo buscado
                var categoria = vtxctx.categoryName;
                $(".nomeDepartamento h1").prepend(categoria);
                $(".descricao-categoria .titulo-descricao h3").prepend(categoria);
            }

        },

        descPrat: function() {
            return setTimeout(function(){
                $(".porcentagem").each(function() {
                    var valor = $(this).html();
                    valor = valor.replace(" %", "");
                    valor = valor.replace(",", ".");
                    valor = valor.replace("<br>", "");
                    valor = valor.replace("OFF", "");
                    valor = valor.replace("%", "");
                    valor = Number(valor);
                    valor = Math.ceil(valor);
    
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
    
                //retorna seleÃ§Ã£o de campo cep para inicio
                $('#txtCep').on('focus click', function () {
                    $(this)[0].setSelectionRange(0, 0);
                });
            });
        },

        sliderVaiGostar: function() {
            if ($("body").hasClass("resultado-busca")) {
                $('.jb-prateleira ul').slick({
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
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        }
                    ]
                });
            }
        },

        slideOfertas: function() {
            if ($("body").hasClass("jb-home")) {
                $('.ofertas01 .jb-prateleira > ul').slick({
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
                            breakpoint: 360,
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

        thumbImg: function() {
            if ($("body").hasClass("jb-produto")) {
                var video = $(".infos-prod .infos-left .especificacao-prod table tr td.Videos").html();
                // console.log(video);

                if (video !== undefined) {
                    $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs").append("<li class='video'><img src='/arquivos/video-prod.jpg' alt='video'/></li>");

                    $(".produto-all #produtoDiv-esquerda .apresentacao #show #include #image-main, .produto-all #produtoDiv-esquerda .apresentacao #show #include #image").append(video);

                    $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs li").click(function() {
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
        qtdProd: function() {
            if ("abc" == "abc") {
                setTimeout(function() {
                    $(".qtdPrateleira .btnAcr").click(function() {

                        var atual = parseInt($(this).prev(".qtdVal").val());
                        //console.log(atual)
                        atual = atual + 1;
                        $(this).prev(".qtdVal").val(atual);
                    });

                    $(".qtdPrateleira .btnDec").click(function() {
                        var atual = parseInt($(this).next(".qtdVal").val());
                        if (atual == 1) {
                            $(this).next(".qtdVal").val("1");
                        } else {
                            atual = atual - 1;
                            $(this).next(".qtdVal").val(atual);
                        }
                    });

                    $(".qtdPrateleira .qtdVal").bind("keyup blur focus", function(e) {
                        e.preventDefault();
                        var expre = /[^\d]/g;
                        $(this).val($(this).val().replace(expre, ''));
                    });
                }, 200);


                // Prod
                $(".produto-all #produtoDiv-direita .jb-produto__buy-button .buy-button").click(function(event) {
                    //event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();

                    if (qtd == "") {
                        qtd = "1";
                    }

                    if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                        alert('Por favor, selecione o modelo desejado.');
                    } else {

                        var res = hrefCart.replace("qty=1", "qty=" + qtd);
                        //console.log(res);
                        var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                        var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                        setTimeout(function() {
                            vtexjs.checkout.getOrderForm().then(function() {
                                item = {
                                    id: resUTL,
                                    quantity: qtd,
                                    seller: 1
                                };
                                vtexjs.checkout.addToCart([item]).done(function(orderForm) {

                                    vtexjs.checkout.getOrderForm().done(function(e) {
                                        var qtdCart = e.items.length;
                                        $(".info-cart .qtd-cart").html(qtdCart);
                                    });
                                    //$(".final-compra-externo, .final-compra-interno").fadeToggle();
                                });
                            });
                        });
                    }
                });

            }
        },

        parcProd: function() {
            $(".valor-parcelado .titulo-parcelamento").text("Veja opções de parcelamento");
            $(".valor-parcelado .titulo-parcelamento").click(function() {
                $(".valor-parcelado .other-payment-method-ul").fadeToggle();
                $(this).toggleClass("aberto");
            });
        },

        breadCrumb: function() {
            $(".breadCrumb ul li").first().find("a").text("Home");

            if ($("body").hasClass("jb-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("jb-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("jb-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        descricaoCategoria: function() {
            if ($("body").hasClass("jb-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        nomeBannerCategoria: function() {
            if ($("body").hasClass("jb-home")) {
                $('.jb-destaques .box-banner a img, .jb-banners-colecoes .box-banner a img, .banner-departamentos .box-banner a img').each(function(){
                    var nomeCategoria = $(this).attr('alt');
                    $(this).parent().append(`<div class='jb-title-categoria'><h3>${nomeCategoria}</h3><a class="ver-todos">ver todos</a></div>`);
                });
            }
        },
               

        zoomProd: function() {
            $(window).load(function() {
                var janela = $(window).width();
                if ($("body").hasClass("jb-produto")) {

                    window.LoadZoom = function(pi) {
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
        newsletter: function() {

            $(".newsletter-footer .newsletter__direita .newsletter__form .envia-newsletter").click(function() {

                function validateEmail(fcEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(fcEmail);
                }

                if ($(this).hasClass("btn-ok")) {
                    var varE = $('.email-newsletter').val();
                    var fcEmail = $(".email-newsletter").val();
                    var campoEmail = $('.email-newsletter');
                    var resposta = 'teste';
                } else if ($(this).hasClass("envia-newsletter")) {
                    var varE = $('.newsletter-footer .newsletter__direita .newsletter__form .newsletter').val();
                    var fcEmail = $(".newsletter-footer .newsletter__direita .newsletter__form .newsletter").val();
                    var campoEmail = $('.newsletter-footer .newsletter__direita .newsletter__form .newsletter');
                    var resposta = 'teste1';
                }

                function validate() {
                    if (validateEmail(fcEmail)) {
                        // console.log("Enviado");
                        enviaDados();
                    } else {
                        campoEmail.css('border', '1px solid #d00d0d');
                    }
                    return false;
                }

                validate();

                $('.newsletter-footer .newsletter__direita .newsletter__form .newsletter,').css('border', 'none');

                function enviaDados() {
                    var datos = {};
                    datos.email = varE;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/NL/documents',
                        success: function(data) {

                            if (resposta == 'teste') {
                                $(".email-newsletter").html("<p id='msgSucesso'>E-mail cadastrado com sucesso =)</p>");
                            } else if (resposta == 'teste1') {
                                $(".newsletter-footer .newsletter__direita .newsletter__form .newsletter").hide();
                                $(".newsletter-footer .newsletter__direita .newsletter__form").after("<p id='msgSucesso'>E-mail cadastrado com sucesso =)</p>");
                            }
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });

                }

            });

            //Envia com ENTER
            $('#txt').keyup(function(event) {
                if (event.which == 13) {
                    $('#go').click();
                }
            });
            $('#go').click(function(e) {
                if ($('#txt').val().trim().length) {
                    //alert("Submitted!");
                } else {
                    alert("Preencha todos os campos!");
                }
            });

        },
      
        institucional: function() {
            if (scre < 980) {
                $(".menu-lateral-institucional h3").click(function() {
                    $(this).toggleClass("aberto");
                    $(".menu-lateral-institucional ul").slideToggle();
                });
                $(".menu-lateral-institucional-2 h3").click(function() {
                    $(this).toggleClass("aberto");
                    $(".menu-lateral-institucional-2 ul").slideToggle();
                });
            }
        },

        footerMobile: function() {
            if (scre < 980) {
                $(".footer h3, .footer-01-01 h3").click(function() {
                    $(this).next("ul").slideToggle();
                    $(this).toggleClass("aberto");
                });
                // $(".footer .footer-01-01 h3").click(function() {
                //     $(this).parent().find("p").slideToggle();
                //     $(this).toggleClass("aberto");
                // });
            }
        },

        placeholderFrete: function() {
            $(window).load(function() {
                $(".calc-frete .cep fieldset .prefixo .fitext").attr("placeholder", "Informe seu CEP:");
            });
        },

        /* Fale Conosco */
        faleConosco: function() {
            $(".enviarForm").click(function() {
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
        lojaManutencaoContato: function() {
            $(".enviarForm").click(function() {
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
        formRevendedora: function() {
            $(".enviarForm").click(function() {
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
                $(".header-minicart-empty button").click( function () {	
                    t.removeClass("open");	
                }),	
                $(".header-minicart-actions button").click( function () {	
                    t.removeClass("open");	
                });	
                $(".minicart__overlay").click( function () {
                    t.removeClass("open");
                });
        },
        variantesCompraRapida: function () {
            setTimeout(function(){
                $(".prateleira li .jb-product").not(".jb-ajax-completed").each(function (index, el) {
                    var _element = $(this);
                    _element.addClass("jb-ajax-completed"), _element.find(".jb-hover-content").append('<div class="hidden-list-skus"></div><ul class="jb-color-list"></ul>');
                    var _product_id = _element.find(".jb-id").val();
                    var avSku;
                    vtexjs.catalog.getProductWithVariations(_product_id).done(function(product){
                        avSku = product.skus;
                        var metalName = product.dimensionsMap.Metal;
                        var Aro = product.dimensionsMap.Aro;
                        if (metalName !== undefined) {
                            _element.find('.jb-color-list').before('<div class="button-abre-fecha metalCor">Cor do Metal</div>');
                        }
                        if (Aro !== undefined) {
                            _element.find('.jb-hover-content').prepend('<div class="button-abre-fecha tamanhoSel">Tamanho</div>');
                            for (var k = 0; k < Aro.length; k++) {
                                var _Aro = Aro[k];
                                if(_Aro !== undefined){
                                    _element.find(".jb-variations").prepend('<li class="prod-size ' + _Aro + '" data-tamanho="'+ _Aro +'">' + _Aro + "</li>");
                                }
                            }
                        }
                        for (var j = 0; j < avSku.length; j++){
                            var avMetal = avSku[j].dimensions.Metal;
                            var avAro = avSku[j].dimensions.Aro;
                            var skuVtex = avSku[j].sku;
                            var skuAvailable = avSku[j].available;
                            _element.find(".hidden-list-skus").append('<input class="hidden-select" type="hidden" data-id="'+ skuVtex +'" data-tamanho="'+ avAro +'" data-color="' + avMetal + '" data-available="' + skuAvailable + '" />');
                        }
                        for (var i = 0; i < metalName.length; i++) {
                            var _metal_name = metalName[i];
                            if(_metal_name !== undefined){
                                _element.find(".jb-color-list").prepend('<li class="' + _metal_name + '" data-color="'+ _metal_name +'">' + _metal_name + "</li>");
                            }
                        }
                        $('.jb-product .jb-hover-content .button-abre-fecha.tamanhoSel').click(function() {
                            $(this).parent().find('.jb-variations').slideDown();
                        });
                        $('.jb-product .jb-hover-content .jb-variations .prod-size').click(function() {
                            var text = $(this).text();
                            $(this).parent().slideUp();
                            $(this).parents().eq(2).find('.button-abre-fecha.tamanhoSel').html(`Tamanho: ${text}`);
                        });
                        $('.jb-product .jb-hover-content .button-abre-fecha.metalCor').click(function() {
                            $(this).parent().find('.jb-color-list').slideDown();
                        });
                        $('.jb-product .jb-hover-content .jb-color-list li').click(function() {
                            var text = $(this).text();
                            $(this).parent().slideUp();
                            $(this).parents().eq(2).find('.button-abre-fecha.metalCor').html(`Metal: ${text}`);
                        });
                        
                    });
                    $(document).on("click", ".jb-variations li, .jb-color-list li", function () {
                        $(this).parent().find("li").removeClass("jb-active"),
                        $(this).addClass("jb-active");
                        _element.find('.jb-buy a').removeAttr('href');
                    });
                    _element.find(".jb-buy").hover(function(){
                        var selectorTamanho = $('.jb-variations li.jb-active').attr('data-tamanho');
                        var selectorCor = $('.jb-color-list li.jb-active').attr('data-color');
                        if (selectorTamanho !== undefined){
                            _element.parent().find(`.hidden-list-skus input[data-tamanho="${selectorTamanho}"][data-color="${selectorCor}"]`).addClass('selected');
                        }else{
                            _element.parent().find(`.hidden-list-skus input[data-color="${selectorCor}"]`).addClass('selected');
                        }
                    });
                    _element.find(".jb-buy").click(function(){
                        
                        var _sku = _element.parent().find('.selected');
                        if (_sku.attr('data-available') == "false"){
                            alert('Produto não disponível nesta combinação');
                            $('.hidden-list-skus input').removeClass('selected');
                            _element.parent().find("li").removeClass("jb-active");
                            $('.button-abre-fecha.tamanhoSel').html('Tamanho');
                            $('.button-abre-fecha.metalCor').html('Cor do Metal');
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
                                    _element.parent().find("li").removeClass("jb-active");
                                    $('.button-abre-fecha.tamanhoSel').html('Tamanho');
                                    $('.button-abre-fecha.metalCor').html('Cor do Metal');
                            } else { 
                                alert("Selecione um tamanho e uma cor.");
                            }
                        }
                    });
                });
            }, 2000);
        },
        //Departamento Filtros
        escondeFiltrosNoDesktop: function() {
            $(".search-single-navigator ul").hide();
            $(".search-single-navigator h5").click(function () {
            $(this).next().slideToggle();
            $(this).toggleClass("up-seta-dep");
            });
        },

        insereDivParaToggle: function() {
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

        toggleDosFiltros: function() {
            if (window.outerWidth <= 768) {
            $(".search-single-navigator ul").hide();
            $(".search-single-navigator h4, .search-single-navigator h5").click(function (e) {
                e.preventDefault();
                $(this).next().slideToggle();
            });
            }
        },

        parcelamentoOpt: function() {
            if ($('body').hasClass('jb-produto')){
                setTimeout(function(){
                    $('main').append('<div class="op-parc-lightbox"></div>');
                    $('.other-payment-method-content').appendTo('.op-parc-lightbox');
                    $('.other-payment-method-content').prepend('<p class="close-parc">X</p>');
                    $('.price-installments').click(function(){
                        $('.op-parc-lightbox').css('display', 'flex');
                        $('.other-payment-method-content').css('display', 'block');
                    });
                    $('.op-parc-lightbox .close-parc').click(function(){
                        $('.op-parc-lightbox').css('display', 'none');
                        $('.other-payment-method-content').css('display', 'none');
                    });
                },500);
            }
        },

        guiaDeTamanhos: function(){
            $('.guia-medidas').click(function(){
                $('.jn-size').css('display', 'block');
            });
            $('.hide-modal').click(function(){
                $('.jn-size').css('display', 'none');
            });
        },

        compreJuntoVazioTitulo: function(){
            function isEmpty( el ){
                return !$.trim(el.html())
            }
            if (isEmpty($('.buy-together-content'))) {
                $('.slideCompreJunto h2.titulo').hide();
            }
        },

        compartilhaWp: function(){
            var shareUrl = window.location.href;
            $('.JB-produto__buy-button .shareWhats').append(`<a href="https://wa.me/?text=${shareUrl}" class="compartilharWp">Compartilhar via WhatsApp</a>`);
        },

        wishListTratamento: function(){
            setTimeout(function(){
                $('.glis-popup-link').text(`Salvar na Wishlist`);
            }, 1200);
        },

        alteraNomeDoFiltro: function() {
            $(".search-navigator-tab.tab-refinar").text("Filtros");
        },

        clonaNomeDaCategoria: function() {
            var nomeClone = $(".search-single-navigator h3:first-of-type a").text();
            $(".jb-departamento__topo .nomeDepartamento h2").text(nomeClone);
        },

        clonaSecionadorDeExibidos: function() {
            var selecionadorDeExibidosTop = $(".resultadoDepartamento .sub:first-of-type .filterBy select");
            $(".order-main-container__numerador-clone").append(selecionadorDeExibidosTop);
        },

        clonaPaginadores: function() {
            var paginadorTop = $(".pager.top");
            $(".center-top").append(paginadorTop);
            var paginadorBottom = $(".pager.bottom");
            $(".center-bottom").append(paginadorBottom);
        },

        videoOnThumbs: function(){
            if ($("body").hasClass("jb-produto")) {
                var video = $(".value-field.Videos").html();
                if (video !== undefined) {
                    $(".thumbs").append("<li class='video-thumb'><img src='/arquivos/jb-video-prod.jpg' alt='video'/></li>");
                    $("li.video-thumb").click(function(){
                        $("#include").append(video);
                        $("#image").hide();
                        $(".video-thumb").css('pointer-events', 'none');
                    });
                    $("li:not(.video-thumb)").click(function(){
                        $("#include li").remove();
                        $("#image").show();
                        $(".video-thumb").css('pointer-events', 'fill');
                    });
                }
            }
        },

        abreFechaPDPInstit: function() {
            $('.title').click(function(){
                $(this).parent().find('.conteudo-institucional').slideToggle();
            });
        },

        abreFechaDescription: function() {
            if (scre > 500) {
                $('.productDescription').click(function(){
                    $(this).toggleClass('aberto');
                });
            }else if (scre <= 500) {
                $('.descricao-especificacao h2.titulo').click(function(){
                    $('.productDescription').slideToggle();
                });
                $('table.group.Especificacoes-do-produto').click(function(){
                    $(this).find('tbody').slideToggle();
                });
                $('table.group.Informacoes-adicionais').click(function(){
                    $(this).find('tbody').slideToggle();
                });
            }
        },

        trocaNumeroDeResultados: function() {
            var numeroAtual = $(".main .resultado-busca-numero .value:first").text();
            $(".order-main-container__itens").text("\xA0de ".concat(numeroAtual, " produtos"));
        },
     
        filtroCategoria: function() {
            $(".filtrosDepartamento .search-single-navigator h5,.filtrosDepartamento .search-single-navigator h4").each(function (e) {
                var qtdFiltros = $(this).next('ul').find('li').length;
          
                if (qtdFiltros < 1) {
                  $(this).next('ul').remove();
                  $(this).remove();
                }
            });
        },

        showDropDownList: function() {
            $('.order-main-container-right-order__item--label').click(function (e) {
              $('.order-main-container-right-order-list').slideToggle();
            });
        },

        changeDropDownLabel: function() {
            $('.order-main-container-right-order__item:not(.order-main-container-right-order__item--label)').click(function (e) {
              var id = e.target.getAttribute('data-id');
              $('.order-main-container-right-order-list').slideToggle();
              window.location.href = window.location.href.split("?")[0] + "?PS=16&O=" + id;
            });
        }, 
        sidebarDepartamento: function(){
            if ($("body").hasClass("jb-departamento")) {
                if(innerWidth > 768){
                    function animaScroll(){
                    var documentTop = $(window).scrollTop(),
                        sidebar = $(".filtro-sticky"),
                        sidebarBox = $(".filtrosDepartamento"),
                        footerTop = $("footer").offset().top,
                        sidebarBoxHeight = sidebarBox.height() + 90,
                        sidebarTop = sidebar.offset().top;
            
                    if(documentTop > sidebarTop - 40){
                        sidebarBox.addClass("active")
                    } else {
                        sidebarBox.removeClass("active")
                    }
            
                    if(documentTop > footerTop - sidebarBoxHeight){
                        sidebarBox.addClass("inactive")
                        sidebarBox.removeClass("active")
                    } else {
                        sidebarBox.removeClass("inactive")
                    }
                    }
            
                    $(document).scroll(function(){
                    animaScroll();
                    })
            
                }
            }
        },
        seletorVisualizacaoDeQtdProdutos: function(){
            $('.view-one').click(function(){
                $('.resultadoDepartamento .prateleira ul > li').css('width','100%');
                $(this).addClass('selected');
                $('.view-two, .view-four').removeClass('selected');
            });
            $('.view-two').click(function(){
                $('.resultadoDepartamento .prateleira ul > li').css('width','48%');
                $(this).addClass('selected');
                $('.view-one, .view-four').removeClass('selected');
            });
            $('.view-four').click(function(){
                $('.resultadoDepartamento .prateleira ul > li').css('width','32%');
                $(this).addClass('selected');
                $('.view-one, .view-two').removeClass('selected');
            });
        },
       
        recarregaPagina: function(){
            setTimeout(function(){
                    $('.pages .page-number, .pages .first, .pages .previous, .pages next, .pages .last').click(function(){
                        location.reload(true);
                    });
                }, 1000);
        },
        recarregaPercentual: function(){
            setTimeout(function(){
                    $('.abas_vitrine ul li a').click(function(){
                        codeJB.descPrat();
                    });
                }, 1000);
        },
        init: function() {
            //Geral            
            //codeJB.sliderMenu();
            codeJB.stickyHeader();
            codeJB.qtdCart();
            codeJB.verificaLogado();
            codeJB.BuscaHeader();
            codeJB.slidePrincipal();
            codeJB.slidePrincipalMobile();
            codeJB.TopBar();
            codeJB.carrosselInformativo();
            codeJB.carrosselDestaques();
            codeJB.carrosselColecoes();
            codeJB.bannersDepartamentos();
            codeJB.prateleiraPatua();
            codeJB.trataTituloPdp();
            codeJB.parcelamentoOpt();
            codeJB.guiaDeTamanhos();
            codeJB.compartilhaWp();
            codeJB.wishListTratamento();
            codeJB.videoOnThumbs();
            codeJB.abreFechaPDPInstit();
            codeJB.abreFechaDescription();
            codeJB.slidePrateleiraProdutos();
            codeJB.compreJuntoVazioTitulo();
            codeJB.comprarFlutuante();
            //codeJB.aplicaNomeCategoria();
            codeJB.nomeBannerCategoria();
            codeJB.descPrat();
            //codeJB.fixFrete();
            //codeJB.sliderVaiGostar();
            //codeJB.slideOfertas();
            //codeJB.slidePrateleiraMais();
            //codeJB.breadCrumb();
            //codeJB.thumbImg();
            //codeJB.qtdProd();
            //codeJB.parcProd();  
            //codeJB.descricaoCategoria();
            //codeJB.zoomProd();
            //codeJB.slidePrateleiraBusca();
            //codeJB.filtroMobile();
            codeJB.newsletter();
            //codeJB.institucional();
            codeJB.footerMobile();
            //codeJB.faleConosco();
            codeJB.lojaManutencaoContato();
            codeJB.formRevendedora();
            codeJB.openMiniCart();
            //Departamento
            //codeJB.escondeFiltrosNoDesktop();
            codeJB.insereDivParaToggle();
            codeJB.userNameAccountMobile();
            codeJB.abreFechaBuscaMobile();
            //codeJB.toggleDosFiltros(); ---> funciona sem
            //codeJB.alteraNomeDoFiltro();
            //codeJB.clonaNomeDaCategoria();
            //Paginacao
            //codeJB.clonaSecionadorDeExibidos();
            //codeJB.clonaPaginadores();
            //codeJB.trocaNumeroDeResultados();
            //codeJB.filtroCategoria();
            //codeJB.showDropDownList();
            //codeJB.changeDropDownLabel();
            //codeJB.sidebarDepartamento();
            codeJB.seletorVisualizacaoDeQtdProdutos();
            codeJB.recarregaPagina();
            codeJB.recarregaPercentual();
        },
        init_ajax: function(){
            codeJB.menuPrincipal();
            codeJB.variantesCompraRapida();
        }
    }
    codeJB.init_ajax();
    codeJB.init();

});
isMobile = !1;
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isMobile = !0);
var configMobile = {
    init: function() {
        $(window).height();
        var e = $(window).width();
        $(document).height(), e <= 1024 ? $(".info-product").after($(".description-product")) : $(".image-thumb").after($(".description-product"));
    },
}