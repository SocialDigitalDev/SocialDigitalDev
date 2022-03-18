const Methods = {
	init() {
        Methods.renderStructure();
        Methods.openFilter();
        Methods.closeFilter();     
    },
    
    renderStructure() {
        const categoryOrder = document.querySelector('.orderBy');
        const wrapperOrder = document.querySelector('.j-filter__mobile-order');

        wrapperOrder.innerHTML += categoryOrder.innerHTML;
    },

    openFilter() {
        const btn = document.querySelector('.j-filter__mobile-btn');
        const menu = document.querySelector('.j-category__filter');

        btn.addEventListener('click', () => {
            menu.classList.add('is--active');
        });
    },

    closeFilter() {
        const btn = document.querySelector('.j-category__filter-close');
        const menu = document.querySelector('.j-category__filter');

        btn.addEventListener('click', () => {
            menu.classList.remove('is--active');
        });
    }
};

export default {
	init: Methods.init,
}