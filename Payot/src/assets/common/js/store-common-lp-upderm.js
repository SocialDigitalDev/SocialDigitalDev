import Main from './modules/lp-upderm';

const Methods = {
    init() {
        Main.init();       
    },   
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})