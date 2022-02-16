const state = {
  modal: false,
  products: [],
  value: null,
  user: {
    logged: null,
    id: null,
  },
};

const getters = {
  GET_CART_MODAL: (state) => state.modal,

  GET_CART_PRODUCTS: (state) => state.products,

  GET_CART_VALUE: (state) => state.value,

  GET_USER: (state) => state.user,
};

const mutations = {
  SET_CART_MODAL: (state, modal) => {
    state.modal = modal;
  },
  SET_CART_VALUE: (state, payload) => {
    state.value = payload.value / 100;
  },
  SET_CART_PRODUCTS: (state, products) => {
    state.products = products.map((item, index) => ({
      index,
      skuId: item.id,
      name: item.name,
      priceWithoutDiscount: item.price / 100,
      sellingPrice: item.sellingPrice / 100,
      image: item.imageUrl,
      quantity: item.quantity,
      link: item.detailUrl
    }));
  },

  SET_USER: (state, user) => {
    state.user = user;
  },
};

const actions = {
  GET_ORDER_FORM: ({ commit }) => {
    vtexjs.checkout.getOrderForm().done((orderForm) => {
      commit("SET_CART_PRODUCTS", orderForm.items);

      commit("SET_CART_VALUE", { value: orderForm.value, totalizers: orderForm.totalizers });


      commit("SET_USER", {
        logged: orderForm.loggedIn,
        id: orderForm.userProfileId,
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
