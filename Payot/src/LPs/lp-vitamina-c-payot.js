var scre = $(window).width();

var vitaminaClp = {
    vitrineProdutos: function(){
        $('.helperComplement').remove();
        $('.j-shelf > ul').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });
        if(scre <= 768){
            $('.itens-list > ul').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            });
            $('.mobile-adjustment').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            });
        }
    },
    moveSlickArrowToSlickDots: function() {
        if(scre > 768){
            $('.slick-dots').append('<div class="custom-arrow"></div>');
            $('.slick-arrow').appendTo('.custom-arrow');
        }
    },
    init: function() {
        vitaminaClp.vitrineProdutos();
        vitaminaClp.moveSlickArrowToSlickDots();
    }
}
vitaminaClp.init();