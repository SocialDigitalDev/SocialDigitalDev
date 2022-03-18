import Main from './modules/vitamina';

const Methods = {
    init() {
        Main.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})