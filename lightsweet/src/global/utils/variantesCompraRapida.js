setTimeout(function(){
    $(".qtdPrateleira .btnAcr").click(function () {
        var atual = parseInt($(this).prev(".qtdVal").val());
        atual = atual + 1;
        $(this).prev(".qtdVal").val(atual);
    });
    $(".qtdPrateleira .btnDec").click(function () {
        var atual = parseInt($(this).next(".qtdVal").val());
        if (atual == 1) {
            $(this).next(".qtdVal").val("1");
        } else {
            atual = atual - 1;
            $(this).next(".qtdVal").val(atual);
        }
    });
    $(".qtdPrateleira .qtdVal").bind("keyup blur focus", function (e) {
        e.preventDefault();
        var expre = /[^\d]/g;
        $(this).val($(this).val().replace(expre, ''));
    });
    $(".ls-prateleira li .ls-product").each(function (index, el) {
        var _element = $(this);
        var _sku = _element.find(".ls-sku").val();
        _element.find(".ls-buy").click(function(){
            var qtd = $(this).parent().find(".qtdPrateleira .qtdVal").val();
            if (_sku.length) {
                var item = { 
                    id: _sku, 
                    quantity: qtd,
                    seller: "1" 
                };
                var params = window.location.search;
                vtexjs.checkout.addToCart([item]).then(function(orderForm){
                    if (params.indexOf('?utm_source=') > -1 && params.indexOf('&utm_campaign=') > -1){
                        var urlParams = window.location.search;
                        var newParams = urlParams.split('?utm_source=');
                        var lastParams = newParams[1].split('&utm_campaign=');
                        var source = lastParams[0];
                        var campaign = lastParams[1];
                        vtexjs.checkout.sendAttachment('marketingData', { utmSource: source, utmCampaign: campaign });
                    }

                }).done(function (orderForm) {
                    $(".header-minicart").addClass("open");
                    // _element.find('.ls-cta-comprar').slideToggle();
                    
                    // RETIRAR IF APÓS DECIDIR APLICAR NO SITE TODO
                    
                    if ($('body').hasClass('card')) {

                        _element.find('a.ls-buy-button').addClass('added');
                        _element.find('a.ls-buy-button').append(`
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        `);
                        
                    }
                    setTimeout(function () {
                        $(".header-minicart").removeClass("open");
                        if ($('body').hasClass('card')) {
                            _element.find('a.ls-buy-button').removeClass('added');
                            _element.find('a.ls-buy-button svg').remove();
                        }
                    }, 5e3);

                    // ANIMAÇÃO
                });
            }
        });
    });
}, 2000);