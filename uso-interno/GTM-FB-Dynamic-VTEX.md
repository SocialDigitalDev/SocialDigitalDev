### variaveis GTM ###
	- click classes:
		- Grupo: Variáveis incorporadas
		- Tipo: Variável da camada de dados
		- nome da variável:gtm.elementClasses
	

	- productName
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: productName
	

	- pageCategory
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: pageCategory
	

	- productId
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: productId
	

	- productPriceTo
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: productPriceTo
	

	- transactionId
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: transactionId
	

	- transactionTotal
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: transactionTotal
	
    - transactionProducts
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Variável da camada de dados
		- Nome da variável: transactionProducts
		
	- orderFormProducts
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: variáveis da camada de dados
		- orderFormProducts
	

	- shelfProductIds
		- Grupo: Variáveis definidas pelo usuário
		- variavel da camada de dados
		- shelfProductIds
		
	- siteSearchTerm
		- Grupo: Variáveis definidas pelo usuário
		- variavel de camada de dados
		- siteSearchTerm
		
	- skuStocks
		- Grupo: Variáveis definidas pelo usuário
		- variável de camada de dados
		- skuStocks
	

	- productCategoryName
		- - Grupo: Variáveis definidas pelo usuário
		- variável de camada de dados
		- productCategoryName
		
	- productDepartmentName
		- - Grupo: Variáveis definidas pelo usuário
		- variável de camada de dados
		- productDepartmentName
		
	- visitorContactInfoEmail
		- Grupo: Variáveis definidas pelo usuário
		- variáveis da camada de dados
		- visitorContactInfo.0
	

	- productCategoryTreeName
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Javascript personalizado
		- function(){
		  return {{productDepartmentName}} + "/" + {{productCategoryName}};
		}
		
	- ProductsOrderId
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Javascript personalizado
		- function() {
		  var arr = {{transactionProducts}}, len = arr.length, i = -1, res = [];
		  while (++i < len) {res[i] = arr[i].id;};
		  return res;
		}
		
	- orderFormProductsIds
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Javascript Personalizado
		- function() {
		  var arr = {{orderFormProducts}}, len = arr.length, i = -1, res = [];
		  while (++i < len) {res[i] = arr[i].sku;};
		  return res;
		}
	

	- orderFormProductsValue
		- Grupo: Variáveis definidas pelo usuário
		- Tipo: Javascript Personalizado
		- function() {
		  var arr = {{orderFormProducts}}, len = arr.length, i = -1, subtotal = 0;
		  while (++i < len) {if(arr[i].sellingPrice != undefined) subtotal += arr[i].sellingPrice;};
		  return subtotal;
		}
	- ProductsCartId
		- Grupo: Variáveis definidas pelo usuário
		- TIpo: Javascript personalizado
		- function() {
		  var arr = {{orderFormProducts}}, len = arr.length, i = -1, res = [];
		  while (++i < len) {res[i] = arr[i].id;};
		  return res;
		}
		
	- productSkuIds
		- Grupo: Variáveis definidas pelo usuário
		- javascript personalizado
		- function(){return Object.keys({{skuStocks}});}
		
	- transactionProductsIds
		- Grupo: Variáveis definidas pelo usuário
		- javascript personalizado
		- function() {
		  var arr = {{transactionProducts}}, len = arr.length, i = -1, res = [];
		  while (++i < len) {res[i] = arr[i].sku;};
		  return res;
		}


### acionadores GTM ###
	- addToCart
		- TIpo: Clique - todos os elementos
		- Disparado em alguns cliques
		- disparar:
			Click classes - Corresponde a RegEx buy-button|buy-button-ref
	

	- checkout - payment
		- Tipo: Evento Personalizado
		- Nome do evento: payment
		- disparar:
			Todos os eventos personalizados
	

	- checkout - profile
		- Tipo: Evento Personalizado
		- Nome do evento: profile
		- disparar:
			Todos os eventos personalizados
	

	- checkout - shipping
		- Tipo: Evento Personalizado
		- Nome do evento: shipping
		- disparar:
			Todos os eventos personalizados
	

	- checkout - email
		- Tipo: Evento Personalizado
		- Nome do evento: email
		- disparar:
			Todos os eventos personalizados
	

	- checkout - cart
		- Tipo: Evento Personalizado
		- Nome do evento: cart
		- disparar:
			Todos os eventos personalizados
	

	- orderPlaced Trigger
		- Tipo: Evento Personalizado
		- Nome do evento: orderPlaced
		- disparar:
			Todos os eventos personalizados
	

	- pg Busca
		- TIpo: Exibição de página
		- disparado em: Algumas exibições de página
		- disparar:
			- pageCategory corresponde a RegEx InternalSiteSearch
	

	- pg Home
		- TIpo: Exibição de página
		- disparado em: Algumas exibições de página
		- disparar:
			- pageCategory corresponde a RegEx Home
	

	- pg Vitrines
		- TIpo: Exibição de página
		- disparado em: Algumas exibições de página
		- disparar:
			- pageCategory corresponde a RegEx Department|Category|InternalSiteSearch
	

	- pg Geral
		- TIpo: Exibição de página
		- disparado em: Algumas exibições de página
		- disparar:
			- pageCategory corresponde a RegEx Department|Category|Home|InternalSiteSearch
	

	- pg Others
		- TIpo: Evento personalizado
		- Nome do evento: otherView
		- disparar:
			Todos os eventos personalizados
	

	- pg Produto
		- TIpo: Exibição de página
		- disparado em: Algumas exibições de página
		- disparar:
			- pageCategory corresponde a RegEx Product


