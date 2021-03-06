(function (document, window, $) {
  /**
  *	Pesquisa Inteligente
  *	@description Execurar buscas sem recarregar a página
  *	@author Carlos Vinicius
  *	@contributor Edson Domingos Júnior
  *	@contributor Davi Guimarães
  *	@version 3.11
  *	@date 2018-09-12
  */
  "function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () { var b = { "\u00e7": "c", "\u00e6": "ae", "\u0153": "oe", "\u00e1": "a", "\u00e9": "e", "\u00ed": "i", "\u00f3": "o", "\u00fa": "u", "\u00e0": "a", "\u00e8": "e", "\u00ec": "i", "\u00f2": "o", "\u00f9": "u", "\u00e4": "a", "\u00eb": "e", "\u00ef": "i", "\u00f6": "o", "\u00fc": "u", "\u00ff": "y", "\u00e2": "a", "\u00ea": "e", "\u00ee": "i", "\u00f4": "o", "\u00fb": "u", "\u00e5": "a", "\u00e3": "a", "\u00f8": "o", "\u00f5": "o", u: "u", "\u00c1": "A", "\u00c9": "E", "\u00cd": "I", "\u00d3": "O", "\u00da": "U", "\u00ca": "E", "\u00d4": "O", "\u00dc": "U", "\u00c3": "A", "\u00d5": "O", "\u00c0": "A", "\u00c7": "C" }; return this.replace(/[\u00e0-\u00fa]/g, function (a) { return "undefined" != typeof b[a] ? b[a] : a }) });
  "function" !== typeof String.prototype.trim && (String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, "") });

  jQuery.fn.vtexSmartResearch = function (opts) {
    var $this = jQuery(this);

    var log = function (msg, type) {
      if (typeof console == "object")
        console.log("[Smart Research - " + (type || "Erro") + "] " + msg);
    };

    var defaults = {
      pageLimit: null, // Número máximo de páginas que o script irá retornar. Exemplo "pageLimit=3" só será retornado resultados até a terceira página
      loadContent: ".vitrine[id^=ResultItems]", // Elemento que esta em volta da(s) prateleira(s) de produtos.
      shelfClass: ".vitrine", // Pratelira de produtos (filha do elemento definido de um "loadContent")
      filtersMenu: ".search-multiple-navigator", // Menu com os filtros
      linksMenu: ".search-single-navigator", // Menu de links
      menuDepartament: ".navigation .menu-departamento", // seletor do menu da página de departamentos
      mergeMenu: true, // Define se o menu de links será mesclado com o de filtros será mesclado na página de departamento
      insertMenuAfter: ".search-multiple-navigator h3:first", // O menu de links será inserido após este elemento
      emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'), // Elemento Html (em Objeto jQuery) no qual será adicionado a mensagem de busca vazia
      elemLoading: '<div id="scrollLoading">Carregando ... </div>', // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
      returnTopText: '<span class="text">voltar ao</span><span class="text2">TOPO</span>', // Mensagem de "retornar ao topo"
      emptySearchMsg: '<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>', // Html com a mensagem para ser apresentada quando não existirem resultados para os filtros selecionados
      alertFilterErro: true, // exibe aler casso haja erro algum erro de servidor ao aplicar os filtros
      filterErrorMsg: "Houve um erro ao tentar filtrar a página!", // Mensagem de erro exibida quando existe algum erro de servidor ao aplicar os filtros
      searchUrl: null, // Url da página de busca (opicional)
      usePopup: false, // Opção p/ definir se deseja que a mensagem de não localizado seja exibida em um popup
      showLinks: true, // Exibe o menu de links caso o de filtro não seja encontrado
      popupAutoCloseSeconds: 3, // Caso esteja utilizando popup, defina aqui o tempo para que ele feche automaticamente
      filterOnChange: true, // Permite que o filtro seja aplicado assim que a opção é marcada
      filterButtonClass: ".filter-btn", // Classe do botão que terá a ação de filtro caso a "filterOnChange" seja false
      clearButtonClass: ".clear-filter-btn", // Classe para o botão que limpa todos os filtros
      infinitScroll: true, // Permite que o filtro seja aplicado assim que a opção é marcada
      loadMoreText: "Carregar mais produtos", // Permite que o filtro seja aplicado assim que a opção é marcada
      // Função que retorna o valor p/ onde a página deve rolar quando o usuário marca ou desmarca um filtro
      filterScrollTop: function (shelfOffset) {
        return (shelfOffset.top - 20);
      },
      callback: function () { },
      // Cálculo do tamanho do conteúdo/vitrine para que uma nova página seja chamada antes do usuário chegar ao "final" do site
      getShelfHeight: function (container) {
        return (container.scrollTop() + container.height());
      },
      // Callback após inserir a prateleira na página
      shelfCallback: function () { },
      // Callback em cada requisição Ajax (Para requisições feitas com sucesso)
      // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
      ajaxCallback: function () { },
      // Função que é executada quando a seleção de filtros não retorna nenhum resultado
      // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
      emptySearchCallback: function () { },
      // Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
      // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
      authorizeScroll: function () { return true; },
      // Função para permitir ou não que o conteúdo de "loadContent" seja atualizado. Esta deve retornar "true" ou "false"
      // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
      authorizeUpdate: function () { return true; },
      // Callback de cada laço percorrendo os fildsets e os labels. Retorna um objeto com algumas informações
      labelCallback: function (data) { }
    };

    var options = jQuery.extend(defaults, opts),
      _console = "object" === typeof (console),
      $empty = jQuery(""),
      elemLoading = jQuery(options.elemLoading),
      currentPage = 2,
      moreResults = true,
      _window = jQuery(window),
      _document = jQuery(document),
      _html = jQuery("html,body"),
      body = jQuery("body"),
      currentSearchUrl = "",
      urlFilters = "",
      searchUrl = "",
      animatingFilter = false,
      loadContentE = jQuery(options.loadContent),
      filtersMenuE = jQuery(options.filtersMenu),
      ajaxCallbackObj = { requests: 0, filters: 0, isEmpty: false },
      labelCallbackData = {};

    var fn = {
      getUrl: function (scroll) {
        var s = scroll || false;
        if (s)
          return currentSearchUrl.replace(/PageNumber=[0-9]*/, "PageNumber=" + currentPage);
        else
          return (searchUrl + urlFilters).replace(/PageNumber=[0-9]*/, "PageNumber=" + pageNumber);
      },
      getSearchUrl: function () {
        var url, content, preg;
        jQuery("script:not([src])").each(function () {
          content = jQuery(this)[0].innerHTML;
          preg = /\/buscapagina\?.+&PageNumber=/i;
          if (content.search(/\/buscapagina\?/i) > -1) {
            url = preg.exec(content);
            return false;
          }
        });

        if (typeof (url) !== "undefined" && typeof (url[0]) !== "undefined")
          return url[0];
        else {
          log("Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]");
          return "";
        }
      },
      scrollToTop: function () {
        var elem = body.find("#returnToTop");

        if (elem.length < 1) {
          elem = jQuery('<div id="returnToTop" style="opacity: 0; display: none;"><a href="#">' + options.returnTopText + '<span class="arrowToTop"></span></a></div>');
          body.append(elem);
        }

        var windowH = _window.height();
        _window.bind("resize", function () {
          windowH = _window.height();
        });
        _window.bind("scroll", function () {
          if (_window.scrollTop() > (windowH))
            elem.stop(true).fadeTo(300, 1, function () { elem.show(); });
          else
            elem.stop(true).fadeTo(300, 0, function () { elem.hide(); });
        });
        elem.bind("click", function () {
          _html.animate({ scrollTop: 0 }, "slow");
          return false;
        });
      },
      infinitScroll: function (paginador) {

        _window.on('scroll', function () {
          var _this = jQuery(this);

          if (paginador.isDisponivelParaNovaBusca() && options.authorizeScroll(ajaxCallbackObj)) {
            if ((_this.scrollTop() + _this.height()) >= (options.getShelfHeight(loadContentE))) {
              paginador.proxima();
            }
          }
          else
            return false;
        });
      },
      loadMore: function (paginador) {

        var $loadMore = $('<div />', { class: 'load-more' }).insertAfter(loadContentE);
        var btn = $('<button />', { class: "btn", text: options.loadMoreText }).appendTo($loadMore);

        btn.click(function () {
          if (paginador.isDisponivelParaNovaBusca()) {
            paginador.proxima();
          }
        });

        $(window).on('vsr-request-init', function () {
          btn.prop('disabled', true).addClass('loading');

          if (!btn.is(':visible') && moreResults) {
            btn.fadeIn();
          }
        });

        $(window).on('vsr-contagem-produtos', function (event, data) {
          var contagemTotal = parseInt(data);
          var totalDeItensNaPagina = loadContentE.find('li[layout]').length;

          if (totalDeItensNaPagina >= contagemTotal) {
            btn.fadeOut();
          }

        });
        $(window).on('vsr-no-more-results', function () {
          btn.fadeOut();
        });
        $(window).on('vsr-more-results', function () {
          btn.fadeIn();
        });
        $(window).on('vsr-request-init', function () {
          btn.prop('disabled', false).removeClass('loading');
        });

      },
      triggerEvent: function (nameEvent, elemento, data) {
        if (undefined == nameEvent) return;

        elemento = elemento || filtersMenuE;
        $(elemento).trigger(nameEvent, data);
      }
    };
    var paginas = function () {
      var currentStatus = true;
      var numeroEsperadoItens;

      function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }
      numeroEsperadoItens = parseInt(getParameterByName('cc', fn.getSearchUrl()));


      $(window).on('vsr-no-more-results', function () {
        moreResults = false;
      });
      $(window).on('vsr-more-results', function () {
        moreResults = true;
      });

      var paginador = {
        "isDisponivelParaNovaBusca": function () {
          var disponivel =
            !animatingFilter
            && currentPage <= paginador.getTotalPaginas()
            && moreResults;

          return disponivel;
        },
        "getTotalPaginas": function () {
          var idElementoPaginacao, idPaginacao;

          if (null !== options.pageLimit) {
            return options.pageLimit
          }

          idElementoPaginacao = body.find(".pager:first").attr("id");
          idPaginacao = (idElementoPaginacao || "").split("_").pop();
          var totalPaginas = window["pagecount_" + idPaginacao];

          if ("undefined" === typeof totalPaginas)
            totalPaginas = 99999999;

          return totalPaginas;

        },
        "proxima": function () {
          if (!currentStatus) return null;

          var currentItems = loadContentE.find(options.shelfClass).filter(":last");
          currentItems.after(elemLoading);
          currentStatus = false;

          fn.triggerEvent('vsr-request-init', loadContentE);

          pageJqxhr = jQuery.ajax({
            url: fn.getUrl(true),
            success: function (data) {

              var contagemItens = $(data).find('li[layout]').length;

              if (contagemItens > 0)
                currentItems.after(data);
              if (contagemItens > 0 && contagemItens == numeroEsperadoItens) {
                fn.triggerEvent('vsr-more-results', _window);
              } else {
                fn.triggerEvent('vsr-no-more-results', _window);
              }

              currentStatus = true;
              elemLoading.remove();
              ajaxCallbackObj.requests++;
              options.ajaxCallback(ajaxCallbackObj);

              fn.triggerEvent('vsr-ajax-sucess');
            },
            complete: function () {
              fn.triggerEvent('vsr-request-end', loadContentE);
            }
          });

          currentPage++;
        }
      }
      return paginador;
    }
    var paginador = paginas();


    if (null !== options.searchUrl)
      currentSearchUrl = searchUrl = options.searchUrl;
    else
      currentSearchUrl = searchUrl = fn.getSearchUrl();

    // Reporting Errors
    if ($this.length < 1) {
      log("Nenhuma opção de filtro encontrada", "Aviso");
      if (options.showLinks) jQuery(options.linksMenu).css("visibility", "visible").show();
      if (options.infinitScroll) {
        fn.infinitScroll(paginador);
      } else {
        fn.loadMore(paginador);
      }
      fn.scrollToTop();
      return $this;
    }

    // Reporting Errors
    if (loadContentE.length < 1) {
      log("Elemento para destino da requisição não foi encontrado \n (" + loadContentE.selector + ")");
      return false;
    }
    if (filtersMenuE.length < 1) {
      log("O menu de filtros não foi encontrado \n (" + filtersMenuE.selector + ")");
    }

    var currentUrl = document.location.href,
      linksMenuE = jQuery(options.linksMenu),
      prodOverlay = jQuery('<div class="vtexSr-overlay"></div>'),
      departamentE = jQuery(options.menuDepartament),
      loadContentOffset = loadContentE.offset(),
      pageNumber = 1,
      shelfJqxhr = null,
      pageJqxhr = null;

    options.emptySearchElem.append(options.emptySearchMsg);
    loadContentE.before(prodOverlay);

    var fns =
    {
      exec: function () {
        fns.setFilterMenu();
        fns.fieldsetFormat();
        $this.each(function () {
          var _this = jQuery(this),
            label = _this.parent();

          if (_this.is(":checked")) {
            urlFilters += "&" + (_this.attr("rel") || "");
            // Adicionando classe ao label
            label.addClass("sr_selected");
          }

          fns.adjustText(_this);
          // Add span vazio (depois de executar de "adjustText")
          label.append('<span class="sr_box"></span><span class="sr_box2"></span>');

          _this.bind("change", function () {
            fns.inputAction();
            if (_this.is(":checked")) {
              fns.addFilter(_this);
            } else {
              fns.removeFilter(_this);
            }
            if (options.filterOnChange) {
              ajaxCallbackObj.filters = $this.filter(":checked").length;
            }
          });
        });
        jQuery(options.filterButtonClass).on('click', function () {
          fns.applyFilter();
        });

        jQuery(options.clearButtonClass).on('click', function (e) {
          fns.removeAllFilters(e, this);
        });

        if ("" !== urlFilters)
          fns.addFilter($empty);

        fns.contadorDeProdutos();
        fns.atualizarPaginador();
        fn.triggerEvent('vsr-complete');
      },
      mergeMenu: function () {
        if (!options.mergeMenu) return false;

        var elem = departamentE;
        elem.insertAfter(options.insertMenuAfter);
        fns.departamentMenuFormat(elem);
      },
      mergeMenuList: function () {
        var i = 0;
        filtersMenuE.find("h3,h4").each(function () {
          var ul = linksMenuE.find("h3,h4").eq(i).next("ul");
          ul.insertAfter(jQuery(this));
          fns.departamentMenuFormat(ul);
          i++;
        });
      },
      departamentMenuFormat: function (elem) {
        elem.find("a").each(function () {
          var a = jQuery(this);
          a.text(fns.removeCounter(a.text()));
        });
      },
      fieldsetFormat: function () {
        labelCallbackData.fieldsetCount = 0;
        labelCallbackData.tmpCurrentLabel = {};

        filtersMenuE.find("fieldset").each(function () {
          var $t = jQuery(this),
            label = $t.find("label"),
            fieldsetClass = "filtro_" + ($t.find("h5:first").text() || "").toLowerCase().replaceSpecialChars().replace(/\s/g, "-");

          labelCallbackData[fieldsetClass] = {};

          // Ocultar fieldset quando não existe filtro e sair desste método
          if (label.length < 1) {
            $t.hide();
            return;
          }

          // Adicionar classe ao fieldset
          $t.addClass(fieldsetClass);

          // Adicionando classe e título ao label
          label.each(function (ndx) {
            var t = jQuery(this),
              v = (t.find("input").val() || ""),
              labelClass = "sr_" + v.toLowerCase().replaceSpecialChars().replace(/\s/g, "-");

            labelCallbackData.tmpCurrentLabel =
            {
              fieldsetParent: [$t, fieldsetClass],
              elem: t
            };

            labelCallbackData[fieldsetClass][ndx.toString()] =
            {
              className: labelClass,
              title: v
            };

            t.addClass(labelClass).attr({ "title": v, "index": ndx });

            options.labelCallback(labelCallbackData);
          });

          labelCallbackData.fieldsetCount++;
        });
      },
      inputAction: function () {
        if (null !== pageJqxhr) pageJqxhr.abort();
        if (null !== shelfJqxhr) shelfJqxhr.abort();
        currentPage = 2;
        moreResults = true;
      },
      applyFilter: function () {
        currentSearchUrl = fn.getUrl();

        fn.triggerEvent('vsr-request-init', loadContentE, currentSearchUrl);
        shelfJqxhr = jQuery.ajax({
          url: currentSearchUrl,
          success: fns.filterAjaxSuccess,
          error: fns.filterAjaxError,
          complete: function () {
            fn.triggerEvent('vsr-request-end', loadContentE);
          }
        });
      },
      addFilter: function (input) {
        urlFilters += "&" + (input.attr("rel") || "");
        currentSearchUrl = fn.getUrl();
        if (options.filterOnChange) {
          prodOverlay.fadeTo(300, 0.6);
          fns.applyFilter();
          fn.triggerEvent('vsr-add-filter');
        }
        // Adicionando classe ao label
        input.parent().addClass("sr_selected");
      },
      removeAllFilters: function (evt, obj) {
        urlFilters = "";
        $('input:checked').prop('checked', false).parent().removeClass("sr_selected");

        fns.applyFilter();
        fn.triggerEvent('vsr-clean-all-filter');
      },
      removeFilter: function (input) {
        var url = (input.attr("rel") || "");
        if (url !== "")
          urlFilters = urlFilters.replace("&" + url, "");
        if (options.filterOnChange) {
          prodOverlay.fadeTo(300, 0.6);
          fns.applyFilter();
          fn.triggerEvent('vsr-remove-filter');
        }
        // Removendo classe do label
        input.parent().removeClass("sr_selected");
      },
      filterAjaxSuccess: function (data) {
        var $data = jQuery(data);
        prodOverlay.fadeTo(300, 0, function () { jQuery(this).hide(); });
        fns.updateContent($data);

        ajaxCallbackObj.requests++;
        options.ajaxCallback(ajaxCallbackObj);
        _html.animate({ scrollTop: options.filterScrollTop((loadContentOffset || { top: 0, left: 0 })) }, 600);

        fn.triggerEvent('vsr-ajax-sucess');
      },
      filterAjaxError: function () {
        prodOverlay.fadeTo(300, 0, function () { jQuery(this).hide(); });
        if (options.alertFilterErro) {
          alert(options.filterErrorMsg);
        }
        log("Houve um erro ao tentar fazer a requisição da página com filtros.");

        fn.triggerEvent('vsr-ajax-fail');
      },
      updateContent: function ($data) {
        animatingFilter = true;
        if (!options.authorizeUpdate(ajaxCallbackObj)) return false;

        var shelf = $data.filter(options.shelfClass);
        var shelfPage = loadContentE.find(options.shelfClass);

        (shelfPage.length > 0 ? shelfPage : options.emptySearchElem).slideUp(600, function () {
          jQuery(this).remove();

          // Removendo a mensagem de busca vazia, esta remoção "forçada" foi feita para
          // corrigir um bug encontrado ao clicar em vários filtros
          if (options.usePopup)
            body.find(".boxPopUp2").vtexPopUp2();
          else
            options.emptySearchElem.remove();

          if (shelf.length > 0) {
            shelf.hide();
            loadContentE.append(shelf);
            options.shelfCallback();
            shelf.slideDown(600, function () {
              animatingFilter = false;
            });
            ajaxCallbackObj.isEmpty = false;
          } else {
            ajaxCallbackObj.isEmpty = true;

            if (options.usePopup)
              options.emptySearchElem.addClass("freeContent autoClose ac_" + options.popupAutoCloseSeconds).vtexPopUp2().stop(true).show();
            else {
              loadContentE.append(options.emptySearchElem);
              options.emptySearchElem.show().css("height", "auto").fadeTo(300, 0.2, function () {
                options.emptySearchElem.fadeTo(300, 1);
              });
            }

            options.emptySearchCallback(ajaxCallbackObj);
          }
        });
      },
      adjustText: function (input) {
        var label = input.parent(),
          text = label.text();

        text = fns.removeCounter(text);

        label.text(text).prepend(input);
      },
      removeCounter: function (text) {
        return text.replace(/\([0-9]+\)/ig, function (a) {
          return "";
        });
      },
      setFilterMenu: function () {
        if (filtersMenuE.length > 0) {
          linksMenuE.hide();
          filtersMenuE.show();
        }
      },
      atualizarPaginador: function () {
        $(window).on('vsr-contagem-produtos', function (event, data) {
          var contagemTotal = parseInt(data);
          var totalDeItensNaPagina = loadContentE.find('li[layout]').length;

          if (totalDeItensNaPagina >= contagemTotal) {
            fn.triggerEvent('vsr-no-more-results', _window);
          } else {
            fn.triggerEvent('vsr-more-results', _window);
          }
        })
      },
      contadorDeProdutos: function () {
        $(window).on('vsr-request-init', function (event, data) {

          $(window).one('vsr-request-end', function (event, data) {

            var urlFiltro = currentSearchUrl.replace('/buscapagina', '');

            var urlAtual = '/api/catalog_system/pub/products/search' + urlFiltro;

            if (urlAtual.indexOf('?') !== -1) {
              urlAtual = urlAtual + '&_from=1&_to=1';
            } else {
              urlAtual = urlAtual + '?_from=1&_to=1';
            }

            $.get(urlAtual).done(function (data, status, jqXHR) {

              var numeroDeRecursos = jqXHR.getResponseHeader('resources');
              var aux = numeroDeRecursos.split('/');

              var totalDeItens = 0;
              if (aux.length > 1) {
                totalDeItens = aux[1];
              }
              setTimeout(function () {
                fn.triggerEvent('vsr-contagem-produtos', loadContentE, totalDeItens);
              }, 200);
            }).fail()
          })
        });
      }
    };

    if (body.hasClass("departamento"))
      fns.mergeMenu();
    else if (body.hasClass("categoria") || body.hasClass("resultado-busca"))
      fns.mergeMenuList();

    fns.exec();

    if (options.infinitScroll) {
      fn.infinitScroll(paginador);
    } else {
      fn.loadMore(paginador);
    }
    fn.scrollToTop();
    options.callback();

    // Exibindo o menu
    filtersMenuE.css("visibility", "visible");
  };
})(document, window, jQuery)
