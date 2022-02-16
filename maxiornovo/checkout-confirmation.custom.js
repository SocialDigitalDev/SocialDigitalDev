(function(window, jQuery) {
    jQuery(function($) {
      
      $(window).on("load popstate", function() {
       
          $('.cconf-myorders-button').attr('href', '/account')
          
          var price = $(".pa3.black-80.f6.lh-copy .cf.w-100.mb4 .dib.fr.f6.fw5.mid-gray.w-50.tr span").text().replace("R$", "").trim("")
          
          console.log(price)
  
          window.naveggReady = window.naveggReady||[]; window.naveggReady.push(function(){
              try{ nvg36896.conversion(price) }catch(err){ }
          });
        
        
      }).on('orderPlaced', function(event){
        console.log(event);
      });
  
    });
    
  })(window, window.jQuery);