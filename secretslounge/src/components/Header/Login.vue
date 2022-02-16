<template>
    <div class="header__login">
        <a href="/_secure/account/" v-if="user.logged !== null">
            <i class="ico ico-user" v-if="isMobile"></i>
            {{ user.logged ? "Meu Perfil" : "Entrar" }}
        </a>
        <span v-else> ... </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            isMobile: "GET__IS_MOBILE",
            user: "GET_USER",
        }),
    },
};
</script>

<style lang="scss">
.header__login {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: $color-brown-dark;
    letter-spacing: 0.04em;
    a {
        color: #3d2b1c;
        &:hover {
            color: #9a7453;
        }
    }
}
</style>
