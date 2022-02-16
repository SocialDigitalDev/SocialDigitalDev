var forfitbox_login = {

    data: {
    },

    methods: {

        verifyLogin : function(){
            $.ajax({
                type: 'GET',
                url: '/no-cache/profileSystem/getProfile',
                success: function (data) {
                    if (data.IsUserDefined != false) {
                        window.location.href = "/";
                    };
                }
            });
        },

        fadePopup: function () {
            $('body').on('click', '.e-pre-register', function(event) {
                $('.e-popupRegister').show();
                $('body').addClass('js--no-scroll')
            });

            $('body').on('click', '.e-close', function(event) {
                $('.e-popupRegister').hide();
                $('body').removeClass('js--no-scroll')
            });

            if ( window.location.hash == '#pre-register') {
                $('.e-popupRegister').show();
                $('body').addClass('js--no-scroll')
            }
        },

        register: function() {

             // header vtex api
             var headers_vtex = {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'REST-Range': 'resources=0-300'
            };
            
            $('.e-form-register').submit(function(e) {

                var form = $(this),
                name_form = form.find('[name="name"]').val(),
                email_form = form.find('[name="email"]').val(),
                cpf_form = form.find('[name="cpf"]').val(),
                logradouro_form = form.find('[name="logradouro"]').val(),
                numero_form = form.find('[name="numero"]').val(),
                complemento_form = form.find('[name="complemento"]').val(),
                cep_form = form.find('[name="cep"]').val(),
                cidade_form = form.find('[name="cidade"]').val(),
                estado_form = form.find('[name="estado"]').val(),
                telefone_form = form.find('[name="telefone"]').val();

                var obj = {
                    name: name_form,
                    email: email_form,
                    cpf: cpf_form,
                    logradouro: logradouro_form,
                    numero: numero_form,
                    complemento: complemento_form,
                    cep: cep_form,
                    cidade: cidade_form,
                    estado: estado_form,
                    telefone: telefone_form
                };

                var storeName = 'forfitbox';
                var dataEntity = 'CU';
                //var urlSaveDatesUser = 'https://api.vtexcrm.com.br/'+storeName+'/dataentities/'+dataEntity+'/documents/';
                var urlSaveDatesUser = '/api/dataentities/CU/documents/'

                $.ajax({
                    headers: headers_vtex,
                    type: 'PATCH',
                    url: urlSaveDatesUser,
                    data: JSON.stringify(obj),
                    success: function(response) {
                        alert('Cadastrado com sucesso!');
                        
                        $('.e-to-login').trigger('click');
                        $('.e-close').trigger('click');
                        
                    },
                    error: function(error) {
                        alert('Desculpe! Houve algum erro. Tente novamente mais tarde!')
                       
                    }
                });

                return false;

            });
        },

        // formMask: function() {
        //     $('#cep').mask('99999-999');
        //     $('#telefone').mask('(99) 99999-9999');
        //     $('#estado').attr("maxlength", "2")
        //     // $("#cpf").mask('99999999999999')
        // },

        toDologin: function() {
            $('body').on('click', '.e-to-login', function(event) {
                $.ajax({
                    url: '/no-cache/profileSystem/getProfile',
                    type: 'GET',
                    success : function(data) {
                        vtexid.start({
                            returnUrl: '/account',
                            userEmail: '',
                            locale: 'pt-BR',
                            forceReload: false
                        })
                    }
                });
            }); 
        },

        init: function () {
            this.verifyLogin();
            this.register();
            this.fadePopup();
            //this.formMask();
            this.toDologin();
        },

        init_ajax: function () {
        },

        init_load: function () {
        },


    },

    ajax: function () {
        return this.methods.init_ajax();
    },

    mounted: function () {
        return this.methods.init();
    },

    loader: function () {
        return this.methods.init_load();
    },

};

$(document).ready(function () {
    forfitbox_login.mounted();
});

$(document).ajaxStop(function () {
    forfitbox_login.ajax();
});

$(window).load(function () {
    forfitbox_login.loader();
});