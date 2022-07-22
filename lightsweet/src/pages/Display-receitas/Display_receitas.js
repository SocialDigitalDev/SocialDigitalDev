import './Display_receitas.scss'

const main = () => {
    eventDisplay_receitas()
}

const eventDisplay_receitas = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            console.log('clicked this')
        })
}

var scre = $(window).width();

var Display_receitas = {
    ajusteVideoFunction: function(){
        if ($('#caracteristicas .ESPEC-DE-RECEITA').length > 0) {
            $('.receita-dados .value-field.VIDEO iframe').appendTo('#include');
            $('#include #image').css('display', 'none');
        }
    },
    removeBRajusteCampoProduto: function(){
        $(document).ready(function(){
            $('td.value-field br').remove();
            $('.value-field table').attr('cellspacing', '0');
        });
    },
    ajustaReceitaEmPassos: function(){
        var passo1 = $('.step-blue:contains("1º Passo")').html();
        var passo2 = $('.step-blue:contains("2º Passo")').html();
        var conteudoPasso1 = $('.value-field.Conteudo-da-Receita .ingredients').html();
        var conteudoPasso2 = $('.value-field.Conteudo-da-Receita .baking').html();
        $('.value-field.Conteudo-da-Receita').append(`
                            <div class="passo-1">
                                    <h3 class="blue">${passo1}</h3>
                                    ${conteudoPasso1}
                            </div>
                            <div class="passo-2">
                                    <h3 class="blue">${passo2}</h3>
                                    ${conteudoPasso2}
                            </div>`
        );
        $('.step-blue:contains("1º Passo")').remove();
        $('.step-blue:contains("2º Passo")').remove();
        $('.value-field.Conteudo-da-Receita .ingredients').remove();
        $('.value-field.Conteudo-da-Receita .baking').remove();
    },
    sliderReceitas: function() {
        $('.helperComplement').remove();
        $('.slide-prod .ls-receita-pdp > ul').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                    }
                }
            ]
        });
    },
    comprarTodosProdutos: function() {
        $('.buy-all-button').click(function(){
            var prodArray = new Array();
            $('.produtos-receita > ul > li').each(function(){
                var skuId = $(this).find('input.ls-sku').val();
                var skuQtd = $(this).find('input.qtdVal').val();
                prodArray.push({
                    id: skuId,
                    seller: 1,
                    quantity: skuQtd,
                });
            });
            console.log(prodArray);
            if (prodArray.length) {
                vtexjs.checkout.addToCart(prodArray).done(function (a) {
                    if (params !== ""){
                        var urlParams = window.location.search;
                        var newParams = urlParams.split('?utm_source=');
                        var lastParams = newParams[1].split('&utm_campaign=');
                        var source = lastParams[0];
                        var campaign = lastParams[1];
                        vtexjs.checkout.sendAttachment('marketingData', { utmSource: source, utmCampaign: campaign });
                    }
                    $(".header-minicart").addClass("open"),
                    setTimeout(function () {
                        $(".header-minicart").removeClass("open");
                    }, 5e3);
                });
            }
        });
    },
    mostraBannersLowMagro: function() {
        vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
            var prodName = product.name;
            if (prodName === "Bolo de Milho sem Glúten sem Lactose" || prodName === "Curau Fit de Leite de Coco com Paçoca" || prodName === "Torta de Frango"){
                $('.magro').show();
                $('.lowcucar').hide();
            }else if (prodName === "Brigadeirão Zero Açúcar" || prodName === "Pavê de Amendoim" || prodName === "Torta de Paçoca") {
                $('.lowcucar').show();
                $('.magro').hide();
            }
        });
    },
    init: function(){
        Display_receitas.ajusteVideoFunction();
        Display_receitas.removeBRajusteCampoProduto();
        Display_receitas.ajustaReceitaEmPassos();
        Display_receitas.sliderReceitas();
        Display_receitas.comprarTodosProdutos();
        Display_receitas.mostraBannersLowMagro();
    }

}

Display_receitas.init();

export default main