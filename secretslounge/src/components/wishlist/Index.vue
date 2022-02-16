<template>
    <div>
        <div class="wishlistContainer">
            <h1 class="title-default">Favoritos</h1>
            <div>
                <div
                    v-if="wishlist && wishlist.length == 0"
                    class="wishlistContainer__inner"
                >
                    <p>
                        Sua lista está vazia. Que tal começar a encontrar
                        produtos?
                    </p>

                    <p>
                        <a href="/" class="btn">Ir para home</a>
                    </p>
                </div>
            </div>
        </div>

        <div>
            <transition name="fade">
                <div class="wrapper-large">
                    <div
                        class="
                            category__shelf category__shelf--wishlist
                            display--fourCols
                            loaded
                        "
                        ref="shelf"
                        v-if="wishlist && wishlist.length > 0"
                    >
                        <div
                            class="category__shelf__item"
                            v-for="product in products"
                            :key="product.id"
                        >
                            <ShelfItem
                                :productId="product.id"
                                :image="product.image"
                                :name="product.name"
                                :link="product.link"
                                :listPrice="product.listPrice"
                                :bestPrice="product.price"
                                :stock="product.stock"
                                :installments="product.installments"
                            />
                        </div>
                    </div>

                    <div class="category__pagination">
                        <paginate
                            v-if="total > perPage"
                            ref="paginate"
                            :page-count="pageNumbers"
                            :click-handler="paginationClick"
                            :prev-text="'anterior'"
                            :prev-class="'paginate--prev'"
                            :next-text="'próximo'"
                            :next-class="'paginate--next'"
                            :container-class="'pagination-page'"
                        >
                        </paginate>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../../services/vtex";
import ShelfItem from "./Shelfitem.vue";

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
            userId: "GET_USER_ID",
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
        //this.$store.commit('SET_LOADING', true);
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
            //this.$store.commit('SET_LOADING', true);
            const { data } = await api.get(
                `/api/catalog_system/pub/products/search/${query}`
            );

            //this.$store.commit('SET_LOADING', false);

            if (data.length == 0) {
                return;
            }
            const mappedProduct = data.map((item) => {
                return {
                    id: item.productId,
                    name: item.productName,
                    link: item.link,
                    image: item.items[0].images[0].imageTag,
                    listPrice:
                        item.items[0].sellers[0].commertialOffer.ListPrice,
                    price: item.items[0].sellers[0].commertialOffer.Price,
                    stock: item.items[0].sellers[0].commertialOffer
                        .AvailableQuantity,
                    installments: this.maxParcels(
                        item.items[0].sellers[0].commertialOffer.Installments
                    ),
                };
            });

            this.products = mappedProduct;
            return mappedProduct;
        },
        maxParcels(options) {
            if (!options.length) return;

            let listArr = [];

            for (let index = 0; index < options.length; index++) {
                listArr.push(options[index].NumberOfInstallments);
            }

            return Math.max(...listArr);
        },
    },
};
</script>

<style lang="scss" scoped>
.bread-crumb {
    ul {
        @media (max-width: 767px) {
            display: flex;
            justify-content: center;
        }
    }
}
.wishlistContainer {
    padding: 48px 0 0 0;
    max-width: 100%;
    margin: auto;
    text-align: center;
    font-size: 12px;
    .title-default {
        text-align: left;
        font: normal normal 700 24px/30px "Rubik";
        letter-spacing: 0px;
        color: #004871;
        margin-bottom: 60px;

        @media (max-width: 767px) {
            text-align: center;
        }
    }
    p {
        margin-top: 1em;
    }
    .btn {
        margin-top: 32px;
    }
}
.wishlistContainer__inner {
    padding-bottom: 120px;
}
.category__shelf--wishlist {
    min-height: 600px;
}
.category__shelf {
    display: flex;
    flex-wrap: wrap;
    .category__shelf__item {
        margin: 0 25px;

        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
        @media (max-width: 767px) {
            margin: 0 auto !important;
            margin-bottom: 20px;
        }
    }
}
</style>
