<template>
  <div class="cart">
    <a href="#" class="cart__open" @click.stop.prevent="controllerModal()">
      <i class="ico-bag"></i>

      <span class="cart__quantity">
        {{ products.length }}
      </span>
    </a>

    <div class="cart__body" :class="{ active: showModal }">
      <div class="cart__header">
        <h2 class="cart__header__title">
          <i class="ico-bag"></i>
          Minha Sacola
        </h2>

        <a
          href="#"
          class="cart__header__close"
          @click.stop.prevent="controllerModal()"
        >
          <i class="ico-close"></i>
        </a>
      </div>

      <div class="cart_inner">
        <Product v-if="products.length" />

        <Empty v-if="!products.length" />
      </div>

      <div class="cart__footer" v-if="products.length">
        <div class="cart__footer__price">
          <h3 class="price__text">Subtotal</h3>
          <h3 class="price__value">
            {{ formatMoney(price, 2, ",", ".", "R$") }}
          </h3>
        </div>

        <a href="/checkout/#/cart" class="btn btn__primary">
          Finalizar compra
        </a>
      </div>
    </div>

    <div
      class="overlay"
      :class="{ active: showModal }"
      @click.stop.prevent="controllerModal()"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Empty from "./Empty.vue";
import Product from "./Product.vue";

export default {
  components: {
    Empty,
    Product,
  },
  computed: {
    ...mapGetters({
      price: "GET_CART_VALUE",
      products: "GET_CART_PRODUCTS",
      showModal: "GET_CART_MODAL",
    }),
  },
  methods: {
    controllerModal() {
      if (window.innerWidth > 1024) {
        this.$store.commit("SET_CART_MODAL", !this.showModal);
      } else {
        window.location.href = "/checkout";
      }
    },
    formatMoney(number, decimals, dec_point, thousands_sep, symbol) {
      if (!number || !decimals || !dec_point || !thousands_sep || !symbol)
        return;

      number = `${number}`.replace(",", "").replace(" ", "");

      const n = !isFinite(+number) ? 0 : +number;
      const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
      const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
      const dec = typeof dec_point === "undefined" ? "." : dec_point;
      let s = "";
      const toFixedFix = function(n, prec) {
        const k = Math.pow(10, prec);
        return `${Math.round(n * k) / k}`;
      };

      s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split(".");
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }

      return `${symbol} ${s.join(dec)}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../../sass/utils/_icons.scss";

.cart {
  .cart__open {
    display: flex;
    align-items: center;
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid #ddede8;
    border-radius: 50%;

    /* Mobile */
    @media (max-width: 767px) {
      margin-right: 0px;
    }

    .ico-bag {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }

    .ico-cart {
      background: url(~@assets/ico-cart.svg) no-repeat center;
      width: 22px;
      height: 22px;
      background-size: 100%;
      display: inline-block;
      vertical-align: middle;
      font-size: 0;
    }

    .cart__quantity {
      width: 16px;
      height: 20px;
      position: absolute;
      top: -10px;
      right: -5px;
      background: $color-green-dark;
      padding-left: 1px;
      padding-top: 1px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      @extend %nexa-12px-white-bold;
      font-size: 10px;
    }
  }

  .cart__body {
    width: 405px;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    background: #fffcf7;
    z-index: 9;
    transform: translateX(400px);
    transition: transform 0.4s;

    /* Mobile */
    @media (max-width: 767px) {
      width: 90%;
      transform: translateX(100%);
    }

    &.active {
      transform: translateX(0);
      transition: transform 0.4s;
    }

    .cart__header {
      background: #fffcf7;
      border-bottom: 1px solid #e0e0e0;
      padding: 15px 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      /* Mobile */
      @media (max-width: 767px) {
        padding: 15px;
      }

      .cart__header__title {
        font: normal normal bold 16px/19px "Nexa";
        letter-spacing: 0.48px;
        color: #3d2b1c;

        .ico-bag {
          margin-top: -5px;
        }
      }

      .cart__header__close {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        transition: 0.4s;

        &:hover {
          border-color: #e0e0e0;
          transition: 0.4s;
        }
      }
    }

    .cart__footer {
      padding: 15px 35px;
      border-top: 1px solid #e0e0e0;

      /* Mobile */
      @media (max-width: 767px) {
        padding: 15px;
      }

      .cart__footer__price {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 0;
        margin-bottom: 20px;

        .price__text {
          font-weight: 400;
        }

        .price__value {
          font-weight: 600;
        }
      }
    }

    .btn {
      &.btn__primary {
        margin: 0 auto;
        margin-top: 30px;
      }
    }
  }
}
</style>
