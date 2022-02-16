<template>
    <div>
        <div class="wishlistContainer shell">
            <h1 class="category__title">Wishlist <i class="ico-heart"></i></h1>
            <h2 class="pageSubtitle">seus produtos favoritos</h2>
            <p class="wishlistContainer__count" v-if="wishlist">
                {{ wishlist.length }} produto(s)
            </p>

            <div>
                <div
                    v-if="wishlist && wishlist.length == 0"
                    class="wishlistContainer__inner"
                >
                    <p>
                        Sua lista está vazia. Que tal começar a encontrar
                        produtos?
                    </p>

                    <p class="wishlistContainer__btn">
                        <a href="/" class="btnDefault">Ir para a home</a>
                    </p>
                </div>
            </div>

            <div class="category__body">
                <transition name="fade">
                    <div class="category__content --search">
                        <div
                            class="category__products --display-search"
                            v-if="wishlist && wishlist.length > 0"
                        >
                            <div class="cols">
                                <ShelfItem
                                    v-for="product in products"
                                    :key="product.productId"
                                    :productId="product.productId"
                                    :image="product.image"
                                    :name="product.name"
                                    :link="product.link"
                                    :color="product.color"
                                    :listPrice="product.listPrice"
                                    :price="product.price"
                                    :priceWithoutDiscount="
                                        product.priceWithoutDiscount
                                    "
                                    :stock="product.stock"
                                />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ShelfItem from "../../components/ShelfItem";
import api from "../../services/vtex";
import CreateProduct from "../../store/module/utils/createProduct";
export default {
    data() {
        return {
            products: [],
            isEmpty: false,
            total: 0,
            perPage: 15,
            from: 0,
            to: 14,
        };
    },
    components: {
        ShelfItem,
    },
    computed: {
        ...mapGetters({
            user: "GET_USER",
            wishlist: "GET_WISHLIST",
            loggedIn: "GET_USER_IS_LOGGED",
        }),
        pageNumbers() {
            return this.total > this.perPage
                ? Math.ceil(this.total / this.perPage)
                : 0;
        },
    },
    watch: {
        wishlist() {
            this.fetchWishlistProducts();
        },
    },
    created() {
        // this.$store.commit("SET__LOADING_PAGE", true);
    },
    methods: {
        paginationClick(index) {
            this.goToPage(index);
        },

        formatProductsQuery(productIds) {
            let query = "";
            for (let i = 0; i < productIds.length; i += 1) {
                query += `${i == 0 ? "?" : "&"}fq=productId:${productIds[i]}`;
            }
            return query;
        },

        async fetchWishlistProducts() {
            this.total = this.wishlist.length;
            if (this.wishlist.length > 0) {
                this.goToPage(1);
            }
        },

        goToPage(index) {
            const productIds = [];
            const pageIndex = index - 1;
            this.from = pageIndex * this.perPage;
            this.to = pageIndex * this.perPage + (this.perPage - 1);

            for (let i = this.from; i <= this.to; i += 1) {
                if (i < this.total) {
                    productIds.push(this.wishlist[i].productId);
                }
            }

            if (productIds.length > 0) {
                this.fetchProductById(productIds);
            }
        },

        async fetchProductById(productIds) {
            let query = this.formatProductsQuery(productIds);
            this.$store.commit("SET__LOADING_PAGE", true);
            const { data } = await api.get(
                `/api/catalog_system/pub/products/search/${query}`
            );

            this.$store.commit("SET__LOADING_PAGE", false);

            if (data.length == 0) {
                return;
            }
            const mappedProduct = CreateProduct(data);

            this.products = mappedProduct;
            return mappedProduct;
        },
    },
};
</script>

<style lang="scss">
.wishlistContainer {
    padding: 60px 0 0 0;
    max-width: 622px;
    margin: auto;
    text-align: center;
    min-height: 100vh;
    .category__title {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            margin-left: 8px;
        }
    }
    .pageSubtitle {
        margin-top: 16px;
    }
    p {
        margin-top: 1em;
    }
    .wishlistContainer__btn {
        text-align: center;
        margin: 32px auto 0 auto;
        width: 200px;
    }
}
.wishlistContainer__inner {
    padding-bottom: 120px;
}

.wishlistContainer__count {
    font-size: 12px;
    margin-top: 16px;
    letter-spacing: 0.04em;
}
</style>