### tags do GTM ###
	- FB - Pixel
		-  HTML personalizado
			<!-- Facebook Pixel Code -->
			<script>
			!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
			n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
			t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
			document,'script','https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '1581649318719810'); // Insert your pixel ID here.
			fbq('track', 'PageView');
			</script>
			<noscript><img height="1" width="1" style="display:none"
			src="https://www.facebook.com/tr?id=1581649318719810&ev=PageView&noscript=1"
			/></noscript>
			<!-- DO NOT MODIFY -->
			<!-- End Facebook Pixel Code -->
	

		- Acionamento:
			- All Pages
	

	- FB - AddPaymentInfo
		-  HTML personalizado
			<script>fbq('track', 'AddPaymentInfo');</script>
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- checkout - payment
	

	- FB - AddToCart
		-  HTML personalizado
			<script>
	var precoFinal = parseFloat({{orderFormProductsValue}}).toFixed(2);
	var content_ids = {{orderFormProductsIds}};
	if(precoFinal > 0){
		fbq('track', 'AddToCart', {content_ids: content_ids, content_name: {{productName}}, content_category: {{productCategoryName}}, content_type: 'product', value: precoFinal,  currency: 'BRL'});
	}
	 </script>
	

		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- addToCart
			- checkout - cart
	

	- FB - checkout inicio
		-  HTML personalizado
			<script>fbq('track', 'InitiateCheckout');</script>
		- Opções de disparo da tag
			- Uma vez por página
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- checkout - profile
			- checkout - email
	

	- FB - CompleteRegistration
		-  HTML personalizado
			<script>
			  var precoFinal = parseFloat({{orderFormProductsValue}}).toFixed(2);
			  if(precoFinal > 0){
				fbq('track', 'CompleteRegistration', {value: precoFinal,  currency: 'BRL'});
			  }else{
			    fbq('track', 'CompleteRegistration');
			  }
			</script>
	

		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- checkout - shipping
	

	- FB - Order Placed
		-  HTML personalizado
			<script>
				(function() {
						var _fbq = window._fbq || (window._fbq = []);
						if (!_fbq.loaded) {
						var fbds = document.createElement('script');
						fbds.async = true;
						fbds.src = '//connect.facebook.net/en_US/fbds.js';
						var s = document.getElementsByTagName('script')[0];
						s.parentNode.insertBefore(fbds, s);
						_fbq.loaded = true;
						}
					})();
					window._fbq = window._fbq || [];
					window._fbq.push(['track', '{{transactionId}}', {'value':'{{transactionTotal}}','currency':'BRL'}]);
					</script>
					<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?ev={{transactionId}}&cd[value]={{transactionTotal}}&cd[currency]=BRL&noscript=1" /></noscript>
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- orderPlaced Trigger
	

	- FB - Other
		-  HTML personalizado
			<script>fbq('track', 'Other');</script>
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- Pg Others
	

	- FB - Purchase
		-  HTML personalizado
			<script>
			  var precoFinal = parseFloat({{transactionTotal}}).toFixed(2);
			  if(precoFinal > 0){
			  fbq('track', 'Purchase', {value: precoFinal, currency: 'BRL',content_type: 'product',content_ids: {{transactionProductsIds}}});
	

			  }
			</script>
			<noscript>
				<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{transactionTotal}}&ev=PageView&noscript=1"/>
			</noscript>
	

		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- OrderPlaced Trigger
	

	- FB - Search
		-  HTML personalizado
			<script>fbq('track', 'Search',{search_string: '{{siteSearchTerm}}', content_category: 'Product Search', content_ids: '{{shelfProductIds}}'});</script>
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- Pg Vitrines
	

	- FB - ViewContent
		-  HTML personalizado
			<script>var precoFinal = parseFloat({{productPriceTo}}).toFixed(2);fbq('track', 'ViewContent', {value: precoFinal,	currency: 'BRL',content_name: '{{productName}}', content_category: {{productCategoryTreeName}},content_ids: {{productSkuIds}},content_type: 'product'});</script>
		- Sequencia de Tags:
			Disparar tag antes: FB - Pixel
		- Acionamento:
			- Pg Produto