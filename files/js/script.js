(function($)
{
	"use strict";
	
	
	//========================= preloader ================
	$(window).on('load', function() {
		preloader();
	})
	
	//JQuery for page scrolling feature - requires JQuery Easing plugin
	$(document).on('ready', function () {
		$('a.page-scroll').on('click', function(event) {
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top-81
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		 
		$('body').scrollspy({ 
			target: '.navbar-collapse',
			offset: 82
		}) 
		$(".navbar-nav li a").on('click', function(event) {
			$(".navbar-collapse").removeClass('in');
		});
		 
		//============= animation section ============  
		 if($('.wow').length){
			var wow = new WOW(
			  {
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       0,          // distance to the element when triggering the animation (default is 0)
				mobile:       true,       // trigger animations on mobile devices (default is true)
				live:         true       // act on asynchronously loaded content (default is true)
			  }
			);
			wow.init();
		}
		
		//============= Portfolio section ============ 
		
		$('.portfolio_items').mixitup({
			targetSelector: '.portfolio',
			transitionSpeed: 450
		});
		$('a.fancybox').fancybox();
		
		//=========================== Mobile Menu ===========
		menuToggler();
		
		$('.mobile-menu ul li a').on('click', function () {
			$('.mobile-menu').css({
				'right': '-150%'
			});
		})
		
		//============= Counter section ============ 
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});
		
		/*============================== Back to top =========================*/
		$(".back-top").hide();
		
		$('.back-top a').on('click', function(event) {
			$('body,html').animate({scrollTop:0},800);
			return false;
		});
		
		 
	});
	
	$(window).on('scroll', function() {
	
	//JQuery to collapse the navbar on scroll
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
		
	//============= Progressbar section ============
	
		$(".single_progressbar").each(function() {
			var base = $(this);
			var windowHeight = $(window).height();
			var itemPos = base.offset().top;
			var scrollpos = $(window).scrollTop() + windowHeight - 100;
			if (itemPos <= scrollpos) {
				var auptcoun = base.find(".progress-bar").attr("aria-valuenow");
				base.find(".progress-bar").css({
					"width": auptcoun + "%"
				});
				var str = base.find(".skill_per").text();
				var res = str.replace("%", "");
				if (res == 0) {
					$({
						countNumber: 0
					}).animate({
						countNumber: auptcoun
					}, {
						duration: 1500,
						easing: 'linear',
						step: function() {
							base.find(".skill_per").text(Math.ceil(this.countNumber) + "%");
						}
					});
				}
			}
		});	
		
	//=================== Back to top ===========================
		if($(this).scrollTop()>$('#banner').outerHeight()){
			$('.back-top').fadeIn();
		}
		else{
			$('.back-top').fadeOut();
		}
		
		
	});
	
	
	//============= Mobile Menu section ============ 
	function menuToggler() {
		if ($('.mobile-menu-closer').length) {
			$('.mobile-menu-closer').on('click', function () {
				$('.mobile-menu').css({
					'right': '-150%'
				});
			});
		};
		if ($('.mobile-menu-opener').length) {
			$('.mobile-menu-opener').on('click', function () {
				$('.mobile-menu').css({
					'right': '0%'
				});
			});
		};
	}
	
	//============= Preload ============ 
	function preloader(){
		$(".preloaderimg").fadeOut();
		$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			$(this).remove();
		});
	}
	
	
})(jQuery);	
	