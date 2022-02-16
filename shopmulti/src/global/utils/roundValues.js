setTimeout(function(){
    $(".porcentagem").each(function() {
        var valor = $(this).html();
        valor = valor.replace(" %", "");
        valor = valor.replace(",", ".");
        valor = valor.replace("<br>", "");
        valor = valor.replace("OFF", "");
        valor = valor.replace("%", "");
        valor = Number(valor);
        valor = Math.round(valor);

        $(this).html(valor);

    });
}, 1000);