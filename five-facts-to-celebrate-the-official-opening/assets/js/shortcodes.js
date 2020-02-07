;(function($) {

    'use strict'

    var newsCube = function() {
        if ( $().cubeportfolio ) {
            $('.cbr-news-grid').each(function() {
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                item4 = $this.data("column4"),
                gapH = Number($this.data("gaph")),
                gapV = Number($this.data("gapv")),
                filter = $this.data("filter");

                if ( !filter ) { filter = '*'; }
                else { filter = '.' + filter; }

                $(this).find('#news-wrap').cubeportfolio({
                    filters: '#news-filter',
                    layoutMode: 'grid',
                    defaultFilter: filter,
                    animationType: 'quicksand',
                    gapHorizontal: gapH,
                    gapVertical: gapV,
                    showNavigation: true,
                    showPagination: true,
                    gridAdjustment: 'responsive',
                    rewindNav: false,
                    auto: false,
                    mediaQueries: [{
                        width: 1500,
                        cols: item
                    }, {
                        width: 1100,
                        cols: item
                    }, {
                        width: 800,
                        cols: item2
                    }, {
                        width: 550,
                        cols: item3
                    }, {
                        width: 320,
                        cols: item4
                    }],
                    caption: ' ',
                    displayType: 'bottomToTop',
                    displayTypeSpeed: 100
                });
            });
        }
    };

    var accordions = function() {
        var args = {easing:'easeOutExpo', duration:300};

        $('.accordion-item.active').find('.accordion-content').show();
        $('.accordion-heading').on('click', function () {
            if ( !$(this).parent().is('.active') ) {
                $(this).parent().toggleClass('active')
                    .children('.accordion-content').slideToggle(args)
                .parent().siblings('.active').removeClass('active')
                    .children('.accordion-content').slideToggle(args);
            } else {
                $(this).parent().toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });
    };

    var popupImages = function() {
        if ( $().magnificPopup ) {
            $('.cbr-gallery').each(function () {
                $(this).find('.zoom-popup').magnificPopup({
                    disableOn: 700,
                    type: 'image',
                    gallery:{
                        enabled: true
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true
                });
            });
        };
    };

    var spacer = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches )
                mode = 'smobile';

            $('.cbr-spacer').each(function(){
                if ( mode == 'desktop' ) {
                    $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                } else if ( mode == 'mobile' ) {
                    $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } else {
                    $(this).attr('style', 'height:' + $(this).data('smobi') + 'px')
                }
            })

        });
    };

    var gridBox = function() {
        $(".cbr-grid-box > div").wrap('<div class="grid-item">');
        var item = $(".cbr-grid-box > .grid-item");

        for(var i = 0; i < item.length; i+=3) {
            item.slice(i, i+3).wrapAll("<div class='grid-row clearfix'></div>");
        }
    };

    var contentBox = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            $('.cbr-content-box').each(function(){
                if ( mode == 'desktop' ) {
                    $(this).css({margin : $(this).data('margin')});
                    $(this).children('.inner').css({padding : $(this).data('padding')});
                } else if ( mode == 'mobile' ) {
                    $(this).css({margin : $(this).data('mobimargin')});
                    $(this).children('.inner').css({padding : $(this).data('mobipadding')});
                }
            })
        });
    };

    var counter = function(){
        function cbrInview(ele) {
            var window_top = $(window).scrollTop(),
                offset_top = $(ele).offset().top;
            if ( $(ele).length > 0 ) {
                if (    offset_top + $(ele).height() - 100 >= window_top &&
                        offset_top <= ( window_top + 0.85 * $(window).height() ) ) {
                        return true;
                } else {
                    return false;
                }
            }
        }

        function run_animations() {
            var did_scroll = false;
            $(window).on('scroll', function(){
                did_scroll = true;
            });
            setInterval(function () {
                if (did_scroll) {
                    did_scroll = false;

                    $('.cbr-counter').each(function() {
                        var $this = $(this);

                        if ( cbrInview($this) && !$this.data('complete') ) {
                            $this.data('complete',true);
                            var delay = parseInt($this.data('delay'));
                            setTimeout(function(){
                                $this.find('.number').countTo();
                            }, delay );
                        }
                    });
                }
            }, 200);
        }
        run_animations();
    };

    var progressBar = function() {
        if ( $().waypoint ) {
            $('.progress-bg').on('on-appear', function() {
                $(this).each(function() {
                    var percent = parseInt($(this).data('percent'));

                    $(this).find('.progress-animate').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");

                    $(this).parent('.cbr-progress').find('.perc').addClass('show').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");
                });
            });
        }
    };

    var animation = function() {
        $('.cbr-animation-block').each( function() {
            var el = $(this),
            animate = el.data('animate'),
            duration = el.data('duration'),
            delay = el.data('delay'),
            position = el.data('position');

            el.css({
                '-webkit-animation-delay':      delay,
                'animation-delay':              delay,
                '-webkit-animation-duration':   duration,
                'animation-duration':           duration
            });
        
            el.waypoint(function() {
                el.addClass('animated').addClass(animate);
                },{
                    triggerOnce: true,
                    offset: position
            });
        });
    };

    var popupVideo = function() {
        if ( $().magnificPopup ) {
            $('.popup-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: true
            });
        };
    };

    var inViewport =  function() {
        $('[data-inviewport="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };

    var tabs =  function() {
        $('.cbr-tabs').each(function(){
            var 
            list ="",
            title = $(this).find('.item-title').remove(),
            titleWrap = $(this).children('.tab-title') ;

            title.each(function() {
                list = list + "<li class= 'item-title'>" + $(this).html() + "</li>";
            });

            titleWrap.append(list);

            $(this).find('.tab-title li').filter(':first').addClass('active');
            $(this).find('.tab-content-wrap').children().hide().filter(':first').show();

            $(this).find('.tab-title li').on('click', function(e) {
                var
                idx = $(this).index(),
                content = $(this).closest('.cbr-tabs').find('.tab-content-wrap').children().eq(idx);

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn('slow').siblings().hide();

                e.preventDefault();
            });
        });
    };

    var countDown = function() {
        var style = function(data) {
         $(this.el).html(
            "<div class='column days'>" +
                "<div class='numb'>" + this.leadingZeros(data.days, 2) + "</div>" +
                "<div class='text'>Days</div>" +
            "</div>" +
            "<div class='column hours'>" +
                "<div class='numb'>" + this.leadingZeros(data.hours, 2) + "</div>" +
                "<div class='text'>Hours</div>" +
            "</div>" +
            "<div class='column mins'>" +
                "<div class='numb'>" + this.leadingZeros(data.min, 2) + "</div>" +
                "<div class='text'>Minutes</div>" +
            "</div>" +
            "<div class='column secs'>" +
                "<div class='numb'>" + this.leadingZeros(data.sec, 2) + "</div>" +
                "<div class='text'>Seconds</div>" +
            "</div>");
        }

        $('.cbr-countdown').each(function() {
            $(this).countdown({
                date: $(this).attr('data-date'),
                render: style
            });
        });
    };

    var parallax =  function() {
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        /*
         * Please note that background attachment fixed doesn't work on iOS
         */ 
        if (!iOS) {
            $('.parallax').css({backgroundAttachment:'fixed'});
        } else {
            $('.parallax').css({backgroundAttachment:'scroll'});
        }
    };

    var animateWOW =  function() {
        new WOW().init();
    };

    var googleMap = function() {
        if ( $().gmap3 ) {
            $('.cbr-gmap').each(function(){
                var
                $this = $(this),
                lat = $this.data('lat'),
                lng = $this.data('lng'),
                marker = $this.data('marker'),
                zoom = $this.data('zoom');

                var center = [lat, lng];
                $this
                .gmap3({
                    center: center,
                    zoom: zoom,
                    mapTypeId : google.maps.MapTypeId.ROADMAP
                })
                .marker({
                    position: center,
                    icon: marker
                });
            });
        }
    };

    var carouselBoxOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    dots : true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var newsOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-news').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    dots : true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var portfolioOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-project').each(function(){
                var
                $this = $(this),
                loop = $this.data("loop"),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    dots : true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var teamOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-team').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    dots : true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var partnerOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-partner').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    dots : true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var portfolioCube = function() {
        if ( $().cubeportfolio ) {
            $('.cbr-project-grid').each(function() {
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                item4 = $this.data("column4"),
                gapH = Number($this.data("gaph")),
                gapV = Number($this.data("gapv")),
                filter = $this.data("filter");

                if ( !filter ) { filter = '*'; }
                else { filter = '.' + filter; }

                $(this).find('#portfolio').cubeportfolio({
                    filters: '#project-filter',
                    layoutMode: 'grid',
                    defaultFilter: filter,
                    animationType: 'quicksand',
                    gapHorizontal: gapH,
                    gapVertical: gapV,
                    showNavigation: true,
                    showPagination: true,
                    gridAdjustment: 'responsive',
                    rewindNav: false,
                    auto: false,
                    mediaQueries: [{
                        width: 1500,
                        cols: item
                    }, {
                        width: 1100,
                        cols: item
                    }, {
                        width: 800,
                        cols: item2
                    }, {
                        width: 550,
                        cols: item3
                    }, {
                        width: 320,
                        cols: item4
                    }],
                    caption: 'overlayBottomAlong',
                    displayType: 'bottomToTop',
                    displayTypeSpeed: 200
                });
            });
        }
    };

    var galleryhover = function() {
        if ( $().hoverdir ) {
            $( '.gallery-box .hover-dir' ).each( function() {
                $(this).hoverdir();
            } );
        }
    };

    var testimonialsTabs = function() {
        $(".cbr-testimonials.style-1").each(function(){
            $(".cbr-testimonials.style-1 .item").filter(":first").show().addClass("active");
            $(".cbr-testimonials.style-1 .content-wrap .content").hide().filter(":first").show();

            $(".cbr-testimonials.style-1 .item").on("click", function(even){
                var
                idx = $(this).index(),
                content = $('.cbr-testimonials.style-1').find('.content-wrap').children().eq(idx);

                $(this).addClass('active').siblings().removeClass('active');
                content.fadeIn(1000).siblings().hide();
            });
        });
    };

    var beforeAfter = function() {
        if ($().twentytwenty){
            $(".before-after").each(function(){
                $(this).twentytwenty();
            });
        }
    };

    var ajaxContactForm =  function() {
        if ( $().validate ) {        
            $('.contact-form').each(function() {
                $(this).validate({
                    submitHandler: function( form ) {
                        var
                        $form = $(form),
                        str = $form.serialize();

                        $.ajax({
                            type: "POST",
                            url:  $form.attr('action'),
                            data: str,
                            beforeSend: function () {
                                $form.find('.cbr-alert').remove();
                            },
                            success: function( msg ) {
                                var result, cls;

                                if ( msg == 'Success' ) {
                                    result = 'Your message has been sent. Thank you!';
                                    cls = 'success';
                                } else {
                                    result = 'Error sending email.';
                                    cls = 'error';
                                }

                                $form.prepend(
                                    $('<div />', {
                                        'class': 'cbr-alert ' + cls,
                                        'text' : result
                                    }).append(
                                        $('<a class="remove" href="#"><i class="fa fa-close"></i></a>')
                                    )
                                );

                                $form.find(':input').not('.submit').val('');
                            }
                        });
                    }
                });
            });
        }
        $(document).on('click', '.cbr-alert .remove', function(e) {
            $(this).parent().slideUp();

            e.preventDefault();
        })
    };

    var galleryOwl = function() {
        if ( $().owlCarousel ) {
            $('.cbr-gallery').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        767:{
                            items:item2
                        },
                        1200:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var menuPopup = function() {
        $('.menu-bar i').on('click', function() {
            $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
        });
        $('.close-menu, .click-capture').on('click', function() {
            $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
            $('.menu-list ul').slideUp(300);
        });
        var dropToggle = $('.menu-list > li').has('ul').children('a');
        dropToggle.on('click', function() {
            dropToggle.not(this).closest('li').find('ul').slideUp(200);
            $(this).closest('li').children('ul').slideToggle(200);
            return false;
        });
        $('.js-target-scroll').on('click', function() {
            var target = $(this.hash);
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - navbar.outerHeight())
                }, 1000);
                return false;
            }
        });
    };

    var bxSlider = function() {
        $('.bxslider').bxSlider({
            captions: true,
            controls: true,
            pagerCustom:".nav2slider",
            adaptiveHeight: true,
            auto:true,
            pause:5000,
            preloadImages: 'visible',
        
            onSliderLoad: function(currentIndex) {     
              $('.slider-container').find('.bx-viewport').find('.bxslider').children().eq(currentIndex + 1).addClass('active-slide');
                $(".homeslide").animate({opacity: 1.0});
            },

            onSlideBefore: function($slideElement){
              $('.slider-container').find('.bx-viewport').find('.bxslider').children().removeClass('active-slide');
              $slideElement.addClass('active-slide');
            }
        });
    };
    
    var niceScroll = function() {
        if ($().niceScroll){
            $("body").each(function(){
                $(this).niceScroll();
            });
        }
    };

    var searchPopup = function() {
        $(document).on("click", ".search-button", function (event) {
        event.preventDefault();

        $(".header-search").addClass("open");
      });
      $(document).on("click", ".search-form_close , .search-close", function (event) {
        event.preventDefault();
        $(".header-search").removeClass("open");
      });
    };

    var heroCarousel =  function() {
        if ( $().slick ) {
            $('.dlr-hero-carousel').each(function(){
                var t = $(this).children("[data-hero-carousel]");
                var e = $(this).children("[data-carousel-nav]");

                t.slick({
                    dots: true,
                    fade: true,
                    speed: 500,
                    cssEase: "ease-in-out",
                    arrows: true,
                    infinite: true,
                    slidesToShow: 1,
                    centerMode: false,
                    autoplay: true,
                    autoplaySpeed: 5e3,
                    pauseOnDotsHover: false,
                    pauseOnHover: false,
                    customPaging: function(slider, i) {
                        var n = $(slider.$slides[i]).find("[data-nav-title]").data("nav-title");
                        return '\n<a class="hero-slide-nav-item" data-slide-nav-item>\n<span class="hero-nav-title">' + n + '<span class="hero-nav-progress" style="transition-duration: '+ (slider.options.autoplaySpeed + slider.options.speed) + 'ms;"></span></span>\n</a>\n'
                    },
                    appendDots: $(this).parent().find("[data-carousel-nav]")
                }, $(this).on("init", function(n) {
                    $(this).find("li").addClass("transition-active");
                    e.addClass("slide-count-" + e.find("li").length);
                    $(this).find(".slick-slide").addClass("transition-active");
                }));
            });

        }
    };

    var flexGallery = function() {
        $('.cbr-flex-gallery').each(function(){
            $(this).children('#gn-carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 120,
                itemMargin: 5,
                asNavFor: $(this).children('#flex-slider'),
                prevText: '<i class="fa fa-caret-left"></i>',
                nextText: '<i class="fa fa-caret-right"></i>'
            });
            $(this).children('#flex-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: $(this).children('#gn-carousel'),
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
        });
    };

    // Dom Ready
    $(function() {
        newsCube();
        accordions();
        popupImages();
        spacer();
        gridBox();
        contentBox();
        counter();
        progressBar();
        animation();
        popupVideo();
        inViewport();
        tabs();
        countDown();
        parallax();
        animateWOW();
        googleMap();
        portfolioCube();
        galleryhover();
        testimonialsTabs();
        beforeAfter();
        niceScroll();
        ajaxContactForm();
        menuPopup();
        bxSlider();
        searchPopup();
        heroCarousel();
        flexGallery();
        $( window ).load(function() {
            carouselBoxOwl();
            newsOwl();
            portfolioOwl();
            teamOwl();
            partnerOwl();
            galleryOwl();
        });
    });

})(jQuery);

