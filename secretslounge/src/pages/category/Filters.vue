<template>
  <div class="widget widget-filter" :class="{ open: !open }">
    <h4 class="widget__head" @click.stop.prevent="controller()">
      {{ fixFilterName(title) }}
    </h4>

    <div class="widget__body" :class="title">
      <div
        class="checkbox"
        v-for="filter in filters"
        :key="filter.name"
        @click="updateFilterSelect(filter)"
      >
        <input
          type="checkbox"
          class="field"
          :class="filter.name"
          v-model="filter.checked"
        />

        <label class="label">
          {{ filter.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["title", "filters"],
  computed: {
    ...mapGetters({
      selecteds: "GET_FILTERS_SELECTEDS",
    }),
  },
  data() {
    return {
      open: true,
    };
  },
  methods: {
    fixFilterName(filterName) {
      if (filterName.toLowerCase() == "size") {
        return "Tamanho";
      } else if (filterName.toLowerCase() == "color") {
        return "Cor";
      }
      return filterName;
    },
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

<style lang="scss">
@import "@sass/base/_typography.scss";
@import "@sass/utils/_variables.scss";
@import "@sass/utils/_mixin.scss";

.checkbox {
  &,
  input {
    cursor: pointer;
    margin-bottom: 10px;
  }

  label {
    display: inline-block;
    text-transform: lowercase;
    position: relative;
    bottom: 1px;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.widget-filter {
  cursor: pointer;
  border-bottom: 1px solid #eee9e4;

  &:last-of-type {
    border-bottom: 1px solid #eee9e4;

    &:after {
      content: "";
      display: flex;
      border-bottom: 24px solid #f5efe6;
    }
  }
}
</style>
