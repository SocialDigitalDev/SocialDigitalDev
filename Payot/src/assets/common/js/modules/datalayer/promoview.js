const Methods = {
    init() {
        Methods.getPromoView();
    },

    getPromoView() {
        let i = 1;
        let promo = [];

        $('.j-banner__main .j-banner__slider img').each(function(){
            var promoItem = {
                'id': $(this).attr('src'),
                'name': $(this).attr('alt'),
                'creative': 'banner' + i,
                'position': 'slot' + i
            }

            promo.push(promoItem);

            i++;
        });


        dataLayer.push({
            'ecommerce': {
                'promoView': {
                    'promotions': promo
                }
            }
        });
    }
};

export default {
    init: Methods.init
}