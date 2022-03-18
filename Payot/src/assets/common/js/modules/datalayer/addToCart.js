const Methods = {
    addToCart( skuJson, qtd ) {
        dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': 'BRL',
                'add': {
                    'products': [{
                        'name'      : skuJson.name,
                        'id'        : skuJson.productId,
                        'price'     : skuJson.skus[0].bestPrice/100,
                        'brand'     : 'Payot',
                        'category'  : vtxctx.categoryName,
                        'variant'   : skuJson.skus[0].skuname,
                        'quantity'  : qtd
                    }]
                }
            }
        });
    }
};

export default {
    init: Methods.addToCart
}