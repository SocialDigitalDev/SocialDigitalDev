### README ###

Para rodar o SASS
* install gulp cli (global)
* npm install
* use gulp watch in console to Start


>*Plugins criados para compra de recorrência plataforma Vtex CMS. Indicamos que a instalação seja realizada pelos profissionais da agência certificados pela VTEX. Vale ressaltar que qualquer profissional de CSS, JavaScript e HTML pode também executar esta tarefa.*
----------

##Instalação
Faça o upload para o "Gerenciador do portal" no "Vtex Admin" dos seguintes arquivos:
* vtex-subscription.min.js
* vtex-subscription.min.css

Certifique-se que na página existe o controle customizado: <vtex.cmc:subscriptionInfo />
Esse controle encontra-se na pasta view e pode ser personlizado com html

Execute o plugin sempre na página no onload da página de produto produto:
```javascript
$(document).ready(function(){
	$('.wrap-subscription').vtexSubscription();
})
```

Configurações completas do plugin
```javascript
$('.wrap-subscription').vtexSubscription({
   	title: 'Escolha a frequência que quer receber o esse produto:', // titulo que antecede a escolha da frequencia
	htmButton: '<span>Assinar</span>', // texto do botão comprar com assinatura
	minPrice: 20000, // preço mínimo da assinatura // 0 = sem preço mínimo	
	discount:10, //desconto na assinatura
	discountType:'percentual', //desconto percentual ou nominal		
	showInfo: true, // exibição do link de de saiba mais (true ou false). *conteúdo no controle <vtex.cmc:subscriptionInfo />
	linkInfo: 'Como funciona a assinatura?', //texto do link saiba mais
	shippingDay: [5, 15, 25], // efetivação dos dias da recorrencia
	plan: [
		{'frequency':'1','periodicity':'month', 'text':'Mensal - Todo mês'},
		{'frequency':'2','periodicity':'month', 'text':'Bimestral - A cada 2 mêses'}
	], // planos de assinatura
	callback: 'onpage' // ação depois da compra (onpage ou location)
	after: 'modal', //depois de adicionar ao carrinho abre modal ou minicart
})
```