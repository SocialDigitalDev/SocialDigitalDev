<template>
    <div class="login__component">
        <a href="#" class="open__login" v-if="!loggedIn" @click.stop.prevent="controllerModal()">
            <i class="ico-login"></i> Entrar
        </a><!-- /.open__login -->

        <a href="/_secure/account/#/profile" class="open__login" v-if="loggedIn">
            <i class="ico-login"></i> Olá, {{ user }}
        </a><!-- /.open__login -->

        <a href="#" class="open__login__mobile" v-if="!loggedIn" @click.stop.prevent="controllerModal()">
            <i class="ico-login"></i>
        </a><!-- /.open__login -->

        <a href="#" class="open__login__mobile" v-if="loggedIn" @click.stop.prevent="controllerLogin()">
            <i class="ico-login"></i>
        </a><!-- /.open__login -->
        
        <transition name="modal">
            <div class="modal__mask" v-if="showModal">
                <div class="modal__wrapper">
                    <div class="modal__container">
                        <a href="#" class="btn__close" @click.stop.prevent="controllerModal()"> 
                            Fechar 
                        </a><!-- /.btn__close -->

                        <div class="cols">
                            <div class="col col-1of2">
                                <div class="content__logged owl-carousel" v-carousel>
                                    <form action="?" class="user__logged" data-hash="user-logged">
                                        <header class="header__title">
                                            <h3> Já tenho <br/> CNPJ cadastrado </h3>
                                        </header><!-- /.header__title -->
                                        
                                        <div class="form__controls">
                                            <label for="email" class="field__label"> 
                                                Seu e-mail
                                            </label><!-- /.field__label -->
                                            
                                            <input type="email" name="email" placeholder="E-mail" class="field" v-model="email"/>
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls">
                                            <label for="password" class="field__label"> 
                                                Sua senha
                                            </label><!-- /.field__label -->
                                            
                                            <input type="password" name="password" placeholder="Senha" class="field" v-model="password"/>
                                        
                                            <a href="#" class="btn__forgot" @click.stop.prevent="changeUrlHash('confir-email')"> 
                                                Esqueci minha senha
                                            </a><!-- /.btn__forgot -->
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls">
                                            <button class="btn btn__black" @click.stop.prevent="authenticateUser()">
                                                Entrar
                                            </button><!-- /.btn__black -->
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls">
                                            <a href="#"  class="btn btn__white" :class="{'btn btn__white': isMobile }" @click.stop.prevent="changeUrlHash('confir-email')">
                                                Ainda não tem senha? Crie uma agora
                                            </a><!-- /.btn__newpassword -->
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls" v-if="isMobile">
                                            <a href="/cadastro" class="btn btn__black">
                                                Ir para cadastro
                                            </a><!-- /.btn__newpassword -->
                                        </div><!-- /.form__controls -->
                                    </form><!-- /.user__logged -->

                                    <form action="?" class="confir__email"  data-hash="confir-email">
                                        <header class="header__title">
                                            <h3> Confirme seu<br/> endereço de email </h3>
                                        </header><!-- /.header__title -->

                                        <div class="form__controls">
                                            <label for="email" class="field__label"> 
                                                E-mail
                                            </label><!-- /.field__label -->
                                            
                                            <input type="text" name="email" placeholder="E-mail" class="field" v-model="email"/>
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls form__actions">
                                            <button class="btn btn__white" @click.stop.prevent="changeUrlHash('user-logged')">
                                                Voltar
                                            </button><!-- /.btn__white -->

                                            <button class="btn btn__black" @click.stop.prevent="handleCustomerIsRegistered()">
                                                Confirmar
                                            </button><!-- /.btn__black -->
                                        </div><!-- /.form__actions -->
                                    </form><!-- /.confir__email -->

                                    <form action="?" class="new__password" data-hash="new-password">
                                        <header class="header__title">
                                            <h3> Criar uma <br/> nova senha </h3>
                                        </header><!-- /.header__title -->

                                        <div class="form__controls">
                                            <label for="password" class="field__label"> 
                                                Nova senha
                                            </label><!-- /.field__label -->
                                            
                                            <input type="password" name="password" placeholder="Nova senha" class="field" v-model="password"/>
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls">
                                            <label for="newPassword" class="field__label"> 
                                                Confirmar nova senha
                                            </label><!-- /.field__label -->
                                            
                                            <input type="password" name="newPassword" placeholder="Confirmar nova senha" class="field" v-model="newPassword"/>
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls">
                                            <ul class="senha__description">
                                                <li><strong>Sua senha deve contar no mínimo</strong></li>
                                                <li>• 8 caracteres</li>
                                                <li>• 1 letra maiúscula</li>
                                                <li>• 1 letra minúscula</li>
                                                <li>• 1 número</li>
                                            </ul>
                                        </div>

                                        <div class="form__controls form__actions">
                                            <button class="btn btn__white" @click.stop.prevent="changeUrlHash('confir-email')">
                                                Voltar
                                            </button><!-- /.btn__purple -->

                                            <button class="btn btn__black" @click.stop.prevent="validatePassword()">
                                                Criar
                                            </button><!-- /.btn__black -->
                                        </div><!-- /.form__actions -->
                                    </form><!-- /.new__password -->

                                    <form action="?" class="validade__accessKey" data-hash="validade-accessKey">
                                        <header class="header__title">
                                            <h3> Enviamos uma  <br/> chave acesso por e-mail </h3>
                                        </header><!-- /.header__title -->

                                        <div class="form__controls">
                                            <label for="accessKey" class="field__label"> 
                                                Digite seu código
                                            </label><!-- /.field__label -->
                                            
                                            <input type="text" name="accessKey" placeholder="Chave de acesso" class="field" v-model="accessKey"/>
                                        </div><!-- /.form__controls -->

                                        <div class="form__controls form__actions">
                                            <button class="btn btn__white" @click.stop.prevent="changeUrlHash('confir-email')">
                                                Voltar
                                            </button><!-- /.btn__white -->

                                            <button class="btn btn__black" @click.stop.prevent="changePassword()">
                                                Validar Chave
                                            </button><!-- /.btn__black -->
                                        </div><!-- /.form__actions -->
                                    </form><!-- /.validade__accessKey -->
                                </div><!-- /.content -->
                            </div><!-- /.col.col-1of2 -->

                            <div class="col col-2of2" v-if="!isMobile">
                                <div class="content__logged">
                                    <header class="header__title">
                                        <h3> Quero <br/> me cadastrar </h3>
                                    </header><!-- /.header__title -->
                                    
                                    <div class="user__register">
                                        <h5> Atenção </h5>

                                        <p> Vendas apenas no atacado. <br/> Cadastro apenas para lojistas com CNPJ ativo, <br/> sujeito a aprovação. </p>

                                        <a href="/cadastro" class="btn btn__white">
                                            Ir para cadastro
                                        </a><!-- /.btn__white -->
                                    </div><!-- /.user__register -->
                                </div><!-- /.content__logged -->
                            </div><!-- /.col.col-2of2 -->
                        </div><!-- /.cols -->
                    </div><!-- /.modal__container -->
                </div><!-- /.modal__wrapper -->
            </div><!-- /.modal__mask -->
        </transition>

        <div class="content__loggin" :class="{'active': showLoggin }" v-if="isMobile">
            <div class="content">
                <a href="/_secure/account/#/cards" class="btn__loggin">Cartão</a>
                <a href="/_secure/account/#/profile" class="btn__loggin">Dados pessoais</a>
                <a href="/_secure/account/#/orders" class="btn__loggin">Pedidos</a>
                <a href="/no-cache/user/logout" class="btn__loggin">Sair</a>
            </div>
        </div>
        <div class="overlay" @click.stop.prevent="controllerLogin()" :class="{ 'active': showLoggin }"></div><!-- /.overlay -->
    </div><!-- /.login__component -->
