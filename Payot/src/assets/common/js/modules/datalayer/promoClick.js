const Methods = {
    init() {
        Methods.promoClick();
    },

    promoClick() {
        $('.j-banner__main .j-banner__slider a').live('click', function (e) {
            e.preventDefault();

            const link      = $(this).attr('href');
            const target    = $(this).attr('target');

            dataLayer.push({
                'event': 'promotionClick',
                'ecommerce': {
                    'promoClick': {
                        'promotions': [{
                            'id': $(this).find('img').attr('src'),
                            'name': $(this).find('img').attr('alt'),
                            'creative': $(this).attr("tabindex") + 1,
                            'position': $(this).attr("tabindex") + 1
                        }]
                    }
                },
                'eventCallback': function () {
                    if( target != undefined ) {
                        window.open( link, target );
                    } else {
                        window.location.href = link
                    }
                }
            });
        });
    }
};

export default {
    init: Methods.init
}