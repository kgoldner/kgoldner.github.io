$(function(){
//  renderMathInElement(document.body);
  $(window).scroll(updateScroll);
  $('.main-selected').before(
    $('<div class="main-sub-option"></div>')
  );
  $("a").click(function() {
    if(!$(this).attr('href').startsWith('#')) return;
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 60
    }, 500);
    return false;
  });
});

function updateScroll(){
   // Get container scroll position
   var fromTop = $(window).scrollTop()+140;
   var cur = $('h2').map(function() {
     if ($(this).offset().top < fromTop)
       return this;
   });
   if(cur.length>0) {
     var header = $(cur[cur.length-1]).text().split(" ");
     if(header) $('.main-sub-option').text(header[header.length-1]);
   } else {
     $('.main-sub-option').text('');
   }
}

