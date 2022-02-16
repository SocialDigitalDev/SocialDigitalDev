function closest(element, classname) {
    for (; null != element.className || null != element.className;) return 0 <= element.className.split(" ").indexOf(classname) || element.parentNode && closest(element.parentNode, classname)
}
var lazyLoader = {
    options: {
        slick:!1,
        owl:!1,
        autoHeight:!1,
        autoWidth:!1,setMinHeight:"100px",setMinWidth:"100px",defaultOrientation:"vertical",elements:[],noscripts:[],container:null,canUseWindowDimensions:void 0!==window.innerHeight
    },
    isWithin: {
        top: function(elem) {
            return 0 <= elem.getBoundingClientRect().toppo
        },
        right: function(elem) {
            var containerWidth;
            return containerWidth = lazyLoader.options.container.clientWidth, containerLeft = lazyLoader.options.container.getBoundingClientRect().left, elem.getBoundingClientRect().right - containerLeft <= containerWidth - 0
        },
        bottom: function(elem) {
            var containerHeight;
            return containerHeight = document.documentElement.clientHeight, elem.getBoundingClientRect().bottom <= containerHeight - 0
        },
        left: function(elem) {
            return 0 <= elem.getBoundingClientRect().left
        }
    },
    setOptions: function(optObj) {
        var option = "";
        for (option in optObj) optObj.hasOwnProperty(option) && (lazyLoader.options[option] = optObj[option])
    },
    init: function(options) {
        lazyLoader.noscripts = document.getElementsByTagName("noscript"), console.log(options), options && lazyLoader.setOptions(options), window.addEventListener("scroll", lazyLoader.refresh, !1), window.addEventListener("click", lazyLoader.refresh, !1), lazyLoader.options.slick && (window.addEventListener ? window.addEventListener("load", lazyLoader.bindSlickEvents) : window.attachEvent("onload", lazyLoader.bindSlickEvents)), lazyLoader.options.owl && (window.addEventListener ? window.addEventListener("load", lazyLoader.bindOwlEvents) : window.attachEvent("onload", lazyLoader.bindOwlEvents)), lazyLoader.setLoader(), setTimeout(function() {
            lazyLoader.refresh()
        }, 2e3)
    },
    bindSlickEvents: function() {
        $(".slick-slider").on("afterChange", function(event, slick, currentSlide, nextSlide) {
            lazyLoader.refresh()
        }), $(".slick-slider").on("swipe", function(event, slick, direction) {
            console.log(direction), lazyLoader.refresh()
        })
    },
    elementIsVisible: function(el) {
        return "none" != window.getComputedStyle(el, null).display
    },
    refresh: function() {
        for (var elements = lazyLoader.options.elements, i = 0; i < elements.length; i++) lazyLoader.refreshElement(elements[i])
    },
    refreshElement: function(parentElement) {
        var noscripts = parentElement.getElementsByTagName("noscript"),
            elementInViewport = lazyLoader.elementInViewport,
            parentIsVisible = lazyLoader.elementIsVisible(parentElement);
        lazyLoader.options.container = parentElement;
        for (var i = 0; i < noscripts.length; i++) parentIsVisible && elementInViewport(noscripts[i]) && lazyLoader.loadImage(noscripts[i])
    },
    elementInViewport: function(noscript) {
        var element = noscript.parentNode;
        return lazyLoader.isWithin.top(element) && lazyLoader.isWithin.bottom(element) && lazyLoader.isWithin.left(element) && lazyLoader.isWithin.right(element)
    },
    setSizeByOrientation: function(this_noscript) {
        var this_height = this_noscript[1].split("ids")[1].split("/")[1].split("-")[2],
            this_width = this_noscript[1].split("ids")[1].split("/")[1].split("-")[1],
            main_size = this_height,
            secundary_size = this_width,
            main_sizeName = "Height",
            secundary_sizeName = "Width";
        "vertical" != (this_noscript.parentNode.getAttribute("data-orientation") ? this_noscript.parentNode.getAttribute("data-orientation") : lazyLoader.options.defaultOrientation) && (main_size = this_width, secundary_size = this_height, main_sizeName = "Width", secundary_sizeName = "Height"), lazyLoader.noscripts[i].parentNode.style["min" + main_sizeName] = main_size == secundary_size ? lazyLoader.noscripts[i].parentNode["client" + secundary_sizeName] + "px" : main_size / secundary_size * lazyLoader.noscripts[i].parentNode["client" + secundary_sizeName]
    },
    setLoader: function() {
        for (var this_noscript = "", i = 0; i < lazyLoader.noscripts.length; i++)
            if (null != lazyLoader.noscripts[i].innerHTML && "" != lazyLoader.noscripts[i].innerHTML && null !== (this_noscript = lazyLoader.noscripts[i].innerHTML.match(/src="(.*?)"/)) && this_noscript[1] && (lazyLoader.options.autoHeight ? lazyLoader.setSizeByOrientation(this_noscript[1]) : (lazyLoader.noscripts[i].parentNode.style.minHeight = lazyLoader.options.setMinHeight, lazyLoader.noscripts[i].parentNode.style.minWidth = lazyLoader.options.setMinWidth), lazyLoader.noscripts[i].parentNode.classList.add("image-wait"), 0 == lazyLoader.noscripts[i].parentNode.getElementsByClassName("loader").length && "hidden" != lazyLoader.noscripts[i].getAttribute("data-visible") && 1 == closest(lazyLoader.noscripts[i], "lazy"))) {
                var loader = document.createElement("div");
                loader.setAttribute("class", "loader"), loader.innerHTML = "Carregando...", lazyLoader.noscripts[i].parentNode.appendChild(loader)
            }
    },
    loadImage: function(noscript) {
        var this_noscript, img = "";
        if ("" == noscript.innerHTML || null == noscript.innerHTML) return !1;
        null !== (this_noscript = noscript.innerHTML.match(/src="(.*?)"/)) && this_noscript[1] && ((img = document.createElement("img")).src = this_noscript[1], setTimeout(function() {
            if (noscript.parentNode) {
                if (0 != noscript.parentNode.getElementsByClassName("loader").length) {
                    noscript.parentNode.classList.remove("image-wait");
                    var loader = noscript.parentNode.getElementsByClassName("loader")[0];
                    noscript.parentNode.removeChild(loader)
                }
                0 < noscript.parentNode.parentNode.className.length ? noscript.parentNode.parentNode.className += " loaded" : noscript.parentNode.parentNode.setAttribute("class", "loaded"), noscript.parentNode.appendChild(img), noscript.parentNode.removeChild(noscript)
            }
        }, 300))
    }
};
lazyLoader.init({
    setMinHeight: "126px",
    elements: document.getElementsByClassName("lazy"),
    slick: !0
}), console.log("INITIALIZING THE LAZY LOAD!"), $(document).ajaxStop(function() {
    lazyLoader.setLoader(), setTimeout(function() {
        lazyLoader.refresh()
    }, 300)
});