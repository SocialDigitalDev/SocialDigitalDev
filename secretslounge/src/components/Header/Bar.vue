<template>
  <div
    class="nav__bar flex row v-center h-center"
    :class="{ scroll: isMobile }"
  >
    <ul class="flex row v-center h-center">
      <li>
        <a href="/institucional/ajuda/seja-consultora/" class="flex">
          Seja uma <strong> consultora</strong>
        </a>
      </li>

      <li>
        <a href="/institucional/ajuda/atendimento/" class="flex">
          <strong>SAC: </strong> entre em contato
        </a>
      </li>
    </ul>
    <!-- /.nav__bar -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isMobile: "GET__IS_MOBILE",
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav__bar {
  height: 40px;
  width: 100%;
  overflow: hidden;
  background-color: $color-rose-light;

  ul {
    li {
      list-style: none;
      margin: 0 30px;

      a {
        text-decoration: none;
        @extend %nexa-12px-white;
        letter-spacing: 0.48px;
        font-weight: 100;

        strong {
          margin: 0 3px;
        }

        b {
          margin: 0 3px;
          font-weight: 300;
        }
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 1023px) {
    height: 3px;
    position: relative;
    z-index: 10;

    ul {
      display: none;
      visibility: hidden;
    }
  }

  &.scroll {
    height: 3px;
    position: relative;
    z-index: 10;

    ul {
      display: none;
      visibility: hidden;
    }
  }
}
</style>
