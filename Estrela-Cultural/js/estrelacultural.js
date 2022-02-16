
$(document).ready(function() {
    // GERAIS PARA USO NO RESTO DO ARQUIVO
    var scre = $("body").width();
    $(".helperComplement").remove();


    //  Cookie Management
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


    var codeEstrelaCultural = {

       
        sliderMenu: function(){
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

            }, 3000);
        },
        headerFixo: function(){
            $(window).scroll(function () {
                if( $(window).scrollTop() > $('.menu-fixed').offset().top + 200 && !($('.menu-fixed').hasClass('stickyheader'))){
                    $('.menu-fixed').addClass('stickyheader').animate({"top":"0%"}, 1000);
                } else if ($(window).scrollTop() == 0){
                    $('.menu-fixed').removeClass('stickyheader').css({"top":"-100%"});
                }
            });
        },

        faixaEtariaMobile: function() {
            if (scre < 980 && scre > 501){
                $('#faixa-etaria .faixa-lista').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    infinite: false,
                });
            }
            if (scre <= 500){
                $('#faixa-etaria .faixa-lista').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    infinite: false,
                });
            }
        },

        menuMobile: function() {
            if (scre <= 980){
                $('.menu-mobile-button').click(function(){
                    $('.header .menu-topo').toggleClass('menu-open');
                    $(this).toggleClass('button-change');
                });
            }
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
        BuscaHeader: function() {
            $(document).on("click", ".icon.busca", function() {
                $(".busca-topo__busca-container").toggleClass("busca-open");
            });
        },

        //Carrossel Topo
        prateleiraTopo: function() {
            $('.prateleira-produto_principal').slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                dots: true,
                arrows: false
            });
        },

        prateleiraGerais: function() {
            if (scre < 1920 && scre > 1401){
                $('.slide .prateleira > ul').slick({
                    infinite: true,
                    autoplay: false,
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    dots: false,
                    arrows: true
                });
            }
            if (scre < 1400 && scre > 1025) {
                $('.slide .prateleira > ul').slick({
                    infinite: true,
                    autoplay: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dots: false,
                    arrows: true
                });
            }
            if (scre < 1024 && scre > 767) {
                $('.slide .prateleira > ul').slick({
                    infinite: true,
                    autoplay: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false,
                    arrows: true
                });
            }
            if (scre <= 766) {
                $('.slide .prateleira > ul').slick({
                    infinite: true,
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true
                });
            }
        },
                
        //Banner de Banners departamento
        bannersDepartamentos: function() {
            if (scre < 980) {
                $('.banner-departamentos div').slick({
                    infinite: false,
                    centerMode: true,
                    centerPadding: '80px',
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    responsive: [{
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
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
        carrosselDepartamentos: function() {
             if(scre < 500){   
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
        carrosselInstagram: function() {
            if (scre < 500) {
                $('.insta_galeria ul').slick({
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        },

        selecionePorMobile: function(){
            if (scre < 500) {
                $('#selecione-por .container.mobile .container-filtro').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        },

        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function() {
            $('.slide-prod').each(function() {
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
            if ($("body").hasClass("planet-categoria") || $("body").hasClass("planet-departamento")) {
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

        sliderVaiGostar: function() {
            if ($("body").hasClass("resultado-busca")) {
                $('.Planet-prateleira ul').slick({
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

        slideDepoimentos: function() {
            if ($("body").hasClass("ec-home") && scre < 1920 && scre > 501) {
                $('#depoimentos .depoimentos .text-dps').slick({
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    speed: 0,
                    arrows: true,
                    cssEase: 'linear'
                });
            }
            if ($("body").hasClass("ec-home") && scre < 500) {
                $('#depoimentos .depoimentos .text-dps').slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 0,
                    arrows: true,
                    cssEase: 'linear'
                });
            }
        },

        thumbImg: function() {
            if ($("body").hasClass("planet-produto")) {
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
                $(".produto-all #produtoDiv-direita .planet-produto__buy-button .buy-button").click(function(event) {
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
            $(".valor-parcelado .titulo-parcelamento").text("Veja opÃ§Ãµes de parcelamento");
            $(".valor-parcelado .titulo-parcelamento").click(function() {
                $(".valor-parcelado .other-payment-method-ul").fadeToggle();
                $(this).toggleClass("aberto");
            });
        },

        breadCrumb: function() {
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

        descricaoCategoria: function() {
            if ($("body").hasClass("Planet-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        nomeBannerCategoria: function() {
            if ($("body").hasClass("planetgirls-home")) {
                $('.banner-categoria .box-banner a img').each(function(){
                    var nomeCategoria = $(this).attr('alt');
                    $(this).parent().prepend(`<div class='planet-title-categoria'><h3>${nomeCategoria}</h3></div>`);
                });
                $('.banner-departamentos .box-banner a img').each(function(){
                    var nomeHomeDepartamento = $(this).attr('alt');
                    $(this).parent().prepend(`<div class='planet-title-departamento'><h3>${nomeHomeDepartamento}</h3></div>`);
                });
            }
            if(scre < 500){
                $('.banner-categoria .container-center').slick({
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                });
            }
        },

        zoomProd: function() {
            $(window).load(function() {
                var janela = $(window).width();
                if ($("body").hasClass("planet-produto")) {

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
                    var campoEmail = $('.newsletter-footer .newsletter__direita .newsletter__form');
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
                                $(".newsletter-footer .newsletter__direita .newsletter__form").hide();
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
            var e = $(".carrinho"),	
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
        compraRapida: function () {
            setTimeout(function(){
                $(".prateleira li .ec-product").not(".ec-ajax-completed").each(function () {
                    var _element = $(this);
                    _element.addClass("ec-ajax-completed");
                    _element.find(".btn-comprar").click(function(){
                        var _sku = _element.parent().find('.ct').attr('data-sku');
                        var item = { 
                            id: _sku, 
                            quantity: "1",
                            seller: "1" 
                        };
                        vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                            $(".header-minicart").addClass("open"),
                            setTimeout(function () {
                                $(".header-minicart").removeClass("open");
                            }, 5e3);
                        });
                    }); 
                });
            }, 2000);
        },
        quizSettings: function(){
            
            setTimeout(function(){
                $('#quiz').quiz({
                counterFormat: 'QuestÃ£o %current de %total',
                resultsFormat: '%score /%total',
                nextButtonText: 'PrÃ³ximo',
                finishButtonText: 'Finalizar',
                restartButtonText: 'Reiniciar',
                questions: [
                    {
                    'q': 'Qual o nome verdadeiro da Lexa?',
                    'options': [
                        'Lexa Cristina Fonseca',
                        'LÃ©a Cristina Lexa AraÃºjo da Fonseca',
                        'Lexa AraÃºjo',
                        'LÃ©a AraÃºjo da Fonseca'
                    ],
                    'correctIndex': 1,
                    'correctResponse': 'Certa Resposta Migs. ComeÃ§ou bem',
                    'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                    },
                    {
                    'q': 'Qual a Ãºltima campanha da Lexa com a Planet Girls?',
                    'options': [
                        'Lexa coleÃ§Ã£o de inverno',
                        'Lexa coleÃ§Ã£o de verÃ£o',
                        'Lexa coleÃ§Ã£o de outono',
                        'Lexa coleÃ§Ã£o de primavera'
                    ],
                    'correctIndex': 0,
                    'correctResponse': 'Certa Resposta Migs. Continue assim!',
                    'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                    },
                    {
                    'q': 'Em que dia, mÃªs e ano Franciny Ehlke nasceu?',
                    'options': [
                        '20 de agosto de 2000',
                        '15 de maio de 1995',
                        '16 de abril de 1999',
                        '15 de marÃ§o de 1999'
                    ],
                    'correctIndex': 3,
                    'correctResponse': 'Certa Resposta Migs. Continue assim!',
                    'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                    },
                    {
                    'q': 'Qual o signo da Franciny Ehlke?',
                    'options': [
                        'LeÃ£o',
                        'Libra',
                        'Peixe',
                        'AquÃ¡rio'
                    ],
                    'correctIndex': 2,
                    'correctResponse': 'Certa Resposta Migs. Quase lÃ¡!',
                    'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                    },
                    {
                    'q': 'Quando a Franciny Ehlke comeÃ§ou o seu canal?',
                    'options': [
                        '2016',
                        '2014',
                        '2012',
                        '2018'
                    ],
                    'correctIndex': 0,
                    'correctResponse': 'Certa Resposta Migs. ParabÃ©ns!',
                    'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                    }
                ]
                });
                $('#quiz-results-screen').prepend('<p class="show-results">Clique e veja se ganhou</p>').append('<p class="fechar-game">Fechar</p>');
                $('.show-results').click(function(){
                    $('#quiz-results').html(`
                        <p class="message-show success">
                            ParabÃ©ns Migs! VocÃª ganhou um brinde<br/>
                            Utilize o cupom abaixo em qualquer valor de compra no site e resgate seu brinde. 
                            <span class="cupom-show">BRINDE123</span>
                        </p>
                    `);
                });
                // CONFIGURAÃ‡ÃƒO DO DISPARO DO MODAL COM COOKIE MANAGEMENT
                var retrieveCookie = getCookie('gameficationOff');
                if (!retrieveCookie) {
                    $('.lightbox').css('display','block');
                    $('html').addClass('no-scroll');
                }else{
                    $('.lightbox').css('display','none');
                    $('html').removeClass('no-scroll');
                }

                $('.close-button, .fechar-game').click(function(){
                    setCookie('gameficationOff','true', 1);
                    $('.lightbox').css('display','none');
                    $('html').removeClass('no-scroll');
                });
            }, 3000);
        },
        purpurinaQuiz: function(){
            var colour = "random", // or "#000000"
            sparkles = 50,
            x = 400,
            ox = 400,
            y = 300,
            oy = 300,
            swide = 800,
            shigh = 600,
            sleft = 0,
            sdown = 0,
            tiny = [],
            star = [],
            starv = [],
            starx = [],
            stary = [],
            tinyx = [],
            tinyy = [],
            tinyv = [];

            function sparkle() {
            var c;
            if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
                ox = x;
                oy = y;
                for (c = 0; c < sparkles; c++) if (!starv[c]) {
                    star[c].style.left = (starx[c] = x) + "px";
                    star[c].style.top = (stary[c] = y + 1) + "px";
                    star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                    star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour == "random") ? newColour() : colour;
                    star[c].style.visibility = "visible";
                    starv[c] = 50;
                    break;
                }
            }
            for (c = 0; c < sparkles; c++) {
                if (starv[c]) update_star(c);
                if (tinyv[c]) update_tiny(c);
            }
            setTimeout(sparkle, 40);
            }

            function update_star(i) {
            if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
            if (starv[i]) {
                stary[i] += 1 + Math.random() * 3;
                starx[i] += (i % 5 - 2) / 5;
                if (stary[i] < shigh + sdown) {
                    star[i].style.top = stary[i] + "px";
                    star[i].style.left = starx[i] + "px";
                } else {
                    star[i].style.visibility = "hidden";
                    starv[i] = 0;
                    return;
                }
            } else {
                tinyv[i] = 50;
                tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
                tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
                tiny[i].style.width = "2px";
                tiny[i].style.height = "2px";
                tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
                star[i].style.visibility = "hidden";
                tiny[i].style.visibility = "visible";
            }
            }

            function update_tiny(i) {
            if (--tinyv[i] == 25) {
                tiny[i].style.width = "1px";
                tiny[i].style.height = "1px";
            }
            if (tinyv[i]) {
                tinyy[i] += 1 + Math.random() * 3;
                tinyx[i] += (i % 5 - 2) / 5;
                if (tinyy[i] < shigh + sdown) {
                    tiny[i].style.top = tinyy[i] + "px";
                    tiny[i].style.left = tinyx[i] + "px";
                } else {
                    tiny[i].style.visibility = "hidden";
                    tinyv[i] = 0;
                    return;
                }
            } else tiny[i].style.visibility = "hidden";
            }

            function mouse(e) {
            if (e) {
                y = e.pageY;
                x = e.pageX;
            } else {
                set_scroll();
                y = event.y + sdown;
                x = event.x + sleft;
            }
            }

            function set_scroll() {
            if (typeof (self.pageYOffset) == 'number') {
                sdown = self.pageYOffset;
                sleft = self.pageXOffset;
            } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
                sdown = document.body.scrollTop;
                sleft = document.body.scrollLeft;
            } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
                sleft = document.documentElement.scrollLeft;
                sdown = document.documentElement.scrollTop;
            } else {
                sdown = 0;
                sleft = 0;
            }
            }

            function set_width() {
            var sw_min = 999999;
            var sh_min = 999999;
            if (document.documentElement && document.documentElement.clientWidth) {
                if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
                if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
            }
            if (typeof (self.innerWidth) == 'number' && self.innerWidth) {
                if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
                if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
            }
            if (document.body.clientWidth) {
                if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
                if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
            }
            if (sw_min == 999999 || sh_min == 999999) {
                sw_min = 800;
                sh_min = 600;
            }
            swide = sw_min;
            shigh = sh_min;
            }

            function createDiv(height, width) {
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.height = height + "px";
            div.style.width = width + "px";
            div.style.overflow = "hidden";
            return div;
            }

            function newColour() {
            var c = [];
            c[0] = 255;
            c[1] = Math.floor(Math.random() * 256);
            c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
            c.sort(function () {
                return (0.5 - Math.random());
            });
            return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
            }

            $(document).mousemove(mouse);
            $(window).resize(set_width);
            $(window).scroll(set_scroll);
            $(document).ready(function () {
            if (document.getElementById) {
                var i, rats, rlef, rdow;
                for (i = 0; i < sparkles; i++) {
                    rats = createDiv(3, 3);
                    rats.style.visibility = "hidden";
                    rats.style.zIndex = "99999999";
                    $(".lightbox").append(tiny[i] = rats);
                    starv[i] = 0;
                    tinyv[i] = 0;
                    rats = createDiv(5, 5);
                    rats.style.backgroundColor = "transparent";
                    rats.style.visibility = "hidden";
                    rats.style.zIndex = "99999999";
                    rlef = createDiv(1, 5);
                    rdow = createDiv(5, 1);
                    $(rats).append(rlef);
                    $(rats).append(rdow);
                    rlef.style.top = "2px";
                    rlef.style.left = "0px";
                    rdow.style.top = "0px";
                    rdow.style.left = "2px";
                    $(".lightbox").append(star[i] = rats);
                }
                set_width();
                sparkle();
            }
            });
        },
        orderCustom: function() {
            var e = $(".orderBy select").first();
            $(".contOrdenar li a").each(function() {
                var t = $(this).attr("data-href");
                $(this).click(function(a) {
                    a.preventDefault(), e.val(t), e.trigger("change")
                })
            }), jQuery(document).on("click", ".boxFiltroOrder > h3", function(e) {
                $(".boxFiltroOrder > ul.contOrdenar").slideToggle(), $(this).toggleClass("active")
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

        abreFechaFiltroMobile: function(){
            if (scre <= 980) {
                $('.pagDepartamento').append('<div class="abre-filtro">Filtrar</div>');
                $('.filtrosDepartamento').append('<div class="fecha-filtro">X</div>');
                $('.abre-filtro').click(function(){
                    $('.filtrosCategoria, .filtrosDepartamento').addClass('open-filtro');
                    $(this).hide();
                });
                $('.fecha-filtro').click(function(){
                    $('.filtrosCategoria, .filtrosDepartamento').removeClass('open-filtro');
                    $('.abre-filtro').show();
                });
            }
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

        alteraNomeDoFiltro: function() {
            $(".search-navigator-tab.tab-refinar").text("Filtros");
        },

        clonaNomeDaCategoria: function() {
            var nomeClone = $(".search-single-navigator h3:first-of-type a").text();
            $(".planet-departamento__topo .nomeDepartamento h2").text(nomeClone);
        },

        clonaSecionadorDeExibidos: function() {
            var url = window.location.href;
            var valuePagination = url.split('?PS=');
            if (valuePagination[1]) {
                var newValue = valuePagination[1].split('&');
                if (newValue) {
                    $('.order-main-container__numerador-clone').html(newValue[0]);
                }else{
                    $('.order-main-container__numerador-clone').html('20');
                }
            }else{
                $('.order-main-container__numerador-clone').html('20');
            }
        },

        clonaPaginadores: function() {
            var paginadorTop = $(".pager.top");
            $(".center-top").append(paginadorTop);
            var paginadorBottom = $(".pager.bottom");
            $(".center-bottom").append(paginadorBottom);
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
       
        sidebarDepartamento: function(){
            if ($("body").hasClass("planet-departamento")) {
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
        init: function() {
            //Geral            
            codeEstrelaCultural.prateleiraTopo();
            codeEstrelaCultural.sliderMenu();
            //codeEstrelaCultural.headerFixo();
            codeEstrelaCultural.qtdCart();
            codeEstrelaCultural.verificaLogado();
            codeEstrelaCultural.BuscaHeader();
            codeEstrelaCultural.prateleiraGerais();
            codeEstrelaCultural.carrosselDepartamentos();
            codeEstrelaCultural.carrosselInstagram();
            codeEstrelaCultural.slideDepoimentos();
            codeEstrelaCultural.aplicaNomeCategoria();
            codeEstrelaCultural.nomeBannerCategoria();
            codeEstrelaCultural.descPrat();
            codeEstrelaCultural.fixFrete();
            codeEstrelaCultural.breadCrumb();
            codeEstrelaCultural.thumbImg();
            codeEstrelaCultural.qtdProd();
            //codeEstrelaCultural.parcProd();  
            codeEstrelaCultural.descricaoCategoria();
            codeEstrelaCultural.zoomProd();
            codeEstrelaCultural.slidePrateleiraBusca();
            codeEstrelaCultural.filtroMobile();
            codeEstrelaCultural.newsletter();
            codeEstrelaCultural.institucional();
            codeEstrelaCultural.footerMobile();
            codeEstrelaCultural.faleConosco();
            codeEstrelaCultural.lojaManutencaoContato();
            codeEstrelaCultural.formRevendedora();
            codeEstrelaCultural.openMiniCart();
            codeEstrelaCultural.orderCustom();
            // codeEstrelaCultural.quizSettings();
            // codeEstrelaCultural.purpurinaQuiz();
            // codeEstrelaCultural.adicionarAoCarrinhoCompraRapida();
            //Departamento
            codeEstrelaCultural.escondeFiltrosNoDesktop();
            // codeEstrelaCultural.insereDivParaToggle();
            //codeEstrelaCultural.toggleDosFiltros(); ---> funciona sem
            codeEstrelaCultural.alteraNomeDoFiltro();
            codeEstrelaCultural.abreFechaFiltroMobile();
            //codeEstrelaCultural.clonaNomeDaCategoria();
            //Paginacao
            codeEstrelaCultural.clonaSecionadorDeExibidos();
            codeEstrelaCultural.clonaPaginadores();
            codeEstrelaCultural.trocaNumeroDeResultados();
            //codeEstrelaCultural.filtroCategoria();
            codeEstrelaCultural.faixaEtariaMobile();
            codeEstrelaCultural.sidebarDepartamento();
            codeEstrelaCultural.seletorVisualizacaoDeQtdProdutos();
            codeEstrelaCultural.recarregaPagina();
            codeEstrelaCultural.menuMobile();
            codeEstrelaCultural.selecionePorMobile();
        },
        init_ajax: function(){
            codeEstrelaCultural.compraRapida();
        }
    }
    codeEstrelaCultural.init_ajax();
    codeEstrelaCultural.init();

});