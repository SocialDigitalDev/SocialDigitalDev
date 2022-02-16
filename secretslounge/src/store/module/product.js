import api from "../../services/vtex.js";

const state = {
  selected: {},
  name: null,
  code: null,
  images: [],
  skus: [],
  categoryLink: null,
  current: null,
  bestPrice: null,
  listPrice: null,
  stock: null,
  specifications: [],
  description: null,
  currentImage: 0,
  productId: null,
  skuId: null,
  colors: [],
  size: null,
  installments: null,
};

const getters = {
  GET_NAME: (state) => {
    return state.name;
  },
  GET_IMAGEMS: (state) => {
    return state.images;
  },
  GET_SKUS: (state) => {
    return state.skus;
  },
  GET_DESCRIPTION: (state) => {
    return state.description;
  },
  GET_REFERENCE: (state) => {
    return state.reference;
  },
  GET_PRODUCT_CURRENT_IMAGE: (state) => {
    return state.currentImage;
  },

  GET_PRODUCT_COLORS: (state) => {
    return state.colors;
  },
  GET_DETAILS_PRODUCT: (state) => {
    return state.detailsProduct;
  },

  GET_CURRENT_SKUS: (state) => {
    return state.current;
  },
  GET_SIZE: (state) => {
    return state.size;
  },

  GET_PRODUCT_BEST_PRICE: (state) => {
    return state.bestPrice;
  },

  GET_PRODUCT_ID: (state) => {
    return state.productId;
  },

  GET_PRODUCT_CATEGORY: (state) => {
    return state.categoryLink;
  },

  GET_PRODUCT_INSTALLMENTS: (state) => state.installments,
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_IMAGEMS: (state, images) => {
    state.images = images.map((image) => ({
      id: image.imageId,
      tag: image.imageTag,
      label: image.imageLabel,
    }));
  },
  SET_SKUS: (state, skus) => {
    state.skus = skus.map((item) => ({
      skuId: item.itemId,
      images: item.images,
      thumb: item.images ? item.images[0].imageUrl : item["Color"][0],
      stock: item.sellers[0].commertialOffer.AvailableQuantity,
      colors: item,
      sizes: item.name,
      bestPrice: item.sellers[0].commertialOffer.Price,
      listPrice: item.sellers[0].commertialOffer.ListPrice,
      quantity: 1,
      seller: 1,
    }));
  },

  SET_DESCRIPTION: (state, description) => {
    state.description = description;
  },
  SET_CODE: (state, reference) => {
    state.reference = reference;
  },
  SET_PRODUCT_CURRENT_IMAGE: (state, currentImage) => {
    state.currentImage = currentImage;
  },
  SET_PRODUCT_COLORS: (state, colors) => {
    state.colors = colors;
  },
  SET_DETAILS_PRODUCT: (state, detailsProduct) => {
    state.detailsProduct = detailsProduct;
  },

  SET_CURRENT_SKUS: (state, sku) => {
    state.current = sku;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
  },

  SET_PRODUCT_BEST_PRICE: (state, bestPrice) => {
    state.bestPrice = bestPrice;
  },

  SET_PRODUCT_ID: (state, productId) => {
    state.productId = productId;
  },

  SET_PRODUCT_CATEGORY: (state, categoryLink) => {
    state.categoryLink = categoryLink;
  },

  SET_PRODUCT_INSTALLMENTS: (state, installments) => {
    state.installments = installments;
  },
};

const actions = {
  FETCH_PRODUCT: async ({ commit }, productId) => {
    const { data } = await api.get(
      `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
    );

    let bestInstallment;
    var installments;
    let lengthItems = data[0].items.length;

    for (let index = 0; index < lengthItems; index++) {
      if (
        data[0].items[index].sellers[0].commertialOffer.Installments.length > 1
      ) {
        installments =
          data[0].items[index].sellers[0].commertialOffer.Installments;
      }
    }

    if (installments) {
      bestInstallment = installments.reduce(
        (acm, item) => {
          if (item.NumberOfInstallments > acm.NumberOfInstallments) {
            acm = item;
          }

          return acm;
        },
        { NumberOfInstallments: 0 }
      );
    }

    commit("SET_NAME", data[0].productName);
    commit("SET_PRODUCT_ID", data[0].productId);
    commit("SET_IMAGEMS", data[0].items[0].images);
    commit("SET_DESCRIPTION", data[0].description ? data[0].description : null);
    commit("SET_CODE", data[0].productReference);
    commit("SET_PRODUCT_CATEGORY", data[0].categories[0]);
    commit("SET_SKUS", data[0].items);
    commit("SET_PRODUCT_INSTALLMENTS", bestInstallment);

    if (getSpecificationByName(data[0].skuSpecifications, "Color")) {
      commit(
        "SET_PRODUCT_COLORS",
        data[0].skuSpecifications[
          getSpecificationByName(data[0].skuSpecifications, "Color")
        ].values
      );
    }

    commit(
      "SET_PRODUCT_BEST_PRICE",
      data[0].items[0].sellers[0].commertialOffer.Price
    );

    commit("SET_CURRENT_SKUS", {
      skuId: data[0].items[0].itemId,
      images: data[0].items[0].images,
      thumb: data[0].items[0].images
        ? data[0].items[0].images[0].imageUrl
        : data[0].items[0]["Color"],
      stock: data[0].items[0].sellers[0].commertialOffer.AvailableQuantity,
      colors: data[0].items[0]["Color"] ? data[0].items[0]["Color"][0] : [],
      sizes: data[0].items[0]["Tamanhos"]
        ? data[0].items[0]["Tamanhos"][0]
        : [],
      bestPrice: data[0].items[0].sellers[0].commertialOffer.Price,
      listPrice: data[0].items[0].sellers[0].commertialOffer.ListPrice,
      quantity: 1,
      seller: 1,
      buyTogether: data[0].items[0].sellers[0].commertialOffer
        .BuyTogether,
      name: data[0].productName,
      link: data[0].link,
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

function getSpecificationByName(skuSpecifications, name) {
  var filtered = skuSpecifications.map((specification, index) => {
    return {
      index,
      ...specification,
    };
  });

  filtered = filtered.filter(
    (specification) => specification.field.name == name
  );

  if (filtered.length > 0) {
    return filtered[0].index;
  }

  return false;
}
