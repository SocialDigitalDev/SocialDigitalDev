import AddToCart from './addToCart';

const Methods = {
    init() {
        Methods.buyInShelf();
    },

    buyInShelf() {
        var $shelf = document.querySelectorAll('.j-shelf__item');

        $shelf.forEach( $item => {
            let $cta    = $item.querySelector('.j-shelf__item-buy');

            $cta.addEventListener('click', ev => {
                ev.preventDefault();
                let $index  = $item.dataset.productId;
                let $link   = $cta.getAttribute('href');
                AddToCart.init( $index, '1', $link );
            });

        });
    }
};

export default {
    init: Methods.init
}