const Methods = {
  init() {
    Methods.dropDown();
  },
  dropDown() {
    $('.j-footer__bottom--sitemap .js--sitemap-action').click(function () {
      $('.j-footer__bottom--sitemap-subitems').toggle();
    });
  },
};

export default {
  init: Methods.init,
};
