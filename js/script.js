jQuery.fn.clickToggle = function(a,b) {
  	var ab = [b,a];
  	return this.on("click", function(){ ab[this._tog^=1].call(this); });
};

$('.hamburger').click(function(){
	$(this).toggleClass('hamburger--cross').find('.hamburger__item').toggleClass('hamburger__item--cross');
}).clickToggle(function() {
	$('.menu-wrapper').animate({
		right: '0'}, 1000)
}, function() {
     $('.menu-wrapper').animate({
		right: '-60%'}, 1000)
});

$(document).on('click', ".carousel-button-right",function(){ 
	var carusel = $(this).parents('.carousel');
	right_carusel(carusel);
	return false;
});
//Обработка клика на стрелку влево
$(document).on('click',".carousel-button-left",function(){ 
	var carusel = $(this).parents('.carousel');
	left_carusel(carusel);
	return false;
});
function left_carusel(carusel){
   var block_width = $(carusel).find('.carousel-block').outerWidth();
   $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items")); 
   $(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
   $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();    
   $(carusel).find(".carousel-items").animate({left: "0px"}, 200); 
   
}
function right_carusel(carusel){
   var block_width = $(carusel).find('.carousel-block').outerWidth();
   $(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 200, function(){
	  $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items")); 
      $(carusel).find(".carousel-items .carousel-block").eq(0).remove(); 
      $(carusel).find(".carousel-items").css({"left":"0px"}); 
   }); 
}

// Навели курсор на карусель
$(document).on('mouseenter', '.carousel', function(){$(this).addClass('hover')})
//Убрали курсор с карусели
$(document).on('mouseleave', '.carousel', function(){$(this).removeClass('hover')})


$.circleProgress = {

    defaults: {

        value: 0,

        size: 100,

        startAngle: -Math.PI,

        thickness: 'auto',

        fill: {
            gradient: ['#3aeabb', '#fdd250']
        },

        emptyFill: 'rgba(0, 0, 0, .1)',

        animation: {
            duration: 1200,
            easing: 'circleProgressEasing'
        }
    }
};

// Renamed ease-in-out-cubic
$.easing.circleProgressEasing = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
};

$.fn.circleProgress = function(options) {
    if (options == 'widget')
        return this.data('circle-progress');

    options = $.extend({}, $.circleProgress.defaults, options);

    return this.each(function() {
        var el = $(this),
            size = options.size,
            radius = size / 2,
            thickness = size / 14,
            value = options.value,
            startAngle = options.startAngle,
            emptyArcFill = options.emptyFill,
            arcFill;

        if ($.isNumeric(options.thickness))
            thickness = options.thickness;

        // Prepare canvas
        var canvas = el.data('circle-progress');

        if (!canvas) {
            canvas = $('<canvas>').prependTo(el)[0];
            el.data('circle-progress', canvas);
        }

        canvas.width = size;
        canvas.height = size;

        var ctx = canvas.getContext('2d');

        if (!options.fill)
            throw Error("The fill is not specified!");

        if (options.fill.color)
            arcFill = options.fill.color;

        if (options.fill.gradient) {
            var gr = options.fill.gradient;
            if (gr.length == 1) {
                arcFill = gr[0];
            } else if (gr.length > 1) {
                var lg = ctx.createLinearGradient(0, 0, size, 0);
                for (var i = 0; i < gr.length; i++)
                    lg.addColorStop(i / (gr.length - 1), gr[i]);
                arcFill = lg;
            }
        }

        if (options.fill.image) {
            var img = new Image();
            img.src = options.fill.image;
            img.onload = function() {
                var bg = $('<canvas>')[0];
                bg.width = size;
                bg.height = size;
                bg.getContext('2d').drawImage(img, 0, 0, size, size);
                arcFill = ctx.createPattern(bg, 'no-repeat');

                // we need to redraw static value
                if (!options.animation)
                    draw(value);
            }
        }

        if (options.animation)
            drawAnimated(value);
        else
            draw(value);

        function draw(v) {
            ctx.clearRect(0, 0, size, size);
            drawArc(v);
            drawEmptyArc(v);
        }

        function drawArc(v) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius, radius, radius - thickness / 2, startAngle, startAngle + Math.PI * 2 * v);
            ctx.lineWidth = thickness;
            ctx.strokeStyle = arcFill;
            ctx.stroke();
            ctx.restore();
        }

        function drawEmptyArc(v) {
            ctx.save();
            if (v < 1) {
                ctx.beginPath();
                if (v <= 0)
                    ctx.arc(radius, radius, radius - thickness / 2, 0, Math.PI * 2);
                else
                    ctx.arc(radius, radius, radius - thickness / 2, startAngle + Math.PI * 2 * v, startAngle);
                ctx.lineWidth = thickness;
                ctx.strokeStyle = emptyArcFill;
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawAnimated(v) {
            el.trigger('circle-animation-start');

            $(canvas).css({ progress: 0 }).animate({ progress: v },
                $.extend({}, options.animation, {
                    step: function(p) {
                        draw(p);
                        el.trigger('circle-animation-progress', [p / v, p]);
                    },

                    complete: function() {
                        el.trigger('circle-animation-end');
                    }
                })
            );
        }
    });
};

$(document).ready(function ($) {
    function animateElements() {
        $('.progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    startAngle: -Math.PI / 2,
                    value: percent / 100,
                    thickness: 12,
                    fill: {
                        color: '#00ffde'
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('div').text((stepValue*100).toFixed(1) + "%");
                }).stop();
            }
        });
    }
        // Show animated elements
    animateElements();
    $(window).scroll(animateElements);
});


var stop = $(".block_5").offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > stop ) {
            $(window).off("scroll");
            $('.count').each(function () {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.attr('data') }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    });

$(document).ready(function ($) {
var fActive = '';
 
function filterName(name){
 if(fActive != name){
 	$('span').filter('.'+name).show('slow');
 	$('span').filter(':not(.'+name+')').hide('slow');
 fActive = name;
 }
}
 
$('.lion').click(function(){ filterName('lion'); });
$('.beauty').click(function(){ filterName('beauty'); });
$('.mickey').click(function(){ filterName('mickey'); });
$('.rapunzel').click(function(){ filterName('rapunzel'); });
$('.peter').click(function(){ filterName('peter'); });
 
$('.all').click(function(){
 $('span').show(1000);
 fActive = 'all';
});
});

$('.toggle').click(function(e) {
  	e.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});


