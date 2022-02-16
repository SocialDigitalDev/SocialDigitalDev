<template>
  <div class="header__inner">
    <div class="shell">
      <div class="flex row h-between">
        <div
          class="header__inner-open-menu flex row v-center"
          v-show="isMobile"
          @click="openMenu"
        >
          <i class="ico ico-menu"></i>
        </div>

        <div class="header__inner-logo flex col v-center h-center">
          <a href="/">
            <img src="@assets/logotipo.svg" alt="Secrets" />
          </a>
        </div>

        <div class="header__inner-search">
          <Search />
        </div>

        <div class="header__inner-options flex row-reverse v-center">
          <div class="header__inner-cart">
            <Cart />
          </div>

          <a
            href="/wishlist"
            class="
                            header__inner-wishlist
                            flex
                            col
                            h-center
                            v-center
                        "
            v-show="!isMobile"
          >
            <i class="ico-heart"></i>
            <label>Favoritos</label>
          </a>
          <div
            class="header__inner-login flex col h-center v-center"
            v-show="!isMobile"
          >
            <Login />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login.vue";
import Search from "./search/Index";
import Cart from "./cart/Index.vue";
// import Login from './LoginCustomizer';
// import Wishlist from '../wishlist/Index.vue';

import { mapGetters } from "vuex";

export default {
  components: {
    Search,
    Cart,
    Login,
    //     Wishlist,
  },

  computed: {
    ...mapGetters({
      isMobile: "GET__IS_MOBILE",
    }),
  },

  created() {
    this.$store.dispatch("FETCH__IS_MOBILE");
  },

  data() {
    return {
      search: null,
      // openSearchResults: false,
      searchMobile: false,
      // searchDesk: false,
    };
  },

  watch: {
    search: function(value) {
      if (value && value.length > 2) this.openSearchResults = true;
      else this.openSearchResults = false;
    },
  },

  methods: {
    openMenu() {
      this.$store.commit(`SET__MENU_OPEN`, true);
    },

    toggleSearch: function() {
      $(`.header__inner-container`).toggleClass(`search--active`);
    },

    toggleSearchDesk: function() {
      this.searchDesk = !this.searchDesk;
    },

    toggleSearchMobile: function() {
      this.searchMobile = !this.searchMobile;
      $(".field-search-mob").focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.header__inner {
  padding: 20px 0;
  position: relative;

  @media (max-width: $screen-md) {
    padding: 10px 0;
  }

  .header__inner-open-menu {
    .ico-menu {
      cursor: pointer;
    }
  }

  .cols {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    .nav__utils {
      width: 350px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .header__inner-wishlist {
    position: relative;
    cursor: pointer;
    margin: 0 12px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ddede8;
    }

    i {
      position: absolute;
      bottom: 0;
      z-index: 2;
    }
    label {
      @extend %nexa-10px-brownDark-bold;
      cursor: pointer;
      @extend %transition-display-none;
    }

    &:hover {
      label {
        font-size: 10px;
        pointer-events: initial;
        @extend %transition-display-block;
        transform: translateY(16px);
      }
    }
  }

  .header__inner-login {
    a {
      @extend %nexa-12px-brownDark-bold;
      text-transform: uppercase;
      transition: 0.2s;

      &:hover {
        color: $color-brown-light;
        transition: 0.2s;
      }
    }
  }

  .header__inner-search {
    margin: auto 24px auto auto;
    @media (min-width: 768px) {
      margin: 0;
    }
  }

  .header__inner-logo {
    @media (max-width: 767px) {
      width: 100%;
      img {
        min-width: 197px;
        max-width: 197px;
      }
    }

    @media (max-width: 360px) {
      img {
        min-width: 197px;
        max-width: 197px;
      }
    }

    @media (max-width: 320px) {
      img {
        min-width: 157px;
        max-width: 157px;
      }
    }
  }

  .header__inner-logo {
    margin: auto;
    @media (min-width: 768px) {
      position: absolute;
      left: 0;
      right: 0;
      width: 300px;
      bottom: 0;
      top: 0;
    }
  }
}
</style>
