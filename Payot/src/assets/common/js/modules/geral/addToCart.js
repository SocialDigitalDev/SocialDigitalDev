const Methods = {
    addToCart( $prodId, $qtd, $link ) {
        vtexjs.catalog.getProductWithVariations($prodId).done(function (product) {
            if ( product.skus.length <= 1 && product.available == true ) {

                var sc = product.salesChannel;
                var item = {
                    id: product.skus[0].sku,
                    quantity: $qtd,
                    seller: product.skus[0].sellerId
                };

                vtexjs.checkout.addToCart([item], null, sc).done(function (orderForm) {
                    $('.js--open-minicart').trigger('click');
                });

            } else {
                if( $link !== "" ) {
                    window.location.href = $link;
                }
            }
        });
    }
};

export default {
    init: Methods.addToCart
}