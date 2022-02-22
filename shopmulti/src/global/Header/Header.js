const main = () => {
    bodyEvent()
}

const bodyEvent = () => {
    document.querySelector('body')
        .addEventListener('click', () => {
            //console.log('is body event')
        })
}
var scre = $(window).width();
var header = {
    topBarFrete: function() {
        document.addEventListener('DOMContentLoaded', function(){
            var minimumCart = 150;
            vtexjs.checkout.getOrderForm()
            .done(function(orderForm) {
              var progBar = document.querySelector('.prog-bar');
              var p = document.querySelector('#bar-prog p');
              var int = orderForm.value;
              var tmp = int+'';
              tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
              if( tmp.length > 6 )
                  tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
          
              var value = tmp.substring(0, tmp.length - 3);
              if (value < minimumCart) {
                  var perc = (value * 100 ) / minimumCart;
                  progBar.style.width = perc+"%";
                  var tmp = int+'';
                  tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
                  if( tmp.length > 6 )
                      tmp = tmp.replace(/([0-9]{3}).([0-9]{2}$)/g, "$1.$2");
                      //console.log(tmp);
                      //console.log(perc);
                  var newValue = minimumCart - parseFloat(tmp);
                  newValue = newValue.toFixed(2).replace('.',',');
                  p.innerHTML = "FALTAM R$ "+newValue+" PARA VOCÊ GANHAR FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
              } else {
                  progBar.style.width = "100%";
                  p.innerHTML = "PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
              }
            });
            $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
            //   if (orderForm.value == 0) {
            //     var date = new Date();
            //     date.setTime(date.getTime() + (1*24*60*60*1000));
            //     expires = "; expires=" + date.toUTCString();
            //     document.cookie = "sellerSelected=" + ""  + expires + "; path=/";
            //   }
                var progBar = document.querySelector('.prog-bar');
                var p = document.querySelector('#bar-prog p');
                var int = orderForm.value;
                var tmp = int+'';
                tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
                if( tmp.length > 6 )
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
          
                var value = tmp.substring(0, tmp.length - 3);
                if (value < minimumCart) {
                    var perc = (value * 100 ) / minimumCart;
                    progBar.style.width = perc+"%";
                    var tmp = int+'';
                    tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
                    if( tmp.length > 6 )
                        tmp = tmp.replace(/([0-9]{3}).([0-9]{2}$)/g, "$1.$2");
                        //console.log(tmp);
                        //console.log(perc);
                    var newValue = minimumCart - parseFloat(tmp);
                    newValue = newValue.toFixed(2).replace('.',',');
                    p.innerHTML = "FALTAM R$ "+newValue+" PARA VOCÊ GANHAR FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
                } else {
                    progBar.style.width = "100%";
                    p.innerHTML = "PARABÉNS! VOCÊ GANHOU FRETE GRÁTIS. <span>*Promoção válida para as regiões Sul e Sudeste.</span>";
                }
            });
        });
    },
    abreFechaBusca: function() {
        $('.busca-topo__busca-container .icon-search').click(function(){
            $('fieldset.busca').toggleClass('busca-open');
        });
    },
    abreFechaMinicart: function() {
        $('.header-cart .icon-cart').click(function(){
            $('.header-minicart, .minicart__overlay').addClass('open');
        });
        $('.header-minicart-close, .header-minicart-empty button').click(function(){
            $('.header-minicart, .minicart__overlay').removeClass('open');
        });
    },
    abreFechaMenuHamgurguer: function() {
        $('.menu-departamento, .btn-menu-mobile').click(function(){
            $('.menu-hamburger').addClass('menu-open');
        });
        $('.close-menu').click(function(){
            $('.menu-hamburger').removeClass('menu-open');
        });
    },
    verificaLogado: function(){
        $(document).one("ajaxStop", function () {
            $("header .ajax-content-loader, footer .user-login .ajax-content-loader").each(function () {
        
                if ($("#login", this).length) $(this).parent().addClass("loginOff"), $("body").addClass("loginOff");
                else if (
                    ($(this).parent().addClass("loginOn"),
                        $("body").addClass("loginOn"),
                        // $(".ajax-content-loader").append(
                        //     "<div class='box-welcome'><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
                        // ),
                        $("body").hasClass("loginOn"))
                ) {
                    $("p.welcome em").remove();
                    var e = $("p.welcome").html();
                    (e = e.replace(/ /g, "").replace("Olá", "").replace(".", "")), $("p.welcome").html("Olá" + e);
                    // $('.welcome').prependTo($('.box-welcome'),
                    $('.welcome').addClass('logado');
                    var nameEmail = $('.logado').text();
                    var treatNameEmail = nameEmail.split('@');
                    var finalNameEmail = treatNameEmail[0];
                    $('.logado').text(finalNameEmail);
                    $('header .welcome.logado').append('<a class="sair-logout" href="/no-cache/user/logout">Logout</a>');
                    $('.menu-hamburger .link-help').append('<a class="sair-logout" href="/no-cache/user/logout">Logout</a>');
                }
        
                $('body').on('click', function (e) {
                    if (document.getElementsByClassName('.user-name__account')[0] ? !document.getElementsByClassName('.user-name__account')[0].contains(e.target) : 0)
                        $('.box-welcome').removeClass('ativo');
                });
                $(".user-name__account").click(function () {
                    $('.box-welcome, .welcome').toggleClass('ativo');
                });
            });
        });
    },
    mobileCopiarHtmlLogin: function() {
        if (scre <= 500){
            var mobileLoginHtml = $('.user-login').clone();
            $('.menu-hamburger .menu-custom .menu-head').prepend(mobileLoginHtml);
            $('.header-user-links .user-login').wrap('<a href="/_secure/account"></a>');
        }
    },
    init: function(){
        // header.topBarFrete();
        header.abreFechaBusca();
        header.abreFechaMinicart();
        header.abreFechaMenuHamgurguer();
        header.verificaLogado();
        header.mobileCopiarHtmlLogin();
    }
}
header.init();

export default main