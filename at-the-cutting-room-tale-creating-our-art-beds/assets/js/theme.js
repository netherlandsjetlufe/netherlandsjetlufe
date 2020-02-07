// -----------------------------

//   js index
/* =================== */
/*  
    

    

*/
// -----------------------------


(function($) {
    "use strict";



    /*---------------------
    preloader
    --------------------- */

    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() { $(this).remove(); });
    });


    /*----------------------------
     SmartMenu Nav
    ------------------------------ */
    $('#interiorMenuV1').smartmenus({
        subMenusSubOffsetX: 6,
        subMenusSubOffsetY: -8
    });



    $(function () {
        var $mainMenuState = $('#interiorMenuV1-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function (e) {
                var $menu = $('#interiorMenuV1');
                if (this.checked) {
                    $menu.hide().slideDown(250, function () { $menu.css('display', ''); });
                } else {
                    $menu.show().slideUp(250, function () { $menu.css('display', ''); });
                }
            });
            // hide mobile menu beforeunload
            $(window).on('beforeunload unload', function () {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });
    

    /*-----------------
    sticky
    -----------------*/
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 85) {
            $('header').addClass('navbar-fixed-top');
        } else {
            $('header').removeClass('navbar-fixed-top');
        }
    });

    /*-----------------
    scroll-up
    -----------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>',
        easingType: 'linear',
        scrollSpeed: 1500,
        animation: 'fade'
    });

    /*------------------------------
         counter
    ------------------------------ */
    $('.counter-up').counterUp();


    /**================================ 
    Countdown 2
    ================================**/
    $('.countdown').countdown('2020/6/10', function(event) {
        $('#cday').html(event.strftime('%D <span id="clabel"><br>Days</span>'));
        $('#chour').html(event.strftime('%-H <span id="clabel"><br>Hours</span>'));
        $('#cminute').html(event.strftime('%M <span id="clabel"><br>Minutes</span>'));
        $('#csec').html(event.strftime('%S <span id="clabel"><br>Seconds</span>'));
        });

    /*---------------------
    smooth scroll
    --------------------- */
    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;

        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top - 80
        }, 1200);
    });


    /*---------------------
    countdown
    --------------------- */
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hour</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Sec</p></span>'));
        });
    });



    /*---------------------
    Shuffle JS
    --------------------- */
    // Portfolio Style 1 
    if ($('.shuffle-box').length > 0) {
        var Shuffle = window.Shuffle;
        var myShuffle = new Shuffle(document.querySelector('.shuffle-box'), {
        itemSelector: '.single-shuffle',
        sizer: '.my-sizer-element',
        buffer: 1,
        });

        $('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
        });
    }


    // Portfolio Style 2 
    if ($('.shuffle-box2').length > 0) {
        var Shuffle2 = window.Shuffle;
        var myShuffle2 = new Shuffle2(document.querySelector('.shuffle-box2'), {
        itemSelector: '.single-shuffle2',
        sizer: '.my-sizer-element3',
        buffer: 1,
        });

        $('input[name="shuffle-filter2"]').on('change', function (evt) {
        var input2 = evt.currentTarget;
        if (input2.checked) {
            myShuffle2.filter(input2.value);
        }
        });
    }

    // Portfolio Style 3 
    if ($('.shuffle-box3').length > 0) {
        var Shuffle3 = window.Shuffle;
        var myShuffle3 = new Shuffle3(document.querySelector('.shuffle-box3'), {
        itemSelector: '.single-shuffle3',
        sizer: '.my-sizer-element3',
        buffer: 1,
        });

        $('input[name="shuffle-filter3"]').on('change', function (evt) {
        var input3 = evt.currentTarget;
        if (input3.checked) {
            myShuffle3.filter(input3.value);
        }
        });
    }







    /*---------------------
    Isotop Portfolio Page 1
    --------------------- */
    
    // external js: isotope.pkgd.js


    // init Isotope
    if ($('.grid').length > 0) {
        $(document).on('load', function () {
            $('.grid').isotope({
                itemSelector: '.element-item',
                layoutMode: 'fitRows',
                getSortData: {
                    name: '.name',
                    symbol: '.symbol',
                    number: '.number parseInt',
                    category: '[data-category]',
                    weight: function (itemElem) {
                        var weight = $(itemElem).find('.weight').text();
                        return parseFloat(weight.replace(/[\(\)]/g, ''));
                    }
                }
            });

        });
    }
    //filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    // bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $('.grid').isotope({ filter: filterValue });
        $('#filters button').removeClass('is-checked');
        $(this).addClass('is-checked');
    });

    /*---------------------
    isotop -portfolio-2
    --------------------- */
    // init Isotope
    if ($('.grid-p2').length > 0) {
        $('.grid-p2').isotope({
            itemSelector: '.gridp2-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 1
            }
        });
        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $('.grid-p2').isotope({ filter: filterValue });
        });

    }
    /*---------------------
    Isotop portfolio 3
    --------------------- */
   // init Isotope
    if ($('.grid-p3').length > 0) {
        $('.grid-p3').isotope({
            itemSelector: '.gridp3-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 0
            }
        });


        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $('.grid-p3').isotope({ filter: filterValue });
        });

    }

    /*---------------------
    isotop -portfolio-4
    --------------------- */
    // init Isotope
    if ($('.grid-p4').length > 0) {
        $('.grid-p4').isotope({
            itemSelector: '.gridp4-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 0
            }
        });
        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $('.grid-p4').isotope({ filter: filterValue });
        });
    }
    

    

    /*---------------------
    owl carousel
    --------------------- */

    // Testimonial Carousel
    function testimonial_carousel() {
        var owl = $(".testimonial-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    testimonial_carousel();



    // Partner Carousel
    function partner_carousel() {
        var owl = $(".partner-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 3
                },
                760: {
                    items: 7
                }
            }
        });
    }
    partner_carousel();

    


    // Insta Carousel
    function ss_carousel() {
        var owl = $(".ss-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 3
                },
                760: {
                    items: 6
                }
            }
        });
    }
    ss_carousel();


    var dot = $('.ss-carousel .owl-dot');
    dot.each(function() {
        var index = $(this).index() + 1;
      if(index < 10){
        $(this).html('0').append(index);
      }else{
         $(this).html(index);
      }
    });

    // Client Says Carousel
    function clientSays_carousel() {
        var owl = $(".owl-client-says");
        owl.owlCarousel({
            loop: true,
            margin: 20,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    clientSays_carousel();
    var dot = $('.owl-client-says .owl-dot');
    dot.each(function() {
        var index = $(this).index() + 1;
      if(index < 10){
        $(this).html('0').append(index);
      }else{
         $(this).html(index);
      }
    });




    /*------blog-top-carousel end ---------*/
    function blog_top_carousel() {
        var owl = $(".blog-top");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            navigation: true,
            navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
            nav: false,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    blog_top_carousel();
    var dot = $('.blog-top .owl-dot');
    dot.each(function() {
        var index = $(this).index() + 1;
    if(index < 10){
        $(this).html('0').append(index);
    }else{
        $(this).html(index);
    }
    });
    /*------blog-top-carousel end ---------*/


     /*------blog-details-carousel start ---------*/

     function blog_details_carousel() {
        var owl = $(".blog-details");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            navigation: true,
            navText: ["<p>prv</p>", "<p>next</p>"],
            nav: false,
            items: 5,
            smartSpeed: 2000,
            dots: false,
            autoplay: false,
            autoplayTimeout: 4000,
            center: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 2
                }
            }
        });
    }
    blog_details_carousel();
    // var dot = $('.blog-details .owl-dot');
    // dot.each(function() {
    //     var index = $(this).index() + 1;
    //   if(index < 10){
    //     $(this).html('0').append(index);
    //   }else{
    //      $(this).html(index);
    //   }
    // });


    function hero4_carousel() {
        var owl = $(".hero4-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            responsiveClass: true,
            navigation: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    hero4_carousel();

    function project4_carousel() {
        var owl = $(".project-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 25,
            responsiveClass: true,
            navigation: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                760: {
                    items: 3
                }
            }
        });
    }
    project4_carousel();

    function project5_carousel() {
        var owl = $(".project5-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 25,
            responsiveClass: true,
            navigation: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                760: {
                    items: 5
                }
            }
        });
    }
    project5_carousel();
    
    function testimonial4_carousel() {
        var owl = $(".testimonial4-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 25,
            responsiveClass: true,
            navigation: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
            nav: true,
            items: 5,
            smartSpeed: 2000,
            dots: false,
            autoplay: false,
            autoplayTimeout: 4000,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                }
            }
        });
    }
    testimonial4_carousel();
    
    /*---------------------
    ## Skill Bar
    --------------------- */

    if ($(".profoSkill").length > 0) {
        $(".bar").each(function () {

            var $bar = $(this),
                $pct = $bar.find(".pct"),
                data = $bar.data("bar");

            setTimeout(function () {

                $bar
                    .animate({
                        "width": $pct.html()
                    }, data.speed || 2000, function () {

                        $pct.css({
                            "opacity": 1
                        });

                    });

            }, data.delay || 0);

        });
    }

        

    /*---- under-constraction----*/
    $(".ucpc-btn ").on('click',function(){
        $(".uca-form").addClass("ucaform-show");
    });



    /*---------------------
    // Ajax Contact Form
    --------------------- */

    
    $('.cf-msg').hide();
    $('form#cf button#submit').on('click', function() {
        
        var firstName  = $('#firstName').val();
        var lastName  = $('#lastName').val();
        var email = $('#email').val();
        var subjectName  = $('#subjectName').val();
        var msg = $('#msg').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
            alert('Please enter valid email');
            return false;
        }

        firstName = $.trim(firstName);
        lastName = $.trim(lastName);
        subjectName = $.trim(subjectName);
        email = $.trim(email);
        msg = $.trim(msg);

        if (firstName != '' && email != '' && msg != '') {
            var values = "firstName=" + firstName + "&lastName=" + lastName +"&subjectName=" + subjectName + "&email=" + email + " &msg=" + msg;
            $.ajax({
                type: "POST",
                url: "assets/php/mail.php",
                data: values,
                success: function() {
                    $('#firstName').val('');
                    $('#lastName').val('');
                    $('#subjectName').val('');
                    $('#email').val('');
                    $('#msg').val('');

                    $('.cf-msg').fadeIn().html('<div class="alert alert-success"><strong>Success!</strong> Email has been sent successfully.</div>');
                    setTimeout(function() {
                        $('.cf-msg').fadeOut('slow');
                    }, 4000);
                }
            });
        } else {
            $('.cf-msg').fadeIn().html('<div class="alert alert-danger"><strong>Warning!</strong> Please fillup the informations correctly.</div>')
        }
        return false;
    });

}(jQuery));
