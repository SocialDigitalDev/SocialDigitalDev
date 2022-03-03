
$(document).ready(function() {
    var scre = $("body").width();
    $(".helperComplement").remove();

    var codeLOJA = {

        menuPrincipal : function(){
            var settings = {
              "url": "/api/catalog_system/pub/category/tree/3/",
              "method": "GET",
              "headers": {
                "content-type": "application/json"
              }
            }
        
            $.ajax(settings).done(function (dataMenu) {

                var menu = $('.menu-principal');
                var LOJAMenu = dataMenu;

                $.each(LOJAMenu, function (i, field) {

                    menu.append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '?O=OrderByScoreDESC" title="' + field.name + '">' + field.name + '</a><div class="box-subMenu"><div class="container-center"><ul class="subCategoria"></ul></div></div></li>');

                    $(LOJAMenu[i].children).each(function (ii, el) {
                        var subCatId = LOJAMenu[i].children[ii].id;
                        var subCatNome = LOJAMenu[i].children[ii].name;
                        var subCatUrl = LOJAMenu[i].children[ii].url;
                        $('.cat-index-' + i).find('.subCategoria').append('<li id="' + subCatId + '" class="subItem"><a href="' + subCatUrl + '?O=OrderByScoreDESC" class="linkBy">' + subCatNome + '</a></li>');
                    });

                });

            });

            setTimeout(function(){
                $(".menu-principal > li > .box-subMenu").each(function(i){
                    var subMenu = $(this).find(".subItem").length;
                    if(subMenu < 1){
                        $(this).remove();
                    }else{
                        $(this).closest("li").addClass("subMenuTrue");
                    }

                    if ( scre > 769 ) {
                        thisLinks = $(this).find('li');
                        for(var i = 0; i < thisLinks.length; i+=9) {
                            thisLinks.slice(i, i+9).wrapAll("<span class='menuColuna'></span>");   
                        };
                    }
                });

            },1500);

        },

        menuMobile: function() {
            if (scre < 980) {

                $(".btn-menu-mobile").fadeToggle();

                setTimeout(function() {
                    $(".btn-menu-mobile").fadeToggle();
                    $(".btn-menu-mobile").click(function() {
                        $("body").toggleClass("aberto");
                    });

                    $(".menu-topo").after("<span class='menu-fechar'> </span>");

                    $(".menu-fechar").click(function() {
                        $("body").toggleClass("aberto");
                    });
                }, 2500);

                setTimeout(function() {
                    vtexjs.checkout.getOrderForm().done(function(orderForm) {
                        console.log(orderForm)
                        var userType = orderForm.userType;
                        var nome = (orderForm.clientProfileData !== null) ? orderForm.clientProfileData.firstName : '';
                        var email = (orderForm.clientProfileData !== null) ? (orderForm.clientProfileData.email !== null ? orderForm.clientProfileData.email.substring(0, 10) + '...' : 0) : '';
                        var logado = orderForm.loggedIn;

                        logado = orderForm.loggedIn;
                        if (logado) {
                            $(".menu-topo .menu-principal").prepend("<ul class='header-user'>" +
                                "<li class='header-user__name'><span class='icon-user'></span>Olá, " + (nome || email) + "</li>" +
                                "<li class='orders'><a href='/account/orders'>Meus Pedidos</a></li>" +
                                "<li class='login'><a href='/account'>Minha Conta</a></li>" +
                                "<li class='sair'><span class='icon-exit'></span><a href='/no-cache/user/logout'>Sair</a></span></li>" +
                                "</ul>");
                        } else {
                            $(".menu-topo .menu-principal").prepend("<ul class='header-user'>" +
                                "<li class='saudacao'><span class='user-login'></span> <a href='/login'>  Olá, Bem-vindo(a)!  <p>Entre ou Cadastre-se</p> </a> </li>" +
                                "<li class='orders'><a href='/account/orders'>Meus Pedidos</a></li>" +
                                "<li class='login'><a href='/account'>Minha Conta</a></li>" +
                                "</ul>");
                        }
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function() {
                        $(this).parent().find("ul").first().slideToggle();
                        $(this).parent().toggleClass("aberto");
                    });

                    /* Remove link caso tenha submenu  */
                    $(".menu-topo .menu-principal > li.itemMenu > a").removeAttr("href");
                   $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function(e) {
                        e.preventDefault();
                    });

                    $(".menu-topo .menu-principal > li.subMenuTrue .subMenuTrue").click(function() {
                        $(this).find("ul").first().slideToggle();
                        $(this).toggleClass("aberto");
                    });

                    $(".menu-topo .menu-principal").append("<div class='menu-atendimento'><li class='atendimento'>Atendimento:</li>" +
                        "<li class='telefone'><a href='http://api.whatsapp.com/send?1=pt_BR&phone=55111234567' target='_blank' rel='noopener'>(11) 1234-5678</a></li>" +
                        "<li class='horario'>10h às 17h de segunda a sexta</li></div>");


                }, 4000);
            }

            // Esta dando erro no popup de login
            // if ($(scre).width() < 500) {
            //     $('.menu-topo ul.menu-principal').append($('.menu-topo .menu-principal .menu-todos'));
            //     $('.menu-topo .menu-principal .menu-todos').one('click', function() {
            //         $(this).find('.all-dep').slideToggle();
            //     });
            // }

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
                        (e = e.replace(/ /g, "").replace("Olá", "").replace(".", "")), $("p.welcome").html("Olá " + e);
                    }

                    $('body').on('click',function(e){
                        if(document.getElementsByClassName('.link-help')[0]?!document.getElementsByClassName('.link-help')[0].contains(e.target):0)
                            $('.box-welcome').removeClass('ativo');
                    });
                    $(".link-help").click(function(){
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
            $(".LOJA-prateleira li").each(function() {
                var linkProd = $(this).find(".lead a").attr("href");
                $(this).find(".data .add a").attr("href", linkProd);
            });
        },

        slidePrincipal: function() {
            if ($("body").hasClass("LOJA-home")) {
                $('.slide-principal').slick({
                    dots: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000
                });

            }
        },

        slidePrincipalMobile: function() {
            if ($("body").hasClass("LOJA-home")) {
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
            if (scre < 980) {
                $('.informativos ul').slick({
                    infinite: false,
                    slidesToShow: 2,
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

        //Prateleiras Gerais
        prateleirasGerais: function() {
            if ($("body").hasClass("LOJA-home") || $("body").hasClass("LOJA-produto")) {
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
            if ($("body").hasClass("LOJA-home")) {
                $('.slide-prod .prat-right .LOJA-prateleira > ul').slick({
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
     
        slidePrateleiraProdutos: function() {
            if ($("body").hasClass("LOJA-produto")) {
                $('.slide-prod .LOJA-prateleira > ul').slick({
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
        //Slide prateleira Ofertas Busca Vazia
        slidePrateleiraBusca: function() {
            $('.slide-prod').each(function() {
                var slide = $(this).find('.LOJA-prateleira').length;
                if (slide > 0) {
                    $(this).find('.LOJA-prateleira > ul').slick({
                        infinite: true,
                        slidesToShow: 6,
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

        scrollInfinito: function() {
            // SCROLL DEPARTAMENTO
            if ($('body').hasClass('pg-scroll')) {
                var ulVazia = $('.search-single-navigator >ul');
                ulVazia.each(function() {
                    var estaUl = $(this);
                    if (estaUl.children().length < 1) {
                        estaUl.remove();
                    } else {
                        estaUl.prrwt().addClass('dropFiltro');
                    }
                });

                // Quantidade produtos retornados
                let qtdProd = parseInt($('.resultado-busca-numero:first >.value').text());
                if (qtdProd) {
                    $('.foundCollec').html('<strong>' + qtdProd + '</strong> ' + (qtdProd > 1 ? "Produtos encontrados" : "Produto encontrado"));
                }

                // Cria select e dispara o evento para o controle padrao.
                var selectOrder = $('.orderBy select').first();

                $('.contOrdenar li a').each(function() {
                    var liLink = $(this).attr('href');
                    var txtLink = $(this).text();
                    $(this).click(function(e) {
                        e.prrwtentDefault();
                        selectOrder.val(liLink);
                        selectOrder.trigger('change');
                    });
                });

                $('.boxFiltroOrder>h3').click(function() {
                    $('.contOrdenar').slideToggle();
                });
                $('.contOrdenar').mouseleave(function() {
                    $(this).fadeOut();
                });

                $(".search-multiple-navigator input[type='checkbox']").vtexSmartResearch({
                    authorizeScroll: function() { return false; },

                    loadContent: ".LOJA-prateleira[id^=ResultItems]",
                    shelfClass: ".LOJA-prateleira",
                    emptySearchMsg: '<h3>Esta combinação de filtros não retornou resultados!</h3>',

                    ajaxCallback: function() {

                        $('.helperComplement').remove();

                        $('.LOJA-prateleira[id*=ResultItems] meta[name=ROBOTS]').remove();

                        var maisProdutos = $('.LOJA-prateleira[id*=ResultItems] .LOJA-prateleira').next()
                            .contents()
                            .find('li');

                        //Adiciona os produtos(li) para primeira ul 
                        $('.LOJA-prateleira[id*=ResultItems] > .LOJA-prateleira ul').first()
                            .append(maisProdutos);

                    }
                });

                // Insere mensagem caso nao possua mais produtos
                $(window).on("Aviso", function() {
                    $(".pg-scroll #collections").after("<div class='noResults' style='margin:20px 0'><p>NÃ£o existem mais resultados</p></div>");
                });

                // Remove mensagem apÃƒÂ³s clicar em outro filtro
                $('.multi-search-checkbox').change(function() {
                    $('.noResults').remove();
                });
            }

        },

        //Mais produtos
        maisProds: function() {
            if ($('body').hasClass('pg-scroll')) {
                // $('.btnMoreRes').after('<div class="loadProd">VER MAIS</div>');
                var contTempo = 1;
                var tempo = 1000;

                $(".LOJA-prateleira[id*=ResultItems]").QD_infinityScroll({

                    callback: function() {
                        $('.helperComplement').remove();
                        $('.LOJA-prateleira[id*=ResultItems] meta[name=ROBOTS]').remove();

                        var maisProdutos = $('.LOJA-prateleira[id*=ResultItems] .LOJA-prateleira').contents('li');
                        //Adiciona os produtos(li) para primeira ul 
                        $('.LOJA-prateleira[id*=ResultItems] > .LOJA-prateleira ul').first().append(maisProdutos);


                        $('#collections .LOJA-prateleira li').before(function() {
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
            if ($("body").hasClass("LOJA-categoria") || $("body").hasClass("LOJA-departamento")) {
                //Termo buscado
                var categoria = vtxctx.categoryName;
                $(".nomeDepartamento h1").prepend(categoria);
                $(".descricao-categoria .titulo-descricao h3").prepend(categoria);
            }
        },
        // Filtro das cores Departamento
        depCores: function(){
            $('.search-single-navigator .Cor > li > a').each(function(){
                var cor = $(this).attr('title');
                var nomeCor = $(this).attr('title');
                nomeCor = nomeCor.replace(/[' ']/g,'_');
                $(this).addClass('filtro_'+nomeCor);
                $(this).html('<img src="/arquivos/filtro_' + nomeCor + '.jpg" alt="Cor '+cor+'" />');
                $(this).parent().addClass('filtro_'+nomeCor);
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

                $(this).html(valor + "%  OFF");
            });
        },

        descontoPrateleira: function () {
            $('.prateleira >ul li').each(function(){
                var valProd, valProdFormatado, valDesconto;
                valProd = $(this).find('.bestPrice').text()
                valProdFormatado = parseFloat(valProd.replace("R$", "").replace(".", "").replace(",", "."))
                valDesconto = valProdFormatado*5/100
                valDesconto = valDesconto.toFixed(2)
                valDesconto = valProdFormatado - valDesconto
                valDesconto = valDesconto.toFixed(2).replace(".", ",")
                $(this).find('.valBoleto-valor').prepend('R$' + valDesconto)
            })
        },
     

        // Desconto produto
        precoProd: function () {
            function descontoV(){
                var valProd, valProdFormatado, valPorcentagemDesconto, valDesconto;
                valProd = $("#produtoDivs-right .valor-por .skuBestPrice").text();
                valProdFormatado = valProd.replace("R$", "");
                valProdFormatado = valProdFormatado.replace(".", "");
                valProdFormatado = valProdFormatado.replace(",", ".");
                valProdFormatado = parseFloat(valProdFormatado);
                valPorcentagemDesconto = $('.detalhesProduto > .preco-desconto .valDesconto').text();
                valPorcentagemDesconto = parseFloat(valPorcentagemDesconto);
                valDesconto = valProdFormatado*valPorcentagemDesconto/100;
                valDesconto = valDesconto.toFixed(2);
                valDesconto = valProdFormatado - valDesconto;
                valDesconto = valDesconto.toFixed(2);
                valDesconto = valDesconto.replace(".", ",");
                $('.preco-desconto .valor').text(valDesconto);
                var descontoV = $('.detalhesProduto .preco-desconto').html();
                $('.descricao-preco .preco-desconto').remove();
                $('#produtoDivs-right .valor-por').after('<div class="preco-desconto">' + descontoV + '</div>');
                $('.preco-desconto').first().hide();
            }descontoV()

            $('#produtoDivs-right .sku-selector-container .select label').click(function(){
                setTimeout(function(){
                    descontoV()
                },500)
            })
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

        sliderVaiGostar: function() {
            if ($("body").hasClass("resultado-busca")) {
                $('.LOJA-prateleira ul').slick({
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
            if ($("body").hasClass("LOJA-home")) {
                $('.ofertas01 .LOJA-prateleira ul').slick({
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
            if ($("body").hasClass("LOJA-produto")) {
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

                if (scre > 980) {
                    $('.produto-all #produtoDiv-esquerda .apresentacao #show .thumbs').slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 5,
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
                $(".produto-all #produtoDiv-direita .LOJA-produto__buy-button .buy-button").click(function(event) {
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

            if ($("body").hasClass("LOJA-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("LOJA-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("LOJA-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        bannerProduto: function() {
            if ($("body").hasClass("LOJA-produto")) {
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
            if ($("body").hasClass("LOJA-categoria")) {
                var contDesc = $(".descricao-categoria .conteudo-descricao").html();
                if (contDesc.length < 1) {
                    $(".descricao-categoria").remove();
                }
            }
        },

        zoomProd: function() {
            $(window).load(function() {
                var janela = $(window).width();
                if ($("body").hasClass("LOJA-produto")) {

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

        compreJunto: function () {
            if ($("body").hasClass("ev-produto")) {

                // Clique bootao Comprar Junto
                setTimeout(function () {
                    $('.btn-batch-buy').off('click').click(function (event) {
                        event.preventDefault();
                        var hrefCart = $('.info-prod .comprar-prod .bt-comprar a').attr("href");
                        var qtd = 1;
                        var res = hrefCart.replace(/qty=1/, "qty=" + qtd);
                        var idSkuCJ = $('.slideCompreJunto .slick-active .buy-product-checkbox').attr('rel');
                        alert(idSkuCJ);

                        // //var resUTL = res.substring(res.lastIndexOf("sku=")+1,res.lastIndexOf("&qty="));
                        var resUTL = res.split("sku=").pop().split("&qty=").shift();
                        alert(resUTL);

                        setTimeout(function () {
                            vtexjs.checkout.getOrderForm().then(function () {
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
                                vtexjs.checkout.addToCart([item, itemDois]).done(function (orderForm) {
                                    alert('foi');
                                });
                            })
                        });
                    });
                }, 1500);

                function currencyFormatted(value, str_cifrao) {
                    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
                }

                Number.prototype.formatMoney = function (c, d, t) {
                    var n = this,
                        c = isNaN(c = Math.abs(c)) ? 2 : c,
                        d = d == undefined ? "." : d,
                        t = t == undefined ? "," : t,
                        s = n < 0 ? "-" : "",
                        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                        j = (j = i.length) > 3 ? j % 3 : 0;
                    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                };

                $('.slideCompreJunto .ev-prateleira>ul').on('setPosition', function (event, slick, direction) {
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



                var prodCompreJunto = $('.prodCompreJunt .ev-prateleira >ul');
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
                $('.slideCompreJunto .ev-prateleira>ul').after('<div class="juntoAction"><p><img src="/arquivos/equal-bup.png" /></p></div>');

                // Pega field que seleciona cada produto e colocar dentro da LI prodData
                var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

                prodCheck.each(function () {
                    var idCheck = $(this);

                    $('.slideCompreJunto .ev-prateleira .data').each(function () {
                        if ($(this).attr('data-id') == idCheck.attr('rel')) {
                            idCheck.prependTo($(this));
                        }
                    });
                });

                $('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

                $('.slideCompreJunto .ev-prateleira>ul').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false
                });

            }
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
        init: function() {
            //Geral
            //codeLOJA.calculaFrete();
            //codeLOJA.ocultaFrete();
            codeLOJA.qtdCart();
            codeLOJA. verificaLogado();
            codeLOJA.BuscaHeader();
            codeLOJA.menuPrincipal();
            codeLOJA.slidePrincipal();
            codeLOJA.slidePrincipalMobile();
            codeLOJA.carrosselInformativo();
            codeLOJA.prateleirasGerais();
            codeLOJA.slidePrateleiraMais();
            codeLOJA.slidePrateleiraProdutos();
            //codeLOJA.maisProds();
            codeLOJA.aplicaNomeCategoria();
            codeLOJA.depCores();
            codeLOJA.descPrat();
            dcodeLOJA.escontoPrateleira(); 
            codeLOJA.precoProd();
            codeLOJA.fixFrete();
            //codeLOJA.sliderVaiGostar();
            codeLOJA.slideOfertas();
            //codeLOJA.slidePrateleiraMais();
            codeLOJA.breadCrumb();
            //codeLOJA.bannerDepartamento();
            codeLOJA.bannerProduto();
            codeLOJA.thumbImg();
            codeLOJA.qtdProd();
            //codeLOJA.parcProd();  
            codeLOJA.descricaoCategoria();
            codeLOJA.zoomProd();
            //codeLOJA.slidePrateleiraBusca();
            codeLOJA.filtroMobile();
            codeLOJA.scrollInfinito();
            codeLOJA.newsletter();
            codeLOJA.compreJunto();
            codeLOJA.menuMobile();
            codeLOJA.institucional();
            codeLOJA.footerMobile();
            codeLOJA.faleConosco();
        }
    }
    codeLOJA.init();

});