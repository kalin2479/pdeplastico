function initUpload(){
  var $uploadCrop;

  // var el = document.getElementById('containerUpload');
  // var $uploadCrop = new Croppie(el, {
  //     viewport: { width: 100, height: 100 },
  //     boundary: { width: 300, height: 300 },
  //     showZoomer: false,
  //     enableResize: true,
  //     enableOrientation: true,
  //     mouseWheelZoom: 'ctrl'
  // });
  //
  // $uploadCrop.bind({
  //   url: 'assets/images/1.jpeg',
  // });
  // //on button click
  // $uploadCrop.result('blob').then(function(blob) {
  //   // do something with cropped blob
  // });

  $uploadCrop = $('#containerUpload').croppie({
    viewport: {
        width: 235,
        height: 350
    },
    boundary: { width: 235, height: 350 }
  });
  $uploadCrop.croppie('bind', {
    url: 'assets/images/1.jpeg'
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
          console.log('jQuery bind complete');
        });

        // $uploadCrop.croppie('bind', {
        // url: e.target.result
        // }).then(function(){
        //   console.log('jQuery bind complete');
        // });
      }
      reader.readAsDataURL(input.files[0]);
    }
    else {
      swal("Sorry - you're browser doesn't support the FileReader API");
    }
  }

  $("#buttonSave").click(function(){
    $uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function(response){
      console.log(response);
      $.ajax({
        url : 'assets/php/imagesave.php',
        data : {
          imagen : response
        },
        type : 'POST',
        success : function (data){
          $('#newPost').val(data);
          console.log(data);
          $('#imgPaso1').attr('src', 'assets/images/temporal/'+data);
          // var respuesta = JSON.stringify(data);
          // console.log(respuesta.nameImg);
          $('.stepOne').fadeOut('slow', function(){
            $('.stepTwo').fadeIn('slow');
          });
        },
        error : function (){
          console.log("No se ha podido procesar la imagen");
        }
      })
    })
  });

}// fin



initUpload();





$(".buttonWord").click(function(){
  var action = $(this).data('action');
  console.log(action)
  var html = '';
  if (action == 'b1'){
    html+= '<p>';
    html+= 'CON # PdePlastico';
    html+= '</p>';
  }
  if (action == 'b2'){
    html+= '<p class="no">';
    html+= 'CON # PdePlastico';
    html+= '</p>';
  }
  $("#wrapperText").html(html);
});



$("#buttonPreview").click(function(){
  var elm = $("#ImagenUpload").get(0);
  var lebar = "235";
  var tinggi = "350";
  var type = "jpg";
  var filename = "imagenTest";
  html2canvas(elm).then(function(canvas){
    var canWidth = 235;
    var canHeight = 350;
    var img = Canvas2Image.convertToImage(canvas, canWidth, canHeight);
    $("#ImagenUpload").html(img);
    var nameImg = $(img).attr("src");
    console.log($(img).attr("src"))
    // Canvas2Image.saveAsImage(canvas, lebar, tinggi, type, filename);
    // Ajax
    $.ajax({
      url : 'assets/php/procesar.php',
      data : {
        imagen : nameImg
      },
      type : 'POST',
      success : function (data){
        $('#newPost').val(data);
        console.log(data);
        // var respuesta = JSON.stringify(data);
        // console.log(respuesta.nameImg);
      },
      error : function (){
        console.log("No se ha podido procesar la imagen");
      }
    })
  });

});


// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             $('#imgPaso1').attr('src', e.target.result);
//         }
//
//         reader.readAsDataURL(input.files[0]);
//     }
// }
//
// $("#imgInp").change(function(){
//     readURL(this);
//     return false;
// });

// compartir

function postStory(){
  event.preventDefault();
  event.stopImmediatePropagation();
  var urlShare = 'http://pa-peru.com/digitas/plastico/share/' + $('#newPost').val() + '.html';
  console.log(urlShare);
  var FBLink      = urlShare;
  // Dynamically gather and set the FB share data.
  // Estas acciones ya estan desfasadas
  // var FBDesc      = 'MI DESCRIPTION DE PLASTICO';
  // var FBTitle     = 'PLATICO';
  // var FBLink      = urlShare;
  // var FBPic       = 'http://pa-peru.com/digitas/plastico/assets/images/share/' + urlShare;
  // -- fin de desface
  // Open FB share popup
  FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: FBLink,
      })
  },
  function (response) {
    if (response && !response.error_message) {
    // then get post content
        alert('successfully posted. Status id : '+response.post_id);
    } else {
        alert('Something went error.');
    }
  });
  // FB.ui({
  //   method: 'feed',
  //   display: 'iframe',
  //   link: 'http://pa-peru.com/digitas/plastico/',
  //   caption: 'Mi caption',
  //   description: 'No plastico',
  //   picture: 'http://cdn.centrum.pucp.education/centrum/uploads/2019/05/13171251/banner-web-doctorado.jpg',
  //   message: 'kalin'
  // }, function(response){
  //   if (response && !response.error_message){
  //     console.log('link posteado' + response.post_id);
  //   }else{
  //     console.log('error ...' );
  //   }
  // });
  // return false;
}
