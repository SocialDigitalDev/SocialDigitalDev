if ("abc" == "abc") {
    setTimeout(function () {
        $(".qtdPrateleira .btnAcr").click(function () {
            var atual = parseInt($(this).prev(".qtdVal").val());
            //console.log(atual)
            atual = atual + 1;
            $(this).prev(".qtdVal").attr('value', `${atual}`);
            $('.calc-frete .cep .quantity input').attr('value', `${atual}`);
            var cepValue = $('#txtCep').val().length;
            if (cepValue !== 0) {
                $('#btnFreteSimulacao').trigger('click')
            }
        });

        $(".qtdPrateleira .btnDec").click(function () {
            var atual = parseInt($(this).next(".qtdVal").val());
            if (atual == 1) {
                $(this).next(".qtdVal").attr('value', `1`);
                $('.calc-frete .cep .quantity input').attr('value', `1`);
                var cepValue = $('#txtCep').val().length;
                if (cepValue !== 0) {
                    $('#btnFreteSimulacao').trigger('click')
                }
            } else {
                atual = atual - 1;
                $(this).next(".qtdVal").attr('value', `${atual}`);
                $('.calc-frete .cep .quantity input').attr('value', `${atual}`);
                var cepValue = $('#txtCep').val().length;
                if (cepValue !== 0) {
                    $('#btnFreteSimulacao').trigger('click')
                }
            }
        });

        $(".qtdPrateleira .qtdVal").bind("keyup blur focus", function (e) {
            e.preventDefault();
            var expre = /[^\d]/g;
            $(this).val($(this).val().replace(expre, ''));
        });
    }, 200);
}