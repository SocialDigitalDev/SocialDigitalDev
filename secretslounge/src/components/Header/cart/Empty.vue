<template>
    <div class="cart__empty">
        <h3 class="cart__empty__title">
            Sua sacola está vazia!
        </h3><!-- /.cart__empty__title -->

        <p class="cart__empty__text">
            Continue navegando em nossa loja para descobrir promoções e os melhores produtos!
        </p><!-- /.cart__empty__text -->

        <a href="#" class="btn btn__primary" @click.stop.prevent="controllerModal()">
            Continuar comprando
        </a><!-- /.btn.btn__primary -->
    </div><!-- /.empty__cart -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            showModal: 'GET_CART_MODAL',
        }),
    },
    methods: {
        controllerModal() {
            this.$store.commit('SET_CART_MODAL', !this.showModal);
        },
    },
};
</script>

<style lang="scss">
    @import '../../../sass/components/_buttons.scss';

    .cart__empty {
        width: 90%;
        margin: calc(100vh - 70vh) auto;
        padding: 0 35px;

        /* Mobile */
        @media (max-width:767px) {
            width: 100%;
            padding: 0 15px;
            margin: calc(100vh - 75vh) auto;
        }

        .cart__empty__title {
            text-align: center;
            font: normal normal bold 24px/28px 'Nexa';
            letter-spacing: 0.48px;
            color: #3D2B1C;
            margin-bottom: 25px;
        }

        .cart__empty__text {
            font: normal normal 300 16px/24px 'Nexa';
            letter-spacing: 0.64px;
            color: #3D2B1C;
            text-align: center;
        }
    }
</style>
