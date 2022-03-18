function payMee(){
	var func = function() {
      if (jQuery) {  
        clearInterval(timer);
        $("#payment-group-payMeePaymentGroup").children().html("Transferência Bancária");
        $("fieldset.box-payment-group2.box-payment-option.box-payment-paymee.newPayMeePaymentGroup").empty().append('<img src="/arquivos/paymee_newlayout.png">');
      }
    }
    var timer = setInterval(func, 500);
}

$(document).ready(function(){
  
  $('body').bind('click', function(){
      payMee();
  });
  
});

$(window).load(function(){
	payMee();
});

$(document).ajaxComplete(function () {
    $('<div class="bt-fechar-pix">x</div>').appendTo('.VTEX-PIX__modal-outer-container');

    $('.bt-fechar-pix').on('click', function(){
        $('.VTEX-PIX__modal-background').addClass('hide');
        $('.loading.loading-bg').hide();
        window.location.reload(true);
    })
});