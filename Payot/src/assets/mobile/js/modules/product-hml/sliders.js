const Methods = {
    init() {
        Methods.sliderImage();
        Methods.sliderShelf();
        Methods.similarProducts();
    },

    sliderImage() {
        const images = $('.slider-mobile');;

        images.slick({
            arrows: false,
            dots: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    },

    
    sliderShelf() {
        const images = $('.j-product__shelf .js--shelf > ul');
        
        $('.js--shelf > ul li.helperComplement').remove();

        images.slick({
            arrows: false,
            dots: true,
            slidesToShow: 2,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    },
    similarProducts() {
        $('.j-content__product--variations .j-shelf > ul .helperComplement').remove();
        $('.j-content__product--variations .j-shelf > ul').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            infinite: true
         });
    }
};

export default {
    init: Methods.init
};