<?php

$chosenadminname = "";

if($_REQUEST['adminname1'] != ""){
$chosenadminname = $_REQUEST['adminname1'];
}
elseif($_REQUEST['adminname2'] != ""){
$chosenadminname = $_REQUEST['adminname2'];
}
elseif($_REQUEST['adminname3'] != ""){
$chosenadminname = $_REQUEST['adminname3'];
}
elseif($_REQUEST['adminname4'] != ""){
$chosenadminname = $_REQUEST['adminname4'];
}
elseif($_REQUEST['adminname5'] != ""){
$chosenadminname = $_REQUEST['adminname5'];
}

$url = "http://api.openweathermap.org/data/2.5/forecast?q=".$_REQUEST['adminname1'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/forecast?q=".$_REQUEST['adminname2'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/forecast?q=".$_REQUEST['adminname3'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	
		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/forecast?q=".$_REQUEST['adminname4'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	
		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/forecast?q=".$_REQUEST['adminname5'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

		}
		}
		}
	}

	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>