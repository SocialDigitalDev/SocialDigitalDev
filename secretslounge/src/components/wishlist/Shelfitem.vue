<template>
  <div class="product_item">
    <div class="header_content withDiscount" v-if="listPrice > bestPrice">
      <div class="discount">
        <span
          >{{ percentalDifference(listPrice, bestPrice) }}% de desconto</span
        >
      </div>
    </div>

    <div class="product_image" v-if="image.length">
      <a :href="link" :title="name">
        <img class="img1" :src="buildImage(image, '278', '278')" :alt="name" />
      </a>
    </div>

    <div class="product_no-image" v-if="!image.length">
      <a :href="link" :title="name">
        <h2>
          PRODUTO
          <br />
          SEM IMAGEM
        </h2>
      </a>
    </div>

    <div class="product_content">
      <div class="product_name">
        <div class="product_name-items">
          <a :href="link">
            <p>{{ name }}</p>
          </a>
          <p class="brand">{{ brand }}</p>
        </div>
      </div>

      <div v-if="bestPrice > 0" class="product__prices">
        <h5 class="list__price" v-if="listPrice != bestPrice && listPrice > 0">
          {{ formatMoney(listPrice, 2, ",", ".", "R$") }}
        </h5>

        <a :href="link" class="unavaible__product" v-if="bestPrice == 0">
          Produto Indisponível
        </a>
        <div class="content" v-if="bestPrice != 0">
          <p class="brand">{{ brand }}</p>

          <a :href="link" class="best__price">
            {{ formatMoney(bestPrice, 2, ",", ".", "R$") }}
          </a>

          <h5
            class="list__price"
            v-if="listPrice != bestPrice && listPrice > 0"
          >
            {{ formatMoney(listPrice, 2, ",", ".", "R$") }}
          </h5>

          <p
            v-if="installments > 1 && bestPrice / installments > 25"
            class="payments"
          >
            ou {{ installments }}x de
            {{ formatMoney(bestPrice / installments, 2, ",", ".", "R$") }}
          </p>
        </div>
        <!-- /.best__price -->
      </div>
      <div v-else class="indisponivel">
        <p>Indisponivel</p>
      </div>

      <div class="btn__buy">
        <Addwishlist :productId="parseInt(productId)" :type="'lista'" />
      </div>
    </div>
  </div>
</template>

<script>
import Addwishlist from "../../components/Wishlist/AddwishTolist.vue";