</template>

<script>
    import { mapGetters } from 'vuex';
    import vtex from '../../services/vtex.js';
    import Swal from 'sweetalert2';

    export default {
        props: ['page', 'redirect'],
        directives: {
            carousel: {
                inserted:(element) => {
                    $(element).owlCarousel({
                        loop: false,
                        nav: false,
                        dots: false,
                        mouseDrag: false,
                        startPosition: 'URLHash',
                        touchDrag: false,
                        pullDrag: false,
                        responsive:{
                            0:{
                                items: 1,
                                margin: 20
                            }
                        }
                    }).trigger('to.owl.carousel', 0);
                },
            }
        },
        computed: {
            ...mapGetters({
                showModal: 'GET__MODAL_LOGIN',
                loggedIn: 'GET__USER_IS_LOGGED',
                user: 'GET__USER_NAME',
            })
        },
        data () {
            return {
                "scope": "biotipo",
                "authenticationToken": null,
                "email": null,
                "password": null,
                "newPassword": null,
                "accessKey": null,
                "isMobile": (screen.width <= 767),
                "showLoggin": false
            }
        },
        async created() {
            this.$store.dispatch('GET_USER');
            this.getAuthenticationToken();
        },
        mounted() {
            if (this.page == 'login') {
                this.controllerModal();
            } 
        },
        methods: {
            controllerModal() {
                this.$store.commit('SET__MODAL_LOGIN', !this.showModal);
            },
            controllerLogin() {
                this.showLoggin = !this.showLoggin;
            },
            async getAuthenticationToken() {
                const { data } = await vtex.post(`/api/vtexid/pub/authentication/start?callbackUrl=${window.location.origin}/api/vtexid/pub/authentication/finish&scope=${this.scope}&locale=pt-BR&returnUrl=${window.location.origin}`, {
                    'callbackUrl': `${window.location.origin}/api/vtexid/pub/authentication/finish`,
                    'scope': this.scope,
                    'locale': 'pt-BR',
                    'returnUrl': window.location.origin,
                });

                this.authenticationToken = data.authenticationToken;
            },
            async authenticateUser() {
                if (!this.email || !this.password) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "Os campos não podem estar em branco.",
                    });
                }

                const { data } = await vtex.post(`/api/vtexid/pub/authentication/classic/validate?login=${this.email}&authenticationToken=${this.authenticationToken}&password=${this.password}&_=1467835665242`, {
                    "login": this.email,
                    "authenticationToken": this.authenticationToken,
                    "password": this.password
                });

                if (data.authStatus == "Success") {
                    this.authenticateTokenUser([data.authCookie, data.accountAuthCookie], data.expiresIn);
                    this.controllerModal();
                
                    const user = await this.handleGetClinte(this.email);

                    this.handleHandSendAttachment(user);

                    this.$store.dispatch('GET_USER');
                }

                if (data.authStatus == "BlockedUser") {
                    return Swal.fire({
                        title: 'Ops!',
                        icon: 'error',
                        text: "Você errou sua senha 4 vezes. Seu usuário foi bloqueado por uma hora",
                    });
                }

                if (data.authStatus == "WrongCredentials") {
                    return Swal.fire({
                        title: 'Ops!',
                        icon: 'error',
                        text: "Usuario não encontrado, email ou senha inválidos!",
                    });
                }
            },
            async sendAccessKey() {
                const { data } = await vtex.post(`/api/vtexid/pub/authentication/accesskey/send?authenticationToken=${this.authenticationToken}&email=${this.email}`, {
                    'authenticationToken': this.authenticationToken,
                    'email': this.email,
                });

                this.changeUrlHash("validade-accessKey");
            },
            async changePassword() {
                try {
                    const { data } = await vtex.post(`/api/vtexid/pub/authentication/classic/setpassword?authenticationToken=${this.authenticationToken}&newPassword=${this.newPassword}&login=${this.email}&accessKey=${this.accessKey}`, {
                        "authenticationToken": this.authenticationToken,
                        "newPassword": this.newPassword,
                        "login": this.email,
                        "accessKey": this.accessKey,
                });

                    if (data.authStatus == 'Success') {
                        Swal.fire({
                            icon: 'success',
                            text: "Muito bem! Agora você já pode acessar sua conta!",
                            showConfirmButton: false,
                            timer: 1500
                            });

                        this.$store.dispatch('GET_USER');
                        this.controllerModal();
                        this.authenticateTokenUser([data.authCookie, data.accountAuthCookie], data.expiresIn);
                
                        const user = await this.handleGetClinte(this.email);

                        this.handleHandSendAttachment(user);
                    }
                } catch (error) {
                    return Swal.fire({
                        title: 'Ops!',
                        icon: 'error',
                        text: "Ocorreu um erro.",
                    });
                }

            },
            async handleCustomerIsRegistered() {
                const { data } = await vtex.get(`/api/checkout/pub/profiles/?email=${this.email}&sc=1`);
                
                if (!data.userProfileId) {
                    return Swal.fire({
                        title: 'Ops!',
                        icon: 'error',
                        text: "Não encontramos, seu e-mail em nossa base de dados.",
                    });
                }

                this.getUserIsApproved(data.userProfileId);
            },
            async getUserIsApproved(userId) {
                const { data } = await vtex.get(`/api/dataentities/CL/search?_fields=approved&_where=(userId=${userId})`);

                if (!data[0].approved) {
                    return Swal.fire({
                        title: 'Ops!',
                        icon: 'error',
                        text: "Seu cadastro ainda não foi aprovado, ainda não e possivel criar uma senha.",
                    });
                }

                this.changeUrlHash('new-password');
            },
            async handleGetClinte(email) {
                const { data } = await vtex.get(`/api/checkout/pub/profiles/?email=${email}&sc=1`);

                return data;
            },
            handleHandSendAttachment(user) {
                if (!user) return;
                
                vtexjs.checkout.getOrderForm().then(function(orderForm) {
                    return vtexjs.checkout.sendAttachment('clientProfileData', {
                        "email": user.userProfile.email,
                        "firstName": user.userProfile.firstName,
                        "lastName": user.userProfile.lastName,
                        "isCorporate": user.userProfile.isCorporate,
                        "corporateName": user.userProfile.corporateName,
                        "tradeName": user.userProfile.corporateName,
                        "stateInscription": (user.userProfile.stateInscription ? user.userProfile.stateInscription : "Isento"),
                        "corporateDocument": user.userProfile.corporateDocument,
                        "corporatePhone": user.userProfile.corporatePhone,
                        "phone": user.userProfile.corporatePhone
                    });
                }).then(function(orderForm) {
                    return vtexjs.checkout.sendAttachment('clientProfileData', {
                        "email": user.userProfile.email,
                        "firstName": user.userProfile.firstName,
                        "lastName": user.userProfile.lastName,
                        "isCorporate": user.userProfile.isCorporate,
                        "corporateName": user.userProfile.corporateName,
                        "tradeName": user.userProfile.corporateName,
                        "stateInscription": (user.userProfile.stateInscription ? user.userProfile.stateInscription : "Isento"),
                        "corporateDocument": user.userProfile.corporateDocument,
                        "corporatePhone": user.userProfile.corporatePhone,
                        "phone": user.userProfile.corporatePhone
                    });
                }).then(function(orderForm) {
                    orderForm.shippingData.address = {
                        "addressType": user.availableAddresses.addressType,
                        "receiverName": user.userProfile.firstName,
                        "postalCode": user.availableAddresses.postalCode,
                        "city": user.availableAddresses.city,
                        "state": user.availableAddresses.state,
                        "country": user.availableAddresses.country,
                        "street": user.availableAddresses.street,
                        "number": user.availableAddresses.number,
                        "neighborhood": user.availableAddresses.neighborhood
                    };

                    return vtexjs.checkout.sendAttachment('shippingData', orderForm.shippingData);
                }).then(() => {
                    if (this.redirect) {
                        window.location.href = this.redirect;
                    }
                });
            },
            validatePassword() {
                if (this.password == null) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "O campo não pode estar em branco.",
                    });
                }

                if (this.password.length < 8) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "Sua senha deve ter no mínimo de 8 caracteres",
                    });
                }

                if (!(/[0-9]/g).test(this.password)) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "Sua senha deve ter no mínimo 1 número",
                    });
                } 
                
                if (!(/[a-z]/g).test(this.password)) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "Sua senha deve ter no mínimo 1 letra minúscula",
                    });
                }

                if (!(/[A-Z]/g).test(this.password)) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "Sua senha deve ter no mínimo 1 letra maiúscula",
                    });
                } 

                if (this.password !== this.newPassword) {
                    return Swal.fire({
                        title: 'Ops!',
                        text: "As senhas são diferentes!",
                    });
                }

                this.sendAccessKey();
            },
            authenticateTokenUser (cookies, expire) {
                if (!cookies) return;

                for (var i = 0, len = cookies.length; i < len; i++) {
                    let cookie = cookies[i];

                    if (cookie) {
                        this.setCookie(cookie.Name, cookie.Value, '.' + location.hostname.split('.').reverse()[1] + '.' + location.hostname.split('.').reverse()[0], expire);
                    }
                }
            },
            setCookie (name, value, expire) {
                if (!name || !value) return false
                document.cookie = name + '=' + value + ';expire=' + expire + ';path=/;';
            },
            changeUrlHash(hash) {
                if (!hash) return;
                window.location.hash = hash;
            }
        }
    }
