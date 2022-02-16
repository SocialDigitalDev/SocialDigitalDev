<template>
  <div class="select-order">
    <p>Ordenar por:</p>
    <select
      class="select"
      name="select"
      v-model="orderBy"
      @change="changeOrderBy()"
    >
      <option value="OrderByTopSaleDESC">Mais vendidos</option>
      <option value="OrderByPriceASC">Menor Preço</option>
      <option value="OrderByPriceDESC">Maior Preço</option>
      <option value="OrderByReviewRateDESC">Melhores avaliações</option>
      <option value="OrderByNameASC">A - Z</option>
      <option value="OrderByNameDESC">Z - A</option>
      <option value="OrderByReleaseDateDESC">Data de lançamento</option>
      <option value="OrderByBestDiscountDESC">Melhor Desconto</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      orderBy: null,
    };
  },
  created() {
    this.orderBy = this.getParamsURL("O")
      ? this.getParamsURL("O")
      : this.sorting;
  },
  computed: {
    ...mapGetters({
      sorting: "GET_ORDER_BY",
    }),
  },
  methods: {
    changeOrderBy() {
      this.$store.commit("SET_ORDER_BY", this.orderBy);
    },
    getParamsURL(params) {
      return new URL(window.location.href).searchParams.get(params);
    },
  },
};
</script>
<style lang="scss">
.select-order {
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 12px;
  }

  p {
    font: normal normal 300 14px/24px "Nexa";
    color: #3d2b1c;
    margin-right: 8px;
    flex-shrink: 0;
  }

  select {
    cursor: pointer;
    width: auto;
    font: normal normal 300 12px/21px "Nexa";
    color: #7b4a2c;
    border: none;
    padding-right: 10px;
    background: none;
    margin-right: 30px;
    @media (min-width: 1024px) {
      padding-right: 18px;
    }
  }

  select {
    width: auto;
    font: normal normal 300 12px/21px "Nexa";
    color: #7b4a2c;
    border: none;
    padding-right: 50px;
    background: none;
    margin-right: 30px;

    @media (max-width: 767px) {
      margin-right: 8px;
      padding-right: 30px;
    }
  }
}
</style>
