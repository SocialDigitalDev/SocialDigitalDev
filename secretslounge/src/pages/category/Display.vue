<template>
    <div class="header__buttons">
        <button
            class="btn-cols-2"
            :class="{ active: display == 'default' }"
            @click="setDisplay('default')"
        ></button>
        <button
            class="btn-cols-3"
            :class="{ active: display == 'secondary' }"
            @click="setDisplay('secondary')"
        ></button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            display: 'GET_CATEGORY_DISPLAY',
        }),
    },
    methods: {
        setDisplay(display) {
            this.$store.commit('SET_CATEGORY_DISPLAY', display);
        },
    },
};
</script>

<style></style>
