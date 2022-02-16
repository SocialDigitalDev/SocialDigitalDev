setTimeout(function(){
    $(".ls-prateleira li .ls-product").each(function (index, el) {
        var _element = $(this);
        var _sku = _element.find(".ls-sku").val();
        _element.find(".ls-buy").click(function(){
            if (_sku.length) {
                var item = { 
                    id: _sku, 
                    quantity: "1",
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