<?php
  ini_set("display_errors",'On');
       error_reporting(E_ALL);
$url = "https://shahali.org/lib/countries/countries_large.geo.json";
$countryData = json_decode(file_get_contents($url), true);
	$output['data'] = [];
	$output['data2'] = [];

	for($i = 0; $i < count($countryData['features']);$i++) {
	array_push($output['data'], $countryData['features'][$i]['properties']['ADMIN']);	
		array_push($output['data2'], $countryData['features'][$i]['properties']['ISO_A3']);	
	}

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 





?>