<template>
    <div class="headerContainer" :class="{ scroll: isMobile }">
        <Bar />

        <Inner />

        <div class="header__nav" v-if="true">
            <Navegation />
        </div>
        <!-- /.header__nav -->
    </div>
    <!-- /.header__content -->
</template>

<script>
import Navegation from "./Navigation/";
import Bar from "./Bar.vue";
import Inner from "./Inner.vue";
import { mapGetters } from "vuex";

export default {
    components: {
        Inner,
        Bar,
        Navegation,
    },
    computed: {
        ...mapGetters({
            isMobile: "GET__IS_MOBILE",
        }),
    },
};
</script>

<style lang="scss">
.headerContainer {
    width: 100%;
    background-color: #fff;
    position: relative;
    z-index: 9;

    &.scroll {
        position: fixed;
        top: 0;

        .nav__link .link .dropdown__inner {
            top: 111px;
        }
    }

    /* Mobile */
    @media (max-width: 767px) {
        border-bottom: 1px solid #e0e0e0;
    }
}

.header--fixed {
    width: 100%;
    z-index: 9;
    background: #fff;
    transition: transform 0.4s;
    transform: translateY(0px);
}
</style>
