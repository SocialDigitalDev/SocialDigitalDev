<template>
  <div class="content__accordions flex" :class="{ col: isMobile }">
    <div class="accordion flex-2">
      <div class="accordion__nav" :class="{ 'flex col h-center': isMobile }">
        <h5 class="accordion__title">Fale conosco</h5>
        <!-- /.accordion__title -->

        <div class="accordion__body">
          <ul
            class="accordion__list"
            :class="{ 'flex col h-center': isMobile }"
          >
            <li class="accordion__item">
              <a
                href="/institucional/ajuda/seja-consultora/"
                class="accordion__link"
              >
                Seja uma Consultora </a
              ><!-- /.accordion__link -->
            </li>

            <li class="accordion__item">
              <span
                ><a href="mailto:sac@mysecretslounge.com.br"
                  >sac@mysecretslounge.com.br</a
                ></span
              >
            </li>
            <!-- /.accordion__item -->

            <li class="accordion__item social">
              <a
                href="https://www.instagram.com/secretsloungeofficial/"
                target="blank"
                class="flex-1"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="facebook.com/secretsloungeofficial"
                target="_blank"
                class="flex-1"
              >
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCjKdaCRMMUI_dqmCLNI_GTA/featured"
                target="_blank"
                class="flex-1"
              >
                <i class="fab fa-youtube"></i>
              </a>
            </li>
            <!-- /.accordion__item -->
          </ul>
          <!-- /.accordion__list -->
        </div>
        <!-- /.accordion__body -->
      </div>
      <!-- /.accordion__nav -->
    </div>
    <!-- /.accordion -->

    <div class="accordion flex-1">
      <div class="accordion__nav" :class="{ 'flex col h-center': isMobile }">
        <h5 class="accordion__title">Sobre Nós</h5>
        <!-- /.accordion__title -->

        <div class="accordion__body">
          <ul
            class="accordion__list"
            :class="{ 'flex col h-center': isMobile }"
          >
            <li class="accordion__item">
              <a
                href="/institucional/sobre/quem-somos/"
                class="accordion__link"
              >
                Quem somos </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->

            <li class="accordion__item">
              <a
                href="/institucional/sobre/nossas-lojas/"
                class="accordion__link"
              >
                Nossas lojas </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->

            <li class="accordion__item">
              <a
                href="/institucional/sobre/politica-privacidade/"
                class="accordion__link"
              >
                Política de privacidade </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->

            <!-- /.accordion__item -->
          </ul>
          <!-- /.accordion__list -->
        </div>
        <!-- /.accordion__body -->
      </div>
      <!-- /.accordion__nav -->
    </div>
    <!-- /.accordion -->

    <div class="accordion flex-1">
      <div class="accordion__nav" :class="{ 'flex col h-center': isMobile }">
        <h5 class="accordion__title">Ajuda e Suporte</h5>
        <!-- /.accordion__title -->

        <div class="accordion__body">
          <ul
            class="accordion__list"
            :class="{ 'flex col h-center': isMobile }"
          >
            <li class="accordion__item">
              <a
                href="/institucional/ajuda/formas-pagamento/"
                class="accordion__link"
              >
                Formas de pagamento </a
              ><!-- /.accordion__link -->
            </li>

            <li class="accordion__item">
              <a
                href="/institucional/ajuda/trocas-devolucoes/"
                class="accordion__link"
              >
                Trocas e devoluções </a
              ><!-- /.accordion__link -->
            </li>

            <li class="accordion__item">
              <a
                href="/institucional/ajuda/prazos-envio/"
                class="accordion__link"
              >
                Prazos e envio </a
              ><!-- /.accordion__link -->
            </li>

            <li class="accordion__item">
              <a
                href="/institucional/ajuda/atendimento/"
                class="accordion__link"
              >
                Atendimento</a
              ><!-- /.accordion__link -->
            </li>

            <!-- /.accordion__item -->

            <!-- /.accordion__item -->

            <!-- /.accordion__item -->

            <!-- /.accordion__item -->
          </ul>
          <!-- /.accordion__list -->
        </div>
        <!-- /.accordion__body -->
      </div>
      <!-- /.accordion__nav -->
    </div>
    <!-- /.accordion -->

    <div class="accordion flex-1">
      <div class="accordion__nav" :class="{ 'flex col h-center': isMobile }">
        <h5 class="accordion__title">Conta</h5>
        <!-- /.accordion__title -->

        <div class="accordion__body">
          <ul
            class="accordion__list"
            :class="{ 'flex col h-center': isMobile }"
          >
            <li class="accordion__item">
              <a href="/_secure/account/#/orders" class="accordion__link">
                Meus pedidos </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->

            <li class="accordion__item">
              <a href="/_secure/account/" class="accordion__link">
                Meus dados </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->

            <li class="accordion__item">
              <a href="/login" class="accordion__link"> Criar uma conta </a
              ><!-- /.accordion__link -->
            </li>
            <!-- /.accordion__item -->
          </ul>
          <!-- /.accordion__list -->
        </div>
        <!-- /.accordion__body -->
      </div>
      <!-- /.accordion__nav -->
    </div>
    <!-- /.accordion -->
  </div>
  <!-- /.content__accordions -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
    $("body").on("click", ".accordion__title", function() {
      $(this)
        .parent()
        .toggleClass("active");
    });
  },

  computed: {
    ...mapGetters({
      isMobile: "GET__IS_MOBILE",
    }),
  },
};
</script>

