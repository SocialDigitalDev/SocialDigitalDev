const Methods = {
	init() {
        Methods.filter();
        Methods.filterOpen();

        if( document.querySelector(`body`).classList.contains(`is--category`) ) {
            Methods.categoryTitle();
        }
        
        if( document.querySelector(`body`).classList.contains(`is--search`) ) {
            Methods.searchTitle();
        }
    },

    filter() {
        const subBox = document.querySelector(`.j-category__grid .sub:nth-child(2) > div`);
        const filter = document.querySelector(`.j-category__option-filter`);
        const select = document.querySelector(`.j-category__bottom .j-category__grid .sub .resultado-busca-filtro .orderBy select option:first-child`);

        subBox.appendChild(filter);
        filter.classList.remove(`is--hide`);

        select.innerText = "Organizar por:";


        $(`.search-single-navigator`).after(`<div class="js--filter--marca"></div>`);
        $(`.search-single-navigator`).after(`<div class="js--filter--price"></div>`);

        $(`.Marca, .HideMarca`).appendTo( $(`.js--filter--marca`) );
        $(`.Faixa, .HideFaixa-de-preco`).appendTo( $(`.js--filter--price`) );

        $(`.HideMarca`).text(`Linhas`);

        Methods.priceSlider('.js--filter--price', 0, 200);

    },

    filterOpen() {
        const btnOpen = document.querySelector(`.js--open-filter`);
        const btnClose = document.querySelector(`.js--close--filter`);
        const content = document.querySelector(`.js--content-filter`);

        btnOpen.addEventListener(`click`, () => {
            content.classList.add(`is--active`);
        });

        btnClose.addEventListener(`click`, () => {
            content.classList.remove(`is--active`);
        });
    },

    searchTitle() {
        const titleHTML = `<div class="container">
                                <h3 class="j-shelf__title">
                                    <span>
                                        Resultado
                                        <strong>você está buscando por: <em>${vtxctx.searchTerm}</em></strong>
                                    </span>
                                </h3>
                            </div>`;

        document.querySelector(`.j-category__banner`).innerHTML += titleHTML;
    },

    categoryTitle() {
        const CategName = vtxctx.categoryName;
        const titleHTML = `<div class="container">
                                <h3 class="j-shelf__title">
                                    <span>
                                        ${CategName}
                                        <strong>${CategName}</strong>
                                    </span>
                                </h3>
                            </div>`;

        document.querySelector(`.j-category__banner`).innerHTML += titleHTML;
    },

    priceSlider(componentSelector, min, max) {
        var slider = $(componentSelector);
        slider.html('');
        slider.addClass('j-slider j-slider--price');
        slider.append(
            '<h4 class="j-slider__price-title">Preço</h4>' +
            '<div id="j-slider__bar"></div>' +
            '<div class="j-slider__qty-group">' +
            '<span class="j-slider__qty j-slider__qty--start">R$ <span class="j-slider__qty-value j-slider__qty-value--start"></span></span>' +
            '<button class="j-slider__btn">Filtrar</button>' +
            '<span class="j-slider__qty j-slider__qty--end">R$ <span class="j-slider__qty-value j-slider__qty-value--end"></span></span>' +
            '</div>');
        var qtyStart = $(componentSelector + ' .j-slider__qty-value--start');
        var qtyEnd = $(componentSelector + ' .j-slider__qty-value--end');
        var sliderBar = document.getElementById('j-slider__bar');
        var btnFilter = slider.find('.j-slider__btn');
    
        qtyEnd.text(max);
    
        noUiSlider.create(sliderBar, {
            start: [min, max],
            connect: true,
            range: {
                'min': min,
                'max': max
            },
            format: {
                to: function (value) {
                    return parseInt(value, 10);
                },
                from: function (value) {
                    return parseInt(value, 10);
                }
            }
        });
    
        setCurrentValues();
        fixBreadcrumb();
        fixFiltersSelected();
    
        //CALL FILTER
        btnFilter.on('click', function () {
            filter();
        });
    
        //UPDATE VALUES
        sliderBar.noUiSlider.on('update', function (values, handle) {
            qtyStart.text(values[0]).attr('data-value', values[0]);
            $(`.noUi-handle-upper`).text(values[1]).attr('data-value', values[1]);
        });
    
        function filterIsActive() {
            var url = window.location.href;
            if (url.indexOf('priceFrom') != -1) {
                return true;
            } else {
                return false;
            }
        }
    
        //GET CURRENT VALUES IF FILTER IS ACTIVE
        function getCurrentValues(val) {
            var regexRange = /de-\d+-a-\d+/;
            var url = window.location.href;
            var range = url.match(regexRange)[0];
    
            if (range) {
                var rangeObj = range.split('-');
                var rangeMin = rangeObj[1];
                var rangeMax = rangeObj[3];
            } else {
                return false;
            }
    
            if (val == 'min') {
                return rangeMin;
            } else if (val == 'max') {
                return rangeMax;
            }
        }
    
        //SET VALUES IF FILTER IS ACTIVE
        function setCurrentValues() {
            if (filterIsActive() === true) {
                sliderBar.noUiSlider.set([getCurrentValues('min'), getCurrentValues('max')]);
            }
        }
    
        //FIX BREADCRUMB
        function fixBreadcrumb() {
            if (filterIsActive() === true) {
                var rangeMin = getCurrentValues('min');
                var rangeMax = getCurrentValues('max');
                var range = 'De R$ ' + rangeMin + ' até R$ ' + rangeMax;
                $('.bread-crumb li.last a').text(range);
            }
        }
    
        function fixFiltersSelected() {
            if (filterIsActive() === true) {
                var rangeMin = getCurrentValues('min');
                var rangeMax = getCurrentValues('max');
                var range = 'De R$ ' + rangeMin + ' até R$ ' + rangeMax;
                $('.x-filters-selected li[data-filter-name=" -- "] a').text(range);
            }
        }
    
        function filter() {
            var url = window.location;
            var qtyStart = sliderBar.noUiSlider.get()[0];
            var qtyEnd = sliderBar.noUiSlider.get()[1];
            var param = 'de-' + qtyStart + '-a-' + qtyEnd;
            var regexRange = /de-\d+-a-\d+/;
    
            if (url.href.indexOf('priceFrom') > 0) {
                //Already filtered price on the current page
                var urlDestiny = url.href.replace(regexRange, param);
                window.location.href = urlDestiny;
            } else if (url.href.indexOf('priceFrom') < 0 && url.href.indexOf('map=c') > 0) {
                //Already filtered any value (color, size and etc) on the current page
                var urlDestiny = url.protocol + '//' + url.hostname + url.pathname + '/' + param + url.search + ',priceFrom';
                window.location.href = urlDestiny;
            } else {
                //No filter on the current page
                var querySymbol = '?';
                if (url.href.indexOf('?') > 0) {
                    querySymbol = '&';
                }
                if (url.pathname.endsWith('/')) {
                    var urlDestiny = url.protocol + '//' + url.hostname + url.pathname + param + url.search + querySymbol + 'map=c,c,c,priceFrom';
                } else {
                    var urlDestiny = url.protocol + '//' + url.hostname + url.pathname + '/' + param + url.search + querySymbol + 'map=c,c,c,priceFrom';
                }
                window.location.href = urlDestiny;
            }
        }
    
    }


};

export default {
	init: Methods.init,
}