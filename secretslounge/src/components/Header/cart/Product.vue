<template>
  <div class="products__cart">
    <div
      class="product__small"
      v-for="product in products"
      :key="product.index"
      :class="{ loading: loading }"
    >
      <div class="product__image">
        <a :href="product.link">
          <img
            class="product__img"
            :src="resizeImage(product.image)"
            :alt="product.name"
          />
        </a>
      </div>
      <!-- /.product__image -->

      <div class="product__content">
        <h4 class="product__name">
          <a :href="product.link" :title="product.name">{{
            limitLetter(product.name, 35)
          }}</a>
        </h4>
        <!-- /.product__name -->

        <div class="product__actions">
          <form class="product__aquantity">
            <div class="widget">
              <a
                @click.stop.prevent="
                  quantityUpdated(product.index, product.quantity, 'minus')
                "
              >
                <i class="ico ico-minus"> - </i
                ><!-- /.ico.ico-minus -->
              </a>
            </div>
            <!-- /.widget -->

            <div class="widget">
              <input
                type="text"
                name="quantity"
                v-model="product.quantity"
                disabled
                class="form__field"
              />
            </div>
            <!-- /.widget -->

            <div class="widget">
              <a
                @click.stop.prevent="
                  quantityUpdated(product.index, product.quantity, 'plus')
                "
              >
                <i class="ico ico-plus"> + </i
                ><!-- /.ico.ico-plus -->
              </a>
            </div>
            <!-- /.widget -->
          </form>
          <!-- /.product__aquantity -->

          <div v-if="product.priceWithoutDiscount > product.sellingPrice">
            <div
              class="product__price --strike"
              v-if="product.priceWithoutDiscount > product.sellingPrice"
            >
              De
              {{ formatMoney(product.priceWithoutDiscount, 2, ",", ".", "R$") }}
            </div>
            <h5 class="product__price">
              Por {{ formatMoney(product.sellingPrice, 2, ",", ".", "R$") }}
            </h5>
          </div>

          <div v-else>
            <h5 class="product__price">
              {{ formatMoney(product.sellingPrice, 2, ",", ".", "R$") }}
            </h5>
          </div>
          <!-- /.product__price -->
        </div>
        <!-- /.product__actions -->
      </div>
      <!-- /.product__content -->

      <div class="product__remove">
        <a class="btn__remove" @click.stop.prevent="removeItem(product.index)">
          <i class="ico-delete"> </i> </a
        ><!-- /.btn__remove -->
      </div>
      <!-- /.product__remove -->
    </div>
    <!-- /.product__small -->
  </div>
  <!-- /.products__cart -->
</template>

<script>
import { mapGetters } from "vuex";

import formatMoney from "../../../utils/formatMoney";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      products: "GET_CART_PRODUCTS",
    }),
  },
  mixins: [formatMoney],
  methods: {
    removeItem(itemIndex) {
      this.$store.commit("SET__LOADING_PAGE", true);

      vtexjs.checkout
        .removeItems([
          {
            index: itemIndex,
            quantity: 0,
          },
        ])
        .done((orderForm) => {
          this.$store.commit("SET_CART_PRODUCTS", orderForm.items);
          this.$store.commit("SET_CART_VALUE", {
            value: orderForm.value,
            totalizers: orderForm.totalizers,
          });
          this.$store.commit("SET__LOADING_PAGE", false);
        });
    },
    quantityUpdated(index, quantity, tapy) {
      let lastQuantity;
      if (tapy === "plus") {
        lastQuantity = quantity;
      }
      quantity = tapy === "plus" ? quantity + 1 : quantity - 1;
      this.$store.commit("SET__LOADING_PAGE", true);

      vtexjs.checkout
        .updateItems(
          [
            {
              index,
              quantity,
            },
          ],
          null,
          false
        )
        .done((orderForm) => {
          this.$store.commit("SET_CART_PRODUCTS", orderForm.items);
          this.$store.commit("SET_CART_VALUE", {
            value: orderForm.value,
            totalizers: orderForm.totalizers,
          });

          if (lastQuantity === orderForm.items[index].quantity) {
            this.$notify({
              group: "app",
              type: "error",
              title: `Temos apenas ${lastQuantity} produto(s) em estoque`,
              duration: 2000,
              ignoreDuplicates: true,
            });
          }

          this.$store.commit("SET__LOADING_PAGE", false);
        });
    },
    resizeImage(url) {
      if (!url) return;
      return url.replace("-55-55", "-150-150");
    },
    limitLetter(str, max_qtd) {
      if (!str || !max_qtd) return "";
      return str.length > max_qtd
        ? `${str.substring(0, max_qtd)} ...`
        : str.substring(0, max_qtd);
    },
  },
};
</script>

<style lang="scss">
.products__cart {
  height: calc(95vh - 200px);
  overflow-y: auto;
  padding: 0 35px;

  /* Mobile */
  @media (max-width: 767px) {
    padding: 0 15px;
  }

  .product__remove {
    position: absolute;
    top: 16px;
    right: 0;
    width: 32px;
    height: 32px;
    .btn__remove {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      &:hover {
        background: #f5efe6;
        .ico-delete {
          background: url(~@assets/ico-dump--red.svg) no-repeat center;
        }
      }
    }
  }

  .product__small {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;

    &.loading {
      opacity: 0.15;
      pointer-events: none;
    }

    .product__image {
      width: 80px;
      margin-right: 8px;
      display: flex;
      align-items: center;

      .product__img {
        border: 1px solid #e0e0e0;
      }
    }

    .product__content {
      width: 215px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-left: 10px;
      align-items: center;

      /* Mobile */
      @media (max-width: 767px) {
        width: 190px;
        height: 130px;
      }

      .product__name {
        font-size: 12px;
        color: #000000;
        font-weight: 500;
        letter-spacing: 0.5px;
        width: 80%;
        a {
          color: inherit;
        }

        /* Mobile */
        @media (max-width: 767px) {
          width: 90%;
        }
      }

      .product__actions {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 19px;

        .product__price {
          font-size: 12px;
          &.--strike {
            text-decoration: line-through;
            font-weight: normal;
          }
        }

        .product__aquantity {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .form__field {
            width: 35px;
            height: 35px;
            color: #000;
            font-size: 12px;
            border: 2px solid #e7b2a5;
            text-align: center;
            font-weight: 600;
            margin: 0 10px;
            padding: 0;
            border-radius: 20px;
          }

          .ico {
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: block;
            font-size: 0;
            font-style: normal;

            transition: transform 0.25s;
            &:hover {
              transform: scale(1.5);
            }
            &:active {
              transform: scale(1);
            }

            &::after {
              font-weight: bold;
              position: relative;
            }

            &.ico-minus {
              color: #3d2b1c;
              &::after {
                content: "-";
                font-size: 20px;
                left: 9px;
                top: -1px;
              }
            }

            &.ico-plus {
              color: #3d2b1c;

              &::after {
                content: "+";
                font-size: 18px;
                left: 7.5px;
                top: 2px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
