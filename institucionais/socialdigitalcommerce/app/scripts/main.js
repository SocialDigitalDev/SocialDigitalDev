(function () {
    'use strict';
    var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    if ('serviceWorker' in navigator &&
        (window.location.protocol === 'https:' || isLocalhost)) {
        navigator.serviceWorker.register('../service-worker.js')
            .then(function (registration) {
                registration.onupdatefound = function () {
                    if (navigator.serviceWorker.controller) {
                        var installingWorker = registration.installing;
                        installingWorker.onstatechange = function () {
                            switch (installingWorker.state) {
                                case 'installed':
                                    break;
                                case 'redundant':
                                    throw new Error('The installing ' +
                                        'service worker became redundant.');
                                default:
                            }
                        };
                    }
                };
            }).catch(function (e) {
                console.error('Error during service worker registration:', e);
            });
    }
    var scre = $(window).width();
    var customScript = {

        carregaComponentes: function () {
            $('header').load('../components/header.html');
            $('footer').load('../components/footer.html');
        },
        
        carrosselGestaoEcommerce: function () {
                $('.title-carousel-wrapper .carousel-wrapper').slick({
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    autoplay: false,
                    dots: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 1500,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 1100,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: true,
                                centerPadding: "70px"
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: false
                            }
                        }
                    ]
                });
            setTimeout(function(){
                $('.title-carousel-wrapper').append('<div class="buttons-nav-wrap"></div>');
                $('.carousel-wrapper .slick-arrow').appendTo('.title-carousel-wrapper .buttons-nav-wrap');
            }, 100);
            window.addEventListener('resize', function () {
                setTimeout(function(){
                    $('.title-carousel-wrapper .buttons-nav-wrap').remove();
                    $('.title-carousel-wrapper').append('<div class="buttons-nav-wrap"></div>');
                    $('.carousel-wrapper .slick-arrow').appendTo('.title-carousel-wrapper .buttons-nav-wrap');
                }, 100);
            });
        },

        carrosselCanaisVenda: function () {
            $('.canais-de-venda-wrapper .canais-de-venda-carousel').slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: true,
                arrows: true,
                autoplay: false,
                responsive: [
                    {
                        breakpoint: 1500,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 980,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: "60px",
                            autoplay: false
                        }
                    }
                ]
            });
            setTimeout(function(){
                $('.canais-de-venda-wrapper').append('<div class="buttons-nav-wrap"></div>');
                $('.canais-de-venda-carousel .slick-arrow').appendTo('.canais-de-venda-wrapper .buttons-nav-wrap');
            }, 100);
            window.addEventListener('resize', function () {
                setTimeout(function(){
                    $('.canais-de-venda-wrapper .buttons-nav-wrap').remove();
                    $('.canais-de-venda-wrapper').append('<div class="buttons-nav-wrap"></div>');
                    $('.canais-de-venda-carousel .slick-arrow').appendTo('.canais-de-venda-wrapper .buttons-nav-wrap');
                }, 100);
            });
        },

        carrosselInfoRight: function () {
            $('.fullcommerce-info .info-right').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows: true
            });
            $('.fullcommerce-info .info-right .slick-arrow').appendTo('.tabs-fullcommerce-fulfillment .buttons-nav-wrap');
        },

        tabsFullCommerceFillment: function () {
            $('.fulfillment-info').hide();
            $('.tab.fullcommerce').click(function(){
                $(this).addClass('active');
                $('.tab.fulfillment').removeClass('active');
                $('.fulfillment-info').hide();
                $('.fullcommerce-info').show();
                $('.fullcommerce-info .info-right').show();
                customScript.carrosselInfoRight();
            });
            $('.tab.fulfillment').click(function(){
                $(this).addClass('active');
                $('.tab.fullcommerce').removeClass('active');
                $('.fullcommerce-info .info-right').slick('unslick');
                $('.fullcommerce-info .info-right').hide();
                $('.fullcommerce-info').hide();
                $('.fulfillment-info').show();
            });
        },

        tabsSobreNos: function () {
            $('.tab.missao').click(function(){
                $(this).addClass('tab-active');
                $('.tab.visao').removeClass('tab-active');
                $('.tab.valores').removeClass('tab-active');
                $('.conteudo.missao').addClass('conteudo-ativo');
                $('.conteudo.visao').removeClass('conteudo-ativo');
                $('.conteudo.valores').removeClass('conteudo-ativo');
            });
            $('.tab.visao').click(function(){
                $(this).addClass('tab-active');
                $('.tab.missao').removeClass('tab-active');
                $('.tab.valores').removeClass('tab-active');
                $('.conteudo.missao').removeClass('conteudo-ativo');
                $('.conteudo.visao').addClass('conteudo-ativo');
                $('.conteudo.valores').removeClass('conteudo-ativo');
            });
            $('.tab.valores').click(function(){
                $(this).addClass('tab-active');
                $('.tab.missao').removeClass('tab-active');
                $('.tab.visao').removeClass('tab-active');
                $('.conteudo.missao').removeClass('conteudo-ativo');
                $('.conteudo.visao').removeClass('conteudo-ativo');
                $('.conteudo.valores').addClass('conteudo-ativo');
            });
        },

        abreFechaMenuMobile: function () {
            setTimeout(function(){
                $('.burger-menu').click(function(){
                    $('.menu-social-digital-commerce').addClass('aberto');
                });
                $('.close-button').click(function(){
                    $('.menu-social-digital-commerce').removeClass('aberto');
                });
                $('.menu-item:nth-of-type(2) > a').removeAttr('href').css('cursor', 'pointer').click(function(){
                    $(this).parent().find('ul.submenu').slideToggle();
                });
            }, 500);
        },

        textWidthHome: function () {
            setTimeout(function(){
                $('.text-main-cta h1 p.line-2').css('width', '100%');
            }, 5000);
        },

        getRecentPostsFromBlog: function () {
            $.get('https://www.socialdigitalcommerce.com.br/blog/wp-json/wp/v2/posts?_embed', function (postData) {
                for (var i = 0; i < 3; i++) {
                    var postStatus = postData[i].status;
                    var postImg = postData[i]._embedded['wp:featuredmedia'][0].source_url;
                    var postTitle = postData[i].title.rendered;
                    var postExcerpt = postData[i].excerpt.rendered;
                    var postLink = postData[i].link;
                    if (postStatus === "publish"){
                        $('.social-blog-wrapper .posts-wrapper').append(`
                            <div class="post-item">
                                <div class="post-img" style="background: url('${postImg}') no-repeat center center;"></div>
                                <h4 class="post-excerpt">${postTitle}</h4>
                                <p class="post-excerpt">${postExcerpt}</p>
                                <a href="${postLink}" id="ctaPostLinkSaibaMais" class="cta-post-link-saiba-mais">Saiba mais</a>
                            </div>
                        `);
                    }
                }
            });
        },

        carrosseisMobile: function(){
            if (scre <= 1024) {
                setTimeout(function(){
                    $('.posts-wrapper').slick({
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                        arrows: false,
                        responsive: [
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    dots: true,
                                    arrows: false,
                                }
                            }
                        ]
                    });
                }, 2000);
                $('.escritorios-cds-wrap').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                dots: true,
                                arrows: false,
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: true,
                                centerPadding: "100px",
                                dots: true,
                                arrows: false,
                            }
                        },
                        {
                            breakpoint: 400,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                centerMode: false,
                                dots: true,
                                arrows: false,
                            }
                        }
                    ]
                });
                $('.cards-wrapper').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 980,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                dots: true,
                                arrows: false
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true,
                                arrows: false
                            }
                        }
                    ]
                });
            }
        },

        checkboxToggleCss: function() {
            $('.lp-checkbox-wrapper .form-field label input').click(function(){
                $(this).parent().toggleClass('selected');
            });
            $('.lp-legal-wrapper label input').click(function(){
                $(this).parent().addClass('selected');
            });
        },

        openLPcontactModal: function() {
            $('.button-open-contactForm').click(function(){
                $('section.contato').toggleClass('open');
            });
            $('.formCloseButton').click(function(){
                $('section.contato').toggleClass('open');
            });
            $(window).on("scroll", function() {
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                    $('.button-open-contactForm').css('bottom', '-100%');
                }else{
                    $('.button-open-contactForm').css('bottom', '-10px');
                }
            });
        },

        tooltipStart: function() {
            $('span.tooltip-start').tooltip({
                position: { my: "center bottom-15", at: "center top" }
            });
        },

        ajustaForm: function(){
            function arrumaForm(){
                $('.form-wrapper style, .form-wrapper label').remove();
            }
            window.onload = arrumaForm();
        },

        previneDuplicatas: function() {
            function mySubmitFunction(e) {
                e.preventDefault();
                someBug();
                return false;
            }
        },

        init: function () {
            customScript.carregaComponentes();
            customScript.carrosselGestaoEcommerce();
            customScript.carrosselCanaisVenda();
            customScript.carrosselInfoRight();
            customScript.tabsFullCommerceFillment();
            customScript.tabsSobreNos();
            customScript.textWidthHome();
            customScript.checkboxToggleCss();
            customScript.openLPcontactModal();
            customScript.previneDuplicatas();
            customScript.ajustaForm();
            // customScript.tooltipStart();
        },
        ajax_init: function () {
            customScript.getRecentPostsFromBlog();
            customScript.carrosseisMobile();
            customScript.abreFechaMenuMobile();
        }
    }
    customScript.ajax_init();
    customScript.init();
})();


