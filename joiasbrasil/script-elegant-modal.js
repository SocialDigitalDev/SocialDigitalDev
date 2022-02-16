// Function to open Modal when the page finishes loading (with time to display animation)


// Click event function to open modal (active)
// $(".btn-modal").on("click", function() {
//     $(".mask").addClass("active"); //Finds .mask class and adds the active class
// });

// Função para fechar o modal.
function closeModal() {
    $(".mask").removeClass("active"); //Remove the active class
}

// Function to close the modal screen
$(".close, .mask").on("click", function() {
    closeModal();
});

// or the keyboard (esc)
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var retrieveCookie = getCookie('cookiePopUp');
if (!retrieveCookie) {
    setTimeout(function() {
        $(".mask").addClass("active");
    }, 5);
    $('.elegant-modal').addClass('active');
} else {
    $('.elegant-modal').removeClass('active');
}

$('.close').click(function() {
    setCookie('cookiePopUp', 'true', 1);
    $('.elegant-modal').removeClass('active');
});