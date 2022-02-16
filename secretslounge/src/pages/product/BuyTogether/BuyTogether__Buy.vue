<template>
    <button
        class="btn btn--buy"
        :disabled="stock === 0 || productStatus === 'added'"
        @click.stop.prevent="handleAddToCart()"
    >
        <span class="btn btn__hideOnLoading">
            Adicionar {{ id.length }} itens
        </span>

        <svg
            class="btn__loader"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
        >
            <g id="content" transform="translate(-91 -0.899)">
                <path
                    id="spinner"
                    d="M1.406-11.719A1.406,1.406,0,0,0,0-13.125a1.406,1.406,0,0,0-1.406,1.406A1.406,1.406,0,0,0,0-10.312,1.406,1.406,0,0,0,1.406-11.719ZM0-.937A1.406,1.406,0,0,0-1.406.469,1.406,1.406,0,0,0,0,1.875,1.406,1.406,0,0,0,1.406.469,1.406,1.406,0,0,0,0-.937ZM6.094-7.031A1.406,1.406,0,0,0,4.687-5.625,1.406,1.406,0,0,0,6.094-4.219,1.406,1.406,0,0,0,7.5-5.625,1.406,1.406,0,0,0,6.094-7.031ZM-4.688-5.625A1.406,1.406,0,0,0-6.094-7.031,1.406,1.406,0,0,0-7.5-5.625,1.406,1.406,0,0,0-6.094-4.219,1.406,1.406,0,0,0-4.688-5.625Zm.379,2.9A1.406,1.406,0,0,0-5.715-1.316,1.406,1.406,0,0,0-4.309.09,1.406,1.406,0,0,0-2.9-1.316,1.406,1.406,0,0,0-4.309-2.722Zm8.618,0A1.406,1.406,0,0,0,2.9-1.316,1.406,1.406,0,0,0,4.309.09,1.406,1.406,0,0,0,5.715-1.316,1.406,1.406,0,0,0,4.309-2.722ZM-4.309-11.34A1.406,1.406,0,0,0-5.715-9.934,1.406,1.406,0,0,0-4.309-8.528,1.406,1.406,0,0,0-2.9-9.934,1.406,1.406,0,0,0-4.309-11.34Z"
                    transform="translate(98.5 14.024)"
                    fill="#fff"
                />
            </g>
        </svg>
    </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        id: {
            type: Array,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        stock: {
            type: Number,
            default: 1,
        },
        layout: {
            type: String,
        },

        productAdded: {
            type: Boolean,
        },
        productStatus: {
            type: String,
            // ['added', 'pending']
        },

        enabled: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        ...mapGetters({
            productQuantity: "GET_PRODUCT_QUANTITY",
            productsInOrderForm: "GET_CART_PRODUCTS",
        }),
    },

    methods: {
        isProductAdded() {
            const isInOrderForm = this.handleGetProductIndex(
                this.productsInOrderForm,
                this.id
            );

            this.$emit(
                "onUpdateStatus",
                isInOrderForm.itemIndex !== null ? "added" : null
            );
        },
        updateCartValue(orderForm) {
            this.$store.commit("SET_CART_VALUE", {
                value: orderForm.value,
                totalizers: orderForm.totalizers,
            });
            this.$store.commit("SET_CART_PRODUCTS", orderForm.items);
        },
        updateCartInfo(orderForm) {
            this.updateCartValue(orderForm);
            this.$store.commit("SET_CART_VALUE", {
                value: orderForm.value,
                totalizers: orderForm.totalizers,
            });
            this.$store.commit("SET_CART_PRODUCTS", orderForm.items);
        },

        handleGetProductIndex(products, skuId) {
            let productIndex = null;
            products.forEach((product, index) => {
                if (product.id === skuId) {
                    productIndex = index;
                }
            });

            return { itemIndex: productIndex };
        },

        async handleAddToCart() {
            if (!this.enabled) {
                this.$emit("onError");
                return false;
            }

            this.$store.commit("SET__LOADING_PAGE", true);

            // eslint-disable-next-line no-undef
            return vtexjs.checkout.getOrderForm().then((orderForm) => {
                let producsToAdd = [];

                this.id.forEach((item) => {
                    const isInCart = this.handleGetProductIndex(
                        orderForm.items,
                        item
                    );
                    if (!isInCart.itemIndex) {
                        producsToAdd.push(item);
                    }
                });

                producsToAdd = producsToAdd.map((item) => {
                    return {
                        id: item,
                        quantity: 1,
                        seller: 1,
                    };
                });

                // eslint-disable-next-line no-undef
                vtexjs.checkout
                    .addToCart(producsToAdd, null, 1)
                    .done((orderForm) => {
                        this.updateCartInfo(orderForm);

                        this.$store.commit("SET__LOADING_PAGE", false);
                        this.$emit("onUpdateStatus", "added");

                        if (window.innerWidth >= 1024) {
                            this.$store.commit("SET_CART_MODAL", true);
                        }
                    })
                    .fail(() => {
                        this.$store.commit("SET__LOADING_PAGE", false);
                        this.$notify({
                            group: "app",
                            type: "error",
                            title: "Houve um erro ao adicionar o produto",
                            duration: 2500,
                            ignoreDuplicates: true,
                        });
                    });
            });
        },
    },
};
</script>

<style lang="scss">
.btn--buy {
    width: 100%;
    background: #dca399;
    color: #ffffff;
    font-family: "Nexa", sans-serif;
    font-size: 12px;
    font-weight: lighter;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    height: auto;
    min-height: 48px;
    margin-top: 20px;

    svg {
        width: 14px;
        height: 14px;
    }

    @media (min-width: 1024px) {
        min-width: 295px;
    }

    .btn--buy__label {
        flex: 1 1 0;
        @media (max-width: 767px) {
            display: none;
        }
    }

    &:hover {
    }

    &.loading {
        /* background: $red--dark;
        color: #fff; */
        .btn__hideOnLoading {
            transform: translateX(40px);
        }
    }

    &.disabled {
        svg {
            display: none;
        }
    }
}
.btn--buy__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    padding-top: 4px;
    padding-bottom: 4px;
}
</style>
