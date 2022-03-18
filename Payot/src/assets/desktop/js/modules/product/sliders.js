const Methods = {
    init() {
        Methods.thumbSlider();
        Methods.productsSlider();

        $('.j-content__product--infos .j-box-variations .sku-selector-container ul li input').live('change', function () {
            $("#show > ul.thumbs").slick('unslick');

            setTimeout(function () {
                Methods.thumbSlider();
            }, 150);
        });
    },

    thumbSlider() {
        $("#show > ul.thumbs").slick({
            arrows: true,
            dots: false,
            slidesToShow: 5,
            autoplay: true,
            autoplaySpeed: 5000
        });
    },

    productsSlider() {
        $("li[id*='helperComplement']").remove();
        $(".j-product__shelf .j-shelf > ul").slick({
            arrows: true,
            dots: false,
            slidesToShow: 4,
            autoplay: true,
            autoplaySpeed: 5000,
        });
    }
};

export default {
    init: Methods.init
};