import AddToCart from '../../../../common/js/modules/datalayer/addToCart';

const Methods = {
    init() {
        Methods.btnWishList();
        Methods.btnQuantity();
        Methods.shareItems();
        Methods.specification();
        Methods.freightReturn();
        Methods.notifyme();
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
                    '	<button class="btn btn-menos"> - </button>' +
                    '    <input type="text" class="qtd" value="1" />' +
                    '	<button class="btn btn-mais"> + </button>' +
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
        }
    }

};

export default {
    init: Methods.init
}