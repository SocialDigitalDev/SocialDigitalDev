import AddToCart from '../../../../common/js/modules/datalayer/addToCart';

const Methods = {
    init() {
        Methods.structureMobile();
        Methods.btnWishList();
        Methods.btnQuantity();
        Methods.shareItems();
        Methods.specification();
        Methods.freightReturn();
        Methods.notifyme();
        Methods.getSkuVariations();
        Methods.selectSkus();
        Methods.priceCompreJunto();
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
    btnWishList() {
        $(`.btn-wishlist`).attr(`data-id`, skuJson.productId);
    },

    btnQuantity() {
        const $btnComprarProduto = $('.j-content__product--infos .j-box-buy .buy-button');
        if ($btnComprarProduto.length) {

            $btnComprarProduto.click(function () {
                let $this = $(this);
                let url = $this.attr('href');
                if (url.indexOf('qty=1') > 0) {
                    $this.attr('href', url.replace('qty=1', 'qty=' + parseInt($('.j-box-buy .box-qtd .qtd').val())));
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
            if ($recebeQtyForm.length) {
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
                $(document).on('keypress', '.j-box-buy .box-qtd .qtd', function (e) {
                    let tecla = (window.event) ? event.keyCode : e.which;
                    if ((tecla > 47 && tecla < 58)) {
                        return true;
                    } else {
                        if (tecla == 8 || tecla == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                $(document).on('keyup', '.j-box-buy .box-qtd .qtd', function (e) {
                    $('.j-box-buy .box-qtd .qtd').val($(this).val());
                });
                $(document).on('blur', '.j-box-buy .box-qtd .qtd', function (e) {
                    let $this = $(this);
                    if ($this.val() === '' || parseInt($this.val()) < 1) {
                        $('.j-box-buy .box-qtd .qtd').val(1);
                    } else {
                        $('.j-box-buy .box-qtd .qtd').val($this.val());
                    }
                });
                $(document).on('click', '.j-box-buy .box-qtd .btn', function () {
                    let $this = $(this);
                    let $qtd = $('.j-box-buy .box-qtd .qtd');
                    let valor = parseInt($qtd.val());
                    if ($this.hasClass('btn-mais')) {
                        $qtd.val(valor + 1);
                    } else if ($this.hasClass('btn-menos')) {
                        if (valor > 1) {
                            $qtd.val(valor - 1);
                        }
                    }
                });
            }
        }
    },

    shareItems() {
        $('.j-box-share__list a').each(function () {
            var linkShare = $(this).attr('href');
            var linkProduto = window.location.href;
            var share = linkShare + linkProduto;

            $(this).attr('href', share);
        });
    },

    replaceFreightContent() {
        const tr = document.querySelector('.freight-values thead tr');
        let th = document.createElement('th');
        let textTh = document.createTextNode('Entrega');
        th.appendChild(textTh);
        tr.appendChild(th);

        document.querySelector('.freight-values thead tr th:first-child').innerText = "Valor";
        document.querySelector('.freight-values thead tr th:nth-child(2)').innerText = "Prazo";
        document.querySelector('.freight-values thead tr th:nth-child(3)').innerText = "Frete";

        const especItems = document.querySelectorAll('.freight-values table tbody tr td:nth-child(2)');

        for (var i = 0; i < especItems.length; i++) {
            let text = especItems[i].innerText.split(', entrega em ');
            let tipoDeFrete = text[0];
            let prazo = text[1].split('para o CEP')[0];
            especItems[i].innerText = prazo;
            especItems[i].nextElementSibling.innerText = tipoDeFrete;
        }
    },

    freightReturn() {
        $(document).ajaxSuccess(function (event, xhr, settings, data) {
            if (settings.url.indexOf("frete/calcula") != -1) {
                Methods.replaceFreightContent();
            }
        });
    },

    specification() {
        if ($(`#caracteristicas table`).length) {

            $(`#caracteristicas`).prepend(`<ul class="j-specification"></ul>`);
            $(`#caracteristicas table tr`).each(function () {
                var $this = $(this);
                
                if( $this.find(`td`).hasClass(`Video-LP`) ) {
                    
                    $(`.thumbs`).append(`<li class="js--thumb-video"><img src="/arquivos/player-video.png" /></li>`);
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
        if ($(`.notifyme.sku-notifyme`).css(`display`) == "block") {
            $(`.j-qty`).hide();
            $(`.j-buy .notifymetitle.notifyme-title`).text(`Produto indisponível`);
            $(`#notifymeButtonOK`).val(`avisar-me`);
            $(`.j-freight`).hide();
        }
    },

    getSkuVariations() {
        $('.j-sku-selection').html('');
        var apiUrl = '/api/catalog_system/pub/products/crossselling/similars/'+skuJson.productId;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if(data.length > 0){
                $('.j-sku-selection').append('<ul></ul>');
                for(var i = 0; data.length > i; i++){
                    data[i].items[0].images.forEach(function(item){
                        if(item.imageLabel == "thumb"){
                            $('.j-sku-selection ul').append('<li>'+
                                '<a href="'+data[i].link+'" class="sku-select-'+data[i].items[0].itemId+'">'+
                                    '<img src="'+item.imageUrl+'" alt="'+data[i].name+'" />'+
                                '</a>'+
                                '<label for="sku-select-'+data[i].items[0].itemId+'">'+data[i].Cor+'</label>'+
                            '</li>');
                        }
                    });
                }
            }
        });
        $('.j-freight span').on('click', function(){
            $('.j-box-freight').toggle();    
        });
    },
    selectSkus(){
        setInterval(function(){
            $('.j-content__product--infos .j-sku-selection ul li').find("> a").each(function() {
                const $this = $(this);
                const urlFinal = $this.context.href
                const UrlLocal = window.location.href;
                if (urlFinal == UrlLocal) {
                  $this.parents('li').css('opacity', '1').css('border','1px solid').css('padding','1px').css('order','1').addClass('active')
                }
            });
            const mylist = $('.j-content__product--infos .j-sku-selection ul');
            const listitems = mylist.children('li').get();
            listitems.sort(function(a, b) {
            return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
            })
            $.each(listitems, function(idx, itm) { mylist.append(itm); });
        },200);
    },

    priceCompreJunto(){
        $('td.buy').each(function(){
            var valorTotal = $(this).text();
            valorTotal = valorTotal.split('Valor total: ');
            valorTotal = valorTotal[1].split(' Comprando');
            
            $(this).find('.comprar-junto').before('<span class="compre-por">Compre os 2 produtos:</span><span class="price">Por '+valorTotal[0].trim()+'</span>');
        })
    }

};

export default {
    init: Methods.init
}