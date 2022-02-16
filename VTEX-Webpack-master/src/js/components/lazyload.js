var loadImages;

$(document).ready(function(){
	$.each($(".lazyload-vtex img"), function(){
		var imageVtexValue = $(this).attr('src');
		$(this).attr("data-url", imageVtexValue);
		$(this).attr('alt',"");
		$(this).attr('src',"");
	});

	setTimeout(function(){
		$(".vitrine-carousel .lazyload-vtex img").on("load", function(){
			$(this).addClass("loaded");
		});
	}, 500)

	$(".lazyload-vtex img").on("load", function(){
		$(this).addClass("loaded");
	});

	$(document).on("scroll",function(){
		loadImages();
	});

	(loadImages = function loadImages(){
		$.each($(".lazyload-vtex"), function(){
			var block = $(this);
			var imageVtex = block.find("img");

			if(isOnScreen(block)){
				var urlImg = imageVtex.data("url");

				if(imageVtex.attr("src") != urlImg){
					imageVtex.attr("src", urlImg);
				};
			}
		});
	})();
});

function isOnScreen(element){
	var win = $(window);

	var screenTop = win.scrollTop();
	var screenBottom = screenTop + win.height();

	var elementTop = element.offset().top;
	var elementBottom = elementTop + element.height();

	return elementBottom > screenTop && elementTop < screenBottom;
};