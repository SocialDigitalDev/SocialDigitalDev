var windowsize = window.outerWidth || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    body = $("body"),
    callLoja = {
        buyTogether: function() {
            $(".product-buy-together #divCompreJunto").html().length ? $(".product-buy-together").removeClass("hide") : $(".product-buy-together").addClass("hide"), {
                init: function() {
                    this.getProductA(), this.getProductB(), this.getPrices(), this.produtoCompreJunto(), this.setPrice()
                },
                getProductA: function() {
                    let e = document.querySelector(".itemA");
                    if (!e) return;
                    let t = e.querySelector("a").getAttribute("href"),
                        a = e.querySelector("a > img").getAttribute("src"),
                        o = e.querySelector("h3 > a").innerHTML,
                        s = "";
                    s += '<div class="compreJunto__wrapper">', s += `<a class="compreJunto__image" href="${t}">\n\t\t\t\t<img src="${this.changeImageSize(a)}" alt="${o}"/>\n\t\t\t\t</a>`, s += `<h3 class="compreJunto__prod-title">\n\t\t\t\t<a href="${t}">${o}</a>\n\t\t\t\t</h3>`, s += '<div class="compreJunto__price">\n\t\t\t\t<small class="compreJunto-bestPrice"></small>\n\t\t\t\t</div>', s += "</div>", this.render(".compreJunto__itemA", s)
                },
                getProductB: function() {
                    let e = document.querySelectorAll(".itemB");
                    [].forEach.call(e, e => {
                        e.parentNode.querySelector(".buy").textContent.split("Valor total:")[1].trim().split(" ")[1], e.querySelector(".itemA");
                        let t = e.querySelector("a").getAttribute("href"),
                            a = e.querySelector("a > img").getAttribute("src"),
                            o = e.querySelector("h3 > a").innerHTML,
                            s = "";
                        s += '<div class="compreJunto__wrapper">', s += `<a class="compreJunto__image" href="${t}">\n\t\t\t\t\t<img src="${this.changeImageSize(a)}" alt="${o}"/>\n\t\t\t\t\t</a>`, s += `<h3 class="compreJunto__prod-title">\n\t\t\t\t\t<a href="${t}">${o}</a>\n\t\t\t\t\t</h3>`, s += '<div class="compreJunto__price">\n\t\t\t\t\t<small class="compreJunto-secondProd"></small>\n\t\t\t\t\t</div>', s += "</div>", this.render(".compreJunto__itemB", s)
                    })
                },
                setPrice: function() {
                    $(".skuBestPrice").text().replace("R$", "").trim(), $(".compreJunto__buy .compreJunto__buy-text--bold").text()
                },
                getPrices: function() {
                    let e = document.querySelectorAll("td.buy");
                    [].forEach.call(e, e => {
                        let t = e.querySelectorAll("strong")[0].textContent,
                            a = e.querySelectorAll("strong")[1].textContent,
                            o = "";
                        o += `<div class="compreJunto__buy">\n\t\t\t\t\t\t\t\t<p class="compreJunto__buy-text">\n\t\t\t\t\t\t\t\t<span class="compreJunto__buy-text--bold">\n\t\t\t\t\t\t\t\tCompre os 2 itens\n\t\t\t\t\t\t\t\t</span> por <span class="compreJunto__buy-text--bold">${e.textContent.split("Valor total:")[1].trim().split(" ")[1]}</span>\n\t\t\t\t\t\t\t\t</p>`, o += `<p class="compreJunto__installments">\n\t\t\t\t\t\t\t\tou atÃ© ${t} de ${a} sem juros\n\t\t\t\t\t\t\t</p>`, o += `<p class="compreJunto__comprar-junto">\n\t\t\t\t\t\t\t\t<a href="${e.querySelector(".comprar-junto a").getAttribute("href")}">COMPRAR JUNTO</a>\n\t\t\t\t\t\t\t</p>`, o += "</div>", this.render(".compreJunto__buy-wrapper", o)
                    })
                },
                render: function(e, t) {
                    document.querySelector(e).innerHTML += t
                },
                changeImageSize: function(e) {
                    return e.split("90-90").join("450-450")
                },
                produtoCompreJunto: function() {
                    $(".compreJunto__itemB").slick({
                        infinite: !1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        asNavFor: ".compreJunto__buy-wrapper"
                    }), $(".compreJunto__buy-wrapper").slick({
                        infinite: !1,
                        slidesToShow: 1,
                        arrows: !1,
                        slidesToScroll: 1,
                        fade: !0,
                        asNavFor: ".compreJunto__itemB"
                    })
                }
            }.init()
        },
        
        init: function() {
               callLoja.buyTogether()
        }
    };
