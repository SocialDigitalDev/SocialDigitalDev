const Methods = {
    init() {
        Methods.sliderImage();
        Methods.sliderShelf();
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
        const images = $('.js--shelf > ul');

        $('.js--shelf > ul li.helperComplement').remove();

        images.slick({
            arrows: false,
            dots: true,
            slidesToShow: 2,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }
};

export default {
    init: Methods.init
};