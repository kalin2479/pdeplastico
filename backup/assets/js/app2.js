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
  var elm = $("#containerScreen").get(0);
  var lebar = "250";
  var tinggi = "350";
  var type = "png";
  var filename = "test";
  html2canvas(elm).then(function(canvas){
    var canWidth = 250;
    var canHeight = 350;
    var img = Canvas2Image.convertToImage(canvas, canWidth, canHeight);
    $("#containerScreen").html(img);
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


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPaso1').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
    return false;
});



// Compartir en facebook

function submitAndShare()
{
	// get the selected answer
	var playerName = 'George L.';
	var val = '';
	var form = document.getElementById('star_trek_quiz');
	var answers = form.elements['answer'];

	for(var i=0; i<answers.length; i++)
	{
		if(answers[i].checked)
		{
			val = answers[i].value;
			break;
		}
	}

	var title = '';
	var description = '';
	var image = '';
	switch(val)
	{
		case 'Tiberius':
				title = playerName + ' is wise like Yoda!';
				description = 'Congratulations! ' + playerName + ' is the champion of the StarTrek geekhood - and nobody can beat him. Or ... ? Click to play and prove to the ' + playerName + ' that you are as good as  him!';
				image = 'http://drib.tech/fbsharetest/quiz_yoda.jpg';
			break;
		default:
				title = playerName + ' is wise like Jar Jar Binks!';
				description = playerName + 'is the champion of the StarTrek geekhood - NOT! Click to play and prove to the ' + playerName + ' that anybody is better then him!';
				image = 'http://drib.tech/fbsharetest/quiz_jar_jar_binks.jpg';
			break;
	}


	// and finally share it

	shareOverrideOGMeta(window.location.href,
						title,
						description,
						image);

	return false;
}

function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage)
{
	FB.ui({
		method: 'share_open_graph',
		action_type: 'og.likes',
		action_properties: JSON.stringify({
			object: {
				'og:url': overrideLink,
				'og:title': overrideTitle,
				'og:description': overrideDescription,
				'og:image': overrideImage
			}
		})
	},
	function (response) {
	// Action after response
	});
}

function shareOriginal()
{
	FB.ui({
		method: 'share',
		href: window.location.href
	},
	function (response) {
	// Action after response
	});

	return false;
}

function postStory(){
  event.preventDefault();
  event.stopImmediatePropagation();

      // Dynamically gather and set the FB share data.
      var FBDesc      = 'MI DESCRIPTION DE PLASTICO';
      var FBTitle     = 'PLATICO';
      var FBLink      = 'http://pa-peru.com/digitas/plastico/';
      var FBPic       = 'http://drib.tech/fbsharetest/quiz_jar_jar_binks.jpg';

      // Open FB share popup
      FB.ui({
          method: 'share_open_graph',
          action_type: 'og.shares',
          action_properties: JSON.stringify({
              object: {
                  'og:url': FBLink,
                  'og:title': FBTitle,
                  'og:description': FBDesc,
                  'og:image': FBPic
              }
          })
      },
      function (response) {
        if (response && !response.error_message) {
        // then get post content
            alert('successfully posted. Status id : '+response.post_id);
        } else {
            alert('Something went error.');
        }
      })
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
