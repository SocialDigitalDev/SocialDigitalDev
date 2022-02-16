<template>
  <div class="shelf">
    <h3 class="shelf__title">
      {{ title }}
    </h3>
    <!-- /.shelf__title -->

    <div class="shelf__products">
      <Loader v-if="!products.length" />

      <Carousel
        :per-page="quantity"
        :navigationEnabled="!isMobile"
        :paginationEnabled="false"
      >
        <Slide v-for="product in products" :key="product.skuId">
          <ShelfItem
            :productId="product.productId"
            :skuId="product.skuId"
            :image="product.image"
            :clusters="product.clusters"
            :name="product.name"
            :installments="product.installments"
            :link="product.link"
            :listPrice="product.listPrice"
            :bestPrice="product.bestPrice"
            :stock="product.stock"
          />
        </Slide>
      </Carousel>
    </div>
    <!-- /.shelf__products -->
  </div>
  <!-- /.shelf -->
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

import api from "../services/vtex";
import ShelfItem from "./ShelfItem.vue";
import Loader from "./Loader.vue";

export default {
  created() {
    this.fetchCollection();
  },
  data() {
    return {
      products: [],
      isMobile: window.screen.width <= 767,
      quantity: window.screen.width <= 767 ? 2 : 4,
    };
  },
  props: ["title", "type", "collection"],
  components: {
    ShelfItem,
    Loader,
    Slide,
    Carousel,
  },
  methods: {
    makeSearchUrl(type, collection) {
      if (type === "similar") {
        // eslint-disable-next-line
        return `/api/catalog_system/pub/products/crossselling/whosawalsosaw/${
          window.location.hostname === "localhost" ? 12222 : skuJson.productId
        }`;
      }
      return `/api/catalog_system/pub/products/search/?fq=productClusterIds:${collection}`;
    },
    async fetchCollection(type, collection) {
      const { data } = await api.get(
        this.makeSearchUrl(this.type, this.collection)
      );

      this.products = data.map((product) => ({
        productId: product.productId,
        skuId: product.items[0].itemId,
        clusters: product.clusterHighlights,
        name: product.productName,
        link: product.link,
        image: product.items[0].images[0].imageTag,
        imageHover: product.items[0].images[1]
          ? product.items[0].images[1].imageTag
          : null,
        listPrice: product.items[0].sellers[0].commertialOffer.ListPrice,
        bestPrice: product.items[0].sellers[0].commertialOffer.Price,
        stock: product.items[0].sellers[0].commertialOffer.AvailableQuantity,
        installments: this.maxParcels(
          product.items[0].sellers[0].commertialOffer.Installments
        ),
      }));
    },
    maxParcels(options) {
      if (!options.length) return;

      let listArr = [];

      for (let index = 0; index < options.length; index++) {
        listArr.push(options[index].NumberOfInstallments);
      }

      return Math.max(...listArr);
    },
  },
};
</script>

<style lang="scss">
.shelf {
  margin: 145px 0;

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
      padding: 0 14px;
      text-align: center;
      border: none;
    }
  }

  .shelf__products {
    position: relative;
    min-height: 300px;

    .VueCarousel-navigation {
      button {
        width: 28px;
        height: 62px;
        background: #fdfdf9 0% 0% no-repeat padding-box !important;
        opacity: 0.45;
        font-size: 0 !important;
        position: absolute;
        top: 33%;
        display: inline-block;
        font-size: 0;
        transition: 0.4s;

        &.VueCarousel-navigation-prev {
          left: 27px;
          &::before {
            content: "";
            background-image: url(~@assets/arrow-left.svg);
            width: 21px;
            height: 18px;
            background-repeat: no-repeat;
            display: block;
            background-position: 10%;
            margin: 0 auto;
          }
        }

        &.VueCarousel-navigation-next {
          right: 27px;
          &::before {
            content: "";
            background-image: url(~@assets/arrow-rigth.svg);
            width: 21px;
            height: 18px;
            background-repeat: no-repeat;
            display: block;
            background-position: 10%;
            margin: 0 auto;
          }
        }

        &:hover {
          background-color: #fff !important;
          opacity: 1;
          transition: 0.4s;
        }
      }
    }

    .VueCarousel-dot-container {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      .VueCarousel-dot {
        display: block;
        background: #3f3948 !important;
        border-radius: 50%;
        margin-left: 10px;
        padding: 2px !important;

        &.VueCarousel-dot--active {
          background: #eee809 !important;
        }
      }
    }
  }
}
</style>
