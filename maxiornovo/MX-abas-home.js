const carouselTabsHome = () => {

    function qs(id) {
        return document.querySelector(id);
    }

    function slideTabsPrat(id) {

        // $(`${id} li.helperComplement`).remove();
        setTimeout(() => {
            $(id).slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true,
                arrows: true,
                infinite: false,            
                
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            arrows: true,
                            dots: false,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            arrows: true,
                            dots: false,                   
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            arrows: true,
                            dots: false,
                            centerMode: false,                        
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            arrows: true,
                            dots: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ],
            });
           
        },150);
    }

    function hasSlick(name, showSlideNumber) {
        if ($(name).hasClass('slick-initialized')) {
            $(name).slick('unslick');
        }
        showSlide(showSlideNumber);
    }

    function abaClicks() {
        //01
        $("body").on("click", ".abas_vitrine .carrossel_aba_1 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba").removeClass("active");
            $(".abas_vitrine .carrossel_aba_2").removeClass("active");
            $(".abas_vitrine .carrossel_aba_3").removeClass("active");
            $(".carrossel_aba_1").addClass("active");
            $(".abas_vitrine .carrossel_aba_1").addClass("active");
            hasSlick(`.carrossel_aba_1 .prateleira > ul`, 1);
            // showSlide(1);
        });
        //02
        $("body").on("click", ".abas_vitrine .carrossel_aba_2 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba").removeClass("active");
            $(".abas_vitrine .carrossel_aba_3").removeClass("active");
            $(".abas_vitrine .carrossel_aba_1").removeClass("active");
            $(".carrossel_aba_2").addClass("active");
            $(".abas_vitrine .carrossel_aba_2").addClass("active");
            // $(`.carrossel_aba_2 .prateleira > ul`).slick('unslick');
            // showSlide(2);
            hasSlick(`.carrossel_aba_2 .prateleira > ul`, 2);
        });
        //03
        $("body").on("click", ".abas_vitrine .carrossel_aba_3 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba").removeClass("active");
            $(".abas_vitrine .carrossel_aba_2").removeClass("active");
            $(".abas_vitrine .carrossel_aba_1").removeClass("active");
            $(".carrossel_aba_3").addClass("active");
            $(".abas_vitrine .carrossel_aba_3").addClass("active");
            // $(`.carrossel_aba_3 .prateleira > ul`).slick('unslick');
            // showSlide(3);
            hasSlick(`.carrossel_aba_3 .prateleira > ul`, 3);
        });
       
        //04
        $("body").on("click", ".abas_vitrine .carrossel_aba_4 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba_tres").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_5").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_6").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_7").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_8").removeClass("active");
            $(".carrossel_aba_4").addClass("active");
            $(".abas_vitrine_tres .carrossel_aba_4").addClass("active");
            // if($(`.carrossel_aba_5 .prateleira > ul`).hasClass('slick-initialized')) {
            //     $(`.carrossel_aba_5 .prateleira > ul`).slick('unslick');
            // }

            // showSlide(6);
            hasSlick(`.carrossel_aba_4 .prateleira > ul`, 4);
        });

        //05
        $("body").on("click", ".abas_vitrine_tres .carrossel_aba_5 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba_tres").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_4").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_6").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_7").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_8").removeClass("active");
            $(".carrossel_aba_5").addClass("active");
            $(".abas_vitrine_tres .carrossel_aba_5").addClass("active");
            // if($(`.carrossel_aba_5 .prateleira > ul`).hasClass('slick-initialized')) {
            //     $(`.carrossel_aba_5 .prateleira > ul`).slick('unslick');
            // }

            // showSlide(7);
            hasSlick(`.carrossel_aba_5 .prateleira > ul`, 5);
        });

        //06
        $("body").on("click", ".abas_vitrine_tres .carrossel_aba_6 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba_tres").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_4").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_5").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_7").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_8").removeClass("active");
            $(".carrossel_aba_6").addClass("active");
            $(".abas_vitrine_tres .carrossel_aba_6").addClass("active");
            // if($(`.carrossel_aba_5 .prateleira > ul`).hasClass('slick-initialized')) {
            //     $(`.carrossel_aba_5 .prateleira > ul`).slick('unslick');
            // }

            // showSlide(8);
            hasSlick(`.carrossel_aba_6 .prateleira > ul`, 6);
        });

        //07
         $("body").on("click", ".abas_vitrine_tres .carrossel_aba_7 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba_tres").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_4").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_5").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_6").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_8").removeClass("active");
            $(".carrossel_aba_7").addClass("active");
            $(".abas_vitrine_tres .carrossel_aba_7").addClass("active");
            // if($(`.carrossel_aba_5 .prateleira > ul`).hasClass('slick-initialized')) {
            //     $(`.carrossel_aba_5 .prateleira > ul`).slick('unslick');
            // }

            // showSlide(9);
            hasSlick(`.carrossel_aba_7 .prateleira > ul`, 7);
        });

         //08
         $("body").on("click", ".abas_vitrine_tres .carrossel_aba_8 ", function (e) {
            e.preventDefault();
            $(".carrossel_aba_tres").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_4").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_5").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_6").removeClass("active");
            $(".abas_vitrine_tres .carrossel_aba_7").removeClass("active");
            $(".carrossel_aba_8").addClass("active");
            $(".abas_vitrine_tres .carrossel_aba_8").addClass("active");
            // if($(`.carrossel_aba_5 .prateleira > ul`).hasClass('slick-initialized')) {
            //     $(`.carrossel_aba_5 .prateleira > ul`).slick('unslick');
            // }

            // showSlide(10);
            hasSlick(`.carrossel_aba_8 .prateleira > ul`, 8);
        });
        
    }

    function showSlide(id) {
        slideTabsPrat(`.carrossel_aba_${id} .prateleira > ul`);
    }

    document.addEventListener('DOMContentLoaded', function () {
        $(`.multi-carrossel li.helperComplement`).remove();

        // $(`.carrossel_aba_1 .prateleira > ul`).slick('unslick');

        // console.log('finish him!');
        slideTabsPrat(`.carrossel_aba_1 .prateleira > ul`);
        //slideTabsPrat(`.carrossel_aba_4 .prateleira > ul`);
        slideTabsPrat(`.carrossel_aba_4 .prateleira > ul`);
        abaClicks();
    
    });

};
carouselTabsHome();