<template>
    <a :href="brand" class="product__brand">
        {{ brand }}
    </a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            brand: 'GET_BRAND',
        }),
    },
};
</script>

<style lang="scss">
.product__brand {
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: #00CC83;
    text-transform: uppercase;
    margin-bottom: 25px;
    display: block;

    @media (max-width:767px) {
        text-align: center;
    }
}   
</style>
