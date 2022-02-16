<template>
  <div class="shell">
    <div class="category__header">
      <div class="breadcrumb">
        <slot name="breadcrumb" />
      </div>
      <div class="header__content">
        <h1 class="category__title" v-if="context === 'default'">
          {{ categoryName }}
        </h1>
        <h1 class="search__title" v-if="context === 'search'">
          Você buscou por:
          <span class="search__title__term">“{{ searchTerm }}”</span>
        </h1>
        <div class="header__order">
          <Order />
          <Display v-if="context === 'default'" />
        </div>

        <div class="toggleFiltersMobile" v-if="context == 'default'">
          <div class="btn__rounded" @click="setFilterOpen(true)">
            <span>Filtrar</span>
            <i class="ico-filter"></i>
          </div>
        </div>
      </div>
    </div>

    <Empty v-if="empty" />

    <div class="category__body">
      <aside class="aside__category" v-if="context === 'default'">
        <div class="filtersContainer" :class="{ open: filterOpen }">
          <div
            class="filtersContainer__overlay"
            @click="setFilterOpen(false)"
          ></div>
          <div class="inner">
            <div class="filtersContainer__close" @click="setFilterOpen(false)">
              <i class="ico-close"></i>
            </div>
            <h3 class="title">Filtrar por</h3>
            <div class="cols">
              <div class="col">
                <Filters
                  v-for="(filter, index) in filters"
                  :key="index"
                  :filters="filter.filters"
                  :title="filter.title"
                />
              </div>
            </div>
            <div class="filtersContainer__submit">
              <div class="btn__rounded" @click="setFilterOpen(false)">
                Aplicar filtros
              </div>
            </div>
            <div
              class="filtersContainer__clean"
              @click="removeAllFiltersSelected"
            >
              Limpar tudo
            </div>
          </div>
        </div>
      </aside>
      <div
        class="category__content"
        :class="{ '--search': context === 'search' }"
      >
        <div class="header__selecteds">
          <selecteds />
        </div>
        <div class="category__products" :class="`--display-${display}`">
          <div class="cols">
            <ShelfItem
              v-for="product in products"
              :key="product.skuId"
              :productId="product.productId"
              :skuId="product.skuId"
              :image="product.image"
              :clusters="product.clusters"
              :name="product.name"
              :link="product.link"
              :listPrice="product.listPrice"
              :bestPrice="product.bestPrice"
              :stock="product.stock"
            />
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ShelfItem from "../../components/ShelfItem.vue";

import Order from "./Order.vue";
import Display from "./Display.vue";
import Filters from "./Filters.vue";

import Selecteds from "./Selecteds.vue";
import Pagination from "./Pagination.vue";
import Empty from "./Empty.vue";

