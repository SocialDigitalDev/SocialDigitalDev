$(document).ready(function () {
    setTimeout(function () {
        document.getElementById('lead-modal').classList.add('is-visible');
        document.getElementById('lead-overlay').classList.add('is-visible');
    }, 2000);

    document.getElementById('close-btn').addEventListener('click', function () {
        document.getElementById('lead-modal').classList.remove('is-visible');
        document.getElementById('lead-overlay').classList.remove('is-visible');
        
    });
    document.getElementById('lead-overlay').addEventListener('click', function () {
        document.getElementById('lead-modal').classList.remove('is-visible');
        document.getElementById('lead-overlay').classList.remove('is-visible');
    });

    function inputHandler(masks, max, event) {
        var c = event.target;
        var v = c.value.replace(/\D/g, '');
        var m = c.value.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks[m]);
        c.value = VMasker.toPattern(v, masks[m]);
    }
    
    var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
    var tel = document.querySelector('#leadTelefone');
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
    
    var IsEmail = function(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email.trim());
      }
    $('#send-btn').on('click', function(){
    
        var	txtEmail = $('#leadEmail').val().trim();
        var txtNome = $('#leadNome').val().trim();
        var txtNascimento = $('#leadNascimento').val().trim();
        var txtTelefone = $('#leadTelefone').val().trim();
    
        if (txtEmail == '') {            
        	$('#leadEmail').focus();
        }else if (!IsEmail(txtEmail)) {
            $('#leadEmail').val("Por favor preencha um e-mail válido");
            $('#leadEmail').focus();
        }else if (txtNome == '') {
            $('#leadNome').focus();
        }else if (txtNascimento == '') {
            $('#leadNascimento').focus();    
        }else if (txtTelefone == '') {
            $('#leadTelefone').focus();    
        } else {
            $('#send-btn').html('Aguarde...');    
            var apiUrl = '/api/dataentities/PH/documents';
            var fields = {
                Email: txtEmail,
                Nome: txtNome,
                Nascimento: txtNascimento,
                Telefone: txtTelefone
            };
    
            $.ajax({
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'						
                },
                'url': apiUrl,
                'async' : false,
                'crossDomain': true,
                'type': 'PUT',
                'data': JSON.stringify(fields)    
            }).success(function(data) {				    	
                $('#send-btn').hide();		    	
                $('.lead-modal-send-btn.success').show();                        
                document.getElementById('lead-modal').classList.remove('is-visible');
                document.getElementById('lead-overlay').classList.remove('is-visible');

            }).fail(function(data) {
                $('#send-btn').remove();		    	
                $('.lead-modal-send-btn.fail').html('Tentar de Novo');
                $('.lead-modal-send-btn.fail').attr('id', 'send-btn');
                $('.lead-modal-send-btn.fail').show();
            });				    
        }
    });
});