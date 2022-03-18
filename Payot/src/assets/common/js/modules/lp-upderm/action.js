const Methods = {
    init() {
        Methods.Action();   
    },

    Action(){
        for (var i = 1; 20 >= i; i++) {
            $('.sel-qtd').append('<option value="' + i + '">' + i + '</option>')
        }
    
        let arrayProducts = []
        let price, listPrice, vlrParcelas;
        let qtdParcelas = 0
        var settings = {
            "url": "/api/catalog_system/pub/products/search?fq=productId:187718887",
            "method": "GET"
        };
    
        $.ajax(settings).done(function (response) {
            console.log("respondessss", response)
            arrayProducts = response;
            console.log("array products", arrayProducts);            
            $('#idSku').val(arrayProducts[0].items[0].itemId)
            var titleCor = arrayProducts[0].productName
            $('.title-cor').html(titleCor)
            $('.img-principal').html('<img src="' + response[0].items[0].images[0].imageUrl + '" alt="Imagem Upderm Hialurrônico"/>')
            price = response[0].items[0].sellers[0].commertialOffer.Price
            listPrice = response[0].items[0].sellers[0].commertialOffer.ListPrice
            $('.preco-por').html('Por R$ ' + price.toFixed(2).replace('.', ','))
            if (price < listPrice) {
                $('.preco-de').html('De R$ ' + listPrice.toFixed(2).replace('.', ','))
            } else {
                $('.preco-de').html(' ')
            }
                
            vlrParcelas = (price / qtdParcelas);

            console.log("vlrParcelas", vlrParcelas);
            // $('.parcelamento').html(qtdParcelas +' x ' + vlrParcelas.toFixed(2).replace('.',','))

            $('.sku-color.select img').click();
            $('.content-info.produto').html(arrayProducts[0])
            $('.content-info.acao-beneficio').html(arrayProducts[0]["Ação ou Beneficio"][0])
            $('.content-info.modo-de-uso').html(arrayProducts[0]["Modo de Uso"][0])
            $('.content-info.volume').html(arrayProducts[0]["Volume da Embalagem"][0])
            $('.content-info.composicao').html(arrayProducts[0].Composição[0])         
        });
    
        $('.add-mais').live('click', function () {
            var qtd = $('#qtd').val();
            qtd = (parseInt(qtd) + 1)
            $('#qtd').val(qtd)
        })
        $('.add-menos').live('click', function () {
            var qtd = $('#qtd').val();
            qtd = (parseInt(qtd) - 1)
            if (qtd >= 1) {
                $('#qtd').val(qtd)
            }
        })
        $('.sku-color').click(function () {
            $('.sku-color').removeClass('select')
            $(this).addClass('select')
        })
        $('.sku-color img').live('click', function () {
            loadProduct($(this).attr('id'))
        })
    
        $('.miniaturas img').live('click', function () {
            $('.img-principal img').attr('src', $(this).attr('src'))
        })
    
        $('.buy-buttom-lp-upderm-hialuronico').live('click', function () {
            var qtd = $('#qtd').val()
            var id = $('#idSku').val()
            vtexjs.checkout.addToCart([{
                id: id,
                quantity: qtd,
                seller: 1
            }], null, jssalesChannel).done(function (orderForm) {
                console.log(orderForm)
                $('body').addClass('no--scroll')
                $('.j-minicart__content').addClass('is--active')
            });
        })
    }
};

export default {
    init: Methods.init
};
