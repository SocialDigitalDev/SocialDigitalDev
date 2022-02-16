import api from "../../services/vtex";

const state = {
  menuOpen: false,
  isMobile: false,
  loadingPage: false,
  loggedIn: null,
  firstName: null,
  categories: [],
  login: false,
};

const getters = {
  GET__MENU_OPEN: (state) => state.menuOpen,
  GET__IS_MOBILE: (state) => state.isMobile,
  GET__LOADING_PAGE: (state) => state.loadingPage,
  GET__USER_IS_LOGGED: (state) => state.loggedIn,
  GET__USER_NAME: (state) => state.firstName,
  GET__CATEGORIES: (state) => state.categories,
  GET__MODAL_LOGIN: (state) => state.login,
};

const mutations = {
  SET__MENU_OPEN: (state, value) => {
    state.menuOpen = value;
  },
  SET__LOADING_PAGE: (state, value) => (state.loadingPage = value),
  SET__IS_MOBILE: (state, value) => (state.isMobile = value),
  SET__USER_IS_LOGGED: (state, user) => (state.loggedIn = user),
  SET__USER_NAME: (state, firstName) => (state.firstName = firstName),
  SET__MODAL_LOGIN: (state, login) => (state.login = login),

  SET__CATEGORIES: (state, categories) => {
    state.categories = categories;
  },
};

const actions = {
  FETCH__IS_MOBILE: ({ commit }) => {
    commit("SET__IS_MOBILE", window.innerWidth < 768);
    window.addEventListener("resize", () =>
      commit("SET__IS_MOBILE", window.innerWidth < 768)
    );
  },

  FETCH__USER: async ({ commit }) => {
    const { data } = await api.get("/no-cache/profileSystem/getProfile");
    commit("SET__USER_IS_LOGGED", data.IsUserDefined);
    commit("SET__USER_NAME", data.IsUserDefined ? data.FirstName : null);
  },

  FETCH__CATEGORIES: async ({ commit }) => {
    const { data } = await api.get("/api/catalog_system/pub/category/tree/3/");
    commit(`SET__CATEGORIES`, data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
