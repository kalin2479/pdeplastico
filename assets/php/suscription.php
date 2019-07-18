<?php
date_default_timezone_set('America/Lima');
$email = $_POST['email'];
$agree = $_POST['agree'];
$jsondata = array();
$jsondata['email'] = $email;
$jsondata['agree'] = $agree;
$jsondata['boolval'] = false;
if ((isset($_POST['email'])) && (!empty($_POST['email'])))
{
  $jsondata['boolval'] = true;
  // anadimos los suscriptores a una base de datos.
}

//Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
header('Content-type: application/json; charset=utf-8');
// echo json_encode($jsondata,JSON_FORCE_OBJECT);
echo json_encode($jsondata);
exit();


?>
