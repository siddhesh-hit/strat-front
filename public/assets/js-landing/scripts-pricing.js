jQuery(document).ready(function($) {

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

  //Sticky Header
  var wrap = $(".header-top.sticky-top");
  var scrollTop = 0;


    $(window).scroll(function() {

        var scrollTop = $(this).scrollTop();

        if (scrollTop > 100) {
            wrap.removeClass("stick");

        } else {
            // wrap.addClass("stick");
        }

    });


});