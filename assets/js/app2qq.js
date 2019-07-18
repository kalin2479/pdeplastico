var ServerGlobal = "http://htmltoimg.io/";

function viewVideo(){
  $('.modal').addClass('is-active bounceIn');
  $('html').addClass('is-clipped');
}

function initUpload(){
  var $uploadCrop;
  var vstandart = window.matchMedia( "(min-width: 1088px)" );
  if (vstandart.matches) {
    $uploadCrop = $('#containerUpload').croppie({
      viewport: {
          width: 542,
          height: 681
      },
      boundary: { width: 542, height: 681 }
    });
  }else{
    $uploadCrop = $('#containerUpload').croppie({
      viewport: {
          width: 340,
          height: 500
      },
      boundary: { width: 340, height: 500 }
    });
  }

  $uploadCrop.croppie('bind', {
    url: 'assets/images/1-b.jpg'
  });
  //on button click
  $uploadCrop.croppie('result', 'html').then(function(html) {
    // html is div (overflow hidden)
    // with img positioned inside.
  });


  $('#upload').on('change', function () { readFile(this); });

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#containerUpload').addClass('ready');

        $uploadCrop.croppie('bind', {
          url: e.target.result
        }).then(function(){
          // console.log('jQuery bind complete');
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
    else {
      swal("Sorry - you're browser doesn't support the FileReader API");
    }
  }

  $("#buttonSave").click(function(){
    $('#photoInit').fadeOut('slow');
    $('.boxLoading').fadeIn('slow');

    // Inicio del ajax
    $uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function(response){
      // console.log(response);
      $.ajax({
        url : 'assets/php/imagesave.php',
        data : {
          imagen : response
        },
        type : 'POST',
        success : function (data){
          $('#newPost').val(data);
          $('#imgPaso1').attr('src', 'assets/images/temporal/'+data);
          $('.boxLoading').fadeOut('slow',function(){
            $('.containerShare').fadeIn('slow');
            $('.ulForm li').removeClass('deshabilitado');
            $('.ulForm li input[type="text"]').removeAttr('disabled');
            $('.ulForm li a').removeAttr('disabled');
          });
        },
        error : function (){
          console.log("No se ha podido procesar la imagen");
        }
      })
    });
    // fin del ajax
  });
}



