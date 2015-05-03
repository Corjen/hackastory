
var overlayOpen = false;
var overlay = {};
overlay.overlayContainer = $('.overlay');

// Open
overlay.open = function(id){


  this.overlayContainer.fadeIn(500);
  var target = $(id);

  overlayOpen = true;

  $('.modal').hide();

  if(target !== undefined) {
    overlay.overlayContainer.fadeIn(500);
    target.fadeIn();

    var video = target.children('video');

    if(video.length){
      video[0].play();
    }

  }

};

// Close
overlay.close = function(){
  overlay.overlayContainer.fadeOut(500);

  overlayOpen = false;

  $('.modal').fadeOut();

  $('video')[0].pause();
};


$('.js-close-overlay').click(overlay.close);

$(window).keypress(function(event){

  if(event.which === 27) {
    overlay.close();
  }
});

overlay.overlayContainer.click(function(event){
  if(event.target === this) {
    overlay.close();
  }
});


$('.js-switch-view').click(function(){
    // Switch camera position
    cameraPosition.x = -110;
    cameraPosition.y = 35;
    cameraPosition.z = -300;
});


overlay.open('#intro');