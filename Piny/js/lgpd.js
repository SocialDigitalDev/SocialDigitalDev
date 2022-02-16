var Avisolgpd = {
    createCookie: function (e, o, t) {
        var i, n;
        (n = t ? ((i = new Date()).setTime(i.getTime() + 24 * t * 60 * 60 * 1e3), "; expires=" + i.toGMTString()) : ""), (document.cookie = e + "=" + o + n + "; path=/");
    },
    readCookie: function (e) {
        for (var o = e + "=", t = document.cookie.split(";"), i = 0; i < t.length; i++) {
            for (var n = t[i]; " " == n.charAt(0); ) n = n.substring(1, n.length);
            if (0 == n.indexOf(o)) return n.substring(o.length, n.length);
        }
        return null;
    },
    mostrar: function (e) {
        e.classList.add("aberto");
    },
    remover: function (e) {
        e.remove();
    },
    aceito: function (e) {
        Avisolgpd.createCookie("privacidadeLGPD", "1", 365), document.getElementById(e).remove();
    },
};
window.onload = function () {
    var e = document.getElementById("avisolgpd"),
        o = Avisolgpd.readCookie("privacidadeLGPD");
    e &&
        (1 != o
            ? setTimeout(function () {
                  Avisolgpd.mostrar(e);
              }, 500)
            : Avisolgpd.remover(e));
};