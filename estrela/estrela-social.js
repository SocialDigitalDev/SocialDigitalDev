var codEstrela = {
    corrigeNomeDeCadastro: function(){
        var nomeProduto = $(".mainProductInfo .productName").text();
        var newNomeProduto = nomeProduto.replace('Única', '');
        $('.mainProductInfo .productName').text(newNomeProduto);
    },
    init: function(){
        codEstrela.corrigeNomeDeCadastro();
    }
}
codEstrela.init();