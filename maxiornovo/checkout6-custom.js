var siteBlindado = document.createElement("script");
siteBlindado.src = "https://cdn.siteblindado.com/aw.js?v=201909";
siteBlindado.type = "text/javascript";
document.querySelector("HEAD").append(siteBlindado);

//For cart steps
(function (window, jQuery) {


    jQuery(function ($) {

        var exec = true;

        function Step1() {
            $(".Step-1").addClass("active");
            $(".Step-1").removeClass("complete");
            $(".Step-2").removeClass("active complete");
            $(".Step-3").removeClass("active complete");
            $(".Step-4").removeClass("active");

            $("#cart-title-new").addClass("isOn");
            $("#orderform-title-new").removeClass("isOn");
            console.log("Step1");
        }

        function Step2() {
            $(".Step-1").addClass("active complete");
            $(".Step-2").addClass("active");
            $(".Step-2").removeClass("complete");
            $(".Step-3").removeClass("active complete");
            $(".Step-4").removeClass("active");

            $("#cart-title-new").addClass("isOn");
            $("#orderform-title-new").removeClass("isOn");
            console.log("Step2");
        }

        function Step3() {
            $(".Step-1").addClass("active complete");
            $(".Step-2").addClass("active complete");
            $(".Step-3").addClass("active");
            $(".Step-3").removeClass("complete");
            $(".Step-4").removeClass("active");

            $("#orderform-title-new").addClass("isOn");
            $("#cart-title-new").removeClass("isOn");

            $(".client-profile-data .accordion-toggle span").html("dados <b>Pessoais</b>");
            $("#orderform-minicart-to-cart").html("Voltar para <b>sacola</b>");
            $(".cart-fixed h2").html("resumo do <b>pedido</b>");

            console.log("Step3");
        }

        function Step4() {
            $(".Step-1").addClass("active complete");
            $(".Step-2").addClass("active complete");
            $(".Step-3").addClass("active complete");
            $(".Step-4").addClass("active");

            console.log("Step4");
        }

        function Progress() {
            switch (window.location.hash) {
                case "#/cart":
                    addTitle();
                    Step1();
                    break;
                case "#/email":
                    Step2();
                    break;
                case "#/profile":
                    Step3();
                    break;
                case "#/shipping":
                    Step3();
                    break;
                case "#/payment":
                    Step4();
                    break;
            }
        }

        function addTitle() {
            if (exec) {
                exec = false;
            }
        }

        window.onpopstate = function (event) {
            Progress();
            addTitle();
        }

        window.onload = function () {
            document.querySelector('#cart-title').innerHTML = "Sacola de Compras";
            $('#cart-title').after('<div class="ProgressBar"><div class="ProgressBar-Inner container"><hr class="vertical"/><div class="Step-1"><span>1<i class="icon-ok"></i></span><h3>Sacola</h3></div><hr class="vertical"/><div class="Step-2"><span>2<i class="icon-ok"></i></span><h3>Identificação</h3></div><hr class="vertical"/><div class="Step-3"><span>3<i class="icon-ok"></i></span><h3>Entrega e Pagamento</h3></div><hr class="vertical"/><div class="Step-4"><span>4<i class="icon-ok"></i></span><h3>Confirmação</h3></div><hr class="vertical"/></div></div>');
            document.querySelector('#cart-choose-more-products').innerHTML = "&larr; Continuar Comprando";
            document.querySelector('#cart-to-orderform').innerHtml = "Concluir Compra";
            var btn_discount = document.querySelector('.summary-coupon');
            btn_discount.style["margin-left"] = 0;
            Progress();
            addTitle();
        }

        $(window).on("load", function () {

            if (window.location.hash == "#/cart") {

                $(".product-item img").each(function () {
                    var newUrl = $(this).attr("src").replace("-55-55", "-500-500");
                    console.log(newUrl)
                    $(this).attr("src", newUrl);
                })
            }

        });
       


    })(window, window.jQuery);
})


$(window).load(function(){
  
  setTimeout(function(){
	
    $("table.table.cart-items").find('tr.product-item').each(function(){
      var $this = $(this);
      var skuData = Number($(this).attr('data-sku'));
      var objAlianca = JSON.parse(sessionStorage.getItem('aliancas'));
        if(objAlianca != null){
          var mARR = objAlianca.gravura.filter(req => req.sku == ""+skuData+"");
          mARR = mARR[0];
          if(mARR != undefined){
              $this.next().next().find('input').val(mARR.nome);
          }
        }
  });

  $("table.table.cart-items").find('tr.product-item').each(function(){
      var $this = $(this);
      var skuData = Number($(this).attr('data-sku'));
      var objFormatura = JSON.parse(sessionStorage.getItem('formatura'));
      if(objFormatura != null){
          var mARR = objFormatura.gravura.filter(req => req.sku == ""+skuData+"");
          mARR = mARR[0];
          if(mARR != undefined){
              $this.next().next().find('input').val(mARR.nome);
          }
      }
  });
    
  },1500);
  
  setInterval(function(){
  	$("a.add-item-attachment.btn.btn-mini").trigger('click');
  });
  
});