<template>
  <form
    action="?"
    class="form__news flex col h-center v-center"
    @submit.stop.prevent="validateBeforeSubmit()"
  >
    <div class="flex-1">
      <h2>Newsletter</h2>
    </div>
    <div class="flex-1">
      <h3><b>Fique por dentro</b> - Stay in touch</h3>
    </div>
    <div class="flex-1">
      <div class="field flex row">
        <input
          class="flex-1"
          v-model="email"
          placeholder="Digite seu email"
          type="text"
        />
        <button type="submit" :disabled="disabled">
          {{ disabled ? "Enviado!" : "Enviar" }}
        </button>
      </div>
    </div>
  </form>
  <!-- /.form__news -->
</template>

<script>
import vtex from "../services/vtex";
import Swal from "sweetalert2";

export default {
  components: {},

  data() {
    return {
      email: null,
      loader: false,
      disabled: false,
    };
  },
  methods: {
    async validateBeforeSubmit() {
      this.loader = true;

      if (!this.isEmail(this.email)) {
        this.loader = false;
        return Swal.fire({
          title: "Oops...",
          icon: "info",
          text: "Ops! informe um email válido.",
        });
      }

      const emailNotRegistered = await this.emailNotRegistered(this.email);
      console.log("emailNotRegistered");
      console.log(emailNotRegistered);
      if (emailNotRegistered) {
        this.sendNewsletter();
      }
    },

    async emailNotRegistered(email) {
      try {
        const { data } = await vtex.get(
          `/api/dataentities/NL/search?email=${email}`
        );
        if (data.length > 0) {
          this.loader = false;
          Swal.fire({
            title: "Oops...",
            icon: "error",
            text: "E-mail já cadastrado!",
          });
          return false;
        }
      } catch (e) {
        this.loader = false;
        return Swal.fire({
          title: "Oops...",
          icon: "error",
          text: "Houve um erro ao cadastrar seu e-mail. Tente novamente.",
        });
      }
      return true;
    },

    async sendNewsletter() {
      const { status } = await vtex.post("/api/dataentities/NL/documents", {
        email: this.email,
      });

      if (status !== "201" || status !== "200") {
        this.loader = false;
        this.disabled = true;
        return Swal.fire({
          title: "Sucesso.",
          icon: "success",
          text: "Seu e-mail foi cadastrado com sucesso.",
        });
      } else {
        this.loader = false;
        return Swal.fire({
          title: "Oops...",
          icon: "error",
          text: "Houve um erro ao cadastrar seu e-mail. Tente novamente.",
        });
      }
    },
    isEmail(email) {
      if (!email) return;
      // eslint-disable-next-line max-len
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
        email
      );
    },
  },
};
</script>

<style lang="scss">
.form__news {
  position: relative;
  margin: 132px 0;

  h2 {
    font: normal normal bold 24px/67px "Nexa";
    color: #3d2b1c;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 12px;
      letter-spacing: 2px;
    }
  }

  h3 {
    font: normal normal 300 32px/67px "Nexa";
    letter-spacing: 0px;
    color: #3d2b1c;
    margin-top: 0px;

    b {
      font-weight: bold;
    }

    @media (max-width: 767px) {
      padding: 0 35px;
      text-align: center;
      line-height: 38px;
    }
  }

  .field {
    background-color: transparent;
    padding: 5px 6px 5px 20px;
    min-width: 320px;
    border-radius: 20px;
    margin-top: 24px;
    justify-content: space-between;

    input {
      background-color: transparent;
      border: none;
      font: normal normal 300 12px/16px "Nexa";
      letter-spacing: 0.48px;
      color: #3d2b1c;

      &::placeholder {
        font: normal normal 300 12px/16px "Nexa";
        letter-spacing: 0.48px;
        color: #3d2b1c;
      }
    }

    button {
      padding: 3px 0 0 0;
      border: none;
      background: #e7b2a5 0% 0% no-repeat padding-box;
      border-radius: 100px;
      width: 94px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      font: normal normal bold 12px/14px "Nexa";
      letter-spacing: 1.2px;
      color: #ffffff;
      text-transform: uppercase;
      transition: 0.4s;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }

      &:hover {
        background: #f0cac1 0% 0% no-repeat padding-box;
        transition: 0.4s;
      }
    }
  }
}
</style>