export default {
  props: {
    context: {
      type: String,
      default: "default",
    },
  },

  computed: {
    ...mapGetters({
      querySearch: "GET_QUERY_SEARCH",
      from: "GET_PAGINATION_FROM",
      to: "GET_PAGINATION_TO",
      orderBy: "GET_ORDER_BY",
      display: "GET_CATEGORY_DISPLAY",
      products: "GET_CATEGORY_PRODUCTS",
      loader: "GET_LOADER",
      filters: "GET_SPECIFICATIONS_FILTERS",
      selecteds: "GET_FILTERS_SELECTEDS",
      quantity: "GET_QUANTITY_PRODUCTS",
      filterOpen: "GET_FILTER_OPEN",
      empty: "GET_SEARCH_EMPTY",
    }),
  },
  components: {
    ShelfItem,
    Order,
    Display,
    Filters,

    Selecteds,
    Pagination,
    Empty,
  },
  watch: {
    selecteds(selecteds) {
      const { tapy, link } = selecteds.length
        ? selecteds[selecteds.length - 1]
        : [];

      const pathname = selecteds.length
        ? link
        : this.getLevelCategory(window.location.pathname);

      this.$store.commit("SET_CLEAR_PRODUCTS", []);  
      this.$store.commit("SET_QUERY_SEARCH", {
        pathname,
        from: this.from,
        to: this.to,
        orderBy: this.orderBy,
        filters: this.createQuerySearchSpecification(selecteds),
      });
    },
    orderBy(orderBy) {
      const { pathname, from, to } = this.querySearch;

      this.$store.commit("SET_CLEAR_PRODUCTS", []);

      this.$store.commit("SET_QUERY_SEARCH", {
        pathname,
        from,
        to,
        orderBy,
        price: this.createQuerySearchPrice(this.selecteds),
      });
    },
    to() {
      const { pathname } = this.querySearch;

      this.$store.commit("SET_QUERY_SEARCH", {
        pathname,
        from: this.from,
        to: this.to,
        orderBy: this.orderBy,
        price: this.createQuerySearchPrice(this.selecteds),
      });
    },
    querySearch(parems) {
      console.log(">>>>> querySearch parems");
      console.log(parems);
      this.$store.commit("SET_CONTEXT", this.context);
      this.$store.dispatch("FETCH_PRODUCTS", {
        pathname: window.location.pathname,
        from: this.from,
        to: this.to,
        orderBy: this.orderBy,
        filters: this.createQuerySearchSpecification(this.selecteds),
      });
      this.$store.dispatch("FETCH__FILTERS", parems.pathname);
    },
  },
  data() {
    return {
      categoryName: this.getCategoryName(),
      // eslint-disable-next-line no-undef
      searchTerm: vtxctx.searchTerm,
    };
  },
  created() {
    this.$store.commit("SET_QUERY_SEARCH", {
      pathname: this.getLevelCategory(window.location.pathname),
      from: this.from,
      to: this.to,
      orderBy: this.orderBy,
    });

    if (this.context === "search") {
      this.$store.commit("SET_CATEGORY_DISPLAY", "search");
    }
  },
  methods: {
    getLevelCategory(pathname) {
      if (window.location.hostname === "localhost") {
        pathname = "/feminino";
      }

      const path = pathname.replace(/^\/|\/$/g, "").split("/");

      const level = path.map(() => "c");

      return `${pathname}?map=${level.join(",")}`;
    },
    getCategoryName() {
      return window.vtxctx ? window.vtxctx.categoryName : "Feminino";
    },
    createQuerySearchPrice(filters) {
      const prices = filters.filter((filter) => filter.tapy === "price");

      const querySearch = prices.map((price) => `&fq=P:${price.map}`);

      return querySearch.join("");
    },
    createQuerySearchSpecification(filters) {
      const querySearch = filters.map((spec) => `&fq=${spec.map}:${spec.name}`);
      return querySearch.join("");
    },
    setFilterOpen(state) {
      this.$store.commit("SET_FILTER_OPEN", state);
    },
    removeAllFiltersSelected() {
      this.$store.commit("SET_FILTERS_SELECTEDS", []);
    },
  },
};
</script>

<style lang="scss">
@import "@sass/base/_typography.scss";
@import "@sass/utils/_variables.scss";

.category__header {
  padding: 90px 0 0;
  margin-bottom: 32px;
  @media (min-width: 1024px) {
    display: flex;
    padding: 48px 0 0;
    align-items: center;
    justify-content: space-between;
  }
  @media (min-width: 1024px) {
    margin-bottom: 66px;
  }

  .header__order {
    display: flex;

    @media (max-width: 1023px) {
      margin-top: 32px;
    }
    .header__buttons {
      border-left: 1px solid #f5f5f5;
      padding: 0 10px;
      display: flex;

      .btn-cols-2 {
        background: url("~@assets/button-4.svg") no-repeat center center;
        padding: 10px;
        appearance: none;
        border: none;

        &.active {
          background: url("~@assets/button-4-active.svg") no-repeat center
            center;
        }
      }

      .btn-cols-3 {
        background: url("~@assets/button-3.svg") no-repeat center center;
        padding: 10px 20px;
        appearance: none;
        border: none;

        &.active {
          background: url("~@assets/button-3-active.svg") no-repeat center
            center;
        }
      }
    }
  }

  .header__content {
    width: 1026px;
    max-width: 100%;
    background: none;
    padding-top: 20px;

    @media (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
    }

    .category__title {
      font-family: "Nexa";
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      @media (min-width: 768px) {
        padding-left: 90px;
      }

      @media (min-width: 1024px) {
        margin-right: 12px;
      }
    }
  }
}

