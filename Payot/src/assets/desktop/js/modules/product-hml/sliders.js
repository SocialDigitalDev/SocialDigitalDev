const Methods = {
    init() {
        Methods.similarProducts();
        Methods.thumbSlider();
        Methods.productsSlider();
        
        $('.j-content__product--infos .j-box-variations .sku-selector-container ul li input').live('change', function () {
            $("#show > ul.thumbs").slick('unslick');

            setTimeout(function () {
                Methods.thumbSlider();
            }, 150);
        });
    },

    similarProducts() {
        if ($('.j-box-variations .j-shelf > ul li').length > 4){
            $('.j-content__product--variations .j-shelf > ul .helperComplement').remove();
            $('.j-content__product--variations .j-shelf > ul').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: true
            });
        }
    },

    thumbSlider() {
        $("#show > ul.thumbs").slick({
            arrows: true,
            dots: false,
            slidesToShow: 5,
            autoplay: true,
            autoplaySpeed: 5000,
            vertical: true,
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