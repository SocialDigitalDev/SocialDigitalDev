 $(".enviarForm").click(function(){

  function validateEmail(fcEmail) {     
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(fcEmail);
  }

  var varE = $('#fcEmail').val();
  var varM = $('#fcMsg').val();
  var varN = $('#fcNome').val();
  //var varT = $('#fcTelefone').val();

  function validate(){
    var fcEmail = $("#fcEmail").val();
    if (validateEmail(fcEmail)) {
      console.log("Enviado");
      enviaDados();
    } else {
      $('#fcEmail').css('border','1px solid #d00d0d');
      $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>');
      //console.log("NÃ£o Ã© valido");
    }
    return false;
  }

  $('.boxCampo input, .boxCampo textarea').css('border','1px solid #cccccc'); 
  $('.box-form-msg').css('display','none');

  if(varN == ''){
    $('#fcNome').css('border','1px solid #d00d0d');
    $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
  } else if(varE == ''){
    $('#fcEmail').css('border','1px solid #d00d0d');
    $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
  } else if(varM == ''){
    $('#fcMsg').css('border','1px solid #d00d0d');
    $('#fcMsg').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
  } else if(varE != ''){
    validate();
  }

  function enviaDados(){
    var datos = {};
    datos.email = varE;
    datos.mensagem = varM;
    datos.nome = varN;
    //datos.telefone = varT;
    //console.log("Nome: "+datos.nome+"  E-mail: "+datos.email+"  Mensagem: "+datos.mensagem);
    $.ajax({
      accept: 'application/vnd.vtex.ds.v10+json',
      contentType: 'application/json; charset=utf-8',
      crossDomain: true,
      data: JSON.stringify(datos),
      type: 'POST',
      url: '//api.vtexcrm.com.br/livrariavozes/dataentities/FC/documents',
      success: function(data) {
        console.log(data);
        $("#formFC").html("<p id='msgSucesso'>Mensagem enviada com sucesso =)</p>");
      },
      error: function(error){
        console.log(error);
      }
    });
  }

});