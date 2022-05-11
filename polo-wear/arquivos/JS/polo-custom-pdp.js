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
    init: function(){
        customPDP.carregaImagemPDP();
    }
}
customPDP.init();