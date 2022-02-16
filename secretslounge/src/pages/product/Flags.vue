<template>
    <div class="product__flags">
        <span class="flag discount" v-if="discount > 0">
            {{ discount }}% de desconto
        </span>

        <span class="flag" v-for="(cluster, index) in clusters" :key="index">
            {{ cluster }}
        </span>       
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            discount: null,
        };
    },
    computed: {
        ...mapGetters({
            clusters: 'GET_CLUSTER',
            listPrice: 'GET_LIST_PRICE',
            bestPrice: 'GET_BEST_PRICE',
        }),
    },
    watch: {
        bestPrice() {
            this.discount = this.calculateRelativePercentage(
                this.bestPrice,
                this.listPrice,
            );
        }
    },
    methods: {
        calculateRelativePercentage(bestPrice, listPrice) {
            const discount = 100 - (bestPrice * 100) / listPrice;
            return discount.toFixed(0);
        },       
    },
};
</script>

<style lang="scss">
.product__flags {
    display: flex;
    margin-bottom: 24px;

    @media (max-width:767px) {
        justify-content: center;
    }

    .flag {
        background: #FF5E5E;
        font-family: 'Rubik', sans-serif;
        font-size: 8px;
        font-weight: bold;
        color: #ffff;
        letter-spacing: 0.26px;
        text-transform: uppercase;
        padding: 10px;
        margin-right: 15px;
        border-radius: 2px;

        &.discount {
            background: #FFAF10;
        }
    }

    .share__whats{
        margin-top: 4px;
        width: 14px;
        height: 14px;
        opacity: .5;
        transition: .4s;

        &:hover{
            opacity: 1;
            transition: .4s;
        }
    }
}
</style>
