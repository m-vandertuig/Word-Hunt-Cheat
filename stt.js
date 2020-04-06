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
      document.getElementById("output").innerHTML = board;
      index = index + 1;
      if(index>=15){
        var x=0;
        var parsed_board = board[x];
        while(x<100) {
          if(board[x-1]==' ' && board[x]!=' '){
            parsed_board += board[x];
          }
          x++;
        }
          parsed_board = parsed_board.toLowerCase();
          parsed_board = parsed_board.substring(0,16);
          document.getElementById("output").innerHTML = parsed_board;
          fill_board(parsed_board);
          send_string(parsed_board);
          recognition.stop();
      }
    };
    recognition.onerror = function(e) {
      recognition.stop();
    }
  }
}

  function fill_board(parsed_board) {
    var i=0;
    for(i; i<16; i++){
      var id = "item" + i;
      document.getElementById(id).innerHTML = parsed_board[i];
    }
  }

function send_string(parsed_board) {
    $.ajax({
      type: "POST",
      url: 'find_words.php',
      dataType: 'json',
      data : { letters : parsed_board },
      success: function(data) {
        var results = data.slice(0,120);
        var ul = document.createElement('ul');
        document.getElementById('list').appendChild(ul);
        results.forEach(function(data){
          var li = document.createElement('li');
          ul.appendChild(li);
          li.innerHTML += data;
        });
        document.getElementById("reset").click();
      }
    })
}
