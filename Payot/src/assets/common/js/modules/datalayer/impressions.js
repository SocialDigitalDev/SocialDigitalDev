const Methods = {
    init() {
        Methods.getShelfInfos();
    },

    getShelfInfos() {
        var shelfs = [];
        var i = 1;
        
        $('.js--shelf-item, j-home__shelfs').each(function(){
            var prodInfo = {
                'name'      : $.trim( $(this).find('.j-shelf__item-name a').text() ),
                'id'        : $.trim( $(this).attr('data-product-id') ),
                'price'     : $.trim( $(this).find('.j-shelf__item-new-price').text().replace('R$ ','').replace(',','.') ),
                'brand'     : $.trim( $(this).find('.j-shelf__item-brand').text() ),
                'category'  : $.trim( $(this).find('.j-shelf__item-category').text() ),
                'variant'   : $.trim( $(this).find('.j-shelf__item-name a').text() ),
                'list'      : "Home",
                'position'  : i
            }

            shelfs.push(prodInfo);

            $(this).attr('data-position', i);

            i++;
        });

        dataLayer.push({
            'ecommerce': {
              'currencyCode': 'BRL',
              'impressions': shelfs
            }
        });
    }
};

export default {
    init: Methods.init
}