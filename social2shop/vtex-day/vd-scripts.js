var vtexday = {
    formVtexDay: function () {
        $(".enviarForm").click(function () {
            function validateEmail(fcEmail) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(fcEmail);
            }

            var varN = $('#fcNome').val();
            var varE = $('#fcEmail').val();
            var varT = $('#fcTelefone').val();
            var varM = $('#fcEmpresa').val();
            var varC = $('#fcCnpj').val();
            var varV = $('#fcVtexId').val();

            function validate() {
                var fcEmail = $("#fcEmail").val();

                if (validateEmail(fcEmail)) {
                    enviaDados();
                } else {
                    $('#fcEmail').css('border', '1px solid #d00d0d');
                    $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
                }

                return false;
            }

            $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
            $('.box-form-msg').css('display', 'none');

            if (varN == '') {
                $('#fcNome').css('border', '1px solid #d00d0d');
                $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
            } else if (varE == '') {
                $('#fcEmail').css('border', '1px solid #d00d0d');
                $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
            } else if (varT == '') {
                $('#fcTelefone').css('border', '1px solid #d00d0d');
                $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
            } else if (varM == '') {
                $('#fcEmpresa').css('border', '1px solid #d00d0d');
                $('#fcEmpresa').before('<div class="box-form-msg">Preencha o campo Empresa</div>');
            } else if (varC == '') {
                $('#fcCnpj').css('border', '1px solid #d00d0d');
                $('#fcCnpj').before('<div class="box-form-msg">Preencha o campo CNPJ</div>');
            } else if (varV == '') {
                $('#fcVtexId').css('border', '1px solid #d00d0d');
                $('#fcVtexId').before('<div class="box-form-msg">Preencha o campo VTEX ID</div>');
            } else if (varE != '') {
                validate();
            }

            function enviaDados() {
                var datos = {};
                datos.nome = varN;
                datos.email = varE;
                datos.telefone = varT;
                datos.empresa = varM;
                datos.cnpj = varC;
                datos.vtexid = varV;
                $.ajax({
                    accept: 'application/vnd.vtex.ds.v10+json',
                    contentType: 'application/json; charset=utf-8',
                    crossDomain: true,
                    data: JSON.stringify(datos),
                    type: 'PUT',
                    url: '/api/dataentities/VD/documents',
                    success: function success(data) {
                        $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
                        $("#formRightFc h4").css("visibility", "hidden");
                        $("#formFC").html("<p id='msgSucesso'>Formulário enviado com sucesso</p>");
                        setTimeout(function(){
                            window.location.href = "";
                        }, 3000);
                    },
                    error: function error(_error) {
                        if (_error.status == 400){
                            alert('CNPJ Inválido. Por favor insira um CNPJ válido');
                        }
                    }
                });
            }
        });
    },
    init: function() {
        vtexday.formVtexDay();
    }
}
vtexday.init();