.category__body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 32px 0;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }

  .aside__category {
    width: 235px;

    .title {
      font: normal normal 400 14px/24px "Nexa";
      padding-bottom: 12px;
    }

    .widget {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDExIDE0Ij4NCiAgPHRleHQgaWQ9Il8iIGRhdGEtbmFtZT0i74GnIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyKSIgZmlsbD0iIzdiNGEyYyIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkZvbnRBd2Vzb21lNVByby1MaWdodCwgJ0ZvbnQgQXdlc29tZSBcMzUgIFBybyciIGZvbnQtd2VpZ2h0PSIzMDAiIGxldHRlci1zcGFjaW5nPSIwLjAzZW0iPjx0c3BhbiB4PSIwIiB5PSIwIj7vgac8L3RzcGFuPjwvdGV4dD4NCjwvc3ZnPg0K")
        no-repeat 93% 19px;
      transition: transform 0.3s;

      &.open {
        transition: transform 0.3s;

        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMSIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDExIDE0Ij4NCiAgPHRleHQgaWQ9Il8iIGRhdGEtbmFtZT0i74GoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyKSIgZmlsbD0iIzdiNGEyYyIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkZvbnRBd2Vzb21lNVByby1MaWdodCwgJ0ZvbnQgQXdlc29tZSBcMzUgIFBybyciIGZvbnQtd2VpZ2h0PSIzMDAiIGxldHRlci1zcGFjaW5nPSIwLjAzZW0iPjx0c3BhbiB4PSIwIiB5PSIwIj7vgag8L3RzcGFuPjwvdGV4dD4NCjwvc3ZnPg0K")
          no-repeat 93% 19px;

        .widget__head {
          &:before {
            transform: rotate(0deg);
            transition: transform 0.3s;
          }
        }

        .category__title {
          @media (min-width: 768px) {
            padding-left: 90px;
          }
        }
        .widget__body {
          max-height: 270px;
          transition: max-height 0.3s;
        }
      }

      .widget__head {
        color: #3d2b1c;
        font: normal normal 300 16px/24px "Nexa";
        padding: 16px 0 16px 0;
        display: block;
        margin-bottom: 5px;
        position: relative;

        &:before {
          content: "";
          position: absolute;
          right: 10px;
          top: 53%;
          height: 1px;
          transform: rotate(-90deg);
          width: 8px;
          // background: $black-light;
          transition: transform 0.3s;
        }
      }
      .category__title {
        font-family: "Nexa";
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .category__body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 32px 0;
        &:after {
          content: "";
          position: absolute;
          height: 1px;
          right: 10px;
          top: 53%;
          transform: rotate(0);
          width: 8px;
          // background: $black-light;
        }
      }

      .widget__body {
        max-height: 0;
        transition: all 0.8s;
        overflow: auto;

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar {
          width: 3px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          // background-color: $gray-dark;
        }

        &.Tamanhos {
          display: block;
          flex-wrap: wrap;
          text-transform: uppercase;

          .checkbox {
            margin: 8px 14px 16px 0;
            display: flex;

            .field {
              appearance: none;
              align-items: center;

              &:before {
                content: "";
                width: 20px;
                height: 20px;
                background: url("~@assets/square-check.svg") no-repeat;
                padding: 1px 8px;
              }

              &:checked {
                &:before {
                  background: url("~@assets/square-checked.svg") no-repeat;
                }
              }
            }

            .label {
              font-family: "Nexa";
              color: #3d2b1c;
              font-weight: 300;
              font-size: 14px;
              display: block;
              margin: -3px -22px;
              padding-top: 1px;
              text-transform: capitalize;
              padding-left: 26px;
            }
          }
        }

        &.Tipo {
          display: block;
          flex-wrap: wrap;

          .checkbox {
            margin: 8px 14px 16px 0;
            display: flex;

            .field {
              appearance: none;
              align-items: center;

              &:before {
                content: "";
                width: 20px;
                height: 20px;
                background: url("~@assets/square-check.svg") no-repeat 1px 4px;
                padding: 1px 8px;
              }

              &:checked {
                &:before {
                  background: url("~@assets/square-checked.svg") no-repeat 1px
                    4px;
                }
              }
            }

            .label {
              font-family: "Nexa";
              color: #3d2b1c;
              font-weight: 300;
              font-size: 14px;
              display: block;
              margin: 0 -22px;
              padding-top: 1px;
              padding-left: 26px;
            }
          }
        }

        &.Cor {
          display: block;
          flex-wrap: wrap;

          .checkbox {
            margin: 8px 14px 16px 0;
            display: inline-block;

            .Chocolate {
              appearance: none;
              display: flex;
              align-items: center;

              &:before {
                content: "";
                width: 20px;
                height: 20px;
                background: black;
                padding: 1px 8px;
                border-radius: 20px;
                border: 2px solid transparent;
              }

              &:checked {
                &:before {
                  border: 2px solid #dca399;
                }
              }
            }

            .Preto {
              appearance: none;
              display: flex;
              align-items: center;

              &:before {
                content: "";
                width: 20px;
                height: 20px;
                background: #3d2b1c;
                padding: 1px 8px;
                border-radius: 20px;
                border: 2px solid transparent;
              }

              &:checked {
                &:before {
                  border: 2px solid #dca399;
                }
              }
            }

            label {
              display: none;
            }
          }
        }
      }
    }
  }

  .category__content {
    width: 1026px;
    max-width: 100%;

    &.--search {
      width: 100%;
      padding-left: 0;
    }

    @media (min-width: 768px) {
      flex-shrink: 1;
      padding-left: 90px;
    }

    .category__products {
      .cols {
        display: flex;
        flex-wrap: wrap;
        @media (min-width: 1024px) {
          margin: 0 -12px;
        }
      }
      .product__item {
        width: 50%;
        padding: 0 12px;
        margin-bottom: 42px;
      }
      &.--display-secondary {
        .product__item {
          width: 100%;
          @media (min-width: 1024px) {
            width: 33%;
          }
        }
      }
      &.--display-search {
        .product__item {
          width: 50%;
          @media (min-width: 1024px) {
            width: 25%;
          }
        }
      }
    }

    .products__pagination {
      margin-bottom: 82px;
    }
  }
}
.filtersContainer {
  &__close,
  &__clean,
  &__overlay,
  &__submit {
    display: none;
  }
}

