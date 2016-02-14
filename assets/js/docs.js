$(document).ready(function(){

    $('body').scrollspy({ target: '.docs-scrollspy' })

    $('.docs-affix').affix({
      offset: {
        top: 300,
        bottom: 200
      }
    })


  // Add smooth scrolling on all links inside the navbar
  $(".bs-docs-sidenav a").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 100, function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
});

// 숨겨진 gist meta 출력
$(".gist").each(function (index, value){
  $(this).dblclick(function(){
    $(this).addClass("active");
  });
  $("body").click(function(){
    $(".gist").removeClass("active");
  });
});

$('[data-toggle=modal]').on('click',function(){
  var title =  $(this).data('title');
  var modal =  '#' + $(this).data('target');
  $(modal).find('.modal-title').text(title);
});

$('#emulator').on('show.bs.modal', function () {
  $('.modal .modal-body').css('overflow-y', 'auto'); 
  $('.modal .modal-body').css('height', $(window).height() * 0.8);

  var button = $(event.relatedTarget) 
  var title = button.data('title');
  var src = button.data('src');
  var modal = $(this);
  modal.find('.modal-title').text(title);
  modal.find('iframe').attr('src',src)
});



$(document).ready(function(){
  $(".rb-btn-mobile").click(function(){
    $(".rb-full-overlay-main").removeClass( "tablet desktop" ).addClass( "mobile" );
  });
  $(".rb-btn-tablet").click(function(){
    $(".rb-full-overlay-main").removeClass( "mobile desktop" ).addClass( "tablet" );
  });
  $(".rb-btn-desktop").click(function(){
    $(".rb-full-overlay-main").removeClass( "mobile tablet" ).addClass( "desktop" );
  });
});
