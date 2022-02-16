<template>
    <div class="selecteds" v-if="selecteds.length">
        <div
            class="checkbox"
            v-for="(item, index) in selecteds"
            :key="index"
            @click="removeFiltersSelected(item)"
        >
            <label class="label">
                {{ item.name }}
            </label>

            <input type="checkbox" class="field" v-model="item.checked" />
        </div>

        <a class="remove" @click.stop.prevent="removeAllFiltersSelected()">
            Limpar tudo
        </a>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            selecteds: "GET_FILTERS_SELECTEDS",
            filters: "GET_SPECIFICATIONS_FILTERS",
            prices: "GET_FILTERS_PRICE",
        }),
    },
    methods: {
        removeFiltersSelected(selected) {
            this.updadeFilterSelected(selected);

            if (selected.tapy === "price") {
                this.prices[selected.name].checked = false;
                return;
            }

            this.filters[selected.tapy].filters[selected.name].checked = false;
        },
        removeAllFiltersSelected() {
            this.$store.commit("SET_FILTERS_SELECTEDS", []);
        },
        updadeFilterSelected(selected) {
            const filtersSelecteds = this.selecteds.filter(
                (item) => item.name !== selected.name
            );

            this.$store.commit("SET_FILTERS_SELECTEDS", filtersSelecteds);
        },
    },
};
</script>

<style lang="scss">
@import "@sass/base/_typography.scss";
@import "@sass/utils/_variables.scss";
@import "@sass/utils/_mixin.scss";

.selecteds {
    display: flex;
    margin-bottom: 29px;

    @media (max-width: 767px) {
        flex-flow: row wrap;
    }

    @media (min-width: 768px) {
        padding: 0 25px;
    }

    .checkbox {
        border: 1px solid #dda69d;
        padding: 5px 20px;
        border-radius: 20px;
        margin-right: 9px;
        cursor: pointer;

        &:hover {
            background: #fff1ef;
        }

        @media (max-width: 767px) {
            display: flex;
            align-items: center;
        }

        label {
            font: normal normal 300 12px/24px "Nexa";
            color: #3d2b1c;
            text-transform: uppercase;
            margin-right: 13px;
            position: relative;
            cursor: pointer;
            line-height: 1;
        }
    }

    .field {
        position: relative;
        left: 7px;
        appearance: none;
        padding: 6px;
        background: url("~@assets/icon-close-filter.svg") no-repeat center
            center;
        cursor: pointer;
        @media (max-width: 767px) {
            top: 0;
            left: 0;
        }
    }

    .remove {
        font: normal normal 300 10px/24px "Nexa";
        color: #7b4a2c;
        align-self: center;
        padding-left: 25px;

        @media (max-width: 767px) {
            line-height: 1;
            margin-top: 12px;
            padding-left: 0;
            width: 100%;
        }
    }
}
</style>
