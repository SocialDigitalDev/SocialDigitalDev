const main = () => {
  bodyEvent()
}

const bodyEvent = () => {
  document.querySelector('body')
    .addEventListener('click', () => {
      console.log('is body event')
    })
}
var scre = $(window).width();
var footer = {

    newsletter: function () {
        $(".newsletter-form .envia-newsletter").click(function () {

            var varN = $('.newsletter-form input.nome').val();
            var varE = $('.newsletter-form input.email').val();
            var varR = $('#recebimento').val();

            function validate() {
                var fcEmail = $(".newsletter-form input.email").val();
                if (validateEmail(fcEmail)) {
                    // console.log("Enviado");
                    enviaDados();
                } else {
                    $('.newsletter-form input.email').css('border', '1px solid #d00d0d');
                    //console.log("Nao e valido);
                }
                return false;
            }

            function validateEmail(fcEmail) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(fcEmail);
            }

            $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
            $('.box-form-msg').css('display', 'none');

            if (varN == '') {
                $('.newsletter-form input.nome').css('border', '1px solid #d00d0d');
            } else if (varE == '') {
                $('.newsletter-form input.email').css('border', '1px solid #d00d0d');
            } else if (varE != '') {
                validate();
            } else if (varR == '') {
                $('.newsletter-form .newsletterAceite').css('border', '1px solid #d00d0d');
            } else if (varR != '') {
                validate();
            }

            function enviaDados() {
                var datos = {};
                datos.nome = varN;
                datos.email = varE;
                datos.newsletterAceite = varR;
                $.ajax({
                    accept: 'application/vnd.vtex.ds.v10+json',
                    contentType: 'application/json; charset=utf-8',
                    crossDomain: true,
                    data: JSON.stringify(datos),
                    type: 'POST',
                    url: '/api/dataentities/NL/documents',
                    success: function (data) {
                        console.log(data);
                        $(".newsletter-form").html("<p id='msgSucesso'>Pronto. Em breve você receberá nossas novidades!</p>");
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }

        });
    },

    abreFechaItensFooter: function(){
        if (scre <= 980){
            $('.footer-title').click(function(){
                $(this).next('.footer-list').slideToggle();
            });
        }
    },

    init:function(){
        footer.newsletter();
        footer.abreFechaItensFooter();
    }

}
footer.init();

export default main