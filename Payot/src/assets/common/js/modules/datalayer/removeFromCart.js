const Methods = {
    removeFromCart( link, qtd, price ) {

        fetch(`/api/catalog_system/pub/products/search/${link}`, {
            'method': 'GET',
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.vtex.ds.v10+json'
        })
        .then(response => response.json())
        .then(result => {
            if (result.length > 0) {
                
                dataLayer.push({
                    'event': 'removeFromCart',
                    'ecommerce': {
                        'remove': {
                            'products': [{
                                'name'      : result[0].productName,
                                'id'        : result[0].productId,
                                'price'     : price,
                                'brand'     : result[0].brand,
                                'category'  : result[0].Categoria,
                                'variant'   : result[0].items[0].name,
                                'quantity'  : qtd
                            }]
                        }
                    }
                });
            }
        });
    }
};

export default {
    init: Methods.removeFromCart
}