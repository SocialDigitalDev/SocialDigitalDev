var wdw = $(window),
    body = $("body"),
    callLoja = {
        removeComplement: function() {
            $(".helperComplement").remove()
        },
        init: function() {
            callLoja.removeComplement();
        }
    };

function capitalizeFirstLetter(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}

function formata_valor_dinheiro(e) {
    return e = "R$ " + (.01 * e).toFixed(2).replace(".", ",")
}

function limpa_valor_dinheiro(e) {
    return parseInt(e.replace(/R\$|\.|\,/g, "").trim())
}

function calculaPreco(e) {
    var a = limpa_valor_dinheiro($(".skuBestPrice").html()),
        t = a * e;
    if ($("body").hasClass("forfit-produto-assinatura") && $(".product-assinatura-box > .skuespec_Estampa_opcao_Assinatura").is(":checked")) {
        var o = parseFloat((.9 * a * e).toFixed(2));
        $(".product-assinatura-price span").html(formata_valor_dinheiro(o))
    }
}

function formatDate() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        a = new Date,
        t = "" + (a.getMonth() + 1),
        o = "" + a.getDate(),
        r = a.getFullYear();
    return e && (r += 3), t.length < 2 && (t = "0" + t), o.length < 2 && (o = "0" + o), [r, t, o].join("-")
}

$(document).ready(function() {
    callLoja.init()
}), Number.prototype.formatMoney = function(e, a, t) {
    var o = this,
        r = (e = isNaN(e = Math.abs(e)) ? 2 : e, a = null == a ? "," : a, t = null == t ? "." : t, o < 0 ? "-" : ""),
        s = parseInt(o = Math.abs(+o || 0).toFixed(e)) + "",
        i = (i = s.length) > 3 ? i % 3 : 0;
    return r + (i ? s.substr(0, i) + t : "") + s.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + t) + (e ? a + Math.abs(o - s).toFixed(e).slice(2) : "")
};