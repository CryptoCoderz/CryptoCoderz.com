jQuery(function($) {

	/* -- WINDOW WIDTH CHECK --*/

	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (coffee) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
	window.matchMedia||(window.matchMedia=function(){var b=(window.styleMedia||window.media);if(!b){var c=document.createElement("style"),a=document.getElementsByTagName("script")[0],d=null;c.type="text/css";c.id="matchmediajs-test";a.parentNode.insertBefore(c,a);d=("getComputedStyle" in window)&&window.getComputedStyle(c,null)||c.currentStyle;b={matchMedium:function(e){var f="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(c.styleSheet){c.styleSheet.cssText=f}else{c.textContent=f}return d.width==="1px"}}}return function(e){return{matches:b.matchMedium(e||"all"),media:e||"all"}}}());
	
	var media_queries = {
		tablet: window.matchMedia('(min-width:768px) and (max-width: 991px)'),
		mobile: window.matchMedia('(max-width:767px)')
	}

	function refreshMediaQueries() {
		media_queries.tablet = window.matchMedia('(min-width:768px) and (max-width: 991px)');
		media_queries.mobile = window.matchMedia('(max-width:767px)');
	}

	function isSmall() { return media_queries.mobile.matches; }
	function isMedium() { return media_queries.tablet.matches; }
	function isXLarge() { return (!media_queries.tablet.matches && !media_queries.mobile.matches); }

	jQuery(function($) {
		$(window).on('resize', refreshMediaQueries());
	});


	/* -- HEADER NAV MENU --*/

		/* -- header fixed/not fixed -- */
		if(isXLarge()) {
			if($('.header-main').hasClass('header-fixed') && !$('.header-main').hasClass('header-home') ){
				var header_height = $('.header-main').height();
				
				$('#main-content').css({"padding-top":header_height});
			}
		}
		
		if(isXLarge()) {
			if($('.header-main').hasClass('header-home')){
				
				$(window).scroll(function(){
					if($(document).scrollTop() !== 0){
						$('.header-main').removeClass('header-home',500);
					} else {
						$('.header-main').addClass('header-home',500);
					}
				});
		
			}
		} else {
			$('.header-main').removeClass('header-home');
		}
		

		/* -- nav drop down menu(s) -- */
		$('#nav-ul .menu-item-has-children').on('mouseenter', function() {
		
			if(isXLarge()) {
				$(this).find('> a').addClass('submenu-active');
				$(this).find('> .sub-menu').stop().fadeIn(250);
			}

		}).on('mouseleave', function() {
			if(isXLarge()) {
				$(this).find('> a').removeClass('submenu-active');
				$(this).find('> .sub-menu').hide();
			}
		});

		

	/* -- MOBILE/TABLET MENU -- */
		
		/* -- width of sidebar menu -- */
		function mob_nav_width(){
		
			if(isSmall()){
				var slide_amount = $('#header-nav').width();
			} else {
				var slide_amount = '275';
			}
			
			$('#header-nav').css({'right': -slide_amount});

			return(slide_amount);
			
		}
		
		
		/* -- width of page -- */
		function mob_nav_page_width(){
		
			if($('#header-nav').hasClass('menu-active')){
				$('.medium-header-container,#main-content,footer').css('transform', 'translate(-' + mob_nav_width() + 'px)');
			} else {
				$('.medium-header-container,#main-content,footer').css('transform', 'translate(0)');
			}
			
		}
		
		
		/* -- on page resize -- */
		if(!isXLarge()) {
			mob_nav_width();

			$(window).on('resize', function(){
				mob_nav_width();
				mob_nav_page_width();
			});
		}
		
		
		/* -- nav menu button click -- */
		$( '#mobile-nav-button' ).click(function(e) {
			e.preventDefault();
			
			if(!$('#mobile-nav-button').is( '.active' )){
				$('#mobile-nav-button').addClass('active');
			} else {
				$('#mobile-nav-button').removeClass('active');
			}
			
			$('#header-nav,#main-content,.medium-header-container,footer').toggleClass('menu-active');
			
			mob_nav_page_width();
			
		});
		
		
		/* -- mobile drop down menu(s) -- */
		$('.sub-drop-icon').on('click', function(e) {
		
			e.preventDefault();
		
			if(!isXLarge()) {
				if (!$(this).hasClass('sub-second-drop')){
					// first level drop down
					$(this).parents('.menu-item').find('> .sub-menu-first').slideToggle(250).toggleClass('opened');
				} else { 
					// second level drop down
					$(this).parents('.menu-item').find('> .sub-second-tier').slideToggle(250).toggleClass('opened');
				}
				
				$(this).toggleClass('fa fa-angle-down fa fa-angle-up');
			
			}

		});
		
		

	/* ONE PAGE TEMPLATE SECTION SCROLLING -- */
	
		var sections = $('#main-content section'), nav = $('nav');
		
		 /* -- scroll page sections -- */
		$(window).on('scroll', function () {
			var cur_pos = $(this).scrollTop();
			sections.each(function() {
			
				var top = $(this).offset().top - 62,bottom = top + $(this).outerHeight();
				
				if (cur_pos >= top && cur_pos <= bottom) {
				  nav.find('a').removeClass('active');
				  sections.removeClass('active');
				  $(this).addClass('active');
				  nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
				}
				
			});
			
		});
	
		
		/* -- nav item click -- */
		$('nav a,.home-slide-content a').on('click', function() {
			var $el = $(this), id = $el.attr('href');
			$('html, body').animate({
				scrollTop: $(id).offset().top - 62
			}, 500);
			return false;
		});
	
	

	/* -- HOME PAGE SLIDESHOW / BANNER -- */

		/* width & height of home page feature */
		function slideshowWidth(){
			$('.home-slideshow-outer,#home-slideshow,.home-slide').width( $( window ).width() ).height( $( window ).height());
		}

		if(isXLarge()) {
			slideshowWidth();
			$(window).on('resize', function(){
				slideshowWidth();
			});
		}
		
		/* home page feature slide down */
		$("#banner-slide-down").click(function() {
			$('html, body').animate({
				scrollTop: $('.about-section').offset().top - 62
			}, 1500);
		});

	
	
	/* -- SLIDESHOWS -- */

		/* -- home page slideshow -- */
		if($('#home-slideshow .home-slide').length > 1) {
			$('#home-slideshow').owlCarousel({
				autoplay:false,
				items: 1,
				margin: 0,
				navigation: true,
				loop: true,
			});
		}
		
		
		/* -- about us slideshow -- */
		if($('#about-slideshow .about-slide').length > 1) {
			$('#about-slideshow').owlCarousel({
				autoplay:false,
				items: 1,
				margin: 0,
				autoHeight : true,
				navigation: true,
				loop: true,
			});
		}
		
		if($('.team-section').length){
			// reveal team members
			$( '.view-team' ).on( "click", function() {
				$('.team-section').slideToggle( 'medium', function() {
					// scroll to team member section
					$('html,body').animate({
					   scrollTop: $('.team-section').offset().top - 50
					}, 1000);
				});
			});
		}

		
		/* -- testimonial slideshow -- */
		if($('#testimonial-slideshow .testimonial-slide').length > 1) {
			$('#testimonial-slideshow').owlCarousel({
				autoplay:false,
				items: 1,
				margin: 0,
				navigation: true,
				loop: true
			});
		}
		
		
		/* -- single portfolio slideshow -- */
		if($('#portfolio-slideshow .portfolio-slide').length > 1) {
			$('#portfolio-slideshow').owlCarousel({
				autoplay:false,
				items: 1,
				loop: true
			});
		}
		
		
		/* -- ALL SLIDESHOWS - CONTROLS -- */
		
		$('.previous-slide-btn').on('click', function() {
			$('#home-slideshow,#portfolio-slideshow').trigger('prev.owl.carousel');
		});

		$('.next-slide-btn').on('click', function() {
			$('#home-slideshow,#portfolio-slideshow').trigger('next.owl.carousel');
		});
		
		
		
	/* -- SCROLL TO TOP -- */

	$(window).scroll(function(){
		if($(document).scrollTop() > 50){
			$('#scroll-top').fadeIn(500);
		} else {
			$('#scroll-top').fadeOut(500);
		}
	});
	
	$('#scroll-top').on('click', function(e) {
		$('html,body').animate({ scrollTop: 0 }, 500);
		e.preventDefault();
	});
	
		
});



$(window).load(function() {

    "use strict";

	/* -- PORTOLIO FILTER -- */

	$('#portfolio-items').isotope({
        itemSelector: '.col-xlarge-4'
    });
	
	$(function() {
	
		var $container = $('#portfolio-items').isotope({
			itemSelector: '.portfolio-item'
		});
		
		// hash of functions that match data-filter values
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function() {
			var number = $(this).find('.number').text();
			return parseInt( number, 10 ) > 50;
			},
			// show if name ends with -ium
			ium: function() {
			var name = $(this).find('.name').text();
			return name.match( /ium$/ );
			}
		};

		// filter items on button click
		$('#portfolio-item-filter').on( 'click', 'a', function(e) {
			 e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			// use filter function if value matches
			filterValue = filterFns[ filterValue ] || filterValue;
			$container.isotope({ filter: filterValue });
		});
		
		// change active class on buttons
        $('#portfolio-item-filter').each(function(i, filterbutton) {
            var $filterbutton = $(filterbutton);
            $filterbutton.on('click', 'a', function() {
                $filterbutton.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
	
	});
	
	
	
	/* -- HORIZON PLUGIN -- */
	
	$('.horizon').horizon();
	
	
	
	/* -- SITE CONTENT LOADER -- */
	$('#loader-container').animate({opacity: "0"}, 1000, function() {
		$('#loader-container').hide();
	});
	
	
});

	/* -- CONTACT MAP SHOW/HIDE -- */

		$('.view-map-section').on('click', function() {
			
			if($('#contact-map-container').hasClass('opened')){
				$('#contact-map').hide();
			} else {
				$('#contact-map').show();
			}
			
			$('#contact-map-container').slideToggle(250).toggleClass('opened');

			/* Change coordinates below to your desired location */
			var lat_lng = '35.650532,-117.697965'.split(',');
		
			var mapOptions = {
				center: new google.maps.LatLng(lat_lng[0], lat_lng[1]),
				/* Level of zoom */
				zoom: 12,
				disableDefaultUI: true,
				scrollwheel: false,
				zoomControl: true,
				mapTypeControlOptions: {
				  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};
			
			var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat_lng[0], lat_lng[1]),
				clickable: false,
				map: map, 
				title: 'Lucid Themes',
				icon: {
					url: 'assets/img/map_pin.png',
					size: new google.maps.Size(27, 37)
				}
			});
			
		});
