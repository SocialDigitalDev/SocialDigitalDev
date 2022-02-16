<template>
  <div class="product__main">
    <div class="widget">
      <div class="breadcrumb">
        <slot name="breadcrumb" />
      </div>
    </div>

    <div class="product__inner">
      <div class="product__images">
        <Gallery />
      </div>

      <div class="product__aside">
        <div class="widget">
          <Name />
        </div>

        <div class="widget">
          <Price />
        </div>

        <div class="widget">
          <Description />
        </div>

        <div class="widget">
          <Selector />
        </div>

        <div class="widget">
          <Buy />
        </div>
      </div>
    </div>

    <div class="product__shelf">
      <BuyTogether />
    </div>

    <div class="product__shelf">
      <Shelf :type="'similar'" :title="'Produtos similares'" />
    </div>
  </div>
</template>

<script>
import Gallery from "./Gallery.vue";
import Name from "./Name.vue";
import Price from "./Price.vue";
import Selector from "./Selector.vue";
import Buy from "./Buy.vue";
import BuyTogether from "./BuyTogether/Index.vue";

import Description from "./Description.vue";
import Shelf from "../../components/Shelf.vue";

export default {
  data() {
    return {
      isMobile: window.screen.width <= 767,
    };
  },
  created() {
    this.$store.dispatch("FETCH_PRODUCT", skuJson.productId);
  },
  components: {
    Gallery,
    Name,
    Price,
    Selector,
    Buy,
    Description,
    Shelf,
    BuyTogether,
  },

  methods: {
    controlsIsProduction() {
      return window.location.hostname === "localhost"
        ? 1
        : window.skuJson.productId;
    },
  },
};
</script>

<style lang="scss">
.product__main {
  .breadcrumb {
    display: block;

    @media (max-width: 767px) {
      display: none;
    }
  }

  .product__inner {
    display: flex;
    justify-content: space-between;
    padding: 0px;
    margin-bottom: 63px;

    .product__images {
      width: 780px;
      @media (max-width: 767px) {
        width: 100%;
      }
    }

    .product__aside {
      width: 473px;
      padding: 50px 67px 0 67px;

      .widget {
        background: transparent;
      }

      @media (max-width: 767px) {
        padding: 0;
        width: 100%;
      }
    }
    @media (max-width: 767px) {
      padding: 50px 28px 0;
      flex-direction: column;
    }
  }

  .product__shelf {
    padding: 22px;
  }
}
</style>
