function comprejunto() {
    var table;
    $("#divCompreJunto").append('<div class="div-content-comprejunto"><ul></ul><div>'), $("#divCompreJunto table tbody").find("tr").each((function(indice) {
        console.log("HTML: " + $(this).html()), $(".div-content-comprejunto ul").append("<li><table><tr>" + $(this).html() + "</tr></table></li>")
    })), 
    $("#divCompreJunto table").eq(0).remove(), 
    $(".comprejunto").css("display", "block"), 
    $(".itemA a img,.itemB a img").each((function(index) {
        $(this).attr("width", "300").attr("height", "300");
        var result, resSplit = $(this).attr("src").split("/"),
            splitVer = resSplit[5].split("-"),
            vr1, vr2, vr3, vr4, vr5, vr6, linkfni = resSplit[0] + "//" + resSplit[2] + "/" + resSplit[3] + "/" + resSplit[4] + "/" + (splitVer[0] + "-300-300") + "/" + resSplit[6];
        $(this).attr("src", linkfni)
    })), 
    $(".more,.buy-together").remove(), console.log("PRODUTO: " + vtxctx.categoryName), 
    // "Alianças" !== vtxctx.categoryName && $(".buy").append('<div class="y-obs">* Desconto exclusivo para compras no site.</div>'), 
    //Se precisar aplicar slick posteriormente
    $(".div-content-comprejunto ul").slick({
        slidesToShow: 1,
        slidesToScroll: 1
    })
}
1 == $("#divCompreJunto table").length && comprejunto();