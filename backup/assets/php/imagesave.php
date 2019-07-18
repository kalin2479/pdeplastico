<?php
date_default_timezone_set('America/Lima');
$jsondata = array();
if ((isset($_POST['imagen'])) && (!empty($_POST['imagen'])))
{
  $imagen = $_POST['imagen'];
  $img = str_replace('data:image/png;base64,', '', $imagen);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $jsondata['name'] = $data;
  $im = imagecreatefromstring($data);
  $jsondata['boolImg'] = false;
  $jsondata['nameImg'] = '';
  $nombreImg = '';
  if ($im !== false) {
    $newNameImg = time().'.jpg';
    // generateNewPost($newNameImg);
    imagejpeg($im, '../images/temporal/'.$newNameImg); //guardar a server
    imagedestroy($im); //liberar memoria
    // echo 'Todo salio bien tu imagen ha sido guardada';
    $jsondata['boolImg'] = true;
    $jsondata['nameImg'] = $newNameImg;
    $nombreImg = $newNameImg;


  }
}

//Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
header('Content-type: application/json; charset=utf-8');
// echo json_encode($jsondata,JSON_FORCE_OBJECT);
echo json_encode($nombreImg);
exit();

// Implementacion de funciones
function generateNewPost($nameImg){

  $newArchive = '../../share/'.$nameImg.'.html';
  $createHtml = fopen($newArchive,'w+');

  $content = "";

  $content.= '<!DOCTYPE html>';
  $content.= '<html lang="en">';
  $content.= '<head>';
  $content.= '<meta charset="UTF-8">';
  $content.= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  $content.= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
  $content.= '<title>Plastico Titulo del html</title>';
  // para que funcione en local
  // $content.= '<meta property="og:url"                content="http://pa-peru.com/digitas/plastico/share/'+$nameImg+'.html />';
  $content.= '<meta property="og:url"                content="http://pa-peru.com/digitas/plastico/share/"/>';
  $content.= '<meta property="og:type"               content="article" />';
  $content.= '<meta property="og:title"              content="Plastico" />';
  $content.= '<meta property="og:description"        content="Plastico descripcion" />';
  $content.= '<meta property="og:image"              content="http://pa-peru.com/digitas/plastico/assets/images/share/'.$nameImg.'.jpg" />';
  $content.= '<meta property="og:image:type" content="image/jpeg" />';
  $content.= '</head>';
  $content.= '<body>';
  $content.= '<img src="http://pa-peru.com/digitas/plastico/assets/images/share/'.$nameImg.'.jpg" alt="">';
  $content.= '<a href="index.html">Crear meme</a>';
  $content.= '</body>';
  $content.= '</html>';

  fwrite($createHtml, $content);
}
function getNameImg(){
  $fechaactual = getdate();
  return "plastico-".$fechaactual['mday']."-".$fechaactual['mon']."-".$fechaactual['year']."-".$fechaactual['hours']."-".$fechaactual['minutes']."-".$fechaactual['seconds'];
}

?>
