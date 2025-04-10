$(document).ready(function () {
    // Preloader
    $(window).on('load', function () {
        $('.preloader').fadeOut('slow');
    });

    // Back to Top Button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });

    // Header Shrink on Scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('header-shrink');
        } else {
            $('.header').removeClass('header-shrink');
        }
    });

    // Smooth Scrolling for Navigation Links
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 80,
            },
            500,
            'linear'
        );
    });

    // Hero Slider
    $('#heroCarousel').carousel({
        interval: 6000,
        pause: false
    });

    // Counter Animation
    $('[data-counter]').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).data('counter')
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                if ($(this).data('counter') > 1000) {
                    $(this).text(Math.ceil(now) + '+');
                } else {
                    $(this).text(Math.ceil(now));
                }
            }
        });
    });

    // Certifications Slider
    $('.certifications-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // Testimonial Slider
    $('.testimonial-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });

    // Video Modal
    $('.video-play-btn').click(function () {
        var videoSrc = $(this).attr('href');
        $('#videoFrame').attr('src', videoSrc + '?autoplay=1&rel=0');
    });

    $('#videoModal').on('hidden.bs.modal', function () {
        $('#videoFrame').attr('src', '');
    });

    // Contact Form Submission
    $('#contactForm').submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var formData = form.serialize();
        var submitBtn = form.find('button[type="submit"]');

        submitBtn.prop('disabled', true).html('Sending...');

        // Simulate form submission
        setTimeout(function () {
            form[0].reset();
            submitBtn.prop('disabled', false).html('Send Message');
            alert('Thank you! Your message has been sent successfully.');
        }, 1500);
    });

    // Initialize Waypoints for Animation Triggers
    $('.about-section, .certifications-section, .sustainability-section, .products-section, .testimonials-section').waypoint(function () {
        $(this.element).addClass('animated fadeInUp');
    }, {
        offset: '80%'
    });
    // Partner Logos Slider
    // $('.partner-logos .row').slick({
    //     infinite: true,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     arrows: false,
    //     dots: true,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {slidesToShow: 4}
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {slidesToShow: 3}
    //         },
    //         {
    //             breakpoint: 576,
    //             settings: {slidesToShow: 2}
    //         }
    //     ]
    // });
     // Animate elements on scroll
     function animateOnScroll() {
        $('.fade-up').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() * 0.9) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);

    // Add parallax effect to hero section
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        $('.carousel-background').css({
            'transform': 'translateY(' + (scroll * 0.5) + 'px)'
        });
    });
});