<?php
echo '<script>alert(1232);</script>';
$action=$_GET["act"];
if($action=="order_list")
{

	echo '<div> 这里是</div>';
}
elseif($action=="collection_list"){
	echo '<div>soapGeneral</div>';

}
include_once("inc.php");
?>