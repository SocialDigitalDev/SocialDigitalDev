const Methods = {
    init() {
        Methods.productClick();
    },

    productClick() {
        $('.j-shelf__item-img a img, .j-shelf__item-name a').live('click', function(e){
            e.preventDefault();
            
            var $this = $(this).parents('.j-shelf__item');
            var $link = $this.find('.j-shelf__item-name a').attr('href');
            
            dataLayer.push({
                'event': 'productClick',
                'ecommerce': {
                    'click': {
                        'actionField': {
                            'list': 'Search Results'
                        },
                        'products': [{
                            'name'      : $.trim( $this.find('.j-shelf__item-name a').text() ),
                            'id'        : $.trim( $this.attr('data-product-id') ),
                            'price'     : $.trim( $this.find('.j-shelf__item-new-price').text().replace('R$ ','').replace(',','.') ),
                            'brand'     : $.trim( $this.find('.j-shelf__item-brand').text() ),
                            'category'  : $.trim( $this.find('.j-shelf__item-category').text() ),
                            'variant'   : $.trim( $this.find('.j-shelf__item-name a').text() ),
                            'position'  : $.trim( $this.attr('data-position') )
                        }]
                    }
                },
                'eventCallback': function () {
                    document.location = $link;
                }
            });
        });
    }
};

export default {
    init: Methods.init
}