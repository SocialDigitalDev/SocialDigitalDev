<template>
  <div>
    <div class="product__shipping">
      <Loader v-if="loading" :size="32" class="product__shipping__loader" />
      <h4 class="title">Calcular frete e prazo</h4>

      <form action="." class="form__shipping">
        <div class="form__row">
          <label for="cep" class="label-form">
            {{ !isShippingCalculated ? ` Digite seu CEP` : `Entregar em` }}
          </label>

          <input
            :disabled="isShippingCalculated"
            type="text"
            name="cep"
            placeholder="00000-000"
            v-mask="'#####-###'"
            class="field"
            v-model="postalCode"
            :class="{ active: isShippingCalculated }"
            v-if="!isShippingCalculated"
          />
          <div class="shippingCalculatedTitle" v-else>
            {{ postalCode }}
          </div>
        </div>

        <div class="form__row">
          <button
            class="btn btn__shipping"
            v-if="!isShippingCalculated"
            @click.stop.prevent="validateBeforeSubmit()"
          >
            calcular
          </button>

          <button
            v-else
            class="btn btn__shipping"
            @click.stop.prevent="clear()"
          >
            editar
          </button>
        </div>
      </form>

      <a
        href="http://www.buscacep.correios.com.br/sistemas/buscacep/default.cfm"
        target="_blank"
        class="link__zipcode"
      >
        Não sabe seu cep?
      </a>

      <div
        class="form__logistics"
        v-if="isShippingCalculated"
        v-html="shippingOptions"
      ></div>

      <!-- /.form__logistics -->
    </div>
  </div>
</template>

<script>
import api from "../../services/vtex";
import Loader from "../../components/Loader.vue";
export default {
  props: {
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },

  components: {
    Loader,
  },

  data() {
    return {
      postalCode: "69925-000",
      shippingOptions: null,
      loading: false,
      isFormOpen: false,
      isShippingCalculated: false,
    };
  },
  watch: {
    productQuantity() {
      if (this.isShippingCalculated) {
        this.validateBeforeSubmit();
      }
    },
  },
  methods: {
    validateBeforeSubmit() {
      if (!this.postalCode) {
        return this.$notify({
          group: "app",
          type: "error",
          title: `Informe um CEP`,
          duration: 1500,
          ignoreDuplicates: true,
        });
      }

      const cepFormatted = this.postalCode.replace(/\D/g, "");

      const validacep = /^[0-9]{8}$/;

      if (!validacep.test(cepFormatted)) {
        return this.$notify({
          group: "app",
          type: "error",
          title: `Informe um CEP válido`,
          duration: 1500,
          ignoreDuplicates: true,
        });
      }

      return this.fetchOptions(cepFormatted);
    },

    clear() {
      this.postalCode = null;
      this.isShippingCalculated = false;
    },

    async fetchOptions(cepFormatted) {
      this.loading = !this.loading;
      try {
        const { data } = await api.get(
          `/frete/calcula/${this.productId}?shippinCep=${cepFormatted}&quantity=${this.quantity}`
        );
        this.loading = !this.loading;
        this.shippingOptions = data;
        if (!this.isShippingCalculated) {
          this.isShippingCalculated = true;
        }
      } catch (error) {
        this.loading = !this.loading;
        throw new Error(error);
      }
    },
    reset() {
      this.isShippingCalculated = false;
      this.postalCode = null;
    },
  },
};
</script>

<style lang="scss">
.label-ship {
  font-size: 12px;
  justify-content: space-between;
  font-family: "Nexa";
  font-weight: 300;
  padding: 20px 0px;
}

.product__shipping {
  position: relative;
  border-top: 1px solid #e0e0e0;
  background: #fff;

  padding: 16px 15px;
  display: none;

  &.active {
    display: block;
  }

  .title {
    font: normal normal 700 16px/16px "Nexa";
    letter-spacing: 0px;
    font-weight: 500;
    color: #3d2b1c;
    padding-bottom: 10px;

    margin-bottom: 20px;
  }

  .form__logistics {
    margin-top: 20px;

    .content {
      width: 80%;

      .options {
        display: flex;
        justify-content: space-between;
        padding: 8px 15px;

        &:nth-child(odd) {
          background: #fff0% 0% no-repeat padding-box;
        }
        > div {
          font: normal normal 500 12px/16px "Roboto";
          letter-spacing: 0px;
          color: #757575;
          text-transform: uppercase;

          &:last-child {
            font-weight: 400;
          }
        }
      }
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }

  .label-form {
    width: 100%;
    font: normal normal 300 12px/16px "Nexa";
    display: block;
    margin-bottom: 5px;
  }
  .form__shipping {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    @media (max-width: 767px) {
      justify-content: space-between;
    }

    .field {
      width: 95%;
      height: 32px;
      background: #fff;
      padding: 0 16px;
      color: black;
      font-family: "Nexa", sans-serif;
      font-size: 12px;
      font-weight: 300;
      margin-right: 12px;

      @media (max-width: 767px) {
        margin-top: 5px;
      }

      &:disabled {
        height: 48px;
        background: #efefef 0% 0% no-repeat padding-box;
        font: normal normal 400 14px/56px "Roboto";
        letter-spacing: 0px;
        color: #757575;
        opacity: 0.8;
      }
    }

    .btn__shipping {
      width: 111px;
      height: 32px;
      border: none;
      background: #dca399;
      color: #fff;
      border-radius: 20px;
      font-family: "Nexa", sans-serif;
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.38px;
      padding: 15px 0;
      text-transform: uppercase;
      position: relative;
      top: 10px;
    }
  }

  .link__zipcode {
    text-decoration: underline;
    color: #9d9d9d;
    font-family: "Nexa", sans-serif;
    font-size: 12px;
    font-weight: 300;

    @media (max-width: 767px) {
      display: block;
      text-align: center;
      margin-top: 20px;
    }
  }
}

.form__logistics {
  margin-top: 24px;
  font-size: 12px;

  table {
    border-top: 1px solid;
    width: 100%;
    border-collapse: collapse;
    line-height: 1.5;
    font-size: 12px;
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      padding: 8px 16px;
      &:nth-child(odd) {
        background-color: #fff;
      }
    }

    td {
      padding: 0 20px 0 0;
      flex-grow: 1;
      &:empty {
        display: none;
      }
      &:first-child {
        font-weight: 700;
        text-align: right;
        padding-right: 0;
      }
    }
  }
}
.form__logistics__item {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  font-size: 12px;
  padding: 8px 0;
  border-bottom: 1px solid;
  div:last-child {
    text-align: right;
  }
  h3,
  h4 {
    font-size: 1em;
  }
  h3 {
    font-weight: normal;
  }
  h4 {
    margin-top: 4px;
  }
}
.shippingCalculatedTitle {
  font-size: 12px;
  font-weight: 300;
}

.product__shipping__loader {
  z-index: 3;
  background: rgba(255, 255, 255, 0.5);
}
</style>
