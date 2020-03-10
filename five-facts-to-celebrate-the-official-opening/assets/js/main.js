;(function($) {
    'use strict'

    var cbrTheme = {

        // Main init function
        init : function() {
            this.config();
            this.events();
        },

        // Define vars for caching
        config : function() {
            this.config = {
                $window : $( window ),
                $document : $( document ),
            };
        },

        // Events
        events : function() {
            var self = this;

            // Run on document ready
            self.config.$document.on( 'ready', function() {

                // PreLoader
                self.scrollTarget();

                // PreLoader
                self.preLoader();

                // Cart Icon
                self.cartIcon();

                // Mobile Navigation
                self.mobileNav();

                // Search Icon
                self.searchIcon();

                // Retina Logos
                self.retinaLogo();

                // Featured Media
                self.featuredMedia();

                // Related Post
                self.relatedPost();

                // Header Fixed
                self.headerFixed();

                // Scroll to Top
                self.scrollToTop();

                // Blog Grid
                self.blogGrid();

                // Spacer
                self.widgetSpacer();

            } );

            // Run on Window Load
            self.config.$window.on( 'load', function() {

            } );
        },

        // ScrollTarget
        scrollTarget: function() {
            $('.scroll-target, .one-page #main-nav > ul > li > a').on('click',function() {
                var anchor = $(this).attr('href').split('#')[1];

                $(this).parent()
                    .addClass('current-menu-item')
                    .siblings()
                        .removeClass('current-menu-item');

                if ( anchor ) {
                    if ( $('#'+anchor).length > 0 ) {
                        var headerHeight = 40;

                        if ( $('body').hasClass('header-sticky') )
                            headerHeight = $('#site-header').height();

                        var target = $('#' + anchor).offset().top - headerHeight;

                        $('html,body').animate({scrollTop: target}, 1200, 'easeInOutExpo');
                   }
                }
                return false;
            })
        },

        // PreLoader
        preLoader: function() {
            if ( $().animsition ) {
                $('.animsition').animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-in',
                    inDuration: 1500,
                    outDuration: 800,
                    loading: true,
                    loadingParentElement: 'body',
                    loadingClass: 'animsition-loading',
                    timeout: false,
                    timeoutCountdown: 5000,
                    onLoadEvent: true,
                    browser: [
                        '-webkit-animation-duration',
                        '-moz-animation-duration',
                        'animation-duration'
                        ],
                    overlay: false,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function(url){ window.location.href = url; }
                });
            }
        },

        // Menu Cart Icon
        cartIcon: function() {
            $( document ).on( 'woocommerce-cart-changed', function( e, data ) {
                if ( parseInt(data.items_count,10) > 0 ) {
                    $('.shopping-cart-items-count')
                        .text( data.items_count )
                }
            } );
        },

        // Mobile Navigation
        mobileNav: function() {
            var menuType = 'desktop';

            $(window).on('load resize', function() {
                var mode = 'desktop';
                var wrapMenu = $('#site-header-inner .wrap-inner');
                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                    mode = 'mobile';

                if ( mode != menuType ) {
                    menuType = mode;

                    if ( mode == 'mobile' ) {
                        $('#main-nav').attr('id', 'main-nav-mobi')
                            .appendTo('#site-header')
                            .hide().children('.menu')
                                .find('li:has(ul)')
                                .children('ul')
                                    .removeAttr('style')
                                    .hide()
                                    .before('<span class="arrow"></span>');
                    } else {
                        if ( $('body').is('.header-style-5') )
                            wrapMenu = $('.append-nenu');
                        $('#main-nav-mobi').attr('id', 'main-nav')
                            .removeAttr('style')
                            .appendTo(wrapMenu)
                            .find('.sub-menu')
                                .removeAttr('style')
                            .prev().remove();
                                
                        $('.mobile-button').removeClass('active');
                    }
                }
            });

            $(document).on('click', '.mobile-button', function() {
                $(this).toggleClass('active');
                $('#main-nav-mobi').slideToggle();
            })

            $(document).on('click', '#main-nav-mobi .arrow', function() {
                $(this).toggleClass('active').next().slideToggle();
            })
        },

        // Search Icon
        searchIcon: function() {
            $('.header-search-icon').on('click', function() {
                var searchForm = $(this).parent().find('.header-search-form'),
                    searchField = $(this).parent().find('.header-search-field'),
                    searchIcon = $(this).parent().find('.search-icon');

                searchForm.stop().fadeToggle(function () {
                    searchField.focus();
                });

                searchIcon.toggleClass( "nz-magnifier3 nz-close-button1" );

                return false;
            });
        },

        // Retina Logos
        retinaLogo: function() {
            var retina = window.devicePixelRatio > 1 ? true : false;
            var $logo = $('#site-logo img');
            var $logo_retina = $logo.data('retina');

            if ( retina && $logo_retina ) {
                $logo.attr({
                    src: $logo.data('retina'),
                    width: $logo.data('width'),
                    height: $logo.data('height')
                });
            }
        },

        // Featured Media
        featuredMedia: function() {
            if ( $().slick ) {
                $('.blog-gallery').slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    fade: true,
                    cssEase: 'linear'
                });
            }
        },

        // Related Post
        relatedPost: function() {
            if ( $().slick ) {
                $('.post-related').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                    ]
                });
            }
        },

        // Header Fixed
        headerFixed: function() {
            if ( $('body').hasClass('header-fixed') ) {
                var nav = $('#site-header');
                if ( nav.length ) {
                    var offsetTop = nav.offset().top,
                        headerHeight = nav.height(),
                        injectSpace = $('<div />', {
                            height: headerHeight
                        }).insertAfter(nav);

                    $(window).on('load scroll', function(){
                        if ( $(window).scrollTop() > offsetTop ) {
                            nav.addClass('is-fixed');
                            injectSpace.show();
                        } else {
                            nav.removeClass('is-fixed');
                            injectSpace.hide();
                        }

                        if ( $(window).scrollTop() > 400 ) { 
                            nav.addClass('is-small');
                        } else {
                            nav.removeClass('is-small');
                        }
                    })
                }
            }     
        },

        // Scroll to Top
        scrollToTop: function() {
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 800 ) {
                    $('#scroll-top').addClass('show');
                } else {
                    $('#scroll-top').removeClass('show');
                }
            });

            $('#scroll-top').on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
            });
        },

        blogGrid: function() {
            if ( $().masonry ) {
                $('.blog-grid').masonry({
                    itemSelector: '.hentry',
                });
            }
        },

        // Widget Spacer
        widgetSpacer: function() {
            $(window).on('load resize', function() {
                var mode = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                    mode = 'mobile';

                $('.spacer').each(function(){
                    if ( mode == 'mobile' ) {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                    } else {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                })
            });
        },

    }; // end cbrTheme

    // Start things up
    cbrTheme.init();

})(jQuery);