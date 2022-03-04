
$(document).ready(function () {
	var scre = $("body").width();
	$(".helperComplement").remove();

	var Shopvinho = {
		
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
							$(".header .menu").append("<ul class='header-user'>" +
								"<li class='header-user__name'><span class='icon-user'></span>OlÃ¡, " + (nome || email) + "</li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"<li class='sair'><span class='icon-exit'></span><a href='/no-cache/user/logout'>Sair</a></span></li>" +
								"</ul>");
						} else {
							$(".header .menu").append("<ul class='header-user'>" +
								"<li class='saudacao'> <a href='/login'> Login / Cadastrar </a> </li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"</ul>");
						}
					});

				}, 3000);
			}
		},
		buscaMobile: function () {
			$('.busca-mobile-ico').click(function () {
				$('.busca-topo__busca-container').slideToggle();
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
                            $("header .ajax-content-loader").append(
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
			if ($("body").hasClass("shopvinho-home")) {
				$('.slide-principal').slick({
					dots: true,
					arrows: false,
					slidesToShow: 1,
					autoplay: true,
					autoplaySpeed: 5000,
					speed: 1000,
					easing: 'linear',
					fade: false,
					cssEase: 'linear',
					lazyLoad: 'ondemand'
				});
			}
		},

		slidePrincipalMobile: function () {
			if ($("body").hasClass("shopvinho-home")) {
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
		pratMaisVendidos: function () {
			$('.main_vendidos .shopvinho-prateleira .prateleira > ul').slick({
				infinite: false,
				slidesToShow: 6,
				slidesToScroll: 6,
				lazyLoad: 'ondemand',
				dots:  true,
				arrows: false,
				responsive: [
					{
						breakpoint: 1300,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5,
							infinite: false
						}
					},
					{
						breakpoint: 1100,
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
		CategoriasHome: function () {
			if (scre < 980) {
				$('.main_categorias ul').slick({
					infinite: true,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
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
							dots: false,
							centerPadding: '40px',
							infinite: true
						}
					}
					]
				});
			}
		},
		PaisesHome: function () {
			if (scre < 980) {
				$('.shopvinho-paises ul').slick({
					infinite: false,
					slidesToShow: 8,
					slidesToScroll: 8,
					arrows: false,
					dots: true,
					responsive: [
						{
						breakpoint: 767,
						settings: {
							slidesToShow: 6,
							slidesToScroll: 6,
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							arrows: false,
							dots: false,
							infinite: true
						}
					}
					]
				});
			}
		},
		pratOfertas: function () {
			$('.main_ofertas .shopvinho-prateleira .prateleira-horizontal > ul').slick({
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: false,
				dots: true,
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
		},
		kitsTabs: function() {
			$(".prateleiraTabs01").css("display", "block"), 
			$(".prateleiraTabsTitle01").addClass("active"), 
			jQuery(document).on("click", ".prateleiraTabsTitle01", function() {
				$(".prateleiraTabsTitles > span").removeClass("active"), 
				$(this).addClass("active"), 
				$(".prateleiraTabs").hide(), 
				$(".prateleiraTabs01").fadeIn(), 
				$(".prateleiraTabs01 > .prateleira > ul").slick("setPosition")
			}),jQuery(document).on("click", ".prateleiraTabsTitle02", function() {
				$(".prateleiraTabsTitles > span").removeClass("active"), 
				$(this).addClass("active"), 
				$(".prateleiraTabs").hide(), 
				$(".prateleiraTabs02").fadeIn(), 
				$(".prateleiraTabs02 > .prateleira > ul").slick("setPosition")
			}), jQuery(document).on("click", ".prateleiraTabsTitle03", function() {
				$(".prateleiraTabsTitles > span").removeClass("active"), 
				$(this).addClass("active"), 
				$(".prateleiraTabs").hide(), 
				$(".prateleiraTabs03").fadeIn(), 
				$(".prateleiraTabs03 > .prateleira > ul").slick("setPosition")
			}), jQuery(document).on("click", ".prateleiraTabsTitle04", function() {
				$(".prateleiraTabsTitles > span").removeClass("active"), 
				$(this).addClass("active"), 
				$(".prateleiraTabs").hide(), 
				$(".prateleiraTabs04").fadeIn(), 
				$(".prateleiraTabs04 > .prateleira > ul").slick("setPosition")
			})
		},
		pratNovidades: function () {
				$('.prateleiraTabs .prateleira > ul').slick({
					infinite: true,
					slidesToShow: 6,
					slidesToScroll: 6,
					dots: true,
					arrows: false,
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
			$('.shopvinho-busca-vazia .shopvinho-prateleira').each(function () {
				var slide = $(this).find('.prateleira').length;
				if (slide > 0) {
					$(this).find('.prateleira > ul').slick({
						infinite: true,
						slidesToShow: 5,
						slidesToScroll: 5,
						dots: true,
						arrows: false,
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
		orderCustom: function () {
            var e = $(".orderBy select").first();
            $(".contOrdenar li a").each(function () {
                var t = $(this).attr("data-href");
                $(this).click(function (a) {
                    a.preventDefault(), e.val(t), e.trigger("change")
                })
            });
        },
		categoryFiltrosMob: function() {
            $(".filtrosDepartamento").before("<p class='btMenuFiltros'>Filtros de <b>Pesquisa</b></p>"), $("body").hasClass("mobPage") && jQuery(document).on("click", ".btMenuFiltros", function(e) {
                $(".filtrosDepartamento").slideToggle(), $(this).toggleClass("active")
            })
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
			if ($("body").hasClass("shopvinho-departamento") || $("body").hasClass("categoria")) {
				$(".search-single-navigator h5").click(function () {
					$(this).next("ul").slideToggle();
					$(this).toggleClass("aberto");
				});
				$(".search-single-navigator h3").click(function () {
					$(this).toggleClass("aberto");
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
		},

		// Nome Departamento Categoria
		aplicaNomeCategoria: function () {
			if ($("body").hasClass("shopvinho-categoria") || $("body").hasClass("shopvinho-departamento")) {
				//Termo buscado
				var categoria = vtxctx.categoryName;
				$(".nomeDepartamento h1").prepend(categoria);
				$(".descricao-categoria .titulo-descricao h3").prepend(categoria);
			}
		},
		bannerDepartamento: function() {
            if ($("body").hasClass("shopvinho-departamento")) {
                var caminhoImg = $(".bannerDepartamento img").attr("src");
                $(".shopvinho-departamento__topo").css("background", "url('" + caminhoImg + ") center center no-repeat")
                $(".shopvinho-departamento__topo .bannerDepartamento").css({"background-size": "cover"});
            }
        },
		productDescriptionTabs: function () {
			var tabs = $('.shopvinho-description__navigation li');
			var container = $('.shopvinho-description__item');
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
				$('.shopvinho-prateleira > ul').slick({
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
			if ($("body").hasClass("shopvinho-produto")) {
				$('.prateleira > ul').slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 5,
					arrows: false,
					dots: true,
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
							slidesToShow: 3,
							slidesToScroll: 3,
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
		bannerPdp: function () {
			if (scre < 980) {
				$('.pdp-banners').slick({
					infinite: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
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
							arrows: false,
							dots: false,
							centerPadding: '80px',
							infinite: true
						}
					}
					]
				});
			}
		},
		thumbImg: function() {
            if ($("body").hasClass("shopvinho-produto")) {
				$('.shopvinho-produto .img-produto .apresentacao .thumbs').slick({
					infinite: false,
					vertical: false,
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

		caracteristicasProd: function() {
			if ($("body").hasClass("shopvinho-produto")) {
				var abv = $("#caracteristicas .Especificacoes td.ABV").text();
				//console.log(abv);
				if (abv.length > 1) {
					if (abv == "0") {
						abv = "<b> Leve </b>" + abv;
						abvImg = "/arquivos/vinho_rate_zero.svg"
					} else if (abv == "De 4,1% a 7%") {
						abv = "<b> medio </b>" + abv;
						abvImg = "/arquivos/abv-medio.png"
					} else if (abv == "Acima de 7%") {
						abv = "<b> Forte </b>" + abv;
						abvImg = "/arquivos/vinho_rate_cinco.svg"
					}
					$(".descricao-left .caracteristicas li.abv .img-caracteristicas img").attr("src", abvImg);
					$(".descricao-left .caracteristicas li.abv .valor-caracteristicas").html(abv)
				} else {
					$(".descricao-left .caracteristicas li.abv").remove()
				}
				var ibu = $("#caracteristicas .Especificacoes td.IBU").text();
				if (ibu.length > 1) {
					var imgIbu;
					if (ibu == "Até 10") {
						ibu = "<b> Baixo </b>";
						imgIbu = "/arquivos/ibu1.png"
					} else if (ibu == "De 11 a 20") {
						ibu = "<b>Baixo/Médio</b>";
						imgIbu = "/arquivos/ibu2.png"
					} else if (ibu == "De 21 a 30") {
						ibu = "";
						imgIbu = "/arquivos/vinho_rate_tres.svg"
					} else if (ibu == "De 31 a 40") {
						ibu = "<b>Médio/Alto</b>";
						imgIbu = "/arquivos/ibu3.png"
					} else if (ibu == "De 41 a 50") {
						ibu = "<b>Alto </b>";
						imgIbu = "/arquivos/ibu4.png"
					} else if (ibu == "Acima de 50") {
						ibu = "<b>Alto </b>";
						imgIbu = "/arquivos/ibu4.png"
					}
					$(".descricao-left .caracteristicas li.ibu .valor-caracteristicas").html(ibu);
					$(".descricao-left .caracteristicas li.ibu .img-caracteristicas img").attr("src", imgIbu)
				} else {
					$(".descricao-left .caracteristicas li.ibu").remove()
				}

				/* Doçura */
				var docura = $("#caracteristicas .Descricao-do-Vinho td.Docura").text();
				//console.log(docura);
				if (docura.length > 1) {
					var imgDocura;
					if (docura == "00") {
						docura = "";
						imgDocura = "/arquivos/vinho_rate_zero.svg"
					} else if (docura == "01") {
						docura = "";
						imgDocura = "/arquivos/vinho_rate_um.svg"
					} else if (docura == "02") {
						docura = "";
						imgDocura = "/arquivos/vinho_rate_dois.svg"
					} else if (docura == "03") {
						docura = " ";
						imgDocura = "/arquivos/vinho_rate_tres.svg"
					} else if (docura == "04") {
						docura = "";
						imgDocura = "/arquivos/vinho_rate_quatro.svg"
					} else if (docura == "05") {
						docura = " ";
						imgDocura = "/arquivos/vinho_rate_cinco.svg"
					}
					$(".caracteristicas li.docura .valor-caracteristicas").html(docura);
					$(".caracteristicas li.docura .img-caracteristicas img").attr("src", imgDocura)
				} else {
					$(".caracteristicas li.docura").remove()
				}

				/*Acidez */
				var acidez = $("#caracteristicas .Descricao-do-Vinho td.Acidez").text();
				//console.log(acidez);
				if (acidez.length > 1) {
					var imgAcidez;
					if (acidez == "00") {
						acidez = "00";
						imgAcidez = "/arquivos/vinho_rate_zero.png"
					} else if (acidez == "01") {
						acidez = "";
						imgAcidez = "/arquivos/vinho_rate_um.svg"
					} else if (acidez == "2") {
						acidez = "";
						imgAcidez = "/arquivos/vinho_rate_dois.svg"
					} else if (acidez == "03") {
						acidez = " ";
						imgAcidez = "/arquivos/vinho_rate_tres.svg"
					} else if (acidez == "04") {
						acidez = " ";
						imgAcidez = "/arquivos/vinho_rate_quatro.svg"
					} else if (acidez == "05") {
						acidez = "";
						imgAcidez = "/arquivos/vinho_rate_cinco.svg"
					}
					$(".detalhes-prod .caracteristicas li.acidez .valor-caracteristicas").html(acidez);
					$(".detalhes-prod .caracteristicas li.acidez .img-caracteristicas img").attr("src", imgAcidez)
				} else {
					$(".detalhes-prod .caracteristicas li.acidez").remove()
				}

				/* Tanino */
				var tanino = $("#caracteristicas .Descricao-do-Vinho td.Tanino").text();
				//console.log(docura);
				if (tanino.length > 1) {
					var imgTanino;
					if (tanino == "00") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_zero.svg"
					} else if (tanino == "01") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_um.svg"
					} else if (tanino == "02") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_dois.svg"
					} else if (tanino == "03") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_tres.svg"
					} else if (tanino == "04") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_quatro.svg"
					} else if (tanino == "05") {
						tanino = "";
						imgTanino = "/arquivos/vinho_rate_cinco.svg"
					}
					$(".detalhes-prod .caracteristicas li.tanino .valor-caracteristicas").html(tanino);
					$(".detalhes-prod .caracteristicas li.tanino .img-caracteristicas img").attr("src", imgTanino)
				} else {
					$(".detalhes-prod .caracteristicas li.tanino").remove()
				}
				
				/* Frutado */
				var frutado = $("#caracteristicas .Descricao-do-Vinho td.Frutado").text();
				//console.log(docura);
				if (frutado.length > 1) {
					var imgFrutado;
					if (frutado == "00") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_zero.png"
					} else if (frutado == "01") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_um.svg"
					} else if (frutado == "02") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_dois.svg"
					} else if (frutado == "03") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_tres.svg"
					} else if (frutado == "04") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_quatro.svg"
					} else if (frutado == "05") {
						frutado = "";
						imgFrutado = "/arquivos/vinho_rate_cinco.svg"
					}
					$(".detalhes-prod .caracteristicas li.frutado .valor-caracteristicas").html(frutado);
					$(".detalhes-prod .caracteristicas li.frutado .img-caracteristicas img").attr("src", imgFrutado)
				} else {
					$(".detalhes-prod .caracteristicas li.frutado").remove()
				}
				
				/* Tipo de Vinho -- Tinto, Seco, Branco */
				var tipo_vinho = $(".prod_ficha_tecnica #caracteristicas .Especificacoes td.Tipo-de-vinho").text();
				if (tipo_vinho.length > 1) {
					var imgTipo;
					switch (tipo_vinho) {
						case "Tinto":
							imgTipo = "/arquivos/shopvinho-tipo-tinto.svg";
							break;
						case "Rosé":
							imgTipo = "/arquivos/shopvinho-tipo-Rose.svg";
							break;
						case "Branco":
							imgTipo = "/arquivos/shopvinho-tipo-branco.svg";
							break;
						case "Espumante Branco":
							imgTipo = "/arquivos/shopvinho-tipo-espumante-branco.svg";
							break;
					}
					$(".vinho_especificacoes .tipo_de_vinho .cor_vinho").prepend("<img src='" + imgTipo + "' alt='" + tipo_vinho + "'/>");
					$(".vinho_especificacoes .tipo_de_vinho .nome_cor_vinho").prepend("<p>" + tipo_vinho + "<p/>")
				} else {
					$(".vinho_especificacoes .tipo_de_vinho").remove()
				}
				/* Pais e Bandeira */
				var pais_txt = $(".prod_ficha_tecnica #caracteristicas .Especificacoes td.Pais").text();
				if (pais_txt.length > 1) {
					var imgPais;
					switch (pais_txt) {
						case "Portugal":
							imgPais = "/arquivos/shopvinho-bandeira-portugal.svg";
							break;
						case "Chile":
							imgPais = "/arquivos/shopvinho-bandeira-chile.svg";
							break;
						case "Argentina":
							imgPais = "/arquivos/shopvinho-bandeira-argentina.svg";
							break;
					}
					$(".vinho_especificacoes .pais_prod .bandeira-pais").prepend("<img src='" + imgPais + "' alt='" + pais_txt + "'/>");
					$(".vinho_especificacoes .pais_prod .nome-pais-prod").prepend("<p>" + pais_txt + "<p/>")
				} else {
					$(".vinho_especificacoes .pais_prod").remove()
				}
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
               
                // Prod
                $(".produto-all #produtoDiv-direita .shopvinho-produto__buy-button .buy-button").click(function(event) {
                //event.preventDefault();
                    var hrefCart = $(this).attr("href");
                    var qtd = $(this).parents().eq(4).find(".qtdPrateleira .qtdVal").val();

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

		parcProd: function () {
			$(".valor-parcelado .titulo-parcelamento").text("Veja opções de parcelamento");
			$(".valor-parcelado .titulo-parcelamento").click(function () {
				$(".valor-parcelado .other-payment-method-ul").fadeToggle();
				$(this).toggleClass("aberto");
			});
		},

		breadCrumb: function () {
			$(".breadCrumb ul li").first().find("a").text("Home");

			if ($("body").hasClass("shopvinho-404")) {
				$(".sistema .breadCrumb ul li").after('<li> 404 </li>');
			} else if ($("body").hasClass("shopvinho-500")) {
				$(".sistema .breadCrumb ul li").after('<li> 500 </li>');
			} else if ($("body").hasClass("shopvinho-buscavazia")) {
				$(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
			} else if ($("body").hasClass("resultado-busca")) {
				$(".breadCrumb ul li").after('<li> Resultado de busca </li>');
			}
		},

		descricaoCategoria: function () {
			if ($("body").hasClass("shopvinho-categoria")) {
				var contDesc = $(".descricao-categoria .conteudo-descricao").html();
				if (contDesc.length < 1) {
					$(".descricao-categoria").remove();
				}
			}
		},

		zoomProd: function () {
			$(window).load(function () {
				var janela = $(window).width();
				if ($("body").hasClass("shopvinho-produto")) {

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
		PdpOfertas: function () {
			$('.ofertas .shopvinho-prateleira .prateleira > ul').slick({
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 3,
				lazyLoad: 'ondemand',
				dots:  true,
				arrows: false,
				responsive: [
					{
						breakpoint: 1300,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
							infinite: false
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
		compreJunto: function () {
			if ($("body").hasClass("shopvinho__produto")) {

				// Clique botao Comprar Junto
				setTimeout(function () {
					$('.btn-batch-buy').off('click').click(function (rwtent) {
						rwtent.prrwtentDefault();
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

				$('.slideCompreJunto .shopvinho-prateleira>ul').on('setPosition', function (rwtent, slick, direction) {
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


				var prodCompreJunto = $('.prodCompreJunt .shopvinho-prateleira >ul');
				var boxCompre = $('.prodCompreJunt');

				if (prodCompreJunto.length > 0) {
					boxCompre.css('display', 'block');
				} else {
					boxCompre.css('display', 'none');
				};

				// Slide compre junto
				$('#image img').clone().prependTo('.prodFixo').wrapAll('<div class="imgCompre"></div>'); //Clone imagem
				$('.productPrice').clone().appendTo('.prodFixo'); //Clona preco

				$('.prodFixo').after('<div class="juntoAction"><p> + </p></div>');
				$('.slideCompreJunto .shopvinho-prateleira>ul').after('<div class="juntoAction"><p> = </p></div>');

				// Pega field que seleciona cada produto e colocar dentro da LI prodData
				var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

				prodCheck.each(function () {
					var idCheck = $(this);

					$('.slideCompreJunto .shopvinho-prateleira .data').each(function () {
						if ($(this).attr('data-id') == idCheck.attr('rel')) {
							idCheck.prependTo($(this));
						}
					});
				});

				$('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

				$('.slideCompreJunto .shopvinho-prateleira>ul').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false
				});

			}
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
					$(".shopvinho-buy-button").removeClass("loading");
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
			var _button = $('.shopvinho-buy-button');

			_button.click(function (ev) {
				var _buttonLink = _button.attr('href');
				if (_buttonLink.indexOf('javascript:alert') == -1) {
					ev.preventDefault();
					var _sku = $('.shopvinho-buy-button').attr('href').split('sku=')[1].split('&')[0];
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
		
		iniciaCountdown: function() {
            $(".prateleira-ofertas").each((function() {
                $(this).find(".contador_ofertas").vtexCountdown()
            }))
        },
		
		verificaWishList: function () {
			// var skuId = [];
			// var localItem = localStorage.getItem('wishListActive');
			// if ($('body').hasClass('shopvinho-produto')){
			// 	var pdpWLlink = $('.buy-button').attr('href');
			// 	var splitWLlink =  pdpWLlink.split('/checkout/cart/add?sku=');
			// 	var splatWLlink = splitWLlink[1].split('&qty=1&seller=1&redirect=true&sc=1');
			// 	var pdpSkuId = splatWLlink[0];
			// 	$('.glis-popup-link').click(function(){
			// 		if ($('body').hasClass('loginOn')) {
			// 			$(this).addClass('wishListActive');
			// 			skuId.push(pdpSkuId);
			// 			localStorage.setItem('wishListActive', `${localItem},${skuId}`);
			// 		}
			// 	});
			// }
			// setTimeout(function(){
			// 	var newLocalItem = localItem.split(',').map(x=>{return parseInt(x)});
			// 	for (var i = 0; i <= newLocalItem.length; i++) {
			// 		$(`.prateleira > ul li.${newLocalItem[i]}, .prateleira-horizontal > ul li.${newLocalItem[i]}`).find('.productWishlist').addClass('wishListActive');
			// 		if (pdpSkuId == newLocalItem[i] && $('body').hasClass('loginOn')) {
			// 			$('.glis-popup-link').addClass('wishListActive');
			// 		}
			// 	}
			// }, 2000);
			$('.prateleira > ul li, .prateleira-horizontal > ul li').each(function(){
				var newSkuId = $(this).find('.shopvinho-sku').val();
				$(this).addClass(`${newSkuId}`);
				if (newSkuId !== undefined) {
					$(this).find('.productWishlist').click(function(){
						if ($('body').hasClass('loginOn')){
							$(this).addClass('wishListActive');
							skuId.push(newSkuId);
							localStorage.setItem('wishListActive', `${localItem},${skuId}`);
						}else{
							// alert('Você precisa estar logado para adicionar produtos à lista');
							Swal.fire({
								icon: 'success',
								title: 'Por favor, faça o login.',
								toast: true,
								position: 'top-center',
								showConfirmButton: false,
								showCloseButton: 'false',
								timerProgressBar: 'true',
								timer: '4000'
							})
						}
					});
				}
			});
		},		
        countDownVitrine: function() {
			$('.flags-promo').vtexCountdown();
		},
		marcasDoMundoTitulo: function() {
			$('.marcas-mundo-banners .box-banner').each(function(){
				var categTitle = $(this).find('img').attr('alt');
				$(this).find('a').append(`<p>${categTitle}</p>`);
			})
		},
		marcasDoMundoCarrossel: function() {
			if (scre <= 1280) {
				$('.marcas-mundo-banners').slick({
					slidesToShow: 5,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
					responsive: [
						{
							breakpoint: 1100,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: "100px"
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: "60px"
							}
						},
						{
							breakpoint: 400,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: "60px"
							}
						}
					]
				});
			}
		},
		init: function () {
			//Geral
			Shopvinho.menuMobile();
			Shopvinho.buscaMobile();
			Shopvinho.verificaLogado();
			Shopvinho.slidePrincipal();
			Shopvinho.pratMaisVendidos();
			// Shopvinho.slidePrincipalMobile();
			Shopvinho.CategoriasHome();
			Shopvinho.PaisesHome();
			Shopvinho.pratOfertas();
			Shopvinho.kitsTabs();
			Shopvinho.pratNovidades();
			Shopvinho.carregaPercentual();
			Shopvinho.discountPercentage();
			Shopvinho.openMiniCart();
			Shopvinho.aplicaNomeCategoria();
			Shopvinho.bannerDepartamento();
			//Shopvinho.productDescriptionTabs();
			Shopvinho.filtroCategoria();
			Shopvinho.prateleiraPDP();
			Shopvinho.bannerPdp();
			Shopvinho.thumbImg();
			Shopvinho.caracteristicasProd();
				//Shopvinho.ofertaLimitada();
			Shopvinho.qtdProd();
			Shopvinho.slidePrateleiraBusca();
			// Shopvinho.filtroMobile();
			Shopvinho.orderCustom();
			//Shopvinho.categoryFiltrosMob();
			// Shopvinho.abreFechaFiltroMobile();
			Shopvinho.PdpOfertas();
			// Shopvinho.compreJunto();
			Shopvinho.zoomProd();
			Shopvinho.institucional();
			Shopvinho.footerMobile();
			Shopvinho.faleConosco();
			//Shopvinho.recarregaPagina();
			Shopvinho.verificaWishList();
			Shopvinho.countDownVitrine();
			Shopvinho.marcasDoMundoTitulo();
			Shopvinho.marcasDoMundoCarrossel();
		},
	
	}
	Shopvinho.init();
});


function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}
$.fn.unslick = function() {
    return this.each(function(e, a) {
        a.slick && a.slick.destroy()
    })
};
