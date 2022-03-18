import Main from './modules/product-hml';
import ProductDetails from '../../common/js/modules/datalayer/productDetails';

const Methods = {
    init() {
        ProductDetails.init();
        Main.init();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Methods.init();
})