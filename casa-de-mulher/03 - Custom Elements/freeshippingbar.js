// Inserir no seu JS Principal

var freeShippingBar = {
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
            freeShippingBar.verificaValorFreteGratis();
        }
        ))
    },
    init: function() {
        freeShippingBar.verificaValorFreteGratis();
        freeShippingBar.verificaAdicaoSubtracaoCart();
    }
}
freeShippingBar.init();