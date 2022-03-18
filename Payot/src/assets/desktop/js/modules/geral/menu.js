const Methods = {
    init() {
        Methods.showItem();
        Methods.getCollection();
    },

    showItem() {
        const item = document.querySelector('.j-header__menu nav>ul li.is--hide');
        if (jssalesChannel == "3") {
            item.classList.remove('is--hide');
        }
    },

    getItem($skulist) {
        const $numWish = 1;
        const $shelfIDHeader = "1fe83ed3-8a92-4425-89fa-a7c5604d19d1";

        $.ajax(`/buscapagina?fq=H:${$skulist}&PS=${$numWish}&sl=${$shelfIDHeader}&cc=100&sm=0&PageNumber=${$numWish}`, {
            async: !1
        }).done(function($response) {
            $(`.j-link__items--sub-product[data-cluster-id="${$skulist}"]`).html($response);
        }).fail(function(err) {
            console.log(err);
        });

    },

    getCollection() {
        const $menuShelf = document.querySelectorAll('.j-link__items--sub-product');

        $menuShelf.forEach($item => {
            let $skuId = $item.dataset.clusterId;
            Methods.getItem($skuId);
        });
    }
};

export default {
    init: Methods.init,
}