<template>
    <div class="content__medidas">
        <span class="label-ship btn__medidas" @click.stop.prevent="openMedidas">
            Tabela de Medidas
        </span>
        <div class="inner__medidas" :class="{ active: showMedidas }">
            <a href="#" class="btn__close" @click.stop.prevent="openMedidas">
                <img src="~@assets/ico-close.svg" alt="" />
            </a>

            <div class="body__medidas">
                <h5 class="title-table">Blusas e Camisas</h5>
                <p class="desc-table">
                    Encontre o tamanho ideal para você através das medidas*
                    corporais na tabela abaixo.
                </p>

                <div class="table__medidas">
                    <table>
                        <thead>
                            <tr>
                                <td>TAM</td>
                                <td>BUSTO</td>
                                <td>CINTURA</td>
                                <td>QUADRIL</td>
                                <td>MANGA</td>
                                <td>COMPRIMENTO</td>
                                <td>OMBRO</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>34</td>
                                <td>86</td>
                                <td>65</td>
                                <td>94</td>
                                <td>94</td>
                                <td>94</td>
                                <td>94</td>
                            </tr>
                            <tr>
                                <td>36</td>
                                <td>90</td>
                                <td>69</td>
                                <td>98</td>
                                <td>98</td>
                                <td>98</td>
                                <td>98</td>
                            </tr>
                            <tr>
                                <td>38</td>
                                <td>94</td>
                                <td>73</td>
                                <td>102</td>
                                <td>102</td>
                                <td>102</td>
                                <td>102</td>
                            </tr>
                            <tr>
                                <td>40</td>
                                <td>98</td>
                                <td>77</td>
                                <td>106</td>
                                <td>106</td>
                                <td>106</td>
                                <td>106</td>
                            </tr>
                            <tr>
                                <td>42</td>
                                <td>102</td>
                                <td>69</td>
                                <td>110</td>
                                <td>110</td>
                                <td>110</td>
                                <td>110</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="obs-table">*Medidas em Centímetros</p>
            </div>
        </div>

        <div
            class="overlay"
            :class="{ active: showMedidas }"
            @click.stop.prevent="openMedidas"
        ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMedidas: false,
            isMobile: window.screen.width < 768,
        };
    },
    methods: {
        openMedidas() {
            this.showMedidas = !this.showMedidas;
        },
    },
};
</script>

<style lang="scss">
.content__medidas {
    display: flex;
    margin-right: 23px;

    @media (max-width: 768px) {
        margin-right: 0;
    }

    .btn__medidas {
        font-size: 12px;
        justify-content: space-between;
        font-family: "Nexa";
        font-weight: 300;
    }

    .inner__medidas {
        width: 540px;
        height: 42vh;
        overflow-y: auto;
        background-color: #fffcf7;
        position: fixed;
        top: 28%;
        left: 0;
        right: 0;
        z-index: 4;
        display: block;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        transform: translate(5000px);
        transition: all 0.4s;
        margin: 0 auto;

        /* Mobile */
        @media (max-width: 768px) {
            width: 100%;
            background-color: #f5efe6;
            height: 60vh;
        }

        &.active {
            transform: translateX(0);
            transition: all 0.4s;
        }

        .btn__close {
            position: absolute;
            top: 29px;
            right: 25px;

            img {
                width: 12px;
                height: 12px;
            }
        }

        .body__medidas {
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            padding: 30px;
            text-align: center;

            .title-table {
                font-size: 24px;
                color: #3d2b1c;
                margin-bottom: 10px;
                font-weight: 700;
            }
            .desc-table {
                text-align: center;
                margin-bottom: 10px;
                color: #3d2b1c;
            }

            .obs-table {
                font-weight: 400;
                text-align: right;
                color: #3d2b1c;
            }

            .title {
                font-family: "Titillium Web";
                color: black;
                font-weight: 700;
                font-size: 20px;
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                margin-bottom: 31px;
            }

            .table__medidas {
                table {
                    width: 100%;
                    text-align: center;
                    border-top: 1px solid #3d2b1c;
                    border-collapse: collapse;
                    margin-bottom: 20px;

                    @media (max-width: 767px) {
                        display: block;
                        overflow-x: auto;
                    }

                    thead {
                        background: #f5efe6;
                        td {
                            color: #3d2b1c;
                            font-weight: 800;
                        }
                    }

                    tbody {
                        tr {
                            &:nth-child(odd) {
                                background: #fffcf7;
                            }

                            &:nth-child(even) {
                                background: #f5efe6;
                            }
                        }
                    }

                    td {
                        padding: 10px 0;
                        color: #3d2b1c;

                        @media (max-width: 767px) {
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }

    .modal__gallery {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;

        &.modal-enter {
            opacity: 0;

            .modal_container {
                transform: scale(1.1);
            }
        }

        &.modal-leave-active {
            opacity: 0;

            .modal_container {
                transform: scale(1.1);
            }
        }

        .modal_wrapper {
            display: table-cell;
            vertical-align: middle;

            .modal_container {
                width: 95%;
                height: 432px;
                margin: 0px auto;
                padding: 31px 12px 10px;
                background-color: #fff;
                border-radius: 0;
                transition: all 0.3s ease;
                position: relative;

                .btn-close {
                    position: absolute;
                    top: 20px;
                    right: 15px;
                }

                .content-view {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    .body-view {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        align-items: center;

                        .title {
                            font-family: "Titillium Web";
                            color: black;
                            font-weight: 700;
                            font-size: 20px;
                            width: 100%;
                            text-align: center;
                            text-transform: uppercase;
                            margin-bottom: 31px;
                        }
                    }

                    .body__last {
                        display: flex;
                        flex-direction: column;
                        width: 30%;
                        align-items: center;

                        /* Mobile */
                        @media (max-width: 767px) {
                            width: 100%;
                        }

                        h3 {
                            font-size: 16px;
                            text-transform: uppercase;
                            letter-spacing: 1.6px;
                            color: #000000;
                            text-align: center;
                            font-weight: 700;
                            margin-bottom: 15px;
                            width: 100%;
                        }

                        .border__sublinhada {
                            border: 1px dotted #000;
                            border-bottom: 0;
                            padding-bottom: 10px;
                            width: 100%;
                            height: 20px;
                            display: flex;
                            justify-content: center;
                        }

                        .content__medidas {
                            width: 100%;
                            margin-top: 10px;
                            display: flex;

                            .list {
                                display: flex;
                                flex-direction: column;
                                width: 70%;
                                margin-bottom: 30px;
                                border-right: 1px solid #999999;

                                &:nth-last-child(1) {
                                    border-right: 0;
                                }

                                &:nth-child(1) {
                                    width: 30%;
                                }

                                .item {
                                    background-color: #efefef;
                                    padding: 10px 34px;
                                    font-size: 14px;
                                    font-weight: 500;
                                    text-transform: uppercase;
                                    font-family: "Futura New Demi";
                                    color: #000;
                                    letter-spacing: 0.7px;
                                }

                                li {
                                    padding: 10px 0;
                                    border-bottom: 1px solid #999999;
                                    font-size: 13px;
                                    font-weight: 500;
                                    color: #000000;
                                    text-align: center;

                                    &:nth-last-child(1) {
                                        border: none;
                                    }
                                }
                            }
                        }

                        .footer-view {
                            p {
                                text-align: center;
                                font-size: 14px;
                                font-weight: 700;
                                text-transform: uppercase;
                                color: #000000;
                                letter-spacing: 1px;
                            }
                        }
                    }
                }
            }
        }
    }

    .overlay {
        z-index: 3;
    }
}
</style>
