<?php
error_reporting(E_ALL);
echo $newArchive = '../../share/kalin.html';
$createHtml = fopen($newArchive,'w+');

$content = "";

$content.= '<!DOCTYPE html>';
$content.= '<html lang="en">';
$content.= '<head>';
$content.= '<meta charset="UTF-8">';
$content.= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
$content.= '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
$content.= '<title>MEME PLASTICO</title>';
$content.= '<meta property="og:url"                content="http://pa-peru.com/digitas/plastico/" />';
$content.= '<meta property="og:type"               content="article" />';
$content.= '<meta property="og:title"              content="Plastico" />';
$content.= '<meta property="og:description"        content="Plastico descripcion" />';
$content.= '<meta property="og:image"              content="http://pa-peru.com/digitas/plastico/assets/images/share/plastico-'.$nameImg.'.jpg" />';
$content.= '<meta property="og:image:type" content="image/jpeg" />';
$content.= '</head>';
$content.= '<body>';
$content.= '<img src="http://pa-peru.com/digitas/plastico/assets/images/share/plastico-'.$nameImg.'.jpg" alt="">';
$content.= '<a href="index.html">Crear meme</a>';
$content.= '</body>';
$content.= '</html>';

fwrite($createHtml, $content);
?>
