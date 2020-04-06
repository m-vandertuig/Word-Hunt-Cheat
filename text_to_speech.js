
var synth = window.speechSynthesis;

document.getElementById("reset").onclick = function() {run_speak()};

function run_speak(){
  let i = 1;
do {
  speak(i);
  i++;
} while (i < 30);
}

function speak(i){
  setTimeout(function() {
    var ul = document.getElementById("list");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      var msg = new SpeechSynthesisUtterance(items[i].innerHTML);
      synth.speak(msg);
    }
    }, 2500 * i);
}


