<template>
    <div>
        <article class="shell emptySearch">
            <h1 class="emptySearch__title">
                Não encontramos nenhum resultado para sua busca
            </h1>
            <h2 class="emptySearch__subtitle">
                Você buscou por “ {{ searchTerm }} ”
            </h2>
            <ul class="emptySearch__list">
                <li>- Tente palavras menos específicas;</li>
                <li>- Escreva pelo menos 4 caracteres no campo de busca;</li>
                <li>
                    - Use os menus do site para navegar pelas categorias dos
                    produtos
                </li>
            </ul>

            <a href="/" class="btnDefault">Ir para a home</a>
        </article>
        <div class="emptySearch__shelf">
            <div class="shell">
                <Shelf title="Nossos mais populares" collection="138" />
            </div>
        </div>
    </div>
</template>

<script>
import Shelf from "../../components/Shelf.vue";
export default {
    components: {
        Shelf,
    },
    data() {
        return {
            // eslint-disable-next-line no-undef
            searchTerm:
                window.location.port === "8080"
                    ? "searchName"
                    : vtxctx.searchTerm,
        };
    },
};
</script>

<style lang="scss">
.emptySearch {
    margin: 24px auto;
    padding: 24px 0 0 0;
    text-align: center;
    color: #3d2b1c;
    &,
    &.shell {
        max-width: 606px;
    }

    .btnDefault {
        width: 200px;
        margin: 32px auto;
    }
}

.emptySearch__title {
    font-size: 18px;
    @media (min-width: 768px) {
        font-size: 28px;
    }
}
.emptySearch__subtitle {
    font-size: 14px;
    font-weight: normal;
    margin: 48px ​auto;
    @media (min-width: 768px) {
        font-size: 18px;
    }
}

.emptySearch__term {
    font-weight: 700;
    font-size: 24px;
    margin-top: 8px;
    text-align: center;
}

.emptySearch__list {
    margin-top: 24px;
    font-size: 14px;
    letter-spacing: 0.04em;

    li {
        padding: 1px 0;
        display: block;
        @media (min-width: 768px) {
            margin-left: 1em;
        }
    }
}
.emptySearch__categories {
    padding: 24px 0 0;
    border-top: 1px solid;
    text-align: center;
    ul {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.09em;
        display: flex;
        justify-content: center;
    }
    li {
        margin: 16px 8px 0 8px;
    }
}
.emptySearch__categories__title {
    font-size: 14px;
    letter-spacing: 0.05em;
}

.emptySearch__newSearch {
    margin: 32px auto;
    .search {
        position: static;
    }
}

.emptySearch__suggestions {
    margin: 12px auto 32px auto;
    font-size: 12px;
    text-align: center;
    > * {
        padding: 0.5rem;
    }
    h3 {
        font-size: 1em;
    }
    a {
        display: block;
        &:hover {
            text-decoration: underline;
        }
    }
    @media (min-width: 768px) {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }
}

.emptySearch__shelf {
    margin: 100px auto;
}
</style>
