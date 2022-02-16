! function(e, t, a, o) {
    var i = e(t);
    e.fn.lazyload = function(o) {
        var s, n = this,
            r = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !1,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };

        function l() {
            var t = 0;
            n.each(function() {
                var a = e(this);
                if (!r.skip_invisible || a.is(":visible"))
                    if (e.abovethetop(this, r) || e.leftofbegin(this, r));
                    else if (e.belowthefold(this, r) || e.rightoffold(this, r)) {
                    if (++t > r.failure_limit) return !1
                } else a.trigger("appear"), t = 0
            })
        }
        return o && (void 0 !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), void 0 !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), e.extend(r, o)), s = void 0 === r.container || r.container === t ? i : e(r.container), 0 === r.event.indexOf("scroll") && s.bind(r.event, function() {
            return l()
        }), this.each(function() {
            var t = this,
                a = e(t);
            t.loaded = !1, void 0 !== a.attr("src") && !1 !== a.attr("src") || a.is("img") && a.attr("src", r.placeholder), a.one("appear", function() {
                if (!this.loaded) {
                    if (r.appear) {
                        var o = n.length;
                        r.appear.call(t, o, r)
                    }
                    e("<img />").bind("load", function() {
                        var o = a.attr("data-" + r.data_attribute);
                        a.hide(), a.is("img") ? a.attr("src", o) : a.css("background-image", "url('" + o + "')"), a[r.effect](r.effect_speed), t.loaded = !0;
                        var i = e.grep(n, function(e) {
                            return !e.loaded
                        });
                        if (n = e(i), r.load) {
                            var s = n.length;
                            r.load.call(t, s, r)
                        }
                    }).attr("src", a.attr("data-" + r.data_attribute))
                }
            }), 0 !== r.event.indexOf("scroll") && a.bind(r.event, function() {
                t.loaded || a.trigger("appear")
            })
        }), i.bind("resize", function() {
            l()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && i.bind("pageshow", function(t) {
            t.originalEvent && t.originalEvent.persisted && n.each(function() {
                e(this).trigger("appear")
            })
        }), e(a).ready(function() {
            l()
        }), this
    }, e.belowthefold = function(a, o) {
        return (void 0 === o.container || o.container === t ? (t.innerHeight ? t.innerHeight : i.height()) + i.scrollTop() : e(o.container).offset().top + e(o.container).height()) <= e(a).offset().top - o.threshold
    }, e.rightoffold = function(a, o) {
        return (void 0 === o.container || o.container === t ? i.width() + i.scrollLeft() : e(o.container).offset().left + e(o.container).width()) <= e(a).offset().left - o.threshold
    }, e.abovethetop = function(a, o) {
        return (void 0 === o.container || o.container === t ? i.scrollTop() : e(o.container).offset().top) >= e(a).offset().top + o.threshold + e(a).height()
    }, e.leftofbegin = function(a, o) {
        return (void 0 === o.container || o.container === t ? i.scrollLeft() : e(o.container).offset().left) >= e(a).offset().left + o.threshold + e(a).width()
    }, e.inviewport = function(t, a) {
        return !(e.rightoffold(t, a) || e.leftofbegin(t, a) || e.belowthefold(t, a) || e.abovethetop(t, a))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document),
function(e) {
    var t, a = function() {
            var e = document.createElement("input"),
                t = "onpaste";
            return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
        }() + ".mask",
        o = navigator.userAgent,
        i = /iphone/i.test(o),
        s = /chrome/i.test(o),
        n = /android/i.test(o);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function(e, t) {
            var a;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((a = this.createTextRange()).collapse(!0), a.moveEnd("character", t), a.moveStart("character", e), a.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (a = document.selection.createRange(), e = 0 - a.duplicate().moveStart("character", -1e5), t = e + a.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(o, r) {
            var l, c, d, u, m;
            return !o && this.length > 0 ? e(this[0]).data(e.mask.dataName)() : (r = e.extend({
                autoclear: e.mask.autoclear,
                placeholder: e.mask.placeholder,
                completed: null
            }, r), l = e.mask.definitions, c = [], d = m = o.length, u = null, e.each(o.split(""), function(e, t) {
                "?" == t ? (m--, d = e) : l[t] ? (c.push(new RegExp(l[t])), null === u && (u = c.length - 1)) : c.push(null)
            }), this.trigger("unmask").each(function() {
                function p(e) {
                    for (; ++e < m && !c[e];);
                    return e
                }

                function f(e, t) {
                    var a, o;
                    if (!(0 > e)) {
                        for (a = e, o = p(t); m > a; a++)
                            if (c[a]) {
                                if (!(m > o && c[a].test(y[o]))) break;
                                y[a] = y[o], y[o] = r.placeholder, o = p(o)
                            }
                        v(), T.caret(Math.max(u, e))
                    }
                }

                function h(t) {
                    var a, o, i, s = t.which,
                        l = T.caret();
                    if (0 == s) {
                        if (l.begin >= m) return T.val(T.val().substr(0, m)), t.preventDefault(), !1;
                        l.begin == l.end && (s = T.val().charCodeAt(l.begin - 1), l.begin--, l.end--)
                    }
                    t.ctrlKey || t.altKey || t.metaKey || 32 > s || s && (0 != l.end - l.begin && (g(l.begin, l.end), f(l.begin, l.end - 1)), a = p(l.begin - 1), m > a && (o = String.fromCharCode(s), c[a].test(o) && (function(e) {
                        var t, a, o, i;
                        for (t = e, a = r.placeholder; m > t; t++)
                            if (c[t]) {
                                if (o = p(t), i = y[t], y[t] = a, !(m > o && c[o].test(i))) break;
                                a = i
                            }
                    }(a), y[a] = o, v(), i = p(a), n ? setTimeout(e.proxy(e.fn.caret, T, i), 0) : T.caret(i), r.completed && i >= m && r.completed.call(T))), t.preventDefault())
                }

                function g(e, t) {
                    var a;
                    for (a = e; t > a && m > a; a++) c[a] && (y[a] = r.placeholder)
                }

                function v() {
                    T.val(y.join(""))
                }

                function b(e) {
                    var t, a, o, i = T.val(),
                        s = -1;
                    for (t = 0, o = 0; m > t; t++)
                        if (c[t]) {
                            for (y[t] = r.placeholder; o++ < i.length;)
                                if (a = i.charAt(o - 1), c[t].test(a)) {
                                    y[t] = a, s = t;
                                    break
                                }
                            if (o > i.length) break
                        } else y[t] === i.charAt(o) && t !== d && (o++, s = t);
                    return e ? v() : d > s + 1 ? r.autoclear || y.join("") === P ? (T.val(""), g(0, m)) : v() : (v(), T.val(T.val().substring(0, s + 1))), d ? t : u
                }
                var T = e(this),
                    y = e.map(o.split(""), function(e) {
                        return "?" != e ? l[e] ? r.placeholder : e : void 0
                    }),
                    P = y.join(""),
                    C = T.val();
                T.data(e.mask.dataName, function() {
                    return e.map(y, function(e, t) {
                        return c[t] && e != r.placeholder ? e : null
                    }).join("")
                }), T.attr("readonly") || T.one("unmask", function() {
                    T.unbind(".mask").removeData(e.mask.dataName)
                }).bind("focus.mask", function() {
                    var e;
                    clearTimeout(t), C = T.val(), e = b(), t = setTimeout(function() {
                        v(), e == o.length ? T.caret(0, e) : T.caret(e)
                    }, 10)
                }).bind("blur.mask", function() {
                    b(), T.val() != C && T.change()
                }).bind("keydown.mask", function(e) {
                    var t, a, o, s = e.which;
                    8 === s || 46 === s || i && 127 === s ? (a = (t = T.caret()).begin, 0 == (o = t.end) - a && (a = 46 !== s ? function(e) {
                        for (; --e >= 0 && !c[e];);
                        return e
                    }(a) : o = p(a - 1), o = 46 === s ? p(o) : o), g(a, o), f(a, o - 1), e.preventDefault()) : 27 == s && (T.val(C), T.caret(0, b()), e.preventDefault())
                }).bind("keypress.mask", h).bind(a, function() {
                    setTimeout(function() {
                        var e = b(!0);
                        T.caret(e), r.completed && e == T.val().length && r.completed.call(T)
                    }, 0)
                }), s && n && T.bind("keyup.mask", h), b()
            }))
        }
    })
}(jQuery),
function(e, t, a) {
    "use strict";
    var o = t.PFTX = t.PFTX || {},
        i = e("body");
    o.pages = {}, o.modules = {}, o.init = function() {
        o.pages.common.init(), e.each(o.pages, function() {
            i.hasClass(this.pageClass) && this.hasOwnProperty("init") && this.init()
        })
    }
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.constructor = PFTX.constructor || {}, PFTX.constructor.module = function(e) {}, PFTX.constructor.module.init = function(e) {
        for (var t in e) PFTX.modules.buyButtonAsync.hasOwnProperty(t) && (PFTX.modules.buyButtonAsync[t] = e[t])
    }
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.constructor = {}, PFTX.constructor.page = function(o) {
        this.pageClass = o, this.DOMReady = function() {}, this.winLoad = function() {}, this.ajaxStop = function() {}, this.common = function() {}, this.init = function() {
            e(t).load(e.proxy(function() {
                this.winLoad()
            }, this)), e(a).ready(e.proxy(function() {
                this.common(), this.DOMReady()
            }, this)).ajaxStop(e.proxy(function() {
                this.common(), this.ajaxStop()
            }, this))
        }
    }
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.addLista = t.PFTX.modules.addLista || {}, PFTX.modules.addLista.cliLogado = function() {
        e.ajax("/no-cache/profileSystem/getProfile").done(function(o) {
            o.IsUserDefined ? (o.FirstName ? sessionStorage.setItem("nomeUser", o.FirstName) : sessionStorage.setItem("nomeUser", o.Email.split("@")[0]), sessionStorage.setItem("email", o.Email), PFTX.modules.addLista.listas(o.Email)) : e(a).on("click", "li[layout] #addProdutoLista, .mainProductInfo .modelSelect #addProdutoLista", function(e) {
                e.preventDefault(), location.href = "/login?ReturnUrl=" + t.location.pathname
            })
        })
    }, PFTX.modules.addLista.listas = function(o) {
        sessionStorage.getItem("logado");
        e.ajax({
            async: !0,
            crossDomain: !0,
            cache: !1,
            url: "/api/dataentities/LD/search?_fields=img,nomeLista,urlLista,dataLista,observacoes,nomeUser,email,produtos,produtosComprados,quemComprou,orderidShareCart,index,id&_where=email=" + o,
            method: "GET",
            success: function(o) {
                o = PFTX.pages.listas.mergeCached(o), e(a).on("click", ".shelf li #addProdutoLista, .mainProductInfo .modelSelect #addProdutoLista", function(a) {
                    a.preventDefault();
                    var i, s = e(".buy-in-page-button").attr("href");
                    e(".buy-in-page-button").attr("href") ? s.indexOf("selecione") >= 0 ? alert("Selecione um modelo.") : "undefined" != (i = new URL(t.location.origin + s).searchParams.get("sku")) && PFTX.modules.addLista.modalAddProd(o, i) : "undefined" != (i = e(this).attr("data-product-id")) && PFTX.modules.addLista.modalAddProd(o, i)
                })
            }
        })
    }, PFTX.modules.addLista.modalAddProd = function(t, a) {
        e("body").prepend('<div class="maskLista"></div><div id="modal-Add-Produto" class="modal-add-lista"><h3>Listas de Desejos</h3><a class="criar-lista">Criar nova lista</a><ul class="listagem"></ul><button class="confirmar">Confirmar</button><button class="cancelar">Cancelar</button></div>'), e(".criar-lista").on("click", function(t) {
            t.preventDefault(), e(".modal-add-lista .cancelar").trigger("click"), PFTX.pages.listas.novaLista()
        }), "" != t && null != t && t.forEach(function(t) {
            void 0 == t.id && (t.id = t.index), e(".modal-add-lista .listagem").prepend('<li><span class="nome-lista">' + t.nomeLista + '</span><span class="acoes-add" data-id="' + t.id + '"><i></i> Adicionar nessa lista</span></li>')
        }), PFTX.modules.addLista.closeModal(e(".modal-add-lista .cancelar"), e(".modal-add-lista")), e(".acoes-add").on("click", function(t) {
            if (t.preventDefault(), t.stopPropagation(), !e(this).hasClass("adicionado")) {
                e(this).addClass("adicionado"), e(this).html('<i class="prod-adicionado"></i> Adicionado');
                var o = e(this).attr("data-id"),
                    i = parseInt(a),
                    s = [];
                s.push({
                    sku: i,
                    idLista: o
                }), PFTX.modules.addLista.salvaProd(s)
            }
        })
    }, PFTX.modules.addLista.salvaProd = function(t) {
        var a = JSON.parse(localStorage.getItem("allLists")),
            o = [],
            i = {
                sku: t[0].sku,
                qtd: 1
            };
        a.map(function(e) {
            e.index != t[0].idLista && e.id != t[0].idLista || ("" == e.produtos && (e.produtos = []), e.produtos.map(function(e) {
                o.push(e)
            }))
        }), o.push(i), a.map(function(e) {
            e.index != t[0].idLista && e.id != t[0].idLista || (e.produtos = o)
        }), localStorage.setItem("allLists", JSON.stringify(a));
        var s = {
            produtos: o
        };
        e.ajax({
            async: !0,
            url: "/estrela/dataentities/LD/documents/" + t[0].idLista,
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify(s),
            success: function() {
                e(".modal-add-lista .cancelar").trigger("click")
            }
        })
    }, PFTX.modules.addLista.closeModal = function(t, a) {
        t.on("click", function() {
            a.remove(), e(".maskLista").remove()
        })
    }, PFTX.modules.addLista.init = function() {
        e(".shelf li").each(function() {
            var t = e(this).find(".buy-action .buy-button-normal").attr("id");
            e(this).find(".productImage").append('<a data-product-id="' + t + '" id="addProdutoLista">adicionar a lista <i class="icon-lista-shelf"></i></a>')
        })
    }, e(a).ready(function() {
        PFTX.modules.addLista.cliLogado()
    })
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.advancedSearch = {
        $categoria: e("#busca-categoria"),
        $subcategoria: e("#busca-peca"),
        $filtros: e("#busca-marca"),
        $btnSubmit: e(".filter-item.send .btn-filter")
    }, PFTX.modules.advancedSearch.bindCategory = function() {
        PFTX.modules.advancedSearch.$categoria.live("change", function() {
            PFTX.modules.advancedSearch.$subcategoria.html('<option value="">Carregando...</option>'), PFTX.modules.advancedSearch.$filtros.html('<option value="">Carregando...</option>'), e(this).val() && e.ajax({
                url: e(this).val(),
                dataType: "html",
                success: function(t) {
                    PFTX.modules.advancedSearch.buildSubCategory(e(t).find(".menu-departamento").last())
                }
            })
        })
    }, PFTX.modules.advancedSearch.buildSubCategory = function(t) {
        var a = t.find("h4 + ul").find("li"),
            o = "",
            i = t.find(".Marca").find("li"),
            s = "";
        a.each(function() {
            var t = e(this).find("a").attr("href");
            t = t.split("pecas/")[1].split("?PS")[0], o += '<option value="' + t + '">' + e(this).find("a").html() + "</option>"
        }), i.each(function() {
            var t = e(this).find("a").attr("href");
            t = t.split("pecas/")[1].split("?PS")[0], s += '<option value="' + t + '">' + e(this).find("a").html() + "</option>"
        }), PFTX.modules.advancedSearch.$subcategoria.html('<option value="">Selecione uma peça</option>' + o), PFTX.modules.advancedSearch.$filtros.html('<option value="">Selecione uma marca</option>' + s)
    }, PFTX.modules.advancedSearch.getUrlResult = function() {
        var e = "/pecas";
        return PFTX.modules.advancedSearch.$subcategoria.val() ? (e += "/" + PFTX.modules.advancedSearch.$subcategoria.val(), PFTX.modules.advancedSearch.$filtros.val() && (e += "/" + PFTX.modules.advancedSearch.$filtros.val().split("/")[1])) : PFTX.modules.advancedSearch.$filtros.val() ? e += "/" + PFTX.modules.advancedSearch.$filtros.val() : e = !1, e
    }, PFTX.modules.advancedSearch.sendUrlResult = function() {
        var e = PFTX.modules.advancedSearch.getUrlResult();
        PFTX.modules.advancedSearch.$btnSubmit.live("click", function(a) {
            a.preventDefault(), e && (e = t.location.origin + PFTX.modules.advancedSearch.getUrlResult(), t.location.href = e)
        })
    }, PFTX.modules.advancedSearch.init = function() {
        PFTX.modules.advancedSearch.bindCategory(), PFTX.modules.advancedSearch.sendUrlResult()
    }
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.autoComplete = {
        qtd: 4,
        template: "29a178dc-78ee-4676-a99c-e299dd973a10",
        $searchBox: e("#q"),
        $form: e(".pftx-autocomplete"),
        $target: e(".autocomplete-resultado"),
        $resultados: e(".autocomplete-resultado"),
        $maisBuscados: e(".autocomplete-mais-buscados"),
        $bgAutocomplete: e(".bg-autocomplete"),
        debounceInterval: 250,
        debounceTimeout: void 0,
        debounce: !0
    }, PFTX.modules.autoComplete.bindEvents = function() {
        PFTX.modules.autoComplete.$searchBox.on("keyup", function() {
            var t = e(this).val();
            t.length >= 3 ? PFTX.modules.autoComplete.debounce ? PFTX.modules.autoComplete.deboundAutoComplete(t, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.searchTerm(t, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados")
        }), PFTX.modules.autoComplete.$searchBox.on("focus", function() {
            var t = e(this).val();
            t.length >= 3 ? PFTX.modules.autoComplete.searchTerm(t, PFTX.modules.autoComplete.qtd) : PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados")
        }), PFTX.modules.autoComplete.$bgAutocomplete.on("click", function() {
            setTimeout(function() {
                PFTX.modules.autoComplete.toggleAutocomplete(""), PFTX.modules.autoComplete.$searchBox.val("")
            }, 300)
        }), e(".autocomplete-btn-all-results").live("click", function() {
            PFTX.modules.autoComplete.$form.submit()
        }), PFTX.modules.autoComplete.$form.on("submit", function(e) {
            e.preventDefault();
            var a = t.location.origin + "/" + encodeURIComponent(PFTX.modules.autoComplete.$searchBox.val());
            t.location.href = a
        })
    }, PFTX.modules.autoComplete.searchTerm = function(t, a) {
        var o = encodeURIComponent(t),
            i = "/buscapagina?sl=" + PFTX.modules.autoComplete.template + "&PS=" + a + "&cc=10&sm=0&PageNumber=1&ft=" + o;
        e.ajax({
            url: i,
            beforeSend: function() {}
        }).fail(function() {
            PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados")
        }).done(function(t) {
            t.length ? (PFTX.modules.autoComplete.toggleAutocomplete("resultado"), PFTX.modules.autoComplete.$resultados.html(t)) : (PFTX.modules.autoComplete.toggleAutocomplete("mais-buscados"), e(".autocomplete-btn-all-results").hide())
        }).always(function() {
            PFTX.modules.autoComplete.buildAutoComplete()
        })
    }, PFTX.modules.autoComplete.deboundAutoComplete = function(e, t) {
        "number" == typeof PFTX.modules.autoComplete.debounceTimeout && clearTimeout(PFTX.modules.autoComplete.debounceTimeout), PFTX.modules.autoComplete.debounceTimeout = setTimeout(function() {
            PFTX.modules.autoComplete.searchTerm(e, t)
        }, PFTX.modules.autoComplete.debounceInterval)
    }, PFTX.modules.autoComplete.buildAutoComplete = function() {
        var a = PFTX.modules.autoComplete.$searchBox.offset().left - 1,
            o = PFTX.modules.autoComplete.$searchBox.offset().top + PFTX.modules.autoComplete.$searchBox.height() - 4;
        PFTX.modules.autoComplete.$target.css({
            left: a,
            top: o
        });
        e(t).scrollTop();
        var i = function() {
            PFTX.modules.autoComplete.$target.css({
                left: "",
                top: "",
                right: "",
                margin: "",
                position: ""
            })
        };
        i(), PFTX.modules.autoComplete.$target.css({
            left: a,
            top: o
        }), e(t).scroll(function(e) {
            i(), PFTX.modules.autoComplete.$target.css({
                left: a,
                top: o
            })
        })
    }, PFTX.modules.autoComplete.toggleAutocomplete = function(e) {
        switch (e) {
            case "resultado":
                PFTX.modules.autoComplete.$target.show(), PFTX.modules.autoComplete.$resultados.show(), PFTX.modules.autoComplete.$maisBuscados.hide(), PFTX.modules.autoComplete.$searchBox.addClass("active"), PFTX.modules.autoComplete.$bgAutocomplete.show();
                break;
            case "mais-buscados":
            default:
                PFTX.modules.autoComplete.$target.hide(), PFTX.modules.autoComplete.$maisBuscados.hide(), PFTX.modules.autoComplete.$resultados.hide(), PFTX.modules.autoComplete.$searchBox.removeClass("active"), PFTX.modules.autoComplete.$bgAutocomplete.hide()
        }
    }, PFTX.modules.autoComplete.init = function() {
        PFTX.modules.autoComplete.bindEvents(), PFTX.modules.autoComplete.buildAutoComplete()
    }
}(jQuery, window.top, document),
function(e, t, a, o) {
    "use strict";
    var i = PFTX.modules;

    function s(t) {
        this.config = {
            separator: "##",
            target: null,
            autoplay: !1,
            autoplaySpeed: 2e3
        }, e.extend(this.config, t)
    }
    s.prototype.buildHtml = function() {
        var t = this;
        e(t.config.target).find(".box-banner").each(function() {
            var a = e(this),
                o = a.find("img").attr("alt");
            if (o.indexOf(t.config.separator) > -1) {
                var i = ['<div class="banner-html__background"></div>', '<div class="banner-html__content">', '<h2 class="banner-html__title">', o.split(t.config.separator)[0], "</h2>", '<p class="banner-html__text">', o.split(t.config.separator)[1], "</p>", '<span class="banner-html__link">Ver mais</span>', "</div>"].join("");
                a.append(i)
            }
        })
    }, s.prototype.init = function() {
        this.buildHtml(), e(this.config.target).find(".box-banner").length > 1 ? e(this.config.target).slick({
            dots: !0,
            infinite: !0,
            arrows: !1,
            slide: ".box-banner",
            autoplay: this.config.autoplay,
            autoplaySpeed: this.config.autoplaySpeed
        }) : e(this.config.target).addClass("no-slick")
    }, i.bannerHtml = s
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    var i, s = PFTX.modules;

    function n(t) {
        this.config = {
            maxWidth: 767,
            stand: ".prateleira",
            target: ".menu-main > .bread-crumb",
            targetChange: ".catalog-results",
            templateControls: '<div class="controls"><a role="button" class="list"><span class="ico-list-view"></span></a><a role="button" class="table active"><span class="ico-table-view"></span></a></div>',
            typeEvent: !0
        }, e.extend(this.config, t), (i = this).config.typeEvent && i.resizeEvent()
    }
    n.prototype.createButtons = function() {
        if (0 == e(i.config.target).length) return !1;
        if ("string" == typeof this.config.templateControls) {
            var t = e(i.config.target).append(i.config.templateControls).find(".controls a");
            if (0 == t.length) return !1;
            t.each(function(t, a) {
                i.controlAction(e(a), e("body").find(i.config.targetChange))
            }), i.resizeElement(e(i.config.stand).find("ul > li"), !0)
        }
    }, n.prototype.controlAction = function(t, a) {
        if ("object" != typeof t || 0 == a.length) return !1;
        t.on("click", function(o) {
            o.preventDefault(), i.clearControls(t, a) && (a.addClass(t.attr("class")), t.addClass("active")), i.resizeProductForBrother(767, e(i.config.stand).find("ul > li"))
        })
    }, n.prototype.clearControls = function(t, a) {
        return "object" == typeof t && (t.parent().find("a").each(function(t, o) {
            var i = e(o);
            i.removeClass("active"), a.hasClass(i.attr("class")) && a.removeClass(i.attr("class"))
        }), !0)
    }, n.prototype.resizeProductForBrother = function(e, t) {
        if ("number" != typeof e) return !1;
        i.config.maxWidth <= e && i.resizeElement(t)
    }, n.prototype.resizeElement = function(e, t) {
        if ("object" != typeof e) return !1;
        if (e.length > 0) {
            if (t) return e.height("auto"), e.height(i.searchHeigthElement(e)), !0;
            e.height("auto"), e.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                e.css({
                    height: i.searchHeigthElement(e)
                })
            })
        }
    }, n.prototype.searchHeigthElement = function(t) {
        if ("object" != typeof t) return "auto";
        var a = 0;
        return t.each(function(t, o) {
            var i = e(o);
            a = i.height() > a ? i.height() : a
        }), a
    }, n.prototype.resizeEvent = function() {
        if ("number" != typeof i.config.maxWidth && i.config.maxWidth > 0) return !1;
        if (i.config.typeEvent) {
            t.addEventListener("resize", function() {
                t.innerWidth <= i.config.maxWidth && i.resizeElement(e(i.config.stand).find("ul > li"), !0)
            })
        }
    }, n.prototype.init = function() {
        this.createButtons()
    }, s.breadCrumb = n
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.buildLista = t.PFTX.modules.buildLista || {};
    var i = e("#displayProdutos");
    i.wrap('<div class="box-aviso"></div>'), PFTX.modules.buildLista.init = function() {
        e(".acoes-exibicao-lista a").hide(), e(a).on("click", ".seleciona-item", function() {
            e(".acoes-exibicao-lista a").show()
        });
        var o = location.search.split("link="),
            i = sessionStorage.getItem("logado"),
            s = !1,
            n = JSON.parse(localStorage.getItem("allLists")),
            r = [];
        if ("" == n && null == n || n.map(function(e) {
                e.urlLista == o[1] && (s = !0, r.push(e))
            }), "true" == i && s) sessionStorage.setItem("lista", r[0].urlLista), sessionStorage.setItem("dono-da-lista", r[0].email), sessionStorage.setItem("shareCart", r[0].orderidShareCart), PFTX.modules.buildLista.displayInfoLista(r[0]), PFTX.modules.buildLista.verificaLista(r[0].email);
        else {
            var l = new URL(t.location.href).searchParams.get("link");
            e.ajax({
                async: !0,
                crossDomain: !0,
                cache: !1,
                url: "/api/dataentities/LD/search?_fields=img,nomeLista,urlLista,dataLista,observacoes,nomeUser,email,produtos,produtosComprados,quemComprou,orderidShareCart,index,id&urlLista=" + l,
                method: "GET",
                success: function(e) {
                    e.length > 0 && (sessionStorage.setItem("lista", e[0].urlLista), sessionStorage.setItem("dono-da-lista", e[0].email), sessionStorage.setItem("shareCart", e[0].orderidShareCart), PFTX.modules.buildLista.displayInfoLista(e[0]), PFTX.modules.buildLista.verificaLista(e[0].email))
                }
            })
        }
    }, PFTX.modules.buildLista.verificaLista = function(t) {
        t !== sessionStorage.getItem("email") && (e(".informacoes-lista .editar-lista").hide(), e(".acoes-exibicao-lista").each(function() {
            e(this).find("#deleteSelecionados").hide()
        }))
    }, PFTX.modules.buildLista.displayInfoLista = function(t) {
        var a, o, s = e(".informacoes-lista");
        void 0 == t.id && (t.id = t.index), t.img ? (o = t.img.split(",").pop(), a = "/api/dataentities/LD/documents/" + t.id + "/img/attachments/" + o) : a = "/arquivos/box-user-teste.png", s.find(".foto-lista").css("background-image", "url(" + a + ")");
        var n = t.nomeUser && "null" != t.nomeUser ? t.nomeUser : "",
            r = "<h3>" + t.nomeLista + '</h3><p class="linkLista">' + location.origin + "/listas/lista?link=" + t.urlLista + "</p><p>" + n + "</p><p>" + t.dataLista + "</p><p>" + t.observacoes + "</p>",
            l = '<a lista-id="' + t.index + '" class="editar-lista">Editar</a>';
        if (s.find(".dados-lista").html(r), s.append(l), t.produtos.length > 0) {
            var c = t.produtos;
            "string" == typeof t.produtos && (c = JSON.parse(t.produtos)), PFTX.modules.buildLista.displayProdutos(c, t.id, t.produtosComprados)
        } else i.parent(".box-aviso").prepend('<div class="aviso-produtos"><p>Ainda não há produtos nessa lista :(</p></div>');
        e(".informacoes-lista .editar-lista").on("click", function(t) {
            t.preventDefault();
            var a = e(this).attr("lista-id");
            PFTX.pages.listas.editarLista(a)
        })
    }, PFTX.modules.buildLista.displayProdutos = function(t, a, o) {
        e("#displayProdutos li").remove();
        var s = [];
        t.forEach(function(t) {
            s.indexOf(t.sku) >= 0 || (s.push(t.sku), e.ajax({
                async: !0,
                crossDomain: !0,
                url: "/api/catalog_system/pub/products/search?fq=skuId:" + t.sku,
                method: "GET",
                success: function(e) {
                    if (e.length > 0) {
                        var a = e[0].items.filter(function(e) {
                            return e.itemId == t.sku
                        });
                        a.length && i.prepend('<li class="item-produto-lista" data-sku="' + a[0].itemId + '"><label class="seleciona-item"><input type="checkbox" /><span class="checkmark"></span></label><a href="' + e[0].link + '"><div class="img-produto"><img src="' + a[0].images[0].imageUrl + '" /></div><div class="detalhes-produto"><p>' + a[0].nameComplete + '</p><p class="preco-produto">' + PFTX.modules.buildLista.formatReal(a[0].sellers[0].commertialOffer.Price) + '</p></div></a><button class="comprar-produto">Comprar</button></li>')
                    }
                },
                complete: function() {
                    o && e(".item-produto-lista").each(function() {
                        var t = parseInt(e(this).attr("data-sku")),
                            a = o.filter(function(e) {
                                if (e.sku === t) return e
                            });
                        a[0] && a[0].sku && e(this).addClass("produto-bloqueado")
                    })
                }
            }))
        }), setTimeout(function() {
            PFTX.modules.buildLista.selectProduto(), PFTX.modules.buildLista.deletaProdutoLista(t, a)
        }, 1e3)
    }, PFTX.modules.buildLista.selectProduto = function() {
        e(".item-produto-lista").on("click", function(t) {
            var a = [],
                o = parseInt(e(this).attr("data-sku"));
            sessionStorage.getItem("comprado") && (a = JSON.parse(sessionStorage.getItem("comprado"))), a.push({
                sku: o,
                quantity: 1
            }), sessionStorage.setItem("comprado", JSON.stringify(a))
        }), e(".item-produto-lista").each(function() {
            var t = [];
            sessionStorage.getItem("compraLista") && (t = JSON.parse(sessionStorage.getItem("compraLista"))), e(this).find(".seleciona-item").on("change", function() {
                e("input[type=checkbox]:checked").each(function() {
                    var a = parseInt(e(this).parent().parent().attr("data-sku"));
                    t.push({
                        sku: a,
                        quantity: 1
                    }), sessionStorage.setItem("compraLista", JSON.stringify(t))
                }), 0 == e("input[type=checkbox]:checked").length && sessionStorage.removeItem("compraLista")
            }), e(this).find(".comprar-produto").on("click", function() {
                var t = parseInt(e(this).parent().attr("data-sku")),
                    a = [];
                sessionStorage.getItem("compraLista") && (a = JSON.parse(sessionStorage.getItem("compraLista"))), a.push({
                    sku: t,
                    quantity: 1
                }), sessionStorage.setItem("compraLista", JSON.stringify(a)), e(".acoes-exibicao-lista .addSelecionados").trigger("click")
            })
        })
    }, PFTX.modules.buildLista.enviaCarrinho = function() {
        e(a).on("click", ".acoes-exibicao-lista .addSelecionados", function() {
            var e = JSON.parse(sessionStorage.getItem("compraLista")),
                t = (sessionStorage.getItem("shareCart"), []);
            e && e.forEach(function(e) {
                t.push({
                    id: e.sku,
                    quantity: 1,
                    seller: 1
                })
            }), t.length ? vtexjs.checkout.addToCart(t).done(function(e) {
                setTimeout(function() {
                    sessionStorage.removeItem("compraLista"), location.href = "/checkout/?listaEmail=" + sessionStorage.getItem("dono-da-lista") + "#/cart"
                }, 100)
            }) : swal({
                text: "VocÃª deve adicionar ao menos um item",
                icon: "warning"
            })
        })
    }, PFTX.modules.buildLista.deletaProdutoLista = function(t, a) {
        e(".acoes-exibicao-lista #deleteSelecionados").on("click", function(o) {
            o.preventDefault();
            var i = JSON.parse(sessionStorage.getItem("compraLista")),
                s = t,
                n = i;
            if (!0 === e(".seleciona-item input").is(":checked")) {
                for (var r = s.length - 1; r >= 0; r--)
                    for (var l = 0; l < n.length; l++) s[r] && s[r].sku === n[l].sku && s.splice(r, 1);
                var c = {
                    produtos: s
                };
                e.ajax({
                    async: !0,
                    url: "/estrela/dataentities/LD/documents/" + a,
                    type: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(c),
                    success: function() {
                        var e = [];
                        JSON.parse(localStorage.getItem("allLists")).map(function(t) {
                            t.id == a && (t.produtos = s, e.push(t))
                        }), PFTX.modules.buildLista.displayProdutos(e[0].produtos, e[0].id, e[0].produtosComprados), swal({
                            text: "Produto(s) removido(s) com sucesso!",
                            icon: "success"
                        })
                    }
                })
            }
        })
    }, PFTX.modules.buildLista.formatReal = function(e) {
        return (e = e.toFixed(2).split("."))[0] = "R$ " + e[0].split(/(?=(?:...)*$)/).join("."), e.join(",")
    }, PFTX.modules.buildLista.enviaCarrinho()
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.buyButtonAsync = {
        buyButton: null,
        modalContainer: null,
        modal: {
            container: "",
            mensagem: "",
            nome: "",
            descricao: "",
            tamanho: "",
            cor: "",
            close: "",
            foto: ""
        },
        callbackSuccess: function() {},
        callbackError: function() {}
    }, PFTX.modules.buyButtonAsync.bindEvents = function() {
        PFTX.modules.buyButtonAsync.buyButton.on("click", PFTX.modules.buyButtonAsync.hasSKUChecked), PFTX.modules.buyButtonAsync.modal.close.on("click", function() {
            PFTX.modules.buyButtonAsync.modal.container.fadeOut()
        }), PFTX.modules.buyButtonAsync.modal.container.on("click", function(e) {
            e.target === this && PFTX.modules.buyButtonAsync.modal.container.fadeOut()
        }), e(".modalbtn-continuar").on("click", function() {
            PFTX.modules.buyButtonAsync.modal.container.fadeOut()
        })
    }, PFTX.modules.buyButtonAsync.hasSKUChecked = function(e) {
        /javascript/g.test(PFTX.modules.buyButtonAsync.buyButton.attr("href")) || (e.preventDefault(), PFTX.modules.buyButtonAsync.addToCart())
    }, PFTX.modules.buyButtonAsync.addToCart = function() {
        e.ajax({
            url: PFTX.modules.buyButtonAsync.buyButton.attr("href"),
            type: "GET"
        }).done(function() {
            PFTX.modules.buyButtonAsync.showModal(), e(a).trigger("cartProductAdded.vtex")
        })
    }, PFTX.modules.buyButtonAsync.addModal = function() {
        var t = "";
        t += '<div class="modalbtn-overlay">', t += '<div class="modalbtn">', t += '<div class="modalbtn-close"></div>', t += '<div class="modalbtn-image-wrapper">', t += '<img alt="" class="modalbtn-image" />', t += "</div>", t += '<div class="modalbtn-content">', t += '<div class="modalbtn-mensagem">Produto adicionado Ã  sacola</div>', t += '<div class="modalbtn-nome"></div>', t += '<div class="modalbtn-description"></div>', t += '<div class="modalbtn-tamanho"></div>', t += '<div class="modalbtn-cor"></div>', t += '<a class="modalbtn-continuar">Continuar comprando</a>', t += '<a href="/checkout" class="modalbtn-finalizar">Finalizar compra</a>', t += "</div>\x3c!-- modalbtn-content --\x3e", t += "</div>\x3c!-- modalbtn --\x3e", t += "</div>\x3c!-- modalbtn-overlay --\x3e", e("body").append(t), PFTX.modules.buyButtonAsync.modal = {
            container: e(".modalbtn-overlay"),
            mensagem: e(".modalbtn-mensagem"),
            nome: e(".modalbtn-nome"),
            descricao: e(".modalbtn-description"),
            tamanho: e(".modalbtn-tamanho"),
            cor: e(".modalbtn-cor"),
            foto: e(".modalbtn-image"),
            close: e(".modalbtn-close")
        }
    }, PFTX.modules.buyButtonAsync.showModal = function() {
        PFTX.modules.buyButtonAsync.modal.nome.html(e(".fn.productName").text()), PFTX.modules.buyButtonAsync.modal.descricao.html(e(".product-description-short").text()), PFTX.modules.buyButtonAsync.modal.tamanho.html(e(".item-dimension-Tamanho").find("input:checked").attr("data-value")), PFTX.modules.buyButtonAsync.modal.cor.html(e(".item-dimension-Cor").find("input:checked").attr("data-value")), PFTX.modules.buyButtonAsync.modal.foto.attr("src", e("#image").find("img").eq(0).attr("src")), PFTX.modules.buyButtonAsync.modal.container.fadeIn()
    }, PFTX.modules.buyButtonAsync.init = function(e) {
        for (var t in e) PFTX.modules.buyButtonAsync.hasOwnProperty(t) && (PFTX.modules.buyButtonAsync[t] = e[t]);
        PFTX.modules.buyButtonAsync.buyButton && (PFTX.modules.buyButtonAsync.addModal(), PFTX.modules.buyButtonAsync.bindEvents())
    }
}(jQuery, window, document),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.buyButton = {}, PFTX.modules.buyButton.floated = !1, PFTX.modules.buyButton.menuHeight = 110, PFTX.modules.buyButton.bindEvents = function() {
        e(".more").live("click", function() {
            PFTX.modules.changeQuantity("more", e(this))
        }), e(".less").live("click", function() {
            PFTX.modules.changeQuantity("less", e(this))
        })
    }, PFTX.modules.changeQuantity = function(e, t) {
        var a = t.parent().siblings("input"),
            o = parseInt(a.val());
        "more" === e ? ((o += 1) < 10 && (o = "0" + o), a.val(o)) : o > 1 && ((o -= 1) < 10 && (o = "0" + o), a.val(o))
    }, PFTX.modules.buyButton.init = function() {
        PFTX.modules.buyButton.bindEvents()
    }
}(jQuery, window, document),
function() {
    for (var e, t = function() {}, a = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], o = a.length, i = window.console = window.console || {}; o--;) i[e = a[o]] || (i[e] = t)
}(),
function(e, t, a, o) {
    "use strict";
    PFTX.modules.cookie = t.PFTX.modules.cookie || {}, PFTX.modules.cookie.set = function(e, t, o, i) {
        var s = i || "/",
            n = o || 1,
            r = new Date;
        r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
        var l = "expires=" + r.toGMTString();
        a.cookie = e + "=" + encodeURI(t) + "; " + l + "; path=" + s
    }, PFTX.modules.cookie.get = function(e) {
        for (var t = e + "=", o = a.cookie.split(";"), i = 0; i < o.length; i++) {
            var s = o[i].trim();
            if (0 == s.indexOf(t)) return decodeURI(s.substring(t.length, s.length))
        }
        return ""
    }, PFTX.modules.cookie.remove = function(e, t) {
        var o = t || "/";
        a.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + o
    }
}(jQuery, window, document), Modernizr.addTest("boxsizing", function() {
        return Modernizr.testAllProps("boxSizing") && (void 0 === document.documentMode || document.documentMode > 7)
    }), $(function() {
        $("html").hasClass("boxsizing") || $("*").each(function() {
            var e = $(this).outerWidth(),
                t = $(this).width(),
                a = t - (e - t);
            $(this).css("width", a)
        })
    }), Modernizr.testProp("webkitAppearance"), Modernizr.addTest("webkit-appearance", function() {
        return Modernizr.testProp("webkitAppearance")
    }),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                target: "select"
            }, e.extend(this.config, t)
        }
        s.prototype.bindEvents = function() {
            this.onClickTitle(), this.onBlur(), this.onSelectItem(), e(this.config.target).each(function() {
                var t = e(this).val(),
                    a = e(this).find("option:selected").text();
                e(this).next(".fakeSelect").find(".fakeSelect__item").each(function() {
                    e(this).attr("data-value") == t && e(this).parents(".fakeSelect").attr("data-selected", t).find(".fakeSelect__title a").html(a)
                })
            })
        }, s.prototype.build = function() {
            var t, a, o;
            e(this.config.target).each(function() {
                a = [], o = "", e(this).find("option").each(function() {
                    t = {
                        key: e(this).text(),
                        value: e(this).val()
                    }, a.push(t)
                });
                for (var i = 0; i < a.length; i++) o += '<a class="fakeSelect__item" data-value="' + a[i].value + '">' + a[i].key + "</a>";
                e('<dl class="fakeSelect" data-selected=""><dt class="fakeSelect__title"><a>Selecione</a><span class="fakeSelect__arrow"></span><dd class="fakeSelect__list">' + o + "</dd></dl>").insertAfter(e(this)), e(".fakeSelect__list").hide()
            })
        }, s.prototype.onClickTitle = function() {
            e("body").on("click", ".fakeSelect__title", function(t) {
                t.stopPropagation(), e(this).parent().toggleClass("active").find(".fakeSelect__list").toggle()
            })
        }, s.prototype.onSelectItem = function() {
            var t = this;
            e("body").on("click", ".fakeSelect__item", function(a) {
                a.stopPropagation();
                var o = e(this).attr("data-value"),
                    i = e(this).text();
                e(this).parent().hide().parent().attr("data-selected", o).removeClass("active").prev(t.config.target).val(o).trigger("change"), e(this).parents(".fakeSelect").find(".fakeSelect__title a").html(i)
            })
        }, s.prototype.onBlur = function() {
            e("html").on("click", function() {
                e(".fakeSelect").removeClass("active").find(".fakeSelect__list").hide()
            })
        }, s.prototype.init = function() {
            this.build(), this.bindEvents()
        }, i.customSelect = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.DataSkuManager = function(t) {
            var a = t,
                o = PFTX.modules.DataSkuManager,
                i = "/produto/sku/";
            if (o.objSkusInfo = {
                    skuList: []
                }, e(a).length) {
                e(a).find("label").length;
                var s = [];
                e.each(skuJson.skus, function(t, n) {
                    var r, l, c, d; - 1 == s.indexOf(n.values[n.values.length - 2]) && (s.push(n.values[n.values.length - 2]), o.objSkusInfo.skuList.push({
                        id: n.sku,
                        name: n.values[n.values.length - 2],
                        thumb: "",
                        texture: ""
                    }), r = n.sku, l = n.values[n.values.length - 2], d = i + r, e.getJSON(d, function(t) {
                        c = t;
                        try {
                            var i = c[0].Images[0].length;
                            if (void 0 !== i)
                                for (var s = 0; s < i; s++) {
                                    var n = c[0].Images[0][s].ArchiveTypeId;
                                    if (1 == n) {
                                        var d = c[0].Images[0][s].Path;
                                        e.each(o.objSkusInfo.skuList, function(e, t) {
                                            t.id == r && (o.objSkusInfo.skuList[e].thumb = d)
                                        }), e(a).find("label").each(function() {
                                            l == e(this).text() && (e(this).css("background", "url('" + d + "') center center no-repeat scroll transparent"), e(this).attr("title", e(this).text()))
                                        })
                                    }
                                }
                        } catch (e) {}
                    }))
                })
            }
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.events = t.PFTX.modules.events || {
            container: null,
            log: []
        }, PFTX.modules.events.listener = function(t, a) {
            this.container instanceof Object || (this.container = e("<div />")), this.container.on(t, function(e) {
                a(e.customData)
            })
        }, PFTX.modules.events.dispatch = function(t, a) {
            this.log.length;
            var o = t,
                i = a || {};
            this.container instanceof Object || (this.container = e("<div>"));
            try {
                this.container.trigger({
                    type: o,
                    customData: i
                })
            } catch (e) {}
            this.log.push(o)
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i, s = PFTX.modules;

        function n(t) {
            this.config = {
                btnCollapse: "fieldset",
                parent: ".menu-departamento .search-multiple-navigator",
                btnClear: ".controls-close",
                navigator: ".search-multiple-navigator",
                navigationNav: ".navigation-tabs",
                templateClose: '<div class="controls-close"><button>limpar filtros</button></div>',
                templateButtons: '<div class="title-filters"><h2>Filtros <span class="ico-close"></span></h2></div>',
                templateItemSingleNav: '<fieldset class=""><h5 class="{class}">{name}</h5><div class="items">{items}</div></fieldset>',
                templateItemSingleNavLink: '<a class href="{link}">{name}</a>'
            }, e.extend(this.config, t), i = this
        }
        n.prototype.createTemplate = function() {
            if (0 == e(i.config.parent).length) return !1; - 1 != i.config.parent.search(/(.search-multiple-navigator)/g) ? (e(i.config.parent).parent().parent().find("> div").prepend(i.config.templateButtons), i.btnCheck(e(i.config.parent))) : (e(i.config.parent).prepend(i.config.templateButtons), e("body").hasClass("busca") ? i.collectionFilters() : e(i.config.parent).find(i.config.btnCollapse).each(function(t, a) {
                e(a).find("a").attr("href", "#").unbind("click")
            })), i.btnCollapse(), i.openPanel()
        }, n.prototype.btnCollapse = function() {
            e(i.config.parent).find(i.config.btnCollapse).on("click", function() {
                var t = e(this);
                t.hasClass("active") ? t.removeClass("active") : t.addClass("active")
            })
        }, n.prototype.btnCheck = function(t) {
            if ("object" != typeof t) return !1;
            t.find("div > label").on("click", function() {
                var t = e(this);
                t.find("> input").is(":checked") ? t.addClass("active") : (t.removeClass("active"), i.checkboxFilter(e(i.config.parent)))
            })
        }, n.prototype.closePanel = function() {
            e(".title-filters > h2 span").on("click", function() {
                e(i.config.navigationNav).hasClass("active") && (e("body").removeClass("open-filters"), e(i.config.navigationNav).removeClass("active"), i.closeClearFilters())
            })
        }, n.prototype.checkboxFilter = function(e) {
            if ("object" != typeof e) return !1;
            setTimeout(function() {
                e.find("div").find('input[type="checkbox"]').is(":checked") ? i.openClearFilters() : i.closeClearFilters()
            }, 100)
        }, n.prototype.openPanel = function() {
            if (0 == e(".btn-filters").length) return !1;
            e(".btn-filters").on("click", function() {
                e("body").addClass("open-filters"), e(i.config.navigationNav).addClass("active"), e(i.config.parent).find('input[type="checkbox"]').is(":checked") && i.openClearFilters()
            }), i.closePanel()
        }, n.prototype.openClearFilters = function() {
            0 == e("body").find(".controls-close").length && (e(i.config.navigator).addClass("open-filters").append(i.config.templateClose), i.clearFilters(e(i.config.btnClear)))
        }, n.prototype.clearFilters = function(t) {
            if ("object" != typeof t) return !1;
            t.animate({
                bottom: 0
            }, 300, function() {
                e(this).find("button").off("click").on("click", function() {
                    e(i.config.parent).find('input[type="checkbox"]').each(function(t, a) {
                        e(a).parent().removeClass("active")
                    }), e(".search-multiple-navigator input").attr("checked", !1).change(), i.closeClearFilters()
                })
            })
        }, n.prototype.closeClearFilters = function() {
            e("body").find(i.config.btnClear).length > 0 && e(i.config.btnClear).animate({
                bottom: -90
            }, 400, function() {
                e(i.config.navigator).removeClass("open-filters"), e(this).remove()
            })
        }, n.prototype.collectionFilters = function() {
            var t = e(".menu-main .menu-departamento .search-single-navigator");
            t.length > 0 && (e(".menu-main .navigation").addClass("navigation-tabs").removeClass("navigation"), e(".menu-main .menu-departamento .search-single-navigator").remove(), e(".menu-main .menu-departamento").append("<div></div>"), e(".menu-main .menu-departamento").find("> div").append('<div class="title-filters"><h2>Filtros <span class="ico-close"></span></h2></div>'), e(".menu-main .menu-departamento").find("> div").append('<div class="search-multiple-navigator" style="display: none;"></div>'), i.colletionCreateFilters(t))
        }, n.prototype.colletionCreateFilters = function(t) {
            if (!t || 0 == t.find("> h3").length) return !1;
            t.find("> h3").each(function(t, a) {
                var o = e(a),
                    s = i.config.templateItemSingleNav;
                if (0 == o.find("> ul > li").length) {
                    var n = i.config.templateItemSingleNavLink.replace("{name}", o.find("> a").text()).replace("{link}", o.find("> a").attr("href"));
                    s = s.replace("{class}", "link").replace("{name}", n)
                } else {
                    var r = "";
                    s = s.replace("{class}", "").replace("{name}", o.find("> a").text()), o.find("> ul > li").each(function(t, a) {
                        r += e(a)[0].innerHTML
                    }), s = s.replace("{items}", r)
                }
                e(".search-multiple-navigator").append(s), e.each(e(".search-multiple-navigator").find("fieldset"), function(t, a) {
                    e(a).find("> h5").off("click").on("click", function() {
                        e(this).parent().toggleClass("active")
                    })
                })
            }), e(i.config.parent).parent().parent().find("div").prepend(i.config.templateButtons), i.btnCheck(e(i.config.parent))
        }, n.prototype.init = function() {
            i.getScreenWidth() < 768 && this.createTemplate()
        }, n.prototype.getScreenWidth = function() {
            var e = a.body.parentNode,
                o = a.body;
            return t.opera ? o.clientWidth : "CSS1Compat" == a.compatMode ? e.clientWidth : o.clientWidth
        }, s.filtersMobile = n
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.floatingMenu = {}, PFTX.modules.floatingMenu.$target = e("html"), PFTX.modules.floatingMenu.floated = !1, PFTX.modules.floatingMenu.menuHeight = 175, PFTX.modules.floatingMenu.className = "floating-menu", PFTX.modules.floatingMenu.bindEvents = function() {
            e(t).scroll(function() {
                e(t).scrollTop() > PFTX.modules.floatingMenu.menuHeight ? PFTX.modules.floatingMenu.floated || (PFTX.modules.floatingMenu.$target.addClass(PFTX.modules.floatingMenu.className), PFTX.modules.floatingMenu.floated = !0) : PFTX.modules.floatingMenu.floated && (PFTX.modules.floatingMenu.$target.removeClass(PFTX.modules.floatingMenu.className), PFTX.modules.floatingMenu.floated = !1)
            })
        }, PFTX.modules.floatingMenu.init = function() {
            PFTX.modules.floatingMenu.bindEvents()
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                button: ".grid-control",
                listClass: "grid-list",
                tableClass: "grid-table",
                currentGrid: "table"
            }, e.extend(this.config, t)
        }
        s.prototype.bindEvents = function() {
            var a = this.config;
            e(a.button).on("click", function(o) {
                o.preventDefault(), e("html").toggleClass(a.listClass).toggleClass(a.tableClass), e(this).toggleClass("list").toggleClass("table"), a.currentGrid = "table" === a.currentGrid ? "list" : "table", t.localStorage.setItem("PFTX.gridControl", a.currentGrid)
            })
        }, s.prototype.loadGrid = function() {
            var a = this.config,
                o = t.localStorage.getItem("PFTX.gridControl") || a.currentGrid;
            a.currentGrid = o, e(a.button).removeClass("list").removeClass("table").addClass(o), t.localStorage.setItem("PFTX.gridControl", o);
            var i = "table" === a.currentGrid ? "grid-table" : "grid-list";
            e("html").removeClass("list").removeClass("table").addClass(i)
        }, s.prototype.init = function() {
            this.loadGrid(), this.bindEvents()
        }, i.gridControl = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                target: "#vitrineWrapper"
            }, e.extend(this.config, t)
        }
        var n = 1;
        s.prototype.bindEvents = function() {
            var t = this;
            e("body").on("click", "#loadMore", function() {
                t.requestHTML()
            })
        }, s.prototype.getUrl = function() {
            if (n++, "" == a.location.search) var e = a.location.href + "?PageNumber=" + n;
            else e = a.location.href + "&PageNumber=" + n;
            return e
        }, s.prototype.createButton = function() {
            e(this.config.target).after('<div id="loadMore">Carregar mais produtos</div>')
        }, s.prototype.requestHTML = function() {
            e(this.config.target).append('<div class="page"></div>'), e(".page").last().load(this.getUrl() + " .vitrine:not(resultItemsWrapper)", function(t, a, o) {
                "success" != a && n--, e(t).find(".busca-vazio").length > 0 && e("#loadMore").fadeOut()
            })
        }, s.prototype.init = function() {
            this.createButton(), this.bindEvents()
        }, i.loadMore = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.loginStatus = {}, PFTX.modules.loginStatus.$target = e("html"), PFTX.modules.loginStatus.loggedClass = "logado", PFTX.modules.loginStatus.unLoggedClass = "deslogado", PFTX.modules.loginStatus.toggleHtmlClass = function() {
            vtexjs.checkout.getOrderForm().done(function(e) {
                e.loggedIn ? PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.loggedClass) : PFTX.modules.loginStatus.$target.addClass(PFTX.modules.loginStatus.unLoggedClass)
            })
        }, PFTX.modules.loginStatus.init = function() {
            PFTX.modules.loginStatus.toggleHtmlClass()
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                store: "",
                entity: "",
                appKey: !1,
                appToken: !1
            }, e.extend(this.config, t)
        }
        s.prototype.headers = {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json"
        }, s.prototype.get = function(t, a) {
            a = void 0 !== a ? a : "0-50", this.headers["REST-Range"] = "resources=" + a, e.ajax({
                url: "/api/dataentities/" + this.config.entity + "/search?_fields=" + t,
                type: "GET",
                dataType: "json",
                crossDomain: !0,
                headers: this.headers,
                success: function(e) {
                    return e
                },
                error: function(t, a, o) {
                    if (t.responseText && e.parseJSON(t.responseText)) {
                        var i = e.parseJSON(t.responseText).Message;
                        return i
                    }
                }
            })
        }, s.prototype.post = function(t) {
            var a = JSON.stringify(t);
            e.ajax({
                url: "/estrela/dataentities/" + this.config.entity + "/documents",
                type: "POST",
                data: a,
                dataType: "json",
                crossDomain: !0,
                headers: this.headers,
                success: function(e) {
                    return e
                },
                error: function(t, a, o) {
                    if (t.responseText && e.parseJSON(t.responseText)) {
                        e.parseJSON(t.responseText).Message;
                        return null
                    }
                }
            })
        }, s.prototype.put = function(t) {
            var a = JSON.stringify(t),
                o = t.id.slice(3);
            e.ajax({
                url: "/estrela/dataentities/" + this.config.store + "/dataentities/" + this.config.entity + "/documents/" + o,
                type: "PUT",
                data: a,
                dataType: "json",
                crossDomain: !0,
                headers: this.headers,
                success: function(e) {
                    return e
                },
                error: function(t, a, o) {
                    if (t.responseText && e.parseJSON(t.responseText)) {
                        e.parseJSON(t.responseText).Message;
                        return null
                    }
                }
            })
        }, s.prototype.patch = function(t) {
            var a = JSON.stringify(t),
                o = t.id.slice(3);
            e.ajax({
                url: "/estrela/dataentities/" + this.config.store + "/dataentities/" + this.config.entity + "/documents/" + o,
                type: "PATCH",
                data: a,
                dataType: "json",
                crossDomain: !0,
                headers: this.headers,
                success: function(e) {
                    return e
                },
                error: function(t, a, o) {
                    if (t.responseText && e.parseJSON(t.responseText)) {
                        e.parseJSON(t.responseText).Message;
                        return null
                    }
                }
            })
        }, s.prototype.delete = function(t) {
            var a = t.id.slice(3);
            e.ajax({
                url: "/estrela/dataentities/" + this.config.store + "/dataentities/" + this.config.entity + "/documents/" + a,
                type: "DELETE",
                dataType: "json",
                crossDomain: !0,
                headers: this.headers,
                success: function(e) {
                    return e
                },
                error: function(t, a, o) {
                    if (t.responseText && e.parseJSON(t.responseText)) {
                        e.parseJSON(t.responseText).Message;
                        return null
                    }
                }
            })
        }, s.prototype.init = function() {
            return _that.config.appKey && (_that.headers["x-vtex-api-appKey"] = _that.config.appKey), _that.config.appToken && (_that.headers["x-vtex-api-appToken"] = _that.config.appToken), this
        }, i.masterdata = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i, s, n, r = t.PFTX.modules,
            l = r.minicart || {};
        let c, d = 0;
        l.formatMoney = function(e, t, a, o) {
            (e = e.toString()).indexOf(".") < 0 && e.indexOf(",") < 0 && (e = e.substr(0, e.length - 2) + "." + e.substr(-2));
            var i = e,
                s = (t = isNaN(t = Math.abs(t)) ? 2 : t, a = void 0 == a ? "." : a, o = void 0 == o ? "," : o, i < 0 ? "-" : ""),
                n = parseInt(i = Math.abs(+i || 0).toFixed(t)) + "",
                r = (r = n.length) > 3 ? r % 3 : 0;
            return s + (r ? n.substr(0, r) + o : "") + n.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + o) + (t ? a + Math.abs(i - n).toFixed(t).slice(2) : "")
        }, l.createElmentItem = ((e, t, a) => {
            let o = "",
                i = "R$ " + l.formatMoney(e.quantity * e.listPrice, 2, ",", "."),
                s = "R$ " + l.formatMoney(e.sellingPrice, 2, ",", "."),
                n = "";
            return o = e.listPrice > e.sellingPrice ? '<p class="de">' + i + "</p>" : e.listPrice === e.sellingPrice ? "" : '<p class="por">' + s + "</p>", a && (n = '<div class="alerta">A compra desse produto estÃ¡ limitado a <b>' + e.quantity + " unidades</b> por cliente.</div>"), '<div class="minicart-items__item" product-id="' + e.productId + '" data-id="' + e.id + '">   <div class="minicart-items__item-bloco">     <span class="minicart-items__item-bloco__imgProduto"><a href="' + e.detailUrl + '"><img src="' + e.imageUrl + '" alt="' + e.name + '" class="img-responsive"/></a></span>     <div class="minicart-items__item-bloco__informacoesProduto">        <button class="minicart-items__item-bloco__informacoesProduto-btnRemove" product-id="' + e.productId + '" data-id="' + e.id + '" data-index="' + t + '"></i></button>       <span class="minicart-items__item-bloco__informacoesProduto-contentPriceName">          <a href="' + e.detailUrl + '"><span class="minicart-items__item-bloco__informacoesProduto-nomeProduto"><b>' + e.name.replace(e.skuName, "") + e.skuName + "</b></span></a>       </span> " + n + '       <div class="minicart-items__item-bloco__informacoesProduto-blocoQtdPreco">          <div class="minicart-items__item-bloco__informacoesProduto-blocoQtdPreco__qtd">           <div class="actions"  data-item="' + t + '">             <button type="button" class="btn-qty" data-action="del" data-id="' + e.id + '">-</button>             <input type="text" maxlength="3" readonly="readonly" data-id="' + e.id + '" class="qty" value="' + e.quantity + '" />             <button type="button" class="btn-qty" data-action="add" data-id="' + e.id + '">+</button>           </div>         </div>         <div class="minicart-items__item-bloco__informacoesProduto-blocoQtdPreco__total">           <span class="minicart-items__item-bloco__informacoesProduto-price">' + o + '</span>           <span class="minicart-items__item-bloco__informacoesProduto-blocoQtdPreco__total-valor"> R$ ' + l.formatMoney(e.quantity * e.sellingPrice, 2, ",", ".") + "</span>         </div>        </div>     </div>    </div> </div>"
        }), l.criandoMinicart = function() {
            i = e("body"), 0 == e("#minicartLateral").length && (i.append('<div id="minicartLateral">   <div class="mask"></div>   <div class="minicart-info">       <div class="minicart-header">         <button class="minicart-header__btnClose"></button>         <div class="minicart-header__titulo">Carrinho</div>       </div>       <div class="minicart-items">Carregando</div>       <div class="minicart-footer">         <div class="minicart-footer__infoCheckout">           <div class="minicart-footer__infoCheckout-blocoCep">             <span class="minicart-footer__infoCheckout-blocoCep__frase">Frete</span>             <strong class="minicart-footer__infoCheckout-blocoCep__formCep-freteCalculado">R$ 0,00</strong>           </div>         </div>         <div class="minicart-footer__total">            <div class="minicart-footer__total-frase">Total</div>            <div class="minicart-footer__total-valor">R$ 0,00</div>          </div>         <div class="minicart-footer__botaoFinalizarPedido">           <a href="/checkout/#/cart">Fechar Pedido</a>         </div>         <div class="minicart-footer__botaoContinuarComprando">           <a>Continuar Comprando</a>         </div>       </div>   </div></div>'), l.tamanhoImgMinicart())
        }, l.atualizandoMinicart = ((t, a) => {
            s = e(".minicart-items"), a.totalizers.length && a.totalizers.map(function(t, o) {
                var i = "R$ " + l.formatMoney(t.value, 2, ",", ".");
                if ("Shipping" === t.id) {
                    i = t.value > 0 ? i : "GrÃ¡tis";
                    a.shippingData.address.postalCode;
                    e(".minicart-footer__infoCheckout-blocoCep__formCep-freteCalculado").text(i).show()
                }
            });
            var o = "R$" + l.formatMoney(a.value, 2, ",", ".");
            if (e(".minicart-footer__total-valor").text(o), s.html(""), a.items.length)
                for (var i = 0; i < a.items.length; i++) {
                    n = a.items[i];
                    let e = Boolean(d > a.items[0].quantity && c == i);
                    s.append(l.createElmentItem(n, i, e)).removeClass("vazio")
                } else s.html('<p class="minicart-items__vazio"> Ainda não há itens no seu carrinho :( </p>').addClass("vazio");
            l.tamanhoImgMinicart()
        }), l.trocandoQtdMinicart = function() {
            var t = e(this),
                a = t.attr("data-action"),
                o = t.parents(".actions").find(".qty");
            e(".minicart-items__item").attr("product-id");
            if (c = t.parents(".actions").attr("data-item"), "add" === a ? d = parseInt(o.val()) + 1 : "del" === a && o.val() > 1 && (d = parseInt(o.val()) - 1), 0 != d) {
                var i = {
                    index: c,
                    quantity: d
                };
                vtexjs.checkout.updateItems([i], null, !1)
            }
        }, l.abrindoMinicart = function(a) {
            a.preventDefault(), t.alert = function() {}, e("#minicartLateral").addClass("aberto"), setTimeout(vtexjs.checkout.getOrderForm, 500)
        }, l.fechandoMinicart = function(t) {
            t.preventDefault(), e("#minicartLateral").removeClass("aberto")
        }, l.clickRemovendoItemMinicart = function(t) {
            t.preventDefault(), l.removendoItemMinicart(e(this).attr("data-index"), vtexjs.checkout.orderForm), e(this).parent().remove()
        }, l.removendoItemMinicart = function(t, a) {
            if (a.items.length > 0) {
                var o = a.items[t];
                o && (o.index = t, vtexjs.checkout.removeItems([o]))
            }
            e("#modal-frete").remove()
        }, l.tamanhoImgMinicart = function() {
            e("#minicartLateral .minicart-items__item-bloco__imgProduto img").each(function(t, a) {
                var o = e(a).prop("src");
                o = o.replace("87-87", "120-120"), e(a).prop("src", o)
            })
        }, l.freteMinicart = function(t) {
            if (t.items.length > 0) {
                if (null != t.shippingData.address) {
                    var a, o, i, s = t.shippingData.logisticsInfo,
                        n = "",
                        r = {};
                    s.map(function(e, t) {
                        a = "", n = e.selectedSla, e.slas.map(function(t, o) {
                            var s = t.shippingEstimate.replace("bd", " dias Ãºteis"),
                                c = t.name,
                                d = t.deliveryChannel,
                                u = t.price,
                                m = t.tax,
                                p = t.id;
                            if ("Retirada em Loja" !== c) {
                                r[p] ? r[p] = r[p] + u : r[p] = u;
                                var f = l.formatMoney(r[p], 2, ",", "."),
                                    h = p === e.selectedSla ? "fretes__container select" : "fretes__container";
                                n === p && (i = c + ", " + s), r[p] > 0 ? a += '<li><label class="' + h + '" data-id="' + p + '" data-channel="' + d + '" data-tax="' + m + '">' + c + " - R$ " + f + " - " + s + "</label></li>" : a += '<li><label class="' + h + '" data-id="' + p + '" data-channel="' + d + '" data-tax="' + m + '">' + c + " - " + s + "</label></li>"
                            }
                        })
                    }), o = ' <div id="modal-frete">  <div class="fretes">  <span class="fretes__opcaoSelecionado"></span>   <ul class="fretes__campo">' + a + "   </ul>  </div> </div>";
                    var c = setInterval(function() {
                        !e("#modal-frete").length && a ? e(".minicart-footer__infoCheckout-blocoCep__cepCalculado").append(o).addClass("calculando") : (e(".fretes__opcaoSelecionado").text(i), clearInterval(c))
                    }, 100);
                    if ("Retirada em Loja" === n)
                        for (var d = s[0].slas, u = 0; u < 2; u++) "Retirada em Loja" !== d[u].id && l.ajaxFrete(d[u].id, d[u].deliveryChannel, d[u].tax)
                }
            } else l.freteReset()
        }, l.ajaxFrete = function(t, a, o) {
            var i = vtexjs.checkout.orderForm.orderFormId,
                s = vtexjs.checkout.orderForm.shippingData.address,
                n = [];
            vtexjs.checkout.orderForm.shippingData.logisticsInfo.map(function(e, i) {
                n.push({
                    itemIndex: e.itemIndex,
                    selectedSla: t,
                    tax: o,
                    selectedDeliveryChannel: a
                })
            });
            var r = {
                    address: s,
                    logisticsInfo: n
                },
                c = "/api/checkout/pub/orderForm/" + i + "/attachments/shippingData";
            e.ajax({
                url: c,
                type: "POST",
                data: JSON.stringify(r)
            }).done(function(e) {
                l.atualizandoMinicart(e)
            }).fail(function(e) {
                alert("error", e)
            })
        }, l.setFreteMinicart = function() {
            e(a).on("click", ".fretes__container", function(t) {
                t.preventDefault(), e(this).addClass("select"), e(this).parent("li").siblings("li").find("label").removeClass("select");
                var a = e(this).attr("data-id"),
                    o = e(this).attr("data-channel"),
                    i = e(this).attr("data-tax");
                l.ajaxFrete(a, o, i)
            })
        }, l.freteBtnMinicart = function() {
            e(a).on("click", ".minicart-footer__infoCheckout-blocoCep__formCep-calculaFrete", function(t) {
                if (t.preventDefault(), !(e(".minicart-items .minicart-items__item").length > 0)) return alert("Coloque um item no carrinho!"), !1;
                var a = {
                    postalCode: e("#cepMinicart").val(),
                    country: "BRA"
                };
                vtexjs.checkout.calculateShipping(a).done(function(t) {
                    var a = t.shippingData.logisticsInfo,
                        o = !0;
                    e(a).each(function(e, t) {
                        t.selectedSla || (o = !1)
                    }), o || alert("Por favor, coloque um CEP vÃ¡lido.")
                })
            })
        }, l.freteReset = function() {
            vtexjs.checkout.calculateShipping(), e("#modal-frete").remove(), e(".form-cep span").remove(), e(".minicart-footer__infoCheckout-blocoCep__frase, .minicart-footer__infoCheckout-blocoCep__formCep").show(), e(".minicart-footer__infoCheckout-blocoCep__formCep-freteCalculado").html("R$ 0,00"), e(".minicart-footer__infoCheckout-blocoCep__cepCalculado").removeClass("calculando")
        }, l.inputValidador = function() {
            e(a).on("keyup", '#minicartLateral input[type="text"]', function(t) {
                e(this).hasClass("cep") ? (e(this).mask("99999-999"), e(this).val().length > 8 ? (e(this).next("button").addClass("ativo"), 13 === t.keyCode && e(this).next("button").trigger("click")) : e(this).next("button").removeClass("ativo")) : e(this).val().length > 1 ? (e(this).next("button").addClass("ativo"), 13 === t.keyCode && e(this).next("button").trigger("click")) : e(this).next("button").removeClass("ativo")
            })
        }, l.eventosMinicart = function(o) {
            e(a).on("click", ".minicart-items__item-bloco__informacoesProduto-btnRemove", l.clickRemovendoItemMinicart), e(a).on("click", ".minicart-header__btnClose, #minicartLateral .minicart-footer__botaoContinuarComprando a, #minicartLateral .mask", l.fechandoMinicart), l.inputValidador(), e(t).on("orderFormUpdated.vtex", l.atualizandoMinicart), e(a).on("click", ".btn-qty", l.trocandoQtdMinicart), e(a).on("click", ".fretes", function(t) {
                e(this).toggleClass("ativo")
            })
        }, l.init = function() {
            l.criandoMinicart(), l.freteBtnMinicart(), l.eventosMinicart()
        }, r.minicart = l
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.modal = {}, PFTX.modules.modal.construct = function() {
            0 === e(".modal_wrapper").length && e("body").append('<div class="modal_wrapper"><div class="modal_body"><div class="modal__content"></div></div></div>')
        }, PFTX.modules.modal.close = function() {
            var t = e(".modal_wrapper");
            e(t).fadeOut("slow", function() {
                e(t).find(".modal_body").attr("class", "modal_body"), e(t).find(".modal__content").html("")
            }), e("#overlay").fadeOut("fast"), e("html").removeClass("modal-is-open")
        }, PFTX.modules.modal.closeEvent = function(t) {
            if (!t.length) return !1;
            e.each(t, function(t, a) {
                e(a).off("click").on("click", function() {
                    PFTX.modules.modal.close()
                })
            })
        }, PFTX.modules.modal.actions = function() {
            e(".modal_wrapper").on("click", function() {
                PFTX.modules.modal.close()
            }), e(".modal_body").on("click", function(e) {
                e.stopPropagation()
            }), e(a).keyup(function(t) {
                27 == t.keyCode && e("html").hasClass("modal-is-open") && PFTX.modules.modal.close()
            })
        }, PFTX.modules.modal.show = function(t, a) {
            e("#overlay").fadeIn(), e("html").addClass("modal-is-open");
            var o = e(".modal_wrapper");
            a ? o.find(".modal_body").addClass(a).find(".modal__content").empty().append(t) : o.find(".modal__content").empty().append(t), o.fadeIn("fast")
        }, PFTX.modules.modal.init = function() {
            PFTX.modules.modal.construct(), PFTX.modules.modal.actions()
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.navAllDepartments = {}, PFTX.modules.navAllDepartments.$target = "", PFTX.modules.navAllDepartments.bindEvents = function() {
            PFTX.modules.navAllDepartments.$target.live("click", PFTX.modules.navAllDepartments.toggle)
        }, PFTX.modules.navAllDepartments.toggle = function() {
            PFTX.modules.navAllDepartments.$target.hasClass("active") ? PFTX.modules.navAllDepartments.$target.removeClass("active") : PFTX.modules.navAllDepartments.$target.addClass("active")
        }, PFTX.modules.navAllDepartments.init = function(e) {
            PFTX.modules.navAllDepartments.$target = e, PFTX.modules.navAllDepartments.bindEvents()
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.removeEmpty = function(t, a) {
            e(t).each(function() {
                0 == e(this).text() ? a ? e(this).parents(a).hide() : e(this).hide() : a ? e(this).parents(a).show() : e(this).show()
            })
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.similarProducts = {
            fieldId: "344",
            fieldClass: "product_field_",
            similarClassChecked: "similar-checked",
            similarClassActive: "similar-active",
            similarClassUnavaliable: "similar-inactive"
        }, PFTX.modules.similarProducts.searchAvaliableProducts = function(e, t) {
            for (var a = e.length - 1; a >= 0; a--) e.eq(a).addClass(PFTX.modules.similarProducts.similarClassChecked), e.eq(a).find("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId).length > 0 ? t(e.eq(a), PFTX.modules.similarProducts.makeSimilarShelf) : e.eq(a).addClass(PFTX.modules.similarProducts.similarClassUnavaliable).remove("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId)
        }, PFTX.modules.similarProducts.checkifAvaliable = function(e, t) {
            var a = e.find(".product-especification-code li").html();
            try {
                t(e, JSON.parse(a))
            } catch (t) {
                e.addClass(PFTX.modules.similarProducts.similarClassUnavaliable).remove("." + PFTX.modules.similarProducts.fieldClass + PFTX.modules.similarProducts.fieldId)
            }
        }, PFTX.modules.similarProducts.makeSimilarShelf = function(e, t) {
            for (var a = "", o = "", i = "", s = "", n = t.length - 1; n >= 0; n--) t[n].link && t[n].foto && t[n].nome && t[n].thumb && (a += '<span style="display: none;">' + t[n].link + "/p</span>", o += '<img src="/arquivos/ids/' + t[n].foto + '-220-290" width="220" height="290" alt"" style="display: none;" />', i += '<div style="display: none;">' + t[n].nome + "</div>", s += '<li><img src="/arquivos/ids/' + t[n].thumb + '-12-12" width="12" height="12" alt"" /></li>');
            e.find(".colors ul").append(s).find("li").eq(0).addClass("active"), e.find(".collection-image-link").append(o), e.find(".collection-links").append(a), e.find(".collection-name").append(i), e.addClass(PFTX.modules.similarProducts.similarClassActive), PFTX.modules.similarProducts.bindEvents()
        }, PFTX.modules.similarProducts.bindEvents = function() {
            e("." + PFTX.modules.similarProducts.similarClassActive).find(".colors li").live("mouseover", function() {
                var t = e(this).index(),
                    a = e(this).parent().parent().parent().parent();
                a.find(".colors ul").find("li").removeClass("active").eq(t).addClass("active"), a.find(".collection-image-link").find("img").hide().eq(t).show(), a.attr("href", a.find(".collection-links").find("span").hide().eq(t).html()), a.attr("title", a.find(".collection-name").find("div").eq(t).html()), a.find(".collection-name").find("div").hide().eq(t).show()
            })
        }, PFTX.modules.similarProducts.init = function(e) {
            PFTX.modules.similarProducts.searchAvaliableProducts(e, this.checkifAvaliable)
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i, s, n = PFTX.modules;

        function r(t) {
            this.config = {
                target: "#pftx-slider",
                dots: !0,
                arrows: !0
            }, e.extend(this.config, t)
        }
        var l = {};
        r.prototype.bindEvents = function() {
            var t = this;
            e(t.config.target).on("swr", function() {
                r.prototype.prevImg(t)
            }), e(t.config.target).on("swl", function() {
                r.prototype.nextImg(t)
            }), e(t.config.target).on("click", ".arrow-r", function() {
                r.prototype.nextImg(t)
            }).on("click", ".arrow-l", function() {
                r.prototype.prevImg(t)
            }), e(".dimension-Cor").on("click", function() {
                var a = e(this).text();
                t.request(l[a]), e(t.config.target).html(""), t.prepare()
            })
        }, r.prototype.prepare = function() {
            this.config.arrows && e(this.config.target).append('<span class="arrow arrow-l"></span><span class="arrow arrow-r"></span>'), this.config.dots && e(this.config.target).append('<span class="dots"></span>');
            for (var t = 0; t < skuJson_0.skus.length; t++) l[skuJson_0.skus[t].values[0]] = skuJson_0.skus[t].sku
        }, r.prototype.request = function(t) {
            var a = this;
            if (void 0 == t) t = skuJson_0.skus[0].sku;
            e.ajax({
                url: "/produto/sku/" + t,
                type: "GET",
                dataType: "json",
                success: function(e) {
                    i = e[0].Images, s = e[0].Name, a.montaSlider()
                }
            })
        }, r.prototype.montaSlider = function() {
            if (this.config.dots)
                for (var t = e(this.config.target).find(".dots"), a = 0; a < i.length; a++) 0 == a ? t.append('<i class="dot-item active"></i>') : t.append('<i class="dot-item"></i>');
            e(this.config.target).append('<ul class="slider-images"></ul>');
            var o = e(this.config.target).find(".slider-images"),
                n = e(this.config.target).width();
            o.css("width", 100 * i.length + "%");
            for (a = 0; a < i.length; a++) 0 == a ? o.append('<li class="slider-images__item active" style="width:' + n + 'px"><img src="' + i[a][0].Path + '" alt="' + s + '" data-image="' + a + '"/></li>') : o.append('<li class="slider-images__item" style="width:' + n + 'px"><img src="' + i[a][0].Path + '" alt="' + s + '" data-image="' + a + '"/></li>')
        }, r.prototype.nextImg = function(t) {
            var a = e(".slider-images__item.active").width();
            e(".slider-images__item.active").index() + 1 != i.length && (e(".slider-images__item.active").animate({
                "margin-left": -a
            }).removeClass("active").next().addClass("active"), e(t.config.target).find(".dot-item.active").removeClass("active").next().addClass("active"))
        }, r.prototype.prevImg = function(t) {
            e(".slider-images__item.active").width();
            0 != e(".slider-images__item.active").index() && (e(".slider-images__item.active").removeClass("active").prev().addClass("active").animate({
                "margin-left": 0
            }), e(t.config.target).find(".dot-item.active").removeClass("active").prev().addClass("active"))
        }, r.prototype.init = function() {
            this.prepare(), this.request(), this.bindEvents()
        }, n.slider = r
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                target: ".header__minicart",
                cartTitle: "Sua Sacola",
                payments: 7,
                btnGoToCheckout: !0
            }, e.extend(this.config, t)
        }
        s.prototype.bindEvents = function() {
            this.buildCart();
            e(this.config.target).on("click", ".smartCart__item--remove", function(t) {
                t.preventDefault();
                var a = this;
                vtexjs.checkout.getOrderForm().then(function(t) {
                    var o = t.items[0];
                    return o.index = e(a).data("index"), vtexjs.checkout.removeItems([o])
                }).done(function(t) {
                    e(".smartCart").remove()
                })
            })
        }, s.prototype.buildCart = function() {
            var t = vtexjs.checkout.orderForm.items;
            if (0 == t.length) e(this.config.target).append('<div class="smartCart cart-empty"><div class="smartCart__close"></div><p class="smartCart__message">Sua sacola estÃ¡ vazia</p></div>');
            else {
                var a, o, i = '<div class="smartCart">';
                i += '<a href="#" class="smartCart__close"></a>', i += '<h4 class="smartCart__title">' + this.config.cartTitle + "</h4>", i += '<ul class="smartCart__list">';
                for (var s = 0; s < t.length; s++) a = t[s].imageUrl, o = t[s].name, i += '<li class="smartCart__item"><a class="smartCart__item--link" href="' + t[s].detailUrl + '" title="' + o + '">', i += '<figure class="smartCart__item--image"><img src="' + a + '" alt="' + o + '" /></figure>', i += '<span class="smartCart__item--info">', i += '<span class="smartCart__item--name">' + o + "</span>", i += '<span class="smartCart__item--price">' + t[s].formattedPrice + "</span>", i += '<span class="smartCart__item--quantity">' + t[s].quantity + "</span>", i += '<span class="smartCart__item--action"><span href="#" class="smartCart__item--remove" data-index="' + s + '">Remover</span></span>', i += "</span>", i += "</a></li>";
                i += "</ul>", i += '<div class="smartCart__footer">', i += '<ul class="smartCart__footer--payments">';
                for (s = 0; s < this.config.payments; s++) i += '<li class="smartCart__footer--payment"></li>';
                i += "</ul>";
                var n = vtexjs.checkout.orderForm.value.toString();
                i += '<span class="smartCart__footer--total">Subtotal: <strong>' + (n = "R$ " + n.slice(0, -2) + "," + n.slice(-2)) + "</strong></span>", i += "</div>", this.config.btnGoToCheckout && (i += '<a href="/checkout/#/cart" class="smartCart__goToCheckout" title="Checkout">Fechar Pedido</a>'), i += "</div>", e(this.config.target).append(i)
            }
        }, s.prototype.init = function() {
            this.bindEvents()
        }, i.smartCart = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.modules;

        function s(t) {
            this.config = {
                onStable: function() {},
                onProduction: function() {}
            }, e.extend(this.config, t)
        }
        s.prototype.bindEvents = function() {
            t.location.href.indexOf("vtex") > -1 ? this.config.onStable() : this.config.onProduction()
        }, s.prototype.init = function() {
            this.bindEvents()
        }, i.stableMode = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.tabs = function(t, a, o, i, s) {
            var n = e(t).find(a),
                r = e(t).find(o);
            r.each(function() {
                var t = e(this).index();
                0 === e(this).text().length && (e(this).hide(), n.eq(t).hide())
            }), e(t).live("click", a, function(t) {
                if (e(t.target).hasClass(a.replace(".", ""))) {
                    n.removeClass(i), r.removeClass(i);
                    var o = e(t.target).index();
                    e(t.target).addClass(i), r.eq(o).addClass(i)
                }
            })
        }
    }(jQuery, window, document),
    function(e) {
        var t = function(e, t) {
                var a = document.createEvent("CustomEvent");
                return a.initCustomEvent(t, !0, !0, e.target), e.target.dispatchEvent(a), a = null, !1
            },
            a = !0,
            o = {
                x: 0,
                y: 0
            },
            i = {
                x: 0,
                y: 0
            },
            s = {
                touchstart: function(e) {
                    o = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchmove: function(e) {
                    a = !1, i = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchend: function(e) {
                    if (a) t(e, "fc");
                    else {
                        var s = i.x - o.x,
                            n = Math.abs(s),
                            r = i.y - o.y,
                            l = Math.abs(r);
                        Math.max(n, l) > 20 && t(e, n > l ? s < 0 ? "swl" : "swr" : r < 0 ? "swu" : "swd")
                    }
                    a = !0
                },
                touchcancel: function(e) {
                    a = !1
                }
            };
        for (var n in s) e.addEventListener(n, s[n], !1)
    }(document),
    function(e, t, a, o) {
        "use strict";
        PFTX.modules.user = {}, PFTX.modules.user.isLogged = function() {
            return !e(".welcome").find("#login").length
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("account");
        s.DOMReady = function() {
            e("link").each(function() {
                e(this).attr("href").indexOf("bootstrap") >= 0 && e(this).remove()
            })
        }, s.ajaxStop = function() {}, i.account = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.catalog = new PFTX.constructor.page("catalog"), PFTX.pages.catalog.smartResearch = function() {
            e(".filterOptions input[type='checkbox']").vtexSmartResearch({
                ajaxCallback: function() {
                    e("li.helperComplement").remove()
                }
            });
            e('<div class="wrapperfilterSelected"><div class="filtersSelected"></div><span class="btnclearfilter">Limpar Filtros<span></div>').appendTo(".navigation-tabs .menu-departamento > div"), e(".search-multiple-navigator fieldset input:checkbox").change(function() {
                if (e(this).is(":checked")) {
                    var t = e(this).parent("label").text().split("(")[0];
                    a = (a = e(this).parent("label").attr("class")).replace(" sr_selected", ""), e('<div class="filter ' + a + '" data-class="' + a + '">' + t + "</div>").appendTo(".filtersSelected").show("slow"), e(".filter").on("click", function() {
                        var t = e(this).text();
                        e(this).remove(), e("fieldset label.sr_selected input").each(function() {
                            var a = e(this).parent("label.sr_selected").text();
                            e(this).is(":checked") && a === t && e(this).trigger("click")
                        })
                    })
                } else {
                    var a;
                    t = e(this).parent("label").text();
                    a = (a = e(this).parent("label").attr("class")).replace(" sr_selected", ""), e(".filter." + a).remove()
                }
                e(".filtersSelected .filter").length > 0 ? e(".btnclearfilter").addClass("active").fadeIn("slow") : e(".btnclearfilter").fadeOut("slow").css("display: none;").removeClass("active"), e(".btnclearfilter").on("click", function() {
                    e("fieldset label.sr_selected").each(function() {
                        e(this).trigger("click"), e(".filter").remove()
                    })
                })
            })
        }, PFTX.pages.catalog.buscaVazia = function() {
            var a = e(".search-result"),
                o = e(".busca-vazio");
            if (a[0]) {
                t.location.toString().split("/")[3].split("?")[0];
                if (o[0]) a.addClass("no-result"), e(".busca-vazio").append("<ul><li>Tente palavras menos especÃ­ficas.</li><li>Digite pelo menos quatro caracteres no campo de busca.</li><li>Use os menus do site para navegar pelos departamentos de produtos</ul>"), e(".navSidebar").remove();
                else {
                    e(".resultado-busca-termo:eq(0)").find(".value").text();
                    a.addClass("resultado-encontrado")
                }
            }
        }, PFTX.pages.catalog.bannerCatalog = function() {
            var t = e(".bannerDepart .box-banner img").attr("src");
            e(".bannerDepart").css({
                background: "url(" + t + ") no-repeat",
                "background-size": "contain"
            })
        }, PFTX.pages.catalog.searchWord = function() {
            var t = e(".resultado-busca-termo:eq(0)").find("strong").text();
            e(".bannerDepart .titulo-sessao").html("<em>VocÃª buscou por:</em> " + t)
        }, PFTX.pages.catalog.orderby = function() {
            var t = e(".sub").html();
            e(".wrapperfilterSelected").before(t), e(".orderBy").after('<div class="boxGrid"><span class="list"></span><span class="block"></span></div>'), setTimeout(function() {
                e(".helperComplement").remove()
            }, 1e3), e(".boxGrid span.block").on("click", function(t) {
                t.preventDefault(), e(".boxGrid").addClass("activeColor"), e(".shelf.productList.n5colunas").addClass("activeGrid"), PFTX.pages.catalog.removeUl()
            }), e(".boxGrid span.list").on("click", function(t) {
                t.preventDefault(), e(".boxGrid").removeClass("activeColor"), e(".shelf.productList.n5colunas").removeClass("activeGrid")
            })
        }, PFTX.pages.catalog.removeUl = function() {
            e(".productList ul").each(function(t, a) {
                var o = e(this).html();
                e(this).parent().append(o), e(this).remove()
            })
        }, PFTX.pages.catalog.adjustCatalogNav = function() {
            e("body").hasClass("teste-dep") && e(".menu-navegue").parent().addClass("search-nav-container")
        }, PFTX.pages.catalog.changeTitles = function() {
            if (e("body").hasClass("teste-dep")) {
                e(".search-single-navigator h4").replaceWith(function() {
                    return e("<h2/>", {
                        class: "categ-item",
                        html: this.innerHTML
                    })
                });
                var t = e(".categ-item");
                t[t.length - 1].classList.add("last-item-categ")
            }
        }, PFTX.pages.catalog.removeNumbersSingleNavigator = function() {
            e("body").hasClass("teste-dep") && e(".categ-item a").each(function(e, t) {
                t.text;
                t.text = t.title
            })
        }, PFTX.pages.catalog.changeColorCategory = function() {
            if (e("body").hasClass("teste-dep")) switch (dataLayer[0].pageDepartment) {
                case "Classicos":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#5ABBBB");
                    break;
                case "Jogos":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#80AC38");
                    break;
                case "Bonecas":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#E74745");
                    break;
                case "Super Massa":
                case "Livros Infantis":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#FFC01E");
                    break;
                case "Bonecos":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#2E511E");
                    break;
                case "Faz de Verdade":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#F2841E");
                    break;
                case "Estrela Baby":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#B7CE0D");
                    break;
                case "Carrinhos":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#8B0000");
                    break;
                case "Pelucias":
                case "Pelucias":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#7D1996");
                    break;
                case "Brinquedos Promocao":
                    e("body.catalog.teste-dep .categ-item a").css("background", "#000000"), e("body.catalog.teste-dep .categ-item a").css("color", "#FFC01E")
            }
        }, PFTX.pages.catalog.DOMReady = function() {
            PFTX.pages.catalog.adjustCatalogNav(), PFTX.pages.catalog.changeTitles(), PFTX.pages.catalog.removeNumbersSingleNavigator(), PFTX.pages.catalog.changeColorCategory(), PFTX.pages.catalog.smartResearch(), PFTX.pages.catalog.orderby(), PFTX.pages.catalog.bannerCatalog(), e(".pages .page-number, .pages .previous, .pages .next").on("click", function() {
                setTimeout(function() {
                    e(".helperComplement").remove()
                }, 5e3)
            }), e("body").hasClass("resultado-busca") && catalog.searchWord(), e("body").hasClass("searchEmpty") && catalog.buscaVazia()
        }, PFTX.pages.catalog.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("categoria");
        s.DOMReady = function() {}, s.ajaxStop = function() {}, i.category = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.common = new PFTX.constructor.page("common"), PFTX.pages.common.fullSlider = function(t, a) {
            e(".fullGallery .box-banner").each(function() {
                var t = e(this).find("img").attr("src").replace(/ /gi, "_");
                e(this).find("a").attr("style", "background:url(" + t + ") no-repeat center;"), e(this).find("img").remove()
            }), e(".mainGallery").slick({
                dots: t,
                arrows: a,
                pauseOnHover: !1,
                autoplay: !0,
                autoplaySpeed: 4e3,
                slidesToShow: 1,
                slidesToScroll: 1
            })
        }, PFTX.pages.common.fullSliderTabs = function(t, a) {
            var o = [];
            e(".fullGallery .box-banner").each(function() {
                var t = e(this).find("img").attr("src");
                if (e(this).find("a").attr("style", "background:url(" + t + ") no-repeat center;"), !e(this).hasClass("slick-cloned")) {
                    var a = e(this).find("img").attr("alt");
                    o.push(a)
                }
                e(this).find("img").remove()
            }), e(".mainGallery").slick({
                dots: t,
                arrows: a,
                pauseOnHover: !1,
                autoplay: !0,
                autoplaySpeed: 4e3
            }), e(".mainGallery .slick-dots li").each(function(t) {
                e(this).find("button").text(o[t])
            })
        }, PFTX.pages.common.singleSlider = function(t, a) {
            e(".mainGallery").slick({
                dots: t,
                arrows: a,
                pauseOnHover: !1,
                autoplay: !0,
                autoplaySpeed: 4e3
            })
        }, PFTX.pages.common.shelfSlider = function(t, a, o, i) {
            e(".shelfCarousel").each(function() {
                e(this).find("ul").slick({
                    dots: t,
                    arrows: a,
                    slidesToShow: o,
                    slidesToScroll: i,
                    pauseOnHover: !1,
                    autoplay: !1,
                    autoplaySpeed: 4e3
                })
            })
        }, PFTX.pages.common.multipleSlider = function(t, a, o) {
            e(".multipleSlider, .featuredProducts .shelf").find("ul").slick({
                infinite: !0,
                slidesToShow: t,
                slidesToScroll: a,
                speed: 500,
                vertical: o
            })
        }, PFTX.pages.common.LitsShelfChecked = function() {
            e(".insert-sku-checkbox").change(function() {
                e(".giftlist-insertsku-popup").toggleClass("active")
            })
        }, PFTX.pages.common.floatHeader = function() {
            e(".floatHeader"), e(".pageHeader .logo .logoImg"), e(".pageHeader .searchBox .busca"), e(".pageHeader .miniCart");
            var a = e(".pageHeader").height();
            e(t).bind("scroll", function() {
                e(this).scrollTop() > 100 ? (e(".pageHeader").addClass("floatHeader"), e("#menu-primary").css("position", "fixed"), e("body").css("margin-top", a)) : (e(".pageHeader").removeClass("floatHeader"), e("#menu-primary").css("position", "absolute"), e("body").css("margin-top", "0"))
            })
        }, PFTX.pages.common.menu = function() {
            var t, a;

            function o(e) {
                e.fadeOut(10)
            }
            e(".menu-departamento ul").each(function() {
                e(this).find("li").length || e(this).remove()
            }), e(function() {
                e(".pageNav .menu-departamento h3").hover(function() {
                    t = e(this).next("ul"), y = e(this).position().left, t.css("left", y), t.is(":visible") || o(e(".pageNav .menu-departamento ul:visible")), clearTimeout(a), t.fadeIn()
                }, function() {
                    a = setTimeout(function() {
                        o(t)
                    }, 10)
                }), e(".pageNav .menu-departamento ul").hover(function() {
                    t = e(this), clearTimeout(a)
                }, function() {
                    a = setTimeout(function() {
                        o(t)
                    }, 10)
                }), e(".pageNav .menu-departamento ul").mouseover(function() {
                    e(this).prev("h3").addClass("active")
                }), e(".pageNav .menu-departamento ul").mouseout(function() {
                    e(this).prev("h3").removeClass("active")
                })
            }), e(".pagenav .menu__wrapper").mouseover(function() {
                e(this).find(".submenu__wrapper").addClass("open-submenu")
            }), e(".pagenav .menu__wrapper").mouseout(function() {
                e(this).find(".submenu__wrapper").removeClass("open-submenu")
            })
        }, PFTX.pages.common.newsFooter = function() {
            e(".newsletter__form").submit(function(t) {
                t.preventDefault();
                var a = e(this).find("input[name=name]").val(),
                    o = e(this).find("input[name=email]").val(),
                    i = {
                        name: a,
                        email: o
                    };
                "" != a && "" != o && e.ajax({
                    async: !0,
                    url: "/estrela/dataentities/NW/documents/",
                    type: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(i),
                    success: function() {
                        e("<div class='msgSuccess'>Cadastrado com sucesso!</div>").insertAfter(".newsletter__form")
                    },
                    error: function() {
                        e("<div class='msgErro'>Desculpe, ocorreu algum erro !</div>").insertAfter(".newsletter__form")
                    }
                })
            })
        }, PFTX.pages.common.newsletter = function() {
            if (!e.cookie("newsletter")) {
                var t = e(".newsLightbox");
                e('<div class="lightboxOverlay"></div>').appendTo("body"), e('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>').appendTo(".lightboxOverlay"), PFTX.pages.common.lightbox(t), e(".lightboxClose").click(function(t) {
                    t.preventDefault(), e(".lightboxOverlay").fadeOut(500, function() {
                        e(this).remove()
                    }), e.cookie("newsletter", "ok", {
                        path: "/",
                        expires: 10
                    })
                })
            }
            "ok" == e.cookie("newsletter") && e(".newsLightbox").remove(), e(a).ajaxStop(function() {
                e.cookie("newsletter", "ok", {
                    path: "/",
                    expires: 10
                }), e(".newsLightbox fieldset").hasClass("success")
            }), PFTX.pages.common.isMobile()
        }, PFTX.pages.common.isMobile = function() {
            -1 != navigator.userAgent.toLowerCase().search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) && e(".lightboxOverlay").remove()
        }, PFTX.pages.common.lightbox = function(a) {
            e(a).appendTo(".lightboxInner");
            var o = e(t).height(),
                i = e(t).width(),
                s = e(a).outerWidth(),
                n = e(a).outerHeight(),
                r = .8 * i,
                l = .8 * o;
            if (s > r) var c = r;
            else c = s;
            if (n > l) var d = l;
            else d = n;
            e(".lightboxOverlay").css({
                position: "fixed",
                top: "0",
                left: "0",
                "background-color": "rgba(0,0,0,0.6)",
                height: "100%",
                width: "100%",
                "z-index": "5005"
            }), e(".lightboxOverlay").addClass("open"), e(".lightboxBlock").css("position", "fixed"), e(".lightboxBlock").css("top", Math.max(0, (o - d) / 2) + "px"), e(".lightboxBlock").css("left", Math.max(0, (i - c) / 2 + e(t).scrollLeft()) + "px"), e(".lightboxInner").css({
                "max-height": d,
                "max-width": c
            }), e(".lightboxClose").click(function() {
                e(".lightboxOverlay").removeClass("open"), e(".lightboxInner").empty()
            }), e(".lightboxOverlayInner").click(function() {
                e(".lightboxOverlay").removeClass("open"), e(".lightboxInner").empty()
            })
        }, PFTX.pages.common.diferentalHeader = function() {
            e(".differental-header").slick({
                dots: !1,
                arrows: !1,
                infinite: !1,
                speed: 3e3,
                pauseOnHover: !1,
                autoplay: !0,
                slidesToShow: 3,
                infinite: !0,
                centerMode: !0,
                centerPadding: "100px",
                variableWidth: !0,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        }, PFTX.pages.common.tabsNew = function() {
            e(a).ready(function() {
                e(".tabs-menu a").click(function(t) {
                    t.preventDefault(), e(this).parent().addClass("current"), e(this).parent().siblings().removeClass("current");
                    var a = e(this).attr("href");
                    e(".tab-content").not(a).css("display", "none"), e(a).fadeIn(), e(".tab-content .shelf").find("ul").slick("unslick"), e(".tab-content ul").slick({
                        dots: !1,
                        arrows: !0,
                        infinite: !1,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        }, {
                            breakpoint: 640,
                            settings: {
                                slidesToShow: 2
                            }
                        }]
                    })
                }), e(".tabs-menu a:first").trigger("click")
            })
        }, PFTX.pages.common.visitorLogin = function() {
            e(t).on("orderFormUpdated.vtex", function(t, a) {
                var o = a.loggedIn;
                sessionStorage.setItem("logado", o), 1 == o && e(".loginMensage .logado").css("display", "block")
            })
        }, PFTX.pages.common.menuTablet = function() {
            e(".contentMenuTablet").on("click", function() {
                e(this).toggleClass("active"), e("#menu-primary").hasClass("active") ? (e("#menu-primary").fadeOut(), e("#menu-primary").removeClass("active")) : (e("#menu-primary").fadeIn(), e("#menu-primary").addClass("active"))
            })
        }, PFTX.pages.common.shareWindow = function(a, o) {
            var i = "https://www.facebook.com/sharer/sharer.php?u=" + a,
                s = "https://twitter.com/home?status=" + a,
                n = "https://pinterest.com/pin/create/button/?url=" + a + "&media=" + o,
                r = "https://plus.google.com/share?url=" + a;
            e(".shareProduct .facebook").attr("href", i), e(".shareProduct .twitter").attr("href", s), e(".shareProduct .pinterest").attr("href", n), e(".shareProduct .gmail").attr("href", r), e(".shareProduct a").on("click", function() {
                return newwindow = t.open(e(this).attr("href"), "", "height=400,width=400"), t.focus && newwindow.focus(), !1
            })
        }, PFTX.pages.common.eventTracking = function() {
            var e;
            e = function(e) {
                var t, a, o, i, s;
                if ("a" == (t = jQuery(this))[0].nodeName.toLowerCase() && /(\?|\&)event-category=.+/.test(t.attr("href"))) {
                    var n = t.attr("href"),
                        r = /(?:\?|\&)event-category=([a-z0-9_ -]+)/gi.exec(n),
                        l = /(?:\?|\&)event-action=([a-z0-9_ -]+)/gi.exec(n),
                        c = /(?:\?|\&)event-label=([a-z0-9_ -]+)/gi.exec(n),
                        d = /(?:\?|\&)event-bind=([a-z0-9_ -]+)/gi.exec(n);
                    a = null == r ? null : r[1], o = null == l ? null : l[1], i = null == c ? null : c[1], s = null == d ? null : d[1]
                } else a = t.data("event-category"), o = t.data("event-action"), i = t.data("event-label"), s = t.data("event-bind");
                if (void 0 !== a && null != a && /\S/g.test(a)) {
                    if (void 0 === o || null == o) {
                        var u = t.attr("title"),
                            m = t.text();
                        if (void 0 === (o = "string" == typeof u ? u : m) || null == o || 0 === o.length) return
                    }
                    void 0 === i && (i = null), void 0 !== s && null != s || (s = "mousedown"), t.on(s, function(e) {
                        dataLayer.push({
                            event: "GAEvent",
                            eventCategory: a,
                            eventAction: o,
                            eventLabel: i
                        })
                    })
                }
            }, jQuery("[data-event-category]").each(e), t.setTimeout(function() {
                jQuery("a[href*=event-category]").each(e)
            }, 500)
        }, PFTX.pages.common.isValidEmail = function(e) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)
        }, PFTX.pages.common.modalNewsletter = function() {
            setTimeout(function() {
                e.cookie("newsletter") || e(".modal-container, #overlay-modal").fadeIn("slow")
            }, 5e3), e(".modal-container__content--option").on("click", function() {
                e(this).addClass("selecionado").siblings().removeClass("selecionado")
            }), e(".modal-container__header--close").on("click", function() {
                e(".modal-container, #overlay-modal").fadeOut("slow"), e.cookie("newsletter", "ok", {
                    path: "/",
                    expires: 3
                })
            }), e(".modal-container__back--btn-home").on("click", function(t) {
                t.preventDefault(), e(".modal-container, #overlay-modal").fadeOut("slow"), e.cookie("newsletter", "ok", {
                    path: "/",
                    expires: 3
                })
            }), e("#email").after('<p class="error-email">Por favor, insira um e-mail vÃ¡lido.</p>'), e("#nome").after('<p class="error-nome">Por favor, insira seu nome.</p>'), e(a).ready(function() {
                var t, a, i;
                e("input[name=name]").keyup(function(a) {
                    t = e(this).val(), e(".error-nome").css("display", "none"), e(this).removeClass("error")
                }), e("input[name=email]").keyup(function(t) {
                    null != e(this).val().match(/^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/) && (a = e(this).val()), e(".error-email").css("display", "none"), e(this).removeClass("error")
                }), e(".modal-container__content--option").on("click", function(t) {
                    i = e(this).text(), e(".modal-container__content--text.error").css("display", "none")
                }), e(".modal-container__content--btn-cadastrar").live("click", function(s) {
                    s.preventDefault();
                    var n = {};
                    n.name = t, n.email = a, n.tipo = i;
                    var r = !0,
                        l = 0;
                    e(this).parent().find("input").each(function() {
                        var t = e(this);
                        "" == t.val() ? r = !1 : "email" == t.attr("id") ? PFTX.pages.common.isValidEmail(t.val()) || (r = !1) : i === o && (r = !1), 0 == r && (t.addClass("error"), e("#email").hasClass("error") ? e(".error-email").css("display", "block") : e(".error-email").css("display", "none"), e("#nome").hasClass("error") ? e(".error-nome").css("display", "block") : e(".error-nome").css("display", "none")), r ? t.on("focus", function() {
                            e(this).removeClass("error")
                        }) : (t.addClass("error"), 0 == l && e(this).focus(), l++, e("#email").hasClass("error") ? e(".error-email").css("display", "block") : e(".error-email").css("display", "none"), e("#nome").hasClass("error") ? e(".error-nome").css("display", "block") : e(".error-nome").css("display", "none"), i === o ? e(".modal-container__content--text.error").css("display", "block") : e(".modal-container__content--text.error").css("display", "none"), e(".modal-container").hasClass("shake") || e(".modal-container").addClass("shake"))
                    }), l > 0 ? (e(".modal-container").removeClass("shake"), setTimeout(function() {
                        e(".modal-container").addClass("shake")
                    }, 25)) : e.ajax({
                        async: !0,
                        url: "/estrela/dataentities/NW/documents/",
                        type: "PATCH",
                        contentType: "application/json",
                        data: JSON.stringify(n),
                        success: function() {
                            PFTX.modules.cookie.set("newsletter", "ok", {
                                path: "/",
                                expires: 3
                            }), e(".modal-container").removeClass("shake"), e(".modal-container").addClass("sucess"), e(".modal-container__content").hide(), e(".modal-container__back").fadeIn()
                        },
                        error: function() {
                            alert("Não foi possí­vel realizar seu cadastro, tente mais tarde.")
                        }
                    })
                })
            })
        }, PFTX.pages.common.btnScroll = function() {
            var a = ['<div class="voltar-topo">', "<span></span>", "</div>"].join(" ");
            e("body").append(a);
            var o = e(t),
                i = o.height(),
                s = e(".voltar-topo"),
                n = e("html,body");
            o.bind("resize", function() {
                i = o.height()
            }), o.bind("scroll", function() {
                o.scrollTop() > i ? s.stop(!0).fadeTo(300, 1, function() {
                    s.show()
                }) : s.stop(!0).fadeTo(300, 0, function() {
                    s.hide()
                })
            }), s.bind("click", function() {
                return n.animate({
                    scrollTop: 0
                }, "slow"), !1
            })
        }, PFTX.pages.common.flagPreVendaJogos = function() {
            "?validacaoTeste" === t.location.search && e("body").addClass("nao-pode-rir-flag"), e("body").hasClass("nao-pode-rir-flag") && e(".shelf li").each(function() {
                e(this).find(".flags p").hasClass("tapa-certo") && e(this).find(".flags p.tapa-certo").addClass("pre-venda-jogo-nao-pode-rir")
            })
        }, PFTX.pages.common.layoutBlackFriday = function() {
            t.location.search.indexOf("devtrue") > -1 && e("body").addClass("bf2018")
        }, PFTX.pages.common.FiltroPreco = function() {
            e(".bf2018-hot .filtro_preco label").each(function(a, o) {
                e(this).on("click", function(e) {
                    e.preventDefault();
                    var a = o.dataset.filtropreco;
                    t.location.search.indexOf("?lid") > -1 ? t.location = t.location.pathname + t.location.search + "&" + a : t.location = t.location.pathname + "?" + a
                })
            })
        }, PFTX.pages.common.filtroOrdenacao = function() {
            e(".bf2018-hot .filtro-odernacao").on("change", function() {
                var a = e(this).val();
                t.location = t.location.pathname + "?O=" + a
            })
        }, PFTX.pages.common.departamentoBlackFriday = function() {
            var t = setInterval(function() {
                "Ofertas Black Friday" == dataLayer[0].departmentName && e(".search-single-navigator").length > 0 && (e(".search-single-navigator .categ-item a").css("background", "#000"), e(".search-single-navigator .categ-item a").each(function(e, t) {
                    var a = t.text.match(/\d+/gi) + "%";
                    t.text = t.text.replace("ate", "AtÃ©"), t.text = t.text.replace(/\d+/gi, a)
                })), clearInterval(t)
            }, 500)
        }, PFTX.pages.common.redirectBusca = function() {
            e([{
                url: "/central-de-atendimento",
                termos: ["Atendimento", "atendimento", "Fale Conosco", "fale conosco", "Fale", "fale", "Conosco", "conosco"]
            }, {
                url: "/central-de-manuais",
                termos: ["Manuais", "manuais", "Manual", "manual"]
            }]).each(function(a, o) {
                e(o.termos).each(function(e, a) {
                    "/Sistema/buscavazia" == t.location.pathname && t.location.search.indexOf(a) > -1 && (t.location = o.url)
                })
            })
        }, PFTX.pages.common.changeColorButtonsCategory = function() {
            if (e("body").hasClass("department")) var t = setInterval(function() {
                var a = e(".links-categorias ul li h2 a").attr("style");
                a == o || 0 == a ? (e(".links-categorias ul li h2 a").css("background", e("#cores-departamento").text()), e(".links-categorias ul li h2 a").css("color", e("#cor-fonte-departamento").text())) : clearInterval(t)
            }, 500)
        }, PFTX.pages.common.DOMReady = function() {
            PFTX.pages.common.changeColorButtonsCategory(), PFTX.pages.common.redirectBusca(), PFTX.pages.common.layoutBlackFriday(), PFTX.pages.common.FiltroPreco(), PFTX.pages.common.filtroOrdenacao(), PFTX.pages.common.departamentoBlackFriday(), PFTX.pages.common.btnScroll(), PFTX.pages.common.eventTracking(), e("body").prepend('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=801185559934326";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));<\/script>'), e(".helperComplement").remove(), e(".boxNewsletter >h3").text("Cadastre-se e receba promoções e novidades!"), e("body .miniCart").append('<div class="productAddMiniCart">                    <div class="successContainer">                      <div class="successOptions">                        <a href="/checkout/#/cart" class="finalizarCompra">Finalizar compra</a>                        <span class="finalizarClose">continuar comprando<span>                      </div>                    </div>                  </div>'), e(".shelf li").on("click", ".btn-adiciona-minicart", function(a) {
                a.preventDefault();
                var i = e(this).next(".buy-button-normal").find("a").attr("href"),
                    s = e(this).parents("li").find(".productImage img").attr("src");
                var n = {
                    id: function(e, a) {
                        if (!e) return o;
                        !a && t && (a = t.location.href), e = (e || "").replace(/[\[\]]/g, "\\$&");
                        var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(a);
                        return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
                    }("sku", i),
                    quantity: 1,
                    seller: "1"
                };
                vtexjs.checkout.addToCart([n], null).done(function(t) {
                    var a = '<div class="successInner">                    <div class="successImage">                      <img src="' + s + '"/>                    </div>                    <div class="successInfo">                      <span class="iconCheck"></span>                      <h5>Produto adicionado com sucesso!</h5>                    </div>                  </div>';
                    e(".productAddMiniCart .successContainer").prepend(a), e("#minicartLateral").addClass("aberto"), e(".vtexsc-cart").css("display", "none"), setTimeout(function() {
                        e("#minicartLateral").removeClass("aberto"), e(".successInner").remove()
                    }, 3500)
                }).fail(function() {
                    t.location.href = i
                })
            }), e(a).on("click", ".finalizarClose", function() {
                e(".productAddMiniCart").fadeOut()
            }), PFTX.pages.common.floatHeader(), PFTX.pages.common.menu(), PFTX.pages.common.tabsNew(), PFTX.pages.common.visitorLogin(), PFTX.pages.common.menuTablet(), PFTX.pages.common.newsFooter(), PFTX.pages.common.flagPreVendaJogos(), PFTX.modules.minicart.init(), e(".pageHeader .miniCart").on("click", PFTX.modules.minicart.abrindoMinicart), setTimeout(function() {
                PFTX.modules.addLista.init()
            }, 500)
        }, PFTX.pages.common.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("contato");
        s.DOMReady = function() {}, s.ajaxStop = function() {}, i.contact = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.criancas = new PFTX.constructor.page("criancas"), PFTX.pages.criancas.leads = function() {
            e(".captacaoLeads").submit(function(t) {
                t.preventDefault();
                var o = a.getElementById("email").value,
                    i = e(".captacaoLeads input[name=news_name]").val(),
                    s = e(".captacaoLeads input[name=news_mail]").val(),
                    n = {
                        news_name: i,
                        news_mail: s
                    };
                "" != i && "" != s ? e.ajax({
                    async: !0,
                    crossDomain: !0,
                    url: "/api/dataentities/DC/search?_fields=news_name,news_mail&_where=news_mail=" + o,
                    headers: {
                        Accept: "application/vnd.vtex.ds.v10+json",
                        "REST-Range": "resources=0-1"
                    },
                    method: "GET",
                    success: function(t) {
                        t.length < 1 ? e.ajax({
                            async: !0,
                            url: "/estrela/dataentities/DC/documents/",
                            type: "PATCH",
                            contentType: "application/json",
                            data: JSON.stringify(n),
                            success: function() {
                                e(".captacaoLeads .error-email").html("Email cadastrado com sucesso!"), e(".captacaoLeads .error-email").show()
                            },
                            error: function() {
                                e(".captacaoLeads .error-email").html("Ocorreu um erro nos nossos servidores. Tente novamente!"), e(".captacaoLeads .error-email").show()
                            }
                        }) : (e(".captacaoLeads .error-email").html("Email jÃ¡ cadastrado"), e(".captacaoLeads .error-email").show())
                    },
                    error: function(t) {
                        e(".captacaoLeads .error-email").html("Ocorreu um erro nos nossos servidores. Tente novamente!"), e(".captacaoLeads .error-email").show()
                    }
                }) : e(".captacaoLeads .error-email").show()
            })
        }, PFTX.pages.criancas.DOMReady = function() {
            PFTX.pages.criancas.leads()
        }, PFTX.pages.criancas.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.department = new PFTX.constructor.page("department"), PFTX.pages.department.lazyLoadPrateleiras = function() {
            e(".shelf li .productImage img").each(function(t, a) {
                e(a).attr("data-original", e(a).attr("src")), e(a).addClass("lazy")
            }), e(".shelf li .productImage img").lazyload({
                event: "scroll",
                effect: "fadeIn"
            })
        }, PFTX.pages.department.lazyLoadPrateleirasBotaoVerMais = function() {
            e(".shelf li .productImage img:not(.lazy)").each(function(t, a) {
                e(a).attr("data-original", e(a).attr("src")), e(a).addClass("lazy")
            }), e(".shelf li .productImage img").lazyload({
                event: "scroll",
                effect: "fadeIn"
            })
        }, PFTX.pages.department.DOMReady = function() {
            PFTX.pages.department.lazyLoadPrateleiras()
        }, PFTX.pages.department.ajaxStop = function() {
            PFTX.pages.department.lazyLoadPrateleirasBotaoVerMais()
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.falcon = new PFTX.constructor.page("falcon"), PFTX.pages.falcon.slider = function() {
            e(".shelf-colecao ul").slick({
                dots: !1,
                arrows: !0,
                infinite: !1,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            })
        }, PFTX.pages.falcon.DOMReady = function() {
            PFTX.pages.falcon.slider()
        }, PFTX.pages.falcon.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.home = new PFTX.constructor.page("home"), PFTX.pages.home.menuTablet = function() {
            e(".contentMenuTablet").on("click", function() {
                e(this).toggleClass("active"), e("#menu-primary").hasClass("active") ? (e("#menu-primary").fadeOut(), e("#menu-primary").removeClass("active")) : (e("#menu-primary").fadeIn(), e("#menu-primary").addClass("active"))
            })
        }, PFTX.pages.home.shelfProducts = function(t) {
            e(t).hasClass("slick-initialized") && e(t).slick("unslick"), e(t).slick({
                arrows: !0,
                infinite: !0,
                slidesToShow: 5,
                slidesToScroll: 1
            })
        }, PFTX.pages.home.DOMReady = function() {
            PFTX.pages.home.menuTablet(), PFTX.pages.common.fullSlider(!0, !0), e(".multipleSlider.carrossel-personagens ul").slick({
                arrows: !0,
                infinite: !0,
                slidesToShow: 8,
                slidesToScroll: 1
            }), e("#carrossel_marcas.multipleSlider ul").slick({
                arrows: !0,
                infinite: !0,
                slidesToShow: 5,
                slidesToScroll: 1
            }), e(".yearlinks ul").slick({
                arrows: !0,
                infinite: !1,
                slidesToShow: 11,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5
                    }
                }]
            }), PFTX.pages.home.shelfProducts(".carrossel-lancamentos .shelf ul"), PFTX.pages.home.shelfProducts(".carrossel-exclusivos .shelf ul"), PFTX.pages.home.shelfProducts(".carrossel-melhores-jogos .shelf ul"), PFTX.pages.common.LitsShelfChecked()
        }, PFTX.pages.home.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.institutional = new PFTX.constructor.page("institutional");
        var i = {
            lightboxOverlay: e('<div class="lightboxOverlay"></div>'),
            lightboxBlock: e('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>'),
            lightbox: function(a) {
                e(a).appendTo(".lightboxInner");
                var o = e(t).height(),
                    i = e(t).width(),
                    s = e(a).outerWidth(),
                    n = e(a).outerHeight(),
                    r = .8 * i,
                    l = .8 * o;
                if (s > r) var c = r;
                else c = s;
                if (n > l) var d = l;
                else d = n;
                e(".lightboxOverlay").css({
                    position: "fixed",
                    top: "0",
                    left: "0",
                    "background-color": "rgba(0,0,0,0.6)",
                    height: "100%",
                    width: "100%",
                    "z-index": "5005"
                }), e(".lightboxOverlay").addClass("open"), e(".lightboxBlock").css("position", "fixed"), e(".lightboxBlock").css("top", Math.max(0, (o - d) / 2) + "px"), e(".lightboxBlock").css("left", Math.max(0, (i - c) / 2 + e(t).scrollLeft()) + "px"), e(".lightboxInner").css({
                    "max-height": d,
                    "max-width": c
                }), e(".lightboxClose").click(function() {
                    e(".lightboxOverlay").removeClass("open"), e(".lightboxInner").empty()
                }), e(".lightboxOverlayInner").click(function() {
                    e(".lightboxOverlay").removeClass("open"), e(".lightboxInner").empty()
                })
            },
            tabs: function() {
                e(".tabNav").on("click", ".tabLink", function() {
                    var t = e(this).attr("data-ref");
                    e(".tabLink, .tabContent").removeClass("active"), e(this).addClass("active"), e(".tabsItems").find("." + t).addClass("active")
                })
            },
            isMobile: function() {
                -1 != navigator.userAgent.toLowerCase().search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) && e(".lightboxOverlay").remove()
            },
            shareWindow: function(a, o) {
                var i = "https://www.facebook.com/sharer/sharer.php?u=" + a,
                    s = "https://twitter.com/home?status=" + a,
                    n = "https://pinterest.com/pin/create/button/?url=" + a + "&media=" + o,
                    r = "https://plus.google.com/share?url=" + a;
                e(".shareProduct .facebook").attr("href", i), e(".shareProduct .twitter").attr("href", s), e(".shareProduct .pinterest").attr("href", n), e(".shareProduct .gmail").attr("href", r), e(".shareProduct a").on("click", function() {
                    return newwindow = t.open(e(this).attr("href"), "", "height=400,width=400"), t.focus && newwindow.focus(), !1
                })
            },
            imageFull: function() {
                e(".fullGallery .box-banner").each(function() {
                    var t = e(this).find("img").attr("src");
                    e(this).wrap("<div class='bannerImg' style='background:url(" + t + ") no-repeat center;'></div>"), e(this).find("img").remove()
                })
            }
        };
        PFTX.pages.institutional.linkSidebar = function() {
            e(".institutionalLinks li a").each(function() {
                e(this).attr("href") == t.location.pathname && e(this).addClass("current")
            })
        }, PFTX.pages.institutional.accordion = function() {
            e(".title_accordion").on("click", function(t) {
                t.preventDefault();
                var a = e(this);
                a.next().hasClass("active") ? (a.next().removeClass("active"), a.next().slideUp(350), a.removeClass("active")) : (a.next().toggleClass("active"), a.next().slideToggle(350), a.addClass("active"))
            })
        }, PFTX.pages.institutional.accordionInst = function(t) {
            e("#" + t + " .title_accordion").on("click", function(t) {
                t.preventDefault();
                var a = e(this);
                a.next().hasClass("active") ? (a.next().removeClass("active"), a.next().slideUp(350), a.removeClass("active")) : (a.next().toggleClass("active"), a.next().slideToggle(350), a.addClass("active"))
            }), e(".holder-pagination").on("click", function(t) {
                t.preventDefault(), e(".title_accordion").removeClass("active"), e(".inner").removeClass("active"), e(".inner").css("display", "none")
            })
        }, PFTX.pages.institutional.searchProd = function() {
            e("#searchProd").keyup(function() {
                var t = this;
                e.each(e(".central-de-manuais").find(".item-table"), function() {
                    e(this).text().toLowerCase().indexOf(e(t).val().toLowerCase()) <= 1 ? (e(this).removeClass("active"), e(this).removeClass("remove")) : (e(this).addClass("active"), e(".item-table").each(function(t, a) {
                        e(this).hasClass("active") ? e(this).removeClass("remove") : e(this).addClass("remove")
                    }))
                })
            })
        }, PFTX.pages.institutional.pagination = function() {
            var t = e(".holder-pagination");
            t.jPages({
                containerID: "central-de-manuais",
                perPage: 6,
                startPage: 1,
                startRange: 1,
                midRange: 5,
                endRange: 1,
                first: !1,
                last: !1
            })
        }, PFTX.pages.institutional.paginationDuvidas = function(t) {
            var a = e("#" + t + " .holder-pagination");
            a.jPages({
                containerID: "list-query_" + t,
                perPage: 6,
                startPage: 1,
                startRange: 1,
                midRange: 5,
                endRange: 1,
                first: !1,
                last: !1
            })
        }, PFTX.pages.institutional.paginationInvest = function(t) {
            var a = e("#" + t + " .holder-pagination");
            a.jPages({
                containerID: "central-de-manuais_" + t,
                perPage: 6,
                startPage: 1,
                startRange: 1,
                midRange: 5,
                endRange: 1,
                first: !1,
                last: !1
            })
        }, PFTX.pages.institutional.tabsInstRel = function() {
            e("ul.tabs li").click(function() {
                var t = e(this).data("tab"),
                    a = e(this).data("type");
                e(this).addClass("current").siblings().removeClass("current"), e("#" + t).addClass("current").siblings().removeClass("current"), e(this).hasClass("ready") || PFTX.pages.institutional.getRelacao(t, a)
            })
        }, PFTX.pages.institutional.tabsInstDuv = function() {
            e("ul.tabs li").click(function() {
                var t = e(this).data("tab"),
                    a = e(this).data("type");
                e(this).addClass("current").siblings().removeClass("current"), e("#" + t).addClass("current").siblings().removeClass("current"), e(this).hasClass("ready") || PFTX.pages.institutional.getDuvidas(t, a)
            })
        }, PFTX.pages.institutional.tabsInst = function() {
            e(".title_accordion").on("click", function(t) {
                t.preventDefault();
                var a = e(this);
                a.next().hasClass("active") ? (a.next().removeClass("active"), a.next().slideUp(350), a.removeClass("active")) : (a.next().toggleClass("active"), a.next().slideToggle(350), a.addClass("active"))
            })
        }, PFTX.pages.institutional.formFaleConosco = function() {
            var t = {
                solicitacao: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    nome_produto: !0,
                    endereco: !0,
                    endNumero: !0,
                    bairro: !0,
                    complemento: !0,
                    cep: !0,
                    estado: !0,
                    cidade: !0,
                    arquivo: !0,
                    mensagem: !0,
                    data_compra: !0
                },
                reclamacao: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    nome_produto: !0,
                    endereco: !0,
                    endNumero: !0,
                    bairro: !0,
                    complemento: !0,
                    cep: !0,
                    estado: !0,
                    cidade: !0,
                    arquivo: !0,
                    mensagem: !0,
                    data_compra: !0
                },
                duvidas: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    arquivo: !0,
                    mensagem: !0,
                    nome_produto: !0
                },
                informacoes: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    nome_produto: !0,
                    mensagem: !0
                },
                elogios: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    arquivo: !0,
                    mensagem: !0,
                    nome_produto: !0
                },
                sugestoes: {
                    nome: !0,
                    email: !0,
                    email_confirm: !0,
                    tel1: !0,
                    tel2: !0,
                    arquivo: !0,
                    mensagem: !0,
                    nome_produto: !0
                }
            };
            e(".formtype").change(function(o) {
                var i = e(this).val();
                "reclamacao" != i ? (e(".nome_produto").removeAttr("required"), e("#labelProduto .indication").remove(), e("#tel1").removeAttr("required"), e("#tel1").removeClass("error-field"), e("#labelTel .indication").remove()) : (e("#tel1").attr("required", "true"), e("#labelTel span").hasClass("indication") || e("#labelTel").append(e('<span class="indication">*</span>'))), e("#form-fale-conosco input:not(.notoggle), #form-fale-conosco div:not(.nome_produtoList), #form-fale-conosco select").each(function(a, o) {
                    !!t[i][o.id] ? (e("#" + o.id).removeAttr("disabled").closest(".contentField").slideDown(), e("label").removeClass("active")) : (e("#nome_produto").removeAttr("disabled").parent().css("display", "block"), e("#" + o.id).attr("disabled", "disabled").closest(".contentField").slideUp("fast"), e("label").removeClass("active"))
                }), e(a).ajaxStop(function() {})
            });
            e("#form-fale-conosco .contentField .addField").click(function(t) {
                t.preventDefault();
                var a = e(this).prev().clone();
                a.attr("id", a.attr("id")), a.insertAfter(e(this)).val(""), 1
            })
        }, PFTX.pages.institutional.formCentralAtendimento = function() {
            function t() {
                e("#endereco").val(" "), e("#bairro").val(" "), e("#cidade").val(" ")
            }
            e("#cep").blur(function() {
                var a = e(this).val().replace(/\D/g, "");
                if ("" != a) {
                    /^[0-9]{8}$/.test(a) ? e.getJSON("https://viacep.com.br/ws/" + a + "/json/?callback=?", function(a) {
                        "erro" in a ? (t(), alert("CEP não encontrado.")) : (e("#endereco").val(a.logradouro), e("#bairro").val(a.bairro), e("#cidade").val(a.localidade), e("#estado option").each(function(t, o) {
                            a.uf === o.value && e("#estado").val(o.value)
                        }))
                    }) : (t(), alert("Formato de CEP invÃ¡lido."))
                } else t()
            }), e("#BTEnvia").on("click", function() {
                var t, o, i, s, n, r, l, c, d, u, m, p, f, h, g, v, b;
                b = !0, e(".formsInst input[required=true], #mensagem, #estado").each(function() {
                    if (e(this).siblings("#information-field").remove(), "" != e(this).val() && e(this).removeClass("error-field"), "estado" == e("#estado").val() ? (e(this).addClass("error-field"), e(this).parent().append('<p id="information-field">Campo obrigatÃ³rio</p>')) : e(this).removeClass("error-field"), "" != e(this).val() || e(this).is("[disabled]")) {
                        if ("email" == e(this).attr("name")) {
                            var t = e(this).val().trim(),
                                a = e("#email_confirm").val().trim();
                            0 != !!e(this).val().match(/^([0-9a-zA-Z-]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+[\s]{0,}$/) && t === a || (e(this).addClass("error-field"), e(this).parent().append('<p id="information-field">E-mail inválido ou campos não correspondem!</p>'), b = !1)
                        }
                    } else e(this).hasClass("error-field") || (e(this).addClass("error-field"), e(this).parent().append('<p id="information-field">Campo obrigatÃ³rio</p>')), b = !1
                }), (e('.tabs input[type="radio"]:checked+label').length ? b : (e(".tabs label").addClass("error-field"), e("#information-field").remove(), e(".tabs").after('<p id="information-field">Campo obrigatÃ³rio</p>'), e(".tabs label").click(function() {
                    e(this).siblings("label").removeClass("error-field")
                }), b = !1)) ? (t = e('input[name="tipo"]:checked').val(), o = e("#nome").val(), i = e("#email").val(), s = e("#email_confirm").val(), n = e("#endereco").val(), r = e("#endNumero").val(), l = e("#bairro").val(), c = e("#complemento").val(), d = e("#cep").val(), u = e("#cidade").val(), m = e("#estado option:selected").val(), p = e("#nome_produto").val(), f = e("#tel1").val(), h = e("#tel2").val(), g = e(".textareaContent textarea").val(), v = {
                    tipo: t,
                    nome: o.trim(),
                    email: i.trim(),
                    email_confirm: s.trim(),
                    telefone: f.trim(),
                    telefone2: h.trim(),
                    endereco: n.trim(),
                    endNumero: r.trim(),
                    bairro: l.trim(),
                    complemento: c.trim(),
                    cep: d.trim(),
                    cidade: u.trim(),
                    estado: m.trim(),
                    nome_produto: p.trim(),
                    mensagem: g.trim()
                }, e("input.nome_produto").each(function(t, a) {
                    v["nome_produto_" + (t + 1)] = e(this).val()
                }), e.ajax({
                    async: !0,
                    url: "/estrela/dataentities/FC/documents/",
                    type: "PATCH",
                    contentType: "application/json",
                    data: JSON.stringify(v),
                    success: function(t) {
                        if (e("html, body").animate({
                                scrollTop: 0
                            }, 700), e(".pageContent").css("display", "none"), e(".pageContent").parent().append('            <div class="pageContent" style="display: block;">            <div class="msgSucess">            <h2 style="text-align: center;">Mensagem enviada com sucesso!</h2>            <p style="text-align: center;">Recebemos sua mensagem! Te responderemos entre 1 a 5 dias Ãºteis.</p>            </div>            </div>'), "" != e("#arquivo").val()) {
                            var o = new FormData(a.getElementById("form-fale-conosco"));
                            o.append("value", e("#arquivo")[0].files[0]), e.ajax({
                                url: "/estrela/dataentities/FC/documents/" + t.DocumentId + "/arquivos/attachments",
                                type: "POST",
                                data: o,
                                cache: !1,
                                contentType: !1,
                                processData: !1
                            })
                        }
                    },
                    error: function() {
                        alert("Opss, ocorreu um erro ao se cadastrar!!!")
                    }
                })) : e("#message").html(e("<div>", {
                    class: "messageContent messageContentError",
                    text: "Os campos com asterisco são obrigatórios"
                }).fadeIn())
            })
        }, PFTX.pages.institutional.checkFiles = function() {
            a.getElementById("arquivo").onchange = function() {
                this.files[0].size > 1e5 ? (e(this).addClass("error-message"), this.value = "") : e(this).removeClass("error-message");
                var t = e(this).val(),
                    a = t.substring(t.lastIndexOf(".") + 1);
                return "jpeg" == a || "png" == a || "pdf" == a
            }
        }, PFTX.pages.institutional.getRelacao = function(t, a) {
            e(".tab-link.init").click(), e(".tab-link").click(function() {
                e(this).attr("data-tab"), e(this).attr("data-type")
            });
            var o = {
                async: !0,
                crossDomain: !0,
                url: "/api/dataentities/RI/search?_fields=id,arquivo,linkDoc,itemDoc,itemInfo,tipo&_where=tipo=" + a,
                method: "GET",
                headers: {
                    "rest-range": "resources=0-200"
                }
            };
            e.ajax(o).done(function(a) {
                var o = [];
                a.length > 0 && a.sort(function(e, t) {
                    return e.itemDoc.localeCompare(t.itemDoc)
                }), (a || []).forEach(function(e, t) {
                    var i = a[t].linkDoc;
                    o.push("          <div class='item-table " + a[t].tipo + "'>          <div class='item-doc'><a href='" + i + "'><i class='icon-pdf'></i>" + a[t].itemDoc + "</a></div>          <div class='item-info'>" + a[t].itemInfo.split("T")[0].replace("/-/g", "/") + "</div>          </div>")
                }), e('.tab-link[data-tab="' + t + '"]').addClass("ready"), e("#" + t).addClass("ready").find(".item-table").replaceWith(o.join("")), setTimeout(function() {
                    e(".tab-link.current").trigger("click")
                }, 100), e(".item-table").css("display", "none"), e(".tab-link").live("click", function(t) {
                    e(".btn-load-more").length <= 0 && e(".box-investidores").append('<div id="loadMore" class="btn-load-more"><span>mostrar mais</span></div>');
                    var a = e(".tab-content.current .central-de-manuais .item-table").size(),
                        o = 6;
                    e(".tab-content.current .central-de-manuais .item-table:lt(" + o + ")").show(), e("#loadMore").click(function() {
                        e(".tab-content.current .central-de-manuais .item-table:visible").length == a ? (e("#loadMore").addClass("done"), e("#loadMore").fadeOut(), e("#loadMore").remove()) : e(".tab-content.current .central-de-manuais .item-table:lt(" + (o = o + 10 <= a ? o + 10 : a) + ")").show()
                    })
                })
            }).fail(function(a, o, i) {
                e("#" + t).removeClass("ready").addClass("error").find(".item-table").html("Tente novamente mais tarde")
            })
        }, PFTX.pages.institutional.getDuvidas = function(t, a) {
            var o = "/api/dataentities/DF/search?_fields=texto_duv,tipo,titulo_duv&_where=tipo=" + a;
            e.getJSON(o, function(e) {}).done(function(a) {
                var o = [];
                (a || []).forEach(function(e, t) {
                    o.push("          <div class='box_accordion mix " + a[t].tipo + "'>          <a class='title_accordion' href='#'>" + a[t].titulo_duv + "</a>          <div class='inner'>          <p>" + a[t].texto_duv + "</p>          </div>          </div>")
                }), e('.tab-link[data-tab="' + t + '"]').addClass("ready"), e("#" + t).addClass("ready").find(".box_accordion").replaceWith(o.join("")), PFTX.pages.institutional.paginationDuvidas(t), PFTX.pages.institutional.accordionInst(t)
            }).fail(function(a, o, i) {
                e("#" + t).removeClass("ready").addClass("error").find(".box_accordion").html("Tente novamente mais tarde")
            })
        }, PFTX.pages.institutional.getColection = function() {
            e.ajax({
                async: !0,
                crossDomain: !0,
                url: "/api/dataentities/CM/search?_fields=id%2CitemCod%2CitemManual%2CitemDoc%2CitemProd%2CitemVideo%2CitemLink&_sort=itemProd",
                method: "GET",
                headers: {
                    "rest-range": "resources=0-216"
                }
            }).done(function(t) {
                var a = [];
                (t || []).forEach(function(e, o) {
                    var i = t[o].itemVideo,
                        s = t[o].itemLink;
                    if (null !== t[o].itemDoc) var n = t[o].itemDoc;
                    else n = "//estrela.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=CM-" + t[o].id + "&fileName=" + t[o].itemManual;
                    a.push("          <div class='item-table'>          <div class='item-product'><a href='" + (s || "javascript:void(0);") + "' target='_blank'>" + t[o].itemProd + "</a></div>          <div class='item-video'><a href='" + (i || "javascript:void(0);") + "' class='item-video2'><i class='icon-manual-video'></i></a></div>          <div class='item-pdf'><a href='" + (n || "javascript:void(0);") + "' target='_blank'><i class='icon-pdf-manual'></i></a></div>          </div>")
                }), e(".item-table").addClass("ready").replaceWith(a.join("")), e(".item-table").css("display", "none"), e(".central-de-manuais").append('<div id="loadMore"><span>mostrar mais</span></div>');
                var o = e(".central-de-manuais .item-table").size(),
                    i = 6;
                e(".central-de-manuais .item-table:lt(" + i + ")").show(), e("#loadMore").click(function() {
                    e(".central-de-manuais .item-table:visible").length == o ? (e("#loadMore").addClass("done"), e("#loadMore").fadeOut(), e("#loadMore").remove()) : e(".central-de-manuais .item-table:lt(" + (i = i + 10 <= o ? i + 10 : o) + ")").show()
                })
            }).fail(function(t, a, o) {
                e("#").removeClass("ready").addClass("error").find(".item-table").html("Tente novamente mais tarde")
            }), e(a).ajaxStop(function() {
                e(".item-video2").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this).attr("href").split("=")[1];
                    if (!a) return !1;
                    var o = e('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + a + '" frameborder="0" allowfullscreen></iframe>');
                    return i.lightboxOverlay.appendTo("body"), i.lightboxBlock.appendTo(".lightboxOverlay"), i.lightbox(o, 560, 315), e(".lightboxClose").text(), !1
                })
            })
        }, PFTX.pages.institutional.getEventos = function(t, a) {
            var o = {
                    async: !0,
                    crossDomain: !0,
                    url: "/api/dataentities/ES/search?_fields=id,inicioEvento,terminoEvento,nomeEvento,imagemEvento,descricaoEvento,localEvento,horarioEvento,enderecoEvento,telefoneEvento,mapaEvento,siteEvento&_where=inicioEvento >  '" + t + "' AND inicioEvento <  '" + a + "'",
                    method: "GET",
                    headers: {
                        "rest-range": "resources=0-200"
                    }
                },
                i = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            e.ajax(o).done(function(t) {
                var a = [];
                (t || []).forEach(function(e, o) {
                    var s = "<img src='" + ("//estrela.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=ES-" + t[o].id + "&fileName=" + t[o].imagemEvento) + "' alt=''>",
                        n = t[o].mapaEvento.split("place/")[1].split("/@")[0],
                        r = new Date(t[o].inicioEvento),
                        l = new Date(t[o].terminoEvento),
                        c = r.getMonth(),
                        d = l.getMonth();
                    a.push("          <div class='box_accordion'>          <a class='title_accordion' href='#'>          " + (r.getDate() + 1) + " de " + i[c] + " atÃ© " + (l.getDate() + 1) + " de " + i[d] + "          <em>" + t[o].nomeEvento + "</em>          </a>          <div class='inner'>          " + (s || "") + "          <p>" + t[o].descricaoEvento + "</p>          <div class='address'>          <h3>Data</h3>          <p>Data -           " + (r.getDate() + 1) + " de " + i[c] + " -           " + (l.getDate() + 1) + " de " + i[d] + "</p>          <p>horÃ¡rio - " + t[o].horarioEvento + "</p>          <p>Local - " + t[o].localEvento + "</p>          <p>Endereço - " + t[o].enderecoEvento + "</p>          <p>Telefone - " + t[o].telefoneEvento + "</p>          <p>Site - <a href='" + t[o].siteEvento + "'>" + t[o].siteEvento + "</a></p>          </div>          <div class='mapa'><iframe src='https://www.google.com/maps?q=" + n + "&output=embed' frameborder='0' allowfullscreen></iframe></div>          </div>          </div>")
                }), e(".events .box_accordion").addClass("ready"), e(".events .box_accordion").html(a.join("")), e(".events .box_accordion").is(":empty") && e(".events .box_accordion").html('<h3 style="text-align: center;"> Não há eventos </h3>'), e(".title_accordion").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this);
                    a.next().hasClass("active") ? (a.next().removeClass("active"), a.next().slideUp(350), a.removeClass("active")) : (a.next().toggleClass("active"), a.next().slideToggle(350), a.addClass("active"))
                })
            }).fail(function(t, a, o) {
                e("#").removeClass("ready").addClass("error").find(".events .box_accordion").html("Tente novamente mais tarde")
            })
        }, PFTX.pages.institutional.DOMReady = function() {
            if (PFTX.pages.institutional.linkSidebar(), PFTX.pages.institutional.searchProd(), PFTX.pages.institutional.formFaleConosco(), e("body").hasClass("assistenciaTecnica") && (e(a).ready(function() {
                    a.title = "AssistÃªncia TÃ©cnica"
                }), e(".tabs-form .selectState").change(function(t) {
                    var a = e(this).val();
                    e(".selectCity").val(" "), e(".selectCity option").removeClass("active"), e(".city_wrap").removeClass("active"), e("[data-target=" + a + "]").addClass("active")
                }), e(".tabs-form .selectCity").change(function(t) {
                    var a = e(this).val();
                    e(".city_wrap ").removeClass("active"), e("[data-city=" + a + "]").addClass("active")
                }), e(".title_accordion").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this);
                    a.next().hasClass("active") ? (a.next().removeClass("active"), a.next().slideUp(350), a.removeClass("active")) : (a.next().toggleClass("active"), a.next().slideToggle(350), a.addClass("active"))
                }), e(".holder-pagination").on("click", function(t) {
                    t.preventDefault(), e(".title_accordion").removeClass("active"), e(".inner").removeClass("active"), e(".inner").css("display", "none")
                })), e("body").hasClass("eventos")) {
                var t = function(e) {
                        var t = e,
                            a = e + 1;
                        return t < 10 && (t = "0" + t), a < 10 && (a = "0" + a), {
                            start: "2018-" + t + "-01",
                            end: "2018-" + a + "-01"
                        }
                    },
                    o = function(e) {
                        var t = e;
                        return t < 10 ? t = "0" + t : t >= 10 && t <= 12 ? t : void(t = "01")
                    },
                    i = (new Date).getMonth() + 1;
                e(".selectDate .mes").text(o(i));
                var s = t(i);
                PFTX.pages.institutional.getEventos(s.start, s.end), e(".mes-prev").on("click", function() {
                    var a = i - 1;
                    (new Date).getMonth();
                    if (a >= 1 && a < 12) {
                        i--, e(".selectDate .mes").text(o(i));
                        var s = t(i);
                        PFTX.pages.institutional.getEventos(s.start, s.end)
                    }
                }), e(".mes-next").on("click", function() {
                    var a = i + 1;
                    if (a < 12) {
                        i++, e(".selectDate .mes").text(o(i));
                        var s = t(i);
                        PFTX.pages.institutional.getEventos(s.start, s.end)
                    } else if (a >= 12) {
                        i = 12, e(".selectDate .mes").text(o(i));
                        s = t(i);
                        PFTX.pages.institutional.getEventos(s.start, "2018-01-01")
                    }
                }), e(".selectDate .mes").on("change", function() {}), PFTX.pages.institutional.getEventos(s.start, s.end)
            }
            e("body").hasClass("relacaoInvestidores") && (e(a).ready(function() {
                a.title = "Relação com Investidores"
            }), PFTX.pages.institutional.tabsInstRel(), PFTX.pages.institutional.getRelacao("tab-1", "53305d68-56c6-11e7-9522-0ad3585f0876")), e("body").hasClass("fale-conosco") && (e(".btns-anchor a").each(function() {
                e(this).click(function() {
                    e(".btns-anchor a").removeClass("active"), e(this).addClass("active"), e(".formsInst").slideDown();
                    var t = e("#form-fale-conosco").offset().top;
                    e("html, body").animate({
                        scrollTop: t - 100
                    }, 700)
                })
            }), PFTX.pages.institutional.formCentralAtendimento(), e.mask.definitions["~"] = "[+-]", e("#cep").mask("99999-999"), e("#data_compra").mask("99/99/9999"), e("#tel1, #tel2").mask("(99) 9999-99999"), PFTX.pages.institutional.checkFiles()), e("body").hasClass("seguranca-do-brinquedo-e-garantia") && e(a).ready(function() {
                a.title = "Segurança do brinquedo e garantia"
            }), e("body").hasClass("centralManuais") && PFTX.pages.institutional.getColection(), e("body").hasClass("duvidas-frequentes") && (e(a).ready(function() {
                a.title = "Dúvidas Frequentes"
            }), PFTX.pages.institutional.tabsInstDuv(), PFTX.pages.institutional.getDuvidas("tab-1", "048caa2f-55c2-11e7-9522-0ac732ce0084")), e("body").hasClass("tv-estrela") && (e(a).ready(function() {
                a.title = "TV Estrela"
            }), e(".carousel_tv .items").slick({
                dots: !0,
                arrows: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                pauseOnHover: !1,
                autoplay: !1,
                autoplaySpeed: 4e3,
                appendArrows: e(".carousel_tv .slick_controls"),
                appendDots: e(".carousel_tv .slick_controls")
            }), e(".carousel_tv2 .slider").slick({
                dots: !0,
                arrows: !0,
                slidesToShow: 3,
                slidesToScroll: 1,
                pauseOnHover: !1,
                autoplay: !1,
                autoplaySpeed: 4e3,
                appendArrows: e(".carousel_tv2 .slick_controls"),
                appendDots: e(".carousel_tv2 .slick_controls"),
                dotsClass: "custom_paging",
                customPaging: function(e, t) {
                    return t + 1 + " de " + e.slideCount
                }
            }), e(".carousel_tv3 .slider").slick({
                dots: !0,
                arrows: !0,
                slidesToShow: 3,
                slidesToScroll: 1,
                pauseOnHover: !1,
                autoplay: !1,
                autoplaySpeed: 4e3,
                appendArrows: e(".carousel_tv3 .slick_controls"),
                appendDots: e(".carousel_tv3 .slick_controls"),
                dotsClass: "custom_paging",
                customPaging: function(e, t) {
                    return t + 1 + " de " + e.slideCount
                }
            }))
        }, PFTX.pages.institutional.ajaxStop = function() {
            e("body").hasClass("centralManuais") && e(".item-table").each(function(t, a) {
                var o = e(this).find(".icon-manual-video").parent("a").attr("href"),
                    i = e(this).find(".icon-pdf-manual").parent("a").attr("href").split("=");
                "#" != o && "javascript:void(0);" != o || (o = e(this).find(".icon-manual-video").parent("a")).addClass("empty");
                "#" != i && "null" != i || (i = e(this).find(".icon-pdf-manual").parent("a")).addClass("empty");
                e(this).find("item-video a").hasClass("empty"), e(this).find("item-pdf a").hasClass("empty")
            })
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.listas = new PFTX.constructor.page("lista-presentes"), PFTX.pages.listas.token = function() {
            return "https://curl.profite.com.br/vtex-curl/get.php"
        }, PFTX.pages.listas.mergeCached = function(e) {
            var t = sessionStorage.getItem("lists");
            t = t ? JSON.parse(t) : [];
            for (var a = e.map(function(e) {
                    return e.id
                }), o = [], i = 0; i < t.length; i++) a.indexOf(t[i].id) < 0 ? e.push(t[i]) : o.push(i);
            for (i = 0; i < o.length; i++) t.splice(i, 1);
            return sessionStorage.setItem("lists", JSON.stringify(t)), e
        }, PFTX.pages.listas.removeFromCache = function(e) {
            var t = sessionStorage.getItem("lists"),
                a = (t = t ? JSON.parse(t) : []).map(function(e) {
                    return e.id
                }).indexOf(e);
            a >= 0 && t.splice(a, 1), sessionStorage.setItem("lists", JSON.stringify(t))
        }, PFTX.pages.listas.cacheListItem = function(t) {
            var a = sessionStorage.getItem("lists"),
                o = (a = a ? JSON.parse(a) : []).map(function(e) {
                    return e.id
                }).indexOf(t);
            return new Promise(function(i, s) {
                e.ajax({
                    url: "/api/dataentities/LD/documents/" + t + "?_fields=img,nomeLista,urlLista,dataLista,observacoes,nomeUser,email,produtos,produtosComprados,quemComprou,orderidShareCart,index,id",
                    type: "GET",
                    success: function(e) {
                        o >= 0 ? a[o] = e : a.push(e), sessionStorage.setItem("lists", JSON.stringify(a)), i(a)
                    }
                })
            })
        }, PFTX.pages.listas.getInfo = function(t) {
            e("#displayListas li").remove();
            var a = (new Date).getTime();
            e.ajax({
                url: "/api/dataentities/LD/search?_fields=img,nomeLista,urlLista,dataLista,observacoes,nomeUser,email,produtos,produtosComprados,quemComprou,orderidShareCart,index,id&_where=email=" + t + "&v=" + a + "&_schema=mdv1",
                type: "GET",
                dataType: "json",
                async: !0,
                crossDomain: !0,
                cache: !1,
                headers: {
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                success: function(e) {
                    e = PFTX.pages.listas.mergeCached(e), PFTX.pages.listas.start(e), location.search.indexOf("link") > 0 && PFTX.modules.buildLista.init()
                }
            })
        }, PFTX.pages.listas.start = function(t) {
            localStorage.setItem("allLists", JSON.stringify(t)), t = t.sort(function(e, t) {
                return e.nomeLista > t.nomeLista ? 1 : e.nomeLista < t.nomeLista ? -1 : 0
            });
            var a = e("#displayListas");
            t.length > 0 ? t.forEach(function(t) {
                void 0 == t.id && (t.id = t.index);
                var o = '<li lista-id="' + t.id + '" class="item-lista"><p>' + t.nomeLista + '</p><div class="acoes"><ul><li><a href="/_secure/listas/lista?link=' + t.urlLista + '" class="viewList" target="_blank"><i class="icon-lista-view"></i>Visualizar</a></li><li><a href="" class="editList"><i class="icon-lista-edit"></i>Editar</a></li><li><a href="" class="deleteList"><i class="icon-lista-delete"></i>Excluir</a></li></ul></div></li>';
                e(".aviso-produtos.aviso-lista").remove(), a.append(o)
            }) : (a.wrap('<div class="box-aviso-lista"></div>'), a.parent().prepend('<div class="aviso-produtos aviso-lista"><p>Ainda não há listas cadastradas :(</p></div>')), e(".item-lista").each(function() {
                e(this).find(".editList").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this).parent().parent().parent().parent().attr("lista-id");
                    PFTX.pages.listas.editarLista(a)
                })
            }), e(".item-lista").each(function() {
                e(this).find(".deleteList").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this).parent().parent().parent().parent().attr("lista-id");
                    PFTX.pages.listas.deletarLista(a), PFTX.pages.listas.removeFromCache(a)
                })
            })
        }, PFTX.pages.listas.modalCriarLista = function() {
            e(".createList").on("click", function(e) {
                e.preventDefault(), PFTX.pages.listas.novaLista()
            })
        }, PFTX.pages.listas.novaLista = function() {
            e("body").prepend('<div class="maskLista"></div><div id="modalNovaLista" class="modal-lista"><span class="modal-close"></span><h3>Nova Lista</h3><a href="" class="alterar-foto">Adicionar Foto <i class="icon-modal-editar"></i></a><input type="file" id="fileElem" name="imgLista" style="display: none" /><form><label>Nome da lista</label><input type="text" name="nomeLista" value="" /><label>URL da lista <span class="error-url">Url jÃ¡ cadastrada!</span></label><input type="text" name="urlLista" value="" /><label>Data do Evento <span class="error-data">Insira uma data vÃ¡lida!</span></label><input type="text" name="dataEvento" value="" /><label>Observações</label><textarea name="descriptionLista"></textarea></form><div class="modal-acoes"><button class="btSalvar">Salvar</button><button class="btCancelar">Cancelar</button></div></div>'), e.mask.definitions["~"] = "[+-]", e("#modalNovaLista input[name=dataEvento]").mask("99/99/9999"), PFTX.modules.addLista.closeModal(e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar"), e(".modal-lista")), PFTX.pages.listas.criarLista(), PFTX.pages.listas.openFile(), e("#modalNovaLista input[name=imgLista]").on("change", function() {
                e("#modalNovaLista .alterar-foto").text("Foto adicionada! Clique aqui para alterar!")
            })
        }, PFTX.pages.listas.criarLista = function() {
            e("#modalNovaLista .btSalvar").on("click", function(t) {
                t.preventDefault(), e(".btSalvar").html("<i class='fa fa-spin fa-spinner'></i>"), e(".btSalvar").attr("disabled", !0);
                var a = e("#modalNovaLista input[name=imgLista]").val(),
                    o = e("#modalNovaLista input[name=nomeLista]").val(),
                    i = e("#modalNovaLista input[name=urlLista]").val(),
                    s = e("#modalNovaLista input[name=dataEvento]").val(),
                    n = e("#modalNovaLista textarea[name=descriptionLista]").val(),
                    r = sessionStorage.getItem("nomeUser"),
                    l = sessionStorage.getItem("email"),
                    c = vtexjs.checkout.orderForm.orderFormId,
                    d = (new Date).getTime(),
                    u = {
                        index: "",
                        nomeLista: o,
                        urlLista: i + "-" + d,
                        dataLista: s,
                        observacoes: n,
                        nomeUser: r,
                        email: l,
                        produtos: "",
                        orderidShareCart: c,
                        img: d + "." + a.split(".")[1]
                    },
                    m = e("input[name=imgLista]")[0].files[0];
                "" != o && "" != i && "" != s && PFTX.pages.listas.verificaData(s) && "" != n ? e.ajax({
                    async: !0,
                    url: "/api/dataentities/LD/documents",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(u),
                    success: function(t) {
                        if (u.index = t.DocumentId, "" != a) {
                            var o = new FormData;
                            o.append("img", m), e.ajax({
                                url: "/estrela/dataentities/LD/documents/" + t.DocumentId + "/img/attachments",
                                type: "POST",
                                timeout: 0,
                                processData: !1,
                                mimeType: "multipart/form-data",
                                contentType: !1,
                                data: o,
                                success: function() {
                                    e(".modal-lista .modal-acoes").prepend('<div class="loading"></div>'), JSON.parse(localStorage.getItem("allLists")).push(u), setTimeout(function() {
                                        e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar").trigger("click"), swal({
                                            text: "Lista criada com sucesso!",
                                            icon: "success"
                                        }), PFTX.pages.listas.cacheListItem(t.DocumentId).then(function() {
                                            PFTX.pages.listas.getInfo(sessionStorage.getItem("email"))
                                        }), e(".btSalvar").html("Salvar"), e(".btSalvar").attr("disabled", !1), dataLayer.map(function(e) {
                                            "Home" != e.pageCategory && "Product" != e.pageCategory || location.reload()
                                        })
                                    }, 1e3)
                                }
                            })
                        } else e(".modal-lista .modal-acoes").prepend('<div class="loading"></div>'), setTimeout(function() {
                            e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar").trigger("click"), swal({
                                text: "Lista criada com sucesso!",
                                icon: "success"
                            }), PFTX.pages.listas.cacheListItem(t.DocumentId).then(function() {
                                PFTX.pages.listas.getInfo(sessionStorage.getItem("email"))
                            }), e(".btSalvar").html("Salvar"), e(".btSalvar").attr("disabled", !1), dataLayer.map(function(e) {
                                "Home" != e.pageCategory && "Product" != e.pageCategory || location.reload()
                            })
                        }, 1e3)
                    }
                }) : (PFTX.pages.listas.validaCampos(e(".modal-lista form input, .modal-lista form textarea")), e(".btSalvar").html("Salvar"), e(".btSalvar").attr("disabled", !1))
            })
        }, PFTX.pages.listas.editarLista = function(t) {
            var a = sessionStorage.getItem("logado"),
                o = !1,
                i = JSON.parse(localStorage.getItem("allLists")),
                s = [];
            if ("" == i && null == i || i.map(function(e) {
                    e.index != t && e.id != t || (o = !0, s.push(e))
                }), "true" == a && o) {
                var n = '<div class="maskLista"></div><div id="modalEditar" class="modal-lista"><span class="modal-close"></span><h3>Editar Lista</h3><a href="" class="alterar-foto">Alterar Foto <i class="icon-modal-editar"></i></a><input type="file" id="fileElem" name="imgLista" style="display: none" /><form><label>Nome da lista</label><input type="text" name="nomeLista" value="' + s[0].nomeLista + '" /><label>URL da lista</label><input type="text" name="urlLista" value="' + s[0].urlLista + '" /><label>Data do Evento <span class="error-data">Insira uma data vÃ¡lida!</span></label><input type="text" name="dataEvento" value="' + s[0].dataLista + '" /><label>Observações</label><textarea name="descriptionLista">' + s[0].observacoes + '</textarea></form><div class="modal-acoes"><button class="btSalvar">Salvar</button><button class="btCancelar">Cancelar</button></div></div>';
                e("body").prepend(n), PFTX.pages.listas.openFile(), e("#modalEditar input[name=imgLista]").on("change", function() {
                    e("#modalEditar .alterar-foto").text("Foto alterada! Clique aqui se quiser alterar de novo!")
                }), PFTX.modules.addLista.closeModal(e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar"), e(".modal-lista")), e.mask.definitions["~"] = "[+-]", e("#modalEditar input[name=dataEvento]").mask("99/99/9999"), e("#modalEditar .btSalvar").on("click", function(t) {
                    t.preventDefault();
                    var a = e("#modalEditar input[name=imgLista]").val(),
                        o = e("#modalEditar input[name=nomeLista]").val(),
                        i = e("#modalEditar input[name=urlLista]").val(),
                        n = e("#modalEditar input[name=dataEvento]").val(),
                        r = e("#modalEditar textarea[name=descriptionLista]").val(),
                        l = sessionStorage.getItem("nomeUser"),
                        c = ((new Date).getTime(), {
                            nomeLista: o,
                            urlLista: i,
                            dataLista: n,
                            observacoes: r,
                            nomeUser: l
                        }),
                        d = e("input[name=imgLista]")[0].files[0];
                    "" != o && "" != i && "" != n && PFTX.pages.listas.verificaData(n) && "" != r ? e.ajax({
                        async: !0,
                        url: "/estrela/dataentities/LD/documents/" + s[0].id,
                        type: "PATCH",
                        contentType: "application/json",
                        data: JSON.stringify(c),
                        success: function() {
                            if ("" != a) {
                                a = d.name;
                                var t = new FormData;
                                t.append("img", d), e.ajax({
                                    url: "/estrela/dataentities/LD/documents/" + s[0].id + "/img/attachments",
                                    type: "POST",
                                    timeout: 0,
                                    processData: !1,
                                    mimeType: "multipart/form-data",
                                    contentType: !1,
                                    data: t,
                                    success: function() {
                                        e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar").trigger("click"), swal({
                                            text: "Lista alterada com sucesso!",
                                            icon: "success"
                                        }), PFTX.pages.listas.cacheListItem(s[0].id).then(function() {
                                            e("#displayListas li").remove(), PFTX.pages.listas.getInfo(sessionStorage.getItem("email"))
                                        })
                                    }
                                })
                            } else e(".modal-lista .modal-close, .modal-lista .modal-acoes .btCancelar").trigger("click"), swal({
                                text: "Lista alterada com sucesso!",
                                icon: "success"
                            }), PFTX.pages.listas.cacheListItem(s[0].id).then(function() {
                                e("#displayListas li").remove(), PFTX.pages.listas.getInfo(sessionStorage.getItem("email"))
                            })
                        }
                    }) : PFTX.pages.listas.validaCampos(e(".modal-lista form input, .modal-lista form textarea"))
                })
            }
        }, PFTX.pages.listas.deletarLista = function(t) {
            e.ajax({
                async: !0,
                url: "/api/dataentities/LD/documents/" + t,
                type: "DELETE",
                timeout: 0,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "x-vtex-api-appKey": "vtexappkey-estrela-NJDJSE",
                    "x-vtex-api-appToken": "APOBQWCWRPZUNOEIJWFXELOBCBJLCGLTEMFFPPHLOOMXYGFQKAEDFGPOAMZPMRTLEGQAJZTTOUIPYRCVWTBCCHNXWQECQSYXVBSSQEHKHKOLXAQIKESTPQJWSSESVQDV"
                },
                success: function() {
                    swal({
                        text: "Lista removida com sucesso!",
                        icon: "success"
                    }), e("#displayListas li").remove(), PFTX.pages.listas.removeFromCache(t), PFTX.pages.listas.getInfo(sessionStorage.getItem("email"))
                }
            })
        }, PFTX.pages.listas.openFile = function() {
            e(".alterar-foto").on("click", function(t) {
                t.preventDefault(), e("#fileElem").trigger("click")
            })
        }, PFTX.pages.listas.validaCampos = function(t) {
            t.each(function() {
                "" === e(this)[0].value ? e(this).addClass("error") : e(this).removeClass("error")
            })
        }, PFTX.pages.listas.verificaData = function(t) {
            var a = (new Date).getFullYear(),
                o = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/),
                i = t.split("/"),
                s = new Date(i[2] + "-" + i[1] + "-" + i[0] + "T00:00:00"),
                n = (new Date).setHours(0, 0, 0, 0);
            return !o || t.length < 10 || o[1] < 1 || o[1] > 31 || o[2] < 1 || o[2] > 12 || o[3] < a ? (setTimeout(function() {
                e(".modal-lista form input[name=dataEvento]").addClass("error"), e(".error-data").show()
            }, 100), !1) : n > s.getTime() ? (setTimeout(function() {
                e(".modal-lista form input[name=dataEvento]").addClass("error"), e(".error-data").show()
            }, 100), !1) : (setTimeout(function() {
                e(".modal-lista form input[name=dataEvento]").removeClass("error"), e(".error-data").hide()
            }, 100), !0)
        }, PFTX.pages.listas.DOMReady = function() {
            PFTX.pages.listas.modalCriarLista()
        }, e(a).ready(function() {
            e.ajax({
                url: "/no-cache/profileSystem/getProfile",
                type: "GET",
                success: function(e) {
                    sessionStorage.setItem("email", e.Email), PFTX.pages.listas.getInfo(e.Email);
                    for (var t = 0; t < dataLayer.length; t++) !1 === dataLayer[t].visitorLoginState && (localStorage.setItem("allLists", ""), a.cookie = "checkout.vtex.com=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.www.cordoce.com.br; path=/;")
                }
            })
        })
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.lpNatal = new PFTX.constructor.page("lp-natal"), PFTX.pages.lpNatal.DOMReady = function() {
            e(a).on("ready", function() {
                e(".est-natal__block--banner").slick({
                    arrows: !1,
                    dots: !0
                })
            })
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("orders");
        s.DOMReady = function() {
            e("link").each(function() {
                e(this).attr("href").indexOf("bootstrap") >= 0 && e(this).remove()
            })
        }, s.ajaxStop = function() {}, i.orders = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.genius = new PFTX.constructor.page("pre-black-friday"), PFTX.pages.genius.leads = function() {
            e(".cadastreJogar").submit(function(t) {
                t.preventDefault();
                var a = e(".cadastreJogar input[name=nome]").val(),
                    o = e(".cadastreJogar input[name=email]").val(),
                    i = {
                        nome: a,
                        email: o
                    };
                if ("" != a && "" != o) e.ajax({
                    async: !0,
                    crossDomain: !0,
                    url: "/api/dataentities/JG/search?_fields=nome,email,id&_where=email=" + o,
                    headers: {
                        Accept: "application/vnd.vtex.ds.v10+json",
                        "REST-Range": "resources=0-1"
                    },
                    method: "GET",
                    success: function(t) {
                        if (1 == t.length) {
                            e('<span class="mensagem-error">Email jÃ¡ cadastrado!</span>').insertAfter(e(".pre-black-friday .login-jogo .bolinha-cadastre form input[name=email]")), PFTX.pages.genius.clearInput()
                        } else e.ajax({
                            async: !0,
                            url: "/estrela/dataentities/JG/documents/",
                            type: "PATCH",
                            contentType: "application/json",
                            data: JSON.stringify(i),
                            success: function() {
                                e('<span class="mensagem-sucess">Dados cadastrados com sucesso!</span>').insertAfter(e(".pre-black-friday .login-jogo .bolinha-cadastre form input[name=email]")), PFTX.pages.genius.start(), PFTX.pages.genius.clearInput(), PFTX.modules.cookie.set("Genius", i.email, {
                                    path: "/",
                                    expires: 3
                                })
                            },
                            error: function() {}
                        })
                    },
                    error: function(e) {}
                });
                else {
                    e('<span class="mensagem-error">Digite um email vÃ¡lido!</span>').insertAfter(e(".pre-black-friday .login-jogo .bolinha-cadastre form input[name=email]"))
                }
            })
        }, PFTX.pages.genius.clearInput = function() {
            e(".cadastreJogar input[name=nome]").val(""), e(".cadastreJogar input[name=email]").val(""), e(".jacadastrado input[name=email]").val(""), setTimeout(function() {
                e(".pre-black-friday .login-jogo .bolinha-cadastre form span").remove()
            }, 2e3)
        }, PFTX.pages.genius.start = function() {
            var t = 4,
                a = setInterval(function() {
                    t--, e(".pre-black-friday .box-contagem-regressiva").show(), e(".pre-black-friday .box-contagem-regressiva .box-numero span").text(t), t <= 0 && (clearInterval(a), e(".pre-black-friday .box-contagem-regressiva").hide(), e(".pre-black-friday .wrapper").eq(1).prepend('<div class="modal-informativo info1"><div class="box-informe"><a class="bt-fechar">X</a><div class="texto"><p>Pressione o botão do meio para iniciar o jogo!</p></div></div></div>'), e(".pre-black-friday .login-jogo .jogo-genius .block-jogo").hide())
                }, 1e3);
            e(".bt-fechar").live("click", function() {
                e(".info1").remove()
            })
        }, PFTX.pages.genius.cadastrado = function() {
            e(".bt-jogar-cadastrado").live("click", function() {
                e(".pre-black-friday .login-jogo .bolinha-cadastre .cadastreJogar input[name=nome]").remove(), e(".bt-jogar-cadastrado").remove(), e(".pre-black-friday .login-jogo .bolinha-cadastre form span").remove(), e(".pre-black-friday .login-jogo .bolinha-cadastre form").removeClass("cadastreJogar"), e(".pre-black-friday .login-jogo .bolinha-cadastre form").addClass("jacadastrado"), e(".jacadastrado").append('<input type="button" class="bt-voltar" value="Voltar" />'), e(".jacadastrado .bt-jogar").live("click", function(t) {
                    t.preventDefault();
                    var a = e(".jacadastrado input[name=email]").val(),
                        o = {
                            email: a
                        };
                    "" != a && e.ajax({
                        async: !0,
                        crossDomain: !0,
                        url: "/api/dataentities/JG/search?_fields=nome,email,id&_where=email=" + a,
                        headers: {
                            Accept: "application/vnd.vtex.ds.v10+json",
                            "REST-Range": "resources=0-1"
                        },
                        method: "GET",
                        success: function(e) {
                            1 == e.length && (PFTX.pages.genius.clearInput(), PFTX.pages.genius.start(), PFTX.modules.cookie.set("Genius", o.email, {
                                path: "/",
                                expires: 3
                            }))
                        },
                        error: function(e) {}
                    })
                })
            }), e(".bt-voltar").live("click", function() {
                e(".pre-black-friday .login-jogo .bolinha-cadastre form").removeClass("jacadastrado"), e(".pre-black-friday .login-jogo .bolinha-cadastre form").addClass("cadastreJogar"), e(".pre-black-friday .login-jogo .bolinha-cadastre .cadastreJogar").prepend('<input type="text" name="nome" placeholder="Nome" />'), e(".cadastreJogar .bt-voltar").remove(), e(".cadastreJogar").append('<input type="button" class="bt-jogar-cadastrado" value="JÃ¡ sou cadastrado!" />')
            })
        }, PFTX.pages.genius.salvandoPontos = function() {
            var a = PFTX.modules.cookie.get("Genius"),
                o = PFTX.modules.cookie.get("pontos");
            if ("" != a && "" != o) {
                var i = {
                    pontos: o
                };
                e.ajax({
                    async: !0,
                    crossDomain: !0,
                    url: "/api/dataentities/JG/search?_fields=nome,email,pontos,id&_where=email=" + a,
                    headers: {
                        Accept: "application/vnd.vtex.ds.v10+json",
                        "REST-Range": "resources=0-1"
                    },
                    method: "GET",
                    success: function(t) {
                        1 == t.length && e.ajax({
                            async: !0,
                            url: "/estrela/dataentities/JG/documents/" + t[0].id,
                            type: "PATCH",
                            contentType: "application/json",
                            data: JSON.stringify(i),
                            success: function() {
                                e(".pre-black-friday .wrapper").eq(1).prepend('<div class="modal-informativo info2"><div class="box-informe"><a class="bt-fechar">X</a><div class="texto"><p>Aguarde a atualização do ranking!</p></div></div></div>')
                            },
                            error: function() {}
                        })
                    },
                    error: function(e) {}
                })
            }
            e(".bt-fechar").live("click", function() {
                e(".info2").remove(), t.location.reload()
            })
        }, PFTX.pages.genius.ranking = function() {
            e.ajax({
                async: !0,
                crossDomain: !0,
                url: "/api/dataentities/JG/search?_fields=nome,email,pontos,id&_sort=pontos DESC",
                headers: {
                    Accept: "application/vnd.vtex.ds.v10+json",
                    "REST-Range": "resources=0-10"
                },
                method: "GET",
                success: function(t) {
                    t.sort(function(e, t) {
                        return t.pontos - e.pontos
                    });
                    for (var a = 0, o = 0; o < t.length; o++) {
                        var i = '<li><span class="posicao">' + ++a + '.</span><span class="nome">' + t[o].nome + '</span><span class="pontuacao">' + t[o].pontos + '</span><i class="fa fa-trophy"></i></li>';
                        e(".pre-black-friday .ranking .tabela-ranking ul").append(i)
                    }
                    e(".pre-black-friday .ranking .tabela-ranking ul li .pontuacao").each(function() {
                        "null" === e(this).text() && e(this).text("0")
                    })
                },
                error: function(e) {}
            })
        }, PFTX.pages.genius.playersOnline = function() {
            var a = t.io("https://instantview.profite.com.br", {
                    reconnection: !0,
                    reconnectionDelay: 2e4,
                    reconnectionDelayMax: 500,
                    reconnectionAttempts: 5,
                    transports: ["websocket"]
                }),
                o = {
                    referringSite: t.location.href,
                    page: t.location.href
                };
            a.emit("pageview", o), a.on("updated-stats", function(a) {
                var o = a.pages[t.location.href] || 1;
                e(".jogadores-online").text(o)
            })
        }, PFTX.pages.genius.DOMReady = function() {
            PFTX.pages.genius.leads(), PFTX.pages.genius.cadastrado(), PFTX.pages.genius.playersOnline(), PFTX.pages.genius.ranking(), e(".pre-black-friday .bt-fechar-jogo").live("click", function() {
                PFTX.pages.genius.salvandoPontos(), e(".box-pontuacao").remove()
            })
        }, PFTX.pages.genius.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        let i, s, n;
        PFTX.pages.product = new PFTX.constructor.page("product"), PFTX.pages.product.share = function() {
            var a = t.location.href,
                o = e("#image img").attr("src");
            PFTX.pages.common.shareWindow(a, o)
        }, PFTX.pages.product.superZoom = function(a, o) {
            t.LoadZoom = function(t) {
                if (e(".image-zoom").length <= 0) return !1;
                var i = {
                    zoomWidth: a,
                    zoomHeight: o,
                    preloadText: ""
                };
                e(".image-zoom").jqzoom(i)
            }, LoadZoom(0)
        }, PFTX.pages.product.applyRecipes = function() {
            if (e("table.group.Caracteristicas").appendTo(".tabItem.detalhes"), e(".value-field.Manual a").appendTo(".tabItem.manual").addClass("btnManual pdf"), e(".btnManual.pdf").attr("target", "_blank"), "" == !e(".value-field.Video-manual").html()) {
                var t = e(".value-field.Video-manual iframe").attr("src");
                e(".tabItem.manual").append("<a href=" + t + ' class="btnManual video" target="_self">Assista o manual</a>'), e("#image").prepend('<div class="cont_video-manual" style="display: none;"><iframe width="560" height="315" src="' + t + '" frameborder="0" allowfullscreen="" allowtransparency="true"></iframe></div>'), e(".btnManual.video").bind("click", function(t) {
                    t.preventDefault(), e("#image a").empty(), e(".cont_video-manual").fadeIn(), e(".cont_video").hide(), e(".pVideo").css("opacity", "0.5"), e(".thumbs li a").removeClass("ON"), e(this).find("a").addClass("ON"), e("html, body").animate({
                        scrollTop: 0
                    }, "slow"), e(".cont_video-manual").css("display", "block") && e("#image-main").css("display", "none")
                })
            }
        }, PFTX.pages.product.tabs = function() {
            e(".tabNav").on("click", ".tabLink", function() {
                var t = e(this).attr("data-ref");
                e(".tabLink, .tabItem").removeClass("active"), e(this).addClass("active"), e(".tabContent").find("." + t).addClass("active")
            }), e(".tabItem").each(function() {
                var t = e(this).attr("class").split(" ")[1];
                e(this).is(":empty") && e(".tabLink[data-ref='" + t + "']").css("display", "none")
            })
        }, PFTX.pages.product.produtoIndisponivel = function() {
            !1 === skuJson.available && (e("body").addClass("soldOut"), e(".boxQtd , .priceProduct").remove(), e(".buyProductButton").css({
                float: "none",
                width: "100%"
            }), e(".notifyme-title-div").html("<h3 class='notifymetitle notifyme-title'>Produto indisponÃ­vel</h3>"), e(".sku-notifyme-form").find("p").html("<p>Para ser avisado da disponibilidade deste produto, basta preencher os campos abaixo:</p>"), e(".sku-notifyme-client-name").before("<label>Nome</label>"), e(".sku-notifyme-client-email").prop("type", "email").before("<label>Email</label>"), e(".sku-notifyme-client-name:input, .sku-notifyme-client-email:input").removeAttr("placeholder"), e(".sku-notifyme-button-ok").before("<input type='checkbox' class='checkboxOferta' name='receberOfertas' >\n<label class='textCheckbox' for='receberOfertas'> Deseja receber ofertas e conteÃºdos por e-mail</label>"), e(".sku-notifyme-button-ok").attr("value", "Avise-me").text("Avise-me").before("<input class='resetForm' value='Cancelar' type='reset' >"), e(".resetForm").trigger("reset"))
        }, PFTX.pages.product.thumbVideo = function() {
            var t = e(".value-field.Video").html();
            if (t) {
                e(".apresentacao #image").append('<div class="cont_video" style="display: none;">' + t + "</div>"), e("#produto").prepend("<span class='pVideo'>Video</span>"), e("ul.thumbs").append('<li class="trigger-video" jcarouselindex="' + e(".thumbs li").length + '"><a data-index="' + e(".thumbs li").length + '" class="ON">Ver VÃ­deo</a></li>');
                e(".thumbs li a img").attr("src");
                e(".trigger-video").css({
                    background: 'url("/arquivos/thumbVideoRd.png") no-repeat center',
                    "font-size": "0"
                }), PFTX.pages.product.slickThumsVideo()
            } else PFTX.pages.product.slickThumbs();
            e("li.trigger-video, .pVideo").bind("click", function() {
                e("#image a").empty(), e(".cont_video").fadeIn(), e(".pVideo").css("opacity", "0.5"), e(".thumbs li a").removeClass("ON"), e(this).find("a").addClass("ON"), e(".cont_video").css("display", "block") && e("#image-main").css("display", "none")
            }), e(".thumbs li a, .topic input").bind("click", function() {
                e(".cont_video").fadeOut(), e(".cont_video-manual").fadeOut(), e(".pVideo").css("opacity", "1")
            })
        }, PFTX.pages.product.flagsInTab = function() {
            var t = e(".wrapperFlag").html();
            e(".tabItem .productDescription").prepend('<div class="wrapperFlag">' + t + "</div>")
        }, PFTX.pages.product.compreJunto = function() {
            "" == !e("#divCompreJunto").html() ? e("#divCompreJunto tbody tr .buy").each(function(t, a) {
                var o = e(this).text().split("R$")[2].split(" ")[1],
                    i = e(this).text().split("R$")[1].split(" ")[1],
                    s = e(this).find("strong").text().split("x")[0];
                e(this).prepend('<div class="parcelas"><span></span> sem juros</div>'), e(this).prepend('<div class="valorTotal">R$ <span></span></div>'), e(this).each(function(t, a) {
                    e(this).find(".parcelas span").text(s + "x de " + i), e(this).find(".valorTotal span").text(o)
                })
            }) : e("#divCompreJunto").parent().css("display", "none")
        }, PFTX.pages.product.selecaoModal = function() {
            var t = "";
            t = /Camiseta/i.test(e(".productName").text()) ? "tamanho" : "modelo", e("body").append('<div class="overlay" style="display: none;"></div>'), e("body").append('<div class="modal-modelo" style="display: none;">                                <div class="close-modelo"><span>x</span></div>                                Selecione um <span>' + t + "</span>                         </div>");
            var a = e("a.buy-button.buy-button-ref");
            "javascript:alert('Por favor, selecione o modelo desejado.');" == e(a).attr("href") && e(a).attr("href", ""), e(".buyProductButton > a.buy-button.buy-button-ref").on("click", function(t) {
                "" == e(a).attr("href") && (t.preventDefault(), e(".overlay").fadeIn(), e(".modal-modelo").fadeIn())
            }), e(".close-modelo, .overlay").on("click", function() {
                e(".overlay").fadeOut(), e(".modal-modelo").fadeOut()
            })
        }, PFTX.pages.product.flagFalcon = function() {
            if (100554328 == skuJson.productId && e("body").addClass("falconFlag"), e("body").hasClass("falconFlag")) {
                if (100554328 == skuJson.productId) var t = ['<div class="flagFalcon">', "<span>PrÃ©-venda - Entrega a partir de 26/07</span>", "</div>"].join(" ");
                e(".productDetails").prepend(t)
            }
        }, PFTX.pages.product.flagPreVendaJogos = function() {
            if (100553109 != skuJson.productId && "?validacaoTeste" !== t.location.search || e("body").addClass("nao-pode-rir-flag"), e("body").hasClass("nao-pode-rir-flag")) {
                var a = ['<div class="flagNaoPodeRir">', "<span>Pré-venda - Entrega a partir de 01/08</span>", "</div>"].join(" ");
                e(".productDetails").prepend(a), e(".mainProductImage .wrapperFlag").each(function() {
                    e(this).find(".flag").hasClass("tapa-certo") && e(this).find(".flag.tapa-certo").addClass("pre-venda-jogo-nao-pode-rir")
                })
            }
        }, PFTX.pages.product.flagTorak = function() {
            if (100554304 != skuJson.productId && "?validacaoTeste" !== t.location.search || e("body").addClass("torak-flag"), e("body").hasClass("torak-flag")) {
                var a = ['<div class="flagTorak">', "<span>Pré-venda - Entrega a partir de 27/08</span>", "</div>"].join(" ");
                e(".productDetails").prepend(a)
            }
        }, PFTX.pages.product.skuArray = function() {
            skuJson.skus.map(function(t, a, o) {
                t.sku;
                var i = t.dimensions["Variações"].replace(/ /g, "-"),
                    s = t.image;
                e(".Variacoes .skuList label").map(function() {
                    var t = e(this),
                        a = t.attr("class").split("skuespec_VariaÃ§Ãµes_opcao_")[1].split(" ")[0].replace(/ /g, "");
                    i == a && e(this).text().length > 3 && t.css({
                        background: "url(" + s + ") no-repeat",
                        "background-size": "contain",
                        "font-size": "0"
                    })
                })
            })
        }, PFTX.pages.product.slickThumsVideo = function() {
            e(".mainProductImage .thumbs").slick({
                infinite: !0,
                arrows: !0,
                slidesToShow: 5,
                slidesToScroll: 1,
                swipeToSlide: !0,
                focusOnSelect: !0,
                vertical: !0
            })
        }, PFTX.pages.product.slickThumbs = function() {
            e(".value-field.Video").html() || e(".mainProductImage .thumbs").slick({
                infinite: !0,
                arrows: !0,
                slidesToShow: 5,
                slidesToScroll: 1,
                swipeToSlide: !0,
                focusOnSelect: !0,
                vertical: !0
            })
        }, PFTX.pages.product.comprarJuntoBtn = function() {
            e(".comprar-junto").length > 0 && e(".comprar-junto").on("click", function(a) {
                a.preventDefault(), e(this).unbind(), t.location = e("#lnkComprar")[0].href
            })
        };
        const r = e(".mainProductInfo .buyProduct .boxQtd .quantitySelector"),
            l = r.find('input[type="number"]'),
            c = () => {
                n = !0;
                let e = parseInt(l.val());
                i = parseInt(l.val()), l.val(e + 1).change(), s = parseInt(l.val())
            },
            d = () => {
                e(".alertPdpQtdMax").fadeOut(2e3, () => {
                    e(".alertPdpQtdMax").remove(), e(".change-qtd--plus").on("click", c)
                })
            };
        PFTX.pages.product.quantity = function() {
            r[0] && (l.before('<button class="change-qtd change-qtd--minus">-</button>'), l.after('<button class="change-qtd change-qtd--plus">+</button>'), l.on("change", a => {
                t.alert = function() {}, a.preventDefault(), s = l.val(), i == s && n && e(".change-qtd--plus").after((t => {
                    const a = `\n    <div class="alertPdpQtdMax">\n      <div class="setaAlert"></div>\n      <div class="balonAlert">\n        A compra desse produto está limitado a <b>${t} unidades</b> por cliente.\n      </div>\n    </div>\n    `;
                    return e(".change-qtd--plus").off("click", c), setTimeout(d, 5e3), a
                })(s))
            }), r.find(".change-qtd--minus").click(function() {
                n = !1;
                let e = parseInt(l.val());
                e >= 1 && l.val(e - 1).change()
            }), r.find(".change-qtd--plus").on("click", c))
        }, PFTX.pages.product.imgThumbs = function() {
            e(".mainProductImage .thumbs li img").each(function(t, a) {
                var o = e(a).prop("src");
                o = o.replace("75-75", "88-88"), e(a).prop("src", o)
            })
        }, PFTX.pages.product.btnComprar = function() {
            e(".buy-in-page-button").on("click", PFTX.modules.minicart.abrindoMinicart)
        }, PFTX.pages.product.btnAddLista = function() {
            var t = '<a data-product-id="' + skuJson.productId + '" id="addProdutoLista">adicionar a lista <i class="icon-lista-shelf"></i></a>';
            e(".modelSelect").prepend(t)
        }, PFTX.pages.product.DOMReady = function() {
            PFTX.pages.product.selecaoModal(), PFTX.pages.product.share(), PFTX.pages.product.applyRecipes(), PFTX.pages.product.tabs(), PFTX.pages.product.thumbVideo(), PFTX.pages.product.superZoom(640, 640), PFTX.pages.product.flagsInTab(), PFTX.pages.product.produtoIndisponivel(), ShippingValue(), PFTX.pages.product.comprarJuntoBtn(), PFTX.pages.product.quantity(), PFTX.pages.product.imgThumbs(), PFTX.pages.product.btnComprar(), PFTX.pages.product.btnAddLista(), e(".skuSelection .topic").hasClass("numopt-1") && e(".skuSelection").hide(), "skuJson" in t && skuJson && skuJson.dimensions.length && PFTX.pages.product.skuArray(), e(".shelfCarousel .shelf ul").slick({
                dots: !1,
                arrows: !0,
                infinite: !1,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        infinite: !1,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }]
            }), setTimeout(function() {
                e(".bt.freight-btn").val("Calcular").attr("title", "Calcular"), e(".cep-busca a").text("Não sei meu CEP, quero consultar").attr("title", "Não sei meu CEP, quero consultar")
            }, 1e3), PFTX.pages.product.compreJunto(), e(".sku-selector-container .skuList label").live("click", function() {
                setTimeout(function() {
                    PFTX.pages.product.compreJunto()
                }, 1e3)
            });
            if(dataLayer[0].productEans !== undefined){
                e(".mainProductInfo .productRef").html(dataLayer[0].productEans[0]),
                e(".mainProductInfo .productRef").show();
            }
        }, PFTX.pages.product.ajaxStop = function() {
            e(".item-table").each(function(t, a) {
                var o = e(this).find(".icon-manual-video").parent("a").attr("href"),
                    i = e(this).find(".icon-pdf-manual").parent("a").attr("href").split("=")[2];
                "#" != o && "javascript:void(0);" != o || (o = e(this).find(".icon-manual-video").parent("a")).addClass("empty");
                "#" != i && "null" != i || (i = e(this).find(".icon-pdf-manual").parent("a")).addClass("empty");
                e(this).find("item-video a").hasClass("empty"), e(this).find("item-pdf a").hasClass("empty")
            })
        }
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.puzzle = new PFTX.constructor.page("puzzle"), PFTX.pages.puzzle.montaFiltro = function() {
            var t = ['<ul class="accordion-tabs-minimal">', '<li class="tab-header-and-content adulto">', '<a href="#" class="tab-link">Adulto</a>', '<div class="tab-content">', "<ul>", '<li><span><a href="/jogos/quebra-cabeca/500-pecas">500 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/1000-pecas">1000 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/2000-pecas">2000 peças</a></span></li>', "</ul>", "</div>", "</li>", '<li class="tab-header-and-content infantil">', '<a href="#" class="tab-link">Infantil</a>', '<div class="tab-content">', "<ul>", '<li><span><a href="/jogos/quebra-cabeca/12-pecas">12 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/24-pecas">24 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/30-pecas">30 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/48-pecas">48 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/60-pecas">60 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/100-pecas">100 peças</a></span></li>', '<li><span><a href="/jogos/quebra-cabeca/200-pecas">200 peças</a></span></li>', "</ul>", "</div>", "</li>", "</ul>"].join(" ");
            e(".navSidebar").prepend(t)
        }, PFTX.pages.puzzle.linkativo = function() {
            var t = location.pathname;
            e("body.puzzle .accordion-tabs-minimal .tab-content ul li a").each(function() {
                var a = e(this); - 1 !== a.attr("href").indexOf(t) && (a.addClass("link-ativo"), a.parent().parent().parent().parent().parent().addClass("tab-ativa"))
            })
        }, PFTX.pages.puzzle.tabAtivaRefresh = function() {
            setTimeout(function() {
                e("body.puzzle .accordion-tabs-minimal .tab-header-and-content").hasClass("tab-ativa") && e("li.tab-header-and-content.tab-ativa").children("a").addClass("is-active").next().addClass("is-open").show(), e(".infantil").hasClass("tab-ativa") && (e("li.tab-header-and-content.adulto").find("a").removeClass("is-active"), e("li.tab-header-and-content.adulto").find("div").removeClass("is-open").hide())
            }, 0)
        }, PFTX.pages.puzzle.DOMReady = function() {
            PFTX.pages.puzzle.montaFiltro(), PFTX.pages.puzzle.linkativo(), PFTX.pages.puzzle.tabAtivaRefresh(), e(".tab-header-and-content").show(), e(".accordion-tabs-minimal").each(function(t) {
                e(".accordion-tabs-minimal").children("li").eq(0).children("a").addClass("is-active").next().addClass("is-open").show()
            }), e(".accordion-tabs-minimal").on("click", "li > a.tab-link", function(t) {
                if (e(this).hasClass("is-active")) t.preventDefault();
                else {
                    t.preventDefault();
                    var a = e(this).closest(".accordion-tabs-minimal");
                    a.find(".is-open").removeClass("is-open").hide(), e(this).next().toggleClass("is-open").toggle(), a.find(".is-active").removeClass("is-active"), e(this).addClass("is-active")
                }
            })
        }, PFTX.pages.puzzle.ajaxStop = function() {}
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("searchEmpty");
        s.buscaVaziaTermo = function() {
            var a = t.location.search.split(/\&|\?/gi).filter(function(e, t) {
                if (-1 !== e.indexOf("ft")) return e
            })[0].split("=")[1];
            e(".text-emptySearch em").text(a)
        }, s.DOMReady = function() {
            s.buscaVaziaTermo()
        }, s.ajaxStop = function() {}, i.emptySearch = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        var i = PFTX.pages,
            s = new PFTX.constructor.page("busca");
        s.DOMReady = function() {}, s.ajaxStop = function() {}, i.search = s
    }(jQuery, window, document),
    function(e, t, a, o) {
        "use strict";
        PFTX.pages.torak = new PFTX.constructor.page("torak"), PFTX.pages.torak.slider = function() {
            e(".shelf-colecao ul").slick({
                dots: !1,
                arrows: !0,
                infinite: !1,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            })
        }, PFTX.pages.torak.modal = function() {
            e(".openModal").on("click", function() {
                e("#" + e(this).data("modal")).css("display", "block")
            }), e(".close").on("click", function() {
                e(".modal").hide()
            })
        }, PFTX.pages.torak.DOMReady = function() {
            PFTX.pages.torak.slider(), PFTX.pages.torak.modal()
        }, PFTX.pages.torak.ajaxStop = function() {}
    }(jQuery, window, document), PFTX.init();