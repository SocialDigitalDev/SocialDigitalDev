import './utils/bootstrap/index'
import header from './Header/Header'
import footer from './Footer/Footer'
import './utils/roundValues'
import './utils/variantesCompraRapida'
import './utils/mmenu'
import './Global.scss'

var scre = $(window).width();

function verificaLogado (){
    $(document).one("ajaxStop", function () {
        $("header .ajax-content-loader, .atendimento-login .ajax-content-loader").each(function () {

            if ($("#login", this).length) $(this).parent().addClass("loginOff"), $("body").addClass("loginOff");
            else if (
                ($(this).parent().addClass("loginOn"),
                    $("body").addClass("loginOn"),
                    $(".ajax-content-loader").append(
                        "<div class='box-welcome'><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
                    ),
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
}


const main = () => {
    header()
    footer()

    // console.log(process.env.DB_HOST)
    console.log(process.env)

    if(scre <= 768){
        document.addEventListener(
            "DOMContentLoaded", () => {
                new Mmenu(".menu-principal");
                setTimeout(function(){
                    $('.atendimento-login').prependTo('#menuPrincipal');
                    verificaLogado();
                }, 2000);
            }
        );
    }else{
        verificaLogado();
    }
}

document.addEventListener('DOMContendLoaded', main())
