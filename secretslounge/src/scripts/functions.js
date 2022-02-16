import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

$(document).ready(() => {
  scrollMenu();
  bannerPrincipalHome();
  bannerCategoriesHome();

  if ($(document).width() <= 768) {
    buyforCategories();
  }
});

const scrollMenu = function () {
  $(window).scroll(function () {
    //if ($(document).width() <= 768) return;

    if ($(document).scrollTop() >= 35) {
      const headerHeight = $('header.header').height();
      if (typeof $(`.headerContainer .nav__bar.scroll`)[0] === `undefined`) {
        $(`.headerContainer`).addClass(`scroll`);
        $(`body`).css('padding-top', headerHeight);
        $(`.headerContainer .nav__bar`).addClass(`scroll`);
      }
    } else {
      if (typeof $(`.headerContainer .nav__bar.scroll`)[0] !== `undefined`) {
        $(`.headerContainer`).removeClass(`scroll`);
        $(`body`).css('padding-top', 0);
        $(`.headerContainer .nav__bar`).removeClass(`scroll`);
      }
    }
  });
};

const bannerCategoriesHome = function () {
  $(".main .best-categ .categ-items .box-banner").each(function () {
    $(this).append(
      "<div class='title'>" +
      $(this)
        .children()
        .children()
        .attr("alt") +
      "</div>"
    );
  });
};

const bannerPrincipalHome = function () {
  startCarousel(".banner-principal--desktop, .banner-principal--mobile", {
    loop: true,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
    },
  });
};

const buyforCategories = function () {
  startCarousel("#home-page .main .best-categ .categ-items", {
    loop: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 2,
        margin: 32,
        stagePadding: 50,
      },
    },
  });
};

const stopCarousel = function (selector) {
  var owl = $(selector);
  owl
    .trigger("destroy.owl.carousel")
    .addClass("off")
    .removeClass("owl-carousel");
};

const startCarousel = function (selector, config) {
  var owl = $(selector);
  owl
    .addClass("owl-carousel")
    .owlCarousel(config)
    .trigger("to.owl.carousel", 0);
};

// select institutional mobile
$(".about-options").each(function () {
  $(this),
    $(document.getElementsByClassName("select-about")).on("change", function () {
      window.location.href = $(this).val();
    });
  $(">li a", this).each(function () {
    $(document.createElement("option"))
      .appendTo(document.getElementsByClassName("select-about"))
      .val(this.href)
      .addClass("about-item")
      .html($(this).html());
  });
});

$(".help-options").each(function () {
  $(this),
    $(document.getElementsByClassName("select-help")).on("change", function () {
      window.location.href = $(this).val();
    });
  $(">li a", this).each(function () {
    $(document.createElement("option"))
      .appendTo(document.getElementsByClassName("select-help"))
      .val(this.href)
      .addClass("help-item")
      .html($(this).html());
  });
});
