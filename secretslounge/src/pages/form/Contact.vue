<template>
  <form
    class="form form--contact"
    @submit.stop.prevent="validateBeforeSubmit()"
  >
    <div class="form__row">
      <div class="form__controls">
        <label for="" class="form__label">Seu nome:</label>
        <input
          type="text"
          class="field"
          :class="{ 'is-filled': name.length > 0 }"
          v-model="name"
          required
        />
      </div>
      <div class="form__controls">
        <label for="email" class="form__label">Seu e-mail:</label>
        <input
          type="email"
          class="field"
          :class="{
            'is-filled': email.length > 0,
          }"
          v-model="email"
          required
        />
      </div>

      <div class="form__controls">
        <label for="" class="form__label">Celular:</label>
        <input
          type="text"
          class="field"
          v-mask="'(##) # ####-####'"
          :class="{ 'is-filled': phone.length > 0 }"
          v-model="phone"
          required
        />
      </div>
      <div class="form__controls">
        <label for="" class="form__label">Assunto:</label>
        <input
          type="text"
          class="field"
          :class="{ 'is-filled': subject.length > 0 }"
          v-model="subject"
          required
        />
      </div>
      <div class="form__controls form__controls--full">
        <label for="" class="form__label">Mensagem:</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="field"
          :class="{ 'is-filled': message.length > 0 }"
          v-model="message"
          required
        ></textarea>
      </div>
      <div class="form__controls form__controls--submit">
        <button type="submit" class="btn">Enviar</button>
      </div>
    </div>
  </form>
</template>

<script>
import api from "../../services/vtex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };
  },

  methods: {
    validateBeforeSubmit() {
      if (this.notEmail(this.email)) {
        return this.$notify({
          group: "app",
          type: "error",
          title: 'O campo "E-mail" estÃ¡ incorreto.',
          animationName: "notify",
        });
      }

      this.$store.commit("SET_LOADING", true);

      this.handlSendFormContact();
    },
    async handlSendFormContact() {
      const { data } = await api.post("/api/dataentities/CS/documents", {
        name: this.name,
        email: this.email,
        phone: this.phone,
        subject: this.subject,
        message: this.message,
      });

      this.$notify({
        group: "app",
        type: "success",
        title: "Mensagem enviada com sucesso!",
        animationName: "notify",
      });

      this.$store.commit("SET_LOADING", false);

      this.handlClearFormContact();

      console.log("Form enviado");
    },
    handlClearFormContact() {
      this.name = null;
      this.email = null;
      this.phone = null;
      this.subject = null;
      this.message = null;
    },
    notEmail(email) {
      if (!email) return "";
      return !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
        email
      );
    },
    rewrite(str) {
      if (!str) return;

      return str
        .trim()
        .replace(/(\s|_)+/, "")
        .replace(/(^-+|-+$)/, "")
        .replace(/[^a-z0-9]+/g, "");
    },
  },
};
</script>
<style lang="scss">
.form__row {
  @media (min-width: 768px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
.form--contact,
form {
  font-family: "Nexa";
  font-weight: 300;
  .form__controls {
    margin-bottom: 24px;
    width: 100%;
    &.form__controls--medium {
      @media (min-width: 768px) {
        width: 48%;
      }
    }
  }
  label {
    color: #9a7453;
    display: block;
    font-size: 10px;
    margin-bottom: 6px;
  }
  input,
  select,
  textarea {
    padding: 12px;
    font-size: 12px;
    width: 100%;
    border: 1px solid #9a7453;
    color: #9a7453;
    transition: all 0.2s;
    border-radius: 20px !important;
    resize: none;
    &:focus,
    &.is-filled {
      border: 1px solid #282828;
      color: #282828;
      outline: none;
    }
    &.is-ok {
      background-repeat: no-repeat;
      background-position: calc(100% - 12px) 50%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.028' height='12.034' viewBox='0 0 16.028 12.034'%3E%3Cpath id='Path_279' data-name='Path 279' d='M9.855,17.99a1,1,0,0,1-.729-.32L4.27,12.5a1,1,0,1,1,1.459-1.369l4.117,4.386,8.4-9.193a1,1,0,1,1,1.479,1.339l-9.133,9.992a1,1,0,0,1-.729.33Z' transform='translate(-3.999 -5.956)' fill='%23a0db51'/%3E%3C/svg%3E%0A");
    }
  }
  select {
    color: #282828;
  }
  .form__controls--submit {
    display: grid;
    justify-content: right;

    .btn {
      background: #e7b2a5;
      width: 200px;
      margin-right: 0;
      font-size: 12px;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #ffffff;
      border: 1px transparent;
      transition: 0.2s ease-in-out;

      &:hover {
        transition: 0.2s ease-in-out;
        background: #ffffff;
        color: #e7b2a5;
        border: 1px solid #e7b2a5;
      }
    }
  }
}
</style>
