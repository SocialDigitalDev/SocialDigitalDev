const main = () => {
    bodyEvent()
}

const bodyEvent = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            //console.log('is body event')
        })
}
var scre = $(window).width();
var header = {
    topBarFrete: function() {
        document.addEventListener('DOMContentLoaded', function(){
            var minimumCart = 100;
            vtexjs.checkout.getOrderForm()
            .done(function(orderForm) {
              var progBar = document.querySelector('.prog-bar');
              var p = document.querySelector('#bar-prog p');
              var int = orderForm.value;
              var tmp = int+'';
              tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
              if( tmp.length > 6 )
                  tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
          
              var value = tmp.substring(0, tmp.length - 3);
              if (value < minimumCart) {
                  var perc = (value * 100 ) / minimumCart;
                  progBar.style.width = perc+"%";
                  var tmp = int+'';
                  tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
                  if( tmp.length > 6 )
                      tmp = tmp.replace(/([0-9]{3}).([0-9]{2}$)/g, "$1.$2");
                      //console.log(tmp);
                      //console.log(perc);
                  var newValue = minimumCart - parseFloat(tmp);
                  newValue = newValue.toFixed(2).replace('.',',');
                  p.innerHTML = "FALTAM R$ "+newValue+" PARA VOCÊ GANHAR FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
              } else {
                  progBar.style.width = "100%";
                  p.innerHTML = "PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
              }
            });
            $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
                var progBar = document.querySelector('.prog-bar');
                var p = document.querySelector('#bar-prog p');
                var int = orderForm.value;
                var tmp = int+'';
                tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
                if( tmp.length > 6 )
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
          
                var value = tmp.substring(0, tmp.length - 3);
                if (value < minimumCart) {
                    var perc = (value * 100 ) / minimumCart;
                    progBar.style.width = perc+"%";
                    var tmp = int+'';
                    tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
                    if( tmp.length > 6 )
                        tmp = tmp.replace(/([0-9]{3}).([0-9]{2}$)/g, "$1.$2");
                        //console.log(tmp);
                        //console.log(perc);
                    var newValue = minimumCart - parseFloat(tmp);
                    newValue = newValue.toFixed(2).replace('.',',');
                    p.innerHTML = "FALTAM R$ "+newValue+" PARA VOCÊ GANHAR FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
                } else {
                    progBar.style.width = "100%";
                    p.innerHTML = "PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
                }
            });
        });
    },
    abreFechaBusca: function() {
        $('.busca-topo__busca-container .icon-search').click(function(){
            $('fieldset.busca').toggleClass('busca-open');
        });
    },
    abreFechaMinicart: function() {
        $('.header-cart .icon-cart').click(function(){
            $('.header-minicart, .minicart__overlay').addClass('open');
        });
        $('.header-minicart-close, .header-minicart-empty button').click(function(){
            $('.header-minicart, .minicart__overlay').removeClass('open');
        });
    },
    init: function(){
        header.topBarFrete();
        header.abreFechaBusca();
        header.abreFechaMinicart();
    }
}
header.init();

export default main