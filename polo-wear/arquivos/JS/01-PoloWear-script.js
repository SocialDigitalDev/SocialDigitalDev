
$(document).ready(function () {
	var scre = $("body").width();
	$(".helperComplement").remove();

	var poloWear = {

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
				var PoloMenu = dataMenu;

				$.each(PoloMenu, function (i, field) {

					menu.append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '?PS=40&O=OrderByBestDiscountDESC" title="' + field.name + '">' + field.name + '</a><div class="box-subMenu"><div class="container-center"><ul class="subCategoria"></ul></div></div></li>');

					$(PoloMenu[i].children).each(function (ii, el) {
						var subCatId = PoloMenu[i].children[ii].id;
						var subCatNome = PoloMenu[i].children[ii].name;
						var subCatUrl = PoloMenu[i].children[ii].url;
						$('.cat-index-' + i).find('.subCategoria').append('<li id="' + subCatId + '" class="subItem"><a href="' + subCatUrl + '?PS=40&O=OrderByBestDiscountDESC" class="linkBy">' + subCatNome + '</a></li>');
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
						for (var i = 0; i < thisLinks.length; i += 9) {
							thisLinks.slice(i, i + 9).wrapAll("<span class='menuColuna'></span>");
						};
					}
				});
				//Menu Feminino
				$('.cat2 .subCategoria').append(`<div class="menu-img"><img class="menu" src="/arquivos/polowear-menu-feminino-02.jpg" /><img class="menu" src="/arquivos/polowear-menu-feminino-01.jpg" /></div>`);
				// Menu Masculino
				$('.cat3 .subCategoria').append(`<div class="menu-img"><img class="menu" src="/arquivos/polowear-menu-masculino-01.jpg" /><img class="menu" src="/arquivos/polowear-menu-masculino-02.jpg" /></div>`);
				//Menu CalÃ§ados
				$('.cat5 .subCategoria').append(`<div class="menu-img"><img class="menu" src="/arquivos/menunovo-calcados.png" /><img class="menu" src="/arquivos/menunovo-perfumes1.png" /></div>`);
				//Menu Acessorios
				$('.cat6 .subCategoria').append(`<div class="menu-img"><img class="menu" src="/arquivos/menunovo-acessorios.png" /><img class="menu" src="/arquivos/menunovo-perfumes2.png" /></div>`);
			}, 1500);
		},

		menuMobile: function () {
			if (scre < 980) {

				$(".btn-menu-mobile").fadeToggle();

				setTimeout(function () {
					$(".btn-menu-mobile").fadeToggle();
					$(".btn-menu-mobile").click(function () {
						$("body").toggleClass("aberto");
					});

					$(".menu-topo").after("<span class='menu-fechar'> </span>");

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
							$(".menu-topo .menu-principal").prepend("<ul class='header-user'>" +
								"<li class='header-user__name'><span class='icon-user'></span>Olá, " + (nome || email) + "</li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"<li class='sair'><span class='icon-exit'></span><a href='/no-cache/user/logout'>Sair</a></span></li>" +
								"</ul>");
						} else {
							$(".menu-topo .menu-principal").prepend("<ul class='header-user'>" +
								"<li class='saudacao'><span class='user-login'></span> <a href='/login'>  Olá, Bem-vindo(a)!  <p>Entre ou Cadastre-se</p> </a> </li>" +
								"<li class='orders'><a href='/_secure/account#/orders'>Meus Pedidos</a></li>" +
								"<li class='login'><a href='/_secure/account'>Minha Conta</a></li>" +
								"</ul>");
						}
					});

					$(".menu-topo .menu-principal > li.subMenuTrue > a").click(function () {
						$(this).parent().find("ul").first().slideToggle();
						$(this).parent().toggleClass("aberto");
					});

					/* Remove link caso tenha submenu  */
					$(".menu-topo .menu-principal > li.itemMenu.cat2 > a, .menu-topo .menu-principal > li.itemMenu.cat3 > a, .menu-topo .menu-principal > li.itemMenu.cat5 > a, .menu-topo .menu-principal > li.itemMenu.cat6 > a, .menu-topo .menu-principal > li.itemMenu.cat7 > a, .menu-topo .menu-principal > li.itemMenu.cat64 > a  ").removeAttr("href");
					$(".menu-topo .menu-principal > li.subMenuTrue > a").click(function (e) {
						e.preventDefault();
					});

					$(".menu-topo .menu-principal > li.subMenuTrue .subMenuTrue").click(function () {
						$(this).find("ul").first().slideToggle();
						$(this).toggleClass("aberto");
					});

					$(".menu-topo .menu-principal").append("<div class='menu-atendimento'><li class='atendimento'>Atendimento:</li>" +
						"<li class='telefone'><a href='http://api.whatsapp.com/send?1=pt_BR&phone=55111234567' target='_blank' rel='noopener'>(11) 1234-5678</a></li>" +
						"<li class='horario'>10h às 17h de segunda a sexta</li></div>");


				}, 4000);
			}
		},

		headerHeight: function () {
			
			setInterval(function () {
			
				const headerHeight = $('header').innerHeight()

				if (!$('.polo-wear__produto').length == 1){
					$('main').attr('style', `margin-top: ${headerHeight}px;`)
				}
			
			}, 2000)

		},

		qtdCart: function () {
			vtexjs.checkout.getOrderForm().done(function (orderForm) {
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
		BuscaHeader: function () {
			$(document).on("click", ".busca-topo__busca-icon", function () {
				$(".busca-topo__busca-container").toggleClass("busca-open");
				//$(".header-principal__container-hide").removeClass("carrinho-show");
				//$(".header-principal__login-hide").removeClass("login-show");
			});
		},

		btnComprarProduto: function () {
			$(".polo-prateleira li").each(function () {
				var linkProd = $(this).find(".lead a").attr("href");
				$(this).find(".data .add a").attr("href", linkProd);
			});
		},

		slidePrincipal: function () {
			if ($("body").hasClass("polo-wear__home")) {
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
			if ($("body").hasClass("polo-wear__home")) {
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

		//Informativo
		carrosselInformativo: function () {
			if (scre < 980) {
				$('.informativos ul').slick({
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 1,
					cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
					easing: 'linear',
					lazyLoad: 'ondemand',
					dots: true,
					arrows: true,
					responsive: [{
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
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true
						}
					}
					]
				});
			}
		},

		carrosselMasc: function () {
			if (scre < 980) {
				$('.prateleira-01 #prat-1').slick({
					infinite: false,
					slidesToShow: 5,
					slidesToScroll: 1,
					lazyLoad: 'ondemand',
					dots: false,
					// cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
					easing: 'linear',
					arrows: true,
					responsive: [{
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
			return this;
		},

		carrosselFem: function () {
			if (scre < 980) {
				$('.prateleira-01 #prat-2').slick({
					infinite: false,
					slidesToShow: 5,
					slidesToScroll: 1,
					lazyLoad: 'ondemand',
					dots: false,
					// cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
					easing: 'linear',
					arrows: true,
					responsive: [{
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
			return this;
		},

		carrosselMedidaCerta: function () {
			if (scre < 980) {
				$('.banner-categoria .polo-prateleira').slick({
					infinite: false,
					slidesToShow: 2,
					slidesToScroll: 1,
					cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
					easing: 'linear',
					lazyLoad: 'ondemand',
					dots: true,
					arrows: true,
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

		verMaisMobile: function () {
			if (scre < 500) {
				$('#descricao-produto .container-center').append('<p class="see-more">Ver Mais -></p>');
				$('.see-more').click(function () {
					$('.productDescription').toggleClass('aberto');
				});
			}
		},

		bfLandingPage: function() {
            if($('body').hasClass('black-friday')){
                $('.faq-holder h3').click(function(){
                    $(this).parent().find('p').slideToggle();
                    $(this).toggleClass('faq-open');
                });
                $(".black-friday .form-email .enviarForm").click(function() {
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
                            url: '/api/dataentities/BF/documents',
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
            }
    },

		//Titulos Banners Departamentos
		bannerHoverAlt: function () {
			var imageTitle = $('.imageTitle .box-banner');
			imageTitle.each(function () {
				var titleAlt = $(this).find('img').attr('alt');
				$(this).find("a").append('<div class="polo-alt-title">' + titleAlt + '</div>')
			});
			//$(".imageTitle .box-banner").prepend("<div class='overlay'></div>");
		},

		/// Home Tabs Cetgorias
		HomeCategoriasTabs: function () {
			$('.prateleira-01 .prateleira-tabs-titulo li').each(function (i) {
				var tab_identi = $(this).attr('data-tab');
				$(this).click(function () {
					$('.prateleira-01 .prateleira-tabs-titulo li').removeClass('tab-ativo');
					$(this).addClass('tab-ativo');
					$('.prateleira-01 .tab-content').removeClass('tab-ativo');
					$('.prateleira-01 #' + tab_identi).addClass('tab-ativo');
				});
				// $('.tabs-links[data-tab="prat-1"]').click(function(){
				//     if (!$('#prat-1').hasClass('slick-initialized')){
				//         $('#prat-2').slick('unslick');
				//         poloWear.carrosselMasc();
				//     }
				// });
				// $('.tabs-links[data-tab="prat-2"]').click(function(){
				//     if(!$('#prat-2').hasClass('slick-initialized')){
				//         $('#prat-1').slick('unslick');
				//         poloWear.carrosselFem();
				//     }
				// });
			});
		},

		//Prateleiras Gerais
		prateleirasGerais: function () {
			if ($("body").hasClass("polo-wear__home") || $("body").hasClass("polo-wear__produto")) {
				$('.prateleira-mais .prateleira > ul, .prateleira-elas .prateleira > ul, .prateleira-eles .prateleira > ul,.qvvt .polovitrine > ul ').slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 5,
					dots: true,
					responsive: [
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4,
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

		prateleiraCompreOLook: function () {
			if ($("body").hasClass("polo-wear__home") || $("body").hasClass("polo-produto")) {
				$('.prateleira-compre-look .prateleira ul').slick({
					infinite: false,
					slidesToShow: 4,
					slidesToScroll: 1,
					dots: true,
					responsive: [
						{
							breakpoint: 1400,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 979,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								dots: false
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								dots: false
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								dots: false
							}
						}
					]
				});
			}
		},

		slidePrateleiraProdutos: function () {
			if ($("body").hasClass("polo-produto")) {
				$('.slide-prod .prateleira > ul').slick({
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					lazyLoad: 'ondemand',
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
		slidePrateleiraBusca: function () {
			$('.polo-busca-vazia .slide-prod').each(function () {
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

		// Filtro das cores
		depCores: function () {
			$('.search-single-navigator .Cor > li > a').each(function () {
				var cor = $(this).attr('title');
				var nomeCor = $(this).attr('title');
				nomeCor = nomeCor.replace(/[' ']/g, '_');
				$(this).addClass('filtro_' + nomeCor);
				$(this).html('<img src="/arquivos/filtro_' + nomeCor + '.jpg" alt="Cor ' + cor + '" />');
				$(this).parent().addClass('filtro_' + nomeCor);
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

		filtroCategoria: function () {
			if ($("body").hasClass("polo-departamento") || $("body").hasClass("categoria")) {
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
				$('.search-single-navigator h3 a[href*="/masculino/camiseta"]').parent().addClass('camiseta-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/polo"]').parent().addClass('polo-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/calca"]').parent().addClass('calca-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/camisa"]').parent().addClass('camisa-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/moletom"]').parent().addClass('moletom-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/blusa"]').parent().addClass('blusa-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/regata"]').parent().addClass('regata-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/tricot-sueter-e-cardigan"]').parent().addClass('tricot-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/casacos-e-jaquetas"]').parent().addClass('tricot-masculina');
				$('.search-single-navigator h3 a[href*="/masculino/shorts-e-bermuda"]').parent().addClass('shorts-masculina');
				$('.search-single-navigator h3 a[href*="/feminino/camiseta"]').parent().addClass('camiseta-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/polo"]').parent().addClass('polo-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/calca"]').parent().addClass('calca-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/camisa"]').parent().addClass('camisa-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/moletom"]').parent().addClass('moletom-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/blusa"]').parent().addClass('blusa-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/regata"]').parent().addClass('regata-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/tricot-sueter-e-cardigan"]').parent().addClass('tricot-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/casacos-e-jaquetas"]').parent().addClass('tricot-feminino');
				$('.search-single-navigator h3 a[href*="/feminino/shorts"]').parent().addClass('shorts-feminino');
				$('.search-single-navigator h3 a[href*="/plus-size/calca"]').parent().addClass('calca-plus');
				$('.search-single-navigator h3 a[href*="/plus-size/camiseta"]').parent().addClass('camiseta-plus');
				$('.search-single-navigator h3 a[href*="/plus-size/polo"]').parent().addClass('polo-plus');
				$('.search-single-navigator h3 a[href*="/plus-size/shorts-e-bermuda"]').parent().addClass('shorts-plus');
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
			if ($("body").hasClass("polo-categoria") || $("body").hasClass("polo-departamento")) {
				//Termo buscado
				var categoria = vtxctx.categoryName;
				$(".nomeDepartamento h1").prepend(categoria);
				$(".descricao-categoria .titulo-descricao h3").prepend(categoria);
			}

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
				$('.polo-prateleira ul').slick({
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

		slideOfertas: function () {
			if ($("body").hasClass("polo-home")) {
				$('.ofertas01 .polo-prateleira ul').slick({
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
            if ($("body").hasClass("produto")) {
               
                    $('.nova-pdp .polo-produto_imagem .apresentacao .thumbs').slick({
                        infinite: true,
                        vertical: true,
                        slidesToShow: 4,
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
								vertical: true
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
							breakpoint: 500,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								infinite: true,
								vertical: false
							}
						}
						]
                    });
               
            }
    },

		slideSimilar: function () {
			if ($("body").hasClass("nova-pdp")) {
					$('.similares ul').slick({
						infinite: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						arrows: true,
						//variableWidth: true,
						adaptiveHeight: true,
						responsive: [{
							breakpoint: 1240,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 980,
							settings: {
								slidesToShow: 5,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1,
							}
						},
						{
							breakpoint: 500,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1,
							}
						}
						]
					});
			}
		},

		ofertaLimitada: function () {
			if (scre < 980) {
					$('.oferta-limitada .polo_kits .prateleira ul, .section_four #prat-1').slick({
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

				// Prod
				$(".produto-all #produtoDiv-direita .01-PoloWear-produto__buy-button .buy-button").click(function (event) {
					event.preventDefault();
					var hrefCart = $(this).attr("href");
					var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();

					if (qtd == "") {
						qtd = "1";
					}

					if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
						//alert('Por favor, selecione o modelo desejado.');

						Swal.fire({
							icon: 'warning',
							title: 'Por favor, selecione o modelo desejado.',
							toast: 'true',
							position: 'bottom-end',
							showConfirmButton: false,
							showCloseButton: 'true',
							timerProgressBar: 'true',
							timer: '3000'
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
								vtexjs.checkout.addToCart([item]).done(function (orderForm) {
									// Swal.fire({ 
									//     toast: "true", 
									//     position:"bottom-end", 
									//     icon: "success", 
									//     timerProgressBar:"true", 
									//     showCloseButton: "true", 
									//     showConfirmButton: false,
									//     title: "Produto adicionado ao carrinho", 
									//     timer: "2000"});
									// //$(".buy-button").addClass("loading");
									// vtexjs.checkout.getOrderForm().done(function (e) {
									//     var qtdCart = e.items.length;
									//     $(".info-cart .qtd-cart").html(qtdCart);
									// });
									// //$(".final-compra-externo, .final-compra-interno").fadeToggle();
									$(".header-minicart").addClass("open"),
										setTimeout(function () {
											$(".header-minicart").removeClass("open");
										}, 5e3);
								});

							});
						});
					}
				});
				// jQuery(document).on("click", ".closeCart", function (e) {
				//      $(".forfit-produto .buy-button").removeClass("loading");
				// }),
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

			if ($("body").hasClass("polo-404")) {
				$(".sistema .breadCrumb ul li").after('<li> 404 </li>');
			} else if ($("body").hasClass("polo-500")) {
				$(".sistema .breadCrumb ul li").after('<li> 500 </li>');
			} else if ($("body").hasClass("polo-buscavazia")) {
				$(".sistema .breadCrumb ul li").after('<li> Busca Vazia </li>');
			} else if ($("body").hasClass("resultado-busca")) {
				$(".breadCrumb ul li").after('<li> Resultado de busca </li>');
			}
		},

		bannerProduto: function () {
			if ($("body").hasClass("polo-produto")) {
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

		descricaoCategoria: function () {
			if ($("body").hasClass("polo-categoria")) {
				var contDesc = $(".descricao-categoria .conteudo-descricao").html();
				if (contDesc.length < 1) {
					$(".descricao-categoria").remove();
				}
			}
		},

		textoPromocionalCategoriaHome: function () {
			setTimeout(function () {
				$('.banner-categoria .polo-prateleira .box-banner:nth-of-type(1) a').append('<p>Compras até R$<span class="big-font">39</span><span class="little-font">,99</span></p>');
				$('.banner-categoria .polo-prateleira .box-banner:nth-of-type(2) a').append('<p>Compras até R$<span class="big-font">79</span><span class="little-font">,99</span></p>');
				$('.banner-categoria .polo-prateleira .box-banner:nth-of-type(3) a').append('<p>Compras até R$<span class="big-font">99</span><span class="little-font">,99</span></p>');
			},
				1000);
		},

		seletorVisualizacaoDeQtdProdutos: function () {
			$('.view-one').click(function () {
				$('.resultadoDepartamento .prateleira ul li').css('width', '100%');
				$(this).addClass('selected');
				$('.view-two, .view-four').removeClass('selected');
			});
			$('.view-two').click(function () {
				$('.resultadoDepartamento .prateleira ul li').css('width', '50%');
				$(this).addClass('selected');
				$('.view-one, .view-four').removeClass('selected');
			});
			$('.view-four').click(function () {
				$('.resultadoDepartamento .prateleira ul li').css('width', '25%');
				$(this).addClass('selected');
				$('.view-one, .view-two').removeClass('selected');
			});
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

		compreJunto: function () {
			if ($("body").hasClass("polo-wear__produto")) {

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

				$('.slideCompreJunto .polo-prateleira>ul').on('setPosition', function (rwtent, slick, direction) {
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


				var prodCompreJunto = $('.prodCompreJunt .polo-prateleira >ul');
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
				$('.slideCompreJunto .polo-prateleira>ul').after('<div class="juntoAction"><p> = </p></div>');

				// Pega field que seleciona cada produto e colocar dentro da LI prodData
				var prodCheck = $('.slideCompreJunto .buy-product-checkbox');

				prodCheck.each(function () {
					var idCheck = $(this);

					$('.slideCompreJunto .polo-prateleira .data').each(function () {
						if ($(this).attr('data-id') == idCheck.attr('rel')) {
							idCheck.prependTo($(this));
						}
					});
				});

				$('.slideCompreJunto fieldset').remove(); // Remove fieldset vazio 

				$('.slideCompreJunto .polo-prateleira>ul').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false
				});

			}
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
					$(this).toggleClass("aberto");
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
			var e = $(".header-cart a"),
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
					$(".polo-buy-button").removeClass("loading");
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
			var _button = $('.polo-buy-button');

			_button.click(function (ev) {
				var _buttonLink = _button.attr('href');
				if (_buttonLink.indexOf('javascript:alert') == -1) {
					ev.preventDefault();
					var _sku = $('.polo-buy-button').attr('href').split('sku=')[1].split('&')[0];
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

		quizSolteiro: function () {
			
			setTimeout(function () {
				var quiz = `
					<div class="questionArea">
						<div class="question"></div>
						<div class="options"></div>
					</div>
					<div class="result"></div>
					<img src="/arquivos/logo-polowear-quiz.png" alt="Logo Polo Wear" class="logo">
				`

				var mail = `
					<i class="far fa-times-circle"></i>
					<div class="chamada-news">
						<img src="/arquivos/logo-polowear-quiz.png" alt="Logo Polo Wear" class="logo">
						<h2 class="title">
							Antes de ver qual tipo de solteiro você é, insira seu e-mail
						</h2>
						<div class="form">
							<div class="form-item">
								<input class="form-input quiz-email" type="email" id="email" placeholder="*Digite seu melhor e-mail">
							</div>
							<button class="form-submit js-quiz-submit" type="submit">
								Enviar
							</button>
						</div>
					</div>
				`

				document.querySelector('.quiz-solteiro').innerHTML = `
					<div class="modalQuiz">
						<div class="content">
							<i class="far fa-times-circle"></i>
							<div class="chamada">
								<img src="/arquivos/logo-polowear-quiz.png" alt="Logo Polo Wear" class="logo">
								<h2 class="title">
									<span class="line1">Qual tipo de</span>
									<span class="line2">solteiro você é?</span>
								</h2>
								<span class="link js-link">Jogar</span>
							</div>
						</div>
					</div>
				`

				$('.modalQuiz .far').on('click', function () {
					$('.modalQuiz').remove()
				})

				
				document.querySelector('.modalQuiz .chamada .js-link').addEventListener('click', function () {
					document.querySelector('.modalQuiz .content').innerHTML = mail
					
					// Envia email do Quiz
					$(".modalQuiz .js-quiz-submit").click(function () {
	
						var quizEmail = $('.modalQuiz input.quiz-email').val();
		
						function validateInput() {
							var focoEmail = $(".modalQuiz input.quiz-email").val();
							if (validateInputEmail(focoEmail)) {
								// console.log("Enviado");
								enviaEmailQuiz();
								dataQuiz()
							} else {
								$('.modalQuiz input.quiz-email').css('border', '1px solid #d00d0d');
								//console.log("NÃ£o Ã© vÃ¡lido");
							}
							return false;
						}
		
						function validateInputEmail(focoEmail) {
							var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							return re.test(focoEmail);
						}
		
						$('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
						$('.box-form-msg').css('display', 'none');
		
						if (quizEmail == '') {
							$('.modalQuiz input.quiz-email').css('border', '1px solid #d00d0d');
						} else if (quizEmail != '') {
							validateInput();
						}
		
						function enviaEmailQuiz() {
							var dados = {};
							dados.email = quizEmail;
							$.ajax({
								accept: 'application/vnd.vtex.ds.v10+json',
								contentType: 'application/json; charset=utf-8',
								crossDomain: true,
								data: JSON.stringify(dados),
								type: 'POST',
								url: '/api/dataentities/QS/documents',
								success: function (data) {
									console.log("E-mail cadastrado!",data);
								},
								error: function (error) {
									console.log(error);
								}
							});
						}
					});

					function dataQuiz(){
						$('.modalQuiz .content').html(quiz)
	
						var questions = [
							{
								question: 'Quem é você em uma festa?',
								options: [
									'Aquele(a) que fica próximo das comidas e bebidas',
									'Aquele(a) que fica no canto com seu grupo de amigos',
									'Aquele(a) que está na pista dançando',
									'Aquele(a) que está fazendo amizade com todos da festa'
								]
							},
							{
								question: 'O que mais te atrai em alguém?',
								options: [
									'Bom Humor',
									'Personalidade',
									'Inteligência',
									'Boa aparência'
								]
							},
							{
								question: 'Qual seria seu primeiro encontro ideal?',
								options: [
									'Jantar e cinema',
									'Um passeio no parque',
									'Tomar umas em um bar',
									'Ir a um show ou balada'
								]
							},
							{
								question: 'Se tivesse que adivinhar, o que acha que as pessoas mais gostam em você?',
								options: [
									'Sou engraçado(a)',
									'Sou realista',
									'Sou honesto(a)',
									'Sou lindo(a)'
								]
							}
						];
	
						// Quiz Solteiro
						var currentQuestion = 0
						var answer1 = 0
						var answer2 = 0
						var answer3 = 0
						var answer4 = 0
	
						showQuestion()
	
						function showQuestion() {
							if (questions[currentQuestion]) {
								var q = questions[currentQuestion]
	
								document.querySelector('.result').style.display = 'none'
								document.querySelector('.questionArea').style.display = 'block'
								document.querySelector('.question').innerHTML = q.question
	
								var optionsHTML = ''
	
								for (var option in q.options) {
									optionsHTML += `
										<div class="option" data-op="${option}">
											${q.options[option]}
										</div>
									`
								}
	
								document.querySelector('.options').innerHTML = optionsHTML
	
								document.querySelectorAll('.options .option').forEach(function (item) {
									item.addEventListener('click', optionClickEvent)
								})
	
							} else {
								finishQuiz()
							}
						}
	
						function optionClickEvent(e) {
							var clickedOption = parseInt(e.target.getAttribute('data-op'))
	
							switch (clickedOption) {
								case 0:
									answer1++
									break
								case 1:
									answer2++
									break
								case 2:
									answer3++
									break
								case 3:
									answer4++
									break
								default:
									console.log("quiz")
							}
	
							currentQuestion++
							showQuestion()
						}
	
						function finishQuiz() {
							document.querySelector('.result').style.display = 'block'
							document.querySelector('.questionArea').style.display = 'none'
	
							if (answer1 >= answer2 + answer3 + answer4 && answer1 != answer2 && answer1 != answer3 && answer1 != answer4) {
								document.querySelector('.result').innerHTML = `
									<h2 class="title">Solteiro(a) Convicto(a)</h2>
									<p class="text">
										Você é uma pessoa dona de uma personalidade bastante independente e que preza por sua liberdade acima de qualquer situação, por isso, é aquele tipo de solteiro que ama a própria cia e não pretende mudar isso tão cedo.
									</p>
									<div class="box-cupom">
										<p class="text">
											use o cupom e ganhe <strong>10% Off</strong>
										</p>
										<p class="cupom">CONVICTO</p>
										<a class="link" href="/264?PS=40&map=productClusterIds&O=OrderByBestDiscountDESC">Acesse a coleção</a>
									</div>
								`
							} else if (answer2 >= answer1 + answer3 + answer4 && answer2 != answer1 && answer2 != answer3 && answer2 != answer4) {
								document.querySelector('.result').innerHTML = `
									<h2 class="title">Solteiro(a) Contrariado(a)</h2>
									<p class="text">
										Você é uma pessoa que se mantém pé no chão em qualquer situação possível e que está sempre atenta a tudo que acontece ao seu redor, por isso, é aquele(a) tipo de solteiro que já cansou dessa vida, mas que ainda não encontrou a pessoa certa para uma relação.
									</p>
									<div class="box-cupom">
										<p class="text">
											use o cupom e ganhe <strong>10% Off</strong>
										</p>
										<p class="cupom">CONTRARIADO</p>
										<a class="link" href="/268?PS=40&map=productClusterIds&O=OrderByBestDiscountDESC">Acesse a coleção</a>
									</div>
								`
							} else if (answer3 >= answer1 + answer2 + answer4 && answer3 != answer1 && answer3 != answer2 && answer3 != answer4) {
								document.querySelector('.result').innerHTML = `
									<h2 class="title">Solteiro(a) Otimista</h2>
									<p class="text">
										Você é uma pessoa bastante sonhadora e que está sempre esbanjando bom humor por onde passa, por isso, é aquele tipo de solteiro que está à procura de um relacionamento, mas não se preocupa com isso, pois está conhecendo ótimas pessoas durante essa busca..
									</p>
									<div class="box-cupom">
										<p class="text">
											use o cupom e ganhe <strong>10% Off</strong>
										</p>
										<p class="cupom">OTIMISTA</p>
										<a class="link" href="/265?PS=40&map=productClusterIds&O=OrderByBestDiscountDESC">Acesse a coleção</a>
									</div>
								`
							} else if (answer4 >= answer1 + answer2 + answer3 && answer4 != answer1 && answer4 != answer2 && answer4 != answer3) {
								document.querySelector('.result').innerHTML = `
									<h2 class="title">Solteiro(a) Sim, sozinho(a) nunca</h2>
									<p class="text">
										Você é uma pessoa que possui uma personalidade bastante carismática e que consegue ver o lado positivo de qualquer situação, por isso, é aquele solteiro que pode até não estar em uma relação, mas nunca está sozinho(a) pois sempre tem seus "contatinhos" fixos.
									</p>
									<div class="box-cupom">
										<p class="text">
											use o cupom e ganhe <strong>10% Off</strong>
										</p>
										<p class="cupom">SOZINHONUNCA</p>
										<a class="link" href="/266?PS=40&map=productClusterIds&O=OrderByBestDiscountDESC">Acesse a coleção</a>
									</div>
								`
							} else if (answer1 == answer2 || answer1 == answer3 || answer1 == answer4 || answer2 == answer3 || answer2 == answer4 || answer3 == answer4) {
								document.querySelector('.result').innerHTML = `
									<h2 class="title">Solteiro(a) Confuso(a)</h2>
									<p class="text">
										Você é uma pessoa que vive com a cabeça cheia de novas ideias para colocar em prática e que tem uma enorme facilidade em se adaptar a novas situações, por isso, é aquele tipo de solteiro que nunca sabe se quer um relacionamento sério ou curtir a sua solteirice.
									</p>
									<div class="box-cupom">
										<p class="text">
											use o cupom e ganhe <strong>10% Off</strong>
										</p>
										<p class="cupom">CONFUSO</p>
										<a class="link" href="/267?PS=40&map=productClusterIds&O=OrderByBestDiscountDESC">Acesse a coleção</a>
									</div>
								`
							}
						}
						$('.quiz-solteiro .link').on('click', function () {
							$('.quiz-solteiro').remove()
						})
					}
				})
			}, 2000)
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

		compraFixa: function(){
			$(window).scroll(function(event) {
				function compraFixa() {
					var scroll = $(window).scrollTop(); 
					if(scroll > 850)
					{ 
						$("#compraFixa").fadeIn("slow").addClass("show");
					}
					else
					{
						$("#compraFixa").fadeOut("slow").removeClass("show");
					}
				}
				compraFixa();
			});
		},

		iniciaCountdown: function() {
			$(".oferta_do_dia .prod-right").each((function() {
					$(this).find(".flags-promo").vtexCountdown()
			}))
		},

		iniciaCountdownPDP: function() {
			$(".polo-produto_content").each((function() {
				$(this).find(".promo-flag-wrap").vtexCountdown()
			}))
		},

		variationsQuantity: function () {
			$('.sku-selector-container').append('<div class="variations-quantity">')

			$(document).ready(function () {
				var batch = new Vtex.JSEvents.Listener('batch', batchQyde)
				skuEventDispatcher.addListener(skuDataReceivedEventName, batch)
			})
			
			$('.sku-selector-container .Tamanho .input-dimension-Tamanho').each(function(){
				$(this).on('click', function(){
					$('.sku-selector-container .Tamanho label').removeClass('arrow-top')
				})
			})

			function batchQyde(e) {
						if (e.skuData.SkuSellersInformation[0].AvailableQuantity >= 3){
							$('.variations-quantity .text').remove()
						}

						if (e.skuData.SkuSellersInformation[0].AvailableQuantity < 3){
				if (e.skuData.SkuSellersInformation[0].AvailableQuantity >= 1){
					
					$('.variations-quantity').html(`
					<span class="text">
						<strong>Está acabando!</strong> Restam apenas ${e.skuData.SkuSellersInformation[0].AvailableQuantity} peças em estoque.
					</span>
					`)
					$('.sku-selector-container .Tamanho label.sku-picked').addClass('arrow-top')
				}

				if (e.skuData.SkuSellersInformation[0].AvailableQuantity < 2){
					$('.variations-quantity').html(`
					<span class="text">
						<strong>Está acabando!</strong> Resta apenas ${e.skuData.SkuSellersInformation[0].AvailableQuantity} peça em estoque.
					</span>
					`)
					$('.sku-selector-container .Tamanho label.sku-picked').addClass('arrow-top')
				}
				}
			}
		},
		
		init: function () {
			//Geral
			poloWear.menuPrincipal();
			poloWear.headerHeight();
			//poloWear.quizSolteiro();
			poloWear.buscaMobile();
			poloWear.verificaLogado();
			poloWear.slidePrincipal();
			poloWear.slidePrincipalMobile();
			poloWear.carrosselInformativo();
			poloWear.carrosselMasc();
			poloWear.carrosselFem();
			poloWear.carrosselMedidaCerta();
			poloWear.bannerHoverAlt();
			poloWear.HomeCategoriasTabs();
			poloWear.textoPromocionalCategoriaHome();
			poloWear.prateleirasGerais();
			poloWear.prateleiraCompreOLook();
			poloWear.openMiniCart();
			poloWear.aplicaNomeCategoria();
			poloWear.filtroCategoria();
			poloWear.seletorVisualizacaoDeQtdProdutos();
			poloWear.thumbImg();
			poloWear.slideSimilar();
			poloWear.ofertaLimitada();
			poloWear.qtdProd();
			poloWear.slidePrateleiraBusca();
			poloWear.filtroMobile();
			poloWear.newsletter();
			poloWear.compreJunto();
			poloWear.institucional();
			poloWear.footerMobile();
			poloWear.verMaisMobile();
			poloWear.faleConosco();
			poloWear.recarregaPagina();
			poloWear.compraFixa();
			poloWear.bfLandingPage();
			poloWear.iniciaCountdown();
			poloWear.iniciaCountdownPDP();
			poloWear.variationsQuantity();
		},
		init_ajax: function () {
			poloWear.menuMobile();
		}
	}
	poloWear.init();
	poloWear.init_ajax();

});
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
$.fn.unslick = function() {
    return this.each(function(e, a) {
        a.slick && a.slick.destroy()
    })
};
