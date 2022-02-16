import './Institutional.scss'

const main = () => {
    eventInstitutional()
}

const eventInstitutional = () => {
    
}
var scre = $(window).width();
var inst = {
    faleConosco: function() {
        $(".enviarForm").click(function() {
            function validateEmail(fcEmail) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(fcEmail);
            }

            var varN = $('#fcNome').val();
            var varE = $('#fcEmail').val();
            var varT = $('#fcTelefone').val();
            var varM = $('#fcMsg').val();
            var varA =$("#form-contact-assunto").val();

            function validate() {
                var fcEmail = $("#fcEmail").val();

                if (validateEmail(fcEmail)) {
                    enviaDados();
                } else {
                    $('#fcEmail').css('border', '1px solid #e74c3c');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
                }

                return false;
            }

            $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
            $('.box-form-msg').css('display', 'none');

            if (varN == '') {
                $('#fcNome').css('border', '1px solid #e74c3c');
                $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
            } else if (varE == '') {
                $('#fcEmail').css('border', '1px solid #e74c3c');
                $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
            } else if (varT == '') {
                $('#fcTelefone').css('border', '1px solid #e74c3c');
                $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
            } else if (varA == '') {
                $('#form-contact-assunto').css('border', '1px solid #e74c3c');
                $('#form-contact-assunto').before('<div class="box-form-msg">Escolha um assunto/div>');
            } else if (varM == '') {
                $('#fcMsg').css('border', '1px solid #e74c3c');
                $('#fcMsg').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
            } else if (varE != '') {
                validate();
            }

            function enviaDados() {
                var datos = {};
                datos.nome = varN;
                datos.email = varE;
                datos.telefone = varT;
                datos.assunto = varA;
                datos.mensagem = varM;
                $.ajax({
                    accept: 'application/vnd.vtex.ds.v10+json',
                    contentType: 'application/json; charset=utf-8',
                    crossDomain: true,
                    data: JSON.stringify(datos),
                    type: 'POST',
                    url: '/api/dataentities/FC/documents',
                    success: function success(data) {
                        $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                        $("#formRightFc h4").css("visibility", "hidden");
                        $("#formFC").html("<p id='msgSucesso'>Mensagem enviada com sucesso =)</p>");
                    },
                    error: function error(_error) {
                        console.log(_error);
                    }
                });
            }
        });
    },
    abreFechaMenuInstMobile: function() {
        if (scre <= 768){
            $('.menu-lateral-institucional h3').click(function(){
                $(this).parent().find('ul').slideToggle();
            });
        }
    },
    init: function(){
        inst.faleConosco();
        inst.abreFechaMenuInstMobile();
    }
}

inst.init();

export default main