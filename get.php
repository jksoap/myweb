
<?php
$cityname=$_GET['va'];
$test="linyi";
$url="http://api.openweathermap.org/data/2.5/forecast?q={$cityname}&mode=json&APPID=bd5d494c491e3d751b736b75d491053a";  
$html = file_get_contents($url);  
echo $html;  
?>