(function(){

  $("#suscriptionUser").validate({
    rules: {
      email: {
        required: true,
        minlength: 4,
        email: true
      },
      agree: {
        required: true
      }
    },
    messages: {
      email: "Por favor ingresar un correo válido",
      agree: "Campo obligatorio"
    }
  });

  $("#suscriptionUser .btnSuscription").click(function(){
    $("#suscriptionUser .boxMsjeError").fadeOut('slow');
    $("#suscriptionUser .boxMsjeError .success").fadeOut('slow');
    $("#suscriptionUser .boxMsjeError .error").fadeOut('slow');
    if ($("#suscriptionUser").valid()) {
      var formData = new FormData($("#suscriptionUser")[0]);
      var _url = "assets/php/suscription.php";

      // Inicio Ajax
      $.ajax({
        url :  _url,
        data : formData,
        contentType:false,
        processData:false,
        cache:false,
        type : 'POST',
        success : function (data){
          console.log(data);
          $("#suscriptionUser .boxMsjeError").fadeIn('slow');

          $("#suscriptionUser .boxMsjeError .success").fadeIn('slow');

        },
        error : function (){
          console.log("No se ha podido procesar la imagen");
        }
      });
      // Fin Ajax


    }else{
      $("#suscriptionUser .boxMsjeError").fadeIn('slow');
      $("#suscriptionUser .boxMsjeError .error").fadeIn('slow');

    }
    return false;
  });




  $('.buttonCloseModal').click(function(){
    $('.modal').removeClass('is-active bounceOut');
    $('html').removeClass('is-clipped')
  })
  var j = setInterval(function(){
    TweenLite.to($( "html" ), 0.5, {scrollTo:0});
    clearInterval(j);
  }, 100);
  initUpload();

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {duration: "70%"}
  });
  // var counter = 0;
  // var c = 0;
  // var i = setInterval(function(){
  //   $('.wrapperLoading2 h2').html(c + ' %');
  //   counter++;
  //   c++;
  //   if (counter === 101){
  //     clearInterval(i);
  //     initSite();
  //   }
  // }, 74);

  $('.boxBottom').click(function(){
    var $page = $(this).data('page');
    controller.scrollTo('#'+$page);
  })
  function initSite(){
    // console.log('comenzo');
    // console.log(controller);
    // trigger scroll
    console.log(33)
    controller.scrollTo('#headerMain');
    // if supported by the browser we can even update the URL.
    // if (window.history && window.history.pushState) {
    //   history.pushState("", document.title, '#headerMain');
    // }
    // animationBanner();
  }


  $('.btnNavMain').click(function(){
    var id = "#"+$(this).data("nav");
    controller.scrollTo(id);
    if (window.history && window.history.pushState){
      history.pushState("",document.title,id)
    }
  });

  controller.scrollTo(function (newpos) {
		TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
	});
  var pinScene01 = new ScrollMagic.Scene({
    triggerElement: '#headerMain',
    triggerHook: 0,
    duration: '100%'
  })
  .setPin('#headerMain .pin-wrapper')
  .setClassToggle("#navHome", "active")
  // .addIndicators({name: "1 (duration: 0)"})
  .addTo(controller);

  var boxLogoN = $('.logoNav img.logoNormal')
  var boxLogoG = $('.logoNav img.logoGris')

  // function cambiarLogo(){
  //   console.log('cambio');
  //   boxLogo.attr("src","assets/images/logo-gris.png");
  // }

  var menuAnimation = new TimelineMax();
      menuAnimation
        .to(boxLogoN, .25, {opacity:0})
        .add('circule1In')
        .to(boxLogoG, .25, {opacity:1})

  // menuAnimation.eventCallback("onComplete", cambiarLogo);

  var pinScene02 = new  ScrollMagic.Scene({triggerElement: "#videoPage"})
                  .setClassToggle("#navVideo", "active")
                  // .addIndicators({name: "2 (duration: 0)"})
                  .addTo(controller);

  var pinScene03 = new  ScrollMagic.Scene({triggerElement: "#luchaPage"})
                  .setClassToggle("#navLucha", "active")
                  // .addIndicators({name: "3 (duration: 0)"})
                  .setTween(menuAnimation)
                  .addTo(controller);

  var pinScene04 = new  ScrollMagic.Scene({triggerElement: "#PhotoMeme"})
                  .setClassToggle("#navMeme", "active")
                  // .addIndicators({name: "4 (duration: 0)"})

                  .addTo(controller);



  $("#buttonPreview").click(function(){
    var elm = $("#ImagenUpload").get(0);
    var lebar = "235";
    var tinggi = "350";
    var type = "jpg";
    var filename = "imagenTest";
    html2canvas(elm).then(function(canvas){
      var canWidth = 541;
      var canHeight = 678;
      var vstandart = window.matchMedia( "(min-width: 1088px)" );
      if (vstandart.matches) {
        var canWidth = 541;
        var canHeight = 678;
      }else{
        var canWidth = 339;
        var canHeight = 500;
      }
      var img = Canvas2Image.convertToImage(canvas, canWidth, canHeight);
      $("#ImagenUpload").html(img);
      var nameImg = $(img).attr("src");

      $('#btnGenerador').fadeOut('slow');
      $('.boxLoading2').fadeIn('slow');

      // Inicio Ajax
      $.ajax({
        url : 'assets/php/procesar.php',
        data : {
          imagen : nameImg
        },
        type : 'POST',
        success : function (data){
          $('#newPost').val(data);
          $('.boxLoading2').fadeOut('slow',function(){
            $('.btnDescarga').fadeIn('slow');
          });
          $('#downloadImgLink').attr('href','assets/php/download.php?file='+data+'.jpg');
          top.location.href = 'assets/php/download.php?file='+data+'.jpg';

        },
        error : function (){
          console.log("No se ha podido procesar la imagen");
        }
      });
      // Fin Ajax
    });

  });
  $(".buttonWord").click(function(){
    var action = $(this).data('action');
    // console.log(action)
    var html = '';
    if (action == 'b1'){
      html+= '<p>';
      html+= 'CON #PdePlastico';
      html+= '</p>';
    }
    if (action == 'b2'){
      html+= '<p class="no">';
      html+= 'CON #PdePlastico';
      html+= '</p>';
    }
    $("#wrapperText").html(html);
  });
  $('.owl-carousel').owlCarousel({
    margin:0,
    loop:true,
    Width: '100%',
    items:1,
    nav: true,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplayHoverPause:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  });

  var uploadButton = document.querySelector('.browse-btn');
  var uploadButton1= document.querySelector('.browse-btn1');
  var fileInfo = document.querySelector('.file-info');
  var realInput = document.getElementById('upload');

  uploadButton.addEventListener('click', (e) => {
  realInput.click();
  $('.browse-btn1').fadeOut('slow');
  });

  uploadButton1.addEventListener('click', (e) => {
  realInput.click();
  $('.browse-btn1').fadeOut('slow');
  });

  realInput.addEventListener('change', () => {
  var name = realInput.value.split(/\\|\//).pop();
  var truncated = name.length > 20
  ? name.substr(name.length - 20)
  : name;

  fileInfo.innerHTML = truncated;
  });

}());
