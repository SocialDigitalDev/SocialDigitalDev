$(document).ready(function () {
    //var scre = $("body").width();
    var codeSocial = {

        menuPrincipalMobile: function () {
            var settings = {
                "url": "/api/catalog_system/pub/category/tree/4/",
                "method": "GET",
                "headers": {
                    "content-type": "application/json"
                }
            }

            $.ajax(settings).done(function (dataMenu) {

                var menu = $('.menu-principal');
                var SocialMenu = dataMenu;
                menu.prepend('<li class="menu-todos"><a><div id="menu-toggle"><div id="hamburger"><span></span> <span></span> <span></span></div></div><span class="nome-menu">Todas as Categorias</span></span></a><ul class="all-dep"></ul></li>');

                $.each(SocialMenu, function (i, field) {
                    $('.all-dep').append('<li class="itemMenu cat' + field.id + ' cat-index-' + i + '"><a href="' + field.url + '" title="' + field.name + '">' + field.name + '</a><ul class="subCategoria"><div class="container-center"></div></ul></li>');

                    $(SocialMenu[i].children).each(function (ii, el) {
                        var subCatId = SocialMenu[i].children[ii].id;
                        var subCatNome = SocialMenu[i].children[ii].name;
                        var subCatUrl = SocialMenu[i].children[ii].url;

                        $('.cat-index-' + i).find('.container-center').append('<li id="' + subCatId + '" class="subItem cat-index-' + ii + '"><a href="' + subCatUrl + '" class="linkBy">' + subCatNome + '</a><ul class="container-center-sub"></ul></li>');

                        $(SocialMenu[i].children[ii].children).each(function (iii, el) {
                            var subSubCatId = SocialMenu[i].children[ii].children[iii].id;
                            var subSubCatNome = SocialMenu[i].children[ii].children[iii].name;
                            var subSubCatUrl = SocialMenu[i].children[ii].children[iii].url;

                            //console.log('.cat-index-'+subCatId+"   "+subSubCatId+" "+subSubCatNome+" "+subSubCatUrl)
 
                            $('.cat-index-' + ii).find('.container-center-sub').append('<li id="' + subSubCatId + '" class="subSubItem"><a href="' + subSubCatUrl + '">' + subSubCatNome + '</a></li>');
                        });
                    });
                });

                // $(".subCategoria").each(function () {
                //     if (!$(".container-center", this).html().length) {
                //         $(this).remove();
                //     } else {
                //         $(this).prev().addClass("haveSub");
                //     }
                // });

                // $(".container-center-sub").each(function () {
                //     if (!$(this).html().length) {
                //         $(this).remove();
                //     } else {
                //         $(this).parent().addClass("haveSub");
                //     }
                // });

                menu.append('<li class="itemMenu"><a href="/livros">Livros</a></li><li class="itemMenu"><a href="/Informatica-e-acessorios">Informática e Acessórios</a></li></li class="itemMenu"><li class="itemMenu"><a href="/audio">Audio</a></li><li class="itemMenu"><a href="/suplementos-e-vitaminas">Vitaminas</a></li><li class="itemMenu"><a href="/beleza-e-perfumaria/maquiagem/kit-de-maquiagem?PS=45&O=OrderByPriceDESC">Kits de Maquiagems</a></li><li class="itemMenu"><a href="/beleza-e-perfumaria/maquiagem?PS=45&O=OrderByPriceASC">Maquiagem</a></li><li class="itemMenu"><a href="/153?map=c,productClusterSearchableIds,ft">Social Friday</a></li>');

                // if ($(window).width() < 500) {
                //     $('.menu-topo ul.menu-principal').append($('.menu-topo .menu-principal .menu-todos'));

                //     $('.menu-todos .all-dep .itemMenu').each(function () {
                //         if ($(this).find('ul').hasClass('subCategoria')) {
                //             $(this).find('a.haveSub').removeAttr('href');
                //         }
                //     });
                //     //$('.menu-topo .menu-principal li.itemMenu .subCategoria #9 > a').removeAttr('href');
                // }

                // Adicionado Segunda
                // setTimeout(function () {

                //     $(".menu-topo .menu-principal li.itemMenu").each(function () {
                //         var linkMenu = $(this).find("a").attr("href");
                //     });

                //     $(".menu-principal > li > ul").each(function (i) {
                //         var scre = $("body").width();
                //         var subMenu = $(this).find(".subItem").length;
                //         if (subMenu < 1) {
                //             $(this).remove();
                //         } else {
                //             $(this).closest("li").addClass("subMenuTrue");
                //         }
                //     });
                // });
                // Fim Adicionado Segunda
            });

            // setTimeout(function () {
            //     $(".menu-principal > .itemMenu > ul").each(function (i) {
            //         var subMenu = $(this).find(".subItem").length;
            //         if (subMenu < 1) {
            //             $(this).remove();
            //         }

            //         var scre = $("body").width();
            //         if (scre > 769) {
            //             thisLinks = $(this).find('li');
            //             for (var i = 0; i < thisLinks.length; i += 6) {
            //                 thisLinks.slice(i, i + 6).wrapAll("<span class='menuColuna'></span>");
            //             };
            //         }
            //     });
            // }, 1500);
        },


        init: function () {
            codeSocial.menuPrincipalMobile();

        }
    }
    codeSocial.init();
});