<style lang="scss">
@import "../sass/base/_typography.scss";
// @import '../sass/utils/_variables.scss';

.content__accordions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .accordion {
    /* Mobile */
    @media (max-width: 767px) {
      width: 100%;
    }

    .accordion__nav {
      cursor: pointer;

      /* Mobile */
      @media (max-width: 767px) {
        &.active {
          .accordion__title {
            &::before {
              transform: rotate(0deg);
            }
          }

          .accordion__body {
            max-height: 450px;
            transition: max-height 0.8s;
          }
        }
      }

      .accordion__title {
        text-transform: uppercase;
        margin-bottom: 25px;
        cursor: pointer;
        font: normal normal bold 12px/14px "Nexa";
        letter-spacing: 1.2px;
        color: #3d2b1c;
        text-transform: uppercase;

        /* Mobile */
        @media (max-width: 767px) {
          padding: 15px 0;
          position: relative;
          margin-bottom: 0;
          display: inline-block;

          &::before {
            content: "";
            position: absolute;
            height: 2px;
            width: 8px;
            right: -35px;
            top: 23px;
            transform: rotate(-90deg);
            transition: transform 0.3s;
            background: $color-brown-dark;
            cursor: pointer;
          }

          &::after {
            content: "";
            position: absolute;
            height: 2px;
            width: 8px;
            right: -35px;
            top: 23px;
            transform: rotate(0);
            background: $color-brown-dark;
            cursor: pointer;
          }
        }
      }

      .accordion__body {
        /* Mobile */
        @media (max-width: 767px) {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.8s;
        }

        .accordion__list {
          /* Mobile */
          @media (max-width: 767px) {
            margin-top: 15px;
          }

          .accordion__item {
            line-height: 25px;

            &.social {
              margin-top: 20px;

              @media (max-width: 767px) {
                margin-left: 30px;
                margin-bottom: 20px;
              }

              i {
                color: $color-brown-dark;
                font-size: 18px;
              }

              a {
                margin: 0 25px;

                &:first-child {
                  margin-left: 0;
                }
              }
            }

            a {
              color: #000;
            }
            span,
            .accordion__link {
              font: normal normal 300 14px/20px "Nexa";
              letter-spacing: 0px;
              color: #000000;
              display: block;
              margin-bottom: 10px;

              /* Mobile */
              @media (max-width: 767px) {
                margin-bottom: 10px;
              }

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
