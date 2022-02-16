import api from "../../services/vtex";
import createProduct from "./utils/createProduct";
import getAllCategories from "./utils/getAllCategories";
import createFilters from "./utils/createFilters";

const perPage = 8;
const state = {
  loader: true,
  context: 'default',
  querySearch: {},
  sort: "OrderByReleaseDateDESC",
  from: 0,
  to: perPage - 1,
  perPage,
  display: "default",
  quantity: null,
  totalPages: 0,
  filters: {},
  prices: {},
  brands: {},
  empty: false,
  categorys: [],
  selecteds: [],
  products: [],
  productsTotal: 0,
  filterOpen: false,
};

const getters = {
  GET_LOADER: (state) => state.loader,

  GET_QUERY_SEARCH: (state) => state.querySearch,

  GET_CATEGORY_PERPAGE: (state) => state.perPage,

  GET_PAGINATION_FROM: (state) => state.from,

  GET_PAGINATION_TO: (state) => state.to,

  GET_PRODUCTS_TOTAL: (state) => state.productsTotal,

  GET_ORDER_BY: (state) => state.sort,

  GET_CATEGORY_DISPLAY: (state) => state.display,

  GET_CATEGORY_PRODUCTS: (state) => state.products,

  GET_SPECIFICATIONS_FILTERS: (state) => state.filters,

  GET_FILTERS_SELECTEDS: (state) => state.selecteds,

  GET_FILTERS_PRICE: (state) => state.prices,

  GET_FILTERS_BRANDS: (state) => state.brands,

  GET_FILTERS_CATEGORYS: (state) => state.categorys,

  GET_QUANTITY_PRODUCTS: (state) => state.quantity,

  GET_TOTAL_PAPES: (state) => state.totalPages,

  GET_SEARCH_EMPTY: (state) => state.empty,
  GET_FILTER_OPEN: (state) => state.filterOpen,
};

const mutations = {
  SET_LOADER: (state, loader) => {
    state.loader = loader;
  },

  SET_CONTEXT: (state, context) => {
    state.context = context;
  },
  SET_QUERY_SEARCH: (state, querySearch) => {
    state.querySearch = querySearch;
  },
  SET_PAGINATION_FROM: (state, from) => {
    state.from = from;
  },

  SET_CATEGORY_PERPAGE: (state, perPage) => {
    state.perPage = perPage;
  },

  SET_PAGINATION_TO: (state, to) => {
    state.to = to;
  },

  SET_PRODUCTS_TOTAL: (state, productsTotal) => {
    state.productsTotal = productsTotal;
  },

  SET_ORDER_BY: (state, sort) => {
    state.sort = sort;
  },
  SET_CATEGORY_DISPLAY: (state, display) => {
    state.display = display;
  },
  SET_CATEGORY_PRODUCTS: (state, products) => {
    state.products = [...state.products, ...createProduct(products)];
  },
  SET_CLEAR_PRODUCTS: (state, reset) => {
    state.products = reset;
    state.from = 0;
    state.to = state.perPage - 1;
  },
  SET_SPECIFICATIONS_FILTERS: (state, specification) => {
    state.filters = createFilters(
      Object.entries(specification),
      state.selecteds
    );
  },
  SET_FILTERS_SELECTEDS: (state, selecteds) => {
    state.selecteds = selecteds;
  },
  SET_PRICE_FILTERS: (state, prices) => {
    state.prices = prices;
  },
  SET_PRICE_BRANDS: (state, brands) => {
    state.brands = createFilters(brands, state.selecteds, "brands");
  },
  SET_FILTERS_CATEGORYS: (state, categorys) => {
    state.categorys = getAllCategories(categorys);
  },
  SET_QUANTITY_PRODUCTS: (state, quantity) => {
    state.quantity = quantity;
  },
  SET_TOTAL_PAPES: (state, pages) => {
    state.totalPages = pages;
  },

  SET_SEARCH_EMPTY: (state, empty) => {
    state.empty = empty;
  },

  SET_FILTER_OPEN: (state, filterOpen) => {
    state.filterOpen = filterOpen;
  },
};


function getParamsURL(params) {
  return new URL(window.location.href).searchParams.get(params);
}

const actions = {
  FETCH_PRODUCTS: async ({ commit }, params) => {
    console.log('148');
    console.log(params);
    commit("SET__LOADING_PAGE", true, { root: true });
    const { pathname, from, to, orderBy, filters } = params;

    console.log(filters);

    let query;

    if (state.context === 'search') {
      query = `${window.location.search
        ? window.location.search
        : `${pathname}?`
        }&_from=${from}&_to=${to}&O=${orderBy}${filters}`;
    }

    else {
      query = `${pathname}?_from=${from}&_to=${to}&O=${orderBy}${filters}`;
    }



    const { data, headers } = await api.get(
      // eslint-disable-next-line max-len
      `/api/catalog_system/pub/products/search${query}`,
    );

    const productsTotal = headers.resources.split("/")[1];

    const regex = headers.resources.split("/")[0].split("-")[1];
    const pages = window.parseInt(regex);

    commit("SET_TOTAL_PAPES", pages);

    commit("SET_PRODUCTS_TOTAL", productsTotal);

    commit("SET_CATEGORY_PRODUCTS", data);

    commit("SET__LOADING_PAGE", false, { root: true });

    commit("SET_SEARCH_EMPTY", !data.length);

    commit("SET_QUANTITY_PRODUCTS", headers.resources.split("/")[1]);
  },
  FETCH__FILTERS: async ({ commit }, querySearch) => {
    const { data } = await api.get(
      `/api/catalog_system/pub/facets/search${querySearch}`
    );

    const { CategoriesTrees, Brands, SpecificationFilters } = data;

    commit("SET_FILTERS_CATEGORYS", CategoriesTrees);

    commit("SET_PRICE_BRANDS", Brands);

    commit("SET_SPECIFICATIONS_FILTERS", SpecificationFilters);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
