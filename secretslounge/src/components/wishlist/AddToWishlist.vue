<template>
    <button
        class="addToWishlist"
        v-if="wishlist"
        :class="{
            '--favorite': isFavorited,
            '--loading': loading,
            '--disabled': !productId,
        }"
        v-on:click="setFavorite()"
    >
        <svg
            viewBox="0 0 15 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="Icon_feather-heart"
                d="M12.995,1.79C12.327,1.122 11.42,0.746 10.476,0.746C9.531,0.746 8.624,1.122 7.956,1.79L7.269,2.477L6.582,1.79C5.912,1.104 4.992,0.717 4.034,0.717C2.079,0.717 0.471,2.326 0.471,4.28C0.471,5.239 0.858,6.159 1.544,6.829L7.27,12.555L12.996,6.829C13.664,6.161 14.04,5.254 14.04,4.31C14.04,3.365 13.664,2.458 12.995,1.79Z"
            />
        </svg>
    </button>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../../services/vtex";

export default {
    data() {
        return {
            loading: false,
            isFavorited: null,
        };
    },
    props: {
        productId: { type: String },
    },
    computed: {
        ...mapGetters({
            wishlist: "GET_WISHLIST",
            user: "GET_USER",
        }),
    },
    watch: {
        wishlist() {
            this.checkIsFavorited();
        },
    },

    created() {
        if (this.wishlist) {
            this.checkIsFavorited();
        }
    },

    methods: {
        checkIsFavorited() {
            const check = this.wishlist.filter(
                (product) => product.productId === this.productId
            );
            this.isFavorited = check.length > 0;
        },
        setFavorite() {
            if (!this.productId) {
                return false;
            }
            if (this.loading) {
                return false;
            }
            if (!this.user.logged) {
                return (window.location.href = "/login");
            }
            this.loading = true;
            let updatedWishlist = [];
            let operation = null;

            if (this.isFavorited) {
                updatedWishlist = this.wishlist.filter(
                    (item) => item.productId !== this.productId
                );
                operation = "remove";
            } else {
                updatedWishlist = [
                    ...this.wishlist,
                    {
                        productId: this.productId,
                    },
                ];
                operation = "add";
            }
            return this.updateWishlist(updatedWishlist, operation);
        },

        updateWishlist(wishlist, operation) {
            api.patch("/api/dataentities/WL/documents", {
                id: this.user.id,
                wishlist,
            })
                .then((data) => {
                    this.$store.dispatch("FETCH_WISHLIST", this.user.id);
                    setTimeout(() => {
                        this.loading = false;
                        this.showFeedback(operation);
                    }, 1000);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        showFeedback(status) {
            const msg =
                status === "add"
                    ? "Produto adicionado aos seus favoritos!"
                    : "Produto removido dos seus favoritos!";

            /*  return this.$notify({
                group: "app",
                type: "success",
                title: msg,
                ignoreDuplicates: true,
            }); */
        },
    },
};
</script>

<style lang="scss">
.addToWishlist {
    position: absolute;
    top: 8px;
    right: 8px;

    z-index: 1;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background: #f5efe6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        width: 12px;
        height: 12px;
        path {
            fill: none;
            fill-rule: nonzero;
            stroke: #3d2b1c;
            stroke-width: 1px;
        }
    }

    &:hover,
    &.--favorite {
        svg {
            path {
                fill: #e7b2a5;
                stroke: #e7b2a5;
            }
        }
    }
    &.--favorite {
        border: 1px solid #e7b2a5;
    }

    &.--loading {
        cursor: default;
        animation: blink 1.6s infinite both;
    }
}
.addToWishlist__btn.--disabled {
    opacity: 0.25;
    pointer-events: none;
}
</style>
