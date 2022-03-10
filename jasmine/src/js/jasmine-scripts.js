
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
		carregaPercentual: function() {
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
			Jasmine.carregaPercentual();
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
		},
	
	}
	Jasmine.init();
});

function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}


