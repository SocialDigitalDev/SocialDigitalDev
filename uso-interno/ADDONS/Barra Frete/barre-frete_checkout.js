document.addEventListener("DOMContentLoaded", function(event) {
  var minimumCart = 150;
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
            console.log(tmp);
            console.log(perc);
        var newValue = minimumCart - parseFloat(tmp);
        newValue = newValue.toFixed(2).replace('.',',');
        p.innerHTML = "FALTAM R$ <span>"+newValue+"</span> PARA PEDIDOS DE ASSINATURA";
    } else {
        progBar.style.width = "100%";
        p.innerHTML = "PARABÉNS! VOCÊ ATINGIU O MÍNIMO PARA O PEDIDO";
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
              console.log(tmp);
              console.log(perc);
          var newValue = minimumCart - parseFloat(tmp);
          newValue = newValue.toFixed(2).replace('.',',');
          p.innerHTML = "FALTAM R$ <span>"+newValue+"</span> PARA PEDIDOS DE ASSINATURA";
        	var btnFiz = document.getElementById('cart-to-orderform');
          if (btnFiz) {
              btnFiz.style.display = "none";
          }
      } else {
          progBar.style.width = "100%";
          p.innerHTML = "PARABÉNS! VOCÊ ATINGIU O MÍNIMO PARA O PEDIDO";
        var btnFiz = document.getElementById('cart-to-orderform');
          if (btnFiz) {
              btnFiz.style.display = "block";
          }
      }
  });

  });