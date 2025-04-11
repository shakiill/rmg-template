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

    // Enhanced Hero Slider
    const heroCarousel = $('#heroCarousel');
    
    // Initialize carousel with improved options
    heroCarousel.carousel({
        interval: 6000,
        pause: 'hover',
        keyboard: true,
        touch: true,
        ride: 'carousel'
    });

    // Improved touch handling for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    heroCarousel.on('touchstart', function(e) {
        const touch = e.originalEvent.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });
    
    heroCarousel.on('touchmove', function(e) {
        if (e.originalEvent.touches.length > 1) {
            return; // Ignore multi-touch
        }
        e.preventDefault(); // Prevent page scroll while swiping carousel
    });
    
    heroCarousel.on('touchend', function(e) {
        const touch = e.originalEvent.changedTouches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
        
        handleSliderSwipe();
    });
    
    function handleSliderSwipe() {
        const minSwipeDistance = 50;
        const maxVerticalOffset = 30;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // Only handle horizontal swipes
        if (deltaY < maxVerticalOffset) {
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    heroCarousel.carousel('prev');
                } else {
                    heroCarousel.carousel('next');
                }
            }
        }
    }

    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.keyCode === 37) { // Left arrow
            heroCarousel.carousel('prev');
        }
        if (e.keyCode === 39) { // Right arrow
            heroCarousel.carousel('next');
        }
    });

    // Pause carousel on hover (optional)
    heroCarousel.hover(
        function() { $(this).carousel('pause'); },
        function() { $(this).carousel('cycle'); }
    );

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
    const handleVideoModal = () => {
        $('.video-play-btn').click(function (e) {
            e.preventDefault();
            const videoSrc = $(this).attr('href');
            if (videoSrc) {
                $('#videoFrame').attr('src', `${videoSrc}?autoplay=1&rel=0`);
            }
        });

        $('#videoModal').on('hidden.bs.modal', () => {
            $('#videoFrame').attr('src', '');
        });
    };

    // Contact Form Submission with validation
    const initContactForm = () => {
        const form = $('#contactForm');
        const submitBtn = form.find('button[type="submit"]');
        
        form.submit(function (e) {
            e.preventDefault();
            
            if (!form[0].checkValidity()) {
                form[0].reportValidity();
                return;
            }

            const formData = $(this).serialize();
            submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');

            // Simulate form submission - Replace with actual API call
            setTimeout(() => {
                form[0].reset();
                submitBtn.prop('disabled', false).html('Send Message');
                
                // Show success message with better UX
                const successMsg = $('<div>')
                    .addClass('alert alert-success mt-3')
                    .text('Thank you! Your message has been sent successfully.')
                    .hide();
                
                form.append(successMsg);
                successMsg.fadeIn().delay(3000).fadeOut(() => successMsg.remove());
            }, 1500);
        });
    };

    // Initialize Waypoints with optimization
    const initWaypoints = () => {
        const sections = $('.about-section, .certifications-section, .sustainability-section, .products-section, .testimonials-section');
        
        if (sections.length) {
            sections.waypoint({
                handler: function(direction) {
                    if (direction === 'down') {
                        $(this.element).addClass('animated fadeInUp');
                    }
                },
                offset: '80%',
                triggerOnce: true // Ensures animation only happens once
            });
        }
    };

    // Optimized Scroll Handler with debounce
    const initScrollHandler = () => {
        const scrollIcon = $('.scroll-icon');
        const aboutSection = $('#about');
        
        if (scrollIcon.length && aboutSection.length) {
            scrollIcon.click(() => {
                $('html, body').animate({
                    scrollTop: aboutSection.offset().top - 80
                }, 800, 'easeInOutCubic');
            });
        }
    };

    // Partner Logos Slider with error handling
    // const initPartnerLogos = () => {
    //     const partnerLogos = $('.partner-logos .row');
        
    //     if (partnerLogos.length && typeof $.fn.slick === 'function') {
    //         try {
    //             partnerLogos.slick({
    //                 infinite: true,
    //                 slidesToShow: 5,
    //                 slidesToScroll: 1,
    //                 autoplay: true,
    //                 autoplaySpeed: 2000,
    //                 arrows: false,
    //                 dots: true,
    //                 responsive: [
    //                     {
    //                         breakpoint: 992,
    //                         settings: { slidesToShow: 4 }
    //                     },
    //                     {
    //                         breakpoint: 768,
    //                         settings: { slidesToShow: 3 }
    //                     },
    //                     {
    //                         breakpoint: 576,
    //                         settings: { slidesToShow: 2 }
    //                     }
    //                 ]
    //             });
    //         } catch (error) {
    //             console.warn('Partner logos slider initialization failed:', error);
    //         }
    //     }
    // };

    // Initialize all components
    handleVideoModal();
    initContactForm();
    initWaypoints();
    initScrollHandler();
    // initPartnerLogos();

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