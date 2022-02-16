<template>
  <div class="product__item">
    <div class="product__image">
      <AddToWishlist :productId="productId" />

      <a :href="link" class="product__link">
        <img :src="buildImage(image, '393', '600')" :alt="name" />
        <img
          v-if="imageHover"
          class="img__hover"
          :src="buildImage(imageHover, '300', '300')"
          :alt="name"
        />
      </a>

      <div class="product__clusters">
        <span class="cluster" v-for="(cluster, index) in clusters" :key="index">
          {{ cluster }}
        </span>
      </div>
    </div>

    <div class="product__content">
      <h3 class="product__name">
        {{ name }}
      </h3>

      <div class="product__price">
        <h5 v-if="listPrice > bestPrice" class="price__list">
          {{ formatMoney(listPrice, 2, ",", ".", "R$") }}
        </h5>

        <h5 class="price__best">
          {{ formatMoney(bestPrice, 2, ",", ".", "R$") }}
        </h5>
      </div>

      <p
        v-if="installments > 1 && bestPrice / installments > 25"
        class="payments"
      >
        Em até {{ installments }}x de
        {{ formatMoney(bestPrice / installments, 2, ",", ".", "R$") }}
      </p>
    </div>
  </div>
</template>

<script>
import AddToWishlist from "./wishlist/AddToWishlist.vue";

import formatMoney from "../utils/formatMoney";
import buildImage from "../utils/buildImage";

export default {
  mixins: [formatMoney, buildImage],
  props: [
    "productId",
    "clusters",
    "name",
    "link",
    "image",
    "imageHover",
    "listPrice",
    "bestPrice",
    "installments",
  ],
  components: {
    AddToWishlist,
  },
  methods: {},
};
</script>

<style lang="scss">
.product__item {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 0 10px;

  .product__image {
    margin-bottom: 10px;
    position: relative;

    .product__link {
      position: relative;
      display: block;
      text-align: center;

      img {
        display: block;
        width: 100%;
      }

      .img__hover {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: 0.4s;
      }
    }

    .product__like {
      position: absolute;
      right: 10px;
    }

    .product__clusters {
      position: absolute;
      top: 14px;
      left: 14px;

      .cluster {
        background: #956a64;
        font: normal normal 300 10px/15px "Nexa";
        letter-spacing: 0.4px;
        color: #ffffff;
        width: 46px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        text-transform: capitalize;
        margin-bottom: 8px;
        padding-top: 3px;
      }
    }
  }

  .product__content {
    flex-grow: 1;
    .product__name {
      font: normal normal 300 12px/16px "Nexa";
      letter-spacing: 1.2px;
      color: #3d2b1c;
      text-transform: uppercase;
      overflow: hidden;
      padding: 0 10px;
      margin-top: 20px;
      text-align: center;

      @media (max-width: 767px) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: center;
      }
    }

    .product__price {
      height: 18px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 15px 0 12px 0;

      .price__list {
        text-decoration: line-through;
        font: normal normal 100 10px/14px "Nexa";
        letter-spacing: 0.4px;
        color: #3d2b1c;
        opacity: 0.48;
        margin-right: 10px;
      }

      .price__best {
        font: normal normal normal 12px/16px "Nexa";
        letter-spacing: 0.48px;
        color: #3d2b1c;
      }
    }

    .btn__bay {
      width: 100%;
      margin: 25px auto 0;
      background: #3f3948;
      transition: background 0.3s, color 0.3s;

      &:hover {
        background: #eee809;
        color: #3f3948;
        transition: background 0.3s, color 0.3s;
      }
    }

    .payments {
      text-align: center;
      font: normal normal 300 10px/14px "Nexa";
      letter-spacing: 0.8px;
      color: #3d2b1c;
    }
  }
  &:hover {
    .product__image {
      .product__link {
        .img__hover {
          opacity: 1;
          transition: 0.4s;
        }
      }
    }
  }
}
</style>
