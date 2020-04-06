$(document).ready(function () {go();} );


  document.getElementById("start").onclick = function() {record()};

  function record() {
    var board = '';
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(event) {
        var index = event.resultIndex;
        var transcript = event.results[index][0].transcript;


        board += transcript;

        index = index + 1;
        if(index>15){
          var x=0;
          var parsed_board = board[x];
          while(x<100) {
            if(board[x-1]==' ' && board[x]!=' '){
              parsed_board += board[x];
            }
            x++;
          }

            fill_board(parsed_board);
            send_string(parsed_board);
            document.getElementById("output").innerHTML = parsed_board;
            // document.getElementById('board_string').value = parsed_board;
            // document.getElementById("submit").click();
            recognition.stop();
        }
        else document.getElementById("output").innerHTML = board;
      };
      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  }
function go(){
  var parse = "stngeiababababes";
  fill_board(parse);
  send_string(parse);
}

  function fill_board(parsed_board) {
    var i=0;
    for(i; i<16; i++){
      var id = "item" + i;
      document.getElementById(id).innerHTML = parsed_board[i];
    }
  }


  function send_string(parsed_board) {
    var board_letters = parsed_board;
    $.ajax({
                    type: "POST",
                    url: 'index.php',
                    data : { letters : board_letters }
                    }).done(function() {
  alert( "Data Saved: " ); }); }

