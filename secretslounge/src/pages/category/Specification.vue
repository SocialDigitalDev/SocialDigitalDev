<template>
  <div class="widgets">
    <div
      class="widget"
      v-for="specification in specifications"
      :key="specification.id"
    >
      <div class="widget__head">
        <a
          class="widget__title"
          @click.stop.prevent="controllerModal(specification)"
        >
          {{ specification.name }}
          <i class="ico__arrow" :class="{ open: specification.open }"></i
          ><!-- /.ico__arrow --> </a
        ><!-- /.widget__title -->
      </div>
      <!-- /.widget__head -->

      <div class="widget__body" :class="{ open: specification.open }">
        <div
          class="checkbox"
          v-for="(value, index) in specification.values"
          :key="index"
          @click="selectFilters(specification, value)"
        >
          <input
            type="checkbox"
            :name="rewrite(value.name)"
            v-model="value.checked"
            :id="rewrite(value.name)"
            class="field"
          />

          <label class="label" :for="rewrite(value.name)">
            {{ value.name }} </label
          ><!-- /.form__label -->
        </div>
        <!-- /.checkbox -->
      </div>
      <!-- /.widget__body -->
    </div>
    <!-- /.widget -->
  </div>
  <!-- /.widgets -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      filters: "GET_FILTER_SPECIFICATIONS",
      querySearch: "GET_QUERY_SEARCH",
      from: "GET_PAGINATION_FROM",
      to: "GET_PAGINATION_TO",
      sort: "GET_ORDER_BY",
      loader: "GET_LOADER",
    }),
  },
  data() {
    return {
      showModal: false,
      specifications: [],
      select: [],
    };
  },
  watch: {
    filters(filters) {
      filters = Object.entries(filters);

      this.specifications = filters.map((filter, index) => ({
        id: index,
        name: filter[0],
        open: false,
        filters: filter[1].map((item) => ({
          specification: item.Map,
          name: item.Name,
          quantity: item.Quantity,
          link: item.LinkEncoded,
          value: item.Value,
          checked: false,
        })),
      }));
    },
  },
  methods: {
    controllerModal(filter) {
      filter.open = !filter.open;
    },
    selectFilters(filter, value) {
      value.checked = !value.checked;

      this.select.push({
        name: value.name,
        link: `&fq=${value.specification}:${value.value}`,
      });

      this.updateFilters(this.select);
    },
    isFilterSelected(filter) {
      if (!filter) return;

      return this.select.filter((item) => item.name == filter).length;
    },
    updateFilters(filters) {
      if (!filters) return;

      this.$store.commit("SET_RESET_PRODUCTS", []);

      this.$store.dispatch(
        "FETCH_PRODUCTS",
        `${this.querySearch}?_from=0&_to=12${this.createLinkSearch(
          filters
        )}&O=${this.sort}`
      );
    },
    createLinkSearch(filters) {
      if (!filters) return;

      const linkSearch = this.select.map((item) => item.link);

      return linkSearch.join("");
    },
    rewrite(str) {
      if (!str) return;

      return str
        .toLowerCase()
        .trim()
        .replace(/[áàãâä]/g, "a")
        .replace(/[éèẽêë]/g, "e")
        .replace(/[íìĩîï]/g, "i")
        .replace(/[óòõôö]/g, "o")
        .replace(/[úùũûü]/g, "u")
        .replace(/ç/g, "c")
        .replace(/(\ |_)+/, " ")
        .replace(/(^-+|-+$)/, "")
        .replace(/[ ]/g, "-");
    },
  },
};
</script>
