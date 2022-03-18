const Methods = {
    init() {
        Methods.open();
        Methods.close();
        Methods.subMenu();
    },

    cacheSelector: {
        menu: document.querySelector('.j-header__menu'),
        menuItems: document.querySelectorAll('.j-menu__item > a'),
        btnOpen: document.querySelector('.j-main-header__left'),
        btnClose: document.querySelector('.js--close-menu'),
        btnSearch: document.querySelector('.j-search.js--search'),
        mainSearch: document.querySelector('.j-main-search'),
    },

    open() {
        const btn = Methods.cacheSelector.btnOpen;
        const menu = Methods.cacheSelector.menu;

        const btnSearch = Methods.cacheSelector.btnSearch;
        const menuSearch = Methods.cacheSelector.mainSearch;

        btn.addEventListener('click', () => {
            menu.classList.add('is--active');
            document.querySelector('body').classList.add('menu-is--open');
        });

        btnSearch.addEventListener('click', () => {
            menuSearch.classList.toggle('is--active');
        });
    },

    close() {
        const btn = Methods.cacheSelector.btnClose;
        const menu = Methods.cacheSelector.menu;

        btn.addEventListener('click', () => {
            menu.classList.remove('is--active');
            document.querySelector('body').classList.remove('menu-is--open');
        });
    },

    subMenu() {
        let items = Methods.cacheSelector.menuItems;

        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener('click', (e) => {
                if (items[i].closest('.j-menu__item').querySelector('ul') != null) {
                    e.preventDefault();
                    items[i].closest('.j-menu__item').classList.toggle('is--active');
                    document.querySelector('.j-link__middle').classList.toggle('sub--open');
                }
            })
        }
    }
};

export default {
    init: Methods.init,
}