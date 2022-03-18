import AddToCart from '../../../../common/js/modules/datalayer/addToCart';

const Methods = {
    init() {
        Methods.structureMobile();
        Methods.btnQuantity();
        Methods.specification();
        Methods.notifyme();
    },

    structureMobile() {
        // Append all images the product

        const images = document.querySelectorAll('.j-content__product--img .thumbs img');
        const wrapperImages = document.querySelector('#image');
        const allImages = document.createElement('ul');

        if( wrapperImages !== null ) {
    
            allImages.classList.add('slider-mobile');
    
            for ( let i = 0; i < images.length; i++ ) {
                allImages.appendChild(images[i]);
            }
            
            wrapperImages.appendChild(allImages);

        }
    },

    btnQuantity() {
        const $btnComprarProduto = $('.j-content__product--infos .j-box-buy .buy-button');
        if( $btnComprarProduto.length ) {

            $btnComprarProduto.click( function() {
                let $this = $(this);
                let url   = $this.attr('href');
                if( url.indexOf('qty=1') > 0 ) {
                    $this.attr('href', url.replace('qty=1', 'qty='+ parseInt( $('.j-box-buy .box-qtd .qtd').val() ) ) );
                }

                AddToCart.init( skuJson,  $('.j-box-buy .box-qtd .qtd').val() );

                fbq('track', 'AddToCart', {
                    content_ids: skuJson.skus[0].sku,
                    content_type: 'product',
                    value: skuJson.skus[0].bestPriceFormated.replace('R$ ','').replace(',','.'),
                    content_name: skuJson.skus[0].skuname,
                    currency: "BRL"
                });
                
            });

            let $recebeQtyForm = $('.j-qty');
            if( $recebeQtyForm.length ) {
                $recebeQtyForm.prepend(
                    '<div class="box-qtd">' +
                    '	<select class="qtd">' +
                    '    <option value="1">1</option>' +
                    '    <option value="2">2</option>' +
                    '    <option value="3">3</option>' +
                    '    <option value="4">4</option>' +
                    '    <option value="5">5</option>' +
                    '	</select>' +
                    '</div>'
                );
                $(document).on('keypress' , '.j-box-buy .box-qtd .qtd', function(e) {
                    let tecla = ( window.event ) ? event.keyCode : e.which;   
                    if( ( tecla > 47 && tecla < 58 ) ) {
                        return true;
                    }else{
                        if ( tecla == 8 || tecla == 0 ) {
                            return true;
                        }else{
                            return false;
                        }
                    }
                });
                $(document).on('change' , '.j-box-buy .box-qtd .qtd', function(e) {
                    $('.j-box-buy .box-qtd .qtd').val( $(this).val() );
                });
                $(document).on('blur' , '.j-box-buy .box-qtd .qtd', function(e) {
                    let $this = $(this);
                    if( $this.val() === '' || parseInt( $this.val() ) < 1 ) {
                        $('.j-box-buy .box-qtd .qtd').val(1);
                    }else{
                        $('.j-box-buy .box-qtd .qtd').val( $this.val() );
                    }
                });
                $(document).on('click', '.j-box-buy .box-qtd .btn', function() {
                    let $this = $(this);
                    let $qtd  = $('.j-box-buy .box-qtd .qtd');
                    let valor = parseInt( $qtd.val() );
                    if( $this.hasClass('btn-mais') ) {
                        $qtd.val( valor + 1 );
                    } else if( $this.hasClass('btn-menos') ) {
                        if( valor > 1 ) {
                            $qtd.val( valor - 1 );
                        }
                    }
                });
            }
        }
    },

    specification() {
        if( $(`#caracteristicas table`).length ) {

            $(`#caracteristicas`).prepend(`<ul class="j-specification"></ul>`);
            $(`#caracteristicas table tr`).each(function(){
                var $this = $(this);

                if( $this.find(`td`).hasClass(`Video-LP`) ) {
                    
                    $(`.slider-mobile`).append(`<li class="js--thumb-video"><img src="/arquivos/player-video.png" /></li>`);
                    $(`body`).append(` <div class="j-popup-video is--hide"> ${$this.find(`td`).html()} </div> `);
                    Methods.openVideo();
                    Methods.closeVideo();

                } else {

                    var $title = $this.find(`th`).text();
                    var $description = $(this).find(`td`).text();
                    $(`.j-specification`).append(`<li><strong>${$title}:</strong> ${$description}</li>`);

                }
            });

        } else {
            $(`.j-details`).hide();
        }
    },

    openVideo() {
        $(`.js--thumb-video`).live(`click`, function(){
            $(`.j-popup-video`).removeClass(`is--hide`);
            $(`body`).addClass(`no--scroll`);
        })
    },

    closeVideo() {
        $(`.no--scroll, .j-popup-video`).live(`click`, function(){
            $(`.j-popup-video`).addClass(`is--hide`);
            $(`body`).removeClass(`no--scroll`);
        })
    },

    notifyme() {
        if( $(`.notifyme.sku-notifyme`).css(`display`) == "block" ) {
            $(`.j-qty`).hide();
            $(`.j-buy .notifymetitle.notifyme-title`).text(`Produto indisponível`);
            $(`#notifymeButtonOK`).val(`avisar-me`);
        }
    }
};

export default {
    init: Methods.init
}