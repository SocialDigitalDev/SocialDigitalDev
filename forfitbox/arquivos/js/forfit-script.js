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
                        //console.log(orderForm)
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
                    $(".menu-topo .menu-principal > li.itemMenu.subMenuTrue > a").removeAttr("href");
                    $(".menu-topo .menu-principal > li.subMenuTrue.subMenuTrue > a").click(function (e) {
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
        slidePrincipal: function () {
			if ($("body").hasClass("forfit-home")) {
				$('.slide-principal').slick({
					dots: true,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					speed: 900,
					fade: false,
					lazyLoad: 'ondemand'
				});
			}
		},

		slidePrincipalMobile: function () {
            if ($("body").hasClass("forfit-home")) {
				$('.slide-mobile').slick({
					dots: false,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					speed: 900,
					fade: false,
					lazyLoad: 'ondemand',
				});
			}
		},
         //Informativo
        carrosselInformativo: function() {
            if (scre < 980) {
                $('.informativos ul').slick({
                    infinite: false,
                    slidesToShow: 3,
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
        carrosselObjetivo: function() {
            if (scre < 980) {
                $('.objetivo-section ul, .categorias-section ul').slick({
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    lazyLoad: 'ondemand',
                    arrows: true,
                    responsive: [{
                            breakpoint: 680,
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
                $('.slide-prod ul').slick({
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

        prateleirasDireita: function () {
            $('.prateleira-produtos_home .prat-right_prod ul').slick({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 980,
                    settings: {
                        centerMode: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
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
        },
        sliderMarcas: function () {
            $('.marcas-slider ul').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 980,
                    settings: {
                        centerMode: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: false
                    }
                },
                {
                    breakpoint: 769,
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
                $(this).html(valor + "%  OFF")
            })
        },

        calculaFrete: function () {
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
                        vertical: false,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    });

                } else if (scre < 980 && scre > 500) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: false,
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
            if ($('.sku-notifyme').attr('style')) {

            } else {
                $('.calc-frete').hide();
            }
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
        detalhesProduto: function() {
            if ($("body").hasClass("nova-pdp")) {	
                var characteristic = document.querySelector('.details-prod__characteristic-info');
                var textCharacteristic = document.querySelectorAll('.Modo-de-preparo');
                
                console.log(textCharacteristic, 'teste');
                
                if (textCharacteristic[1] != null) {
                    characteristic.innerHTML = textCharacteristic[1].innerHTML;
                } else {
                    characteristic.parentNode.style.display = 'none';
                }
            }
        },
       
        campoTabelaNutri: function() {
            if ($("#caracteristicas").before("<div class='tabelasMain'><div class='tabelasTitle'></div><div class='tabelasCentral'><div class='tabelaNutricional active'></div><div class='tabelaAminograma'></div></div></div>"), 
            $("#caracteristicas .Informacoes-Nutricionais").length && ($("#caracteristicas .Informacoes-Nutricionais tr").each(function() {
                var e = $(".value-field", this).html().toString();
                e.indexOf("??") > -1 ? (e = e.split("??"), $(".value-field", this).html(e[0]), 
                $(this).append("<td class='value-complement'>" + e[1] + "</td>")) : $(this).append("<td class='value-complement'></td>")
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
        },
        caracteristicasProd: function() {
			if ($("body").hasClass("nova-pdp")) {			
				/* Marca */
				var pdp_marca = $("#caracteristicas .Filtros td.Marca").text();
				if (pdp_marca.length > 1) {
					$(".prod_especificacoes .prod_marca").append("<p>" + pdp_marca + "<p/>")
				} else {
					$(".produto_especificacoes .prod_marca").remove()
				}
				/* Tipo de produto */
                var pdp_tipo = $("#caracteristicas .Filtros td.Tipo-de-produto").text();
				if (pdp_tipo.length > 1) {
					$(".prod_especificacoes .prod_tipo").prepend("<p>" + pdp_tipo + "<p/>")
				} else {
					$(".produto_especificacoes .prod_tipo").remove()
				}
                /* Sabor */
                var pdp_sabor = $("#caracteristicas .Filtros td.Sabor").text();
				if (pdp_sabor.length > 1) {
					$(".prod_especificacoes .prod_sabor").prepend("<p>" + pdp_sabor + "<p/>")
				} else {
					$(".produto_especificacoes .prod_sabor").remove()
				}
				
			}
		},

        customProdDescription: function() {
            var e;
            0 < $(".value-field.Modo-de-Preparo").length && 0 < $(".value-field.Modo-de-Preparo").text().length ? $(".box-tab.fornecedor").text('*Produto com entrega exclusiva "' + $(".value-field.Modo-de-Preparo").text() + '"') : $(".box-tab.fornecedor").addClass("hide"), 0 < $(".name-field.Beneficios").length ? $(".box-tab.beneficios .box-tab-content").html($(".value-field.Beneficios").html()) : $(".box-tab.beneficios").addClass("hide"), 
            0 < $(".name-field.Detalhes").length ? $(".box-tab.detalhes .box-tab-content").html($(".value-field.Detalhes").html()) : $(".box-tab.detalhes").addClass("hide"), 
            0 < $(".name-field.Diferenciais").length ? $(".box-tab.diferenciais .box-tab-content").html($(".value-field.Diferencias").html()) : $(".box-tab.diferenciais").addClass("hide"), 0 < $(".name-field.Para-que-serve").length ? $(".box-tab.pra-que .box-tab-content").html($(".value-field.Para-que-serve").html()) : $(".box-tab.pra-que").addClass("hide"), 
            0 < $(".name-field.Video-do-Produto").length ? $(".box-tab.video .box-tab-content").html($(".value-field.Video-do-Produto").html()) : $(".box-tab.video").addClass("hide"), 
            
            0 < $(".name-field.Advertencias").length && (e = "<div class='box-tab-content'>" + (e = $(".value-field.Advertencias").html()) + "</div>", $(".box-tab.advertencia").html('<h3 class="box-tab-title" data-aos="fade-up"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white"><title>Whistle</title><g id="_21_-_30" data-name="21 - 30"><g id="Whistle"><path d="M44,15H18.4A13.4,13.4,0,0,0,5.47,24.652,3.5,3.5,0,0,0,4.5,24.5a3.5,3.5,0,0,0,0,7,3.461,3.461,0,0,0,.944-.145A12.99,12.99,0,0,0,18,41,13.07,13.07,0,0,0,30.683,30.819a.968.968,0,0,1,.7-.719L44.8,26.37A3.009,3.009,0,0,0,47,23.48V18A3,3,0,0,0,44,15ZM33,17v2H29V17ZM4.5,29.5a1.5,1.5,0,1,1,.582-2.871c-.041.372-.073.747-.08,1.128a13.282,13.282,0,0,0,.08,1.613A1.49,1.49,0,0,1,4.5,29.5ZM45,23.48a1,1,0,0,1-.732.964L30.843,28.173a2.965,2.965,0,0,0-2.113,2.215A11.058,11.058,0,0,1,18,39,11,11,0,0,1,7,27.794,11.261,11.261,0,0,1,18.4,17H27v2a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V17h9a1,1,0,0,1,1,1Z"/><path d="M31,11a1,1,0,0,0,1-1V8a1,1,0,0,0-2,0v2A1,1,0,0,0,31,11Z"/><path d="M36.3,13.2a1,1,0,0,0,.707-.293l1.414-1.414a1,1,0,0,0-1.414-1.414L35.6,11.49A1,1,0,0,0,36.3,13.2Z"/><path d="M24.99,12.9A1,1,0,0,0,26.4,11.49L24.99,10.076a1,1,0,0,0-1.414,1.414Z"/><path d="M18,22a6,6,0,1,0,6,6A6.006,6.006,0,0,0,18,22Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,18,32Z"/></g></g></svg>Advertências</h3>' + e)), 

            0 < $(".name-field.Armazenagem").length && (e = "<div class='box-tab-content' data-aos='fade-up'>" + (e = $(".value-field.Armazenagem").html()) + "</div>", $(".box-tab.armazenagem .wrapper").html('<h3 class="box-tab-title" data-aos="fade-up">Armazenagem</h3>' + e)), 

            0 < $(".name-field.Beneficios").length && (e = "<div class='box-tab-content' data-aos='fade-left'>" + (e = $(".value-field.Beneficios").html()) + "</div>", $(".box-tab.beneficios .wrapper").html('<h3 class="box-tab-title" data-aos="fade-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white"><title>Medical Check</title><g id="_21_-_30" data-name="21 - 30"><g id="Medical_Check" data-name="Medical Check"><path d="M35,6H31a2,2,0,0,0-2-2H27.451a3.977,3.977,0,0,0-6.9,0H19a2,2,0,0,0-2,2H13a5.006,5.006,0,0,0-5,5V41a5.006,5.006,0,0,0,5,5H35a5.006,5.006,0,0,0,5-5V11A5.006,5.006,0,0,0,35,6ZM19,6h2.184a1,1,0,0,0,.942-.665,1.983,1.983,0,0,1,3.748,0A1,1,0,0,0,26.816,6H29V8H19ZM38,41a3,3,0,0,1-3,3H13a3,3,0,0,1-3-3V11a3,3,0,0,1,3-3h4a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2h4a3,3,0,0,1,3,3Z"/><path d="M17.293,32.293,16,33.586l-.293-.293a1,1,0,0,0-1.414,1.414l1,1a1,1,0,0,0,1.414,0l2-2a1,1,0,0,0-1.414-1.414Z"/><path d="M33,33H21a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2Z"/><path d="M17.293,27.293,16,28.586l-.293-.293a1,1,0,0,0-1.414,1.414l1,1a1,1,0,0,0,1.414,0l2-2a1,1,0,0,0-1.414-1.414Z"/><path d="M33,28H21a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2Z"/><path d="M17.293,37.293,16,38.586l-.293-.293a1,1,0,0,0-1.414,1.414l1,1a1,1,0,0,0,1.414,0l2-2a1,1,0,0,0-1.414-1.414Z"/><path d="M33,38H21a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2Z"/><path d="M22.586,24.056a2,2,0,0,0,2.828,0l3.849-3.849A4.222,4.222,0,0,0,24,13.666a4.222,4.222,0,0,0-5.263,6.541Zm-2.435-8.405a2.221,2.221,0,0,1,3.142,0,1,1,0,0,0,1.414,0,2.275,2.275,0,0,1,3.142,0,2.221,2.221,0,0,1,0,3.142L24,22.642l-3.849-3.849a2.221,2.221,0,0,1,0-3.142Z"/></g></g></svg>Benefícios</h3>' + e)), 

            0 < $(".name-field.Detalhes").length && (e = "<div class='box-tab-content'>" + (e = $(".value-field.Detalhes").html()) + "</div>", $(".box-tab.detalhes .wrapper").html('<h3 class="box-tab-title" data-aos="fade-up">Detalhes</h3>' + e)), 

            0 < $(".name-field.Para-que-serve").length && (e = "<div class='box-tab-content' data-aos='fade-up'>" + (e = $(".value-field.Para-que-serve").html()) + "</div>", 
            $(".box-tab.pra-que .wrapper").html('<h3 class="box-tab-title" data-aos="fade-up">Para que serve?</h3>' + e)), 
            
            0 < !$(".Especificacoes .name-field.Sugestao-de-Uso").length && 0 < !$(".Especificacoes .name-field.Ingredientes").length && 0 < !$(".Especificacoes .name-field.Modo-de-Preparo").length && 0 < !$(".Especificacoes .name-field.Peso").length && 0 < !$(".Especificacoes .name-field.Garantia").length && 0 < !$(".Especificacoes .name-field.Baixar-Manual-de-Montagem").length ? ($(".box-tab.espec").addClass("hide"), 
            
            $(".produto_informacoes_campos .left").addClass("fullWidth")) : $(".box-tab.espec .box-tab-content").append("<ul></ul>"), 0 < $(".Especificacoes .name-field.Sugestao-de-Uso").length && $(".box-tab.espec .box-tab-content ul").append('<li class=\'espec-Sugestao-de-Uso\'>Sugestao-de-Uso: <b>' + $(".Especificacoes .value-field.Sugestao-de-Uso").html() + "</b></li>"), 0 < $(".Especificacoes .name-field.Ingredientes").length && $(".box-tab.espec .box-tab-content ul").append('<li class=\'espec-Ingredientes\'>Ingredientes: <b>' + $(".Especificacoes .value-field.Ingredientes").html() + "</b></li>"), 0 < $(".Especificacoes .name-field.Modo-de-Preparo").length && $(".box-tab.espec .box-tab-content ul").append('<li class=\'espec-Modo-de-Preparo\'>Peso: <b>' + $(".Especificacoes .value-field.Peso").html() + "</b></li>"), 0 < $(".Especificacoes .name-field.Garantia").length && $(".box-tab.espec .box-tab-content ul").append('<li class=\'espec-garantia\'>Garantia: <b>' + $(".Especificacoes .value-field.Garantia").html() + "</b></li>"), 0 < $(".Especificacoes .name-field.Baixar-Manual-de-Montagem").length && $(".box-tab.espec .box-tab-content ul").append('<li class=\'espec-manual\'><a target=\'_blank\' href=\'' + $(".Especificacoes .value-field.Baixar-Manual-de-Montagem").html() + "'>BAIXAR MANUAL DE MONTAGEM</a></li>"), $(".produto_informacoes_campos > .left .box-tab-title").click(function() {
                $("+ .box-tab-content", this).slideToggle(), $(this).toggleClass("active")
            }), $(".box-tab.descricao .box-tab-title").trigger("click")
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
    
        init: function () {        
            code4Fit.stickyMenu();
            code4Fit.menuPrincipal();
            code4Fit.slidePrincipal();
            code4Fit.slidePrincipalMobile();
            code4Fit.carrosselInformativo();
            code4Fit.carrosselObjetivo();
            code4Fit.perguntasRespostas();
            code4Fit.produtosAvulsos();
            code4Fit.thumbImg();
            // code4Fit.qtdCart();
            code4Fit.aviseMe();
            //code4Fit.detalhesProduto();
            code4Fit.campoTabelaNutri();
            code4Fit.caracteristicasProd();
            code4Fit.calculaFrete();
            //code4Fit.toggleDescricao();
            code4Fit.verificaLogado();    
            code4Fit.prateleirasGerais();
            code4Fit.prateleirasDireita();
            code4Fit.sliderMarcas();
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
            //code4Fit.slidePrateleiraBusca();
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
            code4Fit.customProdDescription();
            code4Fit.openMiniCart();
            //code4Fit.addProductToMinicart();
            // code4Fit.buscaHeader();
        },
    }
    code4Fit.init();
});