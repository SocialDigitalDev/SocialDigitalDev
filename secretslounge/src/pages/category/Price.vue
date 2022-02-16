<template>
  <div class="widget">
    <h4 class="widget__head">Preço</h4>

    <div class="widget__body price">
      <div class="filter__price">
        <div class="item__filter">
          <input type="text" class="field" placeholder="De" />
        </div>

        <div class="item__filter">
          <input type="text" class="field" placeholder="Até" />
        </div>

        <div class="item__filter">
          <button class="btn btn--price">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      selecteds: "GET_FILTERS_SELECTEDS",
      prices: "GET_FILTERS_PRICE",
    }),
  },
  data() {
    return {
      open: false,
    };
  },
  created() {
    const filter = {};

    filter["Até R$50"] = {
      tapy: "price",
      checked: false,
      name: "Até R$50",
      map: "[0 TO 50]",
    };

    filter["R$51 a R$70"] = {
      tapy: "price",
      checked: false,
      name: "R$51 a R$70",
      map: "[51 TO 70]",
    };

    filter["R$71 a R$100"] = {
      tapy: "price",
      checked: false,
      name: "R$71 a R$100",
      map: "[71 TO 100]",
    };

    filter["Acima de R$100"] = {
      tapy: "price",
      checked: false,
      name: "Acima de R$100",
      map: "[101 TO 1000]",
    };

    this.$store.commit("SET_PRICE_FILTERS", filter);
  },
  methods: {
    controller() {
      this.open = !this.open;
    },
    updadeFilterSelect(filter) {
      filter.checked = !filter.checked;

      if (filter.checked) {
        this.$store.commit("SET_FILTERS_SELECTEDS", [
          ...this.selecteds,
          ...[filter],
        ]);

        return;
      }

      const filters = this.selecteds.filter(
        (item) => item.name !== filter.name
      );

      this.$store.commit("SET_FILTERS_SELECTEDS", filters);
    },
  },
};
</script>

<style lang="scss">
@import "@sass/base/_typography.scss";
@import "@sass/utils/_variables.scss";

.widget__body {
  &.price {
    max-height: 400px !important;

    .filter__price {
      display: flex;
      justify-content: space-around;

      .item__filter {
        .field {
          width: 56px;
          padding: 10px 0;
          text-align: center;
        }

        .btn--price {
          width: 56px;
          padding: 10px 0;
          background: transparent;

          text-transform: uppercase;

          transition: background 0.3s;

          &:hover {
            color: #fff;
            transition: background 0.3s;
          }
        }
      }
    }
  }
}
</style>
