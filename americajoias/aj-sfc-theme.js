$(document).ready(function() {
    var scre = $("body").width();
    $(".helperComplement").remove();

    var americaJoias = {

        menuPrincipal: function () {
            $.ajax({ async: !0, crossDomain: !0, url: "/api/catalog_system/pub/category/tree/3/", method: "GET" })
                .done(function (e) {
                    if ($(window).width() > 980){
                        $(".header-principal__menu .item-menu-departamentos").append("<div class='todos-deptos-main'></div>");
                    }else{
                        $(".menu-mobile .item-menu-departamentos").append("<div class='todos-deptos-main'></div>");
                        $(".item-menu-departamentos a[href='/departamento']").removeAttr('href');
                    }
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
                    );
                    $('.todos-deptos-main .cat5572 ul.box-subMenu div.container-center').prependTo('.todos-deptos-main');
                    // REMOVER QUANDO VTEX CORRIGIR O BUG DO LINK.
                    // $(".itemMenu a[href='https://www.americaJoias.net/maletas-e-necessaires']").removeAttr('href');
                    // Append nas Imagens de Menu
                    $('.cat6016').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right acessorios' src='/arquivos/acessorios-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .acessorios').remove();
                    });
                    $('.cat6026').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right barba' src='/arquivos/barba-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .barba').remove();
                    });
                    $('.cat6038').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right boca' src='/arquivos/boca-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .boca').remove();
                    });
                    $('.cat6045').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right cabelos' src='/arquivos/cabelo-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .cabelos').remove();
                    });
                    $('.cat6060').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right corpo' src='/arquivos/corpo-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .corpo').remove();
                    });
                    $('.cat6061').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right maleta' src='/arquivos/maleta-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .maleta').remove();
                    });
                    $('.cat6068').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right olhos' src='/arquivos/olhos-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .olhos').remove();
                    });
                    $('.cat6090').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right pele' src='/arquivos/pele-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .pele').remove();
                    });
                    $('.cat6109').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right skincare' src='/arquivos/skincare-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .skincare').remove();
                    });
                    $('.cat6128').on('mouseenter', function(){
                        $('.todos-deptos-main').append("<img class='img-menu-right unhas' src='/arquivos/unhas-img-menu.jpg' />")
                    }).on('mouseleave', function(){
                        $('header .unhas').remove();
                    });
                });
        },
 

        menuMobile: function() {
            if (scre < 980) {
                $('.btn-menu-mobile').click(function(){
                    $('nav.menu-mobile').show().animate({left: "0%"}, 500);
                });
                $('.button-close').click(function(){
                    $('nav.menu-mobile').animate({left: "-100%"}, 500);
                });
                function removeAttr(){
                    $('.menu-mobile .item-menu-departamentos > a').click(function(){
                        $('.item-menu-departamentos .todos-deptos-main ').slideToggle();
                    });
                    
                    $('.itemMenu').click(function(){
                        $(this).find('ul.box-subMenu').slideToggle();
                    });
                    $('.itemMenu > a').removeAttr('href');
                }
                setTimeout(removeAttr, 1000);
            }

        },

        filtroMobile: function() {
            if (scre < 980) {
                $('.aj-categoria').append("<div class='open-filtro'>Filtrar</div>");
                $('.filtrosDepartamento').append("<div class='close-filtro'>X</div>");
                $('.open-filtro').click(function(){
                    $('.filtrosDepartamento').show().animate({left: "0%"}, 500);
                });
                $('.close-filtro').click(function(){
                    $('.filtrosDepartamento').animate({left: "-100%"}, 500);
                });
            }
        },

        qtdCart: function() {
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                var carItems = orderForm.items.length;
                $('.mini-cart .mini-cart-qty-admake').text(carItems);
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
                        (e = e.replace(/ /g, "").replace("Olá", "").replace(".", " ")), $("p.welcome").html("Olá " + e);
                        $('.welcome').prependTo($('.box-welcome'),
                        $('.welcome').addClass('logado'));
                    }

                    $('body').on('click',function(e){
                        if(document.getElementsByClassName('.account-topo__account-icon')[0]?!document.getElementsByClassName('.account-topo__account-icon')[0].contains(e.target):0)
                            $('.box-welcome').removeClass('ativo');
                    });
                    $(".account-topo__account-icon").click(function(){
                        $('.box-welcome, .welcome').toggleClass('ativo');
                    });
                   
                });
            });       
        },

        /* Busca Header */
        BuscaHeader: function() {
            $(document).on("click", ".busca-topo__busca-icon", function() {
                $(".busca-topo__busca-container").toggleClass("busca-open");
                //$(".header-principal__container-hide").removeClass("carrinho-show");
                //$(".header-principal__login-hide").removeClass("login-show");
            });
        },

        btnComprarProduto: function() {
            $(".aj-shelf li").each(function() {
                var linkProd = $(this).find(".lead a").attr("href");
                $(this).find(".data .add a").attr("href", linkProd);
            });
        },

        slidePrincipal: function() {
            if ($("body").hasClass("aj-home")) {
                $('.slide-principal').slick({
                    dots: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000
                });

            }
        },

        slidePrincipalMobile: function() {
            if ($("body").hasClass("aj-home")) {
                $('.slide-mobile').slick({
                    dots: false,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000
                });

            }
        },

        //Informativo
        carrosselInformativo: function() {
            if (scre < 1025) {
                $('.informativos ul').slick({
                    infinite: true,
                    autoplay: true,
                    // centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    responsive: [{
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 1,
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

        prateleiraFixa: function() {
            $('.prateleira-fixa ul').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                dots: false,
                responsive: [{
                        breakpoint: 780,
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
        },

        bannerCategorias: function() {
            if (scre < 770) {
                $('.banner-compre .container-center').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
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
            // $('.banner-compre .container-center').slick({
            //     slidesToShow: 5,
            //     slidesToScroll: 1,
            //     dots: false,
            //     autoplay: true
            // });
        },

        //Prateleiras Gerais
        prateleirasGerais: function() {
            if ($("body").hasClass("aj-home") || $("body").hasClass("aj-produto")) {
                $('.prateleira-01 ul').slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 980,
                            settings: {
                                centerMode: false,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: false
                            }
                        },
                        {
                            breakpoint: 769,
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
                                slidesToScroll: 2,
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

        slidePrateleiraMais: function() {
            if ($("body").hasClass("aj-home")) {
                $('.slide-prod .prat-right .aj-shelf > ul').slick({
                    infinite: true,
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1370,
                            settings: {
                                slidesToShow: 5,
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
     
        slidePrateleiraProdutos: function() {
            if ($("body").hasClass("aj-produto")) {
                $('.slide-prod .aj-shelf > ul').slick({
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
        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function() {
            $('.slide-prod').each(function() {
                var slide = $(this).find('.aj-shelf').length;
                if (slide > 0) {
                    $(this).find('.aj-shelf > ul').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
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
                                    centerPadding: '60px',
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    infinite: true
                                }
                            }
                        ]
                    });
                } else {
                    $(this).hide();
                }
            });
        },

        //Mais produtos
        maisProds: function() {
            if ($('body').hasClass('pg-scroll')) {
                // $('.btnMoreRes').after('<div class="loadProd">VER MAIS</div>');
                var contTempo = 1;
                var tempo = 1000;

                $(".aj-shelf[id*=ResultItems]").QD_infinityScroll({

                    callback: function() {
                        $('.helperComplement').remove();
                        $('.aj-shelf[id*=ResultItems] meta[name=ROBOTS]').remove();

                        var maisProdutos = $('.aj-shelf[id*=ResultItems] .aj-shelf').contents('li');
                        //Adiciona os produtos(li) para primeira ul 
                        $('.aj-shelf[id*=ResultItems] > .aj-shelf ul').first().append(maisProdutos);


                        $('#collections .aj-shelf li').before(function() {
                            var precoDe = $('.flagPreco', this).text();
                            var precoDe2 = parseInt(precoDe).toFixed(0);
                            $('.flagPreco', this).after('<div class="etiquetaValorDesconto">-' + precoDe2 + '%</div>');
                            $('.flagPreco', this).remove();
                        });

                        if ($(".btnMoreRes").hasClass('noResults')) {
                            $(".btnMoreRes").removeClass('noResults').text('Mais produtos');
                            $(".btnMoreRes").css('opacity', '1');
                        } else {
                            $(".btnMoreRes").css('opacity', '1');
                        }
                        //corrigeAlturadoNomedoProduto();
                    },

                    paginate: function(moreResults) {
                        $(".btnMoreRes").click(function() {
                            moreResults();
                            $(".btnMoreRes").css('opacity', '0');
                        });
                    }
                });

                $(window).on("QuatroDigital.is_noMoreResultsScroll", function() {
                    $(".btnMoreRes").css('opacity', '0');
                });

                $(window).on("QuatroDigital.is_noMoreResults", function() {
                    window.setTimeout(function() { $(".btnMoreRes").css('opacity', '1') }, 100);
                    $(".btnMoreRes").addClass('noResults').text("NÃ£o existem mais resultados :(");
                });
            }
        },

        // Nome Departamento Categoria
        aplicaNomeCategoria: function() {
            if ($("body").hasClass("aj-categoria") || $("body").hasClass("aj-departamento")) {
                //Termo buscado
                var categoria = vtxctx.categoryName;
                $(".nomeDepartamento h1").prepend(categoria);
                $(".descricao-categoria .titulo-descricao h3").prepend(categoria);
            }

        },

        // bannerHoverAlt: function () {
        //     var imageTitle = $('.imageTitle .box-banner');
        //     imageTitle.each(function () {
        //         var titleAlt = $(this).find('img').attr('alt');
        //         $(this).find("a").append('<div class="ev-alt-title">' + titleAlt + '</div>')
        //     });
        //     $(".imageTitle .box-banner").prepend("<div class='overlay'></div>");
        // },

        descPrat: function() {
            $(".priceLabel").each(function() {
                var valor = $(this).html();
                valor = valor.replace(" %", "");
                valor = valor.replace(",", ".");
                valor = valor.replace("<br>", "");
                valor = valor.replace("OFF", "");
                valor = valor.replace("%", "");
                valor = Number(valor);
                valor = Math.ceil(valor);

                $(this).html(valor + "%  OFF");

            });

        },

        calculaFrete: function() {

            function formatReal(int) {
                var tmp = int + '';
                tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
                if (tmp.length > 6)
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                return tmp;
            }

            $('#formFrete').submit(function(e) {
                e.prrwtentDefault()
                let idProd = $('#___rc-p-id').attr('value') //Id do produto
                let country = 'BRA'
                let postalCode = $(this).find('.cep').val().replace('-', '')
                let objER = new RegExp(/^[0-9]{8}$/)
                let items = [{
                    id: idProd,
                    quantity: 1,
                    seller: '1'
                }]
                if (!objER.test(postalCode)) {
                    $('.calc-frete .erro-cep').fadeIn()
                    $('.calc-frete .listaFrete').fadeOut()
                } else {
                    $('.calc-frete .erro-cep').fadeOut()
                    vtexjs.checkout.simulateShipping(items, postalCode, country).done(function(result) {
                        $('.calc-frete .listaFrete').fadeIn()
                            //console.log(result)
                        $('.listaFrete tbody .item-frete').remove()
                        $(result.logisticsInfo[0].slas).each(function(i) {
                            let servico = result.logisticsInfo[0].slas[i].name
                            let prazo = result.logisticsInfo[0].slas[i].shippingEstimate.replace('bd', ' dia(s)')
                            let preco = formatReal(result.logisticsInfo[0].slas[i].price)
                            $('.listaFrete tbody').append('<tr class="item-frete">' +
                                '<td>' + servico + '</td>' +
                                '<td>' + prazo + '</td>' +
                                '<td> R$' + preco + '</td>' +
                                '</tr>')

                        })
                    })
                }
                
            });
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
                $('.aj-shelf ul').slick({
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
            if ($("body").hasClass("aj-home")) {
                $('.ofertas01 .aj-shelf ul').slick({
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

        thumbImg: function() {
            if ($("body").hasClass("aj-produto")) {
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

                if (scre > 1025) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 5,
                        slidesToScroll: 1
                    });
                } else if (scre < 1025 && scre > 500) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        vertical: false
                    });
                } else if (scre < 500) {
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
                $(".produto-all #produtoDiv-direita .rwt-produto__buy-button .buy-button").click(function(event) {
                    //event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();

                    if (qtd == "") {
                        qtd = "1";
                    }

                    if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                        // alert('Por favor, selecione o modelo desejado.');
                        Swal.fire({
                            icon: 'error',
                            title: 'Por favor, selecione a cor',
                            toast: 'true',
                            position: 'top-end',
                            showConfirmButton: 'false',
                            showCloseButton: 'true',
                            timerProgressBar: 'true',
                            timer: '4000'
                        })
                    } else {

                        var res = hrefCart.replace("qty=1", "qty=" + qtd);
                        console.log(res);
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
                                    Swal.fire({ 
                                        toast: "true", 
                                        position:"top-end", 
                                        icon: "success", 
                                        timerProgressBar:"true", 
                                        showCloseButton: "true", 
                                        showConfirmButton: false,
                                        title: "Produto adicionado ao carrinho", 
                                        timer: "2000"});
                                    vtexjs.checkout.getOrderForm().done(function(e) {
                                        var qtdCart = e.items.length;
                                        $(".mini-cart .mini-cart-qty-admake").html(qtdCart);
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

            if ($("body").hasClass("aj-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("aj-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("aj-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        bannerProduto: function() {
            if ($("body").hasClass("aj-produto")) {
                var imgProd = $("#produtoDiv-direita .prod-especificacao #caracteristicas td.imagemProd").text();
                // alert(imgProd);
                if (imgProd == "") {
                    $(".bannerProduto").hide();
                } else {
                    var caminhoImg = "/arquivos/" + imgProd;
                    $(".bannerProduto-01").css("background", "url('" + caminhoImg + "') center center no-repeat");
                }
            }
        },

        descricaoCategoria: function() {
            if ($("body").hasClass("rwt-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        zoomProd: function() {
            $(window).load(function() {
                var janela = $(window).width();
                if ($("body").hasClass("aj-produto")) {

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

        compreJunto: function() {
            if ($("body").hasClass("aj-produto")) {

                // Clique botao Comprar Junto
                setTimeout(function() {
                    $('.btn-batch-buy').off('click').click(function(rwtent) {
                        rwtent.prrwtentDefault();
                        var hrefCart = $('.info-prod .comprar-prod .bt-comprar a').attr("href");
                        var qtd = 1;
                        var res = hrefCart.replace(/qty=1/, "qty=" + qtd);
                        var idSkuCJ = $('.slideCompreJunto .slick-active .buy-product-checkbox').attr('rel');
                        alert(idSkuCJ);

                        // //var resUTL = res.substring(res.lastIndexOf("sku=")+1,res.lastIndexOf("&qty="));
                        var resUTL = res.split("sku=").pop().split("&qty=").shift();
                        alert(resUTL);

                        setTimeout(function() {
                            vtexjs.checkout.getOrderForm().then(function() {
                                item = {
                                    id: resUTL,
                                    quantity: 1,
                                    seller: 1
                                };
                                itemDois = {
                                    id: idSkuCJ,
                                    quantity: 1,
                                    seller: 1
                                };
                                vtexjs.checkout.addToCart([item, itemDois]).done(function(orderForm) {
                                    alert('foi');
                                });
                            })
                        });
                    });
                }, 1500);

                function currencyFormatted(value, str_cifrao) {
                    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
                }

                Number.prototype.formatMoney = function(c, d, t) {
                    var n = this,
                        c = isNaN(c = Math.abs(c)) ? 2 : c,
                        d = d == undefined ? "." : d,
                        t = t == undefined ? "," : t,
                        s = n < 0 ? "-" : "",
                        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                        j = (j = i.length) > 3 ? j % 3 : 0;
                    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                };

                $('.slideCompreJunto .aj-shelf>ul').on('setPosition', function(rwtent, slick, direction) {
                    var precoCJ = $('.slideCompreJunto .slick-initialized .slick-slide.slick-active .prodData .price .bestPrice').text();
                    precoCJ = precoCJ.trim();
                    precoCJ = precoCJ.replace('R$ ', '');
                    precoCJ = precoCJ.replace(',', '.');
                    var preco = $('.prodFixo .skuBestPrice').text();
                    preco = preco.trim();
                    preco = preco.replace('R$ ', '');
                    preco = preco.replace(',', '.');
                    precoFinal = parseFloat(preco) + parseFloat(precoCJ);
                    precoFinal = currencyFormatted(precoFinal, 'R$');
                    //console.log(precoFinal);
                    $('.selected-value').text(precoFinal);

                });



                var prodCompreJunto = $('.prodCompreJunt .aj-shelf >ul');
                var boxCompre = $('.prodCompreJunt');

                if (prodCompreJunto.length > 0) {
                    boxCompre.css('display', 'block');
                } else {
                    boxCompre.css('display', 'none');
                };

                // Slide compre junto
                $('#image img').clone().prependTo('.prodFixo').wrapAll('<div class="imgCompre"></div>'); //Clone imagem
                $('.productPrice').clone().appendTo('.prodFixo'); //Clona preco

                $('.prodFixo').after('<div class="juntoAction"><p><img src="/arquivos/plus-bup.png" /></p></div>');
                $('.slideCompreJunto .aj-shelf>ul').after('<div class="juntoAction"><p><img src="/arquivos/equal-bup.png" /></p></div>');

                // Pega field que seleciona cada produto e colocar dentro da LI prodData
                var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

                prodCheck.each(function() {
                    var idCheck = $(this);

                    $('.slideCompreJunto .aj-shelf .data').each(function() {
                        if ($(this).attr('data-id') == idCheck.attr('rel')) {
                            idCheck.prependTo($(this));
                        }
                    });
                });

                $('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

                $('.slideCompreJunto .aj-shelf>ul').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false
                });

            }
        },

        //Newsletter                   
        newsletter: function() {

            $(".ft-line-1 .btn-send").click(function() {
                function validateEmail(fcEmail) {
                  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(fcEmail);
                }
        
                var varN = $(".ft-line-1 #txtname").val();
                var varE = $(".ft-line-1 #txtemail").val();
        
                function validate() {
                  var fcEmail = $(".ft-line-1 #txtemail").val();
                  if (validateEmail(fcEmail)) {
                    enviaDados();
                  } else {
                    $(".ft-line-1 #txtemail").css("border-bottom","1px solid #e74c3c");
                    $(".ft-line-1 #send-news").append("<p class='error'>Preencha um e-mail válido</p>");
                  }
                  return false;
                }
        
                $(".ft-line-1 .btn-send").css("border", "1px solid #d5d5d5");
                
        
                if (varN == "") {
                  $(".ft-line-1 #txtname").css("border-bottom", "1px solid #e74c3c");
                  $(".ft-line-1 #send-news").append("<p class='error'>Preencha o campo destacado</p>");
                  setTimeout(function(){
                      $(".ft-line-1 #txtname").css("border-bottom", "1px solid #cdcdcd");
                      $(".ft-line-1 .error").remove();
                  }, 5000);
                } else if (varE == "") {
                  $(".ft-line-1 #txtemail").css("border-bottom", "1px solid #e74c3c");
                  $(".ft-line-1 #send-news").append("<p class='error'>Preencha o campo destacado</p>");
                  setTimeout(function(){
                      $(".ft-line-1 #txtname").css("border-bottom", "1px solid #cdcdcd");
                      $(".ft-line-1 .error").remove();
                  }, 5000);
                } else if (varE != "") {
                  validate();
                }
        
                function enviaDados() {
                  var datos = {};
                  datos.nome = varN;
                  datos.email = varE;
                  $.ajax({
                    accept: "application/vnd.vtex.ds.v10+json",
                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    data: JSON.stringify(datos),
                    type: "POST",
                    url: "/api/dataentities/NL/documents",
                    success: function(data) {
                      $(".ft-line-1 #send-news").html(
                        "<p id='msgSucesso'>Pronto. Em breve você receberá novidades =)</p>"
                      );
                    },
                    error: function(error) {
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
                $(".footer-01 .footer-01-02 h3, .footer-01 .footer-01-03 h3, .footer-01 .footer-01-04 h3, .footer-01 .footer-01-05 h3, .footer-01 .footer-01-06 h3").click(function() {
                    $(this).next("ul").slideToggle();
                    $(this).toggleClass("aberto");
                });

                $(".footer-01 .footer-01-01 h3").click(function() {
                    $(this).parent().find("p").slideToggle();
                    $(this).toggleClass("aberto");
                });
            }
        },

        placeholderFrete: function() {
            $(window).load(function() {
                $(".calc-frete .cep fieldset .prefixo .fitext").attr("placeholder", "Informe seu CEP:");
            });
        },

        ocultaFrete: function() {
            if ($('.sku-notifyme').attr('style')) {

            } else {
                $('.calc-frete').hide();
            }
        },
        
        slideMarcas: function() {
            if ($("body").hasClass("aj-home")) {
                $('.banner-marca .container-center').slick({
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1290,
                            settings: {
                                slidesToShow: 5,
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
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true
                            }
                        }
                    ]
                });
            }
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
        openMiniCart: function () {	
            var e = $(".btn-mini-cart"),	
                t = $(".header-minicart, .minicart__overlay");	
            $(window).width() < 420	
                ? e.on("click", function () {	
                      location.href = "/checkout";	
                  })	
                : e.on("click", function () {	
                      $(this).addClass("open"), t.addClass("open");	
                  }),	
                $(".header-minicart-close").click(function () {	
                    e.removeClass("open"), t.removeClass("open");	
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
        addProductToMinicart: function () {
            var _button = $('.buy-button');
          
            _button.click(function (ev) {
              var _buttonLink = _button.attr('href');
              if (_buttonLink.indexOf('javascript:alert') == -1) {
                ev.preventDefault();
                var _sku = $('.buy-button').attr('href').split('sku=')[1].split('&')[0];
                var _sellerId = $('.buy-button').attr('href').split('seller=')[1].split('&')[0];
                var _salesChannel2 = $('.buy-button').attr('href').split('sc=')[1];
          
                var product = {
                  id: _sku,
                  quantity: 1,
                  seller: _sellerId
                };
              }
            });
        },
        instaFeed: function(){
            var e, i, t;
            (e = jQuery),
                (i = {
                    host: "https://www.instagram.com/",
                    username: "americajoias",
                    container: "#instafeed",
                    display_profile: !0,
                    display_biography: !0,
                    display_gallery: !0,
                    display_igtv: !1,
                    get_raw_json: !1,
                    callback: null,
                    styling: !0,
                    items: 8,
                    items_per_row: 4,
                    margin: 0.5,
                    image_size: 640,
                }),
                (e.instagramFeed = function (t) {
                    "" != (t = e.fn.extend({}, i, t)).username
                        ? t.get_raw_json || "" != t.container
                            ? t.get_raw_json && null == t.callback
                                ? console.error("Instagram Feed: Error, no callback defined to get the raw json")
                                : e.ajax(t.host + t.username, function (i) {
                                      if (((i = (i = (i = (i = i.split("window._sharedData = "))[1].split("</script>"))[0]).substr(0, i.length - 1)), (i = (i = JSON.parse(i)).entry_data.ProfilePage[0].graphql.user), t.get_raw_json))
                                          t.callback(
                                              JSON.stringify({
                                                  id: i.id,
                                                  username: i.username,
                                                  full_name: i.full_name,
                                                  is_private: i.is_private,
                                                  is_verified: i.is_verified,
                                                  biography: i.biography,
                                                  followed_by: i.edge_followed_by.count,
                                                  following: i.edge_follow.count,
                                                  images: i.edge_owner_to_timeline_media.edges,
                                                  igtv: i.edge_felix_video_timeline.edges,
                                              })
                                          );
                                      else {
                                          var o = { profile_container: "", profile_image: "", profile_name: "", profile_biography: "", gallery_image: "" };
                                          if (t.styling) {
                                              (o.profile_container = " style='text-align:center;'"),
                                                  (o.profile_image = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'"),
                                                  (o.profile_name = " style='font-size:1.2em;'"),
                                                  (o.profile_biography = " style='font-size:1em;'");
                                              var s = (100 - 2 * t.margin * t.items_per_row) / t.items_per_row;
                                              o.gallery_image = " style='margin:" + t.margin + "% " + t.margin + "%;width:" + s + "%;float:left;'";
                                          }
                                          var a = "";
                                          t.display_profile &&
                                              ((a += "<div class='instagram_profile'" + o.profile_container + ">"),
                                              (a += "\t<img class='instagram_profile_image' src='" + i.profile_pic_url + "' alt='" + t.username + " profile pic'" + o.profile_image + " />"),
                                              (a += "\t<p class='instagram_username'" + o.profile_name + ">@" + i.full_name + " (<a href='https://www.instagram.com/" + t.username + "'>@" + t.username + "</a>)</p>")),
                                              t.display_biography && (a += "\t<p class='instagram_biography'" + o.profile_biography + ">" + i.biography + "</p>"),
                                              t.display_profile && (a += "</div>");
                                          var n = 4;
                                          if (640 !== t.image_size)
                                              switch (t.image_size) {
                                                  case 150:
                                                      n = 0;
                                                      break;
                                                  case 240:
                                                      n = 1;
                                                      break;
                                                  case 320:
                                                      n = 2;
                                                      break;
                                                  case 480:
                                                      n = 3;
                                                      break;
                                                  default:
                                                      console.warn("Wrong image size. Getting default value. Accepted values are [150, 240, 320, 480, 640]");
                                              }
                                          if (t.display_gallery)
                                              if (i.is_private) a += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                                              else {
                                                  var r = i.edge_owner_to_timeline_media.edges;
                                                  (h = r.length > t.items ? t.items : r.length), (a += "<div class='instagram_gallery'>");
                                                  for (var l = 0; l < h; l++) {
                                                      var d = "https://www.instagram.com/p/" + r[l].node.shortcode,
                                                          c = r[l].node.thumbnail_resources[n].src,
                                                          p = "image";
                                                      switch (r[l].node.__typename) {
                                                          case "GraphSidecar":
                                                              p = "sidecar";
                                                              break;
                                                          case "GraphVideo":
                                                              (p = "video"), (c = r[l].node.thumbnail_src);
                                                              break;
                                                          default:
                                                              p = "image";
                                                      }
                                                      (a += "<a href='" + d + "' class='instagram-" + p + "' rel='noopener' target='_blank'>"),
                                                          (a += "   <img src='" + c + "' alt='" + t.username + " instagram image " + l + "'" + o.gallery_image + " />"),
                                                          (a += "</a>");
                                                  }
                                                  a += "</div>";
                                              }
                                          if (t.display_igtv)
                                              if (i.is_private) a += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                                              else {
                                                  var u = i.edge_felix_video_timeline.edges,
                                                      h = u.length > t.items ? t.items : u.length;
                                                  for (a += "<div class='instagram_igtv'>", l = 0; l < h; l++)
                                                      (a += "<a href='" + (d = "https://www.instagram.com/p/" + u[l].node.shortcode) + "' rel='noopener' target='_blank'>"),
                                                          (a += "\t<img src='" + u[l].node.thumbnail_src + "' alt='" + t.username + " instagram image " + l + "'" + o.gallery_image + " />"),
                                                          (a += "</a>");
                                                  a += "</div>";
                                              }
                                          e(t.container).html(a);
                                      }
                                  })
                            : console.error("Instagram Feed: Error, no container found.")
                        : console.error("Instagram Feed: Error, no username found.");
                }),
                (t = jQuery)(window).on("load", function () {
                    t.instagramFeed({
                        username: "americajoias",
                        container: "#instafeed",
                        display_profile: !0,
                        display_biography: !0,
                        display_gallery: !0,
                        get_raw_json: !1,
                        callback: null,
                        styling: !0,
                        items: 6,
                        // items_per_row: 6,
                        margin: 1,
                    });
                })
        },
        verificaValorFreteGratis: function(){
            return setTimeout((function() {
                var subTotal = vtexjs.checkout.orderForm.totalizers;
                var newSubTotal = subTotal[0].value;      
                    if (newSubTotal < 30000) {
                        function numberWithCommas(x) {
                            return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
                        }
                        var hundredPercent = 30000;
                        var totalPercent = Math.floor((newSubTotal / hundredPercent) * 100);
                        var sum = hundredPercent - newSubTotal;
                        var newSum = numberWithCommas(sum);
                        $('.free-shipping-bar').text(`Faltam R$${newSum} para você ganhar Frete Grátis`);
                        $('.color-bar').css('width', `${totalPercent}%`);
                        console.log(`Faltam R$${newSum} para você ganhar Frete Grátis`);
                        console.log(`Percentual ${totalPercent}% de barra`);   
                    }else if (newSubTotal >= 30000) {
                        $('.color-bar').css('width', '100%');
                        $('.free-shipping-bar').text('Você já tem Frete Grátis');
                        console.log('Você já tem Frete Grátis');
                    }else{
                        $('.color-bar').css('width', '0%');
                        $('.free-shipping-bar').text('Faltam R$300,00 para você ganhar Frete Grátis');
                    }
            }
            ), 3000),
            this
        },
        verificaAdicaoSubtracaoCart: function(){
            $(document).on("click", ".qtd-remove, .qtd-adiciona", (function() {
                americaJoias.verificaValorFreteGratis();
            }
            ))
        },
        init: function() {
            //Geral
            americaJoias.qtdCart();
            americaJoias.verificaLogado();
            americaJoias.BuscaHeader();
            americaJoias.menuPrincipal();
            americaJoias.slidePrincipal();
            americaJoias.slidePrincipalMobile();
            // americaJoias.carrosselInformativo();
            americaJoias.prateleirasGerais();
            americaJoias.prateleiraFixa();
            americaJoias.bannerCategorias();
            americaJoias.slidePrateleiraMais();
            americaJoias.slidePrateleiraProdutos();
            americaJoias.slideMarcas();
            americaJoias.aplicaNomeCategoria();
            americaJoias.descPrat();
            americaJoias.fixFrete();
            americaJoias.slideOfertas();
            americaJoias.breadCrumb();
            americaJoias.bannerProduto();
            americaJoias.thumbImg();
            americaJoias.qtdProd();
            americaJoias.descricaoCategoria();
            americaJoias.zoomProd();
            americaJoias.filtroMobile();
            americaJoias.newsletter();
            // americaJoias.compreJunto();
            americaJoias.menuMobile();
            americaJoias.institucional();
            americaJoias.footerMobile();
            americaJoias.faleConosco();
            americaJoias.openMiniCart();
            americaJoias.addProductToMinicart();
            americaJoias.instaFeed();
            americaJoias.verificaValorFreteGratis();
            americaJoias.verificaAdicaoSubtracaoCart();
        }
    }
    americaJoias.init();
});

//Home Tabs Inesqueciveis
$(document).ready(function () {
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
});

//Home Setas do Banner de Marcas
$(document).ready(function(){
    $(".banner-marca h2").append('<div class="new-arrow"></div>').wrapInner("<span></span>");
    $(".banner-marca .slick-prev").appendTo($('.new-arrow'));
    $(".banner-marca .slick-next").appendTo($('.new-arrow'));
});



//MODAL DE LANÇAMENTO (com utilidade)

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

// CONFIGURAÇÃO DO DISPARO DE MODAIS COM COOKIE MANAGEMENT
// var retrieveCookie = getCookie('lancamentoModal');
// if (!retrieveCookie) {
//     $('.modal-lancamento-bg').css('display','block');
// }else{
//     $('.modal-lancamento-bg').css('display','none');
// }

// $('.button-fechar').click(function(){
//     setCookie('lancamentoModal','true', 1);
//     $('.modal-lancamento-bg').css('display','none');
// });

$(window).load(function () {
    $(".freight-btn").click(function () {
        setTimeout(function () {
            $(".freight-values td").each(function () {
                if (-1 !== $(this).text().indexOf("Frete Grátis")) {
                    var e = $(this).next().text();
                    (e = e.substring(0, e.indexOf("para o CEP"))), $(this).next().text(e);
                }
                var t = $(this)
                    .text()
                    .replace(/(505347b6-a7ef-40a5-ad06-0f9dae38bf07)|(7a72f0c3-ea1d-4058-a3f2-142103ad72f8)/g, "")
                    .replace("()", "");
                $(this).text(t);
            });
        }, 2000);
    });
});