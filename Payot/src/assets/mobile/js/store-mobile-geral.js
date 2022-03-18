import Geral from './modules/geral';

const Methods = {
    init() {
        Geral.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})
