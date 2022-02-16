<template>
    <div class="btn__pagination__container">
        <button
            class="btn btn__pagination"
            @click.stop.prevent="pages()"
            :class="{ loading }"
            v-show="products.length < total"
        >
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
            <span>carregar mais </span>
        </button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            from: "GET_PAGINATION_FROM",
            to: "GET_PAGINATION_TO",
            loading: "GET__LOADING_PAGE",
            total: "GET_PRODUCTS_TOTAL",
            products: "GET_CATEGORY_PRODUCTS",
            perPage: "GET_CATEGORY_PERPAGE",
        }),
    },
    methods: {
        pages() {
            this.$store.commit("SET_PAGINATION_FROM", this.to + 1);
            this.$store.commit("SET_PAGINATION_TO", this.to + this.perPage);
        },
    },
};
</script>

<style lang="scss">
.btn__pagination {
    border-radius: 24px;
    position: relative;
    width: 200px;
    background: #956a64;
    color: #fff;
    max-width: 90%;
    margin: auto;
    height: 48px;
    padding: 0 32px 0 32px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;

    span {
        transition: transform 0.25s ease-out;
    }

    &:hover {
        background: #ad7971;
    }

    &.loading {
        background: #7b4a2c;
        transition: width 0.25s ease-out, background-color 0.25s ease-out,
            border-radius 0.15s 0s ease-out;

        span {
            transform: translateX(10px);
        }

        .btn__loader {
            display: block;
            height: 45%;
            transition: opacity 0.15s;
            opacity: 1;
            position: absolute;
            top: 0;
            left: 30px;
            bottom: 0;
            margin: auto;
            -webkit-animation: rotate-center 1.5s linear infinite both;
            animation: rotate-center 1.5s linear infinite both;
        }
    }
}
.btn__pagination__container {
    padding: 70px 0 100px 0;
    text-align: center;
}

.btn__loader {
    transition: opacity 0.25s, transform 0.25s;
}
.btn__loader {
    display: none;
}
</style>
