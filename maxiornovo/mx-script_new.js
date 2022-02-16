
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

    var codeMX = {
        menuPrincipal : function(){
            setTimeout(function () {
                $("body").on("click", ".click-open", function() {
                        $(this).find('drop').slideToggle();
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
            $(".mx-top-bar .close").click(function(){
                $(".header .mx-top-bar").slideUp();
                $('.slide').css('margin-top', '3em');
                $('.mx-produto .bread').css('margin-top', '4em');
                if (scre <= 500){
                    $('.mx-produto .bread').css('margin-top', '3em');
                    $('.slide-mobile').css('margin-top', '10px');
                }
            });
        },

        stickyFiltro: function() {
            if (scre > 980) {
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 400){
                        $('.departamento aside').addClass('sticky');
                    }
                    else{
                        $('.departamento aside').removeClass('sticky');
                    }
                });
            }
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

        abreFechaBusca: function() {
            $('.search-icon').click(function(){
                $('.busca-topo__busca-container').slideToggle();
            });
            $('.icon-search').click(function(){
                $('.busca-topo__busca-container').slideToggle();
            });
        },

        //Top Bar
        TopBar: function() {
            $('.mx-top-bar ul').slick({
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
                            $("header .ajax-content-loader").append(
                                "<div class='box-welcome'><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><a href='/giftlist/manage' class='add-wishlist lista-de-desejos_header'>Wishlist</a><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
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
            });
        },

        slidePrincipal: function() {
            if ($("body").hasClass("mx-home")) {
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
            if ($("body").hasClass("mx-home")) {
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
                                infinite: false
                            }
                        },
                        {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: false
                            }
                        }
                    ]
                });
            }
        },
        carrosselDestaques: function() {
            if (scre < 980) {
                $('.mx-destaques .container-categorias, .footer .footer-01:nth-of-type(1), .informativo .text-wrapper').slick({
                    infinite: false,
                    autoplay: false,
                    slidesToShow: 3,
                    // lazyLoad: 'ondemand',
                    slidesToScroll: 1,
                    dots: true,
                    responsive: [{
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
        carrosselColecoes: function() {
                $('.mx-banners-colecoes .slick-colecoes .prateleira > ul').slick({
                    infinite: false,
                    autoplay: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    lazyLoad: 'ondemand',
                    dots: true,
                    responsive: [
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
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        }
                    ]
                });
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
                            dots: true,
                            arrow: false,
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            dots: true,
                            arrow: false,
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            dots: true,
                            arrow: false,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            })
        },

        slidePrateleiraProdutos: function() {
            if ($("body").hasClass("mx-produto")) {
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
            if($('body').hasClass('mx-produto')){
                $(window).scroll(function () {
                    if( $(window).scrollTop() > $('div#comprar-flutuante').offset().top - $('div#comprar-flutuante').offset().top && !($('div#comprar-flutuante').hasClass('stickybottom'))){
                        $('div#comprar-flutuante').addClass('stickybottom');
                        $('div#comprar-flutuante').animate({"bottom":"0%"}, 1000);
                    } else if ($(window).scrollTop() == 0){
                        $('div#comprar-flutuante').removeClass('stickybottom');
                        $('div#comprar-flutuante').css({"bottom":"-100%"});
                    }
                });
                $('div#comprar-flutuante .container .row').append('<div class="close-button">X</div>');
                $('.close-button').click(function(){
                    $('div#comprar-flutuante').removeClass('stickybottom');
                    $('div#comprar-flutuante').css({"bottom":"-100%", "display":"none"});
                });
            }
        },
        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function() {
            $('.slide-prod').each(function() {
                if ($("body").hasClass("mx-buscavazia")) {
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
            if ($("body").hasClass("mx-categoria") || $("body").hasClass("mx-departamento")) {
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
            }, 2000),
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
                $('.mx-prateleira ul').slick({
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
            if ($("body").hasClass("mx-home")) {
                $('.ofertas01 .mx-prateleira > ul').slick({
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
            if ($("body").hasClass("mx-produto")) {
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
        addProductToMinicartPDP: function() {
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
                $(".produto-all #produtoDiv-direita .MX-produto__buy-button .buy-button").click(function(event) {
                    event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();


                    if (qtd == "") {
                        qtd = "1";
                    }

                    if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                        alert('Por favor, selecione tamanho e cor do metal');
                    } else {

                        var res = hrefCart.replace("qty=1", "qty=" + qtd);
                        var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                        var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                        console.log(resUTL);
                        setTimeout(function() {
                            vtexjs.checkout.getOrderForm().then(function() {
                                item = {
                                    id: resUTL,
                                    quantity: "1",
                                    seller: "1"
                                };
                                vtexjs.checkout.addToCart([item], null, 2).done(function(orderForm) {
                                    
                                    $(".header-minicart").addClass("open"),
                                    setTimeout(function () {
                                        $(".header-minicart").removeClass("open");
                                    }, 5e3);
                                    vtexjs.checkout.getOrderForm().done(function(e) {
                                        var qtdCart = e.items.length;
                                        $(".info-cart .qtd-cart").html(qtdCart);
                                    });
                                    
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

            if ($("body").hasClass("mx-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("mx-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("mx-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        descricaoCategoria: function() {
            if ($("body").hasClass("mx-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        nomeBannerCategoria: function() {
            if ($("body").hasClass("mx-home")) {
                $('.mx-destaques .categorias:not(.masculino) .box-banner a img, .mx-banners-colecoes .box-banner a img, .banner-departamentos .box-banner a img').each(function(){
                    var nomeCategoria = $(this).attr('alt');
                    $(this).parent().append(`<div class='mx-title-categoria'><h3>${nomeCategoria}</h3><a class="ver-todos">Descubra</a></div>`);
                });
                $('.mx-destaques .categorias.masculino .box-banner a img, .mx-banners-colecoes .box-banner a img, .banner-departamentos .box-banner a img').each(function(){
                    var nomeCategoria = $(this).attr('alt');
                    $(this).parent().append(`<div class='mx-title-categoria'><h3>${nomeCategoria}</h3><a class="ver-todos">${nomeCategoria}</a></div>`);
                });
            }
        },
               

        zoomProd: function() {
            $(window).load(function() {
                var janela = $(window).width();
                if ($("body").hasClass("mx-produto")) {

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
        newsletter: function () {
            $(".newsletter__form .envia-newsletter").click(function () {

                var varN = $('.newsletter__form input.nome').val();
                var varE = $('.newsletter__form input.email').val();
                var varC = $('.newsletter__form input#recebimento').val();

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
                    // datos.isNewsletterOptIn = varC;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/NP/documents',
                        success: function (data) {
                            console.log(data);
                            $(".newsletter__form").html("<p id='msgSucesso' style='color: #fff!important'>Cadastro realizado com sucesso!</p>");
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
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
                            $("#formFC").html("<p id='msgSucesso' style='color: #fff!important'>Cadastro realizado com sucesso!</p>");
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
                            $("#formFC").html("<p id='msgSucesso' style='color: #fff!important'>Cadastro realizado com sucesso!</p>");
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
                            $("#formFC").html("<p id='msgSucesso' style='color: #fff!important'>Cadastro realizado com sucesso!</p>");
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
                $(".prateleira li .mx-product").not(".mx-ajax-completed").each(function (index, el) {
                    var _element = $(this);
                    _element.addClass("mx-ajax-completed"), _element.find(".mx-hover-content").append('<div class="hidden-list-skus"></div><ul class="mx-color-list"></ul>');
                    var _product_id = _element.find(".mx-id").val();
                    var avSku;
                    vtexjs.catalog.getProductWithVariations(_product_id).done(function(product){
                        avSku = product.skus;
                        var metalName = product.dimensionsMap.Metal;
                        var Aro = product.dimensionsMap.Aro;
                        if (Aro !== undefined) {
                            _element.find('.mx-hover-content').prepend('<div class="button-abre-fecha tamanhoSel">Tamanho</div>');
                            for (var k = 0; k < Aro.length; k++) {
                                var _Aro = Aro[k];
                                if(_Aro !== undefined){
                                    _element.find(".mx-variations").prepend('<li class="prod-size ' + _Aro + '" data-tamanho="'+ _Aro +'">' + _Aro + "</li>");
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
                        if (metalName !== undefined) {
                            _element.find('.mx-color-list').before('<div class="button-abre-fecha metalCor">Cor do Metal</div>');
                            for (var i = 0; i < metalName.length; i++) {
                                var _metal_name = metalName[i];
                                if(_metal_name !== undefined){
                                    _element.find(".mx-color-list").prepend('<li class="' + _metal_name + '" data-color="'+ _metal_name +'">' + _metal_name + "</li>");
                                }
                            }
                        }
                    });
                    $(document).on("click", ".mx-variations li, .mx-color-list li", function () {
                        $(this).parent().find("li").removeClass("mx-active"),
                        $(this).addClass("mx-active");
                        _element.find('.mx-buy a').removeAttr('href');
                    });
                    _element.find(".mx-buy").hover(function(){
                        var selectorTamanho = $('.mx-variations li.mx-active').attr('data-tamanho');
                        var selectorCor = $('.mx-color-list li.mx-active').attr('data-color');
                        if (selectorTamanho !== undefined){
                            _element.parent().find(`.hidden-list-skus input[data-tamanho="${selectorTamanho}"][data-color="${selectorCor}"]`).addClass('selected');
                        }else{
                            _element.parent().find(`.hidden-list-skus input[data-color="${selectorCor}"]`).addClass('selected');
                        }
                    });
                    _element.find(".mx-buy").click(function(){
                        
                        var _sku = _element.parent().find('.selected');
                        if (_sku.attr('data-available') == "false"){
                            alert('Produto não disponível nesta combinação');
                            $('.hidden-list-skus input').removeClass('selected');
                            _element.parent().find("li").removeClass("mx-active");
                            $('.button-abre-fecha.tamanhoSel').html('Tamanho');
                            $('.button-abre-fecha.metalCor').html('Cor do Metal');
                        } else {
                            if (_sku.length) {
                                var item = { 
                                    id: _sku.attr("data-id"), 
                                    quantity: "1",
                                    seller: "1" 
                                };
                                console.log(item);
                                vtexjs.checkout.addToCart([item], null, 2).done(function (orderForm) {
                                        $(".header-minicart").addClass("open"),
                                        // setTimeout(function () {
                                        //     $(".header-minicart").removeClass("open");
                                        // }, 5e3);
                                        console.log(orderForm);
                                        
                                    });
                                    $('.hidden-list-skus input').removeClass('selected');
                                    _element.parent().find("li").removeClass("mx-active");
                                    $('.button-abre-fecha.tamanhoSel').html('Tamanho');
                                    $('.button-abre-fecha.metalCor').html('Cor do Metal');
                            } else { 
                                alert("Por favor, selecione tamanho e cor do metal");
                            }
                        }
                    });
                });
            }, 2000);
        },
        listaCorCarregamento: function(){
            $('.mx-product .mx-hover-content .button-abre-fecha.tamanhoSel').click(function() {
                $(this).toggleClass('tamanho-open');
                $(this).parent().find('.mx-variations').toggleClass('tamanho-open');
            });
            $('.mx-product .mx-hover-content .mx-variations .prod-size').click(function() {
                var text = $(this).text();
                $(this).parent().toggleClass('tamanho-open');
                $(this).parents().eq(2).find('.button-abre-fecha.tamanhoSel').html(`Tamanho: ${text}`);
            });
            $('.mx-product .mx-hover-content .button-abre-fecha.metalCor').click(function() {
                $(this).toggleClass('metal-open');
                $(this).parent().find('.mx-color-list').toggleClass('metal-open');
            })
            $('.mx-product .mx-hover-content .mx-color-list li').click(function() {
                var text = $(this).text();
                $(this).parent().toggleClass('metal-open');
                $(this).parents().eq(2).find('.button-abre-fecha.metalCor').html(`Metal: ${text}`);
            });
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
            if ($('body').hasClass('mx-produto')){
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
            $('.MX-produto__buy-button .shareWhats').append(`<a href="https://wa.me/?text=${shareUrl}" class="compartilharWp">Compartilhar via WhatsApp</a>`);
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
            $(".mx-departamento__topo .nomeDepartamento h2").text(nomeClone);
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
            if ($("body").hasClass("mx-produto")) {
                var video = $(".value-field.Videos").html();
                if (video !== undefined) {
                    $(".thumbs").append("<li class='video-thumb'><img src='/arquivos/mx-video-prod.jpg' alt='video'/></li>");
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
            if ($("body").hasClass("mx-departamento")) {
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

        reconfiguraFiltroHorizontal: function() {
            if ($('body').hasClass('mx-departamento')){
                var departmentLink = $('.search-single-navigator > h3 > a');
                var categoryLink = $('.search-single-navigator > h4 > a');
                var deptName = $('.search-single-navigator > h3').text();
                var deptCompareName = $('.search-single-navigator > h3').attr('class');
                if ($('.search-single-navigator > h4').length > 0){
                    var categCompareName = $('.search-single-navigator > h4').attr('class').replace('even','').replace(' ','');
                }
                if (deptCompareName == categCompareName){
                    $('.search-single-navigator').append(`
                        <div class="filtro-wrapper ${deptName}">
                            <h5>${departmentLink[0].outerHTML}</h5>
                            <div class="linksList">
                                <ul></ul>
                            </div>
                        </div>
                    `)
                    for(var i=0; i < categoryLink.length; i++){
                        var newCategoryLink = categoryLink[i].outerHTML;
                        $('.linksList > ul').append(`<li>${newCategoryLink}</li>`);
                    }
                }

                $('.search-single-navigator > h5').each(function(){
                    var filterName = $(this).text().replace(' ','-').replace(' ','-');
                    var newFilterName = filterName.replace('-',' ').replace('-',' ');
                    var listUl = $(this).next('ul');
                    $('.search-single-navigator').append(`
                        <div class="filtro-wrapper ${filterName}">
                            <h5></h5>
                            <div class="linksList"></div>
                        </div>
                    `)
                    $(`.filtro-wrapper.${filterName} h5`).html(newFilterName);
                    for (var i=0; i < listUl.length; i++){
                        var newListUl = listUl[i].outerHTML;
                        $(`.${filterName}`).append(newListUl);
                    }
                });

                $('.search-single-navigator > h3').remove();
                $('.search-single-navigator > h4').remove();
                $('.search-single-navigator > h5').remove();
                $('.search-single-navigator > ul').remove();

                $('.filtro-wrapper h5').click(function(){
                    $(this).parent().find('ul').slideToggle();
                    $(this).toggleClass('filtroOpen');
                });

                $('.pager.top').appendTo('.departamento aside');
                $('.resultadoDepartamento .main .sub:nth-of-type(1) .resultado-busca-filtro').appendTo('.departamento aside');
                $('.searchResultsTime:nth-of-type(1)').prependTo('.resultado-busca-filtro');
                $('.orderBy select option:nth-of-type(1)').text('Ordenar');
                if (scre >= 981) {
                    $('.departamento aside').append(`
                        <div class="displaySelector">
                            <div class="two-products">2</div>
                            <div class="three-products">3</div>
                            <div class="four-products selected">4</div>
                        </div>
                    `);
                }
                if (scre <= 980) {
                    $('.departamento aside').append(`
                        <div class="displaySelector">
                            <div class="one-products">1</div>
                            <div class="two-products selected">2</div>
                        </div>
                    `);
                }
                // if (scre <= 400) {
                //     $('.departamento aside').append(`
                //         <div class="displaySelector">
                //             <div class="one-products selected">1</div>
                //             <div class="two-products">2</div>
                //         </div>
                //     `);
                // }
                $('.displaySelector .one-products').click(function(){
                    $('.resultadoDepartamento .prateleira > ul > li').css('width','100%');
                    $(this).addClass('selected');
                    $('.displaySelector .two-products').removeClass('selected');
                    $('.displaySelector .three-products').removeClass('selected');
                    $('.displaySelector .four-products').removeClass('selected');
                });
                $('.displaySelector .two-products').click(function(){
                    $('.resultadoDepartamento .prateleira > ul > li').css('width','50%');
                    $(this).addClass('selected');
                    $('.displaySelector .one-products').removeClass('selected');
                    $('.displaySelector .three-products').removeClass('selected');
                    $('.displaySelector .four-products').removeClass('selected');
                });
                $('.displaySelector .three-products').click(function(){
                    $('.resultadoDepartamento .prateleira > ul > li').css('width','33.3333%');
                    $(this).addClass('selected');
                    $('.displaySelector .one-products').removeClass('selected');
                    $('.displaySelector .two-products').removeClass('selected');
                    $('.displaySelector .four-products').removeClass('selected');
                });
                $('.displaySelector .four-products').click(function(){
                    $('.resultadoDepartamento .prateleira > ul > li').css('width','25%');
                    $(this).addClass('selected');
                    $('.displaySelector .one-products').removeClass('selected');
                    $('.displaySelector .two-products').removeClass('selected');
                    $('.displaySelector .three-products').removeClass('selected');
                });
            }
        },
        setaTopo: function() {
            $('body').append('<a class="toTop">></a>');
            $('.toTop').click(function(){
                $("html, body").animate({scrollTop: 0});
            });
        },
        abreFechaFiltroMobile: function() {
            if(scre <= 980){
                $('.departamento aside').prepend('<div class="filtroMobOpen"><p>Filtrar por</p></div>');
                $('.filtrosDepartamento').prepend('<p class="filtroMobClose">X</p>');
                $('.filtroMobOpen').click(function(){
                    $('.filtrosDepartamento').css('left', '0%');
                });
                $('.filtroMobClose').click(function(){
                    $('.filtrosDepartamento').css('left', '-100%');
                });
            }
        },
        /* Newsletter Popup */
        newsletterPopUp: function() {
            $(".enviarFormNews").click(function() {
                function validateEmail(npEmail) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(npEmail);
                }

                var varN = $('#npNome').val();
                var varE = $('#npEmail').val();
                // var varR = $('#isNewsletterOptIn').val();

                function validate() {
                    var npEmail = $("#npEmail").val();

                    if (validateEmail(npEmail)) {
                        enviaDados();
                    } else {
                        $('#npEmail').css('border-bottom', '1px solid #eb4d4b');
                        $('#npEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
                    }

                    return false;
                }

                //$('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                //$('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('#npNome').css('border-bottom', '1px solid #eb4d4b');
                    $('#npNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                } else if (varE == '') {
                    $('#npEmail').css('border-bottom', '1px solid #eb4d4b');
                    $('#npEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    // datos.isNewsletterOptIn = varR;
                    $.ajax({
                        accept: 'application/vnd.vtex.ds.v10+json',
                        contentType: 'application/json; charset=utf-8',
                        crossDomain: true,
                        data: JSON.stringify(datos),
                        type: 'POST',
                        url: '/api/dataentities/NP/documents',
                        success: function success(data) {
                            //$(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                            $(".form-newspop .news-accept").css("visibility", "hidden");
                            $("#formNp").html("<p id='msgSucesso' style='color: #fff!important'>Cadastro realizado com sucesso!</p>");
                        },
                        error: function error(_error) {
                            console.log(_error);

                        }
                    });
                }
            });
        },
        pdpAjusteProductDescription: function() {
            var prodDesc = $('.productDescription');
            var prodDescTitle = $('.descricao-especificacao h2.titulo');
            $('h4.Informacoes-adicionais').before(prodDescTitle).before(prodDesc);
        },
        showPopupNewsletter: function() {
            function closeModal() {
                $(".mask").removeClass("active"); //Remove the active class
            }
            
            // Function to close the modal screen
            $(".elegant-modal .close, .mask").on("click", function() {
                closeModal();
            });
            
            // or the keyboard (esc)
            $(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    closeModal();
                }
            });
            
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }
            
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
            
            function eraseCookie(name) {
                document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            
            var retrieveCookie = getCookie('cookiePopUp');
            if (!retrieveCookie) {
                setTimeout(function() {
                    $(".mask").addClass("active");
                }, 5);
                $('.elegant-modal').addClass('active');
            } else {
                $('.elegant-modal').removeClass('active');
            }
            
            $('.elegant-modal .close').click(function() {
                setCookie('cookiePopUp', 'true', 1);
                $('.elegant-modal').removeClass('active');
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
                        codeMX.descPrat();
                    });
                }, 1000);
        },
        init: function() {
            //Geral            
            codeMX.stickyHeader();
            codeMX.stickyFiltro();
            codeMX.qtdCart();
            codeMX.verificaLogado();
            codeMX.BuscaHeader();
            codeMX.slidePrincipal();
            codeMX.slidePrincipalMobile();
            codeMX.TopBar();
            codeMX.carrosselInformativo();
            codeMX.carrosselDestaques();
            codeMX.carrosselColecoes();
            codeMX.bannersDepartamentos();
            codeMX.prateleiraPatua();
            codeMX.trataTituloPdp();
            codeMX.parcelamentoOpt();
            codeMX.guiaDeTamanhos();
            codeMX.compartilhaWp();
            codeMX.wishListTratamento();
            codeMX.videoOnThumbs();
            codeMX.abreFechaPDPInstit();
            codeMX.abreFechaDescription();
            codeMX.slidePrateleiraProdutos();
            codeMX.compreJuntoVazioTitulo();
            codeMX.comprarFlutuante();
            codeMX.nomeBannerCategoria();
            codeMX.descPrat();
            codeMX.newsletter();
            codeMX.footerMobile();
            codeMX.lojaManutencaoContato();
            codeMX.formRevendedora();
            codeMX.openMiniCart();
            codeMX.insereDivParaToggle();
            codeMX.userNameAccountMobile();
            codeMX.abreFechaBusca();
            codeMX.seletorVisualizacaoDeQtdProdutos();
            codeMX.recarregaPagina();
            codeMX.recarregaPercentual();
            codeMX.reconfiguraFiltroHorizontal();
            codeMX.abreFechaFiltroMobile();
            codeMX.showPopupNewsletter();
            codeMX.newsletterPopUp();
            codeMX.addProductToMinicartPDP();
            codeMX.pdpAjusteProductDescription();
            codeMX.setaTopo();
        },
        init_ajax: function(){
            codeMX.menuPrincipal();
            codeMX.variantesCompraRapida();
            setTimeout(function(){
                codeMX.listaCorCarregamento();
            },6000);
        }
    }
    codeMX.init_ajax();
    codeMX.init();

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