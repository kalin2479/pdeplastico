<?php
date_default_timezone_set('America/Lima');
$email = $_POST['email'];
$agree = $_POST['agree'];
if ($agree)
  $agreeSql = 1;
else
  $agreeSql = 0;

$jsondata = array();
$jsondata['email'] = $email;
$jsondata['agree'] = $agree;
$jsondata['boolval'] = false;
$arrayDate = getdate();
$fecha = $arrayDate['year']."-".$arrayDate['mon']."-".$arrayDate['mday'];
$hora = $arrayDate['hours'].":".$arrayDate['minutes'].":".$arrayDate['seconds'];
$fechaHora = $fecha." ".$hora;
if ((isset($_POST['email'])) && (!empty($_POST['email'])))
{
  $jsondata['boolval'] = true;
  // anadimos los suscriptores a una base de datos.
  try{
    $objetoPDO = new PDO('mysql:host=localhost;dbname=plasticoDB', 'plasuser', 'g2IJ8JzsJ9rR');
    $sql = "INSERT INTO userSuscription (email , approved, date_created, date_modify) VALUES (";
    $sql.= "'".$email."','".$agreeSql."','".$fechaHora."','".$fechaHora."')";
    // echo $sql;
    $stmt= $objetoPDO->prepare($sql);
    $stmt->execute();
    $jsondata['response'] = true;
  }catch(PDOException $e){
    $jsondata['error'] = $e->getMessage();
    $jsondata['response'] = false;
    session_destroy();
  }
}

//Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
header('Content-type: application/json; charset=utf-8');
// echo json_encode($jsondata,JSON_FORCE_OBJECT);
echo json_encode($jsondata);
exit();


?>
