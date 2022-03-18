
$(document).ready(function(){
    for(var i = 1; 20 >= i; i++){
        $('.sel-qtd').append('<option value="'+i+'">'+i+'</option>')
    }
    let arrayProducts = []
    let price, listPrice, vlrParcelas;
    let qtdParcelas = 0
    var settings = {
        "url": "/api/catalog_system/pub/products/search?ft=lip max",
        "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        arrayProducts = response;
        console.log(response)
        $('#idSku').val(arrayProducts[0].items[0].itemId)
        var titleCor = arrayProducts[0].productName
        $('.title-cor').html(titleCor)
        $('.img-principal').html('<img src="'+response[0].items[0].images[0].imageUrl+'" alt="Imagem Lip Max"/>')
        price = response[0].items[0].sellers[0].commertialOffer.Price
        listPrice = response[0].items[0].sellers[0].commertialOffer.ListPrice
        $('.preco-por').html('Por R$ ' + price.toFixed(2).replace('.',','))
        if(price < listPrice){
            $('.preco-de').html('De R$ ' + listPrice.toFixed(2).replace('.',','))
        }else{
            $('.preco-de').html(' ')
        }

        $('.miniaturas ul').html('')

        for(var i = 0; response.length > i; i++){
            if(response[i].productId == '120979968'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979968').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }else if(response[i].productId == '120979956'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979956').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }else if(response[i].productId == '120980035'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120980035').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }
            else if(response[i].productId == '120980022'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120980022').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979943'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979943').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979992'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979992').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979931'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979931').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979917'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979917').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979905'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979905').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979893'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979893').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120980009'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120980009').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '120979881'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-120979881').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Cor Lip Max" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }
        }

        for(var p = 0; arrayProducts[0].items[0].sellers[0].commertialOffer.Installments.length > p; p++){
           if(arrayProducts[0].items[0].sellers[0].commertialOffer.Installments[p].NumberOfInstallments > 1){
               qtdParcelas = arrayProducts[0].items[0].sellers[0].commertialOffer.Installments[p].TotalValuePlusInterestRate;
           }else{
               qtdParcelas = 1;
           }
        }
        vlrParcelas = (price/qtdParcelas)
        $('.sku-color.select img').click();
        // $('.parcelamento').html(qtdParcelas +' x ' + vlrParcelas.toFixed(2).replace('.',','))
        // $('.content-info.cor').html(arrayProducts[0].Cor[0])
        $('.content-info.produto').html(arrayProducts[0].Produto[0])
        $('.content-info.acao-beneficio').html(arrayProducts[0]["Ação ou Beneficio"][0])
        $('.content-info.modo-de-uso').html(arrayProducts[0]["Modo de Uso"][0])
        $('.content-info.volume').html(arrayProducts[0]["Volume da Embalagem"][0])
        $('.content-info.composicao').html(arrayProducts[0].Composição[0])
        //$('.content-info.indicacao').html(arrayProducts[0].Indicação[0])
    });

    $('.add-mais').live('click', function(){
        var qtd = $('#qtd').val();
        qtd = (parseInt(qtd) + 1)
        $('#qtd').val(qtd)
    })
    $('.add-menos').live('click', function(){
        var qtd = $('#qtd').val();
        qtd = (parseInt(qtd) - 1)
        if(qtd >= 1){
            $('#qtd').val(qtd)
        }
    })
    
    $('.sku-color').click(function(){
        $('.sku-color').removeClass('select')
        $(this).addClass('select')
    })
    $('.sku-color img').live('click', function(){
        loadProduct($(this).attr('id'))
    })

    $('.miniaturas img').live('click', function(){
        $('.img-principal img').attr('src', $(this).attr('src'))
    })

    $('.buy-buttom-lp-bia-todo-dia').live('click', function(){
        var qtd = $('#qtd').val()
        var id = $('#idSku').val()
        vtexjs.checkout.addToCart([{
            id: id, 
            quantity: qtd, 
            seller: 1
        }], null, jssalesChannel).done(function(orderForm) {
            console.log(orderForm)
            $('body').addClass('no--scroll')
            $('.j-minicart__content').addClass('is--active')
        });
    })

    function loadProduct(id){
        $('#idSku').val(id)
        for(var i = 0; arrayProducts.length > i; i++){
            if(arrayProducts[i].productId == id){
                $('.miniaturas ul').html('')
                var titleCor = arrayProducts[i].productName
                titleCor = titleCor.replace('Lip Max', '');
                $('.title-cor').html(titleCor)
                $('.img-principal').html('<img src="'+arrayProducts[i].items[0].images[0].imageUrl+'" alt="Imagem Lip Max"/>')
                price = arrayProducts[i].items[0].sellers[0].commertialOffer.Price
                listPrice = arrayProducts[i].items[0].sellers[0].commertialOffer.ListPrice
                $('.preco-por').html('Por R$ ' + price.toFixed(2).replace('.',','))
                if(price < listPrice){
                    $('.preco-de').html('De R$ ' + listPrice.toFixed(2).replace('.',','))
                }else{
                    $('.preco-de').html(' ')
                }
                for(var x = 0; arrayProducts[i].items[0].images.length > x; x++){
                    if(arrayProducts[i].items[0].images[x].imageLabel != "thumb"){
                        $('.miniaturas ul').append('<li><img src="'+arrayProducts[i].items[0].images[x].imageUrl+'" alt="Imagem Lip Max"/></li>')
                    }
                }
                for(var p = 0; arrayProducts[i].items[0].sellers[0].commertialOffer.Installments.length > p; p++){
                if(arrayProducts[i].items[0].sellers[0].commertialOffer.Installments[p].NumberOfInstallments > 1){
                    qtdParcelas = arrayProducts[i].items[0].sellers[0].commertialOffer.Installments[p].TotalValuePlusInterestRate;
                }else{
                    qtdParcelas = 1;
                }
                }
                vlrParcelas = (price/qtdParcelas)
                $('.parcelamento').html(qtdParcelas +' x ' + vlrParcelas.toFixed(2).replace('.',','))

                // $('.content-info.cor').html(arrayProducts[i].Cor[0])
                $('.content-info.produto').html(arrayProducts[i].Produto[0])
                $('.content-info.acao-beneficio').html(arrayProducts[i]["Ação ou Beneficio"][0])
                $('.content-info.modo-de-uso').html(arrayProducts[i]["Modo de Uso"][0])
                $('.content-info.volume').html(arrayProducts[i]["Volume da Embalagem"][0])
                $('.content-info.composicao').html(arrayProducts[i].Composição[0])
                // $('.content-info.indicacao').html(arrayProducts[i].Indicação[0])
            }
        }
    }
    
}) /* end ready */