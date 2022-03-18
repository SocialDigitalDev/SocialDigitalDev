const Methods = {
	init() {
        $(document).ajaxStop( () => {
                Methods.promoBar();
        });
    },
    
    promoBar() {
        var itemsArr = vtexjs.checkout.orderForm.items;
        var totArr = [0]; 
        for(var i = 0; i < itemsArr.length; i++){ 
            var itemQtty = vtexjs.checkout.orderForm.items[i].quantity; 
            var itemGift = vtexjs.checkout.orderForm.items[i].isGift; 
            var itemVal = vtexjs.checkout.orderForm.items[i].price;
            var itemTot = itemQtty*itemVal;
            if(itemGift == false){
                totArr.push(itemTot);
            }
        }
        var orderTotal = totArr.reduce((total, currentElement) => total + currentElement); 

        if(orderTotal > 0){
            var freeShipping = 14990;
            var freeGift = 0;
            // var percentVal = (orderTotal / freeGift) * 100;
            var percentVal = (orderTotal) * 100;

            var valfreeShipping = freeShipping - orderTotal;
            var valfreeGift = freeGift - orderTotal;

            $('.j-faixa').remove();
            var valFormattedShip = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((valfreeShipping / 100));
            var valFormattedGift = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((valfreeGift / 100));
            if(valfreeShipping < 0 && valfreeGift > 0){
                $('.j-faixa').remove();
                // var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: '+ percentVal +'%;"></div> <p class="j-faixa__text"> Você ganhou <strong>Frete Grátis!</strong> falta <strong>'+ valFormattedGift +'</strong> para você ganhar um brinde.</p> </div>';
                var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: '+ percentVal +'%;"></div> <p class="j-faixa__text"> Você ganhou <strong>Frete Grátis!</strong></p> </div>';
            }else if(valfreeShipping < 0 && valfreeGift < 0){
                $('.j-faixa').remove();
                // var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: 100%;background:#FB4F93;"></div> <p class="j-faixa__text"><strong> VOCE GANHOU FRETE GRÁTIS E UM BRINDE INCRÍVEL! </strong></p> </div>';
                var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: 100%;background:#FB4F93;"></div> <p class="j-faixa__text"><strong> VOCE GANHOU FRETE GRÁTIS! </strong></p> </div>';

            }else{
                $('.j-faixa').remove();
                // var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: '+ percentVal +'%;"></div> <p class="j-faixa__text"> Faltam <strong>'+ valFormattedShip+'</strong> para você ganhar <strong>frete grátis </strong>e <strong>'+ valFormattedGift +'</strong> para você ganhar um brinde.</p> </div>';
                var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: '+ percentVal +'%;"></div> <p class="j-faixa__text"> Faltam <strong>'+ valFormattedShip+'</strong> para você ganhar <strong>frete grátis </strong></div>';
                // var wrapper = '<div class="j-faixa"> <div class="j-faixa__range" style="width: '+ percentVal +'%;"></div> <p class="j-faixa__text"> Você ganhou <strong>Frete Grátis!</strong> falta <strong>'+ valFormattedGift +'</strong> para você ganhar um brinde.</p> </div>';
            }
            $('.j-bottom-header').html(wrapper);

        }else{
            $('.j-faixa').remove();
            var wrapper = '<div class="j-faixa"><p class="j-faixa__text">FRETE GRÁTIS PARA COMPRAS ACIMA DE R$149,90</p> </div>';
            // var wrapper = '<div class="j-faixa"><p class="j-faixa__text">FRETE GRÁTIS BRASIL E BRINDE PARA COMPRAS ACIMA DE R$ 199,99</p> </div>';
            // var wrapper = '<div class="j-faixa"><p class="j-faixa__text">FRETE GRÁTIS BRASIL</p> </div>';
            $('.j-bottom-header').html(wrapper);
        }
    }
};

export default {
	init: Methods.init,
}
