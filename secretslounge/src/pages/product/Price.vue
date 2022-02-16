<template>
  <div class="product__price" v-if="current.length > 0">
    <div v-if="current[0].listPrice > current[0].bestPrice">
      <h4 class="list__price">
        De {{ formatMoney(current[0].listPrice, ",", ".") }}
      </h4>

      <h3 class="best__price">
        Por {{ formatMoney(current[0].bestPrice, ",", ".") }}

        <div class="installment">
          ou de {{ installments.NumberOfInstallments }}x de
          {{ formatMoney(installments.Value, ",", ".") }}
        </div>
      </h3>
    </div>
    <div v-else>
      <h3 class="best__price">
        {{ formatMoney(current[0].bestPrice, ",", ".") }}

        <div class="installment" v-if="installments.NumberOfInstallments > 1">
          ou de {{ installments.NumberOfInstallments }}x de
          {{ formatMoney(installments.Value, ",", ".") }}
        </div>
      </h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      parcel: null,
      price: null,
    };
  },
  computed: {
    ...mapGetters({
      current: "GET_SKUS",
      bestPrice: "GET_PRODUCT_BEST_PRICE",
      installments: "GET_PRODUCT_INSTALLMENTS",
    }),
  },
  data() {
    return {
      loader: false,
    };
  },
  watch: {
    bestPrice() {
      this.setPricingInfo();
    },
  },
  created() {
    this.setPricingInfo();
  },
  methods: {
    formatMoney(number, decPoint, thousandsSep) {
      if (!number || Number.isNaN(number) || !decPoint || !thousandsSep) {
        return false;
      }

      const n = !Number.isFinite(+number) ? 0 : +number;
      const decimals = 2;
      const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
      const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
      const dec = typeof decPoint === "undefined" ? "." : decPoint;
      const s = "";
      function toFixedFix(n, prec) {
        const k = 10 ** prec;
        return `${Math.round(n * k) / k}`;
      }

      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      const ss = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split(".");

      if (ss[0].length > 3) {
        ss[0] = ss[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }

      if ((s[1] || "").length < prec) {
        ss[1] = ss[1] || "";
        ss[1] += new Array(prec - ss[1].length + 1).join("0");
      }

      this.loader = true;

      return `R$ ${ss.join(dec)}`;
    },

    priceToFloat(value) {
      if (!value) return;
      if (!isNaN(value)) return value;

      return parseFloat(parseInt(value.replace(/[^0-9]/g, "")) / 100);
    },

    installment(price, parcMax, valueMin, juros) {
      if (!price || !parcMax || !valueMin) return false;

      price = this.priceToFloat(price);

      var values = {};

      parcMax = parseInt(parcMax);
      juros = parseFloat(juros);
      valueMin = parseFloat(valueMin);

      var value = price;
      var parcs = parseInt(value / valueMin);
      var item_price = void 0;
      var I = "";

      if (parcs > parcMax) {
        parcs = parcMax;
      }

      item_price = value / parcs;

      if (juros === 0 || !juros) {
        values.parc = parcs + "x";
        values.parc_number = parcs;
        values.price = this.formatMoney(item_price, ",", ".");
        values.price_number = parseFloat(item_price.toFixed(2));
        values.juros = null;

        return values;
      } else {
        //valor com juros
        I = juros / 100;
        item_price = (value * Math.pow(1 + I, parcs)) / parcs;

        values.parc = parcs + "x";
        values.parc_number = parcs;
        values.price = this.formatMoney(item_price, ",", ".");
        values.price_number = parseFloat(item_price.toFixed(2));
        values.juros = parseFloat(juros) + "% a.m";
        values.juros_number = juros;

        return values;
      }
    },

    setPricingInfo() {
      this.parcel = this.installment(this.bestPrice, 10, 50).parc;
      this.price = this.installment(this.bestPrice, 10, 50).price;
    },

    calculatePercentage(a, b) {
      const calc = +b * (a / 100);
      return calc.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.product__price {
  border-bottom: 1px solid #e0e0e0;
  padding-top: 16px;

  .list__price {
    font: normal normal 300 13px/19px "Nexa";
    letter-spacing: 0.52px;
    color: #3d2b1c;
    opacity: 0.48;
    text-align: left;
    text-decoration: line-through;
  }

  .best__price {
    font: normal normal 400 16px/19px "Nexa";
    letter-spacing: 0.48px;
    color: #3d2b1c;
    margin: 8px 0 15px 0px;
    display: flex;
  }

  .installment {
    font: normal normal 300 12px/16px "Nexa";
    margin-left: 31px;
    letter-spacing: 0.96px;
    color: #3d2b1c;
  }
  @media (max-width: 767px) {
    .best__price,
    .installment {
      text-align: center;
    }
  }
}
</style>
