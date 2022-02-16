<template>
  <div>
    <transition name="fade">
      <Loader v-if="loading" :fullscreen="true" />
    </transition>
    <footer class="footer">
      <div class="shell">
        <div class="footer__inner">
          <div class="shell">
            <div class="cols">
              <div class="accordions">
                <Accordions />
              </div>
              <!-- /.accordions -->
            </div>
            <!-- /.cols -->
          </div>
          <!-- /.shell -->
        </div>
        <!-- /.footer__inner -->
        <div class="footer__copyright">
          <div class="shell">
            <div class="cols" :class="{ 'flex col h-center': isMobile }">
              <p class="copyright">
                Copyright © Secrets Lounge - Todos os direitos reservados
              </p>
              <!-- /.copyright -->
              <div class="nav__list">
                <div class="nav__item">
                  <a
                    href="https://www.socialdigitalcommerce.com.br/"
                    target="_blank"
                    class="logo"
                  >
                    <img
                      src="@assets/logo.svg"
                      width="70"
                      alt="Desenvolvido por"
                    /> </a
                  ><!-- /.logo -->
                </div>
                <!-- /.nav__item -->
                <div class="nav__item">
                  <a
                    href="https://vtex.com/br-pt/"
                    class="logo"
                    target="_blank"
                  >
                    <img
                      src="@assets/logo-vtex.svg"
                      width="55"
                      alt="Plataforma"
                    /> </a
                  ><!-- /.logo -->
                </div>
                <!-- /.nav__item -->
              </div>
              <!-- /.nav__list -->
            </div>
            <!-- /.cols -->
          </div>
          <!-- /.shell -->
        </div>
        <!-- /.footer__copyright -->
      </div>
      <notifications
        group="app"
        classes="notification"
        position="bottom center"
        width="585"
      />
    </footer>
  </div>
  <!-- /.footer -->
</template>

<script>
import Accordions from "./Accordions.vue";
import Loader from "./Loader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Accordions,
    Loader,
  },

  watch: {
    user() {
      this.$store.dispatch("FETCH_WISHLIST", this.user.id);
    },
  },

  computed: {
    ...mapGetters({
      isMobile: "GET__IS_MOBILE",
      loading: "GET__LOADING_PAGE",
      user: "GET_USER",
    }),
  },

  created() {
    this.$store.dispatch("GET_ORDER_FORM");
  },
};
</script>

<style lang="scss">
.footer {
  .footer__inner {
    padding: 50px 0;
    border-top: 1px solid $color-grey-opacity;
    border-bottom: 1px solid $color-grey-opacity;

    /* Mobile */
    @media (max-width: 767px) {
      padding: 15px 0;
    }

    .cols {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .accordions {
        width: 100%;

        /* Mobile */
        @media (max-width: 767px) {
          width: 100%;
        }
      }
    }

    /*  @media (min-width: 1024px) {
            padding-left: 90px;
        } */
  }

  .footer__logos {
    border-bottom: 1px solid #e0e0e0;
    padding: 33px 0;

    .cols {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .payment {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        /* Mobile */
        @media (max-width: 767px) {
          width: 100%;
          justify-content: center;
          margin-bottom: 25px;

          .footer__title {
            margin-bottom: 10px;
            font-weight: 500;
          }
        }

        .nav__list {
          display: flex;
          justify-content: space-between;

          .nav__item {
            margin-left: 15px;
          }
        }
      }

      .security {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        /* Mobile */
        @media (max-width: 767px) {
          width: 100%;
          justify-content: center;

          .footer__title {
            width: 100%;
            text-align: center;
            font-weight: 500;
          }
        }
      }
    }
  }

  .footer__copyright {
    .cols {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      padding: 35px 0 30px;

      /* Mobile */
      @media (max-width: 767px) {
        padding: 25px 0;
      }

      .copyright {
        @extend %nexa-12px-brownDark;
        font-weight: 300;

        /* Mobile */
        @media (max-width: 767px) {
          text-align: center;
          margin-bottom: 20px;
          line-height: 1.8em;
        }
      }

      .nav__list {
        width: 31%;
        display: flex;
        justify-content: space-between;
        max-width: 160px;
        margin-right: 60px;

        /* Mobile */
        @media (max-width: 767px) {
          width: 100%;
        }

        .nav__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          /* Mobile */
          @media (max-width: 767px) {
            width: 50%;
            justify-content: center;
          }

          .nav__title {
            margin-right: 8px;
            font-size: 10px;
            letter-spacing: 0.6px;
            color: #000000;
            text-transform: uppercase;

            /* Mobile */
            @media (max-width: 767px) {
              width: 100%;
              text-align: center;
              margin: 0 0 8px 0;
            }
          }
        }
      }
    }
  }
}
</style>
