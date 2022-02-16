<template>
    <div>
        <div class="product__disabled" v-if="size != null">
            <div class="disabled-box">
                <p>Produto Indisponível</p>
                <span> Deixe seu e-mail, te avisaremos quando chegar! </span>
            </div>
            <form
                action="?"
                method="post"
                @submit.stop.prevent="validateEmail()"
                class="product__notifyme"
            >
                <div class="form__row">
                    <label for="email" class="label-form"> Email </label>
                    <input
                        type="mail"
                        name="email"
                        placeholder="exemplo@email.com.br"
                        class="field"
                        required
                        v-model="email"
                    />
                </div>
                <button class="btn btn__notify">avise-me</button>
            </form>

            <div v-if="state == '200'" class="message__success">
                <p>Cadastrado com sucesso!</p>
                <p>
                    Assim que o produto ficar disponível você receberá um aviso
                    no e-mail cadastrado.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../../services/vtex";
export default {
    computed: {
        ...mapGetters({
            current: "GET_CURRENT_SKUS",
            size: "GET_SIZE",
        }),
    },
    data() {
        return {
            email: null,
            state: null,
        };
    },
    methods: {
        controllerModal() {
            this.showModal = !this.showModal;
        },
        validateEmail() {
            if (!this.isEmail(this.email)) {
                return this.$notify({
                    group: "app",
                    type: "error",
                    title: "Ops! informe um email válido.",
                    duration: 2000,
                    ignoreDuplicates: true,
                });
            }

            if (this.size !== null) {
                this.fetchNotifyme();
            } else {
                return this.$notify({
                    group: "app",
                    type: "error",
                    title: "Ops! Selecione o tamanho desejado",
                    duration: 2000,
                    ignoreDuplicates: true,
                });
            }
        },
        async fetchNotifyme() {
            const formdata = new FormData();

            formdata.append("notifymeClientName", "Secrets Lounge");
            formdata.append("notifymeClientEmail", this.email);
            formdata.append("notifymeIdSku", this.current.skuId);

            fetch("/no-cache/AviseMe.aspx", {
                method: "POST",
                body: formdata,
                redirect: "follow",
            })
                .then((result) => {
                    this.$notify({
                        group: "app",
                        type: "success",
                        title: "Sucesso! Iremos lhe avisar assim que o produto estiver disponível.",
                        duration: 4000,
                        ignoreDuplicates: true,
                    });

                    this.state = result.status;
                    this.email = null;
                })
                .catch((error) => {
                    this.$notify({
                        group: "app",
                        type: "error",
                        title: "Ocorreu um erro ao enviar.",
                        duration: 2000,
                        ignoreDuplicates: true,
                    });
                });
        },
        isEmail(email) {
            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
                email
            );
        },
        changeMainImage(image) {
            if (!image) {
                return;
            }

            this.mainImage = this.buildImage(image, "144", "118");
        },
        buildImage(image, width, height) {
            if (!image || !width || !height) return;

            image = image
                .toLowerCase()
                .trim()
                .replace(/~/g, "")
                .replace(/#width#/g, width)
                .replace(/#height#/g, height);

            return `https://tfcqav.vteximg.com.br${
                /<img.*?src="(.*?)"/.exec(image)[1]
            }`;
        },
    },
};
</script>
<style lang="scss">
.product__disabled {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #84a2b421;

    .disabled-box {
        width: 100%;
        padding: 16px;
        border: 1px solid #cecdc8;
        border-left: 3px solid #dd4f44;
        background: white;
        border-radius: 3px;
        font-family: "Nexa";
        font-weight: 300;
        font-size: 12px;
        margin-bottom: 20px;

        p {
            color: #dd4f44;
            padding-bottom: 12px;

            span {
                color: #3d2b1c;
            }
        }
    }

    .btn__notify {
        width: 390px;
        background: #dca399;
        font-family: "Nexa", sans-serif;
        font-size: 12px;
        font-weight: lighter;
        color: #ffffff;
        letter-spacing: 0.38px;
        text-transform: uppercase;
        border-radius: 20px;
        padding: 17px 0;
        border: 0;
        letter-spacing: 2px;
        text-transform: uppercase;

        @media (max-width: 767px) {
            width: 100%;
        }
    }
    .form__row {
        width: 100%;
        margin-bottom: 20px;

        .label-form {
            font: normal normal 300 12px/16px "Nexa";
            display: block;
            margin-bottom: 5px;
        }

        .field {
            width: 100%;
            background: #fff;
            padding: 15px;
            color: black;
            border-radius: 20px;
            font-family: "Nexa", sans-serif;
            font-size: 12px;
            font-weight: 300;

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
    }
}

.product___buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 27px;
    padding-bottom: 20px;

    .product__quantity {
        width: 80px;
        height: 34px;
        border: 1px solid #84a2b421;
        background: #fff0% 0% no-repeat padding-box;
        border-radius: 8px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .form__controls {
            .field {
                font-family: "Rubik", sans-serif;
                font-size: 14px;
                font-weight: bold;
                border: none;
                text-align: center;
                width: 30px;
                height: 32px;
                color: #dca399;
                background: #fff0% 0% no-repeat padding-box;
            }

            .quantity-minus {
                display: block;
                color: #dca399;
                font-size: 14px;
                font-weight: bold;
                position: relative;
                top: -1px;
                right: -5px;
            }

            .quantity-plus {
                display: block;
                color: #dca399;
                font-size: 14px;
                font-weight: bold;
                position: relative;
                top: -2px;
                left: -5px;
            }
        }
    }

    .btn__buy {
        width: 390px;
        background: #dca399;
        font-family: "Nexa", sans-serif;
        font-size: 12px;
        font-weight: lighter;
        color: #ffffff;
        letter-spacing: 0.38px;
        text-transform: uppercase;
        border-radius: 20px;
        padding: 17px 0;
        border: 0;
        letter-spacing: 2px;
        text-transform: uppercase;

        @media (max-width: 767px) {
            width: 100%;
        }
    }

    @media (max-width: 767px) {
        flex-direction: column;

        .product__quantity {
            margin-bottom: 30px;
        }
    }
}

.product__bottom {
    border-top: 1px solid #cecdc8;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    font-family: "Nexa";
    font-weight: 300;
    padding: 20px 5px;

    span {
        &:first-child {
            cursor: pointer;
            &:before {
                content: "";
                background: url("~@assets/hanger.svg") no-repeat center 39%;
                padding: 10px;
                margin: -10px 10px;
            }
        }

        &:last-child {
            cursor: pointer;
            &:before {
                content: "";
                background: url("~@assets/ico-truck.svg") no-repeat center 39%;
                padding: 10px;
                margin: -10px 10px;
            }

            &.active {
                font-weight: 700;
            }
        }
    }
}

.message__success {
    margin-top: 25px;

    p {
        &:first-of-type {
            font-family: "Nexa", sans-serif;
            font-weight: 300;
            color: #757575;
            margin-bottom: 10px;
        }

        &:last-of-type {
            font-family: "Nexa", sans-serif;
            font-weight: 300;
            color: #757575;
        }
    }
}
</style>
