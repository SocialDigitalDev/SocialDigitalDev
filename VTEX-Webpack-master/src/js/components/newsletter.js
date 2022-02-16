$(document).ready(function(){
	function sendNewsletter() {
		var user = {
			"firstName": $("#nome").val(),
			"email":$("#email").val(),
			"isNewsletterOptIn": true
		}

		$('#mensagem').html(`
			<div class="c-message__content">
				<div class="c-message__content-success">
					<span class="title">Enviando...</span>
				</div>
			</div>
		`);

		$.ajax({
			url: '/api/dataentities/NW/documents',
			type: 'put',
			dataType: 'json',
			contentType: 'application/json',
			success: function (data) {
				$('#mensagem').html(`
					<div class="c-message__content">
						<div class="c-message__content-success">
						<span class="title"><strong>Obrigado por se cadastrar na [Nome da Loja]</strong></span>
						<span class="text">Em breve entraremos em contato com você para oferecer as melhores promoções.</span>
						</div>
					</div>
					`
				);
			},
			data: JSON.stringify(user)
		});
	}

	document.querySelector(".c-news__form").addEventListener("submit", event => {
		event.preventDefault()
		sendNewsletter()
	})
})