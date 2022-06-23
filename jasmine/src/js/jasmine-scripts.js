body = $("body"),
$(document).ready(function () {
	var scre = $("body").width();
	$(".helperComplement").remove();

	var Jasmine = {

		menuMobile: function () {
			if (scre < 980) {

				setTimeout(function () {
					
					$(".menu").after("<span class='menu-fechar'>  </span>");

					$(".menu-fechar").click(function () {
						$("#overlay, .navbar").toggleClass("active");
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
							$(".header .menu").prepend("<ul class='header-user'>" +
								"<li class='header-user__name'><span class='icon-user'></span>Olá, " + (nome || email) + "</li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"<li class='sair'><span class='icon-exit'></span><a href='/no-cache/user/logout'>Sair</a></span></li>" +
								"</ul>");
						} else {
							$(".header .menu").prepend("<ul class='header-user'>" +
								"<li class='saudacao'> <a href='/login'> Login / Cadastrar </a> </li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"</ul>");
						}
					});

				}, 4000);
			}
		},
		sliderMenu: function () {
            // Imagens do menu
            setTimeout(function () {
                var imgMenu = [];

                imgMenu[0] = $('.pratQueridinhos');
                //imgMenu[1] = $('.imgOrganico');
                //imgMenu[2] = $('.imgSemgluten');
                //imgMenu[3] = $('.imgZeroacucar');
                //imgMenu[4] = $('.imgRoupas');

                $('.menu_desktop .shopnav .imageMenu').html(imgMenu[0]);
               	//$('.shopnav .shopnav-inner .level1 li .level2 .imageMenu').html(imgMenu[1]);
                //$('.shopnav .shopnav-inner .level1 li .level2 .imageMenu').html(imgMenu[2]);
                //$('.shopnav .shopnav-inner .level1 li .level2 .imageMenu').html(imgMenu[3]);
                //$('.menu-principal .cat-index-4 .imageMenu').html(imgMenu[4]);

                var prateMenu = $('.imageMenu .prateleira >ul');

                /*prateMenu.slick({
                    infinite: false,
                    speed: 800,
                    slidesToShow: 2,
                    slidesToScroll: 2
                });

                $('.menu-principal .itemMenu').hover(function () {
                    $('.imageMenu .prateleira >ul').slick('setPosition');
                });*/

            }, 500);
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

		slidePrincipal: function () {
			if ($("body").hasClass("jasmine-home")) {
				$('.slide-principal').slick({
					dots: true,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					speed: 1000,
					easing: 'linear',
					fade: true,
					cssEase: 'linear',
					lazyLoad: 'ondemand'
				});
			}
		},

		slidePrincipalMobile: function () {
			if ($("body").hasClass("jasmine-home")) {
				$('.slide-mobile').slick({
					dots: false,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					speed: 1000,
					easing: 'linear',
					fade: true,
					cssEase: 'linear',
					lazyLoad: 'ondemand',
				});

			}
		},
		CategoriasHome: function () {
			if (scre < 980) {
				$('.main_categorias ul').slick({
					infinite: true,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: true,
					responsive: [
						{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							arrows: false,
							dots: true,
							centerPadding: '40px',
							infinite: true
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							arrows: false,
							dots: false,
							centerPadding: '40px',
							infinite: true
						}
					}
					]
				});
			}
		},
		ofertasBanners: function () {
			if (scre < 980) {
				$('.main_ofertas .jasmine-prateleira').slick({
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: true,
					responsive: [
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerMode: true,
								arrows: false,
								dots: true,
								infinite: true,
								centerPadding: "30px"
							}
						}
					]
				});
			}
		},
		pratMaisVendidos: function () {
			$('.main_vendidos .jasmine-prateleira .prateleira > ul').slick({
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 5,
				lazyLoad: 'ondemand',
				responsive: [
					{
						breakpoint: 1300,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: false
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							centerMode: true,
							centerPadding: "30px",
							arrows: false,
							dots: true,
							infinite: true
						}
					},
					{
						breakpoint: 400,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							centerPadding: "130px",
							arrows: false,
							dots: true,
							infinite: true
						}
					}
				]
			});
		
		},

		pratNovidades: function () {
				$('.main_novidades .jasmine-prateleira .prateleira > ul').slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 5,
					dots: true,
					responsive: [
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 5,
								slidesToScroll: 5,
								infinite: false
							}
						},
						{
							breakpoint: 1360,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4,
								infinite: false
							}
						},
						{
							breakpoint: 980,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: false
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: true
							}
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: "30px",
								arrows: false,
								dots: true,
								infinite: true
							}
						},
						{
							breakpoint: 400,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: "130px",
								arrows: false,
								dots: true,
								infinite: true
							}
						}
					]
				});
			
		},
		
		pratParaCozinhar: function () {
			if (scre > 980) {
				$('.main_cozinhar .jasmine-prateleira .prateleira-cozinhar > ul').slick({
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: true,
					responsive: [
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: false
							}
						},
						{
							breakpoint: 1360,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: false
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
							breakpoint: 769,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
								infinite: true
							}
						},
						{
							breakpoint: 640,
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

		receitasMomentos: function () {
			if (scre < 767) {
					$('.prateleira-receitas > ul').slick({
						infinite: false,
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: true,
						responsive: [{
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
		discountPercentage: function() {
            if ($(".skuListPrice").length) {
                var e = limpa_valor_dinheiro($(".skuListPrice").html()),
                    a = limpa_valor_dinheiro($(".skuBestPrice").html()),
                    t = parseInt(100 * a / e - 100);
                $(".promo-flag-wrap").html(t + "%")
            } else $(".promo-flag-wrap").css("display", "none")
        },
		//Slide prateleira Ofertas Busca Vazia
		slidePrateleiraBusca: function () {
			$('.jasmine-busca-vazia .slide-prod').each(function () {
				var slide = $(this).find('.prateleira').length;
				if (slide > 0) {
					$(this).find('.prateleira > ul').slick({
						infinite: true,
						slidesToShow: 5,
						slidesToScroll: 1,
						lazyLoad: 'ondemand',
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

		filtroMobile: function () {
			if (scre < 980) {
				$('.btn-filtro').click(function () {
					$(this).toggleClass('setaDown');
					$('.menu-departamento').slideToggle();
				});
				var qtdFiltro = $('.filtrosDepartamento .search-multiple-navigator').length;
				if (qtdFiltro > 0) {
					$('.filtrosDepartamento .search-multiple-navigator').hide();
					$('.search-multiple-navigator h3').click(function () {
						$(this).toggleClass('aberto');
						$('.search-multiple-navigator fieldset>div').slideToggle();
					});
	
				} else {
	
				}
			}
		},
		sidebarDepartamento: function(){
			if ($("body").hasClass("jasmine-departamento")) {
				if(scre < 980){
					function animaScroll(){
						var documentTop = $(window).scrollTop(),
							sidebar = $(".filtro-sticky"),
							sidebarBox = $(".filtro-sticky"),
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
		abreFechaFiltroMobile: function() {
			if (scre <= 980) {
				$('.resultado-busca-filtro').prepend('<div class="menuMobile-button">Filtrar Por</div>');
				$('.filtro-sticky').prepend('<p class="menuMobile-close">X</p>');
				$('.menuMobile-button').click(function(){
					$('.filtro-sticky').addClass('filtroSticky-open');
				});
				$('.menuMobile-close').click(function(){
					$('.filtro-sticky').removeClass('filtroSticky-open');
				});
			}
		},
		filtroCategoria: function () {
			if ($("body").hasClass("jasmine-departamento") || $("body").hasClass("categoria")) {
				$(".search-single-navigator h5").click(function () {
					$(this).next("ul").slideToggle();
					$(this).toggleClass("aberto");
				});
				$(".search-single-navigator h3").click(function () {
					$(this).toggleClass("fechado");
					if ($(this).next('ul').has('li').length > 0) {
						$(this).find('a').removeAttr('href');
						$(this).next("ul").slideToggle();
					}
				});
				// $(".search-multiple-navigator fieldset label input").click(function() {
				//     $(".search-multiple-navigator .bt-refinar").click()
				// })
			} else if ($("body").hasClass("resultado-busca")) {
				$(".resultado-busca .search-single-navigator h3").click(function (e) {
					e.preventDefault();
					$(this).next("ul").slideToggle();
					$(this).toggleClass("aberto")
				})
			}
			$(".filtrosDepartamento .search-single-navigator ul").each(function() {
                var e = $(this).html().length;
                0 != e && 1 != e || ($(this).addClass("noUl"), 
					$(this).parent().addClass("removePlus"), 
                	$(this).prev().prev(".btFilter").remove())
            }), 

            $(".filtrosDepartamento .search-single-navigator h4").each(function() {
                0 == $("ul", this).length && ($(this).addClass("removePlus"), $(this).children(".btFilter").remove())
            });
		},
	
		// Nome Departamento Categoria
		aplicaNomeCategoria: function () {
			if ($("body").hasClass("jasmine-categoria") || $("body").hasClass("jasmine-departamento")) {
				//Termo buscado
				var categoria = vtxctx.categoryName;
				$(".nomeDepartamento h1").prepend(categoria);
				$(".descricao-categoria .titulo-descricao h3").prepend(categoria);
			}
		},

		productDescriptionTabs: function () {
			var tabs = $('.jasmine-description__navigation li');
			var container = $('.jasmine-description__item');
			tabs.eq(0).addClass('is--active');
			container.eq(0).addClass('is--active');
			tabs.on('click', function() {
				var target = $(this).attr('data-description');
				if (!$(this).hasClass('is--active')) {
					tabs.removeClass('is--active');
					container.slideUp();
					setTimeout(()=>{
						$(this).addClass('is--active');
						$('#' + target).slideDown()
					}
					, 500)
				}
			})
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
            // usa ou não
            // $.ajax(t).done(function(e) {
            //     console.log(e);
            // var t = e;
            // $.each(t, function(e, t) {
            //     switch (t.Id) {
            //         case 20:
            //             "" != t.Value && ($(".prod-beneficios").removeClass("hideElement"), 
            //             $(".prod-beneficios").html("<span>Benefícios do produto: </span><p>" + t.Value + "</p>"));
            //             break;
            //         case 23:
            //             "" != t.Value && ($(".prod-importante").removeClass("hideElement"), $(".prod-importante").html("<span>Importante</span><p>" + t.Value + "</p>"));
            //             break;
            //         case 30:
            //             if ("" != t.Value)
            //                 for ($(".prod-caracteristicas").removeClass("hideElement"), $(".prod-caracteristicas").html("<p>CaracterÃ­sticas do Produto</p><ul></ul>"), e = 0; e < t.Value.length; e++) {
            //                     var a = t.Value[e];
            //                     a = (a = a.toString().replace(/[^a-zA-Z ]/g, "")).replace(/\s/g, "-").toLowerCase(), $(".prod-caracteristicas ul").append("<span class='" + a + "'>" + t.Value[e] + "</span>")
            //                 }
            //             break;
            //         case 22:
            //             "" != t.Value && ($(".prod-laudo").removeClass("hideElement"), $(".prod-laudo").html("<h3>Laudo TÃ©cnico</h3><a href='" + t.Value + "'>Clique aqui para fazer o donwload do laudo tÃ©cnico</a>"));
            //             break;
            //         case 24:
            //             "" != t.Value && ($(".prod-ingredientes").removeClass("hideElement"), $(".prod-ingredientes").html("<h4>Ingredientes</h4><p>" + t.Value + "</p>"));
            //             break;
            //         case 25:
            //             "" != t.Value && ($(".prod-retricao").removeClass("hideElement"), $(".prod-retricao").html("<h4>RestriÃ§Ã£o Alimentar</h4><p>" + t.Value + "</p>"));
            //             break;
            //         case 26:
            //             "" != t.Value && ($(".prod-recomendacao").removeClass("hideElement"), $(".prod-recomendacao").html("<h4>RecomendaÃ§Ã£o de Consumo</h4><p>" + t.Value + "</p>"))
            //         }
            //     })
            // }).done(function() {
            //     $(".hideElement").remove()
            // })
        },
		calculaFrete: function () {
			function formatReal(int) {
				var tmp = int + '';
				tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
				if (tmp.length > 6)
					tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
				return tmp;
			}

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

				//retorna seleÃƒÂ§ÃƒÂ£o de campo cep para inicio
				$('#txtCep').on('focus click', function () {
					$(this)[0].setSelectionRange(0, 0);
				});
			});
		},

		sliderVaiGostar: function () {
			if ($("body").hasClass("resultado-busca")) {
				$('.jasmine-prateleira ul').slick({
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

		prateleiraPDP: function () {
			if ($("body").hasClass("jasmine-produto")) {
				$('.slide-prod .prateleira ul').slick({
					infinite: true,
					slidesToShow: 5,
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
					},
					{
						breakpoint: 320,
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
            if ($("body").hasClass("jasmine-produto")) {
               
                    $('.jasmine-produto .img-produto .apresentacao .thumbs').slick({
                        infinite: false,
                        vertical: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
						responsive: [{
							breakpoint: 1290,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1,
								infinite: true,
								vertical: true
							}
						},
						{
							breakpoint: 980,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						},
						{
							breakpoint: 630,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						},
						{
							breakpoint: 320,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						}
						]
                    });
               
            }
        },

		
		ofertaLimitada: function () {
			if (scre < 980) {
					$('.oferta-limitada .jasmine_kits .prateleira ul').slick({
						infinite: false,
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: true,
						responsive: [{
							breakpoint: 767,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
							}
						}
						]
					});
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
                $(".jasmine-produto-dados .jasmine-hover-content .jasmine-buy .add a").click(function() {
                    event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parents().eq(4).find(".qtdPrateleira .qtdVal").val();
                    if (qtd == "") {
                        qtd = "1"
                    }
                    var res = hrefCart.replace("qty=1", "qty=" + qtd);
                    var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
					//console.log(resUTL);
					//console.log(qtd);
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
								console.log(item);
								console.log(orderForm);
                                $(".header-minicart").addClass("open"),
									setTimeout(function () {
										$(".header-minicart").removeClass("open");
									}, 5e3);
                            	});
                        });
                    });
                });
				
                // Prod
                $(".produto-all #produtoDiv-direita .jasmine-produto__buy-button .buy-button").click(function(event) {
                //event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parents().eq(4).find(".qtdPrateleira .qtdVal").val();

                    if (qtd == "") {
                        qtd = "1";
                    }

                    // if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                    //     alert('Por favor, selecione o modelo desejado.');
                    // } else {

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
                    //}
                });
				//Adicionar ao carrinho
				$(".bt-adicionar-carrinho").click(function(event) {
                    event.preventDefault();
                    var hrefCart = $(".produto-all #produtoDiv-direita .jasmine-produto__buy-button .buy-button").attr("href");
                    var qtd = $(".jasmine-produto__buy-quant").find(".qtdPrateleira .qtdVal").val();

                    if (qtd == "") {
                        qtd = "1";
                    }

					var res = hrefCart.replace("qty=1", "qty=" + qtd);
					var hrefCart = $(".produto-all #produtoDiv-direita .jasmine-produto__buy-button .buy-button").attr("href");
					console.log(hrefCart);
					var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
					//console.log(resUTL);
					setTimeout(function() {
						vtexjs.checkout.getOrderForm().then(function() {
							item = {
								id: resUTL,
								quantity: qtd,
								seller: "1"
							};
							vtexjs.checkout.addToCart([item]).done(function(orderForm) {
								
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
                    
                });

            }
        },

		breadCrumb: function () {
			$(".breadCrumb ul li").first().find("a").text("Home");

			if ($("body").hasClass("jasmine-404")) {
				$(".sistema .breadCrumb ul li").after('<li> 404 </li>');
			} else if ($("body").hasClass("jasmine-500")) {
				$(".sistema .breadCrumb ul li").after('<li> 500 </li>');
			} else if ($("body").hasClass("jasmine-buscavazia")) {
				$(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
			} else if ($("body").hasClass("resultado-busca")) {
				$(".breadCrumb ul li").after('<li> Resultado de busca </li>');
			}
		},

		descricaoCategoria: function () {
			if ($("body").hasClass("jasmine-categoria")) {
				var contDesc = $(".descricao-categoria .conteudo-descricao").html();
				if (contDesc.length < 1) {
					$(".descricao-categoria").remove();
				}
			}
		},

		zoomProd: function () {
			$(window).load(function () {
				var janela = $(window).width();
				if ($("body").hasClass("produto")) {
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
							$(".newsletter__form").html("<p id='msgSucesso'>Pronto. Em breve você receberá nossas novidades!</p>");
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
				$(".footer .footer-items h3").click(function () {
					$(this).next("ul").slideToggle();
					$(this).toggleClass("open");
				});

				// $(".footer .footer-items h3").click(function() {
				//     $(this).parent().find("ul").slideToggle();
				//     $(this).toggleClass("aberto");
				// });
			}
		},

		placeholderFrete: function () {
			$(window).load(function () {
				$(".calc-frete .cep fieldset .prefixo .fitext").attr("placeholder", "Informe seu CEP:");
			});
		},

		ocultaFrete: function () {
			if ($('.sku-notifyme').attr('style')) {

			} else {
				$('.calc-frete').hide();
			}
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
			var e = $(".header-cart span"),
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
					$(".jasmine-buy-button").removeClass("loading");
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
		addProductToMinicart: function () {
			var _button = $('.jasmine-buy-button');

			_button.click(function (ev) {
				var _buttonLink = _button.attr('href');
				if (_buttonLink.indexOf('javascript:alert') == -1) {
					ev.preventDefault();
					var _sku = $('.jasmine-buy-button').attr('href').split('sku=')[1].split('&')[0];
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

		buscaMobile: function () {
			$('.busca-mobile-ico').click(function () {
				$('.busca-topo__busca-container').slideToggle();
			});
		},

		recarregaPagina: function () {
			setTimeout(function () {
				$('.pages .page-number, .pages .first, .pages .previous, .pages next, .pages .last').click(function () {
					location.reload(true);
				});
			}, 1000);
		},
		
		verificaWishList: function () {
			var skuId = [];
			var localItem = localStorage.getItem('wishListActive');
			if ($('body').hasClass('jasmine-produto')){
				var pdpWLlink = $('.buy-button').attr('href');
				var splitWLlink =  pdpWLlink.split('/checkout/cart/add?sku=');
				var splatWLlink = splitWLlink[1].split('&qty=1&seller=1&redirect=true&sc=1');
				var pdpSkuId = splatWLlink[0];
				$('.glis-popup-link').click(function(){
					if ($('body').hasClass('loginOn')) {
						$(this).addClass('wishListActive');
						skuId.push(pdpSkuId);
						localStorage.setItem('wishListActive', `${localItem},${skuId}`);
					}
				});
			}
			setTimeout(function(){
				var newLocalItem = localItem.split(',').map(x=>{return parseInt(x)});
				for (var i = 0; i <= newLocalItem.length; i++) {
					$(`.prateleira > ul li.${newLocalItem[i]}, .prateleira-cozinhar > ul li.${newLocalItem[i]}`).find('.productWishlist').addClass('wishListActive');
					if (pdpSkuId == newLocalItem[i] && $('body').hasClass('loginOn')) {
						$('.glis-popup-link').addClass('wishListActive');
					}
				}
			}, 2000);
			$('.prateleira > ul li, .prateleira-cozinhar > ul li').each(function(){
				var newSkuId = $(this).find('.jasmine-sku').val();
				$(this).addClass(`${newSkuId}`);
				if (newSkuId !== undefined) {
					$(this).find('.productWishlist').click(function(){
						if ($('body').hasClass('loginOn')){
							$(this).addClass('wishListActive');
							skuId.push(newSkuId);
							localStorage.setItem('wishListActive', `${localItem},${skuId}`);
						}else{
							alert('Você precisa estar logado para adicionar produtos à lista');
						}
					});
				}
			});
		},
		compreJunto: function () {
            if ($("body").hasClass("jasmine-produto")) {

                // Clique bootao Comprar Junto
                setTimeout(function () {
                    $('.btn-batch-buy').off('click').click(function (event) {
                        event.preventDefault();
                        var hrefCart = $('.jasmine-produto__buy-button a').attr("href");
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

                $('.slideCompreJunto .jasmine-prateleira>ul').on('setPosition', function (event, slick, direction) {
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

                var prodCompreJunto = $('.prodCompreJunt .jasmine-prateleira >ul');
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
                $('.slideCompreJunto .jasmine-prateleira>ul').after('<div class="juntoAction"><p><img src="/arquivos/equal-bup.png" /></p></div>');

                // Pega field que seleciona cada produto e colocar dentro da LI prodData
                var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

                prodCheck.each(function () {
                    var idCheck = $(this);

                    $('.slideCompreJunto .jasmine-prateleira .data').each(function () {
                        if ($(this).attr('data-id') == idCheck.attr('rel')) {
                            idCheck.prependTo($(this));
                        }
                    });
                });

                $('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

                $('.slideCompreJunto .jasmine-prateleira>ul').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false
                });

            }
        },
		buyTogether: function() {
            $(".product-buy-together #divCompreJunto").html().length || $(".product-buy-together").addClass("hide"), {
                init: function() {
                    this.getProductA(), this.getProductB(), this.getPrices(), this.produtoCompreJunto(), this.setPrice()
                },
                getProductA: function() {
                    let e = document.querySelector(".itemA");
                    if (!e) return;
                    let a = e.querySelector("a").getAttribute("href"),
                        t = e.querySelector("a > img").getAttribute("src"),
                        o = e.querySelector("h3 > a").innerHTML,
                        r = "";
                    r += '<div class="compreJunto__wrapper">', r += `<a class="compreJunto__image" href="${a}">\n        <img src="${this.changeImageSize(t)}" alt="${o}"/>\n </a>`, r += `<h3 class="compreJunto__prod-title">\n <a href="${a}">${o}</a>\n</h3>`, r += '<div class="compreJunto__price">\n <small class="compreJunto-bestPrice"></small>\n        </div>', r += "</div>", this.render(".compreJunto__itemA", r)
                },
                getProductB: function() {
                    let e = document.querySelectorAll(".itemB");
                    [].forEach.call(e, e => {
                        e.parentNode.querySelector(".buy").textContent.split("Valor total:")[1].trim().split(" ")[1], e.querySelector(".itemA");
                        let a = e.querySelector("a").getAttribute("href"),
                            t = e.querySelector("a > img").getAttribute("src"),
                            o = e.querySelector("h3 > a").innerHTML,
                            r = "";
                        r += '<div class="compreJunto__wrapper">', r += `<a class="compreJunto__image" href="${a}">\n          <img src="${this.changeImageSize(t)}" alt="${o}"/>\n</a>`, r += `<h3 class="compreJunto__prod-title">\n <a href="${a}">${o}</a>\n </h3>`, r += '<div class="compreJunto__price">\n<small class="compreJunto-secondProd"></small>\n          </div>', r += "</div>", this.render(".compreJunto__itemB", r)
                    })
                },
                setPrice: function() {
                    $(".skuBestPrice").text().replace("R$", "").trim(), $(".compreJunto__buy .compreJunto__buy-text--bold").text()
                },
                getPrices: function() {
                    let e = document.querySelectorAll("td.buy");
                    [].forEach.call(e, e => {
                        console.log(e);
                        let a = e.querySelectorAll("strong")[0].textContent,
                            t = e.querySelectorAll("strong")[1].textContent,
                            o = e.textContent.split("Valor total:")[1].trim().split(" ")[1],
                            r = e.querySelector(".comprar-junto a").getAttribute("href"),
                            s = "";
                        s += `<div class="compreJunto__buy">\n <p class="compreJunto__buy-text">\n <span class="compreJunto__buy-text--bold">\n Compre os 2 itens\n </span> por <span class="compreJunto__buy-text--bold_second">R$ ${o}</span>\n </p>`, s += `<p class="compreJunto__installments ${parseInt(a)<=1?"transparent":""}" >\n                ou até ${a} de ${t} sem juros\n </p>`, s += `<p class="comprar-junto compreJunto__comprar-junto">\n <a href="${r}">COMPRAR JUNTO</a>\n  </p>`, s += "</div>", this.render(".compreJunto__buy-wrapper", s)
                    })
                },
                render: function(e, a) {
                    document.querySelector(e).innerHTML += a
                },
                changeImageSize: function(e) {
                    return e.split("90-90").join("150-150")
                },
                produtoCompreJunto: function() {
                    $(".compreJunto__itemB").slick({
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        asNavFor: ".compreJunto__buy-wrapper"
                    }), 
					$(".compreJunto__buy-wrapper").slick({
                        infinite: false,
                        slidesToShow: 1,
                        arrows: false,
                        slidesToScroll: 1,
                        fade: false,
                        asNavFor: ".compreJunto__itemB"
                    })
                }
            }.init()
        },
    

		init: function () {
			//Geral
			Jasmine.menuMobile();
			Jasmine.sliderMenu();
			Jasmine.buscaMobile();
			Jasmine.verificaLogado();
			Jasmine.slidePrincipal();
			Jasmine.slidePrincipalMobile();
			Jasmine.CategoriasHome();
			Jasmine.ofertasBanners();
			Jasmine.pratMaisVendidos();
			Jasmine.pratNovidades();
			Jasmine.pratParaCozinhar();
			Jasmine.receitasMomentos();
			Jasmine.discountPercentage();
			Jasmine.openMiniCart();
			//Jasmine.aplicaNomeCategoria();
			Jasmine.productDescriptionTabs();
			Jasmine.campoTabelaNutri();
			Jasmine.filtroCategoria();
			Jasmine.prateleiraPDP();
			Jasmine.thumbImg();
			//Jasmine.ofertaLimitada();
			Jasmine.qtdProd();
			Jasmine.slidePrateleiraBusca();
			Jasmine.filtroMobile();
			Jasmine.sidebarDepartamento();
			Jasmine.abreFechaFiltroMobile();
			Jasmine.newsletter();
			Jasmine.institucional();
			Jasmine.footerMobile();
			Jasmine.faleConosco();
			Jasmine.recarregaPagina();
			// Jasmine.verificaWishList();
			//Jasmine.compreJunto();
			Jasmine.buyTogether();
		},
	
	}
	Jasmine.init();
});

function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}
function carregaPercentual() {
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
}

setTimeout(carregaPercentual, 2500);