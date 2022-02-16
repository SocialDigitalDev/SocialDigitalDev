<template>
    <div>
        <button class="search__toggle" @click="toggleSearch(true)">
            <span class="search__toggle__fakeInput">Buscar</span>
            <i class="ico-search"></i>
        </button>

        <transition name="fade">
            <div class="search__inner" v-show="showSearch">
                <div class="shell">
                    <form
                        action="."
                        class="search__form"
                        @submit.stop.prevent="handlSearchRedirect"
                    >
                        <input
                            type="search"
                            placeholder="O que você busca hoje?"
                            v-model="querySearch"
                            ref="searchInput"
                        />
                        <button type="submit">
                            <i class="ico-search"></i>
                        </button>
                    </form>
                    <button class="search__close" @click="toggleSearch(false)">
                        <i class="ico-close"></i>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import api from "../../../services/vtex";

export default {
    data() {
        return {
            showSearch: false,
            loading: false,
            querySearch: null,
            showModal: false,
            products: [],
            timeout: null,
            onFocus: false,
            searchLink: null,
            suggestions: null,
            empty: null,
        };
    },

    watch: {
        showSearch() {
            if (this.showSearch) {
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            }
        },
    },

    methods: {
        toggleSearch(isOpen) {
            this.showSearch = isOpen;
        },
        handleClose() {
            if (this.open) {
                this.querySearch = "";
                this.showModal = false;
                this.products = [];
                this.empty = null;
                this.$store.commit("SET_SEARCH_OPEN", !this.open);
            }
        },
        handlSearchRedirect() {
            if (!this.querySearch || this.querySearch.length < 3) {
                return;
            }
            window.location.href = `/busca?ft=${this.querySearch.replace(
                /\./g,
                ""
            )}`;
        },
        handlDebounceSearch() {
            if (!this.querySearch || this.querySearch.length < 3) {
                this.showModal = false;
                this.products = [];
                this.empty = null;
                return;
            }

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                this.loading = true;
                this.fetchProducts(this.querySearch);
                this.fetchSuggestions(this.querySearch);
            }, 500);
        },
        async fetchProducts(query) {
            this.empty = false;
            const { data } = await api.get(
                `/api/catalog_system/pub/products/search?ft=${this.sanitize(
                    query
                )}&_from=0&_to=2&O=OrderByTopSaleDESC`
            );

            this.loading = false;

            if (data.length === 0) {
                this.showModal = true;
                this.empty = true;
                this.products = [];
                return;
            }

            this.products = data.map((product) => ({
                productId: product.productId,
                skuId: product.items[0].itemId,
                clusters: product.productClusters,
                name: product.productName,
                link: product.link,
                image: product.items[0].images[0].imageTag,
                listPrice:
                    product.items[0].sellers[0].commertialOffer.ListPrice,
                bestPrice: product.items[0].sellers[0].commertialOffer.Price,
                stock: product.items[0].sellers[0].commertialOffer
                    .AvailableQuantity,
            }));

            this.showModal = true;
        },

        sanitize(query) {
            return query ? query.replace(/\./g, "") : false;
        },

        async fetchSuggestions(query) {
            api.get(
                `/buscaautocomplete?productNameContains=${this.sanitize(query)}`
            ).then(
                (response) => {
                    const itemsWithCriteria =
                        response.data.itemsReturned.filter((item) => {
                            return item.criteria;
                        });
                    this.suggestions = itemsWithCriteria;
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        handleFocus() {
            if (this.querySearch && this.querySearch.length >= 3) {
                // this.handlDebounceSearch();
                this.showModal = true;
            }

            this.onFocus = true;
        },
        handleBlur() {
            this.onFocus = false;
        },
        resetSearchUI() {
            this.showModal = false;
            this.onFocus = false;
        },
    },
};
</script>

<style lang="scss">
.search__toggle {
    appearance: none;
    background: none;
    .ico-search {
        width: 16px;
        height: 16px;
    }
    .search__toggle__fakeInput {
        display: none;
    }
    @media (min-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 150px;
        flex-shrink: 0;
        border-bottom: 1px solid;
        color: #3d2b1c;
        .search__toggle__fakeInput {
            display: block;
            padding: 4px 8px;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: bold;
        }
    }
}
.search__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: #fffcf7;

    /* visibility: hidden;
    opacity: 0; */
    transition: all 0.25s;

    /* &.visible {
        visibility: visible;
        opacity: 1;
    } */
    .shell {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        background: transparent;
    }
}
.search__form {
    width: 960px;
    max-width: 90%;
    margin: auto 0;
    position: relative;
    @media (max-width: 767px) {
        margin-right: 16px;
    }
    &.loading {
        opacity: 0.15;
        pointer-events: none;
    }

    input {
        width: 100%;
        height: 40px;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #b2aaa1;
        font-size: 18px;
        padding: 4px 8px;
        background: transparent;
        &:focus {
            outline: 0;
            border: 0;
            border-bottom: 1px solid #b2aaa1;
        }
    }
    button {
        position: absolute;
        right: 0;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        i {
            height: 16px;
        }
    }
}
.search__close {
    position: static;
    margin: auto 0;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    .ico-close {
        width: 14px;
        height: 14px;
    }
}

.search__suggestion {
    background: $color-creme;
}
</style>
