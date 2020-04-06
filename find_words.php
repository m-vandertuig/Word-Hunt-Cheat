<?php
if(isset($_POST['letters'])) {
  $board_letters = $_POST['letters'];
  $url = "https://codebox-boggle-v1.p.rapidapi.com/";
  $url = $url.$board_letters;
  $curl = curl_init();


  curl_setopt_array($curl, array(
    CURLOPT_URL => $url ,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "x-rapidapi-host: codebox-boggle-v1.p.rapidapi.com",
      "x-rapidapi-key: 19750842a5mshe774f54c5037df0p10f1a2jsna6d480f29090"
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);

  if ($err) {
    echo "cURL Error #:" . $err;
  }


  function parse($response) {
    $response = str_replace(" ","",$response);
    $response = str_replace("[","",$response);
    $response = str_replace("]","",$response);
    $response = str_replace("\"","",$response);
    $count=0;
    $results_arr = (array) null;
    $temp = "test";

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

  $final_arr  =  parse($response);
  usort($final_arr, 'prioritize');

  echo json_encode($final_arr);


}
?>

