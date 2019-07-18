<?php
  $photoShare = '';
  if ((isset($_GET['foto'])) && (!empty($_GET['foto']))){
    $photoShare = "http://pa-peru.com/digitas/plastico/assets/images/share/".$_GET['foto'];
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- <meta property="fb:admins"             content="442214849686502"/> -->
  <meta property="og:url"                content="http://pa-peru.com/digitas/plastico/" />
  <meta property="og:type"               content="article" />
  <meta property="og:title"              content="Plastico" />
  <meta property="og:description"        content="Plastico descripcion" />
  <meta property="og:image"              content="<?php echo $photoShare;?>" />
  <meta property="og:image:type" content="image/jpeg" />
  <!-- <meta property="og:image:width" content="250" />
  <meta property="og:image:height" content="350" /> -->
  <title>Html to Imagen</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <script>
    window.fbAsyncInit = function() {
  	FB.init({
  	  appId            : '442214849686502',
  	  autoLogAppEvents : true,
  	  xfbml            : true,
  	  version          : 'v2.10'
  	});
  	FB.AppEvents.logPageView();
    };

    (function(d, s, id){
  	 var js, fjs = d.getElementsByTagName(s)[0];
  	 if (d.getElementById(id)) {return;}
  	 js = d.createElement(s); js.id = id;
  	 js.src = "//connect.facebook.net/en_US/sdk.js";
  	 fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  </script>
</head>
<body>
  <div class="container">
    <div class="containerProcess" id="app">
      <div class="containerTitle">
        <h2>AUN SOMOS ESCLAVOS DEL PLASTICO </h2>
        <h3>LIBERATE COMPARTIENDO<br>UN MEME DE PROTESTA</h3>
      </div>
      <div id="containerPastic">
        <div class="containerShare">
          <div class="containerImg" id="containerScreen">
            <p class="title">{{ message }}</p>
            <img src="assets/images/1.jpeg" alt="" id="imgPaso1"/>
            <div class="wrapperText" id="wrapperText">
              <!-- <p class="no">
                CON # PdePlastico
              </p> -->
            </div>
          </div>
          <div class="containerPaso paso1">
            <div class="row">
              <label class="fileContainer">
                <div class="btnFile">
                  SUBIR IMAGEN
                </div>
                <input type="file" name="" id="imgInp" >
              </label>
            </div>
            <div class="row containerText">
              <input type="text" name="" v-model="message" placeholder="Escribe aqui" >
            </div>
            <div class="row rowWord containerText">
              <a href="javascript:void(0)" class="buttonWord" data-action="b1">
                <img src="assets/images/b1.jpg" alt="">
              </a>
              <a href="javascript:void(0)" class="buttonWord" data-action="b2">
                <img src="assets/images/b2.jpg" alt="">
              </a>
            </div>

            <div class="row">
              <a href="javascript:void(0)" class="buttonPreview" id="buttonPreview">
                <span>Previsualizar</span>
              </a>
              <input type="text" name="imgPost" id="imgPost">
            </div>
          </div>
          <div class="containerPaso paso2">
            <a href="javascript:void(0)" onclick="return postStory();" >Compartir en facebook</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
  <script src="node_modules/jquery/dist/jquery.min.js" ></script>
  <script src="node_modules/html2canvas/dist/html2canvas.min.js" ></script>
  <script src="node_modules/canvas2image/canvas2image.js" ></script>
  <script src="https://unpkg.com/vue@1.0.28/dist/vue.min.js"></script>
  <script src="assets/js/app.js" ></script>
  <script src="assets/js/vuejs.js" ></script>

</body>
</html>
