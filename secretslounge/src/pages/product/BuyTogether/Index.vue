<template>
  <div class="shelf-combo" v-if="current && current.buyTogether.length > 0">
    <div class="shelf" v-if="current.buyTogether.length > 0">
      <h3 class="shelf__title">Compre Junto</h3>

      <transition name="fade">
        <Loader :size="24" v-if="loading" />
      </transition>
      <div class="box__products">
        <div class="col" v-if="sku1">
          <Item :data="sku1" @onSelectSku="(skuId) => (currentSku1 = skuId)" />
        </div>

        <div class="product-plus">
          <p>+</p>
        </div>

        <div class="col" v-if="sku2">
          <Item :data="sku2" @onSelectSku="(skuId) => (currentSku2 = skuId)" />
        </div>

        <div class="product-plus">
          <p>=</p>
        </div>
        <div class="shelf__total" v-if="buyTogetherInfo">
          <p class="total-title">Leve 2 itens por</p>

          <div class="total-prices">
            <p class="price-old">
              {{
                formatMoney(
                  buyTogetherInfo.valueWithoutDiscout,
                  2,
                  ",",
                  ".",
                  "R$"
                )
              }}
            </p>
          </div>
          <p class="price-new">
            {{ formatMoney(buyTogetherInfo.value, 2, ",", ".", "R$") }}
          </p>

          <div v-if="selectionDone">
            <Buy :id="[currentSku1, currentSku2]" />
          </div>
          <div v-else>
            <p>Primeiro, selecione a cor e tamanho dos itens</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../services/vtex";
import { mapGetters } from "vuex";

import Loader from "../../../components/Loader.vue";
import ShelfItem from "../../../components/ShelfItem.vue";
import Buy from "./BuyTogether__Buy.vue";
import Item from "./Item.vue";
import formatMoney from "../../../utils/formatMoney";

