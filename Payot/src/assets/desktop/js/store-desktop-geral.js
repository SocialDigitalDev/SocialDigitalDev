import Geral from './modules/geral';
import BuyInShelf from '../../common/js/modules/geral/buyInShelf';

const Methods = {
    init() {
        Geral.init();
        BuyInShelf.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})
