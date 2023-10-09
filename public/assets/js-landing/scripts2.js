jQuery(document).ready(function($) {
  // if ($(".counter.number").length > 0) {
  //   $.get("https://www.doodly.net/api/videos_count", function(data) {
  //     var number = parseInt(data);
  //     $(".counter.number").html(number.toLocaleString());
  //   });
  // }


    $('.toggle-container .btn').on('click', function(){

      $('.toggle-container .btn').removeClass('active');
      $(this).addClass('active');
      if ( $(this).is('.btn-annual') ){
        $('.monthly-price').addClass('d-none');
        $('.annual-price').removeClass('d-none');
      }else{
          $('.monthly-price').removeClass('d-none');
          $('.annual-price').addClass('d-none');
      }

    });


  $(".step").click(function() {
    if ($(this).hasClass("active")) {
    } else {
      $(".active").removeClass("active");
      $(this).addClass("active");
    }
  });
  $(".question").addClass("closed");
  $(".question").click(function() {
    if (
      $(this)
        .children(".a")
        .is(":hidden")
    ) {
      $(this)
        .children(".a")
        .slideDown();
      $(this).removeClass("closed");
    } else {
      $(this)
        .children(".a")
        .slideUp();
      $(this).addClass("closed");
    }
  });
  $(".point").click(function() {
    if ($(this).hasClass("active")) {
    } else {
      $(".active").removeClass("active");
      $(this).addClass("active");
    }
  });
  $(".point.one").click(function() {
    $(".right img").removeClass("show");
    $(".right .one").addClass("show");
  });
  $(".point.two").click(function() {
    $(".right img").removeClass("show");
    $(".right .two").addClass("show");
  });
  $(".point.three").click(function() {
    $(".right img").removeClass("show");
    $(".right .three").addClass("show");
  });
  $(".point.four").click(function() {
    $(".right img").removeClass("show");
    $(".right .four").addClass("show");
  });

  // $('.steps').on("click", "*", (function (e) {
  // 	var step = e.target;

  // 	$(step).children(".features-image").addClass("show");

  // }));

  /* owl carousel */

  $(".owl-carousel-1").owlCarousel({
    items: 1,
    nav: true,
    navText: ["<img src='images/arrow.svg'>", "<img src='images/arrow.svg'>"],
    loop: true,
    dotsContainer: "#dots",
    autoplay: true,
    mouseDrag: false,
    animateOut: "fadeOut",
    autoplayTimeout: 6000
  });

  //  var owl1 = $('.owl-carousel-1');
  //  $('.owl-next, .owl-prev').on('click',function(){
  //     owl1.trigger('stop.owl.autoplay');
  //     console.log("clicked");
  // });
  //  $('.owl-prev').on('click',function(){
  //     owl1.trigger('stop.owl.autoplay');
  // })
  //  $('.owl-dot').on('click',function(){
  //     owl1.trigger('stop.owl.autoplay');
  // })
  var owl2 = $(".owl-carousel-2");
  owl2.owlCarousel({
    center: true,
    loop: true,
    video: true,
    nav: true,
    navText: ["<img src='images/arrow.svg'>", "<img src='images/arrow.svg'>"],

    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1
      },
      // breakpoint from 480 up
      480: {
        items: 1.2
      },
      // breakpoint from 768 up
      768: {
        items: 1.5
      },
      1024: {
        items: 2
      }
    }
  });

  // $(document).on('click', '.owl-item', function(){
  //           var n = $(this).index();
  //           console.log(n);
  //           $('.owl-stage').trigger('to.owl.carousel', n);
  //     });

  $(".owl-carousel-3").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dotsData: true,
    autoHeight: true,
    dotsContainer: "#dots-2",
    navText: ["<img src='images/arrow-b.svg'>", "<img src='images/arrow-b.svg'>"]
  });

  //Sticky Header
  var wrap = $(".header-top.sticky-top");
  var scrollTop = 0;

  // $(window).scroll(function() {
    //   var scrollTop = $(this).scrollTop();
    //
    //   if (scrollTop > 400) {
    //     wrap.addClass("stick");
    //     wrap.removeClass("normal");
    //     wrap.removeClass("toptop");
    //   } else if (wrap.hasClass("stick")) {
    //     wrap.removeClass("stick");
    //     wrap.addClass("normal");
    //   } else {
    //     setTimeout(function() {
    //       if (wrap.hasClass("normal")) {
    //         wrap.removeClass("normal");
    //         wrap.addClass("toptop");
    //       }
    //     }, 500);
    //   }
    // });
    $(window).scroll(function() {

        var scrollTop = $(this).scrollTop();

        if (scrollTop > 100) {
            wrap.removeClass("stick");

        } else {
            // wrap.addClass("stick");
        }

    });

  /* The mobile nav menu */

  $(".viewnav").click(function() {
    $(".viewnav").toggleClass("is-active");

    $(".mobile-panel").toggleClass("open");
    if ($(".mobile-sidebar").is(":visible")) {
      setTimeout(function() {
        $(".mobile-sidebar").addClass("hidden");
      }, 300);
      $(".mobile-sidebar").addClass("behind");
    } else {
      $(".mobile-sidebar").removeClass("hidden");
      setTimeout(function() {
        $(".mobile-sidebar").removeClass("behind");
      }, 300);
    }
  });

  /**** SLICK SLIDER ****/
  $(".text-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".img-slider",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $(".img-slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".text-slider",
    centerMode: true,
    centerPadding: 20,
    focusOnSelect: true,
    arrows: false,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          slidesToShow: 5
        }
      }
    ]
  });

  $(".topbanner")
    .delay(500)
    .slideDown();
  $(".topbanner").removeClass("hidden");

  $(document).on('click','.oto3 .vc-feature', function(){

    var vcActiveImage = $(this).attr('data-feature');

    $('.oto3 .vc-feature').removeClass('active');
    $(this).addClass('active');
    $('.oto3 .vc-img').removeClass('active');
    $(".oto3 [data-img="+vcActiveImage+"]").addClass('active');

  });

    $(document).on('click','.oto3 .lg-feature', function(){

        var vcActiveImage = $(this).attr('data-lgfeature');

        $('.oto3 .lg-feature').removeClass('active');
        $(this).addClass('active');
        $('.oto3 .lg-img').removeClass('active');
        $('.oto3 .img-pointer').removeClass('active');
        $(".oto3 [data-lgimg="+vcActiveImage+"]").addClass('active');
        $(".oto3 [data-pointer="+vcActiveImage+"]").addClass('active');

        updateHeight();

    });

    updateHeight();

    $(window).ready(updateHeight);
    $(window).resize(updateHeight);

    function updateHeight(){
        var lgImgHeight = $('.oto3 .lg-img.active').height();
        var vcImgHeight = $('.oto3 .vc-img.active').height();
        var ltsoHeight = $('.limited-time-so').height();

        $('.oto3 .lead-generation .center-images .relative').css('height', lgImgHeight);
        $('.oto3 .complete-video-control .center-images .relative').css('height', vcImgHeight);
        $('header.header-top.lt-special-offer--sticky-top').css('top', ltsoHeight);
    }

});

$(window).scroll(function() {
  var topHeight = $(".top").height();
  topHeight = topHeight + 200;
  if (topHeight > 600) {
    topHeight = 600;
  }

  var scroll = $(window).scrollTop();

  if (scroll >= topHeight) {
    $(".float-button").addClass("show");
    $(".float-button").removeClass("hide");
  } else {
    $(".float-button.show").addClass("hide");
    $(".float-button.show").removeClass("show");
  }
});
