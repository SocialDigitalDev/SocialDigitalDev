const Methods = {
    init() {
        Methods.showImage();
        Methods.showVideo();
        Methods.openVideo();
        Methods.closeVideo();
        Methods.sliderShelf();
    },

    showImage() {
        $('.product_field_68').each(function(){
            var $this = $(this);
            var img = $this.find('li').text();
            if( img.indexOf('vteximg') ) {
                $this.parent().html(`<img src="${img}" />`);
            }
        });
    },

    showVideo() {
        $('.product_field_69').each(function(){
            var $this = $(this);
            var $video = $this.find('li').html();
            
            if( $video !== "" ) {
                $this.parents('.j-prod-vitamina-buy-video').removeClass(`is--hide`);
                $this.parent().html( $video );
            }
        });
    },

    openVideo() {
        $(`.j-prod-vitamina-buy-video`).live(`click`, function(){
            $(this).find(`.j-popup-video`).clone().appendTo($(`body`));
            $(`body > .j-popup-video`).removeClass(`is--hide`);
            $(`body`).addClass(`no--scroll`);
        });
    },

    closeVideo() {
        $(`body.no--scroll`).live(`click`, function() {
            $(`body`).removeClass(`no--scroll`);
            $(`body > .j-popup-video`).remove();
        });

        $(`body > .j-popup-video`).live(`click`, function() {
            $(`body`).removeClass(`no--scroll`);
            $(this).remove();
        });
    },

    sliderShelf() {
        $('.helperComplement').remove();

        $(".j-shelf-vitamina > ul").slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 5000
        });
    }
};

export default {
    init: Methods.init
};