!(function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? (module.exports = e(require("jquery"))) : e(jQuery);
})(function (e) {
    "use strict";
    var i,
        t = window.Slick || {};
    (i = 0),
        ((t = function (t, o) {
            var s,
                a = this;
            (a.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(t),
                appendDots: e(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (i, t) {
                    return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (a.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                e.extend(a, a.initials),
                (a.activeBreakpoint = null),
                (a.animType = null),
                (a.animProp = null),
                (a.breakpoints = []),
                (a.breakpointSettings = []),
                (a.cssTransitions = !1),
                (a.focussed = !1),
                (a.interrupted = !1),
                (a.hidden = "hidden"),
                (a.paused = !0),
                (a.positionProp = null),
                (a.respondTo = null),
                (a.rowCount = 1),
                (a.shouldClick = !0),
                (a.$slider = e(t)),
                (a.$slidesCache = null),
                (a.transformType = null),
                (a.transitionType = null),
                (a.visibilityChange = "visibilitychange"),
                (a.windowWidth = 0),
                (a.windowTimer = null),
                (s = e(t).data("slick") || {}),
                (a.options = e.extend({}, a.defaults, o, s)),
                (a.currentSlide = a.options.initialSlide),
                (a.originalSettings = a.options),
                void 0 !== document.mozHidden ? ((a.hidden = "mozHidden"), (a.visibilityChange = "mozvisibilitychange")) : void 0 !== document.webkitHidden && ((a.hidden = "webkitHidden"), (a.visibilityChange = "webkitvisibilitychange")),
                (a.autoPlay = e.proxy(a.autoPlay, a)),
                (a.autoPlayClear = e.proxy(a.autoPlayClear, a)),
                (a.autoPlayIterator = e.proxy(a.autoPlayIterator, a)),
                (a.changeSlide = e.proxy(a.changeSlide, a)),
                (a.clickHandler = e.proxy(a.clickHandler, a)),
                (a.selectHandler = e.proxy(a.selectHandler, a)),
                (a.setPosition = e.proxy(a.setPosition, a)),
                (a.swipeHandler = e.proxy(a.swipeHandler, a)),
                (a.dragHandler = e.proxy(a.dragHandler, a)),
                (a.keyHandler = e.proxy(a.keyHandler, a)),
                (a.instanceUid = i++),
                (a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                a.registerBreakpoints(),
                a.init(!0);
        }).prototype.activateADA = function () {
            this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
        }),
        (t.prototype.addSlide = t.prototype.slickAdd = function (i, t, o) {
            var s = this;
            if ("boolean" == typeof t) (o = t), (t = null);
            else if (t < 0 || t >= s.slideCount) return !1;
            s.unload(),
                "number" == typeof t
                    ? 0 === t && 0 === s.$slides.length
                        ? e(i).appendTo(s.$slideTrack)
                        : o
                        ? e(i).insertBefore(s.$slides.eq(t))
                        : e(i).insertAfter(s.$slides.eq(t))
                    : !0 === o
                    ? e(i).prependTo(s.$slideTrack)
                    : e(i).appendTo(s.$slideTrack),
                (s.$slides = s.$slideTrack.children(this.options.slide)),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function (i, t) {
                    e(t).attr("data-slick-index", i);
                }),
                (s.$slidesCache = s.$slides),
                s.reinit();
        }),
        (t.prototype.animateHeight = function () {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({ height: i }, e.options.speed);
            }
        }),
        (t.prototype.animateSlide = function (i, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (i = -i),
                !1 === s.transformsEnabled
                    ? !1 === s.options.vertical
                        ? s.$slideTrack.animate({ left: i }, s.options.speed, s.options.easing, t)
                        : s.$slideTrack.animate({ top: i }, s.options.speed, s.options.easing, t)
                    : !1 === s.cssTransitions
                    ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                      e({ animStart: s.currentLeft }).animate(
                          { animStart: i },
                          {
                              duration: s.options.speed,
                              easing: s.options.easing,
                              step: function (e) {
                                  (e = Math.ceil(e)), !1 === s.options.vertical ? (o[s.animType] = "translate(" + e + "px, 0px)") : (o[s.animType] = "translate(0px," + e + "px)"), s.$slideTrack.css(o);
                              },
                              complete: function () {
                                  t && t.call();
                              },
                          }
                      ))
                    : (s.applyTransition(),
                      (i = Math.ceil(i)),
                      !1 === s.options.vertical ? (o[s.animType] = "translate3d(" + i + "px, 0px, 0px)") : (o[s.animType] = "translate3d(0px," + i + "px, 0px)"),
                      s.$slideTrack.css(o),
                      t &&
                          setTimeout(function () {
                              s.disableTransition(), t.call();
                          }, s.options.speed));
        }),
        (t.prototype.getNavTarget = function () {
            var i = this.options.asNavFor;
            return i && null !== i && (i = e(i).not(this.$slider)), i;
        }),
        (t.prototype.asNavFor = function (i) {
            var t = this.getNavTarget();
            null !== t &&
                "object" == typeof t &&
                t.each(function () {
                    var t = e(this).slick("getSlick");
                    t.unslicked || t.slideHandler(i, !0);
                });
        }),
        (t.prototype.applyTransition = function (e) {
            var i = this,
                t = {};
            !1 === i.options.fade ? (t[i.transitionType] = i.transformType + " " + i.options.speed + "ms " + i.options.cssEase) : (t[i.transitionType] = "opacity " + i.options.speed + "ms " + i.options.cssEase),
                !1 === i.options.fade ? i.$slideTrack.css(t) : i.$slides.eq(e).css(t);
        }),
        (t.prototype.autoPlay = function () {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed));
        }),
        (t.prototype.autoPlayClear = function () {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        }),
        (t.prototype.autoPlayIterator = function () {
            var e = this,
                i = e.currentSlide + e.options.slidesToScroll;
            e.paused ||
                e.interrupted ||
                e.focussed ||
                (!1 === e.options.infinite &&
                    (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? (e.direction = 0) : 0 === e.direction && ((i = e.currentSlide - e.options.slidesToScroll), e.currentSlide - 1 == 0 && (e.direction = 1))),
                e.slideHandler(i));
        }),
        (t.prototype.buildArrows = function () {
            var i = this;
            !0 === i.options.arrows &&
                ((i.$prevArrow = e(i.options.prevArrow).addClass("slick-arrow")),
                (i.$nextArrow = e(i.options.nextArrow).addClass("slick-arrow")),
                i.slideCount > i.options.slidesToShow
                    ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                      i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows),
                      i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows),
                      !0 !== i.options.infinite && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                    : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (t.prototype.buildDots = function () {
            var i,
                t,
                o = this;
            if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
                for (o.$slider.addClass("slick-dotted"), t = e("<ul />").addClass(o.options.dotsClass), i = 0; i <= o.getDotCount(); i += 1) t.append(e("<li />").append(o.options.customPaging.call(this, o, i)));
                (o.$dots = t.appendTo(o.options.appendDots)), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
            }
        }),
        (t.prototype.buildOut = function () {
            var i = this;
            (i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                (i.slideCount = i.$slides.length),
                i.$slides.each(function (i, t) {
                    e(t)
                        .attr("data-slick-index", i)
                        .data("originalStyling", e(t).attr("style") || "");
                }),
                i.$slider.addClass("slick-slider"),
                (i.$slideTrack = 0 === i.slideCount ? e('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent()),
                (i.$list = i.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
                i.$slideTrack.css("opacity", 0),
                (!0 !== i.options.centerMode && !0 !== i.options.swipeToSlide) || (i.options.slidesToScroll = 1),
                e("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"),
                i.setupInfinite(),
                i.buildArrows(),
                i.buildDots(),
                i.updateDots(),
                i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0),
                !0 === i.options.draggable && i.$list.addClass("draggable");
        }),
        (t.prototype.buildRows = function () {
            var e,
                i,
                t,
                o,
                s,
                a,
                n,
                r = this;
            if (((o = document.createDocumentFragment()), (a = r.$slider.children()), 1 < r.options.rows)) {
                for (n = r.options.slidesPerRow * r.options.rows, s = Math.ceil(a.length / n), e = 0; e < s; e++) {
                    var l = document.createElement("div");
                    for (i = 0; i < r.options.rows; i++) {
                        var d = document.createElement("div");
                        for (t = 0; t < r.options.slidesPerRow; t++) {
                            var c = e * n + (i * r.options.slidesPerRow + t);
                            a.get(c) && d.appendChild(a.get(c));
                        }
                        l.appendChild(d);
                    }
                    o.appendChild(l);
                }
                r.$slider.empty().append(o),
                    r.$slider
                        .children()
                        .children()
                        .children()
                        .css({ width: 100 / r.options.slidesPerRow + "%", display: "inline-block" });
            }
        }),
        (t.prototype.checkResponsive = function (i, t) {
            var o,
                s,
                a,
                n = this,
                r = !1,
                l = n.$slider.width(),
                d = window.innerWidth || e(window).width();
            if (("window" === n.respondTo ? (a = d) : "slider" === n.respondTo ? (a = l) : "min" === n.respondTo && (a = Math.min(d, l)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive)) {
                for (o in ((s = null), n.breakpoints)) n.breakpoints.hasOwnProperty(o) && (!1 === n.originalSettings.mobileFirst ? a < n.breakpoints[o] && (s = n.breakpoints[o]) : a > n.breakpoints[o] && (s = n.breakpoints[o]));
                null !== s
                    ? (null !== n.activeBreakpoint && s === n.activeBreakpoint && !t) ||
                      ((n.activeBreakpoint = s),
                      "unslick" === n.breakpointSettings[s] ? n.unslick(s) : ((n.options = e.extend({}, n.originalSettings, n.breakpointSettings[s])), !0 === i && (n.currentSlide = n.options.initialSlide), n.refresh(i)),
                      (r = s))
                    : null !== n.activeBreakpoint && ((n.activeBreakpoint = null), (n.options = n.originalSettings), !0 === i && (n.currentSlide = n.options.initialSlide), n.refresh(i), (r = s)),
                    i || !1 === r || n.$slider.trigger("breakpoint", [n, r]);
            }
        }),
        (t.prototype.changeSlide = function (i, t) {
            var o,
                s,
                a = this,
                n = e(i.currentTarget);
            switch ((n.is("a") && i.preventDefault(), n.is("li") || (n = n.closest("li")), (o = a.slideCount % a.options.slidesToScroll != 0 ? 0 : (a.slideCount - a.currentSlide) % a.options.slidesToScroll), i.data.message)) {
                case "previous":
                    (s = 0 == o ? a.options.slidesToScroll : a.options.slidesToShow - o), a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide - s, !1, t);
                    break;
                case "next":
                    (s = 0 == o ? a.options.slidesToScroll : o), a.slideCount > a.options.slidesToShow && a.slideHandler(a.currentSlide + s, !1, t);
                    break;
                case "index":
                    var r = 0 === i.data.index ? 0 : i.data.index || n.index() * a.options.slidesToScroll;
                    a.slideHandler(a.checkNavigable(r), !1, t), n.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (t.prototype.checkNavigable = function (e) {
            var i, t;
            if (((t = 0), e > (i = this.getNavigableIndexes())[i.length - 1])) e = i[i.length - 1];
            else
                for (var o in i) {
                    if (e < i[o]) {
                        e = t;
                        break;
                    }
                    t = i[o];
                }
            return e;
        }),
        (t.prototype.cleanUpEvents = function () {
            var i = this;
            i.options.dots && null !== i.$dots && e("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", e.proxy(i.interrupt, i, !0)).off("mouseleave.slick", e.proxy(i.interrupt, i, !1)),
                i.$slider.off("focus.slick blur.slick"),
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)),
                i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler),
                i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler),
                i.$list.off("touchend.slick mouseup.slick", i.swipeHandler),
                i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler),
                i.$list.off("click.slick", i.clickHandler),
                e(document).off(i.visibilityChange, i.visibility),
                i.cleanUpSlideEvents(),
                !0 === i.options.accessibility && i.$list.off("keydown.slick", i.keyHandler),
                !0 === i.options.focusOnSelect && e(i.$slideTrack).children().off("click.slick", i.selectHandler),
                e(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange),
                e(window).off("resize.slick.slick-" + i.instanceUid, i.resize),
                e("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault),
                e(window).off("load.slick.slick-" + i.instanceUid, i.setPosition),
                e(document).off("ready.slick.slick-" + i.instanceUid, i.setPosition);
        }),
        (t.prototype.cleanUpSlideEvents = function () {
            var i = this;
            i.$list.off("mouseenter.slick", e.proxy(i.interrupt, i, !0)), i.$list.off("mouseleave.slick", e.proxy(i.interrupt, i, !1));
        }),
        (t.prototype.cleanUpRows = function () {
            var e;
            1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e));
        }),
        (t.prototype.clickHandler = function (e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
        }),
        (t.prototype.destroy = function (i) {
            var t = this;
            t.autoPlayClear(),
                (t.touchObject = {}),
                t.cleanUpEvents(),
                e(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides &&
                    (t.$slides
                        .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            e(this).attr("style", e(this).data("originalStyling"));
                        }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                (t.unslicked = !0),
                i || t.$slider.trigger("destroy", [t]);
        }),
        (t.prototype.disableTransition = function (e) {
            var i = {};
            (i[this.transitionType] = ""), !1 === this.options.fade ? this.$slideTrack.css(i) : this.$slides.eq(e).css(i);
        }),
        (t.prototype.fadeSlide = function (e, i) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(e).css({ zIndex: t.options.zIndex }), t.$slides.eq(e).animate({ opacity: 1 }, t.options.speed, t.options.easing, i))
                : (t.applyTransition(e),
                  t.$slides.eq(e).css({ opacity: 1, zIndex: t.options.zIndex }),
                  i &&
                      setTimeout(function () {
                          t.disableTransition(e), i.call();
                      }, t.options.speed));
        }),
        (t.prototype.fadeSlideOut = function (e) {
            var i = this;
            !1 === i.cssTransitions ? i.$slides.eq(e).animate({ opacity: 0, zIndex: i.options.zIndex - 2 }, i.options.speed, i.options.easing) : (i.applyTransition(e), i.$slides.eq(e).css({ opacity: 0, zIndex: i.options.zIndex - 2 }));
        }),
        (t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
            var i = this;
            null !== e && ((i.$slidesCache = i.$slides), i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.filter(e).appendTo(i.$slideTrack), i.reinit());
        }),
        (t.prototype.focusHandler = function () {
            var i = this;
            i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (t) {
                t.stopImmediatePropagation();
                var o = e(this);
                setTimeout(function () {
                    i.options.pauseOnFocus && ((i.focussed = o.is(":focus")), i.autoPlay());
                }, 0);
            });
        }),
        (t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
            return this.currentSlide;
        }),
        (t.prototype.getDotCount = function () {
            var e = this,
                i = 0,
                t = 0,
                o = 0;
            if (!0 === e.options.infinite) for (; i < e.slideCount; ) ++o, (i = t + e.options.slidesToScroll), (t += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
            else if (!0 === e.options.centerMode) o = e.slideCount;
            else if (e.options.asNavFor) for (; i < e.slideCount; ) ++o, (i = t + e.options.slidesToScroll), (t += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
            else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return o - 1;
        }),
        (t.prototype.getLeft = function (e) {
            var i,
                t,
                o,
                s = this,
                a = 0;
            return (
                (s.slideOffset = 0),
                (t = s.$slides.first().outerHeight(!0)),
                !0 === s.options.infinite
                    ? (s.slideCount > s.options.slidesToShow && ((s.slideOffset = s.slideWidth * s.options.slidesToShow * -1), (a = t * s.options.slidesToShow * -1)),
                      s.slideCount % s.options.slidesToScroll != 0 &&
                          e + s.options.slidesToScroll > s.slideCount &&
                          s.slideCount > s.options.slidesToShow &&
                          (a =
                              e > s.slideCount
                                  ? ((s.slideOffset = (s.options.slidesToShow - (e - s.slideCount)) * s.slideWidth * -1), (s.options.slidesToShow - (e - s.slideCount)) * t * -1)
                                  : ((s.slideOffset = (s.slideCount % s.options.slidesToScroll) * s.slideWidth * -1), (s.slideCount % s.options.slidesToScroll) * t * -1)))
                    : e + s.options.slidesToShow > s.slideCount && ((s.slideOffset = (e + s.options.slidesToShow - s.slideCount) * s.slideWidth), (a = (e + s.options.slidesToShow - s.slideCount) * t)),
                s.slideCount <= s.options.slidesToShow && (a = s.slideOffset = 0),
                !0 === s.options.centerMode && !0 === s.options.infinite
                    ? (s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth)
                    : !0 === s.options.centerMode && ((s.slideOffset = 0), (s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2))),
                (i = !1 === s.options.vertical ? e * s.slideWidth * -1 + s.slideOffset : e * t * -1 + a),
                !0 === s.options.variableWidth &&
                    ((o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow)),
                    (i = !0 === s.options.rtl ? (o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                    !0 === s.options.centerMode &&
                        ((o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow + 1)),
                        (i = !0 === s.options.rtl ? (o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                        (i += (s.$list.width() - o.outerWidth()) / 2))),
                i
            );
        }),
        (t.prototype.getOption = t.prototype.slickGetOption = function (e) {
            return this.options[e];
        }),
        (t.prototype.getNavigableIndexes = function () {
            var e,
                i = this,
                t = 0,
                o = 0,
                s = [];
            for (e = !1 === i.options.infinite ? i.slideCount : ((t = -1 * i.options.slidesToScroll), (o = -1 * i.options.slidesToScroll), 2 * i.slideCount); t < e; )
                s.push(t), (t = o + i.options.slidesToScroll), (o += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow);
            return s;
        }),
        (t.prototype.getSlick = function () {
            return this;
        }),
        (t.prototype.getSlideCount = function () {
            var i,
                t,
                o = this;
            return (
                (t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0),
                !0 === o.options.swipeToSlide
                    ? (o.$slideTrack.find(".slick-slide").each(function (s, a) {
                          return a.offsetLeft - t + e(a).outerWidth() / 2 > -1 * o.swipeLeft ? ((i = a), !1) : void 0;
                      }),
                      Math.abs(e(i).attr("data-slick-index") - o.currentSlide) || 1)
                    : o.options.slidesToScroll
            );
        }),
        (t.prototype.goTo = t.prototype.slickGoTo = function (e, i) {
            this.changeSlide({ data: { message: "index", index: parseInt(e) } }, i);
        }),
        (t.prototype.init = function (i) {
            var t = this;
            e(t.$slider).hasClass("slick-initialized") ||
                (e(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()),
                i && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && ((t.paused = !1), t.autoPlay());
        }),
        (t.prototype.initADA = function () {
            var i = this;
            i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                i.$slideTrack.attr("role", "listbox"),
                i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function (t) {
                    e(this).attr({ role: "option", "aria-describedby": "slick-slide" + i.instanceUid + t });
                }),
                null !== i.$dots &&
                    i.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (t) {
                            e(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + i.instanceUid + t, id: "slick-slide" + i.instanceUid + t });
                        })
                        .first()
                        .attr("aria-selected", "true")
                        .end()
                        .find("button")
                        .attr("role", "button")
                        .end()
                        .closest("div")
                        .attr("role", "toolbar"),
                i.activateADA();
        }),
        (t.prototype.initArrowEvents = function () {
            var e = this;
            !0 === e.options.arrows &&
                e.slideCount > e.options.slidesToShow &&
                (e.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, e.changeSlide));
        }),
        (t.prototype.initDotEvents = function () {
            var i = this;
            !0 === i.options.dots && i.slideCount > i.options.slidesToShow && e("li", i.$dots).on("click.slick", { message: "index" }, i.changeSlide),
                !0 === i.options.dots && !0 === i.options.pauseOnDotsHover && e("li", i.$dots).on("mouseenter.slick", e.proxy(i.interrupt, i, !0)).on("mouseleave.slick", e.proxy(i.interrupt, i, !1));
        }),
        (t.prototype.initSlideEvents = function () {
            var i = this;
            i.options.pauseOnHover && (i.$list.on("mouseenter.slick", e.proxy(i.interrupt, i, !0)), i.$list.on("mouseleave.slick", e.proxy(i.interrupt, i, !1)));
        }),
        (t.prototype.initializeEvents = function () {
            var i = this;
            i.initArrowEvents(),
                i.initDotEvents(),
                i.initSlideEvents(),
                i.$list.on("touchstart.slick mousedown.slick", { action: "start" }, i.swipeHandler),
                i.$list.on("touchmove.slick mousemove.slick", { action: "move" }, i.swipeHandler),
                i.$list.on("touchend.slick mouseup.slick", { action: "end" }, i.swipeHandler),
                i.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, i.swipeHandler),
                i.$list.on("click.slick", i.clickHandler),
                e(document).on(i.visibilityChange, e.proxy(i.visibility, i)),
                !0 === i.options.accessibility && i.$list.on("keydown.slick", i.keyHandler),
                !0 === i.options.focusOnSelect && e(i.$slideTrack).children().on("click.slick", i.selectHandler),
                e(window).on("orientationchange.slick.slick-" + i.instanceUid, e.proxy(i.orientationChange, i)),
                e(window).on("resize.slick.slick-" + i.instanceUid, e.proxy(i.resize, i)),
                e("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault),
                e(window).on("load.slick.slick-" + i.instanceUid, i.setPosition),
                e(document).on("ready.slick.slick-" + i.instanceUid, i.setPosition);
        }),
        (t.prototype.initUI = function () {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show();
        }),
        (t.prototype.keyHandler = function (e) {
            var i = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === e.keyCode && !0 === i.options.accessibility
                    ? i.changeSlide({ data: { message: !0 === i.options.rtl ? "next" : "previous" } })
                    : 39 === e.keyCode && !0 === i.options.accessibility && i.changeSlide({ data: { message: !0 === i.options.rtl ? "previous" : "next" } }));
        }),
        (t.prototype.lazyLoad = function () {
            function i(i) {
                e("img[data-lazy]", i).each(function () {
                    var i = e(this),
                        t = e(this).attr("data-lazy"),
                        o = document.createElement("img");
                    (o.onload = function () {
                        i.animate({ opacity: 0 }, 100, function () {
                            i.attr("src", t).animate({ opacity: 1 }, 200, function () {
                                i.removeAttr("data-lazy").removeClass("slick-loading");
                            }),
                                s.$slider.trigger("lazyLoaded", [s, i, t]);
                        });
                    }),
                        (o.onerror = function () {
                            i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, i, t]);
                        }),
                        (o.src = t);
                });
            }
            var t,
                o,
                s = this;
            !0 === s.options.centerMode
                ? (o =
                      !0 === s.options.infinite
                          ? (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2
                          : ((t = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1))), s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
                : ((t = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide), (o = Math.ceil(t + s.options.slidesToShow)), !0 === s.options.fade && (0 < t && t--, o <= s.slideCount && o++)),
                i(s.$slider.find(".slick-slide").slice(t, o)),
                s.slideCount <= s.options.slidesToShow
                    ? i(s.$slider.find(".slick-slide"))
                    : s.currentSlide >= s.slideCount - s.options.slidesToShow
                    ? i(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow))
                    : 0 === s.currentSlide && i(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow));
        }),
        (t.prototype.loadSlider = function () {
            var e = this;
            e.setPosition(), e.$slideTrack.css({ opacity: 1 }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
        }),
        (t.prototype.next = t.prototype.slickNext = function () {
            this.changeSlide({ data: { message: "next" } });
        }),
        (t.prototype.orientationChange = function () {
            this.checkResponsive(), this.setPosition();
        }),
        (t.prototype.pause = t.prototype.slickPause = function () {
            this.autoPlayClear(), (this.paused = !0);
        }),
        (t.prototype.play = t.prototype.slickPlay = function () {
            var e = this;
            e.autoPlay(), (e.options.autoplay = !0), (e.paused = !1), (e.focussed = !1), (e.interrupted = !1);
        }),
        (t.prototype.postSlide = function (e) {
            var i = this;
            i.unslicked || (i.$slider.trigger("afterChange", [i, e]), (i.animating = !1), i.setPosition(), (i.swipeLeft = null), i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && i.initADA());
        }),
        (t.prototype.prev = t.prototype.slickPrev = function () {
            this.changeSlide({ data: { message: "previous" } });
        }),
        (t.prototype.preventDefault = function (e) {
            e.preventDefault();
        }),
        (t.prototype.progressiveLazyLoad = function (i) {
            i = i || 1;
            var t,
                o,
                s,
                a = this,
                n = e("img[data-lazy]", a.$slider);
            n.length
                ? ((t = n.first()),
                  (o = t.attr("data-lazy")),
                  ((s = document.createElement("img")).onload = function () {
                      t.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, t, o]), a.progressiveLazyLoad();
                  }),
                  (s.onerror = function () {
                      i < 3
                          ? setTimeout(function () {
                                a.progressiveLazyLoad(i + 1);
                            }, 500)
                          : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, t, o]), a.progressiveLazyLoad());
                  }),
                  (s.src = o))
                : a.$slider.trigger("allImagesLoaded", [a]);
        }),
        (t.prototype.refresh = function (i) {
            var t,
                o,
                s = this;
            (o = s.slideCount - s.options.slidesToShow),
                !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                (t = s.currentSlide),
                s.destroy(!0),
                e.extend(s, s.initials, { currentSlide: t }),
                s.init(),
                i || s.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (t.prototype.registerBreakpoints = function () {
            var i,
                t,
                o,
                s = this,
                a = s.options.responsive || null;
            if ("array" === e.type(a) && a.length) {
                for (i in ((s.respondTo = s.options.respondTo || "window"), a))
                    if (((o = s.breakpoints.length - 1), (t = a[i].breakpoint), a.hasOwnProperty(i))) {
                        for (; 0 <= o; ) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), (s.breakpointSettings[t] = a[i].settings);
                    }
                s.breakpoints.sort(function (e, i) {
                    return s.options.mobileFirst ? e - i : i - e;
                });
            }
        }),
        (t.prototype.reinit = function () {
            var i = this;
            (i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide")),
                (i.slideCount = i.$slides.length),
                i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll),
                i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
                i.registerBreakpoints(),
                i.setProps(),
                i.setupInfinite(),
                i.buildArrows(),
                i.updateArrows(),
                i.initArrowEvents(),
                i.buildDots(),
                i.updateDots(),
                i.initDotEvents(),
                i.cleanUpSlideEvents(),
                i.initSlideEvents(),
                i.checkResponsive(!1, !0),
                !0 === i.options.focusOnSelect && e(i.$slideTrack).children().on("click.slick", i.selectHandler),
                i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0),
                i.setPosition(),
                i.focusHandler(),
                (i.paused = !i.options.autoplay),
                i.autoPlay(),
                i.$slider.trigger("reInit", [i]);
        }),
        (t.prototype.resize = function () {
            var i = this;
            e(window).width() !== i.windowWidth &&
                (clearTimeout(i.windowDelay),
                (i.windowDelay = window.setTimeout(function () {
                    (i.windowWidth = e(window).width()), i.checkResponsive(), i.unslicked || i.setPosition();
                }, 50)));
        }),
        (t.prototype.removeSlide = t.prototype.slickRemove = function (e, i, t) {
            var o = this;
            return (
                (e = "boolean" == typeof e ? (!0 === (i = e) ? 0 : o.slideCount - 1) : !0 === i ? --e : e),
                !(o.slideCount < 1 || e < 0 || e > o.slideCount - 1) &&
                    (o.unload(),
                    !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    void o.reinit())
            );
        }),
        (t.prototype.setCSS = function (e) {
            var i,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (e = -e),
                (i = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
                (s[o.positionProp] = e),
                !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? (s[o.animType] = "translate(" + i + ", " + t + ")") : (s[o.animType] = "translate3d(" + i + ", " + t + ", 0px)")),
                o.$slideTrack.css(s);
        }),
        (t.prototype.setDimensions = function () {
            var e = this;
            !1 === e.options.vertical
                ? !0 === e.options.centerMode && e.$list.css({ padding: "0px " + e.options.centerPadding })
                : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({ padding: e.options.centerPadding + " 0px" })),
                (e.listWidth = e.$list.width()),
                (e.listHeight = e.$list.height()),
                !1 === e.options.vertical && !1 === e.options.variableWidth
                    ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length)))
                    : !0 === e.options.variableWidth
                    ? e.$slideTrack.width(5e3 * e.slideCount)
                    : ((e.slideWidth = Math.ceil(e.listWidth)), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var i = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - i);
        }),
        (t.prototype.setFade = function () {
            var i,
                t = this;
            t.$slides.each(function (o, s) {
                (i = t.slideWidth * o * -1),
                    !0 === t.options.rtl ? e(s).css({ position: "relative", right: i, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : e(s).css({ position: "relative", left: i, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 });
            }),
                t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 });
        }),
        (t.prototype.setHeight = function () {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var i = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", i);
            }
        }),
        (t.prototype.setOption = t.prototype.slickSetOption = function () {
            var i,
                t,
                o,
                s,
                a,
                n = this,
                r = !1;
            if (
                ("object" === e.type(arguments[0])
                    ? ((o = arguments[0]), (r = arguments[1]), (a = "multiple"))
                    : "string" === e.type(arguments[0]) && ((s = arguments[1]), (r = arguments[2]), "responsive" === (o = arguments[0]) && "array" === e.type(arguments[1]) ? (a = "responsive") : void 0 !== arguments[1] && (a = "single")),
                "single" === a)
            )
                n.options[o] = s;
            else if ("multiple" === a)
                e.each(o, function (e, i) {
                    n.options[e] = i;
                });
            else if ("responsive" === a)
                for (t in s)
                    if ("array" !== e.type(n.options.responsive)) n.options.responsive = [s[t]];
                    else {
                        for (i = n.options.responsive.length - 1; 0 <= i; ) n.options.responsive[i].breakpoint === s[t].breakpoint && n.options.responsive.splice(i, 1), i--;
                        n.options.responsive.push(s[t]);
                    }
            r && (n.unload(), n.reinit());
        }),
        (t.prototype.setPosition = function () {
            var e = this;
            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e]);
        }),
        (t.prototype.setProps = function () {
            var e = this,
                i = document.body.style;
            (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
                "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
                (void 0 === i.WebkitTransition && void 0 === i.MozTransition && void 0 === i.msTransition) || !0 !== e.options.useCSS || (e.cssTransitions = !0),
                e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : (e.options.zIndex = e.defaults.zIndex)),
                void 0 !== i.OTransform && ((e.animType = "OTransform"), (e.transformType = "-o-transform"), (e.transitionType = "OTransition"), void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (e.animType = !1)),
                void 0 !== i.MozTransform && ((e.animType = "MozTransform"), (e.transformType = "-moz-transform"), (e.transitionType = "MozTransition"), void 0 === i.perspectiveProperty && void 0 === i.MozPerspective && (e.animType = !1)),
                void 0 !== i.webkitTransform &&
                    ((e.animType = "webkitTransform"), (e.transformType = "-webkit-transform"), (e.transitionType = "webkitTransition"), void 0 === i.perspectiveProperty && void 0 === i.webkitPerspective && (e.animType = !1)),
                void 0 !== i.msTransform && ((e.animType = "msTransform"), (e.transformType = "-ms-transform"), (e.transitionType = "msTransition"), void 0 === i.msTransform && (e.animType = !1)),
                void 0 !== i.transform && !1 !== e.animType && ((e.animType = "transform"), (e.transformType = "transform"), (e.transitionType = "transition")),
                (e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType);
        }),
        (t.prototype.setSlideClasses = function (e) {
            var i,
                t,
                o,
                s,
                a = this;
            (t = a.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")),
                a.$slides.eq(e).addClass("slick-current"),
                !0 === a.options.centerMode
                    ? ((i = Math.floor(a.options.slidesToShow / 2)),
                      !0 === a.options.infinite &&
                          (i <= e && e <= a.slideCount - 1 - i
                              ? a.$slides
                                    .slice(e - i, e + i + 1)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : ((o = a.options.slidesToShow + e),
                                t
                                    .slice(o - i + 1, o + i + 2)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                          0 === e ? t.eq(t.length - 1 - a.options.slidesToShow).addClass("slick-center") : e === a.slideCount - 1 && t.eq(a.options.slidesToShow).addClass("slick-center")),
                      a.$slides.eq(e).addClass("slick-center"))
                    : 0 <= e && e <= a.slideCount - a.options.slidesToShow
                    ? a.$slides
                          .slice(e, e + a.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : t.length <= a.options.slidesToShow
                    ? t.addClass("slick-active").attr("aria-hidden", "false")
                    : ((s = a.slideCount % a.options.slidesToShow),
                      (o = !0 === a.options.infinite ? a.options.slidesToShow + e : e),
                      a.options.slidesToShow == a.options.slidesToScroll && a.slideCount - e < a.options.slidesToShow
                          ? t
                                .slice(o - (a.options.slidesToShow - s), o + s)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                          : t
                                .slice(o, o + a.options.slidesToShow)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")),
                "ondemand" === a.options.lazyLoad && a.lazyLoad();
        }),
        (t.prototype.setupInfinite = function () {
            var i,
                t,
                o,
                s = this;
            if ((!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && ((t = null), s.slideCount > s.options.slidesToShow))) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, i = s.slideCount; i > s.slideCount - o; i -= 1)
                    (t = i - 1),
                        e(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t - s.slideCount)
                            .prependTo(s.$slideTrack)
                            .addClass("slick-cloned");
                for (i = 0; i < o; i += 1)
                    (t = i),
                        e(s.$slides[t])
                            .clone(!0)
                            .attr("id", "")
                            .attr("data-slick-index", t + s.slideCount)
                            .appendTo(s.$slideTrack)
                            .addClass("slick-cloned");
                s.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        e(this).attr("id", "");
                    });
            }
        }),
        (t.prototype.interrupt = function (e) {
            e || this.autoPlay(), (this.interrupted = e);
        }),
        (t.prototype.selectHandler = function (i) {
            var t = this,
                o = e(i.target).is(".slick-slide") ? e(i.target) : e(i.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            return (s = s || 0), t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(s), void t.asNavFor(s)) : void t.slideHandler(s);
        }),
        (t.prototype.slideHandler = function (e, i, t) {
            var o,
                s,
                a,
                n,
                r,
                l = null,
                d = this;
            return (
                (i = i || !1),
                (!0 === d.animating && !0 === d.options.waitForAnimate) || (!0 === d.options.fade && d.currentSlide === e) || d.slideCount <= d.options.slidesToShow
                    ? void 0
                    : (!1 === i && d.asNavFor(e),
                      (o = e),
                      (l = d.getLeft(o)),
                      (n = d.getLeft(d.currentSlide)),
                      (d.currentLeft = null === d.swipeLeft ? n : d.swipeLeft),
                      !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll)
                          ? void (
                                !1 === d.options.fade &&
                                ((o = d.currentSlide),
                                !0 !== t
                                    ? d.animateSlide(n, function () {
                                          d.postSlide(o);
                                      })
                                    : d.postSlide(o))
                            )
                          : !1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll)
                          ? void (
                                !1 === d.options.fade &&
                                ((o = d.currentSlide),
                                !0 !== t
                                    ? d.animateSlide(n, function () {
                                          d.postSlide(o);
                                      })
                                    : d.postSlide(o))
                            )
                          : (d.options.autoplay && clearInterval(d.autoPlayTimer),
                            (s =
                                o < 0
                                    ? d.slideCount % d.options.slidesToScroll != 0
                                        ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                                        : d.slideCount + o
                                    : o >= d.slideCount
                                    ? d.slideCount % d.options.slidesToScroll != 0
                                        ? 0
                                        : o - d.slideCount
                                    : o),
                            (d.animating = !0),
                            d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
                            (a = d.currentSlide),
                            (d.currentSlide = s),
                            d.setSlideClasses(d.currentSlide),
                            d.options.asNavFor && (r = (r = d.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(d.currentSlide),
                            d.updateDots(),
                            d.updateArrows(),
                            !0 === d.options.fade
                                ? (!0 !== t
                                      ? (d.fadeSlideOut(a),
                                        d.fadeSlide(s, function () {
                                            d.postSlide(s);
                                        }))
                                      : d.postSlide(s),
                                  void d.animateHeight())
                                : void (!0 !== t
                                      ? d.animateSlide(l, function () {
                                            d.postSlide(s);
                                        })
                                      : d.postSlide(s))))
            );
        }),
        (t.prototype.startLoad = function () {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()),
                !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
                e.$slider.addClass("slick-loading");
        }),
        (t.prototype.swipeDirection = function () {
            var e,
                i,
                t,
                o,
                s = this;
            return (
                (e = s.touchObject.startX - s.touchObject.curX),
                (i = s.touchObject.startY - s.touchObject.curY),
                (t = Math.atan2(i, e)),
                (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && 0 <= o
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : o <= 360 && 315 <= o
                    ? !1 === s.options.rtl
                        ? "left"
                        : "right"
                    : 135 <= o && o <= 225
                    ? !1 === s.options.rtl
                        ? "right"
                        : "left"
                    : !0 === s.options.verticalSwiping
                    ? 35 <= o && o <= 135
                        ? "down"
                        : "up"
                    : "vertical"
            );
        }),
        (t.prototype.swipeEnd = function (e) {
            var i,
                t,
                o = this;
            if (((o.dragging = !1), (o.interrupted = !1), (o.shouldClick = !(10 < o.touchObject.swipeLength)), void 0 === o.touchObject.curX)) return !1;
            if ((!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (i = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount()), (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (i = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount()), (o.currentDirection = 1);
                }
                "vertical" != t && (o.slideHandler(i), (o.touchObject = {}), o.$slider.trigger("swipe", [o, t]));
            } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (t.prototype.swipeHandler = function (e) {
            var i = this;
            if (!(!1 === i.options.swipe || ("ontouchend" in document && !1 === i.options.swipe) || (!1 === i.options.draggable && -1 !== e.type.indexOf("mouse"))))
                switch (
                    ((i.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1),
                    (i.touchObject.minSwipe = i.listWidth / i.options.touchThreshold),
                    !0 === i.options.verticalSwiping && (i.touchObject.minSwipe = i.listHeight / i.options.touchThreshold),
                    e.data.action)
                ) {
                    case "start":
                        i.swipeStart(e);
                        break;
                    case "move":
                        i.swipeMove(e);
                        break;
                    case "end":
                        i.swipeEnd(e);
                }
        }),
        (t.prototype.swipeMove = function (e) {
            var i,
                t,
                o,
                s,
                a,
                n = this;
            return (
                (a = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
                !(!n.dragging || (a && 1 !== a.length)) &&
                    ((i = n.getLeft(n.currentSlide)),
                    (n.touchObject.curX = void 0 !== a ? a[0].pageX : e.clientX),
                    (n.touchObject.curY = void 0 !== a ? a[0].pageY : e.clientY),
                    (n.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(n.touchObject.curX - n.touchObject.startX, 2)))),
                    !0 === n.options.verticalSwiping && (n.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(n.touchObject.curY - n.touchObject.startY, 2)))),
                    "vertical" !== (t = n.swipeDirection())
                        ? (void 0 !== e.originalEvent && 4 < n.touchObject.swipeLength && e.preventDefault(),
                          (s = (!1 === n.options.rtl ? 1 : -1) * (n.touchObject.curX > n.touchObject.startX ? 1 : -1)),
                          !0 === n.options.verticalSwiping && (s = n.touchObject.curY > n.touchObject.startY ? 1 : -1),
                          (o = n.touchObject.swipeLength),
                          (n.touchObject.edgeHit = !1) === n.options.infinite &&
                              ((0 === n.currentSlide && "right" === t) || (n.currentSlide >= n.getDotCount() && "left" === t)) &&
                              ((o = n.touchObject.swipeLength * n.options.edgeFriction), (n.touchObject.edgeHit = !0)),
                          !1 === n.options.vertical ? (n.swipeLeft = i + o * s) : (n.swipeLeft = i + o * (n.$list.height() / n.listWidth) * s),
                          !0 === n.options.verticalSwiping && (n.swipeLeft = i + o * s),
                          !0 !== n.options.fade && !1 !== n.options.touchMove && (!0 === n.animating ? ((n.swipeLeft = null), !1) : void n.setCSS(n.swipeLeft)))
                        : void 0)
            );
        }),
        (t.prototype.swipeStart = function (e) {
            var i,
                t = this;
            return (
                (t.interrupted = !0),
                1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow
                    ? !(t.touchObject = {})
                    : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (i = e.originalEvent.touches[0]),
                      (t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : e.clientX),
                      (t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : e.clientY),
                      void (t.dragging = !0))
            );
        }),
        (t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit());
        }),
        (t.prototype.unload = function () {
            var i = this;
            e(".slick-cloned", i.$slider).remove(),
                i.$dots && i.$dots.remove(),
                i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(),
                i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(),
                i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
        }),
        (t.prototype.unslick = function (e) {
            this.$slider.trigger("unslick", [this, e]), this.destroy();
        }),
        (t.prototype.updateArrows = function () {
            var e = this;
            Math.floor(e.options.slidesToShow / 2),
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    !e.options.infinite &&
                    (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === e.currentSlide
                        ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode
                        ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                        : e.currentSlide >= e.slideCount - 1 &&
                          !0 === e.options.centerMode &&
                          (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
        }),
        (t.prototype.updateDots = function () {
            var e = this;
            null !== e.$dots &&
                (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
                e.$dots
                    .find("li")
                    .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
        }),
        (t.prototype.visibility = function () {
            this.options.autoplay && (document[this.hidden] ? (this.interrupted = !0) : (this.interrupted = !1));
        }),
        (e.fn.slick = function () {
            var e,
                i,
                o = this,
                s = arguments[0],
                a = Array.prototype.slice.call(arguments, 1),
                n = o.length;
            for (e = 0; e < n; e++) if (("object" == typeof s || void 0 === s ? (o[e].slick = new t(o[e], s)) : (i = o[e].slick[s].apply(o[e].slick, a)), void 0 !== i)) return i;
            return o;
        });
}),
    $(window).load(function () {
        var e = $("#cartLoadedDiv a.clone-item.btn.btn-mini"),
            i = $("#item-attachment-1-nome-nome"),
            t = JSON.parse(localStorage.getItem("secondAttachment"));
        e &&
            (e.trigger("click"),
            setTimeout(function () {
                var e = $("#cartLoadedDiv .add-item-attachment-container a.add-item-attachment");
                e &&
                    (e.trigger("click"),
                    i &&
                        t &&
                        setTimeout(function () {
                            console.log("checkout5 attachment", t.Nome), i.val(t.Nome);
                        }, 1400));
            }, 600));
    });
var isLogin = !1,
    is_review = !0,
    urlProtocol = window.location.origin,
    userEmail = "";
jQuery.expr[":"].icontains = function (e, i, t) {
    return 0 <= jQuery(e).text().toUpperCase().indexOf(t[3].toUpperCase());
};
var commonStore = {
        init: function () {
            this.setup(), this.loginBefore(), this.newsletterOpt(), this.verificaLogado();
        },
        setup: function () {
            $("li.helperComplement").remove(),
                $(".search fieldset").after($(".ui-autocomplete")),
                $(".bread-crumb").length && ($(".bread-crumb ul li:eq(0) a").text("Home"), $(".bread-crumb ul").show()),
                $(".banner-collection").length &&
                    $(".banner-collection .items").slick({
                        infinite: !0,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: !1,
                        autoplay: !0,
                        autoplaySpeed: 2e3,
                        speed: 1e3,
                        fade: !0,
                        cssEase: "linear",
                        responsive: [{ breakpoint: 769, settings: { fade: !1, arrows: !0 } }],
                    });
        },
        loginBefore: function () {
            $("body").on("click", ".login-redir", function () {
                var e = $(this).attr("rel");
                isLogin
                    ? (window.location.href = e)
                    : ($(".ext-modal, .wrap-modal.current").hide(), $("html, body").animate({ scrollTop: 0 }, 0), vtexid.setScopeName(jsnomeSite), vtexid.start({ returnUrl: e, userEmail: "", locale: "pt-BR", forceReload: !1 }));
            });
        },
        verificaLogado: function () {
            $(document).one("ajaxStop", function () {
                $("header .ajax-content-loader").each(function () {

                    if ($("#login", this).length) $(this).parent().addClass("loginOff"), $("body").addClass("loginOff");
                    else if (
                        ($(this).parent().addClass("loginOn"),
                        $("body").addClass("loginOn"),
                        $(".header .nav-user .ajax-content-loader").append(
                            "<div class='box-welcome'><a href='/_secure/account#/orders' class='login-pedidos'>Meus Pedidos</a><a href='/_secure/account#/profile' class='login-cadastro'>Meu Cadastro</a><div class='lista-de-desejos'><a class='login-lista-desejos' a href='/giftlist/manage'>Lista de Desejos</a></div><a class='sair-logout' href='/no-cache/user/logout'>Sair</a></div>"
                        ),
                        $("body").hasClass("loginOn"))
                    ) {
                        $("p.welcome em").remove();
                        var e = $("p.welcome").html();
                        (e = e.replace(/ /g, "").replace("Olá", "").replace(".", " ")), $("p.welcome").html("Olá" + e);
                        $('.welcome').prependTo($('.box-welcome'),
                        $('.welcome').addClass('logado'));
                    }

                    $('body').on('click',function(e){
                        if(document.getElementsByClassName('.account-topo__account-icon')[0]?!document.getElementsByClassName('.account-topo__account-icon')[0].contains(e.target):0)
                            $('.box-welcome').removeClass('ativo');
                    });
                    $(".account-topo__account-icon").click(function(){
                        $('.box-welcome, .welcome').toggleClass('ativo');
                    });
                   
                });
            });       
        },
        autoSearch: function () {
            $(".ui-autocomplete li").each(function () {
                var e = $(this);
                if (0 < e.find("img").length) {
                    var i = e.find("img").attr("src");
                    (i = i.replace("-25-25", "-60-60")), e.find("img").attr("src", i), e.addClass("hasImage");
                }
            }),
                $(".product-found").length <= 0 && $(".hasImage").wrapAll('<ul class="product-found"></ul>');
        },
        carrosselCollection: function (e, i) {
            $(e).slick({
                infinite: !1,
                dots: i,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1380, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                    { breakpoint: 921, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                    { breakpoint: 376, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            });
        },
        carrosselCollectionProductPage: function (e, i) {
            $(e).slick({
                infinite: !1,
                dots: i,
                slidesToShow: 6,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1380, settings: { slidesToShow: 4, slidesToScroll: 1 } },
                    { breakpoint: 921, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                    { breakpoint: 376, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            });
        },
        carrosselCollectionTwoProducts: function (e, i) {
            $(e).slick({
                infinite: !1,
                dots: i,
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1380, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 921, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 376, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                ],
            });
        },
        newsletterOpt: function () {
            $(".ft-newsletter").on("click", ".btn-send", function (e) {
                console.log("Send"), e.preventDefault();
                var i = $(".ft-newsletter #txtemail").val(),
                    t = $(".ft-newsletter #txtname").val(),
                    o = $(".ft-newsletter .btn-send");
                if (0 !== t.length && t.trim())
                    if (0 !== i.length && i.trim())
                        if (util.IsEmail(i)) {
                            o.addClass("load");
                            var s = { newsletterClientName: t, newsletterClientEmail: i, newsInternalPage: "_", newsInternalPart: "newsletter", newsInternalCampaign: "newsletter:opt-in" };
                            $.ajax({
                                type: "POST",
                                url: "/no-cache/Newsletter.aspx",
                                data: s,
                                success: function (e) {
                                    "true" == e
                                        ? (console.log(e), $(".ft-newsletter #send-news").hide(), $(".ft-newsletter .success").show())
                                        : (console.log("erro news"), $(".ft-newsletter #send-news").hide(), $(".ft-newsletter .alert .error").show()),
                                        o.removeClass("load");
                                },
                                error: function (e, i, t) {
                                    newsMakeBackButtomEvent(target);
                                },
                            });
                        } else $(".ft-newsletter #txtemail").addClass("empty").focus();
                    else $(".ft-newsletter #txtemail").addClass("empty").focus();
                else $(".ft-newsletter #txtname").addClass("empty").focus();
            });
        },
    },
    objImage = [],
    paramColor = "none",
    isColor = !1,
    firstImage = "",
    initImage = !0,
    imgProduct = {
        init: function () {
            this.start(), this.event();
        },
        start: function () {
            $.getJSON("/api/catalog_system/pub/products/search?fq=productId:" + skuJson.productId, function (e) {
                $.each(e[0].items, function (e, i) {
                    var t = "unico",
                        o = i.images;
                    i.images[0].imageUrl,
                        (objTemp = ""),
                        i.hasOwnProperty("Metal") && ((isColor = !0), (t = i.Metal[0]), (paramColor = "Metal")),
                        $.each(o, function (e, i) {
                            objTemp += ',"' + i.imageUrl + '"';
                        }),
                        (objTemp = objTemp.replace(",", "")),
                        (objImage += ',"' + t + '":[' + objTemp + "]");
                }),
                    (objImage = "{" + (objImage = objImage.replace(",", "")) + "}"),
                    (objImage = JSON.parse(objImage)),
                    (firstImage = isColor ? ($(".item-dimension-" + paramColor + " label:eq(0)").click(), $(".item-dimension-" + paramColor + " label:eq(0)").text()) : "unico"),
                    imgProduct.config(firstImage);
            });
        },
        config: function (e) {
            var i = "",
                t = "";
            initImage || ($(".slider-for").slick("unslick"), $(".slider-nav").slick("unslick")),
                $(".topic." + paramColor + " .specification .selected").html(e),
                $.each(objImage[e], function (e, o) {
                    (i += '<li><a class="image-zoom"><div class="wrap-zoom"><img src="' + o + '"></div></a></li>'),
                        (t += '<li><a class="image-change"><img src="' + o + '"></a></li>'),
                        0 == e && $(".bar-buy .selected .image").html('<img src="' + o + '">');
                }),
                $(".slider-for").html(i),
                $(".slider-nav").html(t),
                initImage ? (imgProduct.zoom(), imgProduct.slider(), (initImage = !1)) : imgProduct.slider();
        },
        slider: function () {
            $(".slider-for").slick({ infinite: !1, slidesToShow: 1, slidesToScroll: 1, dots: !0, asNavFor: ".slider-nav" }), $(".slider-nav").slick({ slidesToShow: 6, slidesToScroll: 1, focusOnSelect: !0, asNavFor: ".slider-for" });
        },
        zoom: function () {
            $(".slider-for").on("beforeChange", function (e, i, t) {
                $(".image-display .zoom").click();
            });
        },
        event: function () {
            $("body").on("click", ".item-dimension-Metal label", function () {
                if (!$(this).hasClass("checked")) {
                    var e = $(this).text();
                    imgProduct.config(e);
                }
            }),
                $("body").on("click", ".image-zoom", function () {
                    isMobile || ($(".image-display.fullscreen").length < 1 ? ($(this).toggleClass("zoom"), $(this).children(".wrap-zoom").removeAttr("style")) : $(".close-imagefull").click());
                }),
                $("body").on("mousemove", ".image-zoom.zoom", function (e) {
                    $(this)
                        .children(".wrap-zoom")
                        .css({ "transform-origin": ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + "% " + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + "%" });
                }),
                $("body").on("click", ".image-full", function () {
                    $(".image-display .zoom").click(), $(".image-display").addClass("fullscreen"), $("body").addClass("zoom-fullscreen"), $(".slider-for").slick("unslick"), $(".slider-nav").slick("unslick"), imgProduct.slider();
                }),
                $("body").on("click", ".image-full", function () {
                    $(".image-display .zoom").click(), $(".image-display").addClass("fullscreen"), $(".slider-for").slick("unslick"), $(".slider-nav").slick("unslick"), imgProduct.slider();
                }),
                $("body").on("click", ".close-imagefull", function () {
                    $(".image-display").removeClass("fullscreen"), $(".slider-for").slick("unslick"), $(".slider-nav").slick("unslick"), $("body").removeClass("zoom-fullscreen"), imgProduct.slider();
                });
        },
    },
    gtmCart = {
        init: function () {
            this.cartConfig(), this.updateCart(), this.qtyAdd(), this.qtyRemove(), this.qtyUpdate(), this.skuRemove(), this.checkoutAttachment();
        },
        disableCart: function () {
            $(".cartSkuQuantity a, .cartSkuQuantity .select-qty").addClass("disable").removeClass("enable"), $(".cartSkuQuantity .select-qty").attr("readonly", "readonly"), $(".resume-cart").addClass("load");
        },
        enableCart: function () {
            $(".cartSkuQuantity a, .cartSkuQuantity .select-qty").addClass("enable").removeClass("disable"),
                $(".cartSkuQuantity .select-qty").removeAttr("readonly"),
                $(".cart-qty").removeClass("read"),
                $(".resume-cart").removeClass("load");
        },
        cartConfig: function () {
            $(".resume-cart")
                .html(
                    '<div class="cart-wrap"><div class="cart-header"><h4 class="title">Sua sacola</h4></div><div class="cart-content"><div class="cart-itens"><div class="cart-wrap-itens"></div></div></div><div class="row cart-footer"><div class="cart-summary"><div class="hide row shipping"><span class="txt">Frete</span><strong class="value"></strong></div><div class="row cart-total"><span class="txt">Total: </span><strong class="value"></strong></div></div><div class="cart-action"><a href="/checkout/#/cart">Finalizar pedido</a></div></div></div>'
                )
                .addClass("load");
        },
        updateCart: function () {
            vtexjs.checkout.getOrderForm().done(function (e) {
                gtmCart.listCart(e);
            });
        },
        listCart: function (e) {
            var i = 0;
            if (0 < e.items.length) {
                var t = "",
                    o = e.shippingData,
                    s = e.totalizers;
                $.each(e.items, function (e, o) {
                    var s = e;
                    (cartName = o.name),
                        (cartId = o.id),
                        (cartQty = o.quantity),
                        (cartImage = o.imageUrl),
                        (cartPrice = o.price),
                        (cartUrl = o.detailUrl),
                        (t +=
                            '<ul class="row cart-group item-' +
                            s +
                            '" rel="' +
                            s +
                            '"><li class="cartSkuImage"><a href="' +
                            cartUrl +
                            '"><img src="' +
                            cartImage +
                            '" alt="' +
                            cartName +
                            '"></a></li><li class="cartSkuDados"><div class="cartSkuName"><a href="' +
                            cartUrl +
                            '">' +
                            cartName +
                            '</a></div><div class="cartSkuQuantity"><div class="cart-qty"><span><a class="remove-cart-qty disable">-</a><input type="text" onkeypress="return util.isNumberKey(event,this)" class="select-qty disable" maxlength="4" readonly value="' +
                            cartQty +
                            '"><a class="add-cart-qty disable">+</a></span></div></div><div class="cartSkuPrice"><span class="cartValue">R$ ' +
                            util.formatCurrency(cartPrice) +
                            '</span></div></li><li class="cartSkuRemove"><a class="removeItem" rel="' +
                            s +
                            '">X</a></li></ul>'),
                        i++;
                }),
                    $(".resume-cart .cart-itens").html('<div class="cart-wrap-itens">' + t + "</div>"),
                    null != o &&
                        null != o &&
                        0 < o.selectedAddresses.length &&
                        $.each(s, function (e, i) {
                            "Shipping" == i.id &&
                                (0 == i.value
                                    ? $(".shipping").show().find(".value").html("Grátis")
                                    : $(".shipping")
                                          .show()
                                          .find(".value")
                                          .html("R$ " + util.formatCurrency(i.value)));
                        }),
                    $(".resume-cart .cart-total .value").html("R$ " + util.formatCurrency(e.value)),
                    $(".cart-footer").show(),
                    gtmCart.enableCart();
            } else $(".cart-itens").html('<div class="empty-mini-cart">Ops! Sua sacola está vazia</div>'), $(".cart-footer").hide();
            $(".mini-cart .total-qty").html(i), $(".cart-wrap").show();
        },
        qtyAdd: function () {
            $(".resume-cart").on("click", ".add-cart-qty.enable", function () {
                var e = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) + 1;
                $(this).parents(".cart-qty").find(".select-qty").val(e).trigger("change");
            });
        },
        qtyRemove: function () {
            $(".resume-cart").on("click", ".remove-cart-qty.enable", function () {
                var e = parseInt($(this).parents(".cart-qty").find(".select-qty").val()) - 1;
                0 < e && $(this).parents(".cart-qty").find(".select-qty").val(e).trigger("change");
            });
        },
        qtyUpdate: function () {
            $(".resume-cart").on("change", ".select-qty.enable", function () {
                var e = $(this).parents(".cart-group").attr("rel"),
                    i = parseInt($(this).val());
                gtmCart.disableCart(), gtmCart.qtyRefresh(e, i), $(this).parents(".cart-qty").addClass("read");
            });
        },
        qtyRefresh: function (e, i) {
            vtexjs.checkout
                .getOrderForm()
                .then(function (t) {
                    t.items[0];
                    var o = { index: parseInt(e), quantity: parseInt(i) };
                    return vtexjs.checkout.updateItems([o], null, !1);
                })
                .done(function (e) {
                    gtmCart.listCart(e);
                });
        },
        skuRemove: function () {
            $(".resume-cart").on("click", ".removeItem", function () {
                var e = parseInt($(this).attr("rel"));
                gtmCart.disableCart(),
                    vtexjs.checkout
                        .getOrderForm()
                        .then(function (i) {
                            i.items[0];
                            var t = [{ index: e, quantity: 0 }];
                            return vtexjs.checkout.removeItems(t);
                        })
                        .done(function (e) {
                            gtmCart.listCart(e);
                        });
            });
        },
        checkoutAttachment: function () {
            $(window).load(function () {
                var e = $("#cartLoadedDiv a.clone-item.btn.btn-mini"),
                    i = $("#item-attachment-1-nome-nome"),
                    t = JSON.parse(localStorage.getItem("formatura"));
                e &&
                    (e.trigger("click"),
                    setTimeout(function () {
                        var e = $("#cartLoadedDiv .add-item-attachment-container a.add-item-attachment");
                        e &&
                            (e.trigger("click"),
                            i &&
                                t &&
                                setTimeout(function () {
                                    console.log("checkoutAttachment minicart", t.Nome), i.val(t.Nome);
                                }, 1400));
                    }, 600));
            });
        },
    },
    isMobile = !1;
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (isMobile = !0);
var configMobile = {
        init: function () {
            $(window).height();
            var e = $(window).width();
            $(document).height(), e <= 1024 ? $(".info-product").after($(".description-product")) : $(".image-thumb").after($(".description-product"));
        },
    },
    map = {
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢": "a",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡": "A",
        "ÃƒÆ’Ã†â€™ ": "a",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬": "A",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡": "a",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â": "A",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£": "a",
        "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢": "A",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âª": "e",
        "ÃƒÆ’Ã†â€™Ãƒâ€¦ ": "E",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¨": "e",
        "ÃƒÆ’Ã†â€™Ãƒâ€¹Ã¢â‚¬ ": "E",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©": "e",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°": "E",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â®": "i",
        "ÃƒÆ’Ã†â€™Ãƒâ€¦Ã‚Â½": "I",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¬": "i",
        "ÃƒÆ’Ã†â€™Ãƒâ€¦Ã¢â‚¬â„¢": "I",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­": "i",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â": "I",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµ": "o",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢": "O",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´": "o",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â": "O",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â²": "o",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢": "O",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³": "o",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ": "O",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¼": "u",
        "ÃƒÆ’Ã†â€™Ãƒâ€¦Ã¢â‚¬Å“": "U",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â»": "u",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Âº": "U",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âº": "u",
        "ÃƒÆ’Ã†â€™Ãƒâ€¦Ã‚Â¡": "U",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¹": "u",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢": "U",
        "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§": "c",
        "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¡": "C",
        " ": "-",
        "&": "e",
    },
    util = {
        init: function () {
            this.showHide(), this.navPage(), this.topPage(), this.closeLightbox(), this.showLightbox(), this.hideLightbox(), this.navTabs(), this.inputEmpty();
        },
        showHide: function () {
            $("body").on("click", ".click-open", function () {
                $(".drop").slideUp("fast"),
                    $("body .click-close").addClass("click-open"),
                    $("body .click-open").removeClass("click-close"),
                    $(this).addClass("click-close").removeClass("click-open").next(".drop").slideDown(200).addClass("current");
            }),
                $(document).mouseup(function (e) {
                    var i = $(".drop.current");
                    i.is(e.target) ||
                        0 !== i.has(e.target).length ||
                        (i.slideUp(200).removeClass("current"),
                        setTimeout(function () {
                            i.prev(".click-close").removeClass("click-close").addClass("click-open");
                        }, 100));
                }),
                $("body").on("click", ".hide-open", function () {
                    var e = $(this).attr("rel");
                    $("." + e + ".current")
                        .slideUp(200)
                        .removeClass("current"),
                        setTimeout(function () {
                            $("." + e)
                                .prev(".click-close")
                                .removeClass("click-close")
                                .addClass("click-open");
                        }, 100);
                }),
                isMobile && $(".hover-open").removeClass("hover-open").find(".sub-open").addClass("click-open").removeAttr("href"),
                $("body").on("click", ".slide-show", function () {
                    var e = $(this).attr("rel");
                    !(function (e, i) {
                        var t = {};
                        (t[e] = "0"), $(i).show().animate(t, 300);
                    })($(this).attr("rev"), "." + e),
                        jQuery("body").addClass("noScroll");
                }),
                $("body").on("click", ".slide-hide", function () {
                    var e = $(this).attr("rel");
                    !(function (e, i) {
                        var t = {};
                        (t[e] = "-100%"),
                            $(i).animate(t, 300, function () {
                                $(i).hide();
                            });
                    })($(this).attr("rev"), "." + e),
                        jQuery("body").removeClass("noScroll");
                }),
                $("body").on("click", ".show", function () {
                    var e = $(this).attr("rel");
                    $("." + e).slideToggle("fast"), $(this).toggleClass("active");
                }),
                $(".search .wrap").prepend("<span class='close-search'> </span>"),
                $("body .close-search").on("click", function () {
                    $(".search").slideToggle("fast");
                });
            var e = [];
            $(".hover-open").hover(
                function () {
                    var i = jQuery.data(this),
                        t = $(this);
                    e[i] = setTimeout(function () {
                        t.children(".drop").fadeIn(0), (e[i] = "");
                    }, 0);
                },
                function () {
                    var i = jQuery.data(this);
                    "" != e[i] ? clearTimeout(e[i]) : $(this).children(".drop").fadeOut(0);
                }
            );
        },
        popup: function (e, i, t, o) {
            varWindow = window.open(e, i, "width=" + t + ", height=" + o + ", top=10, left=10");
        },
        navPage: function () {
            $("body").on("click", ".nav-on-page", function () {
                var e = $(this).attr("rel");
                $(window).width(), $("html, body").animate({ scrollTop: $("." + e).offset().top - 120 }, 1e3);
            });
        },
        topPage: function () {
            $("body").on("click", ".top-page", function () {
                $("html, body").animate({ scrollTop: 0 }, 1e3);
            });
        },
        navTabs: function () {
            $("body").on("click", ".tabs .tab", function (e) {
                e.preventDefault();
                var i = $(this).attr("rel");
                return (
                    $(this).parents(".tabs-all").find(".tabs .tab").removeClass("current"),
                    $(this).addClass("current"),
                    $(this).parents(".tabs-all").find(".tab-content").hide(),
                    $(this)
                        .parents(".tabs-all")
                        .find("." + i)
                        .fadeIn(),
                    !1
                );
            });
        },
        createLightbox: function (e, i) {
            (vHeight = $(document).height()),
                $(".ext-modal").fadeIn("fast", function () {
                    $("body").prepend('<div class="wrap-modal center current ' + i + '"><a class="close close-modal" rel="' + i + '">X</a>' + e + "</div>");
                }),
                $("body").addClass("noScroll");
        },
        closeLightbox: function () {
            $("body").on("click", ".close-modal", function () {
                var e = $(this).attr("rel");
                $("." + e).remove(),
                    $(".ext-modal").fadeOut("fast", function () {
                        $("body").removeClass("noScroll");
                    });
            });
        },
        showLightbox: function () {
            $("body").on("click", ".show-modal", function () {
                var e = $(this).attr("rel");
                $(".ext-modal, ." + e).fadeIn("fast"), $("." + e).addClass("current"), $("body").addClass("noScroll");
            });
        },
        hideLightbox: function () {
            $("body").on("click", ".hide-modal", function () {
                $(this).parents(".wrap-modal").fadeOut("fast").removeClass("current"),
                    $(".ext-modal").fadeOut("fast", function () {
                        $("body").removeClass("noScroll");
                    });
            }),
                $("body").on("click", ".ext-modal", function () {
                    $(".wrap-modal.current .close").click(), $(".wrap-modal.current").removeClass("current");
                });
        },
        strToClass: function (e) {
            return e
                .replace(/[\W\[\] ]/g, function (e) {
                    return map[e] || e;
                })
                .toLowerCase();
        },
        inputEmpty: function () {
            $("body").on("keypress", "input.empty, textarea.empty", function () {
                $(this).removeClass("empty");
            });
        },
        isNumberKey: function (e, i) {
            var t = e.which ? e.which : event.keyCode;
            return !((-1 != i.value.indexOf(".") && 46 == t) || (46 != t && 31 < t && (t < 48 || 57 < t)));
        },
        IsEmail: function (e) {
            return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e);
        },
        extraiValor: function (e) {
            return parseFloat(
                e
                    .replace(",", ".")
                    .replace(/(\d)(\.)(?=\d\d\d)/g, "$1")
                    .slice(3)
            );
        },
        formatIntReal: function (e) {
            var i = e + "";
            return 6 < (i = i.replace(/([0-9]{2})$/g, ",$1")).length && (i = i.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")), i;
        },
        formatFloatReal: function (e) {
            var i;
            return (
                (i = e.toString().slice(-2)),
                "<span>R$</span> " +
                    e
                        .toString()
                        .slice(0, -3)
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
                    "," +
                    i
            );
        },
        formatCurrency: function (e) {
            var i = e + "",
                t = !1;
            return (
                0 == i.indexOf("-") && ((t = !0), (i = i.replace("-", ""))),
                1 == i.length && (i = "0" + i),
                6 < (i = i.replace(/([0-9]{2})$/g, ",$1")).length && (i = i.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")),
                9 < i.length && (i = i.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3")),
                12 < i.length && (i = i.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4")),
                0 == i.indexOf(".") && (i = i.replace(".", "")),
                0 == i.indexOf(",") && (i = i.replace(",", "0,")),
                t ? "-" + i : i
            );
        },
        createCookie: function (e, i, t) {
            var o = "";
            if (t) {
                var s = new Date();
                s.setTime(s.getTime() + 24 * t * 60 * 60 * 1e3), (o = "; expires=" + s.toUTCString());
            }
            document.cookie = e + "=" + i + o + "; path=/";
        },
        readCookie: function (e) {
            for (var i = e + "=", t = document.cookie.split(";"), o = 0; o < t.length; o++) {
                for (var s = t[o]; " " == s.charAt(0); ) s = s.substring(1, s.length);
                if (0 == s.indexOf(i)) return s.substring(i.length, s.length);
            }
            return null;
        },
        removeCookie: function (e) {
            util.createCookie(e, "", -1);
        },
        buyOnPage: function (e, i) {
            $.ajax({
                type: "GET",
                url: window.location.origin + e,
                success: function () {
                    vtexjs.checkout
                        .getOrderForm()
                        .then(function (e) {
                            gtmCart.listCart(e);
                        })
                        .then(function (e) {
                            return vtexjs.checkout.addItemAttachment(0, "Nome", i, null, !1);
                        })
                        .done(function (e) {
                            console.log("orderForm", e);
                        }),
                        isMobile
                            ? $(".open-minicart").click()
                            : $(".resume-cart")
                                  .slideDown()
                                  .delay(4e3)
                                  .slideUp("fast", function () {
                                      $(".resume-cart").removeAttr("style");
                                  }),
                        $(".buy-button.load").removeClass("load").html("Adicionado");
                },
                error: function () {
                    console.log("Não foi possível adicionar ao carrinho");
                },
                complete: function () {},
            });
        },
        addOnPage: function (e, i, t) {
            $.ajax({
                type: "GET",
                url: window.location.origin,
                success: function () {
                    vtexjs.checkout
                        .addToCart(e, null, 1)
                        .then(function (e) {
                            gtmCart.listCart(e);
                        })
                        .done(function (e) {
                            console.log("orderForm", e);
                        }),
                        isMobile
                            ? $(".open-minicart").click()
                            : $(".resume-cart")
                                  .slideDown()
                                  .delay(4e3)
                                  .slideUp("fast", function () {
                                      $(".resume-cart").removeAttr("style");
                                  }),
                        console.log("Adicionado!"),
                        $(".custom-add-button").removeClass("load").html("Adicionado");
                },
                error: function () {
                    console.log("Não foi possível adicionar ao carrinho");
                },
                complete: function () {},
            });
        },
    },
    pg404 = {
        init: function () {
            commonStore.carrosselCollection(".collection.group-6 h2 + ul", !0);
        },
    },
    pgCatalog = {
        init: function () {
            this.event(), this.research(), this.setup(), this.conditionalBanner();
        },
        setup: function () {
            var e = $(".resultado-busca-numero:eq(0) .value").text();
            $(".header-category .total-list .value").html(e + " produtos."), pgCatalog.leftbar(), pgCatalog.orderby();
        },
        event: function () {
            $("body").on("click", ".btn-orderby", function () {
                $(".btn-filter a.active").click();
            }),
                $("body").on("click", ".showhide-Filter", function () {
                    $(this).next("div").slideToggle("fast"), $(this).toggleClass("active");
                });
        },
        orderby: function () {
            var e = $(".orderBy:eq(0) select").attr("onchange"),
                i = "";
            (e = (e = e.split("href= '"))[1].split("' + 'O=")),
                $(".orderBy:eq(0) option").each(function () {
                    var t = "",
                        o = $(this).val(),
                        s = $(this).text();
                    $(this).is(":selected") && (t = "current-order"), (i += '<li><a href="' + e[0] + "O=" + o + '" class="' + t + '">' + s + "</a></li>");
                }),
                $(".select-orderby").html(i),
                $(".list-orderby li:eq(0) a").remove(),
                $(".list-orderby li:eq(0), .list-orderby li:eq(4)").remove(),
                $(".list-orderby li a.current-order").attr("href", "javascript:void(0);"),
                $(".list-orderby").show();
        },
        research: function () {
            $(".navigation-tabs input[type='checkbox']").vtexSmartResearch({
                emptySearchMsg: "<h3>Ops! Esta combinação de filtros nÃo retornou nenhum resultado.</h3><div></div>",
                filtersMenu: ".navigation-tabs",
                filterScrollTop: function () {
                    $("html, body").animate({ scrollTop: $(".header-category").offset().top }, 1e3);
                },
                ajaxCallback: function () {
                    setTimeout(pgCatalog.checkFilter, 400), setTimeout(commonStore.off_shelf, 400);
                },
            });
        },
        leftbar: function () {
            $(".filtro_faixa-de-preco label").each(function () {
                var e = $(this),
                    i = e.attr("class");
                (i = i.replace("[", "-").replace("]", "-")), e.removeClass().addClass(i);
            }),
                $(".search-multiple-navigator h5").each(function () {
                    $(this).addClass("showhide-Filter");
                }),
                $(".search-multiple-navigator .ver-filtros").each(function () {
                    $(this).parents("fieldset").hide();
                }),
                $(".menu-departamento").show();
        },
        conditionalBanner: function () {
            // não funciona mais
        },
    },
    pgCollection = {
        init: function () {
            this.setup(), commonStore.carrosselCollection(".collection.group-1 h2 + ul", !0), commonStore.carrosselCollection(".collection.group-2 h2 + ul", !0);
        },
        setup: function () {
            $(".banner.position-1 .desk .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !1, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3, dots: !0 }),
                $(".banner.position-1 .mobile .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3, dots: !0 });
        },
    },
    pgAllCollections = {
        init: function () {
            this.setup(), commonStore.carrosselCollection(".collection.group-1 h2 + ul", !0), commonStore.carrosselCollection(".collection.group-2 h2 + ul", !0), commonStore.carrosselCollection(".collection.group-3 h2 + ul", !0);
        },
        setup: function () {
            $(".banner.position-1 .desk .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !1, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3, dots: !0 }),
                $(".banner.position-1 .mobile .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3, dots: !0 }),
                $(".post.tpl-1 ul").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 2e3, speed: 1e3 });
        },
    },
    pgContact = {
        init: function () {
            this.event();
        },
        event: function () {
            $(".form-custom").on("click", ".send-custom", function () {
                var e = $("#c-name").val(),
                    i = $("#c-email").val(),
                    t = $("#c-type").val(),
                    o = $("#message").val(),
                    s = $(this);
                if ("" == e) $("#c-name").addClass("empty").focus();
                else if ("" == i) $("#c-email").addClass("empty").focus();
                else if (util.IsEmail(i))
                    if ("" == o) $("#message").addClass("empty").focus();
                    else {
                        s.addClass("load"), window.location.protocol;
                        var a = { name: e, email: i, select: t, message: o };
                        (contentHeaders = { Accept: "application/json", "Content-Type": "application/json" }),
                            setTimeout(function () {
                                $.ajax({ headers: contentHeaders, url: "/api/dataentities/FO/documents", async: !1, crossDomain: !0, type: "POST", data: JSON.stringify(a) })
                                    .success(function (e) {
                                        s.removeClass("load"),
                                            $(".form-custom input, .form-custom textarea").val(""),
                                            $(".alert.PageContactContent__SuccessMessage").css("display", "flex").slideDown().find(".infos.success").css("display", "flex").slideDown();
                                    })
                                    .fail(function (e) {
                                        s.removeClass("load"), $(".form-custom fieldset").hide(), $(".alert.PageContactContent__SuccessMessage").css("display", "flex").slideDown().find(".infos.error").css("display", "flex").slideDown();
                                    });
                            }, 50);
                    }
                else $("#c-email").addClass("empty").focus();
            }),
                $(".alert.PageContactContent__SuccessMessage").on("click", function () {
                    $(this).hide(), $(this).find(".success, .error").hide();
                }),
                $(".form-custom").on("click", ".back-custom", function () {
                    $(".alert.PageContactContent__SuccessMessage").css("display", "flex").slideDown().find(".infos.error").css("display", "flex").slideDown(), $(".form-custom fieldset").slideDown();
                });
        },
    },
    pgEmpty = {
        init: function () {
            this.setup(), commonStore.carrosselCollection(".collection.group-6 h2 + ul", !0);
        },
        setup: function () {
            var e = $("meta[name=Abstract]").attr("content"),
                i = decodeURIComponent(encodeURI(e));
            $(".warning .digitado").html(i);
        },
    },
    pgHome = {
        init: function () {
            this.setup(),
                commonStore.carrosselCollection(".collection.group-1 h2 + ul", !0),
                commonStore.carrosselCollection(".collection.group-2 h2 + ul", !0),
                commonStore.carrosselCollectionTwoProducts(".collection.group-3 h2 + ul", !0),
                commonStore.carrosselCollection(".collection.group-4 .shelf > ul", !0);
        },
        setup: function () {
            var e, i, t;
            $(".banner.position-1 .desk .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 8e3, speed: 1e3, dots: 1, pauseOnFocus: !0 }),
                $(".banner.position-1 .mobile .row").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, autoplaySpeed: 8e3, speed: 1e3, dots: !0 }),
                $(".post.tpl-1 ul").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !1, autoplaySpeed: 2e3, speed: 1e3 }),
                (e = jQuery),
                $(window).width() <= 768 && $(".collection-wrapper").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !0, pauseOnFocus: !0 });
        },
    },
    pgInstitucional = {
        init: function () {
            this.setup(), this.accordion();
        },
        setup: function () {
            var e = $(".content-custom .title:eq(0)").text();
            $(".bread-crumb ul").append('<li class="last">' + e + "</li>");
        },
        accordion: function () {
            $(".accordion__container").click(function () {
                $(this).toggleClass("is-visible");
            });
        },
    },
    aro = ((objImage = []), ""),
    dateAlianca = new Date(),
    imgFirst = !0,
    pgProduct = {
        init: function () {
            this.setup(),
                this.event(),
                imgProduct.init(),
                commonStore.carrosselCollectionProductPage(".collection.group-8 h2 + ul", !1),
                commonStore.carrosselCollectionProductPage(".collection.group-9 h2 + ul", !1),
                configMobile.init(),
                addWishlist.init(),
                this.shipping(),
                this.disccount();
        },
        setup: function () {
            var e = window.location.href,
                i = skuJson.name,
                t = skuJson.skus[0].image;
            if (
                ($(".whatsapp-share-button").attr("rel", "https://wa.me/?text=" + e),
                $(".twitter-share-button").attr("rel", "https://twitter.com/intent/tweet?text=" + e),
                $(".facebook-share-button").attr("rel", "https://www.facebook.com/sharer/sharer.php?u=" + e),
                $(".pinterest-share-button").attr("rel", "https://www.pinterest.com/pin/create/button/?url=" + e + "&media=" + t + "&description=" + i),
                $("ul.topic").length && $(".sku-select").show(),
                $("#divCompreJunto td.buy").length &&
                    ($("#divCompreJunto td img").each(function () {
                        var e = $(this).attr("src").replace("-90-90", "-300-300");
                        $(this).attr("src", e);
                    }),
                    $("#divCompreJunto td.buy").each(function () {
                        var e = $(this).find("strong:eq(2)").length
                                ? $(this).find("strong:eq(2)").html().replace("Comprando junto você economiza:", "")
                                : $(this).find("#divTitulo").length
                                ? $(this).find("#divTitulo").html().replace("Comprando junto você economiza:", "")
                                : "",
                            i = $(this).find("strong:eq(0)").text(),
                            t = $(this).find("strong:eq(1)").text();
                        $(this).find("strong, br, .more").remove(),
                            $(this)
                                .prepend(
                                    '<div class="parcela"><strong>' +
                                        i +
                                        "</strong> de <strong>" +
                                        t +
                                        '</strong></div><div class="total">ou <strong>' +
                                        o +
                                        '</strong> À vista</div><div class="economia">Comprando junto você economiza: <strong class="value">' +
                                        e +
                                        "</strong></div>"
                                )
                                .css("display", "block");
                    })),
                360 == skuJson_0.productId &&
                    ($(".Gravura")
                        .html('<ul class="group-pulseira"><li class="anexo"><div class="row"><span class="title">Gravação:</span><span class="input"><input maxlength="20" type="text" class="input-gravura"></span></div></li></ul>')
                        .show(),
                    $(".productBuy .buy-button").wrap("<div class='hide'></div>"),
                    $(".productBuy").append('<a class="btn-pulseira">Comprar</a>'),
                    $(".Gravura").show()),
                (-1 < $(".info-product .ct .productName").text().toLowerCase().indexOf("anel de formatura") || -1 < $(".info-product .ct .productName").text().toLowerCase().indexOf("pingente de formatura")) &&
                    (console.log("tem"),
                    $.getJSON("/api/catalog_system/pub/specification/fieldvalue/149", function (e) {
                        var i = "";
                        $.each(e, function (e, t) {
                            console.log(t.Value), (i += "<option value=" + t.Value + ">" + t.Value + "</option>");
                        }),
                            $(".Gravura")
                                .html(
                                    '<ul class="group-formatura"><li class="anexo"><div class="row"><span class="title">Curso:</span><span class="input"><select class="input-gravura"><option value="">Selecione</option>' +
                                        i +
                                        "</select></div></li></ul>"
                                )
                                .show(),
                            $(".productBuy .buy-button").wrap("<div class='hide'></div>"),
                            $(".productBuy").append('<a class="btn-formatura">Comprar</a>'),
                            $(".Gravura").show();
                    })),
                "Aliancas" == vtxctx.categoryName)
            ) {
                var o = "";
                $(".topic.Aro").hide(),
                    $.each(skuJson_0.dimensionsMap.Aro, function (e, i) {
                        o += '<a class="select">' + i + "</a>";
                    });
                var s = dateAlianca.getDate(),
                    a = dateAlianca.getMonth() + 1;
                s < 10 && (s = "0" + s),
                    a < 10 && (a = "0" + a),
                    (dateAlianca = s + "." + a + "." + dateAlianca.getFullYear()),
                    (aro =
                        '<ul class="row a_topic a_Aro"><li class="specification">Aro:</li><li class="select-aros"><div class="row">' +
                        o +
                        '</div></li><li class="anexo"><div class="row"><span class="title">Gravação:</span><span class="input"><input maxlength="20" placeholder="Aliança 1 (Maria ' +
                        dateAlianca +
                        ')" type="text" class="input-gravura"></span></div></li></ul>'),
                    $(".productBuy .buy-button").wrap("<div class='hide'></div>"),
                    $(".Gravura")
                        .html('<div class="group-aro aro-1">' + aro + '</div><div class="group-aro aro-2">' + aro + "</div>")
                        .show(),
                    $(".productBuy").append('<a class="btn-alianca">Comprar</a>'),
                    $(".Gravura").show();
            }
            vtxctx.categoryName == vtxctx.departmentName ? $(".ref-description .departament").html(vtxctx.categoryName) : $(".ref-description .departament").html(vtxctx.categoryName + " - " + vtxctx.departmentName),
                ("Aliancas" != vtxctx.categoryName && "Anel" != vtxctx.categoryName) || $(".guide-size").removeClass("hide"),
                $(".product .buy-button").text().length || $(".product .buy-button").text("Comprar");
        },
        addCart: function (e, i) {
            var t,
                o = "",
                s = e,
                a = $(".group-aro.aro-" + i + " .input-gravura").val(),
                n = $(".item-dimension-Metal label.checked.sku-picked").text(),
                r = $(".group-aro.aro-" + i + " a.select.active").text(),
                l = {};
            if (0 == i || 3 == i) {
                var d = $(".buy-button.buy-button-ref").attr("href");
                1 < d.indexOf("alert")
                    ? alert("Por favor, selecione um modelo acima")
                    : ((o = d.split("sku=")[1].split("&qty=")[0]),
                      (a = $(".input-gravura:eq(0)").val()),
                      0 == i && (console.log("pulseria"), (l = { Nome: a }), (t = "Nome")),
                      3 == i && (console.log("anel"), (l = { Curso: a }), (t = "Curso")));
            } else
                console.log("alianca"),
                    $.each(skuJson_0.skus, function (e, i) {
                        i.dimensions.Metal == n && i.dimensions.Aro == r && (o = i.sku);
                    }),
                    (l = { Nome: a }),
                    (t = "Nome");
            console.log(o),
                "" != o &&
                    ($(".productBuy a").addClass("load").html("Aguarde"),
                    setTimeout(function () {
                        var e = { id: parseInt(o), quantity: 1, seller: 1 };
                        vtexjs.checkout
                            .getOrderForm()
                            .then(function (i) {
                                return vtexjs.checkout.addToCart([e]);
                            })
                            .done(function (e) {
                                vtexjs.checkout
                                    .getOrderForm()
                                    .then(function (e) {
                                        var i = parseFloat(e.items.length) - 1,
                                            o = t,
                                            s = l;
                                        return console.log(i), vtexjs.checkout.addItemAttachment(i, o, s);
                                    })
                                    .done(function (e) {
                                        console.log(e), s ? pgProduct.addCart(!1, "2") : (location.href = "/checkout/#/cart");
                                    });
                            });
                    }, 50));
        },
        shipping: function () {
            $("#popupCalculoFreteWrapper .shipping-value").attr("title", "Digite o CEP de entrega e calcule o seu frete").text("Digite o CEP de Entrega e Calcule o seu Frete"),
                setTimeout(function () {
                    $(".shipping-calc").length && $("#popupCalculoFreteWrapper .shipping-value").trigger("click");
                }, 1500);
        },
        disccount: function () {
            var e = $(".skuListPrice").length && parseFloat($(".skuListPrice").text().split("R$ ")[1].replace(",", ".")),
                i = (((e - ($(".skuBestPrice").length && parseFloat($(".skuBestPrice").text().split("R$ ")[1].replace(",", ".")))) / e) * 100).toFixed(0);
            1 <= i && ($(".product-disccount").text("-" + i + " %"), $(".product-disccount").show());
        },
        event: function () {
            $(".share-product").on("click", ".pop", function () {
                var e = $(this).attr("rel"),
                    i = $(this).attr("pW"),
                    t = $(this).attr("pH"),
                    o = $("text", this).text();
                util.popup(e, o, i, t);
            }),
                $("body").on("click", ".select-aros .select", function () {
                    $(".aro-2 input")
                        .attr("placeholder", "Aliança 2 (Fernando " + dateAlianca + ")")
                        .slideDown(),
                        $(".aro-2").slideDown(),
                        $(this).parents(".group-aro").find(".select.active").removeClass("active"),
                        $(this).addClass("active");
                }),
                $("body").on("click", ".btn-alianca", function () {
                    var e = !1;
                    $(".group-aro.aro-2 .select.active").length && (e = !0), pgProduct.addCart(e, "1");
                }),
                $("body").on("click", ".btn-pulseira", function () {
                    pgProduct.addCart(!1, 0);
                }),
                $("body").on("click", ".btn-formatura", function () {
                    pgProduct.addCart(!1, 3);
                });
        },
    };
pgSearch = {
    init: function () {
        this.setup(), pgCatalog.orderby(), pgCatalog.research(), pgCatalog.conditionalBanner();
    },
    setup: function () {
        var e = $(".resultado-busca-numero:eq(0) .value").text();
        $(".header-category .total-list .value").html(e + " produtos."),
            $(".menu-departamento h4 a, .menu-departamento ul li a").each(function () {
                var e = "",
                    i = "";
                (e = $(this).html()), /\(/.test(e) && ((i = (e = e.split("("))[0]), (e = (e = (e = e[1]).split(")"))[0]), $(this).html(i + '<em class="qtd-filter">' + e + "</em>"));
            });
    },
};
var addWishlist = {
    init: function () {
        this.event();
    },
    setup: function () {
        var e = skuJson.skus[0].sku;
        if ($(".load-wishlist").length)
            if ($(".glis-mylist li.type-4").length) {
                var i = $(".glis-mylist a.glis-submit-list:eq(0)").text(),
                    t = { GiftListId: $(".glis-mylist a.glis-submit-list:eq(0)").attr("rel"), CheckedItems: e, AddToQuantity: 1 };
                addWishlist.addlist(t, "/no-cache/giftlistv2/skutolist", i);
            } else (t = { GiftListName: (i = "l" + new Date().getTime().toString()), GiftListTypeId: "4", UrlFolder: "", CheckedItems: e, AddToQuantity: 1 }), addWishlist.addlist(t, "/no-cache/giftlistv2/skutonewlist", i);
    },
    msg: function (e) {
        $(".content-wishlist").html(
            '<div class="text">Item adicionado<br> a Lista de Desejos</div><div class="row action"><a class="close-wishlist">Continuar comprando</a><a class="see-list" target="_top" href="/list/' + e + '">Ver a Lista de Desejos</a></div>'
        ),
            $(".load-wishlist").remove();
    },
    addlist: function (e, i, t) {
        var o = t;
        $.ajax({
            type: "POST",
            url: i,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: ko.toJSON(e),
            success: function (e) {
                addWishlist.msg(o);
            },
            error: function (e) {
                $(".list-form-box").html(e.responseText);
            },
        });
    },
    event: function () {
        $("body").on("click", ".add-wishlist", function () {
            var e = $("#___rc-p-id").val();
            isLogin
                ? util.createLightbox('<iframe id="ifradd" src="/quick-view/?idproduto=' + e + '&KeepThis=true&lid=407522b0-e114-49b8-9a42-016bd98d6a5d" frameborder="0" scrolling="no"></iframe>', "jn-add-wishlist")
                : $(".welcome a#login").click();
        });
    },
};
function closeAddList() {
    $(".jn-add-wishlist .close-modal").click();
}
pgWishlist = {
    init: function () {
        this.setup(), this.event();
    },
    setup: function () {
        var e = $(".resultado-busca-numero:eq(0) .value").text();
        $(".header-category .total-list .value").html(e);
    },
    event: function () {
        var e = $(".header-category .total-list .value");
        $("body.wishlist").on("click", ".list-prod .remove-item", function () {
            var i = $(this);
            (idsku = i.parents("li").find(".ct").attr("data-sku")), (qtyCurrent = e.text()), (qtyNew = parseInt(qtyCurrent) - 1);
            var t = "/no-cache/giftlistv2/changewishedamount/{0}/{1}/{2}".format(jscheckoutGiftListId, idsku, 0);
            $.post(t, function (t) {
                i.parents("li").remove(), e.html(qtyNew);
            });
        });
    },
    check: function () {
        var e = $(".type-4 .action-view a"),
            i = $(".giftlist-body-desired").text();
        console.log(i), e.length && (console.log("tem"), 0 == parseInt(i) ? $(".empty-list").show() : (window.location.href = e.attr("href")));
    },
};
var loadPage = {
    getInstance: function () {
        return $("meta[name=controller]").attr("content") || !1;
    },
    init: function () {
        var e = loadPage.getInstance();
        if (e)
            switch (e) {
                case "Home":
                    pgHome.init();
                    break;
                case "Category":
                    pgCatalog.init();
                    break;
                case "Collection":
                    pgCollection.init();
                    break;
                case "Collections":
                    pgAllCollections.init();
                    break;
                case "Product":
                    pgProduct.init();
                    break;
                case "Search":
                    pgSearch.init();
                    break;
                case "Empty":
                    pgEmpty.init();
                    break;
                case "Error":
                    pg404.init();
                    break;
                case "Brand":
                    pgBrand.init();
                    break;
                case "Institucional":
                    pgInstitucional.init();
                    break;
                case "Login":
                    pgRegister.init();
                    break;
                case "Wishlist":
                    pgWishlist.init();
                    break;
                case "Manage":
                    pgWishlist.check();
                    break;
                case "Contact":
                    pgContact.init();
            }
    },
};
$(document).ready(function () {
    console.log("local"), gtmCart.init(), commonStore.init(), loadPage.init(), util.init();
}),
    $(document).ajaxStop(function () {
        $("#ajaxBusy").addClass("load-2"),
            $("li.helperComplement").remove(),
            $(".ui-autocomplete li").length && commonStore.autoSearch(),
            $("body.add-event-list").length && addWishlist.setup(),
            $("body.product").length && $(".add-wishlist").css("display", "block");
    }),
    (window.onresize = function (e) {
        $("body.product").length && configMobile.init();
    }),
    (function () {
        var e = 0;
        $(window).scroll(function (i) {
            var t = $(this).scrollTop();
            e < t ? $("body").addClass("top-fixed") : $("body").removeClass("top-fixed"), (e = t);
        });
    })();

    var bannersCustomizados = {
        bannersCustom: function(){
            var collectionUrl = window.location.href;
            var newCollectionUrl = collectionUrl.replace('https://www.maxior.com.br', '');
            if (newCollectionUrl === "/busca/?fq=H:343"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-desk.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='70' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:344"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-desk.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='70' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:345"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-desk.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='70' alt='O Poder das Pedras' src='/arquivos/banner-poder-das-pedras-categoria-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:346"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção Acqua' src='/arquivos/Acqua-Banner_Site_Categoria.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='70' alt='Coleção Acqua' src='/arquivos/Acqua-Banner_Categoria_Mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:352"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção Seeds' src='/arquivos/seeds-novo.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='436' alt='Coleção Seeds' src='/arquivos/seeds-novo-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/joias/Filhotes" || newCollectionUrl === "/busca/?fq=H:355"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção Filhotes' src='/arquivos/filhotes-novo.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='618' height='436' alt='Coleção Filhotes' src='/arquivos/filhotes-novo-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:353"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção The Eye' src='/arquivos/theeye-novo.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='Coleção The Eye' src='/arquivos/theeye-novo-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:358"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção Love Blend' src='/arquivos/MX-love-blend-desk-categoria-1920x200.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='Coleção Love Blend' src='/arquivos/MX-love-blend-mobile-categoria-640x436.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:351"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='400' alt='LEAF' src='/arquivos/MX-Leaf-Banner_categoria-desktop.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='765' alt='LEAF' src='/arquivos/MX-Leaf-Banner_categoria-mobile.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:369"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Desconto Progressivo' src='/arquivos/desconto-progressivo-desk.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='Desconto Progressivo' src='/arquivos/desconto-progressivo-mob.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:367"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Coleção YOU' src='/arquivos/mx-banner-desk-categoria-you-1920x200.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='Coleção YOU' src='/arquivos/mx-banner-mobile-categoria-you-640x436.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:370"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='' src='/arquivos/MX-S1920X200-desk-categ.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='' src='/arquivos/MX-S640X436-mobile-categ.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/joias"){
                $('.category .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='' src='/arquivos/MX-Golden-sale-banner_site_200x1920.jpg' complete='complete'></a></div>");
                $('.category .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='' src='/arquivos/MX-Golden-sale-banner_mobile_640x436.jpg' complete='complete'></a></div>");
            }else if(newCollectionUrl === "/busca/?fq=H:385"){
                $('.result-search .position-4 .desk').append("<div class='box-banner'><a><img width='1920' height='200' alt='Golden State' src='/arquivos/MX-Golden-sale-banner_site_200x1920.jpg' complete='complete'></a></div>");
                $('.result-search .position-4 .mob').append("<div class='box-banner'><a><img width='640' height='436' alt='Golden State' src='/arquivos/MX-Golden-sale-banner_mobile_640x436.jpg' complete='complete'></a></div>");
            }
        },
        init: function(){
            bannersCustomizados.bannersCustom();
        }
    }
    bannersCustomizados.init(); 
    
    // var consultora = {
    //     /* Fale Conosco */
    //         faleConosco: function() {
    //             $(".enviarForm").click(function() {
    //                 function validateEmail(fcEmail) {
    //                     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                     return re.test(fcEmail);
    //                 }

    //                 var varN = $('#fcNome').val();
    //                 var varS = $('#fcSobrenome').val();
    //                 var varE = $('#fcEmail').val();
    //                 var varT = $('#fcTelefone').val();
    //                 var varM = $('#fcMsg').val();

    //                 function validate() {
    //                     var fcEmail = $("#fcEmail").val();

    //                     if (validateEmail(fcEmail)) {
    //                         enviaDados();
    //                     } else {
    //                         $('#fcEmail').css('border', '1px solid #d00d0d');
    //                         $('#fcEmail').before('<div class="box-form-msg">Preencha um e-mail válido</div>');
    //                     }

    //                     return false;
    //                 }

    //                 $('.boxCampo input, .boxCampo textarea').css('border', '1px solid #cccccc');
    //                 $('.box-form-msg').css('display', 'none');

    //                 if (varN == '') {
    //                     $('#fcNome').css('border', '1px solid #d00d0d');
    //                     $('#fcNome').before('<div class="box-form-msg">Preencha o campo Nome</div>');
    //                 } else if (varS == '') {
    //                     $('#fcSobrenome').css('border', '1px solid #d00d0d');
    //                     $('#fcSobrenome').before('<div class="box-form-msg">Preencha o campo Sobrenome</div>');
    //                 } else if (varE == '') {
    //                     $('#fcEmail').css('border', '1px solid #d00d0d');
    //                     $('#fcEmail').before('<div class="box-form-msg">Preencha o campo E-mail</div>');
    //                 } else if (varT == '') {
    //                     $('#fcTelefone').css('border', '1px solid #d00d0d');
    //                     $('#fcTelefone').before('<div class="box-form-msg">Preencha o campo Telefone</div>');
    //                 } else if (varM == '') {
    //                     $('#fcMsg').css('border', '1px solid #d00d0d');
    //                     $('#fcMsg').before('<div class="box-form-msg">Preencha o campo Mensagem</div>');
    //                 } else if (varE != '') {
    //                     validate();
    //                 }

    //                 function enviaDados() {
    //                     var datos = {};
    //                     datos.nome = varN;
    //                     datos.sobrenome = varS;
    //                     datos.email = varE;
    //                     datos.telefone = varT;
    //                     datos.mensagem = varM;
    //                     $.ajax({
    //                         accept: 'application/vnd.vtex.ds.v10+json',
    //                         contentType: 'application/json; charset=utf-8',
    //                         crossDomain: true,
    //                         data: JSON.stringify(datos),
    //                         type: 'POST',
    //                         url: '/api/dataentities/CX/documents',
    //                         success: function success(data) {
    //                             $(".institucional-content.col-sm-8 > p").css("visibility", "hidden");
    //                             $("#formRightFc h4").css("visibility", "hidden");
    //                             $("#formFC").html("<p id='msgSucesso'>Mensagem enviada com sucesso =)</p>");
    //                         },
    //                         error: function error(_error) {
    //                             console.log(_error);
    //                         }
    //                     });
    //                 }
    //             });
    //         },
    //         abreFechaModalFaleconosco: function(){
    //             // INSERE LINK NA PÁGINA
    //             $('.portal-notify-me-ref').append("<div class='button-consultora-wrapper'><a href='#'>Contate uma Consultora</a></div>");
    //             // ABRE MODAL
    //             $('.button-consultora-wrapper a').click(function(){
    //                 $('.form-consultora-overlay').css('display', 'flex');
    //             });
    //             $('span.close').click(function(){
    //                 $('.form-consultora-overlay').css('display','none');
    //             });
    //         },
    //         init: function(){
    //             consultora.faleConosco();
    //             consultora.abreFechaModalFaleconosco();
    //         }
    // }
    // consultora.init();