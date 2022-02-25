import './Department-novo.scss'

const main = () => {
    eventDepartment()
}

const eventDepartment = () => {
    
}
var scre = $(window).width();
var depto = {
    sidebarDepartamento: function(){
        if ($("body").hasClass("page-departament")) {
            if(innerWidth > 768){
                function animaScroll(){
                    var documentTop = $(window).scrollTop(),
                        sidebar = $(".filtro-sticky"),
                        sidebarBox = $(".filtro-sticky"),
                        footerTop = $("footer").offset().top,
                        sidebarBoxHeight = sidebarBox.height() + 90,
                        sidebarTop = sidebar.offset().top;
            
                    if(documentTop > sidebarTop - 40){
                        sidebarBox.addClass("active")
                    } else {
                        sidebarBox.removeClass("active")
                    }
            
                    if(documentTop > footerTop - sidebarBoxHeight){
                        sidebarBox.addClass("inactive")
                        sidebarBox.removeClass("active")
                    } else {
                        sidebarBox.removeClass("inactive")
                    }
                }
        
                $(document).scroll(function(){
                animaScroll();
                })
        
            }
        }
    },
    
    filtroMobile: function () {
        if (scre < 980) {
            $('.btn-filtro').click(function () {
                $(this).toggleClass('setaDown');
                $('.menu-departamento').slideToggle();
            });
            var qtdFiltro = $('.filtrosDepartamento .search-multiple-navigator').length;
            if (qtdFiltro > 0) {
                $('.filtrosDepartamento .search-multiple-navigator').hide();
                $('.search-multiple-navigator h3').click(function () {
                    $(this).toggleClass('aberto');
                    $('.search-multiple-navigator fieldset>div').slideToggle();
                });

            } else {

            }
        }
    },
    filtroCategoria: function () {
        if ($("body").hasClass("page-departament") || $("body").hasClass("categoria")) {
            $(".search-single-navigator h5").click(function () {
                $(this).next("ul").slideToggle();
                $(this).toggleClass("aberto");
            });
            $(".search-single-navigator h3").click(function () {
                $(this).toggleClass("aberto");
                if ($(this).next('ul').has('li').length > 0) {
                    $(this).find('a').removeAttr('href');
                    $(this).next("ul").slideToggle();
                }
            });
        } else if ($("body").hasClass("resultado-busca")) {
            $(".resultado-busca .search-single-navigator h3").click(function (e) {
                e.preventDefault();
                $(this).next("ul").slideToggle();
                $(this).toggleClass("aberto")
            })
        }
    },
    mudarExibicaoGridProdutos: function(){
        $('.resultado-busca-filtro').append(`
            <div class="change-view-exb">
                <div class="cg-exb exb-two"></div>  
                <div class="cg-exb exb-three exb-active"></div>
                <div class="cg-exb exb-four"></div>
            </div>          
        `);
        $('.exb-two').click(function(){
            $(this).addClass('exb-active');
            $('.exb-three').removeClass('exb-active');
            $('.exb-four').removeClass('exb-active');
            $('.shelf ul').css('grid-template-columns', 'repeat(2, 1fr)');
        });
        $('.exb-three').click(function(){
            $(this).addClass('exb-active');
            $('.exb-two').removeClass('exb-active');
            $('.exb-four').removeClass('exb-active');
            $('.shelf ul').css('grid-template-columns', 'repeat(3, 1fr)');
        });
        $('.exb-four').click(function(){
            $(this).addClass('exb-active');
            $('.exb-two').removeClass('exb-active');
            $('.exb-three').removeClass('exb-active');
            $('.shelf ul').css('grid-template-columns', 'repeat(4, 1fr)');
        });
    },
    abreFechaFiltroMobile: function() {
        if (scre <= 768) {
            $('.resultado-busca-filtro').prepend('<div class="menuMobile-button">Filtrar Por</div>');
            $('.filtro-sticky').prepend('<p class="menuMobile-close">X</p>');
            $('.menuMobile-button').click(function(){
                $('.filtro-sticky').addClass('filtroSticky-open');
            });
            $('.menuMobile-close').click(function(){
                $('.filtro-sticky').removeClass('filtroSticky-open');
            });
        }
    },
    aplicaNomeCategoria: function() {
        //Termo buscado
        var categoria = vtxctx.categoryName;
        $(".nomeDepartamento h1").prepend(categoria);
        $(".banner-departamento-promo .vitrine-title h2").prepend(categoria);
    },
    paginacaoDepto: function() {
        setTimeout(function(){
            $('.pager.bottom').appendTo('.searchResultsTime');
        }, 700);
    },
    init: function(){
        // depto.sidebarDepartamento();
        depto.filtroMobile();
        depto.filtroCategoria();
        depto.mudarExibicaoGridProdutos();
        depto.abreFechaFiltroMobile();
        depto.aplicaNomeCategoria();
        depto.paginacaoDepto();
    }
}

depto.init();

export default main