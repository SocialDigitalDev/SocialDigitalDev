<template>
  <nav class="navigation">
    <div class="shell">
      <div class="overlay" :class="{ active: menuOpen }" v-if="isMobile"></div>

      <div class="nav__list" :class="{ '--open': menuOpen }">
        <div class="nav__head flex col v-center" v-if="isMobile">
          <i class="ico ico-close" @click="closeMenu"></i>
        </div>

        <ul class="content">
          <Item
            v-for="categories in departaments"
            :key="categories.id"
            :name="categories.name"
            :url="categories.url"
            :children="categories.children"
          />
          <div v-if="!isMobile" class="dropdown__overlay"></div>
        </ul>

        <div class="nav__info flex col v-center" v-if="isMobile">
          <a href="/institucional/ajuda/seja-consultora/">
            Seja uma <b> consultora </b>
          </a>
          <a href="/institucional/ajuda/atendimento/">
            <b>SAC:</b> Entre em contato
          </a>
        </div>

        <div class="nav__footer flex row v-center h-center" v-if="isMobile">
          <a
            href="#"
            class="nav__footer-item flex-1 flex row v-center h-center"
          >
            <Login />
          </a>
          <a
            href="/favoritos"
            class="nav__footer-item flex-1 flex row v-center h-center"
          >
            <i class="ico ico-heart-black"></i>
            <span>Favoritos</span>
          </a>
        </div>
      </div>
      <!-- /.nav__list -->
    </div>
    <!-- /.shell -->
  </nav>
  <!-- /.navigation -->
</template>

<script>
import { mapGetters } from "vuex";
import Item from "./Item";
import Login from "../Login.vue";

export default {
  components: {
    Item,
    Login,
  },

  computed: {
    ...mapGetters({
      menuOpen: "GET__MENU_OPEN",
      isMobile: "GET__IS_MOBILE",
      departaments: "GET__CATEGORIES",
    }),
  },

  created() {
    this.fetchCategories();
  },

  methods: {
    closeMenu() {
      this.$store.commit(`SET__MENU_OPEN`, false);
    },

    fetchCategories() {
      this.$store.dispatch(`FETCH__CATEGORIES`);
    },
  },
};
</script>

<style lang="scss">
.nav__link:hover ~ .dropdown__overlay {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: #00000088;
  position: fixed;
  top: 160px;
  left: 0;
  z-index: -1;
}

.navigation {
  border-bottom: 1px solid #fafafa;

  .nav__head {
    width: 100%;
    height: 70px;
    position: absolute;
    padding-left: 32px;
    padding-right: 32px;
    top: 0;
    left: 0;

    .ico-close {
      background-size: 18px;
      cursor: pointer;
    }

    @media (max-width: 767px) {
      z-index: 999;
      display: flex;
    }
  }

  .nav__info {
    width: calc(100% - 64px);
    height: 140px;
    position: absolute;
    bottom: 70px;
    left: 0;
    margin: 0 32px;
    border-top: 1px solid $color-grey-opacity;
    display: flex;
    flex-direction: column;

    a {
      padding: 8px;
      @extend %nexa-12px-brownDark;
      font-weight: 100;

      b {
        font-weight: bold;
      }
    }

    @media (max-width: 767px) {
      position: absolute;
      margin: 0 30px;
      background-color: $color-creme;
    }
  }

  .nav__footer {
    width: 100%;
    height: 70px;
    position: absolute;
    padding-left: 32px;
    padding-right: 32px;
    bottom: 0;
    left: 0;
    border-top: 1px solid $color-grey-opacity;
    background-color: $color-white;

    .nav__footer-item {
      i {
        margin: 0 8px;
      }

      span {
        @extend %nexa-12px-brownDark-bold;
        letter-spacing: 0.48px;
        text-transform: uppercase;
      }

      @media (max-width: $screen-md) {
        display: inline-block;
      }
    }

    @media (max-width: $screen-md) {
      position: fixed;
      bottom: 0;
    }
  }

  /* Mobile */
  @media (max-width: $screen-md) {
    border: none;

    .open__navigation {
      display: block;

      span {
        display: block;
        width: 20px;
        height: 2px;
        margin-bottom: 5px;
        position: relative;
        background: #000;
        border-radius: 3px;
        z-index: 1;
        transform-origin: 4px 0px;
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          opacity 0.5s;

        &:nth-child(2) {
          margin: 5px 0;
        }
      }
    }
  }

  .nav__list {
    padding: 3px 0;
    display: flex;
    justify-content: center;
    overflow: hidden;

    > ul {
      display: flex;
      justify-content: center;

      @media (max-width: $screen-md) {
        padding: 100px 0;
        flex-direction: column;
        height: 80vh;
        overflow: scroll;
        justify-content: initial;

        @media (max-width: 360px) {
          padding: 60px 0;
        }
      }
    }

    /* Mobile */
    @media (max-width: $screen-md) {
      position: fixed;
      left: 0;
      top: 0;
      display: block;
      background: #fff;
      width: 320px;
      height: 100vh;
      z-index: 9;
      transform: translateX(-360px);
      transition: transform 0.4s;
      background-color: $color-creme;
      padding: 32px;
    }

    &.--open {
      transform: translateX(0);
    }
  }
}
</style>
