import PromoView from '../../../../common/js/modules/datalayer/promoview';
import PromoClick from '../../../../common/js/modules/datalayer/promoClick';

const Methods = {
    init() {
        Methods.bannerMain();
        Methods.sliderShelf();
        Methods.bannersDouble();
        Methods.navigator();
        Methods.pagination(1);
        PromoView.init();
        PromoClick.init();
    },

    bannerMain() {
        $(".j-banner__slider").slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    },

    sliderShelf() {
        $('.helperComplement').remove();

        $(".j-home__tabs-item .j-shelf > ul").slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 3,
            autoplay: true,
            autoplaySpeed: 1000,
        });
    },

    bannersDouble() {
        $(".j-home__double-slider").slick({
            slidesToShow: 2,
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    },

    navigator() {
        $(`.j-home__tabs--title li`).live(`click`, function(){
            var index = $(this).attr(`data-tab-id`);
        
            if( index == `prevew` ){
                var current = $(`.j-home__tabs--title li.is--active`).attr(`data-tab-id`);

                if( current > 1 ) {

                    var preview = parseInt(current)-parseInt(1);
            
                    $(`.j-home__tabs--title li[data-tab-id="${current.toString()}"], .j-home__tabs-item[data-tab-item="${current.toString()}"`).removeClass(`is--active`)
                    $(`.j-home__tabs--title li[data-tab-id="${preview.toString()}"], .j-home__tabs-item[data-tab-item="${preview.toString()}"`).addClass(`is--active`);
                    $(`.j-home__tabs-item .js--shelf ul`).slick(`unslick`);
                    Methods.sliderShelf();
                    
                }

            } else if( index == `next` ){
                var current = $(`.j-home__tabs--title li.is--active`).attr(`data-tab-id`);

                if( current <3 ) {

                    var next = parseInt(current)+parseInt(1);
            
                    $(`.j-home__tabs--title li[data-tab-id="${current.toString()}"], .j-home__tabs-item[data-tab-item="${current.toString()}"`).removeClass(`is--active`)
                    $(`.j-home__tabs--title li[data-tab-id="${next.toString()}"], .j-home__tabs-item[data-tab-item="${next.toString()}"`).addClass(`is--active`);
                    $(`.j-home__tabs-item .js--shelf ul`).slick(`unslick`);
                    Methods.sliderShelf();

                }

            } else {
        
                $(`.j-home__tabs--title li, .j-home__tabs-item`).removeClass(`is--active`);
                $(`.j-home__tabs--title li[data-tab-id="${index}"], .j-home__tabs-item[data-tab-item="${index}"]`).addClass(`is--active`);
                $(`.j-home__tabs-item .js--shelf ul`).slick(`unslick`);
                Methods.sliderShelf();
        
            }
        });
    },

    pagination( index ) {
        setTimeout(function(){
            if( index <=3 ) {
                $(`.j-home__tabs--title ul li[data-tab-id="${index}"]`).click();
                index++;
                Methods.pagination(index);
            } else {
                index = 1;
                Methods.pagination(index);
            }
        },5000);
    }
};

export default {
    init: Methods.init
};