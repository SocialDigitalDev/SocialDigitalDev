/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('../service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  var customScript = {
    
    carregaComponentes: function(){
      $('head').load('../components/head.html');
      $('header').load('../components/header.html');
      $('footer').load('../components/footer.html');
    },

    carregaCarrosseis: function(){
      $('.banner-desktop').slick({
        infinite: true, 
        autoplay: true, 
        slidesToShow: 1, 
        lazyLoad: 'ondemand', 
        slidesToScroll: 1
      });
      $('.banner-mobile').slick({
        infinite: true, 
        autoplay: true, 
        slidesToShow: 1,
        lazyLoad: 'ondemand',
        slidesToScroll: 1
      });
      if( $(window).width() < 1024 ){
        $('.carrossel-motos').slick({
          infinite: true, 
          autoplay: false, 
          centerMode: true, 
          draggable: false, 
          swipe: false, 
          swipeToSlide: false,
          lazyLoad: 'ondemand',  
          slidesToShow: 1, 
          slidesToScroll: 1
        });
      }else{
        $('.carrossel-motos').slick({
          infinite: true, 
          autoplay: false, 
          centerMode: true, 
          draggable: false, 
          swipe: false,
          lazyLoad: 'ondemand', 
          swipeToSlide: false,  
          slidesToShow: 3, 
          slidesToScroll: 1
        });
      }
    },

    diminuiHeader: function(){
      if($(window).width() > 768){
        window.onscroll = function() {scrollFunction()};
        function scrollFunction() {
          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            $('.logo a img').css('width','150px');
          } else {
            $('.logo a img').css('width','250px');
          }
        }
      }
    },

    progressBar: function(){
      $(document).ready(function(){
        function carregaBarra(){
          $('.tc-max .autonomia .progress-fill').css('width','80%');
          $('.tc-max .velocidade .progress-fill').css('width','95%');
          $('.tc-max .motor .progress-fill').css('width','70%');
          $('.tc-max .bateria .progress-fill').css('width','90%');
          $('.tc-max .peso .progress-fill').css('width','60%');
        }
        setTimeout(carregaBarra, 500);
      });
      $('.carrossel-motos .slick-arrow').click(function(){
        // TC-MAX
        if ($('.item-carrossel').hasClass('tc-max') && $('.tc-max').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.tc-max .autonomia .progress-fill').css('width','80%');
            $('.tc-max .velocidade .progress-fill').css('width','95%');
            $('.tc-max .motor .progress-fill').css('width','70%');
            $('.tc-max .bateria .progress-fill').css('width','90%');
            $('.tc-max .peso .progress-fill').css('width','60%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.tc-max .autonomia .progress-fill, .tc-max .velocidade .progress-fill, .tc-max .motor .progress-fill, .tc-max .bateria .progress-fill, .tc-max .peso .progress-fill').css('width','0%');
        }
        // TC
        if ($('.item-carrossel').hasClass('tc') && $('.tc').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.tc .autonomia .progress-fill').css('width','65%');
            $('.tc .velocidade .progress-fill').css('width','75%');
            $('.tc .motor .progress-fill').css('width','70%');
            $('.tc .bateria .progress-fill').css('width','80%');
            $('.tc .peso .progress-fill').css('width','40%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.tc .autonomia .progress-fill, .tc .velocidade .progress-fill, .tc .motor .progress-fill, .tc .bateria .progress-fill, .tc .peso .progress-fill').css('width','0%');
        }
        // TSX
        if ($('.item-carrossel').hasClass('tsx') && $('.tsx').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.tsx .autonomia .progress-fill').css('width','65%');
            $('.tsx .velocidade .progress-fill').css('width','75%');
            $('.tsx .motor .progress-fill').css('width','70%');
            $('.tsx .bateria .progress-fill').css('width','80%');
            $('.tsx .peso .progress-fill').css('width','40%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.tsx .autonomia .progress-fill, .tsx .velocidade .progress-fill, .tsx .motor .progress-fill, .tsx .bateria .progress-fill, .tsx .peso .progress-fill').css('width','0%');
        }
        // CUX-DUCATI
        if ($('.item-carrossel').hasClass('cux-ducati') && $('.cux-ducati').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.cux-ducati .autonomia .progress-fill').css('width','50%');
            $('.cux-ducati .velocidade .progress-fill').css('width','50%');
            $('.cux-ducati .motor .progress-fill').css('width','65%');
            $('.cux-ducati .bateria .progress-fill').css('width','80%');
            $('.cux-ducati .peso .progress-fill').css('width','30%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.cux-ducati .autonomia .progress-fill, .cux-ducati .velocidade .progress-fill, .cux-ducati .motor .progress-fill, .cux-ducati .bateria .progress-fill, .cux-ducati .peso .progress-fill').css('width','0%');
        }
        // CUX
        if ($('.item-carrossel').hasClass('cux') && $('.cux').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.cux .autonomia .progress-fill').css('width','50%');
            $('.cux .velocidade .progress-fill').css('width','50%');
            $('.cux .motor .progress-fill').css('width','65%');
            $('.cux .bateria .progress-fill').css('width','80%');
            $('.cux .peso .progress-fill').css('width','30%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.cux .autonomia .progress-fill, .cux .velocidade .progress-fill, .cux .motor .progress-fill, .cux .bateria .progress-fill, .cux .peso .progress-fill').css('width','0%');
        }
        // CU
        if ($('.item-carrossel').hasClass('cu') && $('.cu').parent().hasClass('slick-current') ) {
          function carregaBarra(){
            $('.cu .autonomia .progress-fill').css('width','40%');
            $('.cu .velocidade .progress-fill').css('width','40%');
            $('.cu .motor .progress-fill').css('width','35%');
            $('.cu .bateria .progress-fill').css('width','80%');
            $('.cu .peso .progress-fill').css('width','30%');
          }
          setTimeout(carregaBarra, 500);
        }else{
            $('.cu .autonomia .progress-fill, .cu .velocidade .progress-fill, .cu .motor .progress-fill, .cu .bateria .progress-fill, .cu .peso .progress-fill').css('width','0%');
        }
      });  
    },

    trocaTitle: function(){
      var url = window.location.pathname;
      function initTrocaTitle(){
        if (url === '/super-soco-tc/'){
          $('title').html('Super Soco TC | Super Soco Brasil')
        }
        if (url === '/super-soco-tc-max/'){
          $('title').html('Super Soco TC Max | Super Soco Brasil')
        }
        if (url === '/super-soco-cux-ducati/'){
          $('title').html('Super Soco CUX Ducati | Super Soco Brasil')
        }
        if (url === '/super-soco-cux/'){
          $('title').html('Super Soco CUX | Super Soco Brasil')
        }
        if (url === '/super-soco-cu/'){
          $('title').html('Super Soco CU | Super Soco Brasil')
        }
      }
      setTimeout(initTrocaTitle, 1000);
    },

    init: function(){
      customScript.carregaComponentes();
      customScript.carregaCarrosseis();
      customScript.diminuiHeader();
      customScript.progressBar();
      customScript.trocaTitle();
    }
  }
  customScript.init();
  function abreFecha(){
    $('.burger-menu span').click(function(){
      $('.menu-mobile-wrapper').slideToggle();
    });
    $('.menu-item').click(function(){
      $('.menu-mobile-wrapper').slideUp();
    });
  }
  setTimeout(abreFecha, 1000);
})();


