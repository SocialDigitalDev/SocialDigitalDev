if ($('#item-quantity-72747057').val() >= 2) {
    $('#item-quantity-72747057').attr('disabled', 'disabled');
    $('#item-quantity-change-increment-72747057').css('pointer-events', 'none');
} else {

    $('#item-quantity-72747057').attr('disabled', '').removeAttr('disabled')
    $('#item-quantity-change-increment-72747057').css('pointer-events', 'all');
}


var Freixenet_Checkout = {
    methods: {
        changeImg: function () {
            $(".container-cart .cart-items .product-item").each(function (el, index) {
                var imageResize = $(this).find("img").attr("src").replace("55-55", "250-250");
                $(this).find("img").attr("src", imageResize)
            }), $(".mini-cart .cart .cart-items li").each(function (el, index) {
                var imageResize = $(this).find("img").attr("src").replace("55-55", "250-250");
                $(this).find("img").attr("src", imageResize)
            })
        },
        statusProcess: function () {
            $(".e-header .e-container__center ul li").each(function (index, el) {
                _element = $(this);
                var _urlHash = window.location.hash.split("#/")[1],
                    _urlPath = window.location.pathname.split("/")[2];
                _element.attr("data-status") == _urlHash && "cart" == _urlHash ? _element.find(".e-icon").addClass("e-active") : _element.attr("data-status") == _urlHash && "payment" == _urlHash && _element.find(".e-icon").addClass("e-active"), _element.attr("data-status") == _urlPath && "orderPlaced" == _urlPath && _element.find(".e-icon").addClass("e-active")
            })
        },
        init: function () {},
        init_ajax: function () {
            /**
                * Adiciona a quantidades de brindes ao aumentar a quantidade do produto em promoção
                
                setTimeout(function() {
                    for( var i = 0; i < vtexjs.checkout.orderForm.items.length; i++) {
                        if(vtexjs.checkout.orderForm.items[i].isGift) {
                            document.createElement("span");
                            
                            // $('.cart-gift-items .product-name span:first-child').prepend(vtexjs.checkout.orderForm.items[i].quantity+ ' - ');
                            //console.log(vtexjs.checkout.orderForm.items[i].quantity);
                        }  
                    }
                },1000);
            
            */
        }
    },
    ajax: function () {
        return this.methods.init_ajax()
    },
    mounted: function () {
        return this.methods.init()
    }
};
window.addEventListener("DOMContentLoaded", function () {}), window.addEventListener("load", function () {
    Freixenet_Checkout.methods.changeImg()
}), $(document).ready(function () {
    Freixenet_Checkout.mounted()
}), $(document).ajaxStop(function () {
    Freixenet_Checkout.ajax()
});

let cep = setInterval(function () {
    try {
        document.getElementById("ship-postal-code").addEventListener("input", function () {
            if (this.value.length == 8) {
                vtexjs.checkout.getAddressInformation({
                    postalCode: this.value,
                    country: "BRA"
                }).done(function (result) {
                    if (result.street == '') {
                        setTimeout(function () {
                            if (!document.getElementById("erroCep")) {
                                document.querySelector("p.ship-postal-code.required.input.text.mask").insertAdjacentHTML("beforeend", '<span id="erroCep" style="color:red; display:none">CEP não localizado. Digite novamente ou preencha os campos abaixo.</span>')
                                document.getElementById("erroCep").style.display = "block"
                            }
                        }, 5000)
                    } else {
                        setTimeout(function () {
                            if (!document.getElementById("erroCep")) {
                                document.querySelector("p.ship-postal-code.required.input.text.mask").insertAdjacentHTML("beforeend", '<span id="erroCep" style="color:red; display:none">CEP não localizado. Digite novamente ou preencha os campos abaixo.</span>')
                                document.getElementById("erroCep").style.display = "none"
                            }
                        }, 5000)
                    }
                })
            } else {
                document.getElementById("erroCep").style.display = "none"
            }
        })
    } catch (e) {}
}, 3000)

var compraFlutuante = function () {
    if ($(window).width() <= 768) {

        $('<div class="compraFlutuante"><div class="content_compraFlutuante"><div class="content_valorTotal"><span>Total</span><span class="valorTotal"></span></div><div class="content_btnFinalizar"><input type="button" value="Finalizar Compra" /></div></div></div>').insertAfter('footer.e-footer');

        $(window).on('scroll', function () {

            if ($(window).scrollTop() > 30) {
                $(".body-cart .compraFlutuante").addClass("active")
            } else {
                $(".body-cart .compraFlutuante").removeClass("active")
            }

        });

        $(".content_valorTotal .valorTotal").text($(".full-cart tfoot .monetary").text());


        $('.content_btnFinalizar input[type="button"]').on("click", function () {
            $(".body-cart .full-cart #cart-to-orderform").trigger("click");
        });

    }

}

var valorTotalCompra = function () {

    if ($(window).width() <= 768) {

        $(".content_valorTotal .valorTotal").text($(".full-cart tfoot .monetary").text());

    }

}


$(window).load(function () {
    compraFlutuante();
    setTimeout(() => {
        if (innerWidth < 425) {
            if ($('.totalizers-list .Shipping .info').attr('style') != 'display: none;') {
                $('<select class="shipping-options"></select>').insertAfter('.totalizers-list');
            } else {
                $('<select class="shipping-options" style="display: none;"></select>').insertAfter('.totalizers-list');
            }

            var shippingOptions = document.querySelector('.shipping-sla-options').querySelectorAll('li');
            shippingOptions.forEach(function (item) {
                document.querySelector('.shipping-options').innerHTML += `<option value="${item.classList[0]}">${item.innerText}</option>`;
            })
            document.querySelector('.shipping-options').addEventListener('change', function () {
                $('.' + this.value + ' a').click()
            })
            $(document).on('click', '.cart-reset-postal-code', function () {
                $('.shipping-options').hide();
            });
            $(document).on('click', '#cart-shipping-calculate', function () {
                setTimeout(function () {
                    $('.shipping-options').show();
                }, 2000)
            });

        }
    }, 3000);
});

$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    valorTotalCompra();
});

$(document).ajaxStop(function () {
    if ($('#item-quantity-72747057').val() >= 2) {
        $('#item-quantity-72747057').attr('disabled', 'disabled');
        $('#item-quantity-change-increment-72747057').css('pointer-events', 'none');
    } else {

        $('#item-quantity-72747057').attr('disabled', '').removeAttr('disabled')
        $('#item-quantity-change-increment-72747057').css('pointer-events', 'all');
    }
});