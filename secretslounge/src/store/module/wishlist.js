import api from '../../services/vtex.js';

const state = {
    wishlist: null
};

const getters = {
    GET_WISHLIST: () => state.wishlist,
};

const mutations = {
    SET_WISHLIST: (state, wishlist) => {
        state.wishlist = wishlist;
    },
};

async function wishlistExists(userId) {
    const { data } = await api.get(`/api/dataentities/WL/documents/${userId}?_fields=id,wishlist`);

    if (data === '') {
        return false;
    } else {
        return data;
    }
}

async function createWishlist(userId, wishlist) {
    await api.patch('/api/dataentities/WL/documents', {
        id: userId,
        wishlist: wishlist ? wishlist : []
    });
}


const actions = {
    FETCH_WISHLIST: async ({ commit }, userId) => {


        if (userId) {
            const wishlist = await wishlistExists(userId);

            if (wishlist) {
                commit('SET_WISHLIST', wishlist.wishlist);
            }
            else {
                commit('SET_WISHLIST', []);
            }
        } else {
            commit('SET_WISHLIST', []);
        }

    },


};

export default {
    state,
    getters,
    mutations,
    actions,
};