</script>

<style lang="scss">
    .login__component {
        .open__login {
            letter-spacing: 1.2px;
            text-transform: uppercase;
            font-weight: 500;
            display: flex;
            align-items: center;
            margin: 0 20px;
            
            /* Mobile */
            @media (max-width:767px) {
                display: none!important;
                font-size: 0;
                position: absolute;
                right: 11%;
                top: 33px;
            }

            .ico-login {
                background: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDBjLTc0LjQzOSwwLTEzNSw2MC41NjEtMTM1LDEzNXM2MC41NjEsMTM1LDEzNSwxMzVzMTM1LTYwLjU2MSwxMzUtMTM1UzMzMC40MzksMCwyNTYsMHogTTI1NiwyNDAgICAgYy01Ny44OTcsMC0xMDUtNDcuMTAzLTEwNS0xMDVjMC01Ny44OTcsNDcuMTAzLTEwNSwxMDUtMTA1YzU3Ljg5NywwLDEwNSw0Ny4xMDMsMTA1LDEwNUMzNjEsMTkyLjg5NywzMTMuODk3LDI0MCwyNTYsMjQweiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQyMy45NjYsMzU4LjE5NUMzODcuMDA2LDMyMC42NjcsMzM4LjAwOSwzMDAsMjg2LDMwMGgtNjBjLTUyLjAwOCwwLTEwMS4wMDYsMjAuNjY3LTEzNy45NjYsNTguMTk1ICAgIEM1MS4yNTUsMzk1LjUzOSwzMSw0NDQuODMzLDMxLDQ5N2MwLDguMjg0LDYuNzE2LDE1LDE1LDE1aDQyMGM4LjI4NCwwLDE1LTYuNzE2LDE1LTE1ICAgIEM0ODEsNDQ0LjgzMyw0NjAuNzQ1LDM5NS41MzksNDIzLjk2NiwzNTguMTk1eiBNNjEuNjYsNDgyYzcuNTE1LTg1LjA4Niw3OC4zNTEtMTUyLDE2NC4zNC0xNTJoNjAgICAgYzg1Ljk4OSwwLDE1Ni44MjUsNjYuOTE0LDE2NC4zNCwxNTJINjEuNjZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==) no-repeat center;
                background-size: 100%;
                width: 16px;
                height: 22px;
                display: inline-block;
                vertical-align: middle;
                font-size: 0;
                margin-right: 10px;

                /* Mobile */
                @media (max-width:767px) {
                    margin-right: 5px;
                }
            }
        }

        .open__login__mobile {
            display: none;
            
            /* Mobile */
            @media (max-width:767px) {
                display: block;
                font-size: 0;
                position: absolute;
                right: 11%;
                bottom: 10px;
                align-items: center;
                margin: 0 30px;
            }

            .ico-login {
                background: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDBjLTc0LjQzOSwwLTEzNSw2MC41NjEtMTM1LDEzNXM2MC41NjEsMTM1LDEzNSwxMzVzMTM1LTYwLjU2MSwxMzUtMTM1UzMzMC40MzksMCwyNTYsMHogTTI1NiwyNDAgICAgYy01Ny44OTcsMC0xMDUtNDcuMTAzLTEwNS0xMDVjMC01Ny44OTcsNDcuMTAzLTEwNSwxMDUtMTA1YzU3Ljg5NywwLDEwNSw0Ny4xMDMsMTA1LDEwNUMzNjEsMTkyLjg5NywzMTMuODk3LDI0MCwyNTYsMjQweiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQyMy45NjYsMzU4LjE5NUMzODcuMDA2LDMyMC42NjcsMzM4LjAwOSwzMDAsMjg2LDMwMGgtNjBjLTUyLjAwOCwwLTEwMS4wMDYsMjAuNjY3LTEzNy45NjYsNTguMTk1ICAgIEM1MS4yNTUsMzk1LjUzOSwzMSw0NDQuODMzLDMxLDQ5N2MwLDguMjg0LDYuNzE2LDE1LDE1LDE1aDQyMGM4LjI4NCwwLDE1LTYuNzE2LDE1LTE1ICAgIEM0ODEsNDQ0LjgzMyw0NjAuNzQ1LDM5NS41MzksNDIzLjk2NiwzNTguMTk1eiBNNjEuNjYsNDgyYzcuNTE1LTg1LjA4Niw3OC4zNTEtMTUyLDE2NC4zNC0xNTJoNjAgICAgYzg1Ljk4OSwwLDE1Ni44MjUsNjYuOTE0LDE2NC4zNCwxNTJINjEuNjZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==) no-repeat center;
                background-size: 100%;
                width: 16px;
                height: 22px;
                display: inline-block;
                vertical-align: middle;
                font-size: 0;
                margin-right: 10px;

                /* Mobile */
                @media (max-width:767px) {
                    margin-right: 5px;
                }
            }
        }

        .content__loggin {
            /* Mobile */
            @media (max-width:767px) {
                position: fixed;
                right: 0;
                top: 0;
                display: block;
                background: #fff;
                width: 320px;
                height: 100vh;
                z-index: 110;
                overflow-y: scroll;
                transform: translateX(360px);
                transition: transform .4s;
 
                &.active {
                    transform: translateX(0px);
                }
            }

            .content {
                display: flex;
                justify-content: center;
                flex-direction: column;
                height: 50%;
                align-items: center;

                a {
                    background-color: #D71920;
                    padding:20px;
                    width: 80%;
                    color: #fff;
                    font-size: 14px;
                    text-transform: uppercase;
                    text-align: center;
                    font-weight: bold;
                    margin-top: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    border-radius: 0px;
                }
            }
        }
        .overlay {
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 8;
            background-color: rgba(0,0,0,0.5);
            opacity: 0;
            visibility: hidden;
            transition: all .2s;

            &.active {
                opacity: 1;
                transition: opacity .3s ease,visibility .3s ease;
                visibility: visible;
            }
        }

        .modal__mask {
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .5);
            display: table;
            transition: opacity .3s ease;

            &.modal-enter {
                opacity: 0;

                .modal__container {
                    transform: scale(1.1);
                }
            }

            &.modal-leave-active {
                opacity: 0;

                .modal__container {
                    transform: scale(1.1);
                }
            }

            .modal__wrapper {
                display: table-cell;
                vertical-align: middle;
            
                .modal__container {
                    width: 820px;
                    margin: 0px auto;
                    padding: 50px 20px;
                    position: relative;
                    background-color: #fff;
                    border-radius: 2px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
                    transition: all .3s ease;

                    /* Mobile */
                    @media (max-width:767px) {
                        width: 95%;
                    }

                    .btn__close {
                        width: 20px;
                        height: 20px;
                        font-size: 0;
                        position: absolute;
                        right: 30px;
                        top: 30px;
            
                        &::after {
                            content: '';
                            position: absolute;
                            height: 1px;
                            transform: rotate(-45deg);
                            width: 20px;
                            top: 10px;
                            left: 0;
                            background: #000;
                        }
            
                        &:before {
                            content: '';
                            position: absolute;
                            height: 1px;
                            transform: rotate(45deg);
                            width: 20px;
                            right: 15px;
                            top: 10px;
                            left: 0;
                            background: #000;
                        }
                    }

                    .cols {
                        display: flex;
                        justify-content: space-around;

                        .col {
                            width: 300px;
                            position: relative;

                            &:last-child {
                                &::before {
                                    content: '';
                                    width: 1px;
                                    height: 100%;
                                    background: #eeeeee;
                                    position: absolute;
                                    left: -45px;
                                }
                            }

                            .content__logged {
                                .header__title {
                                    margin-bottom: 20px;

                                    h3 {
                                        font-size: 15px;
                                        color: #D71920;
                                        text-transform: uppercase;
                                        letter-spacing: 0.15em;
                                        line-height: 25px;
                                        text-align: left;
                                        font-weight: 500;
                                    }
                                }

                                .form__controls {
                                    margin-bottom: 15px;

                                    .field__label {
                                        display: block;
                                        font-size: 12px;
                                        font-weight: 400;
                                        color: #808080;
                                        margin-bottom: 5px;
                                        letter-spacing: 0.6px;
                                    }

                                    .field {
                                        width: 100%;
                                        border: 1px solid #E0E0E0;
                                        font-weight: 500;
                                        font-size: 16px;
                                        padding: 15px;
                                        color: #262626;
                                        letter-spacing: 0.65px;
                                    }

                                    .btn__forgot {
                                        letter-spacing: 0.55px;
                                        font-size: 10px;
                                        text-decoration: underline;
                                        margin: 5px 0 20px;
                                        font-weight: 500;
                                    }

                                    .btn__newpassword {
                                        letter-spacing: 0.7px;
                                        font-size: 11px;
                                        position: relative;
                                        transition: color .3s ease;
                                        font-weight: 500;
                                        text-transform: uppercase;

                                        &:hover {
                                        text-decoration: underline;
                                        }
                                    }

                                    &:last-child {
                                        margin-bottom: 0;
                                        display: flex;
                                        justify-content: space-between;
                                    }

                                    &.form__actions {
                                        margin-top: 25px;
                                        
                                        .btn {
                                            font-size: 12px;
                                            width: 48%;
                                        }
                                    }
                                }

                                .user__register {
                                    h5 {
                                        letter-spacing: 0.6px;
                                        color: #272727;
                                        font-size: 12px;
                                        text-transform: uppercase;
                                        margin-top: 53px;
                                    }

                                    p {
                                        color: #808080;
                                        font-size: 14px;
                                        margin: 15px 0 45px;
                                        line-height: 24px;
                                        font-weight: 300;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .senha__description {
                li {
                    color: #2f2f2f;
                    font-size: 12px;
                }
            }
        }
    }
</style>