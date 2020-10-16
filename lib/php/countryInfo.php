<?php

$url = "https://restcountries.eu/rest/v2/alpha?codes=".$_REQUEST['mycountryCode'].";";

$my_cURL = curl_init();
curl_setopt($my_cURL, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($my_cURL, CURLOPT_RETURNTRANSFER, true);
curl_setopt($my_cURL, CURLOPT_URL,$url);



	$result=curl_exec($my_cURL);

	curl_close($my_cURL);

	$decode = json_decode($result,true);	

	$output['data'] = $decode[0]['capital'];
	$output['data2'] = $decode[0]['population'];
	$output['data3'] = [];
	$output['data4'] = [];
	$output['data5'] = [];
	$output['data6'] = $decode[0]['flag'];

	for($i = 0; $i < count($decode[0]['currencies']);$i++) {

		array_push($output['data3'], $decode[0]['currencies'][$i]['name']);
	}
	for($i = 0; $i < count($decode[0]['languages']);$i++) {

		array_push($output['data4'], $decode[0]['languages'][$i]['name']);
	}
		for($i = 0; $i < count($decode[0]['callingCodes']);$i++) {

		array_push($output['data5'], $decode[0]['callingCodes'][$i]);
	}
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 




?>