import Main from './modules/lancamento';

const Methods = {
    init() {
        Main.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})