const Methods = {
    init() {
        Methods.share();
        Methods.countdown();
        Methods.submit();
    },

    share() {
        $('.j-box-share__list a').each(function () {
            var linkShare = $(this).attr('href');
            var linkProduto = window.location.href;
            var share = linkShare + linkProduto;

            $(this).attr('href', share);
        });
    },

    countdown() {
        var date = $(`#countdown`).attr(`data-finish`);
        $("#countdown").countdown( date , function(event) {
            $(this).html(event.strftime('<strong>%D <span>Dias</span></strong><span>:</span><strong>%H <span>Horas</span></strong><span>:</span><strong>%M <span>Minutos</span></strong>'));
        });
    },

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    cadastraNewsletter( email ) {
        var response;

        var who = {
            "email": email
        };

        $.ajax({
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json'
            },
            type: 'PUT',
            url: '/api/dataentities/LP/documents/?an=payottatix',
            data: JSON.stringify(who),
            success: function(data) {
                response = data;
                alert("E-mail cadastrado com sucesso!");
            },
            error:function(data) {
                response = data;
                alert("Aconteceu um erro ao enviar seu e-mail, por favor, tente novamente");
            }
        });
    },

    submit() {
        $('#btn-lp').live('click', function(e) {
            e.preventDefault();
        
            var infoNews = {
                email:  $('#input-email-lp').val(),
            }
        
            if( Methods.validateEmail(infoNews.email) ) {
                Methods.cadastraNewsletter( infoNews.email );
            } else {
                alert("Por favor, insira um e-mail válido");
            }
        });        
    }
};

export default {
    init: Methods.init
};