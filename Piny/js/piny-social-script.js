
$(document).ready(function () {

    var scre = $("body").width();

    var Piny = {
        
        iconHomeSlider: function () {
            if (scre < 768) {
                $('.kit-icones ul').slick({
                    dots: true,
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: false,
                                dots: true,
                            }
                        },
      
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]
                });
            }
        },
        
        iconProductSlider: function () {
            if (scre < 768) {
                $('.main-product__icons ul').slick({
                    dots: true,
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                infinite: false,
                                dots: true,
                            }
                        },
      
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]
                });
            }
        },  

        productSlider: function () {
            if (scre < 768) {
                $('.main-product__banner-3 ul').slick({
                    dots: true,
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: false,
                                dots: true,
                            }
                        },
      
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ]
                });
            }
        },
        init: function () {
            Piny.iconHomeSlider();
            Piny.iconProductSlider();
            Piny.productSlider();
        }
    }
    Piny.init();
});
