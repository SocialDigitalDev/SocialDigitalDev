setTimeout(function(){
    $(".om-prateleira li .om-product").not(".om-ajax-completed").each(function (index, el) {
        var _element = $(this);
        _element.addClass("om-ajax-completed"), _element.find(".om-hover-content").prepend('<div class="hidden-list-skus"></div><ul class="om-color-list"></ul>');
        var _product_id = _element.find(".om-id").val();
        var avSku;
        vtexjs.catalog.getProductWithVariations(_product_id).done(function(product){
            avSku = product.skus;
            var colorName = product.dimensionsMap.Cor;
            var Tamanho = product.dimensionsMap.Tamanho;
            for (var j = 0; j < avSku.length; j++){
                var avColor = avSku[j].dimensions.Cor;
                var avTamanho = avSku[j].dimensions.Tamanho;
                var skuVtex = avSku[j].sku;
                var skuAvailable = avSku[j].available;
                _element.find(".hidden-list-skus").append('<input class="hidden-select" type="hidden" data-id="'+ skuVtex +'" data-color="' + avColor + '" data-tamanho="' + avTamanho + '" data-available="' + skuAvailable + '" />');
            }
            for (var i = 0; i < colorName.length; i++) {
                var _color_name = colorName[i];
                if(_color_name !== undefined){
                    _element.find(".om-color-list").prepend('<li class="' + _color_name + '" data-color="'+ _color_name +'">' + _color_name + "</li>");
                }
            }
            for (var k = 0; k < Tamanho.length; k++) {
                var _Tamanho = Tamanho[k];
                if(_Tamanho !== undefined){
                    _element.find(".om-variations").prepend('<li class="prod-size ' + _Tamanho + '" data-tamanho="'+ _Tamanho +'">' + _Tamanho + "</li>");                           
                }
            }
            
        });
        $(document).on("click", ".om-variations li, .om-color-list li", function () {
            $(this).parent().find("li").removeClass("om-active"),
            $(this).addClass("om-active");
            _element.find('.om-buy a').removeAttr('href');
        });
        _element.find(".om-buy").hover(function(){
            var selectorTamanho = $('.om-variations li.om-active').attr('data-tamanho');
            var selectorCor = $('.om-color-list li.om-active').attr('data-color');
            _element.parent().find(`.hidden-list-skus input[data-tamanho="${selectorTamanho}"][data-color="${selectorCor}"]`).addClass('selected');
        });
        _element.find(".om-buy").click(function(){
            
            var _sku = _element.parent().find('.selected');
            if (_sku.attr('data-available') == "false"){
                alert('Produto não disponí­vel nesta combinação');
                $('.hidden-list-skus input').removeClass('selected');
                _element.parent().find("li").removeClass("om-active");
            } else {
                if (_sku.length) {
                    var item = { 
                        id: _sku.attr("data-id"), 
                        quantity: "1",
                        seller: "1" 
                    };
                    vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                            $(".header-minicart").addClass("open"),
                            setTimeout(function () {
                                $(".header-minicart").removeClass("open");
                            }, 5e3);
                            
                        });
                        $('.hidden-list-skus input').removeClass('selected');
                        _element.parent().find("li").removeClass("om-active");
                } else { 
                    alert("Selecione um tamanho e uma cor.");
                }
            }
        });
    });
}, 2000);