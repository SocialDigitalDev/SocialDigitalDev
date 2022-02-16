<template>
    <div class="description" :class="{ active: active }" v-if="description">
        <div class="description__body">
            <p class="text">
                {{ description }}
            </p>
        </div>

        <a
            v-if="description.length > 10"
            href="#"
            @click.stop.prevent="handleOpen()"
        >
            {{ active ? "Ver Menos" : "Ver Mais" }}
        </a>
        <span v-else></span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            active: false,
        };
    },
    computed: {
        ...mapGetters({
            description: "GET_DESCRIPTION",
        }),
    },
    methods: {
        handleOpen() {
            this.active = !this.active;
        },
    },
};
</script>

<style lang="scss">
.description {
    max-width: 100%;
    padding: 35px 0 12px 0;
    border-bottom: 1px solid #e0e0e0;

    > a {
        position: relative;
        display: flex;
        align-items: center;
        margin-top: 20px;
        font: normal normal 300 12px/16px "Nexa";
        letter-spacing: 0.48px;
        color: #3d2b1c;

        &::after {
            content: "";
            background-image: url(~@assets/arrow-down.svg);
            width: 9px;
            height: 6px;
            display: block;
            background-size: contain;
            background-repeat: no-repeat;
            margin-left: 15px;
            transition: 0.3s;
        }
    }

    .description__body {
        .text {
            text-align: left;
            font: normal normal 300 14px/21px "Nexa";
            letter-spacing: 0.56px;
            color: #3d2b1c;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box !important;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 50px;
            transition: 0.3s max-height;

            @media (max-width: 767px) {
                -webkit-line-clamp: 1;
            }
        }
    }

    @media (max-width: 767px) {
        max-width: 100%;
        padding-bottom: 30px;
    }

    &.active {
        > a {
            &::after {
                transform: rotate(180deg);
                margin-bottom: 5px;
                transition: 0.3s;
            }
        }
        .description__body {
            .text {
                overflow: initial;
                text-overflow: initial;
                display: -webkit-box !important;
                -webkit-line-clamp: initial;
                -webkit-box-orient: initial;
                max-height: none;
                transition: 0.3s max-height;
            }
        }
    }
}
</style>
