$(document).ready(function () {

    var scre = $("body").width();
    $(".helperComplement").remove();

    var code4Fit = {        
        stickyMenu: function () {
            $("#toggle").click(function () {
                $(this).toggleClass('on');
                $("#resize").toggleClass("active");
            });
            $("#resize ul li a").click(function () {
                $(this).toggleClass('on');
                $("#resize").toggleClass("active");
            });
            $(".close-btn").click(function () {
                $(this).toggleClass('on');
                $("#resize").toggleClass("active");
            });
            $(function () {
                $(document).scroll(function () {
                    var $nav = $(".header");
                    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
                });
            });
        },

        menuPrincipal: function () {
            var settings = {
                "url": "/api/catalog_system/pub/category/tree/3/",
                "method": "GET",
                "headers": {
                    "content-type": "application/json"
                }
            }
           
            $.ajax(settings).done(function (dataMenu) {

                var menu = $('.menu-principal');
                var FitMenu = dataMenu;

                $.each(FitMenu, function (i, field) {

                    menu.append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '" title="' + field.name + '">' + field.name + '</a><div class="box-subMenu fadeIn"><div class="container-center"><ul class="subCategoria"></ul></div></div></li>');

                    $(FitMenu[i].children).each(function (ii, el) {
                        var subCatId = FitMenu[i].children[ii].id;
                        var subCatNome = FitMenu[i].children[ii].name;
                        var subCatUrl = FitMenu[i].children[ii].url;
                        $('.cat-index-' + i).find('.subCategoria').append('<li id="' + subCatId + '" class="subItem"><a href="' + subCatUrl + '?O=OrderByScoreDESC" class="linkBy">' + subCatNome + '</a></li>');
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
                        for (var i = 0; i < thisLinks.length; i += 6) {
                            thisLinks.slice(i, i + 6).wrapAll("<span class='menuColuna'></span>");
                        };
                    }
                });
            }, 1500);
            $('.search-button').click(function(){
                $('.busca-topo__busca-container').toggleClass('busca-open');
            });

            $('.fechar-busca').on('click', function (e) {
                    $('.busca-topo__busca-container').removeClass('busca-open');
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

                    $(".menu-principal").after("<span class='menu-fechar'> </span>");

                    $(".menu-fechar").click(function () {
                        $("body").toggleClass("aberto");
                    });
                }, 2500);

                setTimeout(function () {
                    vtexjs.checkout.getOrderForm().done(function (orderForm) {
                        console.log(orderForm)
                        var userType = orderForm.userType;
                        var nome = (orderForm.clientProfileData !== null) ? orderForm.clientProfileData.firstName : '';
                        var email = (orderForm.clientProfileData !== null) ? (orderForm.clientProfileData.email !== null ? orderForm.clientProfileData.email.substring(0, 10) + '...' : 0) : '';
                        var logado = orderForm.loggedIn;

                        logado = orderForm.loggedIn;
                        if (logado) {
                            $(".menu-topo .menu-principal, #resize #menu").prepend("<ul class='header-user'>" +
                                "<span id='brand'><a href='index.html'><span class='icon-logo-4fitbox'></span></a></span>" +
                                "<li class='header-user__name'><span class='icon-user'></span>Olá, " + (nome || email) + "</li>" +
                                "<li class='orders'><a href='/account/orders'>Meus Pedidos</a></li>" +
                                "<li class='login'><a href='/account'>Minha Conta</a></li>" +
                                "<li class='sair'><span class='icon-exit'></span><a href='/no-cache/user/logout'>Sair</a></span></li>" +
                                "</ul>");
                        } else {
                            $(".menu-topo .menu-principal, #resize #menu").prepend("<ul class='header-user'>" + "<span id='brand'><a href='index.html'><span class='icon-logo-4fitbox'></span></a></span>"+
                                "<li class='saudacao'><span class='user-login'></span> <a href='/login'><p>Olá, Bem-vindo(a)! <br /> Entre ou Cadastre-se</p> </a> </li>" +
                                // "<li class='orders'><a href='/account/orders'>Meus Pedidos</a></li>" +
                                // "<li class='login'><a href='/account'>Minha Conta</a></li>" +
                                "</ul>");
                        }
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function () {
                        $(this).parent().find("ul").first().slideToggle();
                        $(this).parent().toggleClass("aberto");
                    });

                    /* Remove link caso tenha submenu  */
                    $(".menu-topo .menu-principal > li.itemMenu > a").removeAttr("href");
                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function (e) {
                       e.preventDefault();
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue .subMenuTrue").click(function () {
                        $(this).find("ul").first().slideToggle();
                        $(this).toggleClass("aberto");
                    });
                }, 4000);
            }

        },

        /* Busca Header */
        buscaHeader: function() {
            setTimeout(function(){
                $('.search-button').click(function(){
                   $('.busca-topo__busca-container').toggleClass('busca-open');
               });
            }, 3000);
        },

         //Informativo
        carrosselInformativo: function() {
            if (scre < 980) {
                $('.informativos ul').slick({
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    lazyLoad: 'ondemand',
                    arrows: true,
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
        perguntasRespostas: function(){
            $(document).on("click", ".questions-faq li:not(.active)", function () {
                $(this).find(".questions-faq__answer").slideDown();
                $(this).addClass("active");
            });
        
            $(document).on("click", ".questions-faq li.active", function () {
                $(this).find(".questions-faq__answer").slideUp();
                $(this).removeClass("active");
            });
        },

        produtosAvulsos: function () {
            $('.forfit-produtos-avulsos .produtos-slider ul').slick({
                slidesToShow: 5,
                infinity: false,
                responsive: [
                    {
                        breakpoint: 980,
                        settings: {
                            arrows: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: true,
                            slidesToShow: 2
                        }
                    }
                ]
            });
        },

        qtdCart: function () {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                var carItems = orderForm.items.length;
                $('.carrinho .qtd-cart').text(carItems);
            });
        },

        
        verificaLogado: function () {
            $(document).one("ajaxStop", function () {
                $("header .ajax-content-loader").each(function () {
                   
                    if ($("#login", this).length) $(this).parent().addClass("loginOff"), $("body").addClass("loginOff");
                    else if (
                        ($(this).parent().addClass("loginOn"),
                            $("body").addClass("loginOn"),
                            $(".ajax-content-loader").append(
                                "<div class='box-welcome'><a href='/_secure/account#/subscriptions' class='login-assinatura'>Assinatura</a><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
                            ),
                            
                            $("body").hasClass("loginOn"))
                    ) {
                       
                        $("p.welcome em").remove();
                        var e = $("p.welcome").html();
                        (e = e.replace(/ /g, "").replace("Olá", "").replace(".", "")), $("p.welcome").html("Olá" + e);

                        $(".slide-principal .forfit-texto_banner button").remove();
                        var b = $(".slide-principal .forfit-texto_banner p").html();
                        (b = e.replace(/ /g, "").replace("Olá", "").replace(".", "")), 
                        $(".slide-principal .forfit-texto_banner p").html("Seja Bem-vindo(a)" + e + " e boas compras! <br/> <a href='/_secure/account#/subscriptions' class='forfit-button assinatura'><span class='icon-cart'></span> ADICIONAR PRODUTOS NA CESTA</a>");

                        $('.welcome').prependTo($('.box-welcome'),
                        $('.welcome').addClass('logado'));
                    }

                    $('body').on('click', function (e) {
                        if (document.getElementsByClassName('.user-name__account')[0] ? !document.getElementsByClassName('.user-name__account')[0].contains(e.target) : 0)
                            $('.box-welcome, .user-name__account').removeClass('ativo');
                    });
                    $(".user-name__account").click(function () {
                        $('.box-welcome, .welcome, .user-name__account').toggleClass('ativo');
                    });
                });
            });       
        },
       
        btnComprarProduto: function () {
            $(".forfit-prateleira li").each(function () {
                var linkProd = $(this).find(".lead a").attr("href");
                $(this).find(".data .add a").attr("href", linkProd);
            });
        },
       
        //Prateleiras Gerais
        prateleirasGerais: function () {
            if ($("body").hasClass("forfit-home") || $("body").hasClass("forfit-produto") || $("body").hasClass("sistema")) {
                $('.prateleira-01 ul').slick({
                    infinite: false,
                    slidesToShow: 5,
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

        slidePrateleiraProdutos: function () {
            if ($("body").hasClass("forfit-produto")) {
                $('.slide-prod .forfit-prateleira > ul').slick({
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

        //Slide prateleira QVVT Ofertas Busca Vazia
        slidePrateleiraBusca: function () {
            if ($("body").hasClass("forfit-produto")) {
                $('.slide-prod').each(function () {
                    var slide = $(this).find('.forfit-prateleira').length;
                    if (slide > 0) {
                        $(this).find('.forfit-prateleira > ul').slick({
                            infinite: true,
                            slidesToShow: 5,
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
            }
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

        alteraNomeDoFiltro: function() {
            $(".search-navigator-tab.tab-refinar").text("Filtros");
        },

        clonaNomeDaCategoria: function() {
            var nomeClone = $(".search-single-navigator h3:first-of-type a").text();
            $(".planet-departamento__topo .nomeDepartamento h2").text(nomeClone);
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
        descPrat: function () {
            $(".priceLabel").each(function () {
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

        calculaFrete: function () {

            // function formatReal(int) {
            //     var tmp = int + '';
            //     tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            //     if (tmp.length > 6)
            //         tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            //     return tmp;
            // }

            $('#formFrete').submit(function (e) {
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
                    vtexjs.checkout.simulateShipping(items, postalCode, country).done(function (result) {
                        $('.calc-frete .listaFrete').fadeIn()
                        //console.log(result)
                        $('.listaFrete tbody .item-frete').remove()
                        $(result.logisticsInfo[0].slas).each(function (i) {
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

            })
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

        sliderVaiGostar: function () {
            if ($("body").hasClass("resultado-busca")) {
                $('.forfit-prateleira ul').slick({
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

        thumbImg: function() {
            if ($("body").hasClass("forfit-produto")) {

                if (scre > 980) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    });

                } else if (scre < 980 && scre > 500) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        vertical: false,
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
                //prateleira
                $(".forfit-prateleira ul li .data .add a").click(function() {
                    event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();
                    if (qtd == "") {
                        qtd = "1"
                    }
                    var res = hrefCart.replace("qty=1", "qty=" + qtd);
                    var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                    setTimeout(function() {
                        vtexjs.checkout.getOrderForm().then(function() {
                            item = {
                                id: resUTL,
                                quantity: qtd,
                                seller: 1
                            };
                            //xpFuncoes.Carrinho.AddToCart([item]);
                            
                            vtexjs.checkout.addToCart([item]).done(function(orderForm) {
                                vtexjs.checkout.getOrderForm().done(function(e) {
                                    var qtdCart = e.items.length;
                                    var resto = e.value % 100;
                                    var valCart = e.value / 100;
                                    valCart = valCart.toFixed(2);
                                    valCart = valCart.toString();
                                    $(".header .carrinho .qtd-cart span").html(qtdCart);
                                    $(".header .carrinho .valor-cart span").html(valCart.replace(".", ","))
                                });
                                $(".header-minicart").addClass("open"),
                                        setTimeout(function () {
                                           $(".header-minicart").removeClass("open");
                                       }, 5e3);
                            })
                            
                        })
                    })
                })
                // Prod
                $(".produto-all #produtoDiv-direita .forfit-produto__buy-button .buy-button, .produto-all #produtoDiv-direita .forfit-produto__buy-button .recurrence-buy-button").click(function (event) {
                    event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();
                    
                    if (qtd == "") {
                        qtd = "1";
                    }

                    if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                    //alert('Por favor, selecione o modelo desejado.');
                   
                    Swal.fire({
                        icon: 'error',
                        title: 'Por favor, selecione Avulso ou Assinatura',
                        toast: 'true',
                        position: 'top-end',
                        showConfirmButton: 'false',
                        showCloseButton: 'true',
                        timerProgressBar: 'true',
                        timer: '4000'
                    })
                    } else {
                        var res = hrefCart.replace("qty=1", "qty=" + qtd);
                        //console.log(res);
                        var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                        var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                        setTimeout(function () {
                            vtexjs.checkout.getOrderForm().then(function () {
                                item = {
                                    id: resUTL,
                                    quantity: qtd,
                                    seller: 1
                                };
                                if ($('.forfit-produto__buy-button a').hasClass('buy-button')){
                                    vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                                        Swal.fire({ 
                                            toast: "true", 
                                            position:"bottom-end", 
                                            icon: "success", 
                                            timerProgressBar:"true", 
                                            showCloseButton: "true", 
                                            showConfirmButton: false,
                                            title: "Produto adicionado ao carrinho", 
                                            timer: "2000"});
                                        
                                        vtexjs.checkout.getOrderForm().done(function (e) {
                                            var qtdCart = e.items.length;
                                            $(".info-cart .qtd-cart").html(qtdCart);
                                        });
                                    });
                                }else{
                                    vtexjs.checkout.addToCart([item]).done(function(e) {
                                        var a = e.items.length - 1;
                                        vtexjs.checkout.addItemAttachment(a, "vtex.subscription.assinatura", {
                                            "vtex.subscription.key.frequency": "1 month"
                                        }, null, !1).then(function() {
                                            var e = {
                                                subscriptions: [{
                                                    itemIndex: a,
                                                    plan: {
                                                        frequency: {
                                                            interval: 1,
                                                            periodicity: "MONTH"
                                                        },
                                                        validity: {
                                                            begin: formatDate(),
                                                            end: formatDate(!0)
                                                        }
                                                    }
                                                }]
                                            };
                                            vtexjs.checkout.sendAttachment("subscriptionData", e).done(function() {
                                                window.location = "/checkout/#/cart"
                                                // minicart.updateCart();
                                            }).fail(function() {
                                                console.log("ocoreu um erro ao adicionar a recorrencia")
                                            })
                                        }).fail(function() {
                                            console.log("ocoreu um erro ao adicionar o anexo")
                                        })
                                    })
                                }
                            });
                        });
                    }
                })
                // jQuery(document).on("click", ".closeCart", function (e) {
                //      $(".forfit-produto .buy-button").removeClass("loading");
                // }),
            }
        },  
        
        breadCrumb: function () {
            $(".bread-crumb ul li").first().find("a").text("Home");

            if ($("body").hasClass("forfit-404")) {
                $(".sistema .bread-crumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("forfit-500")) {
                $(".sistema .bread-crumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("forfit-buscavazia")) {
                $(".sistema .bread-crumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".bread-crumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        bannerDepartamento: function() {
            if ($("body").hasClass("forfit-departamento")) {
                var caminhoImg = $(".bannerDepartamento img").attr("src");
                $(".produto-page__topo").css("background", "url('" + caminhoImg + ") center center no-repeat")
                $(".produto-page__topo").css({"background-size": "cover"});
            }
        },

        // bannerProduto: function () {
        //     if ($("body").hasClass("forfit-produto")) {
        //         var imgProd = $("#produtoDiv-direita .prod-especificacao #caracteristicas td.imagemProd").text();
        //         // alert(imgProd);
        //         if (imgProd == "") {
        //             $(".bannerProduto").hide();
        //         } else {
        //             var caminhoImg = "/arquivos/" + imgProd;
        //             $(".bannerProduto-01").css("background", "url('" + caminhoImg + "') center center no-repeat");
        //         }
        //     }
        // },
        // Nome Departamento Categoria
        aplicaNomeCategoria: function () {
            if ($("body").hasClass("forfit-categoria") || $("body").hasClass("forfit-departamento")) {
                //Termo buscado
                var categoria = vtxctx.categoryName;
                $(".nomeDepartamento h1").prepend(categoria);
                $(".descricao-categoria .titulo-descricao h3").prepend(categoria);
            }

        },
        descricaoCategoria: function () {
            if ($("body").hasClass("forfit-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        zoomProd: function () {
            $(window).load(function () {
                var janela = $(window).width();
                if ($("body").hasClass("forfit-produto")) {

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
                $(".footer-01 .footer-01-02 h3, .footer-01 .footer-01-03 h3, .footer-01 .footer-01-04 h3, .footer-01 .footer-01-05 h3, .footer-01 .footer-01-06 h3").click(function () {
                    $(this).next("ul").slideToggle();
                    $(this).toggleClass("aberto");
                });

                $(".footer-01 .footer-01-01 h3").click(function () {
                    $(this).parent().find("p").slideToggle();
                    $(this).toggleClass("aberto");
                });
            }
        },

        placeholderFrete: function () {
            $(window).load(function () {
                $(".calc-frete .cep fieldset .prefixo .fitext").attr("placeholder", "Informe seu CEP:");
            });
        },

        aviseMe: function () {
            if ($('.sku-notifyme, .forfit-produto__buy-quant').attr('style')) {

            } else {
                $('.calc-frete, .forfit-produto__buy-quant').hide();
            }
        },
        notifyme: function() {
            $(".variantes-sku").on("change", "input", function(e) {
              e.preventDefault(), $(".buy-button-ref,.forfit-produto__buy-quant").is(":hidden") ? $(".unavailable-button, .notifyme, .forfit-produto__buy-quant").show() : $(".unavailable-button, .notifyme, .forfit-produto__buy-quant").hide()
            })
        },

        toggleDescricao: function() {
            $("body").on("click", ".forfit-produto__detalhes-texto", function () {
              $(".forfit-produto__detalhes-texto").removeClass("info-active");
              $(this).addClass("info-active");
              var dataId = $(this).data("id");
        
              if (dataId === "sugestao") {
                $(".forfit-produto__toggle-container section:visible").fadeOut();
                $(".forfit-produto__toggle-sugestao").fadeIn();

              } else if (dataId === "ingredientes") {
                $(".forfit-produto__toggle-container section:visible").fadeOut();
                $(".forfit-produto__toggle-ingredientes").fadeIn();

              } else if (dataId === "nutricional") {
                $(".forfit-produto__toggle-container section:visible").fadeOut();
                $(".forfit-produto__toggle-nutricional").fadeIn();

              } else if (dataId === "modo") {
                $(".forfit-produto__toggle-container section:visible").fadeOut();
                $(".forfit-produto__toggle-modo").fadeIn();
              } 
            });
        },

        campoProduto: function () {
            //var textoDetalhes = $(".productDescription").text();
            var textoSugestaodeUso = $(".prod-tabela .Informacoes tbody tr:nth-of-type(1) .value-field").html();
            var textoIngredientes = $(".prod-tabela .Informacoes tbody tr:nth-of-type(2) .value-field").html();
            //var textoNutricional = $(".prod-tabela .Informacoes tbody tr:nth-of-type(3) .value-field").html();
            var textoModoPreparo = $(".prod-tabela .Informacoes tbody tr:nth-of-type(4) .value-field").html();
            //$(".forfit-produto__toggle-detalhes").text(textoDetalhes);
            $(".forfit-produto__toggle-sugestao").html(textoSugestaodeUso);
            $(".forfit-produto__toggle-ingredientes").html(textoIngredientes);
            //$(".forfit-produto__toggle-nutricional").html(textoNutricional);
            //$(".forfit-produto__toggle-nutricional .tabela-nutri br").remove();
            $(".forfit-produto__toggle-modo").html(textoModoPreparo);
        
            // if (!textoInformacoes) {
            //   $(".forfit-produto__detalhes-texto:last-of-type").hide();
            // }
        },
        campoTabelaNutri: function() {
            if ($("#caracteristicas").before("<div class='tabelasMain'><div class='tabelasTitle'></div><div class='tabelasCentral'><div class='tabelaNutricional active'></div><div class='tabelaAminograma'></div></div></div>"), 
            $("#caracteristicas .Informacoes-Nutricionais").length && ($("#caracteristicas .Informacoes-Nutricionais tr").each(function() {
                var e = $(".value-field", this).html().toString();
                e.indexOf("??") > -1 ? (e = e.split("??"), $(".value-field", this).html(e[0]), $(this).append("<td class='value-complement'>" + e[1] + "</td>")) : $(this).append("<td class='value-complement'></td>")
            }), 
            $(".tabelaNutricional").append($("#caracteristicas .Informacoes-Nutricionais")), 
            $(".tabelasTitle").append("<span class='tableaNutriBt active'>Valores Nutricionais</span>"), 
            $(".value-field.Informacao-Nutricional-Tabela-Nutricional").length)) {
                var e = $(".value-field.Informacao-Nutricional-Tabela-Nutricional").html();
                $(".tabelaNutricional").append("<p><b>Informação Nutricional:</b>" + e + "</p>")
            }
            if ($("#caracteristicas .Aminograma").length && ($("#caracteristicas .Aminograma tr").each(function() {
                var e = $(".value-field", this).html().toString();
                e.indexOf("??") > -1 ? (e = e.split("??"), 
                $(".value-field", this).html(e[0]), 
                $(this).append("<td class='value-complement'>" + e[1] + "</td>")) : $(this).append("<td class='value-complement'></td>")
            }), 
            $(".tabelaAminograma").append($("#caracteristicas .Aminograma")), 
            $(".tabelasTitle").append("<span class='tableaAminoBt'>Aminograma</span>"), 
            $(".value-field.Informacao-Nutricional-Tabela-Nutricional").length)) {
            e = $(".value-field.Informacao-Nutricional-Tabela-Aminograma").html();
            $(".tabelaAminograma").append("<p><b>Informação Nutricional:</b>" + e + "</p>")
            }
            jQuery(document).on("click", ".tableaNutriBt", function() {
                $(".tableaAminoBt, .tabelaAminograma").removeClass("active"), $(".tableaNutriBt, .tabelaNutricional ").addClass("active")
            }), 
            jQuery(document).on("click", ".tableaAminoBt", function() {
                $(".tableaNutriBt, .tabelaNutricional ").removeClass("active"), 
                $(".tableaAminoBt, .tabelaAminograma").addClass("active")
            });
            var t = {
                async: !0,
                crossDomain: !0,
                url: "/api/catalog_system/pub/products/" + $("#___rc-p-id").attr("value") + "/specification",
                method: "GET"
            };
            $.ajax(t).done(function(e) {
                console.log(e);
            var t = e;
            $.each(t, function(e, t) {
                switch (t.Id) {
                    case 20:
                        "" != t.Value && ($(".prod-beneficios").removeClass("hideElement"), 
                        $(".prod-beneficios").html("<span>Benefícios do produto: </span><p>" + t.Value + "</p>"));
                        break;
                    case 23:
                        "" != t.Value && ($(".prod-importante").removeClass("hideElement"), $(".prod-importante").html("<span>Importante</span><p>" + t.Value + "</p>"));
                        break;
                    case 30:
                        if ("" != t.Value)
                            for ($(".prod-caracteristicas").removeClass("hideElement"), $(".prod-caracteristicas").html("<p>CaracterÃ­sticas do Produto</p><ul></ul>"), e = 0; e < t.Value.length; e++) {
                                var a = t.Value[e];
                                a = (a = a.toString().replace(/[^a-zA-Z ]/g, "")).replace(/\s/g, "-").toLowerCase(), $(".prod-caracteristicas ul").append("<span class='" + a + "'>" + t.Value[e] + "</span>")
                            }
                        break;
                    case 22:
                        "" != t.Value && ($(".prod-laudo").removeClass("hideElement"), $(".prod-laudo").html("<h3>Laudo TÃ©cnico</h3><a href='" + t.Value + "'>Clique aqui para fazer o donwload do laudo tÃ©cnico</a>"));
                        break;
                    case 24:
                        "" != t.Value && ($(".prod-ingredientes").removeClass("hideElement"), $(".prod-ingredientes").html("<h4>Ingredientes</h4><p>" + t.Value + "</p>"));
                        break;
                    case 25:
                        "" != t.Value && ($(".prod-retricao").removeClass("hideElement"), $(".prod-retricao").html("<h4>RestriÃ§Ã£o Alimentar</h4><p>" + t.Value + "</p>"));
                        break;
                    case 26:
                        "" != t.Value && ($(".prod-recomendacao").removeClass("hideElement"), $(".prod-recomendacao").html("<h4>RecomendaÃ§Ã£o de Consumo</h4><p>" + t.Value + "</p>"))
                    }
                })
            }).done(function() {
                $(".hideElement").remove()
            })
        },
        openMiniCart: function () {	
            var e = $(".carrinho"),	
                t = $(".header-minicart, .minicart__overlay");	
            $(window).width() < 420	
                ? e.on("click", function () {	
                      location.href = "/checkout";	
                  })	
                : e.on("click", function () {	
                      $(this).addClass("open"), t.addClass("open");	
                  }),	
                $(".header-minicart-close").on("click", function () {	
                    e.removeClass("open"), t.removeClass("open");	
                }),	
                $(".header-minicart-empty button").on("click", function () {	
                    t.removeClass("open");	
                }),	
                $(".header-minicart-actions button").on("click", function () {	
                    t.removeClass("open");	
                });	
                $(".minicart__overlay").on("click", function () {
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
          
                vtexjs.checkout.getOrderForm().done(function (orderForm) {
                  vtexjs.checkout.addToCart([product], null, _salesChannel2).done(function (orderForm) {
                    Minicart.methods.__minicartReset();
                    setTimeout(function () {
                      $('.header-minicart, .minicart__overlay').addClass('open');
                    }, 1000);
                    setTimeout(function () {
                      $('.header-minicart, .minicart__overlay').removeClass('open');
                    }, 4000);
          
                    // setTimeout(() => addFreightOnDifferentSellers(), 2000);
                  });
                });
              }
            });
        },
          
        formatReal: function (int) {
            var tmp = int + '';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if (tmp.length > 6)
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            return tmp;
        },

        qtdCart: function () {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                var carItems = orderForm.items.length;
                $('.carrinho .qtd-cart').text(carItems);
                $('.miniCart__title-qtd').text(carItems)
                $('.miniCart__qtd').text(carItems)
                code4Fit.totalMinicartValue(orderForm)
                code4Fit.mountMinicartProducts(orderForm)
            });
        },

        totalMinicartValue: function (orderForm) {
            var total;
            if (orderForm.totalizers.length > 0) {
                total = code4Fit.formatReal(orderForm.totalizers[0].value)
            } else {
                total = 0
            }
            $('.miniCart__total-price').text("R$ " + total)
        },

        mountMinicartProducts: function (orderForm) {
            if (orderForm.items <= 0) {
                $('.miniCart__product-list').html(`<li class="miniCart__empty-text" style="display: block;">Seu carrinho está vazio :(</li>`)
            } else {
                $('.miniCart__empty-text').remove()
                var html = ''
                orderForm.items.forEach(function (item, index) {
                    html += `<li class="miniCart__product" data-price="${item.price}" data-sku="${item.id}">
                    <figure class="miniCart__product-img">
                        <img src=${item.imageUrl}" class="miniCart__image">
                    </figure>
                    <div class="miniCart__product-infos">
                        <div class="miniCart__product-name">${item.name}</div>
                        <div class="miniCart__product-price">Por: R$ ${code4Fit.formatReal(item.sellingPrice)}</div>
                    </div>
                    <div class="miniCart__product-remove-btn" data-index="${index}">x</div>
                </li>`
                })
                $('.miniCart__product-list').html(html)
            }
        },

        removeProductFromMinicart: function () {
            $(document).on('click', '.miniCart__product-remove-btn', function (e) {
                console.log('clicked')
                vtexjs.checkout
                    .getOrderForm()
                    .then(function (orderForm) {
                        let itemsToRemove = [{
                            index: e.target.getAttribute('data-index'),
                            quantity: 0
                        }];
                        return vtexjs.checkout.removeItems(itemsToRemove);
                    })
                    .done(function (orderForm) {
                        //console.log(orderForm)
                        code4Fit.qtdCart();
                    })
            })
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
                var varA =$("#form-contact-assunto").val();

                function validate() {
                    var fcEmail = $("#fcEmail").val();

                    if (validateEmail(fcEmail)) {
                        enviaDados();
                    } else {
                        $('#fcEmail').css('border', '1px solid #e74c3c');
                        $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
                    }

                    return false;
                }

                $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
                $('.box-form-msg').css('display', 'none');

                if (varN == '') {
                    $('#fcNome').css('border', '1px solid #e74c3c');
                    $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
                } else if (varE == '') {
                    $('#fcEmail').css('border', '1px solid #e74c3c');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
                } else if (varT == '') {
                    $('#fcTelefone').css('border', '1px solid #e74c3c');
                    $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
                } else if (varA == '') {
                    $('#form-contact-assunto').css('border', '1px solid #e74c3c');
                    $('#form-contact-assunto').before('<div class="box-form-msg">Escolha um assunto/div>');
                } else if (varM == '') {
                    $('#fcMsg').css('border', '1px solid #e74c3c');
                    $('#fcMsg').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
                } else if (varE != '') {
                    validate();
                }

                function enviaDados() {
                    var datos = {};
                    datos.nome = varN;
                    datos.email = varE;
                    datos.telefone = varT;
                    datos.assunto = varA;
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

        selectorPlanoAssinatura: function(){
            $('.skuespec_Assinantes').click(function(){
                $('.forfit-produto__buy-button a').addClass('recurrence-buy-button');
                $('.forfit-produto__buy-button a').removeClass('buy-button');
            });
            $('.skuespec_Avulsos').click(function(){
                $('.forfit-produto__buy-button a').removeClass('recurrence-buy-button');
                $('.forfit-produto__buy-button a').addClass('buy-button');
            });
        },
        calculaRecurrence: function() {
            $(".forfit-recurrence > div > ul > li.plano-10 > select").on("change", function() {
                var e = $(this).parent(".forfit-recurrence-item").attr("data-price");
                e = e.replace(",", "-").replace(".", ",").replace("-", ".");
                var a = parseInt($(this).val()),
                    t = parseFloat((.9 * e * a).toFixed(2));
                $(this).prev(".forfit-recurrence-price").children(".forfit-recurrence-price-value").html(t)
            })
        },
        vitrineAssinatura: function () {
            setTimeout(function(){
                $(".forfit-prateleira li .forfit-product").not(".forfit-ajax-completed").each(function (index, el) {
                    var _element = $(this);
                    _element.addClass("forfit-ajax-completed"), _element.find(".variacoes").prepend('<div class="hidden-list-skus"></div>');
                    var _product_id = _element.find(".forfit-id").val();
                    var avSku;
                    vtexjs.catalog.getProductWithVariations(_product_id).done(function(product){
                        avSku = product.skus;
                        var Assinatura = product.dimensionsMap.Assinatura;
                        for (var j = 0; j < avSku.length; j++){
                            var avAssinatura = avSku[j].dimensions.Assinatura;
                            var skuVtex = avSku[j].sku;
                            var skuAvailable = avSku[j].available;
                            _element.find(".hidden-list-skus").append('<input class="hidden-select" type="hidden" data-id="'+ skuVtex +'" data-assinatura="' + avAssinatura + '" data-available="' + skuAvailable + '" />');
                        }
                        for (var i = 0; i < Assinatura.length; i++) {
                            var _Assinatura = Assinatura[i];
                            if(_Assinatura !== undefined){
                                _element.find(".forfit-variations").prepend('<li class="prod-size ' + _Assinatura + '" data-assinatura="'+ _Assinatura +'">' + _Assinatura + "</li>");                           
                            }
                        }
                        
                    });
                    $(document).on("click", ".forfit-variations li", function () {
                        $(this).parent().find("li").removeClass("forfit-active"),
                        $(this).addClass("forfit-active");
                        _element.find('.forfit-buy a').removeAttr('href');
                    });
                    _element.find(".add a").hover(function(){
                        var selectorAssinatura = $('.forfit-variations li.forfit-active').attr('data-assinatura');
                        _element.parent().find(`.hidden-list-skus input[data-assinatura="${selectorAssinatura}"]`).addClass('selected');
                    });
                    _element.find(".add a").click(function(){
                        
                        var _sku = _element.parent().find('.selected');
                        if (_sku.attr('data-available') == "false"){
                            alert('Produto não disponí­vel nesta combinação');
                            $('.hidden-list-skus input').removeClass('selected');
                            _element.parent().find("li").removeClass("forfit-active");
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
                                    _element.parent().find("li").removeClass("forfit-active");
                            } else { 
                                alert("Selecione se deseja comprar avulso ou assinar.");
                            }
                        }
                    });
                });
            }, 2000);
        },
        init_ajax: function () {
            code4Fit.selectorPlanoAssinatura();
            code4Fit.calculaRecurrence();
            code4Fit.vitrineAssinatura();
        },
    
        init: function () {        
            code4Fit.stickyMenu();
            code4Fit.menuPrincipal();
            code4Fit.carrosselInformativo();
            code4Fit.perguntasRespostas();
            code4Fit.produtosAvulsos();
            code4Fit.thumbImg();
            //code4Fit.qtdCart();
            //code4Fit.aviseMe();
            code4Fit.notifyme();
            code4Fit.campoProduto();
            code4Fit.campoTabelaNutri();
            code4Fit.calculaFrete();
            code4Fit.toggleDescricao();
            code4Fit.verificaLogado();
           
    
            code4Fit.prateleirasGerais();
            code4Fit.slidePrateleiraProdutos();
            code4Fit.descPrat();
            //Departamento
            code4Fit.escondeFiltrosNoDesktop();
            code4Fit.insereDivParaToggle();
            code4Fit.toggleDosFiltros();
            code4Fit.alteraNomeDoFiltro();
            code4Fit.clonaNomeDaCategoria();
            code4Fit.filtroCategoria();
            
            code4Fit.fixFrete();
            code4Fit.sliderVaiGostar();
            //code4Fit.slidePrateleiraMais();
           
            //code4Fit.breadCrumb();
            code4Fit.bannerDepartamento();
            //code4Fit.bannerProduto();  
            code4Fit.qtdProd();
            code4Fit.aplicaNomeCategoria();
            code4Fit.descricaoCategoria();
            code4Fit.zoomProd();
            code4Fit.slidePrateleiraBusca();
            code4Fit.filtroMobile(); 
            code4Fit.menuMobile();
            code4Fit.institucional();
            // code4Fit.footerMobile();
            
            //code4Fit.miniCartOpenAndClose();
            code4Fit.formatReal();
            code4Fit.qtdCart();
            //code4Fit.totalMinicartValue();
            //code4Fit.mountMinicartProducts();
            //code4Fit.removeProductFromMinicart();
            code4Fit.faleConosco();
            code4Fit.openMiniCart();
            //code4Fit.addProductToMinicart();
            // code4Fit.buscaHeader();
        },
        
    }
    code4Fit.init();
    code4Fit.init_ajax();
});