<?php
  ini_set("display_errors",'On');
       error_reporting(E_ALL);
$url = "https://shahali.org/lib/countries/countries_large.geo.json";
$countryData = json_decode(file_get_contents($url), true);
	$output = json_encode($countryData);

	header('Content-Type: application/json; charset=UTF-8');

	echo $output; 





?>