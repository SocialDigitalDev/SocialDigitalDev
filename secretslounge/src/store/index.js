import Vue from 'vue';
import Vuex from 'vuex';

import category from './module/category';
import product from './module/product';
import orderForm from './module/orderForm';
import wishlist from './module/wishlist';
import utils from './module/utils';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        category,
        product,
        orderForm,
        wishlist,
        utils,
    },
});
