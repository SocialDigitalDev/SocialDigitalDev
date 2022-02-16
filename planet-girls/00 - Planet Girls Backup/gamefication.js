 // Criação da função de Cookie Management
// // Setar Cookie
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
// // Buscar Cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// // Apagar Cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
// Gamefication
var gamefication = {
    quizSettings: function(){
            
        setTimeout(function(){
            $('#quiz').quiz({
            counterFormat: 'Questão %current de %total',
            resultsFormat: '%score /%total',
            nextButtonText: 'Próximo',
            finishButtonText: 'Finalizar',
            restartButtonText: 'Reiniciar',
            questions: [
                {
                'q': 'Qual o nome verdadeiro da Lexa?',
                'options': [
                    'Lexa Cristina Fonseca',
                    'Léa Cristina Lexa Araújo da Fonseca',
                    'Lexa Araújo',
                    'Léa Araújo da Fonseca'
                ],
                'correctIndex': 1,
                'correctResponse': 'Certa Resposta Migs. Começou bem',
                'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                },
                {
                'q': 'Qual a última campanha da Lexa com a Planet Girls?',
                'options': [
                    'Lexa coleção de inverno',
                    'Lexa coleção de verão',
                    'Lexa coleção de outono',
                    'Lexa coleção de primavera'
                ],
                'correctIndex': 0,
                'correctResponse': 'Certa Resposta Migs. Continue assim!',
                'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                },
                {
                'q': 'Em que dia, mês e ano Franciny Ehlke nasceu?',
                'options': [
                    '20 de agosto de 2000',
                    '15 de maio de 1995',
                    '16 de abril de 1999',
                    '15 de março de 1999'
                ],
                'correctIndex': 3,
                'correctResponse': 'Certa Resposta Migs. Continue assim!',
                'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                },
                {
                'q': 'Qual o signo da Franciny Ehlke?',
                'options': [
                    'Leão',
                    'Libra',
                    'Peixe',
                    'Aquário'
                ],
                'correctIndex': 2,
                'correctResponse': 'Certa Resposta Migs. Quase lá!',
                'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                },
                {
                'q': 'Quando a Franciny Ehlke começou o seu canal?',
                'options': [
                    '2016',
                    '2014',
                    '2012',
                    '2018'
                ],
                'correctIndex': 0,
                'correctResponse': 'Certa Resposta Migs. Parabéns!',
                'incorrectResponse': 'Ah que pena. Resposta Incorreta Migs.'
                }
            ]
            });
            $('#quiz-results-screen').prepend('<p class="show-results">Clique e veja se ganhou</p>').append('<p class="fechar-game">Fechar</p>');
            $('.show-results').click(function(){
                $('#quiz-results').html(`
                    <p class="message-show success">
                        Parabéns Migs! Você ganhou um brinde<br/>
                        Utilize o cupom abaixo em compras a partir de R$99,99 no site e resgate seu brinde.
                        <span class="cupom-show">PLANETBRINDE</span>
                    </p>
                `);
            });
            // CONFIGURAÇÃO DO DISPARO DO MODAL COM COOKIE MANAGEMENT
            var retrieveCookie = getCookie('gameficationOff');
            if (!retrieveCookie) {
                $('.lightbox').css('display','block');
                $('html').addClass('no-scroll');
            }else{
                $('.lightbox').css('display','none');
                $('html').removeClass('no-scroll');
            }

            $('.close-button, .fechar-game').click(function(){
                setCookie('gameficationOff','true', 1);
                $('.lightbox').css('display','none');
                $('html').removeClass('no-scroll');
            });
        }, 3000);
    },
    purpurinaQuiz: function(){
        var colour = "random", // or "#000000"
        sparkles = 50,
        x = 400,
        ox = 400,
        y = 300,
        oy = 300,
        swide = 800,
        shigh = 600,
        sleft = 0,
        sdown = 0,
        tiny = [],
        star = [],
        starv = [],
        starx = [],
        stary = [],
        tinyx = [],
        tinyy = [],
        tinyv = [];

        function sparkle() {
        var c;
        if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
            ox = x;
            oy = y;
            for (c = 0; c < sparkles; c++) if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y + 1) + "px";
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour == "random") ? newColour() : colour;
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
        for (c = 0; c < sparkles; c++) {
            if (starv[c]) update_star(c);
            if (tinyv[c]) update_tiny(c);
        }
        setTimeout(sparkle, 40);
        }

        function update_star(i) {
        if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
        if (starv[i]) {
            stary[i] += 1 + Math.random() * 3;
            starx[i] += (i % 5 - 2) / 5;
            if (stary[i] < shigh + sdown) {
                star[i].style.top = stary[i] + "px";
                star[i].style.left = starx[i] + "px";
            } else {
                star[i].style.visibility = "hidden";
                starv[i] = 0;
                return;
            }
        } else {
            tinyv[i] = 50;
            tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
            tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
            tiny[i].style.width = "2px";
            tiny[i].style.height = "2px";
            tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
            star[i].style.visibility = "hidden";
            tiny[i].style.visibility = "visible";
        }
        }

        function update_tiny(i) {
        if (--tinyv[i] == 25) {
            tiny[i].style.width = "1px";
            tiny[i].style.height = "1px";
        }
        if (tinyv[i]) {
            tinyy[i] += 1 + Math.random() * 3;
            tinyx[i] += (i % 5 - 2) / 5;
            if (tinyy[i] < shigh + sdown) {
                tiny[i].style.top = tinyy[i] + "px";
                tiny[i].style.left = tinyx[i] + "px";
            } else {
                tiny[i].style.visibility = "hidden";
                tinyv[i] = 0;
                return;
            }
        } else tiny[i].style.visibility = "hidden";
        }

        function mouse(e) {
        if (e) {
            y = e.pageY;
            x = e.pageX;
        } else {
            set_scroll();
            y = event.y + sdown;
            x = event.x + sleft;
        }
        }

        function set_scroll() {
        if (typeof (self.pageYOffset) == 'number') {
            sdown = self.pageYOffset;
            sleft = self.pageXOffset;
        } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
            sdown = document.body.scrollTop;
            sleft = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            sleft = document.documentElement.scrollLeft;
            sdown = document.documentElement.scrollTop;
        } else {
            sdown = 0;
            sleft = 0;
        }
        }

        function set_width() {
        var sw_min = 999999;
        var sh_min = 999999;
        if (document.documentElement && document.documentElement.clientWidth) {
            if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
            if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
        }
        if (typeof (self.innerWidth) == 'number' && self.innerWidth) {
            if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
            if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
        }
        if (document.body.clientWidth) {
            if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
            if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
        }
        if (sw_min == 999999 || sh_min == 999999) {
            sw_min = 800;
            sh_min = 600;
        }
        swide = sw_min;
        shigh = sh_min;
        }

        function createDiv(height, width) {
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.height = height + "px";
        div.style.width = width + "px";
        div.style.overflow = "hidden";
        return div;
        }

        function newColour() {
        var c = [];
        c[0] = 255;
        c[1] = Math.floor(Math.random() * 256);
        c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
        c.sort(function () {
            return (0.5 - Math.random());
        });
        return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
        }

        $(document).mousemove(mouse);
        $(window).resize(set_width);
        $(window).scroll(set_scroll);
        $(document).ready(function () {
        if (document.getElementById) {
            var i, rats, rlef, rdow;
            for (i = 0; i < sparkles; i++) {
                rats = createDiv(3, 3);
                rats.style.visibility = "hidden";
                rats.style.zIndex = "99999999";
                $(".lightbox").append(tiny[i] = rats);
                starv[i] = 0;
                tinyv[i] = 0;
                rats = createDiv(5, 5);
                rats.style.backgroundColor = "transparent";
                rats.style.visibility = "hidden";
                rats.style.zIndex = "99999999";
                rlef = createDiv(1, 5);
                rdow = createDiv(5, 1);
                $(rats).append(rlef);
                $(rats).append(rdow);
                rlef.style.top = "2px";
                rlef.style.left = "0px";
                rdow.style.top = "0px";
                rdow.style.left = "2px";
                $(".lightbox").append(star[i] = rats);
            }
            set_width();
            sparkle();
        }
        });
    },
    init: function(){
        gamefication.quizSettings();
        gamefication.purpurinaQuiz();
    }
}
gamefication.init();