export default {
  data() {
    return {
      loading: false,
      error: false,
      sku1: null,
      sku2: null,
      currentSku1: null,
      currentSku2: null,
      buyTogetherInfo: null,
      firstSimulationData: [],
    };
  },

  mixins: [formatMoney],

  computed: {
    ...mapGetters({
      current: "GET_CURRENT_SKUS",
    }),
    selectionDone() {
      if (this.currentSku1 && this.currentSku2) {
        return true;
      }
      return false;
    },
  },
  components: {
    Loader,
    Item,
    Buy,
  },
  created() {
    if (this.current) {
      this.startSimulation();
    }
  },
  watch: {
    current() {
      this.startSimulation();
    },
    selectionDone() {
      if (this.selectionDone) {
      }
    },
  },
  methods: {
    async startSimulation() {
      this.loading = true;
      if (this.current.buyTogether.length === 0) {
        return false;
      }

      this.getSku1(this.current.skuId);
    },

    getSku1(skuId) {
      api
        .get(`/api/catalog_system/pub/products/search/?fq=skuId:${skuId}`)
        .then(({ data }) => {
          this.loading = false;
          this.sku1 = this.mapSku(data);
          const buyTogetherId =
            data[0].items[0].sellers[0].commertialOffer.BuyTogether;
          this.getSku2(buyTogetherId);
          this.firstSimulationData = [
            ...this.firstSimulationData,
            data[0].items[0].itemId,
          ];
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },

    getSku2(skuId) {
      api
        .get(`/api/catalog_system/pub/products/search/?fq=skuId:${skuId}`)
        .then(({ data }) => {
          this.loading = false;
          this.sku2 = this.mapSku(data);
          this.firstSimulationData = [
            ...this.firstSimulationData,
            data[0].items[0].itemId,
          ];
          this.simulate();
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },

    simulate() {
      this.loading = true;
      let items;
      if (this.selectionDone) {
        items = [this.currentSku1, this.currentSku2];
      } else {
        items = this.firstSimulationData;
      }
      const simulationItems = items.map((item) => {
        return {
          id: item,
          quantity: 1,
          seller: "1",
        };
      });

      api
        .post("/api/checkout/pub/orderforms/simulation", {
          items: simulationItems,
          country: "BRA",
        })
        .then(({ data }) => {
          this.loading = false;
          this.buyTogetherInfo = {
            value:
              (data.totals[0].value +
                (data.totals[1].value ? data.totals[1].value : 0)) /
              100,
            valueWithoutDiscout: data.totals[0].value / 100,
            installments: null,
          };

          this.getProductData(this.current.buyTogether);
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },

    getProductData(ids) {
      let productsQuery = "";
      ids.forEach((id, index) => {
        const sign = index === 0 ? "?" : "&";
        productsQuery += `${sign}fq=skuId:${id}`;
      });

      api
        .get(`/api/catalog_system/pub/products/search/${productsQuery}`)
        .then(({ data }) => {
          // this.buyTogetherProducts = buyTogether;
          //this.sku2 = this.buyTogetherProducts[0];
          this.loading = false;
          return data;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },

    mapSku(data) {
      return data.map((item) => ({
        skuOptions: item.items.map((skuOption, index) => {
          return {
            index,
            skuId: skuOption.itemId,
            color: skuOption["Color"],
            size: skuOption["Size"],
            image: skuOption.images[0].imageTag,
            bestPrice: skuOption.sellers[0].commertialOffer.Price,
            listPrice: skuOption.sellers[0].commertialOffer.ListPrice,
          };
        }),
        name: item.productName,
        link: item.link,
        colors: this.getSpecificationByName(item.skuSpecifications, "Color"),
      }))[0];
    },

    getSpecificationByName(skuSpecifications, name) {
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
        return skuSpecifications[filtered[0].index].values;
      }

      return skuSpecifications[filtered[0].index].values;
    },
  },
};
</script>

<style lang="scss">
.shelf {
  margin: 50px 0;

  @media (max-width: 767px) {
    margin: 0;
  }

  .shelf__title {
    text-align: left;
    margin-bottom: 69px;
    font: normal normal bold 24px/67px "Nexa";
    letter-spacing: 7.2px;
    color: #3d2b1c;
    text-transform: uppercase;
    border-bottom: 1px solid #cecdc8;

    @media (max-width: 767px) {
      line-height: 35px;
      text-align: center;
      border: none;
    }
  }
}

.box__products {
  display: flex;

  @media (max-width: 767px) {
    display: block;
  }

  .product-plus {
    font: normal normal lighter 32px/32px "Nexa";
    display: flex;
    align-items: center;
    padding: 40px;

    @media (max-width: 767px) {
      font: normal normal lighter 48px/48px "Nexa";

      display: block;
      width: 100%;
      text-align: center;
    }
  }
}

.shelf-combo {
  .shelf__products {
    display: flex;
    height: 100%;
    vertical-align: middle;

    @media (max-width: 767px) {
      display: block;
    }
  }
}

.shelf__total {
  text-align: center;
  width: 28%;
  align-self: center;
  vertical-align: middle;
  justify-content: center;

  @media (max-width: 767px) {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;
  }

  .total-title {
    font-family: "Nexa", sans-serif;
    font-size: 24px;
    font-weight: normal;
    color: #3d2b1c;
    padding: 35px 0 20px 0;

    @media (max-width: 767px) {
      font-family: "Nexa", sans-serif;
      font-size: 24px;
      font-weight: bold;
      width: 100%;
      padding: 17px 0;
    }
  }
  .total-prices {
    display: inline-block;

    @media (max-width: 767px) {
      width: 50%;
    }

    .price-old {
      opacity: 0.8;
      text-decoration: line-through;
      color: #3d2b1c;
      font-family: "Nexa", sans-serif;
      font-size: 13px;
      font-weight: 300;
      margin-bottom: 9px;
    }

    .price-new {
      color: #3d2b1c;
      font-family: "Nexa", sans-serif;
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 20px;
    }

    .price-portion {
      color: #3d2b1c;
      font-family: "Nexa", sans-serif;
      font-size: 12px;
      font-weight: 300;
      margin-bottom: 64px;

      @media (max-width: 767px) {
        margin: 0;
      }
    }
  }

  .btn__total-combo {
    width: 100%;
    background: #dca399;
    font-family: "Nexa", sans-serif;
    font-size: 12px;
    font-weight: lighter;
    color: #ffffff;
    letter-spacing: 0.38px;
    text-transform: uppercase;
    border-radius: 20px;
    padding: 17px 0;
    border: 0;
    letter-spacing: 2px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      margin-top: 20px;
      margin-bottom: 60px;
    }
  }
}
</style>
