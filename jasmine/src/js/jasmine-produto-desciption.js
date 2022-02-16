$(function () {
    $('.panel-container').children().each(function(){
    	if($(this).contents().length === 0)
      	$('a[href="#' + $(this).attr('id') + '"]').hide();
    });
});