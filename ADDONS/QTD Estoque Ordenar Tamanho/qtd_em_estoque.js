getSkuInStock: function () {
    if ($("body").hasClass("polo-wear__produto")) {
        arr_tam = { P: 0, M: 1, G: 2, GG: 3 };
        var arr = skuJson_0.skus;
        arr.sort(function (a, b) {
            return a.dimensions.Tamanho < b.dimensions.Tamanho ? -1 : a.dimensions.Tamanho > b.dimensions.Tamanho ? 1 : 0;
        }),
            arr.sort(function (a, b) {
                return arr_tam[a.dimensions.Tamanho] - arr_tam[b.dimensions.Tamanho];
            }),
            $(".skuList label.dimension-Tamanho").each(function (index) {
                0 == !arr[index].availablequantity &&
                    arr[index].availablequantity <= 10 &&
                    (1 == arr[index].availablequantity
                        ? $(this).append('<span class="qnt_est" data-quant="' + arr[index].dimensions.Tamanho + '">resta ' + arr[index].availablequantity + "</span>")
                        : $(this).append('<span class="qnt_est" data-quant="' + arr[index].dimensions.Tamanho + '">restam ' + arr[index].availablequantity + "</span>"));
            });
    }
},

// Aviso de quantidade 
avisoUrgencia: function() {
    vtexjs.catalog.getProductWithVariations(document.querySelector("#___rc-p-id").value).then(e => {
        var a, o = e.skus.map(e => ({
            sku: e.sku,
            quantidade: e.availablequantity
        }));
        o.length <= 0 || (1 === o.length ? 10 <= (a = o[Object.keys(o)[0]].quantidade) || 0 === a || jQuery(".btn-group>.btn-group.custom-buy").before('<div class="aviso-urgencia-qtd"><span>ðŸ”¥</span>&nbsp;' + (1 < a ? " Restam apenas " + a + " unidades" : " Ãšltima unidade") + "</div>") : (a = document.querySelectorAll("#tamanhosBoxMain .listItem .listItemValue"), o.length === a.length && a.forEach(function(t, e) {
            var a = o.reduce(function(e, a) {
                return t.dataset.sku == a.sku ? a : e
            }, {});
            0 < a.quantidade && a.quantidade < 10 && jQuery(t).append(jQuery('<div class="aviso-urgencia-single">' + (1 === a.quantidade ? "Ãšltima unidade" : "Restam " + a.quantidade + "&nbsp;uni&nbsp;ðŸ”¥") + "</div>"))
        })))
    })
},

// Ordenar os tamanhos
orderSizes: function () {
    if ($("body").hasClass("polo-wear__produto")) {
    var tams = { UN: -8, PP: -7, P: -6, M: -5, G: -4, GG: -3};
        $(".sku-selector-container .Tamanho .item-dimension-Tamanho").each(function () {
            var selfOrder = $(this);
            $(this)
                .find("label")
                .sort(function (a, b) {
                    return (a = $(a).text().split("/")[0]), (b = $(b).text().split("/")[0]), (Number(a) || tams[a] || 1 / 0) - (Number(b) || tams[b] || 1 / 0);
                })
                .appendTo(selfOrder);
        });
    }
},