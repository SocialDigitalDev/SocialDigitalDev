import Main from './modules/wishlist';

const Methods = {
    init() {
        Main.init();
        Methods.closeLogin();
    },

    closeLogin() {
        $(window).load(function(){
            $('button.close.vtexIdUI-close').on('click', function () {
                window.history.go(-1);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})