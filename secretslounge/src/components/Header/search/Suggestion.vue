<template>
    <div class="suggestion__search" v-if="products.length">
        <ul class="suggestion__departments">
            <li v-for="(term, index) in terms" :key="index">
                <a :href="term.href"> {{ term.name }} </a>
            </li>
        </ul>
        <div class="suggestion__products">
            <ShelfItem
                v-for="product in products"
                :key="product.skuId"
                :productId="product.productId"
                :skuId="product.skuId"
                :image="product.image"
                :clusters="product.clusters"
                :name="product.name"
                :link="product.link"
                :listPrice="product.listPrice"
                :bestPrice="product.bestPrice"
                :stock="product.stock"
            />
        </div>

        <a
            v-if="querySearch"
            :href="`/busca?ft=${querySearch.replace(/\./g, '')}`"
            class="btnDefault"
        >
            Ver todos os resultados
        </a>
    </div>
</template>

<script>
import ShelfItem from "../../ShelfItem.vue";
export default {
    components: {
        ShelfItem,
    },
    props: ["products", "querySearch", "terms"],
    methods: {
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
        formatMoney(number, decimals, dec_point, thousands_sep, symbol) {
            if (!number || !decimals || !dec_point || !thousands_sep || !symbol)
                return;

            number = `${number}`.replace(",", "").replace(" ", "");

            const n = !isFinite(+number) ? 0 : +number;
            const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
            const sep =
                typeof thousands_sep === "undefined" ? "," : thousands_sep;
            const dec = typeof dec_point === "undefined" ? "." : dec_point;
            let s = "";

            const toFixedFix = function (n, prec) {
                const k = Math.pow(10, prec);
                return `${Math.round(n * k) / k}`;
            };

            s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split(".");
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }

            if ((s[1] || "").length < prec) {
                s[1] = s[1] || "";
                s[1] += new Array(prec - s[1].length + 1).join("0");
            }

            return `${symbol} ${s.join(dec)}`;
        },
    },
};
</script>

<style lang="scss">
.search__suggestion {
    padding: 12px 0;
    max-height: 50vh;
    overflow-y: auto;
}
.suggestion__search {
    .suggestion__products {
        .suggestion__item {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #b2aaa1;
            padding: 12px 0;

            .product__image {
                border: 1px solid #f2f0f7;
                padding: 5px;
            }

            .product__content {
                width: 45%;

                .product__title {
                    color: #000000;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 21px;
                }

                .product__prices {
                    display: flex;
                    margin-top: 10px;
                    flex-wrap: wrap;

                    @media (max-width: 767px) {
                        margin-top: 8px;
                        align-items: flex-end;
                    }

                    .price__list {
                        letter-spacing: 0.6px;
                        color: #4d4d4d;
                        font-size: 12px;
                        font-weight: 500;
                        margin-right: 10px;
                    }

                    .price__best {
                        letter-spacing: 0.6px;
                        color: #007db4;
                        font-size: 12px;
                        font-weight: bold;

                        /* Mobile */
                        @media (max-width: 767px) {
                            margin-top: 5px;
                        }
                    }
                }
            }

            .product__actions {
                width: 30%;

                .btn__primary {
                    font-size: 12px;
                }
            }
        }
    }

    .suggestion__products {
        display: flex;
        margin: 0 -12px;
        .product__item {
            width: 16.666%;
            padding: 12px;
        }
    }

    .btnDefault {
        margin: 24px auto;
        max-width: 400px;
    }
}

.suggestion__departments {
    font-weight: 700;
    padding: 8px;
    border-top: 1px solid #b2aaa1;
    li {
        display: block;
        padding: 4px 0;
    }
}
</style>
