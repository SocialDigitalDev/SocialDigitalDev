/*!
	* Subscription product Vtex
	* @version 2.0.0
 	* @author Gustavo Valente
	* @license: MIT
*/

(function($){
    $.fn.vtexSubscription = function(options) {
        
    	/** OPCOES **/
		var defaults = $.extend({
			title: 'Escolha a o período:',
			changePrice: true,
			htmButton: '<span>Assinar</span>',
			minPrice: 20000,
			discount: 10,
			discountType:'percentual',
			showInfo: true,
			linkInfo: 'Como funciona a recorrência?',
			shippingDay: [5, 15, 25],
			plan: [
              	{'frequency':'2','periodicity':'week' , 'text':'Quinzenal - A cada 2 semanas'},
				{'frequency':'1','periodicity':'month', 'text':'Mensal - Todo mÃªs'},
				{'frequency':'2','periodicity':'month', 'text':'Bimestral - A cada 2 meses'}
			],
			after: 'modal',
			callback: 'onpage'
		}, options);

		var _this = this;
		var subscription = 
		{
			init:function()
			{
				this.event();
				this.setup();
			},

			setup:function()
			{
				
					
					var			
					_avulso = $('.value-field.Avulso:eq(0)'),
					_similar = $('.value-field.Similar:eq(0)'),
					_checked = '',
					_discount = '',
					_selected = 'Assinar',
					_options = '',
					_unique = '',
					_sku = '',
					_qtyAvulso = 0,
					_qtyAssinar = 0;

					//VERFICA SE Ã‰ APENAS AVULSO
					console.log(_avulso.text())

					if (_avulso.length) {
						if (_avulso.text() == 'sim') {

							var esgotado = $('.buy-button.buy-button-ref').attr('style').toString();						

							if (esgotado.indexOf('none') > 1) {
								subscription.aviseme(0, 0)
							} else {
								var _sku_similar = skuJson.skus[0].sku;
								_this.append(								
									'<div class="c-row action" style="padding:20px 0 0">'+
										'<input type="number" value="1" min="1" id="input-custom-quant">'+
								        '<button class="buy buy-unique" data-sku="'+_sku_similar+'">Comprar</button>'+
									'</div>'
								)
							}
						}
						
					} else {

						//ASSINATURA
						//discount
						if(defaults.discount != 0) {
							var showDiscount;
							var valueDiscount;
							//var bestPrice = skuJson.skus[0].bestPrice;
							var bestPrice = skuJson.skus[0].spotPrice;
							var newPrice = subscription.discountPrice(bestPrice, defaults.discount, defaults.discountType);
							var newSellingPrice = parseFloat((newPrice/100).toFixed(2))


							if (defaults.discountType == 'percentual') {
								_discount = '<div class="discount" style="color:#3eb281">Assine e ganhe '+defaults.discount+'% de desconto</div>';

							} else if (defaults.discountType == 'nominal') {
								showDiscount = ((bestPrice - defaults.discount)/100);
								valueDiscount = parseFloat(showDiscount/100).toFixed(2);
								_discount = '<div class="discount">Assine por: '+valueDiscount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+'</div>';
							}

							if(defaults.changePrice) {
								if ($('.price-list-price').length <= 0) {
									var listPrice = skuJson.skus[0].bestPrice;
									var newListPrice = parseFloat((listPrice/100).toFixed(2))
									$('.descricao-preco').prepend('<em class="valor-de price-list-price" style="display: block;">De: <strong class="skuListPrice">'+newListPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+'</strong></em>')
								}
								$('.descricao-preco .valor-por .skuBestPrice').addClass('p-avulso');
								$('.descricao-preco .valor-por').append('<strong style="display:none" class="skuBestPrice p-assinatura">'+newSellingPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+'</strong>');

							}
							
						}
						
						//verifica estoque		
						//if (_similar.length) {
						if (skuJson.skus[0].available = true && skuJson.skus[0].availablequantity > 0) {

							_qtyAssinar = 1;

							//plans
							_sku = skuJson.skus[0].sku;
							$.each( defaults.plan, function( i, val ) {
								//_options += '<li class="item"><a class="buy-subscription" data-frequency="'+val.frequency+'" data-periodicity="'+val.periodicity+'">'+val.text+'</a></li>'
								_options += '<option value="'+val.frequency+' '+val.periodicity+'">'+val.text+'</option>'
							});
							_this.append(
								'<label class="flex" for="Assinar">'+									
									'<input type="radio" class="item-buy" id="Assinar" name="tipo-produto" checked value="'+_sku+'">'+
										'<div class="group">'+
											defaults.htmButton+_discount+
										'<select id="frequency"><option value="0">'+defaults.title+'</option>'+_options+'</select>'+
									'</div>'+
								'</label>'
							);

							$('.p-avulso').hide()
							$('.p-assinatura').show()
							$('.valor-dividido').hide();

							//info
							if(defaults.showInfo) {
								_this.append('<a class="link-info show-modal" rel="jn-info">'+defaults.linkInfo+'</a>');
							}

							//action
							_this.append(
								'<div class="c-row action">'+
									'<input type="number" value="1" min="1" id="input-custom-quant">'+
							        '<button class="buy buy-subscription" data-sku="'+_sku+'">Assinar</button>'+
								'</div>'
							)
						}

						//avulso
						if (_similar.length) {
							var _sku_similar = _similar.text();
							$.ajax({
					            type: 'GET',        					
					            url: 'https://vtexstore.com.br/forfitbox/estoque-sku.php?id='+_sku_similar,
					            success: function(data, textStatus, xhr){   				
										var result = JSON.parse(data);
										//console.log(result)
										var total_balance = 0;
										$.each( result.balance, function( i, val ) {
											total_balance = total_balance + val.totalQuantity; 
										})

										//console.log(total_balance);
										if (total_balance > 0) {
											_this.prepend(
												'<label class="flex" for="Comprar">'+
													'<input type="radio" class="item-buy" id="Comprar" name="tipo-produto" checked value="'+_sku_similar+'">'+
													'<div class="group">'+
														'<span>Comprar</span>'+
													'</div>'+
												'</label>'
											);

											//avise-me
											_qtyAvulso = 1;
											subscription.aviseme(_qtyAssinar, _qtyAvulso)

										} else {
											_this.prepend(
												'<div class="aviseme" style="display: flex;align-items: center;font-size: 14px;padding: 20px 0;clear: both;line-height: 18px;font-weight: 700;"><svg style="width: 30px;height: 30px;margin: 0 10px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/></svg>Produto disponí­vel apenas para recorrência</div>'
											);
										}

						        },
						        error: function (error) {
						            console.error("error", error);        
						        },
						        complete: function()
						        {                             
						                
						        }
						    });
						} else {
							//avise-me
							subscription.aviseme(_qtyAssinar, _qtyAvulso)
						}

					}
				//});
			},

			aviseme:function(qty1, qty2)
			{
				if (qty1 == 0 && qty2 == 0) {
					$('._aviseme').show();
				}
			},

			event:function()
			{
				
				$('body').on('change', '#frequency', function(){
					$('input#Assinar').click();					
					$('#frequency').removeClass('obr').addClass('clt')
				})

				$('body').on('change', '.item-buy', function(){
					var text = $(this).attr('id');
					var _elem = $('.action .buy');
					var _sku = $(this).val();

					_elem.html(text).attr('data-sku',_sku);

					console.log(text)

					if (text == 'Assinar') {
						_elem.addClass('buy-subscription')
						$('#frequency').removeClass('obr').addClass('clt')
						$('.p-avulso').hide()
						$('.p-assinatura').show()
						$('.valor-dividido').hide();
						
					} else {
						$('#frequency').removeClass('obr clt')
						_elem.removeClass('buy-subscription')
						$('.p-avulso').show()
						$('.p-assinatura').hide()
						$('.valor-dividido').show();
					}
				})

				/*
				 MODAL
				*/
				//abre modal
				$('body').on('click', '.show-modal', function(e){
					e.preventDefault();

					var elem = $(this).attr('rel');

					$('.'+elem).fadeIn(100);
					$('body').addClass('noScroll');
				});

				//esconde modal
				$('body').on('click', '.hide-modal', function(e){
					e.preventDefault();

					$(this).parents('.ext-modal').hide();
					$('body').removeClass('noScroll');
				});

				$('body').on('click', '.remove-modal', function(e){
					e.preventDefault();

					$(this).parents('.ext-modal').remove();
					$('body').removeClass('noScroll');
				});

				/*
				 ORDERFORM
				*/
				//remove quantidade
				$('body').on('click', '.remove-cart-qty', function(e) {
					e.preventDefault();

					var
					elem = $(this).parents('.cartSkuGroup').find('.select-qty'),
					num = elem.val();

					if (num == '') {				
						num = 2;
					}
					
					if (num > 1) {	
						elem.val(parseInt(num)-1).trigger('change');
					}
				});				

				//adiciona quantidade
				$('body').on('click', '.add-cart-qty', function(e) {
					e.preventDefault();

					var			
					elem = $(this).parents('.cartSkuGroup').find('.select-qty'),
					num = elem.val();
					if (num == '') {				
						num = 0;
					}

					elem.val(parseInt(num)+1).trigger('change');			
				});

				$('body').on('change', '.select-qty', function(){
					var index = parseInt($(this).parents('.cartSkuGroup').attr('data-index'));
					var qty = $(this).val();

					$('.jn-cart').addClass('load');

					setTimeout(function() {
						vtexjs.checkout.getOrderForm().then(function(orderForm){
							
							var updItem = {
				      			index: parseInt(index),
				      			quantity: parseInt(qty)
				    		};    		
						    return vtexjs.checkout.updateItems([updItem], null, false);

						}).done(function(orderForm){		    
						    $('.ext-modal.recurly').removeClass('load');
						    subscription.orderform(orderForm)
						});
					}, 100)
				});


				//remover
				$('body').on('click', '.cartSkuGroup .removeItem', function(){

					var index = parseInt($(this).parents('.cartSkuGroup').attr('data-index'));
					$('.jn-cart').addClass('load');
					setTimeout(function() {
						vtexjs.checkout.getOrderForm().then(function(orderForm) {
						    var
						    itemIndex = 0,
						    item = orderForm.items[itemIndex],
						    itemsToRemove = [
						      {
						        "index": index,
						        "quantity": 0,
						      }
						    ]
						    return vtexjs.checkout.removeItems(itemsToRemove);
						}).done(function(orderForm) {

						   	subscription.orderform(orderForm)
						    
						});
					}, 100)
				})

				//comprar
				$('.wrap-subscription').on('click', '.action .buy', function(){
					var
					sku = $(this).attr('data-sku'),
					qty = $('#input-custom-quant').val();
					esse = $(this);

					esse.addClass('load');

					setTimeout(function() {
						if (!esse.hasClass('buy-subscription')) {
							
	  						subscription.buyUnique(sku, qty);

						} else {
							
							var
							select = $('#frequency').val(),
							value = '',
							frequency = '',
							periodicity = '';

							//plano
							if (select == '0') {
								$('#frequency').addClass('obr').focus();
								esse.removeClass('load');
								return false;

							} else {
								value = select.split(' ');
								frequency = value[0];
								periodicity = value[1];

								//descobre o dia mais prÃ³ximo
								values = defaults.shippingDay,
								today = new Date(),
								sday = today.getDate(),
								day = parseInt(sday),
								purchaseday = values.reduce(function(anterior, corrente) {
									return (Math.abs(corrente - day) < Math.abs(anterior - day) ? corrente : anterior);
								});
								subscription.buySubscription(
									sku,
									qty,
									frequency,
									periodicity,
									purchaseday
								)
							}
						}
					}, 10);
				})
			},

			buyUnique:function(sku, qty) {
				$.ajax({
					type: 'GET',
					url: window.location.origin + '/checkout/cart/add?sku='+sku+'&qty='+qty+'&seller=1&sc=1',
					success: function () {
						if(defaults.callback == 'onpage') {
							minicart.miniCartInit();
							$('.carrinho').click();	
						} else {													
							window.location.href = "/checkout#/cart";
						}

					},
					error: function () {
						console.log('Não foi possí­vel adicionar ao carrinho')
					},
				
					complete : function () {
						$('.buy.load').removeClass('load')
					}
				});
			},

			buySubscription:function(sku, qty, frequency, periodicity, purchaseday)
			{
				
				var			
				sku = sku,
				interval = frequency,
				periodicity = periodicity,
				itemIndex,
				idorderform,
				initDate = new Date(),
				endDate = new Date(),
				attachmentName = 'vtex.subscription.assinatura',
				qty = $('#input-custom-quant').val();

				//load
				$('.jn-cart').addClass('load');
					
				// data indefinida
				endDate.setDate(initDate.getDate() + 1095);

				var
				content = {
					'vtex.subscription.key.frequency': frequency+' '+periodicity,
					'vtex.subscription.key.purchaseday': purchaseday
				}
					
				setTimeout(function() {
					$.ajax({
						type: 'GET',
						url: window.location.origin + '/checkout/cart/add?sku='+sku+'&qty=1&seller=1&sc=1',
						success: function () {
							vtexjs.checkout.getOrderForm().done(function(orderForm){
								setTimeout(function() {

									vtexjs.checkout.getOrderForm().then(function (orderForm) {
										itemIndex = parseInt(orderForm.items.length) - 1;								
										return vtexjs.checkout.addItemAttachment(itemIndex, attachmentName, content);
						
									}).done(function(orderForm) {
										
										idorderform = orderForm.orderFormId;

										//atualiza a quantidade depois do anexo para nÃ£o clonar
										if(parseInt(qty) > 1) {
											

											var updateItem = {
					      						index: itemIndex,
					      						quantity: qty
					    					};
					    					vtexjs.checkout.updateItems([updateItem], null, false);
					    				}
						
										var itemsSubscription = [];
										console.log('aqui');
										console.log(orderForm);

										$.each( orderForm.items, function( i, val ) {
											var recurly = val.attachments;
											var recurlyIndex = i;

											if (recurly.length) {
												itemsSubscription.push(
													{
														"itemIndex": recurlyIndex,
														"plan": {
																"frequency": {
																	"interval": interval,
																	"periodicity": periodicity.toUpperCase()
																},
																"validity":{
																	"begin": subscription.formatDate(initDate),
																	"end": subscription.formatDate(endDate)
																},
																"type":"RECURRING_PAYMENT"
															  }
														}
												)	
											}
											
										})

										var fields = {
											"subscriptions":itemsSubscription,
											"expectedOrderFormSections":["items","totalizers","clientProfileData","shippingData","paymentData","sellers","messages","marketingData","clientPreferencesData","storePreferencesData","giftRegistryData","ratesAndBenefitsData","openTextField","commercialConditionData","customData"]
										};

										$.ajax({			
											headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json'
											},
											url: '/api/checkout/pub/orderForm/'+idorderform+'/attachments/subscriptionData',
											type: 'POST',
											data: JSON.stringify(fields),
											success: function (data, textStatus, request) {



												//callback
												if(defaults.callback == 'onpage') {
													if (defaults.after == 'modal') {
														vtexjs.checkout.getOrderForm().done(function(orderForm){
															subscription.orderform(orderForm);
														});
													} else {
														minicart.miniCartInit();
														$('.carrinho').click();
													}
														
												} else {													
													window.location.href = "/checkout#/cart";
												}
											},
											error: function (request, textStatus, errorThrown) {
												console.log(textStatus)
											},
											complete:function(){
												$('.buy.load').removeClass('load')
											}
										});
									})
								}, 30);
							});
						},
				
						error: function () {
							console.log('Não foi possí­vel adicionar ao carrinho')
						},
				
						complete : function () {}
					});
				}, 30);
			},

			orderform:function(orderForm)
			{
				//vtexjs.checkout.getOrderForm().done(function(orderForm){

				console.log(orderForm)

				var items = '';
				var hmin = '';
				var action = '<a href="/checkout/#/cart" class="cart-subscription">Avançar para o carrinho</a>';
				var total = 0;

				//items					
				$.each( orderForm.items, function( i, val ) {
						
					var attachments = val.attachments;

					//se tiver recorrencia
					if(attachments.length) {

						var
						price = val.sellingPrice,
						name = val.name,
						qty = val.quantity,
						image = val.imageUrl,
						productId = val.productId,
						skuId = val.id,
						//sellingPrice = (price/100).toFixed(2),
						sellingPrice = subscription.discountPrice(price, defaults.discount, defaults.discountType),
						itemPrice = parseFloat((price/100).toFixed(2)),
						subs = attachments[0].content,
						periodicity = subs[Object.keys(subs)[0]],
						text = 'Bimestral';

						//discountPrice: function(price, discount, type)
						//parseFloat(showDiscount/100).toFixed(2);
						//.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

						if (periodicity == '1 month') {								
							text = 'Mensal'
						}

						total = total + (qty*price);
						//console.log(total);

						items += 
						'<ul class="c-row cartSkuGroup" data-sku="'+skuId+'" data-product="'+productId+'" data-index="'+i+'">'+
							'<li class="cartSkuImage"><img src="'+image+'" alt="'+name+'"></li>'+
							'<li class="cartSkuDados">'+
								'<div class="cartSkuName">'+name+'</div>'+															
				                   '<div class="cartSkuQuantity">'+
				                   	'<div class="c-row cart-qty">'+
										'<label>Qtde.:</label>'+
										'<span>'+
											'<a class="remove-cart-qty">-</a>'+
				                       		'<input type="text" class="select-qty" maxlength="4" readonly value="'+qty+'">'+
				                       		'<a class="add-cart-qty">+</a>'+
				                       	'</span>'+
				               		'</div>'+
				                '</div>'+	                    
				                '<div class="cartSkuPrice">'+itemPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+'</div>'+
				                '<div class="cartSkuPeriodicity">'+text+'</div>'+
				                '<a class="removeItem">Ã—</a>'+
							'</li>'+								
						'</ul>';
					}
				});

				console.log('total: '+total)
				//compra mÃ­nima
				if (total > 0) {
					console.log('total')
					if (defaults.minPrice != 0) {
							
						var priceMin = parseFloat((defaults.minPrice/100).toFixed(2));
						//var value = parseFloat(total).toFixed(2);
						var elem = $('.restante-subscription');
						var itemTotal = subscription.discountPrice(total, defaults.discount, defaults.discountType);
						var itemValue = parseFloat((itemTotal/100).toFixed(2));

						elem.find('h5 .value').html(priceMin.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
						elem.find('.total-order').html(itemValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
						elem.find('.total-minimo').html(priceMin.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))						
						elem.show();

						setTimeout( function() {
							subscription.check(total);
						}, 100);

							/*
							hmin = 
							'<div class="restante-subscription">'+
	                        	'<div class="c-row">'+
	                            	'<h5>Valor mÃ­nimo R$ '+priceMin+'</h5>'+
	                            	'<div class="barra"></div>'+
	                            	'<span class="total-order">R$ '+value+'</span>'+
	                            	'<span class="total-minimo">R$ '+priceMin+'</span>'+
	                            	'<div class="restante">Restam apenas <span class="value"></span> para a sua assinatura</div>'+
	                        	'</div>'+
	                    	'</div>'
	                    	*/

	                   	//checa se o total jÃ¡ atingiu mÃ­nimo                    	
	                   	setTimeout( function() {
							subscription.check(total);
						}, 100);

	                    	/*
	                    	if (defaults.minPrice > total) {
	                    		action = '<a class="cart-subscription disable">AvanÃ§ar para o carrinho</a>';
	                    	}
	                    	*/
					}

					$('.items-subscription').html(items);
						
					$('.jn-cart').show().removeClass('load');
					$('body').addClass('noScroll');

				} else {
					console.log('esconde')
					$('.ext-modal.jn-cart').hide()
				}
				
			},

			check:function(total){
				var totalMin = defaults.minPrice;
				var total = subscription.discountPrice(total, defaults.discount, defaults.discountType);
				var diff = (totalMin - total)
				var bar = (total * 100) / totalMin;
				var top = 'cbottom';
				var itemDiff = parseFloat((total/100).toFixed(2));
				var showDiff = parseFloat((diff/100).toFixed(2));

				if (bar > 70) {
					top = 'ctop';
				}

				if (total > totalMin) {
                	$('.cart-subscription').removeClass('disable').attr('href','/checkout#/cart');
                	$('.restante-subscription .barra').css('width','100%');
                	$('.restante-subscription').addClass('_ok');
                	$('.restante-subscription .restante').html('Valor mÃ­nimo atingido')

                } else {
                	$('.cart-subscription').addClass('disable').removeAttr('href','/checkout#/cart');
                	$('.restante-subscription').removeClass('_ok');
                	$('.restante-subscription .barra').css('width',bar+'%');                	
                	$('.restante-subscription .restante').html('Restam apenas <span>'+showDiff.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+'</span>');
                }
                //console.log(showDiff)
                $('.restante-subscription .total-order').html(itemDiff.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})).css('left',bar+'%').removeClass('cbottom ctop').addClass(top);
			},

			discountPrice: function(price, discount, type)
			{
				var showDiscount;
				var valueDiscount;
				var bestPrice = price;

				if(discount != 0) {

					if (type == 'percentual') {
						showDiscount = ((bestPrice*discount)/100);
						valueDiscount = ((bestPrice - showDiscount));

						//valueDiscount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

					} else if (type == 'nominal') {
						showDiscount = ((bestPrice - discount));
						valueDiscount = showDiscount;						

					} else {
						valueDiscount = bestPrice;
					}
				} else {
					valueDiscount = bestPrice;
				}
				//parseFloat(showDiscount/100).toFixed(2);
				//.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
				return valueDiscount
			},

			formatDate:function(data)
			{
				var
		        dia  = data.getDate().toString(),
		        diaF = (dia.length == 1) ? '0'+dia : dia,
		        mes  = (data.getMonth()+1).toString(),
		        mesF = (mes.length == 1) ? '0'+mes : mes,
		        anoF = data.getFullYear();

		    	return anoF+"-"+mesF+"-"+diaF;
			},

			extraiValor:function(str)
			{
				return parseFloat(str.replace(',','.').replace(/(\d)(\.)(?=\d\d\d)/g, '$1').slice(3));
			},

			createCookie:function(name,value,days) {
				var expires = '';

			    if (days) {
			        var date = new Date();
			        date.setTime(date.getTime() + (days*24*60*60*1000));
			        expires = "; expires=" + date.toUTCString();
			    }
			    document.cookie = name + "=" + value + expires + "; path=/";
			},

			readCookie:function(name) {
				var nameEQ = name + "=";
			    var ca = document.cookie.split(';');

			    for(var i=0;i < ca.length;i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1,c.length);
			        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			    }
			    return null;	
			},

			removeCookie:function(name) {
				os_util.createCookie(name,"",-1);
			}
		}

		subscription.init();
		
    }; 
})( jQuery );

$(document).ready(function(){	
	console.log('v002')
	$('.wrap-subscription').vtexSubscription({
    	minPrice: 0,
		type: 'select',
		htmButton: '<span>Assinar</span>',		
		showInfo: true
	});
})