<?php

function parse($response) {
  $response = str_replace(" ","",$response);
  $response = str_replace("[","",$response);
  $response = str_replace("]","",$response);
  $response = str_replace("\"","",$response);
  $count=0;
  $results_arr = (array) null;


  if($response != '') {
  for ($x = 0; $x <= strlen($response); $x+=1) {
      if($response[$x] != ",") {
          $temp[$count] = $response[$x];
          $count+=1;
      }
      else {
        if($count>=3) {
          array_push($results_arr, $temp);
          $count=0;
          $temp="";
        }
        else {
          $count=0;
          $temp="";
        }
      }
  }
  return $results_arr;
  }
}


function prioritize($a, $b) {
    return strlen($b) - strlen($a);
}


$final_arr  = (array) parse($response);
usort($final_arr, 'prioritize');


?>