.toggleFiltersMobile {
  display: none;
  @media (max-width: 767px) {
    display: block;
    margin-top: 24px;
    .btn__rounded {
      font-size: 14px;
      i {
        margin-left: 12px;
      }
    }
  }
}

.filtersContainer {
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    z-index: 20;
    background: rgba(61, 43, 28, 0.85);
    top: 0;
    left: 0;
    height: 100vh;

    visibility: hidden;
    opacity: 0;
    transition: all 0.25s;

    .inner {
      opacity: 0;
      transform: translateX(-25%);
      transition: all 0.25s;
    }
    &.open {
      visibility: visible;
      opacity: 1;
      .inner {
        opacity: 1;
        transform: translateX(0%);
        transition: all 0.25s 0.1s;
      }
    }

    .title {
      display: none;
    }

    .filtersContainer__overlay {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .filtersContainer__close {
      cursor: pointer;
      display: block;
      margin-bottom: 24px;
    }

    .filtersContainer__clean {
      display: block;
      font-weight: 300;
      margin-top: 24px;
      font-size: 10px;
      text-align: center;
      text-decoration: underline;
      letter-spacing: 0.04em;
      color: $color-brown;
    }

    .filtersContainer__submit {
      display: block;
      .btn__rounded {
        height: 40px;
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
        margin-top: 24px;
      }
    }

    .inner {
      width: 75%;
      height: 100%;
      overflow-y: auto;
      background: #fff;
      padding: 24px 5% 80px 5%;
    }
  }
}

.search__title {
  color: #3d2b1c;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  flex-grow: 1;
  @media (min-width: 768px) {
    font-size: 16px;
  }
}
.search__title__term {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.3em;
  margin-left: 8px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
}
</style>
