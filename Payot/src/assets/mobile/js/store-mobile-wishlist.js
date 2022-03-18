import Main from './modules/wishlist';

const Methods = {
    init() {
        Main.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})