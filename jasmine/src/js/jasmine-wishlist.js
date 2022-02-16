(() => {
    submenu()
    comprarBtn()
    showList()
    newList()
    newListForm()
    editText()
})()
  
function submenu() {
  
    $("body").on("click", ".onsub", function () {
      $(".menu-listas,.onsub").addClass("in")
    })
  
    $("body").on("click", ".onsub.in", function () {
      $(".menu-listas,.onsub").removeClass("in")
    })
  
}
  
function comprarBtn() {
    if ($(".no-product.message").length) {
      $(".giftlistinfo-actions").addClass("hidden")
    }
}
  
function showList(){
    $("body").on("click", ".glis-selected", function () {
        $(".glis-ul").addClass("show")
    });

    $("body").on("click", ".glis-selected", function () {
    $(".glis-selected").addClass("inactive")
    });
}
  
function newList() {
    $("body").on("click", ".glis-selected", function () {
        $(".glis-create").addClass("show")
    });
}
  
function newListForm(){
   $("body").on("click", ".glis-new-title", function () {
      $(".glis-create-form").addClass("show")
    });
}
  
    
function editText(){
      
    $('.gift-list-wished').html(function () {
      return $(this).html().replace(/desejados/g,'Desejados').replace(/desejado/g,'Desejado'); 
    });
    
}
  