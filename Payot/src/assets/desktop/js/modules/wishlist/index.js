const Methods = {
    init() {
      Methods.showItems();
    },
  
    showItems() {
        let y_skulist = localStorage.getItem(`y_SkuList`);
        
        if( y_skulist != null ) {
            y_skulist = y_skulist.split(`,`);
            const numWish = y_skulist.length;
            const shelfIDHeader = "b36bd6af-2098-4529-98e9-fcea88099f7f";

            let productIdLongString = y_skulist.filter(function(id) {
                return $.trim(id)
            }).map(function(id) {
                return "fq=productId:" + id
            }).join("&");

            $.ajax("/buscapagina?" + productIdLongString + "&PS=" + numWish + "&sl=" + shelfIDHeader + "&cc=100&sm=0&PageNumber=1", {
                async: !1
            }).done(function(data) {
                $(".j-wishlist__content").html(data);
            }).fail(function(err) {
                console.log(err);
            });
            
        } else {
            $(".j-wishlist__content").html(`<h4>Sua lista está vazia</h4>`);
        }
  
    }
};
  
export default {
    init: Methods.init
};