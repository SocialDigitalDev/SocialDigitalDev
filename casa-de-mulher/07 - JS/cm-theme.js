$(document).ready(function() {
    var scre = $("body").width();
    $(".helperComplement").remove();
    
    function getMoney(str) {
        return parseInt(str.replace(/[\D]+/g, ""));
    }
    function formatReal(int) {
        var tmp = int + "";
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    
        return tmp;
    }

    var casaDeMulher = {
        menuPrincipal : function(){
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/api/catalog_system/pub/category/tree/3/",
                "method": "GET"
            }
    
            $.ajax(settings).done(function (dataMenu) {
    
                var menu = $('.menu-principal');
                var CasaMenu = dataMenu;
    
                $.each(CasaMenu, function (i, field) {
    
                    var idCategoria = field.id;
    
                    menu.append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '" title="' + field.name + '">' + field.name + '</a><div class="box-subMenu"><ul class="subCategoria"></ul></div></li>');
    
                    $(CasaMenu[i].children).each(function (ii, el) {
    
                        var subCatId = CasaMenu[i].children[ii].id;
                        var subCatNome = CasaMenu[i].children[ii].name;
                        var subCatUrl = CasaMenu[i].children[ii].url;
    
                        $('.cat' + idCategoria).find('.subCategoria').append('<li id="' + subCatId + '"class="subItem sub-index-' + subCatId + '"><a href="' + subCatUrl + '">' + subCatNome + '</a></li>');
    
                        
    
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

                    // if ( scre > 980 ) {
                    //     thisLinks = $(this).find('li');
                    //     for(var i = 0; i < thisLinks.length; i+=9) {
                    //         thisLinks.slice(i, i+9).wrapAll("<span class='menuColuna'></span>");   
                    //     };
                    // }
                });

            },1500);

        },

        menuMobile: function() {
            if (scre < 980) {
                $(".btn-menu-mobile").click(function() {
                    // $(".container-menu").slideToggle();
                    $("body").toggleClass("aberto")
                });
                $(".container-menu").after("<span class='menu-fechar'> </span>");
                $(".menu-topo").after("<span class='menu-mobile-close mob'>Close</span>");
                $(".menu-fechar, .menu-mobile-close").click(function() {
                    $("body").toggleClass("aberto")
                });
                $(".menu-topo .menu-principal").prepend("<li class='cart-mobile'><a href='/cart'> <span class='cart-topo__cart-icon'> </span> CARRINHO</a></li>");
                setTimeout(function() {
                    $(".menu-topo .menu-principal").append("<div class='menu_links-users'><li class='orders'><a href='/account/orders'>MEUS PEDIDOS</a></li>" + "<li class='account'><a href='/account'>MINHA CONTA</a></li>" + "<li class='login'><a href='/login'>ENTRAR</a></li></div>");
                    
                    $(".menu-topo .menu-principal > li.subMenuTrue > a").click(function(e) {
                        e.preventDefault()
                    });
                    $(".menu-topo .menu-principal > li.subMenuTrue").click(function() {
                        $(this).find("ul").slideToggle();
                        $(this).toggleClass("aberto")
                    })
                }, 2000)
            }
        },

        filtroMobile: function() {
            if (scre < 980) {
                $('.cm-categoria').append("<div class='open-filtro'>Filtrar</div>");
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
        verificaLogado: function() {
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                console.log(orderForm)
                var userType = orderForm.userType;
                var nome = (orderForm.clientProfileData !== null) ? orderForm.clientProfileData.firstName : '';
                var email = (orderForm.clientProfileData !== null) ? (orderForm.clientProfileData.email !== null ? orderForm.clientProfileData.email.substring(0, 10) + '...' : 0) : '';
                var logado = orderForm.loggedIn;

                logado = orderForm.loggedIn;
                if (logado) {
                    $(".icones-topo .account-topo").prepend("<ul class='header-user'>" +
                        "<li class='header-user__name'>Olá, " + (nome || email) + " | <a href='/no-cache/user/logout'>Sair</a></li>" +
                        "</ul>");
                } else {
                    $(".icones-topo .account-topo").prepend("<ul class='header-user'>" +
                        "<li class='login'><a href='/account'>Minha Conta</a></li>" +
                        "</ul>");
                }
                if (scre < 999) {
                    setTimeout(function() {
                        if (logado) {
                            $(".container-menu .menu-principal .menu_links-users > li.login").html('<a href="/no-cache/user/logout">SAIR</a>')
                        } else {
                            $(".container-menu .menu-principal .menu_links-users > li.login").html('<a href="/login">ENTRAR</a>')
                        }
                    }, 2000)
                }
            })
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
            $(".cm-shelf li").each(function() {
                var linkProd = $(this).find(".lead a").attr("href");
                $(this).find(".data .add a").attr("href", linkProd);
            });
        },

        slidePrincipal: function() {
            if ($("body").hasClass("cm-home")) {
                $('.slide-principal').slick({
                    dots: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 5000
                });

            }
        },

        slidePrincipalMobile: function() {
            if ($("body").hasClass("cm-home")) {
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ]
                });
            }
        },

        prateleirasRecomendacao: function() {
            if (scre < 500) {
                $('.prateleira-fixa ul').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                });
            }else if (scre < 1025){
                $('.prateleira-fixa ul').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false
                });
            }else{
                $('.prateleira-fixa ul').slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    dots: false
                });
            }
        },

        bannerCategorias: function() {
            if (scre < 770) {
                $('.banner-categoria .container-center').slick({
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
        },

        //Prateleiras Gerais
        prateleirasGerais: function() {
            if ($("body").hasClass("cm-home") || $("body").hasClass("cm-produto")) {
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
            if ($("body").hasClass("cm-home")) {
                $('.slide-prod .prat-right .cm-shelf > ul').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [{
                            breakpoint: 1370,
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
     
        slidePrateleiraProdutos: function() {
            if ($("body").hasClass("cm-produto")) {
                $('.slide-prod .cm-shelf > ul').slick({
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
                var slide = $(this).find('.cm-shelf').length;
                if (slide > 0) {
                    $(this).find('.cm-shelf > ul').slick({
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

                $(".cm-shelf[id*=ResultItems]").QD_infinityScroll({

                    callback: function() {
                        $('.helperComplement').remove();
                        $('.cm-shelf[id*=ResultItems] meta[name=ROBOTS]').remove();

                        var maisProdutos = $('.cm-shelf[id*=ResultItems] .cm-shelf').contents('li');
                        //Adiciona os produtos(li) para primeira ul 
                        $('.cm-shelf[id*=ResultItems] > .cm-shelf ul').first().append(maisProdutos);


                        $('#collections .cm-shelf li').before(function() {
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
            if ($("body").hasClass("cm-categoria") || $("body").hasClass("cm-departamento")) {
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
      
            $(".cm-shelf li").each(function() {
              let valorProd = getMoney(
                $(this)
                  .find(".price > a .best-price")
                  .text()
                  .replace("Por: ", "")
                  .trim()
              );
              valorDescProd = (valorProd.toFixed(2) * 5) / 100;
              valorfinal = valorProd - parseFloat(valorDescProd);
              $(this)
                .find(".best-price")
                .after(
                  '<span class="preco-boleto"><b>R$' +
                    formatReal(valorfinal.toFixed(0)) +
                    "</b> à vista no boleto</span>"
                );
            });
        },
      
        descProd: function() {
            if ($("body").hasClass("cm-produto")) {
              valorProd = getMoney($(".valor-por.price-best-price strong").text());
              valorDescProd = (valorProd.toFixed(2) * 5) / 100;
              valorfinal = valorProd - parseFloat(valorDescProd);
              $(".valor-por.price-best-price").after(
                '<div class="preco-boleto"> <b>R$' +
                  formatReal(valorfinal.toFixed(0)) +
                  "</b> <span>à  vista no boleto</span></div>"
              );
            }
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
                $('.cm-shelf ul').slick({
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
            if ($("body").hasClass("cm-home")) {
                $('.ofertas01 .cm-shelf ul').slick({
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
        thumbImg: function() {
            if ($("body").hasClass("cm-produto")) {
                //var video = $(".infos-prod .infos-left .especificacao-prod table tr td.Videos").html();
                // console.log(video);

                // if (video !== undefined) {
                //     $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs").append("<li class='video'><img src='/arquivos/video-prod.jpg' alt='video'/></li>");

                //     $(".produto-all #produtoDiv-esquerda .apresentacao #show #include #image-main, .produto-all #produtoDiv-esquerda .apresentacao #show #include #image").append(video);

                //     $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs li").click(function() {
                //         if ($(this).hasClass("video")) {
                //             $(".produto-all #produtoDiv-esquerda .apresentacao #show #include iframe").fadeIn();
                //             $(".produto-all #produtoDiv-esquerda .apresentacao #show .thumbs li .ON").removeClass("ON");
                //         } else {
                //             $(".produto-all #produtoDiv-esquerda.apresentacao #show #include iframe").fadeOut();
                //         }
                //     });
                // }

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
                    $(".cm-produto .qtdPrateleira .btnAcr").click(function() {

                        var atual = parseInt($(this).prev(".qtdVal").val());
                        //console.log(atual)
                        atual = atual + 1;
                        $(this).prev(".qtdVal").val(atual);
                    });

                    $(".cm-produto .qtdPrateleira .btnDec").click(function() {
                        var atual = parseInt($(this).next(".qtdVal").val());
                        if (atual == 1) {
                            $(this).next(".qtdVal").val("1");
                        } else {
                            atual = atual - 1;
                            $(this).next(".qtdVal").val(atual);
                        }
                    });

                    $(".cm-produto .qtdPrateleira .qtdVal").bind("keyup blur focus", function(e) {
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

            if ($("body").hasClass("cm-404")) {
                $(".sistema .breadCrumb ul li").after('<li> 404 </li>');
            } else if ($("body").hasClass("cm-500")) {
                $(".sistema .breadCrumb ul li").after('<li> 500 </li>');
            } else if ($("body").hasClass("cm-buscavazia")) {
                $(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
            } else if ($("body").hasClass("resultado-busca")) {
                $(".breadCrumb ul li").after('<li> Resultado de busca </li>');
            }
        },

        bannerProduto: function() {
            if ($("body").hasClass("cm-produto")) {
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
                if ($("body").hasClass("cm-produto")) {

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
            if ($("body").hasClass("cm-produto")) {

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

                $('.slideCompreJunto .cm-shelf>ul').on('setPosition', function(rwtent, slick, direction) {
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



                var prodCompreJunto = $('.prodCompreJunt .cm-shelf >ul');
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
                $('.slideCompreJunto .cm-shelf>ul').after('<div class="juntoAction"><p><img src="/arquivos/equal-bup.png" /></p></div>');

                // Pega field que seleciona cada produto e colocar dentro da LI prodData
                var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

                prodCheck.each(function() {
                    var idCheck = $(this);

                    $('.slideCompreJunto .cm-shelf .data').each(function() {
                        if ($(this).attr('data-id') == idCheck.attr('rel')) {
                            idCheck.prependTo($(this));
                        }
                    });
                });

                $('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

                $('.slideCompreJunto .cm-shelf>ul').slick({
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
            if ($("body").hasClass("cm-home")) {
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
            // $(window).width() < 420	
            //     ? e.on("click", function () {	
            //           location.href = "/checkout";	
            //       })	
            //     : 
                e.on("click", function () {	
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
        verifyDelimitedValue: function() {
            return setTimeout((function() {
                var subTotal = vtexjs.checkout.orderForm.totalizers;
                var newSubTotal = subTotal[0].value;
                    if (newSubTotal < 20000) {
                        $('.goToCart').css('pointer-events', 'none').css('background', '#ccc').text('Mínimo R$200,00 para fechar');
                    }else{
                        $('.goToCart').css('pointer-events', 'auto').css('background', '#834253').text('Finalizar Compra');
                    }
            }
            ), 3000),
            this
        },
        inputsChange: function() {
            $(document).on("click", ".qtd-remove, .qtd-adiciona", (function() {
                    casaDeMulher.verifyDelimitedValue();
            }));
        },
        qtdVitrine: function() {
            setTimeout(function() {
                $(".cm-shelf .qtdPrateleira .btnAcr").click(function() {
                   var qtd = $(this).parent().find('.qtdVal').val();
                    if ( qtd < 300 ){
                        qtd++;
                        $(this).parent().find('.qtdVal').val(qtd);
                    }
                });
    
                $(".cm-shelf .qtdPrateleira .btnDec").click(function() {
                   var qtd = $(this).parent().find('.qtdVal').val();
                    if ( qtd > 1 ){
                        qtd--;
                        $(this).parent().find('.qtdVal').val(qtd);
                    }
                });
    
                $(".cm-shelf .qtdPrateleira .qtdVal").bind("keyup blur focus", function(e) {
                    e.preventDefault();
                    var expre = /[^\d]/g;
                    $(this).val($(this).val().replace(expre, ''));
                });
            }, 200);
        },
        // colorsVariationInShelfs: function () {
        //     $(".cm-shelf .cm-product").not(".cm-ajax-completed").each(function (index, el) {
        //         var _element = $(this);
        //         _element.addClass("cm-ajax-completed"), _element.find(".cm-color-wrap").append('<ul class="cm-color-list"></ul>');
        //         var _product_id = _element.find(".cm-id").val();
        //         $.ajax({
        //             type: "GET",
        //             url: "/api/catalog_system/pub/products/search/?fq=productId:" + _product_id,
        //             success: function (_product_infos) {
        //                 var newSku = _product_infos[0].items;
        //                 for (var i = 0; i < newSku.length; i++){
        //                     var skuReady = newSku[i].itemId;
        //                     var _color_name = newSku[i].Cor;
        //                     _element.find(".cm-color-list").prepend('<li class="' + _color_name + '" data-id="'+ skuReady +'">' + _color_name + "</li>");
        //                 }
        //             },
        //         });
        //     });
        // },
        // clickVariationsShelf: function () {
        //     $(document).on("click", ".cm-color-list li", function () {
        //         $(this).parent().find("li").removeClass("cm-active"), $(this).addClass("cm-active");

        //     }),
        //     $(document).on("click", ".cm-product .cm-buy-button", function () {
              
        //         var _sku = $('.cm-product').parent().find(".cm-active");
        //         var _qtd = $(this).parent().find(".qtdVal");
        //         if (_sku.length) {
        //             var item = { 
        //                 id: _sku.attr("data-id"), 
        //                 quantity: _qtd.val(),
        //                 seller: "1" 
        //             };
        //             console.log(item);
        //             vtexjs.checkout.addToCart([item]).done(function (orderForm) {
        //                     $(".header-minicart").addClass("open"),
        //                     setTimeout(function () {
        //                         $(".header-minicart").removeClass("open");
        //                     }, 5e3);
                            
        //             });
        //             _sku.removeClass('cm-active');
        //         } else alert("Selecione uma cor.");
        //     });
        // },
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
                casaDeMulher.verificaValorFreteGratis();
            }
            ))
        },
        init: function() {
            //Geral
           
            casaDeMulher.qtdCart();
            casaDeMulher.verificaLogado();
            casaDeMulher.BuscaHeader();
           
            casaDeMulher.slidePrincipal();
            casaDeMulher.slidePrincipalMobile();
            casaDeMulher.carrosselInformativo();
            casaDeMulher.prateleirasGerais();
            casaDeMulher.prateleirasRecomendacao();
            casaDeMulher.bannerCategorias();
            casaDeMulher.slidePrateleiraMais();
            casaDeMulher.slidePrateleiraProdutos();
            casaDeMulher.slideMarcas();
            casaDeMulher.aplicaNomeCategoria();
            casaDeMulher.descPrat();
            casaDeMulher.descProd();
            casaDeMulher.fixFrete();
            casaDeMulher.slideOfertas();
            casaDeMulher.breadCrumb();
            casaDeMulher.bannerProduto();
            casaDeMulher.thumbImg();
            casaDeMulher.qtdProd();
            casaDeMulher.descricaoCategoria();
            casaDeMulher.zoomProd();
            casaDeMulher.filtroMobile();
            casaDeMulher.newsletter();
            // casaDeMulher.compreJunto();
            casaDeMulher.menuMobile();
            casaDeMulher.institucional();
            casaDeMulher.footerMobile();
            casaDeMulher.faleConosco();
            casaDeMulher.openMiniCart();
            casaDeMulher.addProductToMinicart();
            // casaDeMulher.verifyDelimitedValue();
            // casaDeMulher.inputsChange();
            casaDeMulher.verificaValorFreteGratis();
            casaDeMulher.verificaAdicaoSubtracaoCart();
            // casaDeMulher.qtdVitrine();
            // casaDeMulher.clickVariationsShelf();
        },
        init_ajax: function(){
            casaDeMulher.menuPrincipal();
            // casaDeMulher.colorsVariationInShelfs();
        }
    }
    casaDeMulher.init_ajax();
    casaDeMulher.init();
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