$('.luchaPage .alert').click(function(){
  activarPopUp();
  $('.alertBoxLu').css("z-index",888);
  $(this).siblings('.contentPopup').fadeIn('slow')
  $('.alertBoxLu .alert').css("background","#fff")
})

$('.closePopup3').click(function(){
  desactivarPopUp();
  $('.alertBoxLu').css("z-index",1);
  $('.contentPopup').fadeOut('slow');
  $('.alertBoxLu .alert').css("background","transparent")

})

function activarPopUp(){
  // $('html').addClass('popup');
  $('.popupLucha').fadeIn('slow');
}

function desactivarPopUp(){
  // $('html').removeClass('popup');
  $('.popupLucha').fadeOut('slow')
}

$('.clickOpc').click(function(){
  activarPopUp();
  $(this).css("z-index",888);
  $(this).siblings('.contentPopup').fadeIn('slow')
});

$('.closePopup').click(function(){
  desactivarPopUp();
  $('.clickOpc').css("z-index",1);
  $('.contentPopup').fadeOut('slow')
})

$('.closePopup2').click(function(){
  desactivarPopUp();
  $('.btnTime').css("z-index",1);
  $('.contentPopup').fadeOut('slow')
})



$('.btnTime').click(function(){
  // console.log(33)
  var $speed = $(this).data('speed');
  var $botella = $('.botella');
  var _this = $(this);
  TweenMax.to($botella, .5, {left:$speed+'%',ease: Power4.easeInOut, onComplete:function(){
    activarPopUp();
    _this.siblings('.contentPopup').fadeIn('slow')
    _this.css("z-index",888);
  }});

})



function animationBanner(){
  var $bannerH2 = $('.boxBanner > .boxTitle h2'),
      $bannerH1 = $('.boxBanner > .boxTitle h1'),
      $bannerImg = $('.boxBanner > .boxTitle img'),
      $carrusel = $('.boxBanner > .boxCarrusel'),
      $btnScroll = $('.scrollButtom'),
      $html = $('html'),
      $loading = $('.wrapperLoading2'),
      tlBannerHeader;

  // console.log($bannerH2)
  tlBannerHeader = new TimelineMax( {onComplete: finishAnimation()} );

  tlBannerHeader
    .set([$bannerH2, $bannerH1, $bannerImg, $carrusel, $btnScroll], {autoAlpha: 0})
    .fromTo($bannerH2, 0.5, {autoAlpha: 0, xPercent: '-20'}, {autoAlpha: 1, xPercent: '0', ease: Sine.easeOut}, '=1')
    .add('titleH2In')
    .fromTo($bannerH1, 0.5, {autoAlpha: 0, xPercent: '+20'}, {autoAlpha: 1, xPercent: '0', ease: Sine.easeOut}, 'titleH2In-=0.1')
    .add('titleH1In')
    .fromTo($bannerImg, 0.5, {autoAlpha: 0, yPercent: '+20'}, {autoAlpha: 1, yPercent: '0', ease: Sine.easeOut}, 'titleH1In+=0.35')
    .add('imageIn')
    .fromTo($carrusel, 0.5, {autoAlpha: 0}, {autoAlpha: 1, ease: Sine.easeOut}, 'imageIn+=0.3')
    .add('carruselIn')
    // .fromTo($btnScroll, 0.5, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1,ease: Sine.easeOut}, 'carruselIn+=0.3')
    .fromTo($btnScroll, 0.5, {autoAlpha: 0, yPercent: '-100'}, {autoAlpha: 1, yPercent: '0', ease: Sine.easeOut}, 'carruselIn+=0.3')
    .add('btnScrollIn')
    .to($html,0.5, {css:{'overflow-y' : 'auto' }}, 'btnScrollIn-=.5')
    .to($loading,0.5,{css:{'display' : 'none' }}, 'imageIn-=.5')
    ;
    // .to([$bannerH2, $bannerH1, $bannerImg], 0.4, {cssRule:{opacity: '0'}});
}

function finishAnimation(){
  console.log('hola mundo')
}
