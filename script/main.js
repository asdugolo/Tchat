
$(document).ready(function() {
  var extendButton = false;
  $('.link img').fadeOut(0);
  $('.link a').fadeOut(0);
  $('#extendButton').click(function(){
    extendButton = !extendButton;
    if(extendButton){
      $('.contactLayout').animate({height: 400}, 'easeInOutCubic');
      $('.link img').fadeIn(200);
      $('.link a').fadeIn(200);
    }
    else {
      $('.contactLayout').animate({height: 296}, 'easeInOutCubic');
      $('.link img').fadeOut(200);
      $('.link a').fadeOut(200);
    }
  });
});