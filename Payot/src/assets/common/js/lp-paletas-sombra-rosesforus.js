$(document).ready(function(){

    let products = ['144335026','144335075']

    products.map((dataId) => {
        var htmlContent = "";
        var apiUrl = '/api/catalog_system/pub/products/search/?fq=skuId:' + dataId;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((dataSku) => {
            console.log(dataSku)
            htmlContent = '<li><img src="'+dataSku[0].items[0].images[0].imageUrl+'" alt="'+dataSku[0].items[0].name+'" class="imageProduct" />';
            htmlContent += '<h3 class="productName">'+dataSku[0].items[0].name+'</h3>';
            htmlContent += '<span class="preco-por">Por R$ '+dataSku[0].items[0].sellers[0].commertialOffer.ListPrice.toFixed(2).replace('.',',')+'</span>';
            htmlContent += '<p style="text-align:left;font-size:10px">Compre com <img src="/arquivos/logo-ame.png" width="40px" style="display: inline-block"><br> e receba até 20% de volta</p>'
            htmlContent += '<div class="buy-box">'
            htmlContent += '<span class="add-menos" data-value="'+dataSku[0].items[0].itemId+'"></span><input type="tel" id="qtd" class="qtd-'+dataSku[0].items[0].itemId+'" value="1" min="1"/><span class="add-mais" data-value="'+dataSku[0].items[0].itemId+'"></span>'
            htmlContent += '<span class="buy-buttom-lp-paletas" data-value="'+dataSku[0].items[0].itemId+'">ADICIONAR AO CARRINHO</span></div></li>'

            $('.produtos-destaque-lp ul').append(htmlContent)
        });
    })

    $(".j-banner__slider").slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                arrows: false,
                breakpoint: 1024,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
                centerMode: true,
                centerPadding: '40px'
                }
            },
                {
                    arrows: false,
                    breakpoint: 600,
                    settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: '40px'
                }
            }
        ]
    });

    
    //  $(".helperComplement").remove();
    
    $(".j-lp__shelf ul").slick({
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        },
            {
                breakpoint: 600,
                settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            }
        },
            {
                breakpoint: 480,
                arrows: false,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            }
        }
        ]
   });

   $(".j-lp__instagram").slick({
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                centerMode: true,
                centerPadding: '15px'
                }
            }
        ]
    });
   
    $('.add-mais').live('click', function(){
        var skuId = $(this).attr('data-value')
        var qtd = $('.qtd-'+skuId).val();
        qtd = (parseInt(qtd) + 1)
        $('.qtd-'+skuId).val(qtd)
    })
    $('.add-menos').live('click', function(){
        var skuId = $(this).attr('data-value')
        var qtd = $('.qtd-'+skuId).val();
        qtd = (parseInt(qtd) - 1)
        if(qtd >= 1){
            $('.qtd-'+skuId).val(qtd)
        }
    })

    $('.buy-buttom-lp-paletas').live('click', function(){
        var skuId = $(this).attr('data-value')
        var qtd = $('.qtd-'+skuId).val();
        vtexjs.checkout.addToCart([{
            id: skuId, 
            quantity: qtd, 
            seller: 1
        }], null, jssalesChannel).done(function(orderForm) {
            $('body').addClass('no--scroll')
            $('.j-minicart__content').addClass('is--active')
        });
    })


}) /* end ready */
