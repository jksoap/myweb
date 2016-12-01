<?php
$num=$_GET["num"];
$time=$_GET["time"];
$name=$_GET["name"];
$con=new mysqli("localhost","root","2333","randomgamedata");
if(!$con){

	die("could not connext".mysqli_error());
}
#mysqli_select_db("randomgamedata", $con);
mysqli_query($con,"INSERT INTO datas(playerName, playerNum, playerTime) VALUES ('Peter', 'Griffin', '35')");

?>