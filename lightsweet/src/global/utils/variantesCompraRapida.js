setTimeout(function(){
    $(".qtdPrateleira .btnAcr").click(function () {
        var atual = parseInt($(this).prev(".qtdVal").val());
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
    $(".ls-prateleira li .ls-product").each(function (index, el) {
        var _element = $(this);
        var _sku = _element.find(".ls-sku").val();
        _element.find(".ls-buy").click(function(){
            var qtd = $(this).parent().find(".qtdPrateleira .qtdVal").val();
            if (_sku.length) {
                var item = { 
                    id: _sku, 
                    quantity: qtd,
                    seller: "1" 
                };
                vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                    $(".header-minicart").addClass("open"),
                    setTimeout(function () {
                        $(".header-minicart").removeClass("open");
                    }, 5e3);
                });
            }
        });
    });
}, 2000);