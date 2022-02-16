<template>
  <li class="nav__link">
    <a
      :href="!isMobile ? url : '#'"
      class="link"
      :title="name"
      @click="toggleMenu()"
    >
      <span> {{ name }} </span>
      <i class="ico ico-arrow-down"></i>

      <Dropdown
        :parentUrl="url"
        :children="children"
        v-if="children"
        class="dropdown"
        :imageDepartment="name"
        :class="active ? 'active' : ''"
      /> </a
    ><!-- /.link -->
  </li>
  <!-- /.nav__link -->
</template>

<script>
import Dropdown from "./Dropdown.vue";

export default {
  data() {
    return {
      active: false,
      isMobile: window.screen.width <= 767,
    };
  },
  components: {
    Dropdown,
  },
  props: ["name", "url", "children"],
  methods: {
    toggleMenu() {
      if (this.isMobile) {
        this.active = !this.active;
      }
    },
  },
};
</script>

<style lang="scss">
.nav__link {
  .link {
    @extend %nexa-14px-brownDark;
    font-weight: 300;

    @media (max-width: $screen-md) {
      font-size: 28px;
      font-weight: 300;

      .ico {
        display: none;
      }
    }

    padding: 6px 0;
    display: block;
    margin-right: 50px;
    transition: color 0.3s, color 0.3s;
    position: relative;

    .ico {
      transition: 0.2s;
    }

    .dropdown__inner {
      @extend %transition-display-none;
    }

    .dropdown.active .dropdown__inner {
      @extend %transition-display-block;
    }

    &:hover {
      color: $color-brown-light;
      transition: color 0.3s, color 0.3s;

      .ico {
        transform: rotate(180deg);
        background: url(~@assets/ico-arrow-down-hover.svg) no-repeat center;
        transition: 0.2s;
      }

      @media (min-width: $screen-md) {
        .dropdown__inner {
          pointer-events: initial;
          opacity: 1;
          visibility: visible;
          transition: 0.4s;
        }
      }
    }
  }
}
</style>
