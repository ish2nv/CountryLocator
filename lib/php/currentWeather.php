<?php

$url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['adminname1'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

	if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['adminname2'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['adminname3'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	
		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['adminname4'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	
		if($decode['cod'] == "404") {
		$url = "http://api.openweathermap.org/data/2.5/weather?q=".$_REQUEST['adminname5'].",".$_REQUEST['countryCode']."&appid=9e1a0c52cc006df6d1b79cc3d8c29b33&units=imperial";

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