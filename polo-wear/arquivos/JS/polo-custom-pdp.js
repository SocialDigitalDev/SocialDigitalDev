var scre = $(window).width();
var customPDP = {
    carregaImagemPDP: function(){
        vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
            var prodId = product.productId;
            $.get(`/api/catalog_system/pub/products/search?fq=productId:${prodId}`, function(prod){
                var prodItems = prod[0].items;
                var prodImgArray = prodItems[0].images;
                for(var i = 0; i <= prodImgArray.length; i++){
                    var prodImg = prodImgArray[i].imageUrl;
                    $('.grid-image').append(`
                        <div class="image-content">
                            <img src="${prodImg}">
                        </div>
                    `);
                }
            });
        });
    },
    mandaLookAoCarrinho: function(){
        $('.buy-all').click(function(){
            var prodArray = new Array();
            $(this).parent().find('li').each(function(){
                var skuId = $(this).find('input.polo-sku').val();
                prodArray.push({
                    id: skuId,
                    seller: 1,
                    quantity: 1,
                });
            });
            if (prodArray.length) {
                vtexjs.checkout.addToCart(prodArray).done(function (a) {
                    $(".header-minicart").addClass("open"),
                    setTimeout(function () {
                        $(".header-minicart").removeClass("open");
                    }, 5e3);
                });
            }
        });
    },
    init: function(){
        customPDP.carregaImagemPDP();
        customPDP.mandaLookAoCarrinho();
    }
}
customPDP.init();