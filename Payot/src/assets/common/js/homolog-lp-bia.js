$(document).ready(function(){
    for(var i = 1; 20 >= i; i++){
        $('.sel-qtd').append('<option value="'+i+'">'+i+'</option>')
    }
    let arrayProducts = []
    let price, listPrice, vlrParcelas;
    let qtdParcelas = 0
    var settings = {
        "url": "/api/catalog_system/pub/products/search?ft=batom liquido",
        "method": "GET"
    };
    
    $.ajax(settings).done(function (response) {
        arrayProducts = response;
        $('#idSku').val(arrayProducts[0].items[0].itemId)
        var titleCor = arrayProducts[0].productName
        $('.title-cor').html(titleCor)
        $('.img-principal').html('<img src="'+response[0].items[0].images[0].imageUrl+'" alt="Imagem Bia Todo Dia"/>')
        price = response[0].items[0].sellers[0].commertialOffer.Price
        listPrice = response[0].items[0].sellers[0].commertialOffer.ListPrice
        $('.preco-por').html('Por R$ ' + price.toFixed(2).replace('.',','))
        if(price < listPrice){
            $('.preco-de').html('De R$ ' + listPrice.toFixed(2).replace('.',','))
        }else{
            $('.preco-de').html(' ')
        }


        for(var i = 0; response.length > i; i++){
            if(response[i].productId == '170778015'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-170778015').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Batom líquido Bia Todo Dia" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }else if(response[i].productId == '170778038'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-170778038').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Batom líquido Bia Todo Dia" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }else if(response[i].productId == '170778049'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-170778049').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Batom líquido Bia Todo Dia" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }
            else if(response[i].productId == '170778060'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-170778060').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Batom líquido Bia Todo Dia" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            } else if(response[i].productId == '170778071'){
                for(var x = 0; response[i].items[0].images.length > x; x++){
                    if(response[i].items[0].images[x].imageLabel == "thumb"){
                        $('.thumb-170778071').append('<img src="'+response[i].items[0].images[x].imageUrl+'" alt="Batom líquido Bia Todo Dia" id="'+response[i].items[0].itemId+'"/>')
                    }
                }
            }    
        }

        
        $('.miniaturas ul').html('')

        for(var x = 0; response[0].items[0].images.length > x; x++){
            if(response[0].items[0].images[x].imageLabel != "thumb"){
                $('.miniaturas ul').append('<li><img src="'+response[0].items[0].images[x].imageUrl+'" alt="Imagem Bia Todo Dia"/></li>')
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
        $('.parcelamento').html(qtdParcelas +' x ' + vlrParcelas.toFixed(2).replace('.',','))

        $('.sku-color.select img').click()
    });

    $('.sku-color').live('click', function(){
        $('.sku-color').removeClass('select')
        $(this).addClass('select')
    })
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

    $('.miniaturas img').live('click', function(){
        $('.img-principal img').attr('src', $(this).attr('src'))
    })

    $('.sku-color img').live('click', function(){
        loadProduct($(this).attr('id'))
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
                $('.title-cor').html(titleCor)
                $('.img-principal').html('<img src="'+arrayProducts[i].items[0].images[0].imageUrl+'" alt="Imagem Bia Todo Dia"/>')
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
                        $('.miniaturas ul').append('<li><img src="'+arrayProducts[i].items[0].images[x].imageUrl+'" alt="Imagem Bia Todo Dia"/></li>')
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

                $('.content-info.cor').html(arrayProducts[i].Cor[0])
                $('.content-info.produto').html(arrayProducts[i].Produto[0])
                $('.content-info.acao-beneficio').html(arrayProducts[i]["Ação ou Beneficio"][0])
                $('.content-info.modo-de-uso').html(arrayProducts[i]["Modo de Uso"][0])
                $('.content-info.volume').html(arrayProducts[i]["Volume da Embalagem"][0])
                $('.content-info.composicao').html(arrayProducts[i].Composição[0])
                $('.content-info.indicacao').html(arrayProducts[i].Indicação[0])
            }
        }
    }

}) /* end ready */
