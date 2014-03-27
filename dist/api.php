<?php

$first = TRUE;
$end_point = 'http://api.smelton.frlabs.com/listings';
foreach($_GET as $param => $val){
	$end_point .= ($first) ? '?' . $param . '=' . $val : '&' . $param . '=' . $val;
	$first = FALSE;
}

// Get cURL resource
$curl = curl_init();
// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $end_point,
    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
echo $resp;
// Close request to clear up some resources
curl_close($curl);