import './Product.scss'

const main = () => {
    eventProduct()
}

const eventProduct = () => {
    
}
var produto = {
    qtdProd: function () {
        if ("abc" == "abc") {
            setTimeout(function () {
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
            }, 200);
            $(".produto-all #produtoDiv-direita .om-produto__buy-button .buy-button").click(function (event) {
                event.preventDefault();
                var hrefCart = $(this).attr("href");
                var qtd = $(this).parent().parent().parent().find(".qtdPrateleira .qtdVal").val();
                if (qtd == "") {
                    qtd = "1";
                }
                if (hrefCart == "javascript:alert('Por favor, selecione o modelo desejado.');") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Por favor, selecione o modelo desejado.',
                        toast: 'true',
                        position: 'bottom-end',
                        showConfirmButton: false,
                        showCloseButton: 'true',
                        timerProgressBar: 'true',
                        timer: '3000'
                    })
                } else {
                    var res = hrefCart.replace("qty=1", "qty=" + qtd);
                    var hrefCart = $(this, ".btn-add-buy-button-asynchronous").attr("href");
                    var resUTL = hrefCart.split("sku=").pop().split("&qty=").shift();
                    setTimeout(function () {
                        vtexjs.checkout.getOrderForm().then(function () {
                            item = {
                                id: resUTL,
                                quantity: qtd,
                                seller: 1
                            };
                            vtexjs.checkout.addToCart([item]).done(function (orderForm) {
                                $(".header-minicart").addClass("open"),
                                    setTimeout(function () {
                                        $(".header-minicart").removeClass("open");
                                    }, 5e3);
                            });
                        });
                    });
                }
            });
        }
    },
    fixFrete: function () {
        $(window).load(function () {
            $("#txtCep").attr("placeholder", "00000-000");
            $("#txtCep").attr('autocomplete', 'none');
            $("#txtCep").attr('autocomplete', 'off');
            $('#txtCep').on('focus click', function () {
                $(this)[0].setSelectionRange(0, 0);
            });
        });
    },
    quemViuViuTb: function() {
        $('.helperComplement').remove();
        $('.qvvt .om-prateleira > ul').slick({
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    },
    init: function(){
        produto.quemViuViuTb();
        produto.qtdProd();
        produto.fixFrete();
    }
}

produto.init();

export default main