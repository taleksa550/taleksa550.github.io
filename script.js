$('.box').animate({
	width: '210px',
	height: '210px'
}, 'slow',
		function(){
			$('.content').append('<div class="circle"></div>', '<div class="circle"></div>', '<div class="circle"></div>', '<div class="circle"></div>')
				$('.circle').fadeIn();
				var rand = Math.ceil(Math.random());
				$('.circle').eq(rand).addClass('shape').attr( "selected", "selected");
				setTimeout(function(){
					$('.shape').css('background', '#f0f0f0')},2000);
				$('.circle').click(function(){
					if ($(this).attr('selected') == 'selected')
						$(this).addClass('selected');
					else
						$(this).addClass("wrong");
					if($('.wrong').length == 0){
					alert('Great');
				}
				$('.selected').click(function(){
					$('.box').animate({
						width: '320px',
						height: '210px'
					})
					$('.content').append('<div class="circle"></div>', '<div class="circle"></div>')
				})
				
					
		})

})