export default {
  data() {
    return {
      isMobile: window.screen.width <= 767,
    };
  },
  props: [
    "productId",
    "skuId",
    "clusters",
    "image",
    "brand",
    "name",
    "link",
    "listPrice",
    "bestPrice",
    "stock",
    "installments",
  ],
  components: {
    Addwishlist,
  },
  methods: {
    percentalDifference(val1, val2) {
      var res = ((val2 - val1) / 100) * 100;
      return Math.floor(res.toFixed(2));
    },
    priceToFloat(value) {
      if (!value) return;
      if (!isNaN(value)) return value;
      return parseFloat(parseInt(value.replace(/[^0-9]/g, "")) / 100);
    },
    buildImage(image, width, height) {
      if (!image || !width || !height) return;

      image = image
        .toLowerCase()
        .trim()
        .replace(/~/g, "")
        .replace(/#width#/g, width)
        .replace(/#height#/g, height);

      return `https://t13724.myvtex.com/${/<img.*?src="(.*?)"/.exec(image)[1]}`;
    },
    formatMoney(number, decimals, dec_point, thousands_sep, symbol) {
      if (!number || !decimals || !dec_point || !thousands_sep || !symbol) {
        return;
      }

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

<style lang="scss" scoped>
.product_item {
  position: relative;
  max-width: 282px;
  min-height: 425px;
  margin: 0 auto;
  padding: 15px;
  background: #fff;
  border: 1px solid #84a2b430;
  border-radius: 0px 0px 8px 8px;

  .discount {
    background: #ffaf10 0% 0% no-repeat padding-box;
    border-radius: 2px;
    width: 92px;
    height: 22px;
    font: normal normal 700 8px/6px "Rubik";
    letter-spacing: 0.26px;
    color: #ffffff;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product_image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product_content {
    position: relative;
    .product_name {
      a {
        text-decoration: none;
        p {
          text-align: center;
          font: normal normal 500 12px/16px "Rubik";
          letter-spacing: 0px;
          color: #686868;
          height: 32px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .brand {
        font: normal normal 400 10px/16px "Roboto";
        letter-spacing: 0px;
        color: #84a2b4;
        text-transform: uppercase;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 15px;
      }
    }
    .btn__buy {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #fff;
      height: 100%;
      width: 100%;
      opacity: 0;
      visibility: hidden;
      padding-top: 25px;
      transition: 0.4s;

      @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        .selector {
          display: flex;
          justify-content: space-between;
          .quantity {
            width: 48%;

            p {
              text-align: left;
              font: normal normal 400 9px/15px "Roboto";
              letter-spacing: 0px;
              color: #9d9d9d;
            }

            .form__quantity {
              background: #ecf6fc 0% 0% no-repeat padding-box;
              border: 1px solid #84a2b421;
              border-radius: 8px;
              max-height: 32px;
              min-height: 32px;
              display: flex;
              position: relative;
              justify-content: space-around;
              align-items: center;

              a {
                width: 10px;
                height: 10px;
                display: flex;
                align-items: center;
                filter: brightness(0.5);
              }
              input {
                width: 30px;
                height: 20px;
                text-align: center;
                font: normal normal 700 14px/16px "Rubik";
                letter-spacing: 0.45px;
                color: #004871;
              }
            }
          }
          .price_total {
            p {
              text-align: right;
              font: normal normal 400 9px/15px "Roboto";
              letter-spacing: 0px;
              color: #9d9d9d;
            }
            span {
              font: normal normal 500 18px/33px "Rubik";
              letter-spacing: 0px;
              color: #0066ad;
            }
          }
          .sizes {
            width: 48%;
            position: absolute;
            right: 0;

            p {
              text-align: right;
              font: normal normal 400 9px/15px "Roboto";
              letter-spacing: 0px;
              color: #9d9d9d;
            }

            .content {
              background: #ecf6fc 0% 0% no-repeat padding-box;
              border: 1px solid #84a2b421;
              border-radius: 8px;
              max-height: 32px;
              min-height: 32px;
              overflow: hidden;
              position: relative;
              display: flex;
              flex-direction: column;
              cursor: pointer;
              transition: 0.5s;

              .size__selected {
                font: normal normal 700 12px/14px "Rubik";
                letter-spacing: 0px;
                color: #004871;
                text-transform: uppercase;
                height: 32px;
                min-height: 32px;
                display: flex;
                align-items: center;
                padding-left: 15px;
              }

              .size {
                width: 100%;
                background: #fff;
                display: flex;
                padding: 5px;
                justify-content: space-between;
                flex-wrap: wrap;

                li {
                  margin-bottom: 7px;
                  a {
                    width: 30px;
                    height: 30px;
                    border: 1px solid #84a2b4;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font: normal normal 500 14px/17px "Rubik";
                    letter-spacing: 0px;
                    color: #84a2b4;
                    transition: 0.4s;

                    &:hover {
                      border: 1px solid #004871;
                      color: #004871;
                      transition: 0.4s;
                    }
                  }
                }
              }

              &::before {
                content: "";
                background: url(~@assets/ico__arrow__down.svg);
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
                vertical-align: middle;
                display: inline-block;
                width: 9px;
                height: 6px;
                position: absolute;
                right: 10px;
                top: 12px;
                transform: rotate(0);
                transition: 0.3s;
              }
            }
          }
        }
        .addToCart {
          margin-top: 12px;
          background: #0066ad 0% 0% no-repeat padding-box;
          border-radius: 8px;
          height: 40px;
          font: normal normal 700 12px/14px "Rubik";
          letter-spacing: 0.38px;
          color: #ffffff;
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .wishlist {
        height: 40px;
        background: #0066ad 0% 0% no-repeat padding-box;
        color: #fff;
        &.is__favorite {
          opacity: 1;
        }
      }

      @media (max-width: 767px) {
        opacity: 1;
        visibility: visible;
        position: initial;
        padding-top: 0;
      }
    }
    .indisponivel {
      text-align: center;
      color: #ffaf10;
    }
  }
  .product__prices {
    border-top: 1px solid #84a2b430;
    padding: 10px 15px;
    min-height: 75px;
    display: flex;
    align-items: initial;
    flex-direction: column;
    justify-content: flex-end;

    .list__price {
      text-decoration: line-through;
      font: normal normal 400 10px/21px "Roboto";
      letter-spacing: 0px;
      color: #9d9d9d;
      text-align: center;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .payments {
        font: normal normal 400 12px/15px "Roboto";
        letter-spacing: 0px;
        color: #9d9d9d;
      }
      .best__price {
        font: normal normal 700 22px/33px "Rubik";
        letter-spacing: 0px;
        color: #0066ad;
      }
      .brand,
      .list__price {
        display: none;
      }
      @media (max-width: 767px) {
        justify-content: center;
        .payments {
          margin-left: 15px;
        }
      }
    }
  }

  &:hover {
    background-color: $color-brown-dark;
    transition: background-color 0.3s;
    border-color: transparent;
    border-top: 6px solid #ecf6fc;

    @media (min-width: 768px) {
      .btn__buy {
        opacity: 1;
        visibility: visible;
        transition: 0.4s;
      }
    }
  }
  @media (max-width: 767px) {
    max-width: 95%;
  }
}
</style>
