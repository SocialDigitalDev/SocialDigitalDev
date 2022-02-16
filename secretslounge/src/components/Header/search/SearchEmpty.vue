<template>
    <div class="empty__search">
        <h3 class="empty">
            Sua busca para <span>{{ querySearch }}</span> não retornou nenhum
            resultado.
        </h3>
        <!-- /.empty -->
    </div>
    <!-- /.empty__search -->
</template>

<script>
export default {
    props: ["querySearch"],
    methods: {},
};
</script>

<style lang="scss">
.empty__search {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    .empty {
        font-size: 14px;
        font-weight: normal;
        padding: 0 50px;
        letter-spacing: 1.6px;
        line-height: 1.8em;
        color: #3f3948;
        text-align: center;
        text-transform: uppercase;
        span {
            font-weight: bold;
        }
    }
}
</style>
