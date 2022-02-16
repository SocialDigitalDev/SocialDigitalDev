<template>
  <div v-if="current">
    <div class="product___buy">
      <button
        class="btn btn__buy"
        v-if="current.stock"
        @click.stop.prevent="handlAddToCart"
      >
        adicionar à sacola
      </button>

      <div v-else>
        <unavailable />
      </div>
    </div>

    <div class="product__bottom">
      <span class="label-ship btn__shipping" @click="openShipping"
        >Calcular Frete</span
      >
    </div>
    <Shipping :productId="current.skuId" :quantity="1" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Unavailable from "./Unavailable.vue";
import Shipping from "./Shipping.vue";

export default {
  components: { Unavailable, Shipping },
  computed: {
    ...mapGetters({
      current: "GET_CURRENT_SKUS",
    }),
  },
  methods: {
    openShipping() {
      $(".btn__shipping").toggleClass("active");
      $(".product__shipping").toggleClass("active");
    },

    handlAddToCart() {
      this.$store.commit("SET__LOADING_PAGE", true);

      vtexjs.checkout.getOrderForm().then((orderForm) => {
        if (this.handlFilterProductInCart(orderForm.items)) {
          this.$store.commit("SET__LOADING_PAGE", false);

          return this.$notify({
            group: "app",
            type: "error",
            title: "Você já adicionou esse produto ao carrinho.",
            duration: 3500,
            ignoreDuplicates: true,
          });
        }
        vtexjs.checkout
          .addToCart(
            [
              {
                id: this.current.skuId,
                quantity: this.current.quantity,
                seller: this.current.seller,
              },
            ],
            null,
            1
          )
          .done((orderForm) => {
            this.$store.commit("SET_CART_PRODUCTS", orderForm.items);
            this.$store.commit("SET_CART_VALUE", {
              value: orderForm.value,
              totalizers: orderForm.totalizers,
            });

            this.$notify({
              group: "app",
              type: "success",
              title: "Produto adicionado ao carrinho!",
              duration: 3500,
              ignoreDuplicates: true,
            });

            this.$store.commit("SET__LOADING_PAGE", false);
          });
      });
    },
    handlFilterProductInCart(products) {
      if (!products) return;

      const filtered = products.filter((product) => {
        return product.id == this.current.skuId;
      });

      return filtered.length ? true : false;
    },
  },
};
</script>

<style lang="scss">
.product__disabled {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid #84a2b421;

  .disabled-box {
    width: 100%;
    padding: 16px;
    border: 1px solid #cecdc8;
    border-left: 3px solid #dd4f44;
    background: white;
    border-radius: 3px;
    font-family: "Nexa";
    font-weight: 300;
    font-size: 12px;
    margin-bottom: 20px;

    p {
      color: #dd4f44;
      padding-bottom: 12px;

      span {
        color: #3d2b1c;
      }
    }
  }

  .btn__notify {
    width: 390px;
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
      width: 100%;
    }
  }
  .form__row {
    width: 100%;
    margin-bottom: 20px;

    .label-form {
      font: normal normal 300 12px/16px "Nexa";
      display: block;
      margin-bottom: 5px;
    }

    .field {
      width: 100%;
      background: #fff;
      padding: 15px;
      color: black;
      border-radius: 20px;
      font-family: "Nexa", sans-serif;
      font-size: 12px;
      font-weight: 300;

      @media (max-width: 767px) {
        margin-top: 5px;
      }

      &:disabled {
        height: 48px;
        background: #efefef 0% 0% no-repeat padding-box;
        font: normal normal 400 14px/56px "Roboto";
        letter-spacing: 0px;
        color: #757575;
        opacity: 0.8;
      }
    }
  }
}

.product___buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 27px;
  padding-bottom: 20px;

  .product__quantity {
    width: 80px;
    height: 34px;
    border: 1px solid #84a2b421;
    background: #fff0% 0% no-repeat padding-box;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .form__controls {
      .field {
        font-family: "Rubik", sans-serif;
        font-size: 14px;
        font-weight: bold;
        border: none;
        text-align: center;
        width: 30px;
        height: 32px;
        color: #dca399;
        background: #fff0% 0% no-repeat padding-box;
      }

      .quantity-minus {
        display: block;
        color: #dca399;
        font-size: 14px;
        font-weight: bold;
        position: relative;
        top: -1px;
        right: -5px;
      }

      .quantity-plus {
        display: block;
        color: #dca399;
        font-size: 14px;
        font-weight: bold;
        position: relative;
        top: -2px;
        left: -5px;
      }
    }
  }

  .btn__buy {
    width: 390px;
    background-color: #dca399;
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

    transition: background-color 0.25s;

    &:hover {
      background: #956a64;
    }
    &:active {
      background: #956a64;
    }

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .product__quantity {
      margin-bottom: 30px;
    }
  }
}

.product__bottom {
  border-top: 1px solid #cecdc8;
  //   display: flex;
  font-size: 12px;
  justify-content: space-between;
  font-family: "Nexa";
  font-weight: 300;
  padding: 0px;
  justify-content: center;

  span {
    &:first-child {
      cursor: pointer;
      &:before {
        content: "";
        background: url("~@assets/hanger.svg") no-repeat center 39%;
        padding: 10px;
        margin: -10px 10px;
      }
    }

    &:last-child {
      cursor: pointer;
      &:before {
        content: "";
        background: url("~@assets/ico-truck.svg") no-repeat center 39%;
        padding: 10px;
        margin: -10px 10px;
      }

      &.active {
        font-weight: 700;
      }
    }
  }
}
</style>
