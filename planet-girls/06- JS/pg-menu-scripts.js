
$(document).ready(function() {

    var codePlanet = {

        menuPrincipal : function(){
            
    
      
    
                var menu = $('.menu-principal-novo');
                //var PlanetMenu = dataMenu;
                 	

                $( ".menu-principal-novo" ).append('<div class="box-subMenu fadeIn"><div class="container-center"><div class="sub-menu"><ul class="subCategoria"></ul><div class="imageMenu"></div></div></div></div>' );
               
    


        },
        sliderMenu: function(){
             // Imagens do menu
            setTimeout(function () {
                var imgMenu = [];

                imgMenu[0] = $('.imgAcessorios');
                imgMenu[1] = $('.imgBeleza');
                imgMenu[2] = $('.imgCalcados');
                imgMenu[3] = $('.imgMoletom');
                imgMenu[4] = $('.imgRoupas');

                $('.menu-principal-novo .cat-index-0 .imageMenu').html(imgMenu[0]);
                $('.menu-principal-novo .cat-index-1 .imageMenu').html(imgMenu[1]);
                $('.menu-principal-novo .cat-index-2 .imageMenu').html(imgMenu[2]);
                $('.menu-principal-novo.cat-index-3 .imageMenu').html(imgMenu[3]);
                $('.menu-principal-novo .cat-index-4 .imageMenu').html(imgMenu[4]);

                var prateMenu = $('.imageMenu .prateleira >ul');

                prateMenu.slick({
                    infinite: false,
                    speed: 800,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });

                $('.menu-principal-novo .itemMenu').hover(function () {
                    $('.imageMenu .prateleira >ul').slick('setPosition');
                });

            }, 3000);
        },
       
        init: function() {
            //Geral            
            codePlanet.sliderMenu();
        },
        init_ajax: function(){
            codePlanet.menuPrincipal();
        }
    }
    codePlanet.init_ajax();
    codePlanet.init();

});
