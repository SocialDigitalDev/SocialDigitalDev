const Methods = {
    init() {
        Methods.getProductInfos();
    },

    getProductInfos() {
        dataLayer.push({
            'ecommerce': {
                'detail': {
                    'actionField': {
                        'list': vtxctx.departmentName
                    },
                    'products': [{
                        'name'      : skuJson.name,
                        'id'        : skuJson.productId,
                        'price'     : skuJson.skus[0].bestPrice/100,
                        'brand'     : $.trim( $('.j-product__brand').text() ),
                        'category'  : vtxctx.categoryName,
                        'variant'   : skuJson.skus[0].skuname
                    }]
                }
            }
        });
    }
};

export default {
    init: Methods.init
}