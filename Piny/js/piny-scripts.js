$(window).on("load", function () {
    $("body").addClass("loaded");
    $("body #ajaxBusy").addClass("is--hidden");
});

$(document).ready(function () {
    $(".main-product__tabs__content h2").on("click", function () {
        if (!$(this).hasClass("active")) {
            var _data = $(this).attr("data-target");
            $(".main-product__tabs__content h2").removeClass("active");
            $(".main-product__tabs__dropdown div").removeClass("active");

            $(this).addClass("active");
            $(this)
                .parents("body")
                .find(".main-product__tabs__dropdown div." + _data)
                .addClass("active");
        }
    });

    $.get(
        `/api/catalog_system/pub/products/search/?fq=productId:14140`
    ).then((response) => {
        const uso = response[0]["Modo de uso para cada tipo de pele"];
        const duvidas = response[0]["Dúvidas? Temos a resposta"];
        const formula = response[0]["Mais sobre nossa Formula e ativos"];
        const garantia = response[0]["Garantia de eficácia"];
        const tabs = $(".main-product__tabs__dropdown");

        tabs.find(".uso").html(`<p>${uso}</p>`);
        tabs.find(".duvidas").html(`<p>${duvidas}</p>`);
        tabs.find(".formula").html(`<p>${formula}</p>`);
        tabs.find(".garantia").html(`<p>${garantia}</p>`);
    });

    function send() {
        const user = {
            newsName: $("#nome").val(),
            newsEmail: $("#email").val(),
            isNewsletterOptIn: true,
        };

        $(".newsletter__container__content__form").hide();
        $("#mensagem").addClass("active");
        $("#mensagem").html("Enviando...");

        $.ajax({
            contentType: "application/json",
            data: JSON.stringify(user),
            dataType: "json",
            url: "/api/dataentities/NL/documents",
            type: "put",
            success: function (data) {
                $("#mensagem").html("Cadastro realizado com sucesso!");
            },
        });
    }
    
    $(".enviarForm").click(function() {
        function validateEmail(fcEmail) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(fcEmail);
        }

        var varN = $('#fcNome').val();
        var varE = $('#fcEmail').val();
        var varT = $('#fcTelefone').val();
        var varM = $('#fcMsg').val();

        function validate() {
            var fcEmail = $("#fcEmail").val();

            if (validateEmail(fcEmail)) {
                enviaDados();
            } else {
                $('#fcEmail').css('border', '1px solid #e74c3c');
                $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail vÃ¡lido</div>');
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

    $(document).on("submit", ".newsletter__container__content__form", function (
        e
    ) {
        e.preventDefault();
        send();
    });

    //if ($("body").hasClass("home, sobre")) {
        $(window).scroll(function () {
            $(window).scrollTop() > 30
                ? $("body").addClass("header-fixed")
                : $("body").removeClass("header-fixed");
        });
    //}

    $(document).on("click", ".mob-header__fixed__content__icon", function () {
        $(".menu-mobile").toggleClass("active");
    });

    $(document).on("click", ".close-menu", function () {
        $(".menu-mobile").toggleClass("active");
    });

    $(document).on("click", ".questions-faq li:not(.active)", function () {
        $(this).find(".questions-faq__answer").slideDown();
        $(this).addClass("active");
    });

    $(document).on("click", ".questions-faq li.active", function () {
        $(this).find(".questions-faq__answer").slideUp();
        $(this).removeClass("active");
    });

    //aumenta quantidade
    $("body").on("click", "#qtd-product .qtd-product__plus", function () {
        var qtd_Futura = parseInt($(".qtd-product__input").val()) + 1;
        var url_Passada = $("a.buy-button").attr("href");
        var finalUrl = $("a.buy-button").attr("href").split("&seller=1");
        var skuSelecionado = url_Passada.substr(0, 3);

        if (skuSelecionado == "/ch") {
            url_Atual = url_Passada.split("&qty=");
            url_Futura =
                url_Atual[0] + "&qty=" + qtd_Futura + "&seller=1" + finalUrl[1];
            $("a.buy-button").attr("href", url_Futura);
            $(".qtd-product__input").val(qtd_Futura);
            $("#calculoFrete .quantity input").val(qtd_Futura);
            // $('.glis-selected-amount').html(qtd_Futura);
        } else {
            alert("Por favor, selecione o modelo desejado");
            $(".sku-selector-container").addClass("selecione_antes");
        }
    });

    //remove qtd
    $("body").on("click", "#qtd-product .qtd-product__minus", function () {
        var campoMin = parseInt($(".qtd-product__input").val());
        if (campoMin > 1) {
            var qtd_Futura = parseInt($(".qtd-product__input").val()) - 1;
            var url_Passada = $("a.buy-button").attr("href");
            var skuSelecionado = url_Passada.substr(0, 3);

            if (skuSelecionado == "/ch") {
                url_Atual = url_Passada.split("&qty=");
                url_Futura =
                    url_Atual[0] + "&qty=" + qtd_Futura + "&seller=1&redirect=true&sc=1";
                $("a.buy-button").attr("href", url_Futura);
                $(".qtd-product__input").val(qtd_Futura);
                $("#calculoFrete .quantity input").val(qtd_Futura);
                //Ã‚ $('.glis-selected-amount').html(qtd_Futura);
            } else {
                alert("Por favor, selecione o modelo desejado");
                $(".sku-selector-container").addClass("selecione_antes");
            }
        }
    });

    $(".main-product__principal__right__image #show .thumbs").slick({
        arrows: true,
        dots: false,
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        verticalSwiping: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    vertical: false,
                    verticalSwiping: false,
                },
            },
        ],
    });
   
    

});