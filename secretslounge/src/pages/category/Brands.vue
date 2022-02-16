<template>
  <div class="widget" :class="{ open: open }">
    <h4 class="widget__head" @click.stop.prevent="controller()">
      Marcas <i class="ico__arrow"></i>
    </h4>

    <div class="widget__body">
      <div class="checkbox" v-for="(brand, index) in brands" :key="index">
        <input type="checkbox" class="field" v-model="brand.checked" />

        <label class="label" @click="updateFilterSelect(brand)">
          {{ brand.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      brands: "GET_FILTERS_BRANDS",
      selecteds: "GET_FILTERS_SELECTEDS",
    }),
  },
  data() {
    return {
      open: true,
    };
  },
  methods: {
    controller() {
      this.open = !this.open;
    },
    updateFilterSelect(selected) {
      selected.checked = !selected.checked;

      if (selected.checked) {
        this.$store.commit("SET_FILTERS_SELECTEDS", [
          ...this.selecteds,
          ...[selected],
        ]);

        return;
      }

      const filters = this.selecteds.filter(
        (item) => item.name !== selected.name
      );

      this.$store.commit("SET_FILTERS_SELECTEDS", filters);
    },
  },
};
</script>
