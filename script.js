//mobile_menu

$(".cross").hide();
$(".menu_btn").click(function() {
	$(".inner_menu").slideToggle("slow", function() {
		$(".menu_btn").hide();
		$(".cross").show();
	});
});

$(".cross").click(function() {
	$(".inner_menu").slideToggle("slow", function() {
		$(".cross").hide();
		$(".menu_btn").show();
	});
});

//scroll
$(document).ready(function() {
 	$(".arrow").click(function() {
    var elementClick = $(this)
    var destination = $('.block_2').offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
    }, 800);
    return false;
  });
})


//popup
$(document).ready(function() { 
	$('section').click( function(event){
		event.preventDefault();
		$('.overlay').fadeIn(400, 
		 	function(){ 
				$('.modal_form') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '50%'}, 200); 
		});
	});
	
	$('.send_btn, .overlay').click( function(){ 
		$('.modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  
				function(){ 
					$(this).css('display', 'none'); 
					$('.overlay').fadeOut(400); 
				}
			);
	});
});
